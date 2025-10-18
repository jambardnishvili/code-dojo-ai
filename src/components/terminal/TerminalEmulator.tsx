import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { useToast } from "@/hooks/use-toast";

interface TerminalEmulatorProps {
  activeLesson: string | null;
  onAIRequest: () => void;
}

const TerminalEmulator = ({ activeLesson, onAIRequest }: TerminalEmulatorProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const { toast } = useToast();

  // Simulated filesystem
  const filesystem = useRef({
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
  const historyIndex = useRef(-1);
  let currentLine = "";

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    // Initialize terminal
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
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Welcome message
    term.writeln("\x1b[1;32m╔═══════════════════════════════════════════════╗\x1b[0m");
    term.writeln("\x1b[1;32m║     Welcome to AI Terminal Tutor v1.0        ║\x1b[0m");
    term.writeln("\x1b[1;32m╚═══════════════════════════════════════════════╝\x1b[0m");
    term.writeln("");
    term.writeln("Type 'help' for available commands");
    term.writeln("Type 'explain <command>' to learn about any command");
    term.writeln("");
    writePrompt(term);

    // Handle input
    term.onData((data) => {
      const code = data.charCodeAt(0);

      // Handle special keys
      if (code === 13) { // Enter
        term.write("\r\n");
        handleCommand(term, currentLine.trim());
        currentLine = "";
        writePrompt(term);
      } else if (code === 127) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write("\b \b");
        }
      } else if (code === 27) { // Arrow keys
        // Handle arrow key navigation through history
        return;
      } else if (code < 32) {
        // Ignore other control characters
        return;
      } else {
        currentLine += data;
        term.write(data);
      }
    });

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, []);

  const writePrompt = (term: Terminal) => {
    term.write(`\x1b[1;32muser@tutor\x1b[0m:\x1b[1;34m${currentDir.current}\x1b[0m$ `);
  };

  const handleCommand = (term: Terminal, command: string) => {
    if (!command) return;

    commandHistory.current.push(command);
    const [cmd, ...args] = command.split(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        term.writeln("\x1b[1;33mAvailable Commands:\x1b[0m");
        term.writeln("  ls          - List directory contents");
        term.writeln("  cd <dir>    - Change directory");
        term.writeln("  pwd         - Print working directory");
        term.writeln("  mkdir <dir> - Create directory");
        term.writeln("  echo <text> - Display text");
        term.writeln("  clear       - Clear the terminal");
        term.writeln("  explain <cmd> - Get AI explanation");
        term.writeln("  help        - Show this help");
        break;

      case "ls":
        const path = args[0] || currentDir.current;
        term.writeln("\x1b[1;36mdocuments  projects\x1b[0m");
        break;

      case "pwd":
        term.writeln(currentDir.current);
        break;

      case "cd":
        if (!args[0]) {
          currentDir.current = "/home/user";
        } else if (args[0] === "..") {
          const parts = currentDir.current.split("/").filter(Boolean);
          parts.pop();
          currentDir.current = "/" + parts.join("/") || "/";
        } else {
          currentDir.current = args[0].startsWith("/") 
            ? args[0] 
            : `${currentDir.current}/${args[0]}`.replace(/\/+/g, "/");
        }
        break;

      case "mkdir":
        if (args[0]) {
          term.writeln(`\x1b[32m✓\x1b[0m Created directory: ${args[0]}`);
          toast({
            title: "Command executed",
            description: `Created directory: ${args[0]}`,
          });
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
        term.writeln(`Type 'help' for available commands or 'explain ${cmd}' to learn more`);
    }
  };

  return (
    <div 
      ref={terminalRef} 
      className="h-[500px] bg-terminal-bg p-4"
      style={{ fontFamily: "JetBrains Mono, Consolas, monospace" }}
    />
  );
};

export default TerminalEmulator;
