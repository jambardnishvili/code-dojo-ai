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
    title: "Git Basics & Setup",
    description: "Learn to configure Git and understand version control fundamentals",
    xp: 50,
    learningObjectives: [
      "Configure Git with your identity",
      "Understand what version control is",
      "Learn about Git repositories"
    ],
    tasks: [
      {
        id: "git-1",
        instruction: "Check Git version with 'git --version'",
        command: "git --version",
        hint: "Type: git --version"
      },
      {
        id: "git-2",
        instruction: "View Git help with 'git help'",
        command: "git help",
        hint: "Type: git help"
      },
      {
        id: "git-3",
        instruction: "Initialize a Git repository with 'git init'",
        command: "git init",
        hint: "Type: git init"
      }
    ]
  },
  {
    id: 2,
    title: "Working with Files",
    description: "Learn to track and commit changes in Git",
    xp: 75,
    learningObjectives: [
      "Stage files for commit",
      "Create commits with messages",
      "View repository status"
    ],
    tasks: [
      {
        id: "git-4",
        instruction: "Check repository status with 'git status'",
        command: "git status",
        hint: "Type: git status"
      },
      {
        id: "git-5",
        instruction: "Stage all files using 'git add .'",
        command: "git add .",
        hint: "Type: git add ."
      },
      {
        id: "git-6",
        instruction: "Create a commit with 'git commit -m \"message\"'",
        validation: (input) => input.startsWith("git commit") && input.includes("-m"),
        hint: "Type: git commit -m \"Your message\""
      }
    ]
  },
  {
    id: 3,
    title: "Viewing History",
    description: "Learn to view and understand commit history",
    xp: 75,
    learningObjectives: [
      "View commit logs",
      "Understand commit hashes",
      "See commit differences"
    ],
    tasks: [
      {
        id: "git-7",
        instruction: "View commit history with 'git log'",
        command: "git log",
        hint: "Type: git log"
      },
      {
        id: "git-8",
        instruction: "View concise log with 'git log --oneline'",
        command: "git log --oneline",
        hint: "Type: git log --oneline"
      },
      {
        id: "git-9",
        instruction: "Show file changes with 'git diff'",
        command: "git diff",
        hint: "Type: git diff"
      }
    ]
  },
  {
    id: 4,
    title: "Branches & Merging",
    description: "Master Git branching and merging workflows",
    xp: 100,
    learningObjectives: [
      "Create and switch branches",
      "Merge branches together",
      "Understand branch workflows"
    ],
    tasks: [
      {
        id: "git-10",
        instruction: "List all branches with 'git branch'",
        command: "git branch",
        hint: "Type: git branch"
      },
      {
        id: "git-11",
        instruction: "Create a new branch with 'git branch feature'",
        validation: (input) => input.startsWith("git branch") && input.split(" ").length > 2,
        hint: "Type: git branch feature"
      },
      {
        id: "git-12",
        instruction: "Switch branches with 'git checkout'",
        validation: (input) => input.startsWith("git checkout"),
        hint: "Type: git checkout branch-name"
      }
    ]
  },
  {
    id: 5,
    title: "Remote Repositories",
    description: "Learn to work with remote Git repositories",
    xp: 100,
    learningObjectives: [
      "Connect to remote repositories",
      "Push and pull changes",
      "Clone repositories"
    ],
    tasks: [
      {
        id: "git-13",
        instruction: "View remote repositories with 'git remote -v'",
        command: "git remote -v",
        hint: "Type: git remote -v"
      },
      {
        id: "git-14",
        instruction: "Add a remote with 'git remote add origin'",
        validation: (input) => input.startsWith("git remote add"),
        hint: "Type: git remote add origin <url>"
      },
      {
        id: "git-15",
        instruction: "Fetch remote changes with 'git fetch'",
        command: "git fetch",
        hint: "Type: git fetch"
      }
    ]
  }
];
