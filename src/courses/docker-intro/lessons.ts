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
    title: "Docker Basics",
    description: "Understanding containers and Docker fundamentals",
    xp: 50,
    learningObjectives: [
      "Understand what Docker is",
      "Learn about containers vs VMs",
      "Check Docker installation"
    ],
    tasks: [
      {
        id: "docker-1",
        instruction: "Check Docker version with 'docker --version'",
        command: "docker --version",
        hint: "Type: docker --version"
      },
      {
        id: "docker-2",
        instruction: "View Docker info with 'docker info'",
        command: "docker info",
        hint: "Type: docker info"
      },
      {
        id: "docker-3",
        instruction: "See Docker help with 'docker --help'",
        command: "docker --help",
        hint: "Type: docker --help"
      }
    ]
  },
  {
    id: 2,
    title: "Working with Images",
    description: "Learn to pull and manage Docker images",
    xp: 75,
    learningObjectives: [
      "Pull images from Docker Hub",
      "List available images",
      "Understand image layers"
    ],
    tasks: [
      {
        id: "docker-4",
        instruction: "Pull an image with 'docker pull hello-world'",
        validation: (input) => input.startsWith("docker pull"),
        hint: "Type: docker pull hello-world"
      },
      {
        id: "docker-5",
        instruction: "List images with 'docker images'",
        command: "docker images",
        hint: "Type: docker images"
      },
      {
        id: "docker-6",
        instruction: "View image history with 'docker history'",
        validation: (input) => input.startsWith("docker history"),
        hint: "Type: docker history <image-name>"
      }
    ]
  },
  {
    id: 3,
    title: "Running Containers",
    description: "Master container lifecycle and basic operations",
    xp: 100,
    learningObjectives: [
      "Run containers from images",
      "List running containers",
      "Stop and start containers"
    ],
    tasks: [
      {
        id: "docker-7",
        instruction: "Run a container with 'docker run hello-world'",
        validation: (input) => input.startsWith("docker run"),
        hint: "Type: docker run hello-world"
      },
      {
        id: "docker-8",
        instruction: "List running containers with 'docker ps'",
        command: "docker ps",
        hint: "Type: docker ps"
      },
      {
        id: "docker-9",
        instruction: "List all containers with 'docker ps -a'",
        command: "docker ps -a",
        hint: "Type: docker ps -a"
      }
    ]
  },
  {
    id: 4,
    title: "Container Management",
    description: "Learn advanced container operations",
    xp: 100,
    learningObjectives: [
      "Stop and remove containers",
      "Execute commands in containers",
      "View container logs"
    ],
    tasks: [
      {
        id: "docker-10",
        instruction: "Stop a container with 'docker stop'",
        validation: (input) => input.startsWith("docker stop"),
        hint: "Type: docker stop <container-id>"
      },
      {
        id: "docker-11",
        instruction: "Remove a container with 'docker rm'",
        validation: (input) => input.startsWith("docker rm"),
        hint: "Type: docker rm <container-id>"
      },
      {
        id: "docker-12",
        instruction: "View container logs with 'docker logs'",
        validation: (input) => input.startsWith("docker logs"),
        hint: "Type: docker logs <container-id>"
      }
    ]
  },
  {
    id: 5,
    title: "Building Images",
    description: "Create custom Docker images with Dockerfile",
    xp: 125,
    learningObjectives: [
      "Understand Dockerfile syntax",
      "Build custom images",
      "Tag and push images"
    ],
    tasks: [
      {
        id: "docker-13",
        instruction: "Build an image with 'docker build -t myapp .'",
        validation: (input) => input.startsWith("docker build") && input.includes("-t"),
        hint: "Type: docker build -t myapp ."
      },
      {
        id: "docker-14",
        instruction: "Tag an image with 'docker tag'",
        validation: (input) => input.startsWith("docker tag"),
        hint: "Type: docker tag <image> <new-tag>"
      },
      {
        id: "docker-15",
        instruction: "Inspect an image with 'docker inspect'",
        validation: (input) => input.startsWith("docker inspect"),
        hint: "Type: docker inspect <image-name>"
      }
    ]
  },
  {
    id: 6,
    title: "Docker Networks & Volumes",
    description: "Learn about Docker networking and persistent storage",
    xp: 125,
    learningObjectives: [
      "Create and manage networks",
      "Use volumes for data persistence",
      "Connect containers"
    ],
    tasks: [
      {
        id: "docker-16",
        instruction: "List networks with 'docker network ls'",
        command: "docker network ls",
        hint: "Type: docker network ls"
      },
      {
        id: "docker-17",
        instruction: "Create a network with 'docker network create'",
        validation: (input) => input.startsWith("docker network create"),
        hint: "Type: docker network create mynetwork"
      },
      {
        id: "docker-18",
        instruction: "List volumes with 'docker volume ls'",
        command: "docker volume ls",
        hint: "Type: docker volume ls"
      }
    ]
  }
];
