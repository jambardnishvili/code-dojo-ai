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
    title: "Text Search with grep",
    description: "Master the powerful grep command for searching text",
    xp: 75,
    learningObjectives: [
      "Search files for patterns",
      "Use regular expressions",
      "Filter command output"
    ],
    tasks: [
      {
        id: "grep-1",
        instruction: "Search for a pattern with 'grep pattern file.txt'",
        validation: (input) => input.startsWith("grep"),
        hint: "Type: grep pattern filename"
      },
      {
        id: "grep-2",
        instruction: "Search recursively with 'grep -r pattern'",
        validation: (input) => input.startsWith("grep") && input.includes("-r"),
        hint: "Type: grep -r pattern directory"
      },
      {
        id: "grep-3",
        instruction: "Count matches with 'grep -c'",
        validation: (input) => input.startsWith("grep") && input.includes("-c"),
        hint: "Type: grep -c pattern filename"
      }
    ]
  },
  {
    id: 2,
    title: "Stream Editing with sed",
    description: "Learn to transform text with sed",
    xp: 100,
    learningObjectives: [
      "Replace text in files",
      "Use sed patterns",
      "Perform in-place editing"
    ],
    tasks: [
      {
        id: "sed-1",
        instruction: "Replace text with 'sed s/old/new/ file.txt'",
        validation: (input) => input.startsWith("sed") && input.includes("s/"),
        hint: "Type: sed s/old/new/ filename"
      },
      {
        id: "sed-2",
        instruction: "Delete lines with 'sed /pattern/d file.txt'",
        validation: (input) => input.startsWith("sed") && input.includes("d"),
        hint: "Type: sed /pattern/d filename"
      },
      {
        id: "sed-3",
        instruction: "Edit in-place with 'sed -i'",
        validation: (input) => input.startsWith("sed") && input.includes("-i"),
        hint: "Type: sed -i 's/old/new/' filename"
      }
    ]
  },
  {
    id: 3,
    title: "Text Processing with awk",
    description: "Process and analyze text data with awk",
    xp: 100,
    learningObjectives: [
      "Extract columns from text",
      "Perform calculations",
      "Format output"
    ],
    tasks: [
      {
        id: "awk-1",
        instruction: "Print specific column with 'awk '{print $1}' file.txt'",
        validation: (input) => input.startsWith("awk") && input.includes("print"),
        hint: "Type: awk '{print $1}' filename"
      },
      {
        id: "awk-2",
        instruction: "Use field separator with 'awk -F'",
        validation: (input) => input.startsWith("awk") && input.includes("-F"),
        hint: "Type: awk -F: '{print $1}' filename"
      },
      {
        id: "awk-3",
        instruction: "Filter rows with pattern 'awk '/pattern/ {print}'",
        validation: (input) => input.startsWith("awk") && input.includes("/"),
        hint: "Type: awk '/pattern/ {print}' filename"
      }
    ]
  },
  {
    id: 4,
    title: "Finding Files",
    description: "Locate files efficiently with find command",
    xp: 75,
    learningObjectives: [
      "Search by name and type",
      "Find by size and time",
      "Execute commands on results"
    ],
    tasks: [
      {
        id: "find-1",
        instruction: "Find files by name with 'find . -name \"*.txt\"'",
        validation: (input) => input.startsWith("find") && input.includes("-name"),
        hint: "Type: find . -name \"*.txt\""
      },
      {
        id: "find-2",
        instruction: "Find by type with 'find . -type f'",
        validation: (input) => input.startsWith("find") && input.includes("-type"),
        hint: "Type: find . -type f"
      },
      {
        id: "find-3",
        instruction: "Find by size with 'find . -size +1M'",
        validation: (input) => input.startsWith("find") && input.includes("-size"),
        hint: "Type: find . -size +1M"
      }
    ]
  },
  {
    id: 5,
    title: "Text Manipulation Tools",
    description: "Master cut, sort, and uniq commands",
    xp: 75,
    learningObjectives: [
      "Extract text sections",
      "Sort data efficiently",
      "Remove duplicates"
    ],
    tasks: [
      {
        id: "cut-1",
        instruction: "Cut columns with 'cut -d: -f1 file.txt'",
        validation: (input) => input.startsWith("cut"),
        hint: "Type: cut -d: -f1 filename"
      },
      {
        id: "sort-1",
        instruction: "Sort lines with 'sort file.txt'",
        command: "sort file.txt",
        hint: "Type: sort filename"
      },
      {
        id: "uniq-1",
        instruction: "Remove duplicates with 'uniq file.txt'",
        command: "uniq file.txt",
        hint: "Type: uniq filename"
      }
    ]
  },
  {
    id: 6,
    title: "Archives & Compression",
    description: "Work with tar, gzip, and zip archives",
    xp: 100,
    learningObjectives: [
      "Create and extract archives",
      "Compress and decompress files",
      "Use different archive formats"
    ],
    tasks: [
      {
        id: "tar-1",
        instruction: "Create tar archive with 'tar -cvf archive.tar files'",
        validation: (input) => input.startsWith("tar") && input.includes("-c"),
        hint: "Type: tar -cvf archive.tar files"
      },
      {
        id: "tar-2",
        instruction: "Extract tar archive with 'tar -xvf archive.tar'",
        validation: (input) => input.startsWith("tar") && input.includes("-x"),
        hint: "Type: tar -xvf archive.tar"
      },
      {
        id: "gzip-1",
        instruction: "Compress file with 'gzip file.txt'",
        validation: (input) => input.startsWith("gzip"),
        hint: "Type: gzip filename"
      }
    ]
  }
];
