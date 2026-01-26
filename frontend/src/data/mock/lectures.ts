/**
 * Mock data for lectures
 * 
 * This file contains lecture listing data displayed on the Lectures page
 */

import type { Lecture } from '../types';

/**
 * Programming course lectures
 */
export const programmingLectures: Lecture[] = [
  {
    id: 'lecture-1',
    title: 'Introduction to variable data types',
    description: 'Learn about different data types and how to use variables in programming',
    iconName: 'Code',
    lessonId: '1',
  },
  {
    id: 'lecture-2',
    title: 'Understanding the control flow',
    description: 'Master conditional statements and loops for program control',
    iconName: 'Cpu',
    lessonId: '2',
  },
  {
    id: 'lecture-3',
    title: 'Functions and modularity',
    description: 'Create reusable code with functions and understand modular programming',
    iconName: 'Terminal',
    lessonId: '3',
  },
  {
    id: 'lecture-4',
    title: 'MySQL and Database',
    description: 'Learn database fundamentals and SQL queries with MySQL',
    iconName: 'Database',
    lessonId: '4',
  },
  {
    id: 'lecture-5',
    title: 'HTML and Definition',
    description: 'Build web page structure with HyperText Markup Language',
    iconName: 'Layout',
    lessonId: '5',
  },
];

/**
 * All lectures organized by course
 */
export const lecturesByCourse: Record<string, Lecture[]> = {
  programming: programmingLectures,
  // Add more courses here as needed:
  // math: mathLectures,
  // science: scienceLectures,
};

/**
 * Helper function to get lectures for a specific course
 */
export const getLecturesForCourse = (courseId: string): Lecture[] => {
  return lecturesByCourse[courseId] || [];
};

/**
 * Helper function to get a lecture by ID
 */
export const getLectureById = (lectureId: string): Lecture | undefined => {
  for (const lectures of Object.values(lecturesByCourse)) {
    const found = lectures.find(l => l.id === lectureId);
    if (found) return found;
  }
  return undefined;
};
