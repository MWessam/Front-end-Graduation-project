/**
 * Mock data for full exams
 * 
 * Contains the complete 20-question exam for Programming Fundamentals
 */

import type { MCQQuestion, ExamConfig } from '../types';

/**
 * Full exam questions - Programming Fundamentals (20 questions)
 */
export const programmingExamQuestions: MCQQuestion[] = [
  {
    id: 1,
    question: 'What is the primary purpose of a function in programming?',
    options: [
      'To store data and variables',
      'To encapsulate a piece of code for reuse',
      'To style the user interface',
      'To slow down the program execution',
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Which keyword is used to define a function in Python?',
    options: ['function', 'def', 'define', 'func'],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What does the 'return' statement do in a function?",
    options: [
      'Stops the function execution',
      'Prints a value to the console',
      'Sends a value back to the calling code',
      'Defines a new variable',
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: 'What is a parameter in a function?',
    options: [
      'A value returned by the function',
      'A variable that holds the function code',
      'A value passed into the function when it is called',
      'The name of the function',
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: 'What is the difference between parameters and arguments?',
    options: [
      'Parameters are used in function definition, arguments are values passed when calling',
      'Arguments are used in function definition, parameters are values passed when calling',
      'They are the same thing',
      'Parameters are for math functions, arguments are for other functions',
    ],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: 'What is a void function?',
    options: [
      "A function that doesn't take any parameters",
      "A function that doesn't return a value",
      'A function that has empty code',
      "A function that can't be called",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: 'What is function overloading?',
    options: [
      'Creating functions with the same name but different parameters',
      'Making a function run too many times',
      'Creating functions that are too complex',
      'Using too many functions in a program',
    ],
    correctAnswer: 0,
  },
  {
    id: 8,
    question: 'What is recursion in programming?',
    options: [
      'A function that calls other functions',
      'A function that calls itself',
      'A function that runs in a loop',
      'A function that returns multiple values',
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: 'What is a lambda function?',
    options: [
      'A function with no name',
      'A function that only works with numbers',
      'A function that runs automatically',
      "A function that can't be modified",
    ],
    correctAnswer: 0,
  },
  {
    id: 10,
    question: 'What is the scope of a variable in a function?',
    options: [
      'The time it takes for the function to execute',
      'The part of the program where the variable can be accessed',
      'The size of the variable in memory',
      'The number of times the variable is used',
    ],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: 'What is a local variable?',
    options: [
      'A variable declared outside all functions',
      'A variable declared inside a function',
      'A variable that can be accessed from anywhere',
      'A variable that never changes',
    ],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: 'What is a global variable?',
    options: [
      'A variable declared inside a function',
      'A variable declared outside all functions',
      'A variable that is only used once',
      'A variable that changes frequently',
    ],
    correctAnswer: 1,
  },
  {
    id: 13,
    question: "What is the purpose of the 'pass' keyword in Python?",
    options: [
      'To pass arguments to a function',
      'To skip the current iteration in a loop',
      'To create a placeholder for empty code blocks',
      'To pass control to another function',
    ],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: 'What is a default parameter in a function?',
    options: [
      'A parameter that must be provided when calling the function',
      'A parameter that has a predefined value if no argument is provided',
      'A parameter that can only be used once',
      'A parameter that changes automatically',
    ],
    correctAnswer: 1,
  },
  {
    id: 15,
    question: 'What is a recursive function?',
    options: [
      'A function that calls other functions',
      'A function that calls itself',
      'A function that runs very fast',
      'A function that has multiple return statements',
    ],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: 'What is the base case in recursion?',
    options: [
      'The first function called in the recursion',
      'The condition that stops the recursion',
      'The most complex part of the recursive function',
      'The return value of the recursive function',
    ],
    correctAnswer: 1,
  },
  {
    id: 17,
    question: 'What is function composition?',
    options: [
      'Creating functions with the same name',
      'Combining simple functions to build more complex ones',
      'Writing functions in a specific order',
      'Making functions more readable',
    ],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: 'What is a higher-order function?',
    options: [
      'A function that takes other functions as arguments or returns them',
      'A function that is defined at the top of the file',
      'A function that has more parameters than usual',
      'A function that runs faster than others',
    ],
    correctAnswer: 0,
  },
  {
    id: 19,
    question: 'What is a pure function?',
    options: [
      'A function that has no parameters',
      'A function that always returns the same result for the same inputs and has no side effects',
      'A function that only uses local variables',
      'A function that is written in a single line',
    ],
    correctAnswer: 1,
  },
  {
    id: 20,
    question: 'What is a callback function?',
    options: [
      'A function that calls another function',
      'A function that is passed as an argument to another function',
      'A function that returns a value',
      'A function that is called at the end of a program',
    ],
    correctAnswer: 1,
  },
];

/**
 * Programming Fundamentals Exam Configuration
 */
export const programmingExam: ExamConfig = {
  id: 'exam-programming-101',
  title: 'Programming Fundamentals Exam',
  description: 'Test your knowledge of programming fundamentals including functions, variables, and control flow.',
  courseId: 'programming',
  questions: programmingExamQuestions,
  totalQuestions: 20,
  timeLimit: 30 * 60, // 30 minutes in seconds
  passingScore: 70, // 70% = 14 correct answers
  allowNavigation: true,
  showTimer: true,
  shuffleQuestions: false,
  shuffleOptions: false,
};

/**
 * Exam instructions/overview data
 */
export const examInstructions = {
  totalQuestions: 20,
  questionType: 'Multiple Choice Questions',
  timeLimit: 30, // minutes
  passingScore: 70, // percentage
  passingQuestions: 14, // number of correct answers needed
  guidelines: [
    'Do not refresh the page during the exam',
    'Your answers will be automatically saved',
    'The timer will continue even if you close the browser',
    'You cannot pause the exam once started',
  ],
  technicalRequirements: [
    { icon: 'Wifi', text: 'Stable internet' },
    { icon: 'Monitor', text: 'Modern browser' },
    { icon: 'Battery', text: 'Device charged' },
  ],
};

/**
 * All exams indexed by ID
 */
export const exams: Record<string, ExamConfig> = {
  'exam-programming-101': programmingExam,
};

/**
 * Helper function to get exam by ID
 */
export const getExamById = (id: string): ExamConfig | undefined => {
  return exams[id];
};

/**
 * Helper function to get default exam (for backward compatibility)
 */
export const getDefaultExam = (): ExamConfig => {
  return programmingExam;
};
