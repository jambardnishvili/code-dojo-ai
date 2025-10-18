import { useEffect, useRef, useState, useCallback } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { useToast } from "@/hooks/use-toast";
import { Lesson } from "@/courses/bash-basics/lessons";

interface TerminalEmulatorProps {
  activeLesson: Lesson | null;
  onAIRequest: () => void;
  onTaskComplete?: (taskId: string) => void;
  onLessonComplete?: () => void;
}

const TerminalEmulator = ({ activeLesson, onAIRequest, onTaskComplete, onLessonComplete }: TerminalEmulatorProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const { toast } = useToast();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Reset completed tasks when lesson changes
  useEffect(() => {
    setCompletedTasks(new Set());
  }, [activeLesson?.id]);

  // Simulated filesystem
  const filesystem = useRef<any>({
    "/": {
      "home": {
        "user": {
          "documents": {},
          "projects": {}
        }
      },
      "etc": {},
      "var": {}
    }
  });

  const currentDir = useRef("/home/user");
  const commandHistory = useRef<string[]>([]);
  const currentLine = useRef("");

  // Helper function to get directory contents
  const getDirectory = useCallback((path: string) => {
    const parts = path.split("/").filter(Boolean);
    let current = filesystem.current["/"];
    
    for (const part of parts) {
      if (current[part] === undefined) {
        return null;
      }
      current = current[part];
    }
    return current;
  }, []);

  // Helper function to normalize path
  const normalizePath = useCallback((path: string, currentPath: string) => {
    if (path.startsWith("/")) {
      return path;
    }
    
    const combined = `${currentPath}/${path}`;
    const parts = combined.split("/").filter(Boolean);
    const normalized: string[] = [];
    
    for (const part of parts) {
      if (part === "..") {
        normalized.pop();
      } else if (part !== ".") {
        normalized.push(part);
      }
    }
    
    return "/" + normalized.join("/");
  }, []);

  // Check task completion
  const checkTaskCompletion = useCallback((command: string) => {
    if (!activeLesson || !xtermRef.current) return;
    const term = xtermRef.current;

    for (const task of activeLesson.tasks) {
      if (completedTasks.has(task.id)) continue;

      let isValid = false;
      if (task.command) {
        isValid = command.trim().toLowerCase() === task.command.toLowerCase();
      } else if (task.validation) {
        isValid = task.validation(command.trim());
      }

      if (isValid) {
        setCompletedTasks(prev => {
          const newSet = new Set(prev);
          newSet.add(task.id);
          
          const allComplete = activeLesson.tasks.every(t => newSet.has(t.id));
          if (allComplete && onLessonComplete) {
            setTimeout(() => onLessonComplete(), 1000);
          }
          
          return newSet;
        });
        
        onTaskComplete?.(task.id);
        term.writeln(`\x1b[1;32m✓ Task completed: ${task.instruction}\x1b[0m`);
        toast({
          title: "Task Complete! 🎉",
          description: task.instruction,
        });
        break;
      }
    }
  }, [activeLesson, completedTasks, onTaskComplete, onLessonComplete, toast]);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "JetBrains Mono, Consolas, monospace",
      theme: {
        background: "#0A0A0A",
        foreground: "#F0F0F0",
        cursor: "#00FF88",
        black: "#000000",
        red: "#FF5555",
        green: "#00FF88",
        yellow: "#FFD700",
        blue: "#5DADE2",
        magenta: "#FF79C6",
        cyan: "#8BE9FD",
        white: "#BFBFBF",
      },
      rows: 24,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    
    // Small delay to ensure terminal is fully initialized before fitting
    setTimeout(() => {
      fitAddon.fit();
    }, 0);

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const writePrompt = () => {
      term.write(`\x1b[1;32muser@tutor\x1b[0m:\x1b[1;34m${currentDir.current}\x1b[0m$ `);
    };

    const handleCommand = (command: string) => {
      if (!command) return;

      commandHistory.current.push(command);
      checkTaskCompletion(command);
      
      const [cmd, ...args] = command.split(" ");

      switch (cmd.toLowerCase()) {
        case "help":
          term.writeln("\x1b[1;33mAvailable Commands:\x1b[0m");
          term.writeln("  ls, cd, pwd, mkdir, echo, clear");
          term.writeln("  git, docker, grep, sed, awk, find");
          term.writeln("  whoami, touch, cat, history");
          break;

        case "ls":
          const targetPath = args[0] ? normalizePath(args[0], currentDir.current) : currentDir.current;
          const dir = getDirectory(targetPath);
          if (dir === null) {
            term.writeln(`\x1b[31mls: cannot access '${args[0]}': No such file or directory\x1b[0m`);
          } else {
            const contents = Object.keys(dir);
            if (contents.length > 0) {
              term.writeln("\x1b[1;36m" + contents.join("  ") + "\x1b[0m");
            }
          }
          break;

        case "pwd":
          term.writeln(currentDir.current);
          break;

        case "cd":
          const newPath = args[0] ? normalizePath(args[0], currentDir.current) : "/home/user";
          const newDir = getDirectory(newPath);
          if (newDir === null) {
            term.writeln(`\x1b[31mcd: no such file or directory: ${args[0]}\x1b[0m`);
          } else {
            currentDir.current = newPath === "/" ? "/" : newPath;
          }
          break;

        case "mkdir":
          if (args[0]) {
            const mkdirPath = normalizePath(args[0], currentDir.current);
            const parentPath = mkdirPath.split("/").slice(0, -1).join("/") || "/";
            const dirName = mkdirPath.split("/").pop();
            const parentDir = getDirectory(parentPath);
            
            if (parentDir === null) {
              term.writeln(`\x1b[31mmkdir: cannot create directory '${args[0]}': No such file or directory\x1b[0m`);
            } else if (parentDir[dirName!]) {
              term.writeln(`\x1b[31mmkdir: cannot create directory '${args[0]}': File exists\x1b[0m`);
            } else {
              parentDir[dirName!] = {};
              term.writeln(`\x1b[32m✓\x1b[0m Created directory: ${args[0]}`);
            }
          } else {
            term.writeln("\x1b[31mError: mkdir requires a directory name\x1b[0m");
          }
          break;

        case "echo":
          term.writeln(args.join(" "));
          break;

        case "clear":
          term.clear();
          break;

        case "whoami":
          term.writeln("user");
          break;

        case "touch":
          if (args[0]) {
            term.writeln(`\x1b[32m✓\x1b[0m Created file: ${args[0]}`);
          } else {
            term.writeln("\x1b[31mtouch: missing file operand\x1b[0m");
          }
          break;

        case "cat":
          if (args[0]) {
            term.writeln(`Contents of ${args[0]}`);
          } else {
            term.writeln("\x1b[31mcat: missing file operand\x1b[0m");
          }
          break;

        case "history":
          commandHistory.current.forEach((cmd, i) => {
            term.writeln(`  ${i + 1}  ${cmd}`);
          });
          break;

        case "git":
          handleGit(term, args);
          break;

        case "docker":
          handleDocker(term, args);
          break;

        case "grep":
          if (args.length >= 2) {
            term.writeln(`Searching for '${args[0]}' in ${args[1]}...`);
          } else {
            term.writeln("\x1b[31mgrep: missing operands\x1b[0m");
          }
          break;

        case "sed":
          if (args.length >= 2) {
            term.writeln(`Processing with sed...`);
          } else {
            term.writeln("\x1b[31msed: missing operands\x1b[0m");
          }
          break;

        case "awk":
          if (args.length >= 1) {
            term.writeln(`Processing with awk...`);
          } else {
            term.writeln("\x1b[31mawk: missing operands\x1b[0m");
          }
          break;

        case "find":
          if (args.length >= 1) {
            term.writeln(`Searching with find...`);
          } else {
            term.writeln("\x1b[31mfind: missing operands\x1b[0m");
          }
          break;

        case "explain":
          if (args[0]) {
            onAIRequest();
            term.writeln(`\x1b[32m→ Asking AI about: ${args[0]}\x1b[0m`);
          } else {
            term.writeln("\x1b[31mUsage: explain <command>\x1b[0m");
          }
          break;

        default:
          term.writeln(`\x1b[31mCommand not found: ${cmd}\x1b[0m`);
          term.writeln(`Type 'help' for available commands`);
      }
    };

    const handleGit = (term: Terminal, args: string[]) => {
      if (args.length === 0) {
        term.writeln("usage: git <command> [<args>]");
        return;
      }

      const subCmd = args[0].toLowerCase();
      
      switch (subCmd) {
        case "--version":
          term.writeln("git version 2.39.0");
          break;
        case "help":
          term.writeln("Git is a distributed version control system");
          break;
        case "init":
          term.writeln("\x1b[32mInitialized empty Git repository\x1b[0m");
          break;
        case "status":
          term.writeln("On branch main");
          term.writeln("nothing to commit, working tree clean");
          break;
        case "add":
          term.writeln(`\x1b[32m✓\x1b[0m Staged changes`);
          break;
        case "commit":
          if (args.includes("-m")) {
            term.writeln("\x1b[32m[main abc123] Your commit message\x1b[0m");
          } else {
            term.writeln("\x1b[31mCommit message required. Use -m flag\x1b[0m");
          }
          break;
        case "log":
          term.writeln("commit abc123 (HEAD -> main)");
          break;
        case "branch":
          if (args.length === 1) {
            term.writeln("* main");
          } else {
            term.writeln(`\x1b[32m✓\x1b[0m Created branch: ${args[1]}`);
          }
          break;
        case "checkout":
          if (args[1]) {
            term.writeln(`Switched to branch '${args[1]}'`);
          }
          break;
        case "remote":
          if (args.includes("-v")) {
            term.writeln("origin  https://github.com/user/repo.git");
          } else if (args.includes("add")) {
            term.writeln("\x1b[32m✓\x1b[0m Remote added");
          }
          break;
        case "fetch":
          term.writeln("Fetching origin...");
          break;
        case "diff":
          term.writeln("No changes detected");
          break;
        default:
          term.writeln(`\x1b[31mgit: '${subCmd}' is not a git command\x1b[0m`);
      }
    };

    const handleDocker = (term: Terminal, args: string[]) => {
      if (args.length === 0) {
        term.writeln("Usage: docker [OPTIONS] COMMAND");
        return;
      }

      const subCmd = args[0].toLowerCase();
      
      switch (subCmd) {
        case "--version":
          term.writeln("Docker version 24.0.0");
          break;
        case "info":
          term.writeln("Docker Server Information");
          break;
        case "--help":
          term.writeln("Docker - A self-sufficient runtime for containers");
          break;
        case "pull":
          if (args[1]) {
            term.writeln(`Pulling ${args[1]}...`);
            term.writeln("\x1b[32m✓\x1b[0m Pull complete");
          }
          break;
        case "images":
          term.writeln("REPOSITORY    TAG       IMAGE ID");
          break;
        case "run":
          if (args[1]) {
            term.writeln(`Running container from ${args[1]}...`);
          }
          break;
        case "ps":
          term.writeln("CONTAINER ID   IMAGE     COMMAND   STATUS");
          break;
        case "stop":
        case "rm":
        case "logs":
          if (args[1]) {
            term.writeln(`\x1b[32m✓\x1b[0m Command executed`);
          }
          break;
        case "build":
          if (args.includes("-t")) {
            term.writeln("\x1b[32m✓\x1b[0m Image built successfully");
          }
          break;
        case "tag":
        case "inspect":
          if (args[1]) {
            term.writeln(`\x1b[32m✓\x1b[0m Command executed`);
          }
          break;
        case "network":
          if (args[1] === "ls") {
            term.writeln("NETWORK ID   NAME");
          } else if (args[1] === "create") {
            term.writeln("\x1b[32m✓\x1b[0m Network created");
          }
          break;
        case "volume":
          if (args[1] === "ls") {
            term.writeln("DRIVER    VOLUME NAME");
          }
          break;
        case "history":
          if (args[1]) {
            term.writeln(`IMAGE: ${args[1]}`);
          }
          break;
        default:
          term.writeln(`\x1b[31mdocker: '${subCmd}' is not a docker command\x1b[0m`);
      }
    };

    // Welcome message
    term.writeln("\x1b[1;32m╔═══════════════════════════════════════════════╗\x1b[0m");
    term.writeln("\x1b[1;32m║     Welcome to AI Terminal Tutor v1.0        ║\x1b[0m");
    term.writeln("\x1b[1;32m╚═══════════════════════════════════════════════╝\x1b[0m");
    term.writeln("");
    term.writeln("Type 'help' for available commands");
    term.writeln("");
    writePrompt();

    // Handle input
    term.onData((data) => {
      const code = data.charCodeAt(0);

      if (code === 13) { // Enter
        term.write("\r\n");
        handleCommand(currentLine.current.trim());
        currentLine.current = "";
        writePrompt();
      } else if (code === 127) { // Backspace
        if (currentLine.current.length > 0) {
          currentLine.current = currentLine.current.slice(0, -1);
          term.write("\b \b");
        }
      } else if (code === 27) { // Arrow keys
        return;
      } else if (code < 32) {
        return;
      } else {
        currentLine.current += data;
        term.write(data);
      }
    });

    // Handle resize
    const handleResize = () => {
      if (fitAddon && term) {
        try {
          fitAddon.fit();
        } catch (e) {
          // Ignore resize errors during initialization
        }
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, [checkTaskCompletion, getDirectory, normalizePath, onAIRequest]);

  return (
    <div 
      ref={terminalRef} 
      className="h-[500px] bg-terminal-bg p-4"
      style={{ fontFamily: "JetBrains Mono, Consolas, monospace" }}
    />
  );
};

export default TerminalEmulator;
