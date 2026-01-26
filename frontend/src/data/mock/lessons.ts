/**
 * Mock data for lesson content
 * 
 * This file contains full lesson content including:
 * - Lesson overviews
 * - Video URLs
 * - Key insights
 * - Concept sections
 */

import type { Lesson, ConceptSection } from '../types';

/**
 * Concept sections for the "Functions" lesson
 */
const functionConceptSections: ConceptSection[] = [
  {
    id: 'intro',
    title: 'Introduction',
    type: 'text',
    content: 'A function in programming is a block of organized, reusable code that is written to perform a single, related action. Instead of writing the same code multiple times, you can put it inside a function and simply call that function whenever you need it.',
  },
  {
    id: 'analogy',
    title: 'Real-Life Analogy',
    type: 'analogy',
    content: 'It helps programmers avoid repeating the same steps over and over again — just like you don\'t rebuild a coffee machine every time you want coffee. Think of a function like a vending machine or a coffee machine.',
  },
  {
    id: 'code-example',
    title: 'Programming View',
    type: 'code',
    content: `function add(a, b) {
  return a + b;
}

const result = add(5, 10); // result is 15`,
    codeLanguage: 'javascript',
  },
  {
    id: 'takeaways',
    title: 'Key Takeaways',
    type: 'takeaways',
    content: 'Think of a function like a vending machine or a coffee machine.|Reusable block of code that performs one specific job.|Block of organized, reusable code that is written to perform a specific task.',
  },
];

/**
 * All lessons data
 */
export const lessons: Record<string, Lesson> = {
  '1': {
    id: '1',
    title: 'Introduction to Programming',
    subtitle: 'Getting started with the basics',
    overview: 'A function in programming is a block of organized, reusable code that is written to perform a single, related action. Instead of writing the same code multiple times, you can put it inside a function and simply call that function whenever you need it.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    keyInsights: [
      'A function in programming is a block of organized, reusable code that is written to perform a single, related action.',
      'It helps avoid repetition — instead of writing the same code many times, you write it once inside a function.',
      'You can call the function whenever you need to use that task again.',
    ],
    conceptSections: functionConceptSections,
    relatedQuizId: 'quiz-1',
    nextLessonId: '2',
  },
  '2': {
    id: '2',
    title: 'Understanding Control Flow',
    subtitle: 'Conditional statements and loops',
    overview: 'Control flow is the order in which individual statements, instructions, or function calls are executed in a program. Understanding control flow helps you write programs that can make decisions and repeat actions.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    keyInsights: [
      'Control flow determines the order of execution in your program.',
      'Conditional statements (if/else) allow your program to make decisions.',
      'Loops (for, while) allow you to repeat code efficiently.',
    ],
    relatedQuizId: 'quiz-2',
    previousLessonId: '1',
    nextLessonId: '3',
  },
  '3': {
    id: '3',
    title: 'Functions and Modularity',
    subtitle: 'Creating reusable code blocks',
    overview: 'Functions are one of the fundamental building blocks in programming. They allow you to encapsulate code into reusable units, making your programs more organized, readable, and maintainable.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    keyInsights: [
      'Functions encapsulate code for reuse throughout your program.',
      'Parameters allow functions to accept input and work with different data.',
      'Return values let functions send results back to the calling code.',
    ],
    conceptSections: functionConceptSections,
    relatedQuizId: 'quiz-3',
    previousLessonId: '2',
    nextLessonId: '4',
  },
  '4': {
    id: '4',
    title: 'MySQL and Database',
    subtitle: 'Introduction to databases',
    overview: 'Databases are organized collections of data that can be easily accessed, managed, and updated. MySQL is one of the most popular relational database management systems.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    keyInsights: [
      'Databases store data in structured tables with rows and columns.',
      'SQL (Structured Query Language) is used to communicate with databases.',
      'CRUD operations (Create, Read, Update, Delete) are fundamental database operations.',
    ],
    relatedQuizId: 'quiz-4',
    previousLessonId: '3',
    nextLessonId: '5',
  },
  '5': {
    id: '5',
    title: 'HTML and Web Structure',
    subtitle: 'Building web pages',
    overview: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements that tell the browser how to display content.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    keyInsights: [
      'HTML elements are the building blocks of web pages.',
      'Tags define the structure and content of a webpage.',
      'Semantic HTML improves accessibility and SEO.',
    ],
    relatedQuizId: 'quiz-5',
    previousLessonId: '4',
  },
};

/**
 * Helper function to get a lesson by ID
 */
export const getLessonById = (id: string): Lesson | undefined => {
  return lessons[id];
};

/**
 * Helper function to get all lessons as an array
 */
export const getAllLessons = (): Lesson[] => {
  return Object.values(lessons);
};

/**
 * Helper function to parse takeaways content (pipe-separated)
 */
export const parseTakeaways = (content: string): string[] => {
  return content.split('|').map(t => t.trim());
};
