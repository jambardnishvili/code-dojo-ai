export interface Task {
  id: string;
  instruction: string;
  command?: string;
  validation?: (input: string) => boolean;
  hint?: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  xp: number;
  tasks: Task[];
  learningObjectives: string[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to the Terminal",
    description: "Learn what the command line is and how to navigate it",
    xp: 50,
    learningObjectives: [
      "Understand what Bash and the terminal are",
      "Learn basic keyboard shortcuts",
      "Know how to get help with commands"
    ],
    tasks: [
      {
        id: "intro-1",
        instruction: "Type 'pwd' to see your current directory",
        command: "pwd",
        hint: "Just type: pwd"
      },
      {
        id: "intro-2",
        instruction: "Use 'whoami' to see your username",
        command: "whoami",
        hint: "Type: whoami"
      },
      {
        id: "intro-3",
        instruction: "Type 'clear' to clear the terminal screen",
        command: "clear",
        hint: "Type: clear"
      }
    ]
  },
  {
    id: 2,
    title: "Navigating the Filesystem",
    description: "Master moving around directories and understanding paths",
    xp: 75,
    learningObjectives: [
      "Understand absolute vs relative paths",
      "Navigate directories confidently",
      "Use tab completion effectively"
    ],
    tasks: [
      {
        id: "nav-1",
        instruction: "List all files in current directory with 'ls'",
        command: "ls",
        hint: "Type: ls"
      },
      {
        id: "nav-2",
        instruction: "Create a new directory called 'practice' using mkdir",
        validation: (input) => input.trim().startsWith("mkdir") && input.includes("practice"),
        hint: "Type: mkdir practice"
      },
      {
        id: "nav-3",
        instruction: "Change into the practice directory with 'cd practice'",
        validation: (input) => input.trim().startsWith("cd") && input.includes("practice"),
        hint: "Type: cd practice"
      },
      {
        id: "nav-4",
        instruction: "Go back to parent directory using 'cd ..'",
        command: "cd ..",
        hint: "Type: cd .."
      }
    ]
  },
  {
    id: 3,
    title: "Files and Directories Management",
    description: "Learn to create, view, copy, and delete files",
    xp: 100,
    learningObjectives: [
      "Create and manipulate files",
      "Use wildcards for batch operations",
      "Understand file extensions and hidden files"
    ],
    tasks: [
      {
        id: "file-1",
        instruction: "Create a file called 'test.txt' using touch",
        validation: (input) => input.trim().startsWith("touch") && input.includes("test.txt"),
        hint: "Type: touch test.txt"
      },
      {
        id: "file-2",
        instruction: "Write 'Hello World' to hello.txt using echo",
        validation: (input) => input.includes("echo") && input.includes(">") && input.includes("hello.txt"),
        hint: "Type: echo \"Hello World\" > hello.txt"
      },
      {
        id: "file-3",
        instruction: "View the contents of hello.txt with cat",
        validation: (input) => input.trim().startsWith("cat") && input.includes("hello.txt"),
        hint: "Type: cat hello.txt"
      },
      {
        id: "file-4",
        instruction: "Copy test.txt to test_copy.txt using cp",
        validation: (input) => input.includes("cp") && input.includes("test.txt") && input.includes("test_copy.txt"),
        hint: "Type: cp test.txt test_copy.txt"
      }
    ]
  },
  {
    id: 4,
    title: "Working with Text and Content",
    description: "Master text manipulation and viewing commands",
    xp: 100,
    learningObjectives: [
      "View and search text files",
      "Use pipes to chain commands",
      "Redirect output effectively"
    ],
    tasks: [
      {
        id: "text-1",
        instruction: "Create a file with multiple lines using echo and >>",
        validation: (input) => input.includes("echo") && input.includes(">>"),
        hint: "Type: echo \"Line 1\" >> multiline.txt"
      },
      {
        id: "text-2",
        instruction: "Count lines in a file using wc -l",
        validation: (input) => input.includes("wc") && input.includes("-l"),
        hint: "Type: wc -l multiline.txt"
      },
      {
        id: "text-3",
        instruction: "Search for a word using grep",
        validation: (input) => input.includes("grep"),
        hint: "Type: grep \"word\" filename.txt"
      }
    ]
  },
  {
    id: 5,
    title: "File Permissions and Ownership",
    description: "Understand Linux permission system",
    xp: 125,
    learningObjectives: [
      "Read permission notation (rwx)",
      "Change file permissions",
      "Understand user, group, and others"
    ],
    tasks: [
      {
        id: "perm-1",
        instruction: "List files with permissions using 'ls -l'",
        command: "ls -l",
        hint: "Type: ls -l"
      },
      {
        id: "perm-2",
        instruction: "Make a file executable using chmod +x",
        validation: (input) => input.includes("chmod") && input.includes("+x"),
        hint: "Type: chmod +x script.sh"
      }
    ]
  },
  {
    id: 6,
    title: "Variables and Environment",
    description: "Work with shell variables and environment settings",
    xp: 125,
    learningObjectives: [
      "Create and use variables",
      "Understand environment variables",
      "Export variables for subshells"
    ],
    tasks: [
      {
        id: "var-1",
        instruction: "Create a variable NAME with your name",
        validation: (input) => input.includes("=") && !input.includes(" = "),
        hint: "Type: NAME=\"YourName\""
      },
      {
        id: "var-2",
        instruction: "Echo the variable using $NAME",
        validation: (input) => input.includes("echo") && input.includes("$"),
        hint: "Type: echo $NAME"
      },
      {
        id: "var-3",
        instruction: "View all environment variables with 'env'",
        command: "env",
        hint: "Type: env"
      }
    ]
  },
  {
    id: 7,
    title: "Command History and Aliases",
    description: "Learn shortcuts and command reuse techniques",
    xp: 75,
    learningObjectives: [
      "Navigate command history",
      "Create custom aliases",
      "Make aliases persistent"
    ],
    tasks: [
      {
        id: "hist-1",
        instruction: "View your command history",
        command: "history",
        hint: "Type: history"
      },
      {
        id: "hist-2",
        instruction: "Create an alias for 'ls -la' called 'll'",
        validation: (input) => input.includes("alias") && input.includes("ll"),
        hint: "Type: alias ll='ls -la'"
      }
    ]
  },
  {
    id: 8,
    title: "Piping and Command Chaining",
    description: "Combine commands for powerful workflows",
    xp: 150,
    learningObjectives: [
      "Use pipes to chain commands",
      "Understand command chaining operators",
      "Run commands conditionally"
    ],
    tasks: [
      {
        id: "pipe-1",
        instruction: "List files and count them using ls | wc -l",
        validation: (input) => input.includes("ls") && input.includes("|") && input.includes("wc"),
        hint: "Type: ls | wc -l"
      },
      {
        id: "pipe-2",
        instruction: "Chain two commands with && operator",
        validation: (input) => input.includes("&&"),
        hint: "Type: mkdir test && cd test"
      }
    ]
  }
];
