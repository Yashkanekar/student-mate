export const MOCK_TESTS = {
  "Data structures": {
    mcqs: [
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswer: "O(log n)",
      },
      {
        question: "Which data structure uses FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        correctAnswer: "Queue",
      },
      {
        question: "What is a balanced binary tree?",
        options: [
          "All leaves at the same level",
          "Height difference between subtrees ≤ 1",
          "Completely filled tree",
          "None of these",
        ],
        correctAnswer: "Height difference between subtrees ≤ 1",
      },
    ],
    coding: [
      {
        id: "findMax",
        title: "Find Max in Array",
        description:
          "Write a function that returns the maximum number in an array.",
        template: `function findMax(arr) {\n  // Your code here\n}`,
        testCases: [
          { input: [1, 2, 3], expected: 3 },
          { input: [-1, -4, -2], expected: -1 },
          { input: [5], expected: 5 },
        ],
      },
      {
        id: "reverseArray",
        title: "Reverse an Array",
        description:
          "Write a function that reverses an array without using built-in reverse.",
        template: `function reverseArray(arr) {\n  // Your code here\n}`,
        testCases: [
          { input: [1, 2, 3], expected: [3, 2, 1] },
          { input: [], expected: [] },
          { input: ["a", "b"], expected: ["b", "a"] },
        ],
      },
    ],
  },

  "Operating System": {
    mcqs: [
      {
        question: "What is a kernel?",
        options: [
          "User interface",
          "Memory manager",
          "Core of OS",
          "File system",
        ],
        correctAnswer: "Core of OS",
      },
      {
        question:
          "Which scheduling algorithm gives highest priority to shortest job?",
        options: ["FCFS", "SJF", "RR", "Priority Scheduling"],
        correctAnswer: "SJF",
      },
      {
        question: "What does virtual memory allow?",
        options: [
          "Physical memory expansion",
          "Isolation of processes",
          "Execution of processes larger than physical memory",
          "Improved file system access",
        ],
        correctAnswer: "Execution of processes larger than physical memory",
      },
    ],
    coding: [
      {
        id: "simulateRoundRobin",
        title: "Simulate Round Robin Scheduling",
        description:
          "Write a function to simulate round robin scheduling given burst times and quantum.",
        template: `function simulateRoundRobin(processes, quantum) {\n  // Your code here\n}`,
        testCases: [
          {
            input: [
              [
                { id: 1, burst: 5 },
                { id: 2, burst: 3 },
              ],
              2,
            ],
            expected: "output format depends on implementation",
          },
        ],
      },
    ],
  },

  DBMS: {
    mcqs: [
      {
        question: "What is normalization?",
        options: [
          "Redundancy reduction",
          "Data encryption",
          "Data backup",
          "Query optimization",
        ],
        correctAnswer: "Redundancy reduction",
      },
      {
        question: "Which normal form eliminates transitive dependency?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswer: "3NF",
      },
      {
        question: "What is a primary key?",
        options: [
          "A unique identifier for rows in a table",
          "Foreign key constraint",
          "An index",
          "A column with null values",
        ],
        correctAnswer: "A unique identifier for rows in a table",
      },
    ],
    coding: [
      {
        id: "validateNormalization",
        title: "Check Normal Form Compliance",
        description:
          "Write a function to check if a table satisfies 3NF given dependencies.",
        template: `function validateNormalization(table, dependencies) {\n  // Your code here\n}`,
        testCases: [
          {
            input: [{ cols: ["A", "B"], rows: [] }, [{ from: "A", to: "B" }]],
            expected: true,
          },
          {
            input: [
              { cols: ["A", "B", "C"], rows: [] },
              [{ from: "A", to: "C" }],
            ],
            expected: false,
          },
        ],
      },
    ],
  },

  "Computer Networks": {
    mcqs: [
      {
        question: "Which layer is responsible for routing?",
        options: ["Application", "Network", "Data Link", "Physical"],
        correctAnswer: "Network",
      },
      {
        question: "What does TCP stand for?",
        options: [
          "Transmission Control Protocol",
          "Transport Communication Protocol",
          "Transfer Control Protocol",
          "Timing Control Protocol",
        ],
        correctAnswer: "Transmission Control Protocol",
      },
      {
        question: "What protocol is used to assign IP addresses dynamically?",
        options: ["TCP", "UDP", "DHCP", "FTP"],
        correctAnswer: "DHCP",
      },
    ],
    coding: [
      {
        id: "parsePacketHeaders",
        title: "Parse Packet Headers",
        description:
          "Write a function that extracts source and destination IPs from a packet header string.",
        template: `function parsePacketHeaders(header) {\n  // Your code here\n}`,
        testCases: [
          {
            input: ["src=192.168.1.1;dst=10.0.0.1;"],
            expected: { source: "192.168.1.1", destination: "10.0.0.1" },
          },
          {
            input: ["dst=172.16.0.1;src=192.168.0.2;"],
            expected: { source: "192.168.0.2", destination: "172.16.0.1" },
          },
        ],
      },
    ],
  },
};

export const PRACTICE_QUESTIONS = {
  "Data structures": {
    theory: [
      {
        question: "What is time complexity?",
        answer:
          "It's a measure of the number of operations an algorithm performs.",
      },
      {
        question: "Explain arrays.",
        answer:
          "Arrays are contiguous blocks of memory storing elements of the same type.",
      },
      {
        question: "What is a queue?",
        answer:
          "A queue is a linear data structure which follows FIFO (First In First Out) principle.",
      },
    ],
    coding: [
      {
        id: "reverseArray",
        title: "Reverse an Array",
        description:
          "Write a function that reverses an array without using built-in reverse.",
        template: `function reverseArray(arr) {
  // Your code here
}`,
        testCases: [
          { input: [1, 2, 3], expected: [3, 2, 1] },
          { input: [], expected: [] },
          { input: ["a", "b"], expected: ["b", "a"] },
        ],
      },
      {
        id: "isPalindrome",
        title: "Check Palindrome",
        description: "Write a function to check if a string is a palindrome.",
        template: `function isPalindrome(str) {
  // Your code here
}`,
        testCases: [
          { input: "racecar", expected: true },
          { input: "hello", expected: false },
          { input: "", expected: true },
        ],
      },
    ],
  },

  "Operating System": {
    theory: [
      {
        question: "What is a kernel?",
        answer: "The kernel manages system resources and hardware.",
      },
      {
        question: "Explain memory management.",
        answer:
          "Memory management handles allocation and deallocation of memory space as needed by programs.",
      },
    ],
    coding: [
      {
        id: "simulateProcessScheduling",
        title: "Simulate Process Scheduling",
        description:
          "Write a function that simulates round-robin scheduling for processes.",
        template: `function simulateProcessScheduling(processes, quantum) {
  // Your implementation here
}`,
        testCases: [
          {
            input: [
              [
                { id: 1, burst: 5 },
                { id: 2, burst: 3 },
              ],
              2,
            ],
            expected: "output format up to your design",
          },
        ],
      },
    ],
  },

  DBMS: {
    theory: [
      {
        question: "What is normalization?",
        answer:
          "Normalization organizes data to reduce redundancy and improve integrity.",
      },
      {
        question: "Explain relational model.",
        answer:
          "The relational model organizes data into tables (relations) with rows and columns.",
      },
    ],
    coding: [],
  },

  "Computer Networks": {
    theory: [
      {
        question: "What is the function of the Transport Layer?",
        answer:
          "It provides transparent transfer of data between end systems and error recovery.",
      },
      {
        question: "Explain the OSI model briefly.",
        answer:
          "The OSI model is a conceptual framework with 7 layers that standardize network communication.",
      },
    ],
    coding: [],
  },
};

export const SYLLABUS = {
  "Data structures": [
    "Time Complexity",
    "Searching",
    "Sorting",
    "Arrays",
    "Strings",
    "Queues",
  ],
  "Operating System": [
    "Kernel",
    "Memory Management",
    "Process Management",
    "I/O systems",
  ],
  DBMS: ["Relational Model", "Data Modeling", "Normalization", "SQL"],
  "Computer Networks": [
    "Network Models",
    "Physical Layer",
    "Data Link Layer",
    "Transport Layer",
    "Application Layer",
  ],
};
