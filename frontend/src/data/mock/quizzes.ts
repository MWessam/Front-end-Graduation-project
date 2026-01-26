/**
 * Mock data for quizzes (shorter assessments)
 * 
 * For full exam questions, see exams.ts
 */

import type { MCQQuestion, QuizConfig, EssayQuestion, EssayQuizConfig } from '../types';

/**
 * Quiz questions for Programming Fundamentals (Lesson 1)
 */
export const programmingQuizQuestions: MCQQuestion[] = [
  {
    id: 1,
    question: 'What is a function?',
    options: [
      'A variable that stores data',
      'A reusable block of code that performs a specific task',
      'A type of loop',
      'A way to style web pages',
    ],
    correctAnswer: 1,
    explanation: 'A function is a reusable block of code designed to perform a particular task.',
  },
  {
    id: 2,
    question: 'Which is a valid variable name?',
    options: [
      '1variable',
      'my-variable',
      '_variable',
      'my variable',
    ],
    correctAnswer: 2,
    explanation: 'Variable names can start with underscore or letter, but not numbers or contain spaces/hyphens.',
  },
  {
    id: 3,
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Hyper Transfer Markup Language',
      'Home Tool Markup Language',
    ],
    correctAnswer: 0,
    explanation: 'HTML stands for HyperText Markup Language.',
  },
  {
    id: 4,
    question: 'What is the primary purpose of CSS?',
    options: [
      'To add interactivity',
      'Styling web pages',
      'To store data',
      'To create databases',
    ],
    correctAnswer: 1,
    explanation: 'CSS (Cascading Style Sheets) is used to style and layout web pages.',
  },
  {
    id: 5,
    question: 'What is PHP primarily used for?',
    options: [
      'Client side scripting',
      'Database management',
      'Server side scripting',
      'Styling web pages',
    ],
    correctAnswer: 2,
    explanation: 'PHP is a server-side scripting language designed for web development.',
  },
];

/**
 * Programming Fundamentals Quiz Configuration
 */
export const programmingQuiz: QuizConfig = {
  id: 'quiz-1',
  title: 'Programming Fundamentals Quiz',
  subtitle: 'Lesson: Introduction to Functions',
  lessonId: '1',
  courseId: 'programming',
  questions: programmingQuizQuestions,
  passingScore: 70,
  allowRetry: true,
  showCorrectAnswers: true,
};

/**
 * Essay questions for Functions lesson
 */
export const functionEssayQuestions: EssayQuestion[] = [
  {
    id: 1,
    question: 'Explain the concept of a Function in your own words.',
    hints: ['Include keywords like "reusable", "block of code", "task".'],
    keywords: ['function', 'reusable', 'code', 'block', 'task'],
    minLength: 50,
    maxLength: 500,
    points: 10,
  },
  {
    id: 2,
    question: 'Describe the difference between parameters and arguments.',
    hints: ['Think about when each term is used.'],
    keywords: ['parameter', 'argument', 'definition', 'call', 'value'],
    minLength: 50,
    maxLength: 500,
    points: 10,
  },
  {
    id: 3,
    question: 'Why is code reusability important in programming?',
    hints: ['Consider maintenance, efficiency, and readability.'],
    keywords: ['reusability', 'maintenance', 'efficient', 'readable', 'DRY'],
    minLength: 50,
    maxLength: 500,
    points: 10,
  },
  {
    id: 4,
    question: 'Explain the concept of scope in functions.',
    hints: ['Think about where variables can be accessed.'],
    keywords: ['scope', 'local', 'global', 'access', 'variable'],
    minLength: 50,
    maxLength: 500,
    points: 10,
  },
  {
    id: 5,
    question: 'What is the purpose of the return statement in a function?',
    hints: ['Consider what happens after a function completes.'],
    keywords: ['return', 'value', 'output', 'result', 'calling'],
    minLength: 50,
    maxLength: 500,
    points: 10,
  },
];

/**
 * Essay Quiz Configuration
 */
export const functionEssayQuiz: EssayQuizConfig = {
  id: 'essay-quiz-1',
  title: 'Essay Questions',
  lessonId: '1',
  questions: functionEssayQuestions,
  totalQuestions: 5,
};

/**
 * All quizzes indexed by ID
 */
export const quizzes: Record<string, QuizConfig> = {
  'quiz-1': programmingQuiz,
};

/**
 * All essay quizzes indexed by ID
 */
export const essayQuizzes: Record<string, EssayQuizConfig> = {
  'essay-quiz-1': functionEssayQuiz,
};

/**
 * Helper function to get quiz by ID
 */
export const getQuizById = (id: string): QuizConfig | undefined => {
  return quizzes[id];
};

/**
 * Helper function to get essay quiz by ID
 */
export const getEssayQuizById = (id: string): EssayQuizConfig | undefined => {
  return essayQuizzes[id];
};
