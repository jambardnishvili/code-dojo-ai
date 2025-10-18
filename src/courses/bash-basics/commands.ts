export interface CommandDef {
  description: string;
  usage: string;
  examples?: string[];
}

export const commands: Record<string, CommandDef> = {
  pwd: {
    description: "Print working directory - shows your current location",
    usage: "pwd",
    examples: ["pwd"]
  },
  ls: {
    description: "List directory contents",
    usage: "ls [options] [path]",
    examples: ["ls", "ls -l", "ls -la", "ls /home"]
  },
  cd: {
    description: "Change directory",
    usage: "cd [path]",
    examples: ["cd /home", "cd ..", "cd ~", "cd practice"]
  },
  mkdir: {
    description: "Create a new directory",
    usage: "mkdir [options] directory_name",
    examples: ["mkdir new_folder", "mkdir -p parent/child"]
  },
  touch: {
    description: "Create an empty file or update timestamp",
    usage: "touch filename",
    examples: ["touch file.txt", "touch script.sh"]
  },
  echo: {
    description: "Print text to terminal or redirect to file",
    usage: "echo [text]",
    examples: ["echo \"Hello World\"", "echo \"text\" > file.txt", "echo \"more\" >> file.txt"]
  },
  cat: {
    description: "Display file contents",
    usage: "cat filename",
    examples: ["cat file.txt", "cat file1.txt file2.txt"]
  },
  cp: {
    description: "Copy files or directories",
    usage: "cp source destination",
    examples: ["cp file.txt copy.txt", "cp -r folder/ backup/"]
  },
  mv: {
    description: "Move or rename files",
    usage: "mv source destination",
    examples: ["mv old.txt new.txt", "mv file.txt /home/user/"]
  },
  rm: {
    description: "Remove files or directories",
    usage: "rm [options] filename",
    examples: ["rm file.txt", "rm -r folder/", "rm -rf dangerous/"]
  },
  clear: {
    description: "Clear the terminal screen",
    usage: "clear",
    examples: ["clear"]
  },
  whoami: {
    description: "Display current username",
    usage: "whoami",
    examples: ["whoami"]
  },
  history: {
    description: "Show command history",
    usage: "history",
    examples: ["history", "history 20"]
  },
  grep: {
    description: "Search for patterns in text",
    usage: "grep [pattern] [file]",
    examples: ["grep \"error\" log.txt", "grep -i \"hello\" file.txt"]
  },
  wc: {
    description: "Count lines, words, and characters",
    usage: "wc [options] file",
    examples: ["wc file.txt", "wc -l file.txt", "wc -w file.txt"]
  },
  chmod: {
    description: "Change file permissions",
    usage: "chmod [mode] file",
    examples: ["chmod +x script.sh", "chmod 755 file", "chmod u+rwx file"]
  },
  env: {
    description: "Display environment variables",
    usage: "env",
    examples: ["env", "env | grep PATH"]
  },
  alias: {
    description: "Create command shortcuts",
    usage: "alias name='command'",
    examples: ["alias ll='ls -la'", "alias gs='git status'"]
  }
};
