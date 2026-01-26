/**
 * Mock data for courses
 * 
 * This file contains all course-related mock data including:
 * - Course catalog (AllCourses page)
 * - Course progress (Dashboard page)
 * - Gamification stats
 */

import type { Course, CourseProgress, DailyQuest, GamificationStats } from '../types';

/**
 * Course catalog - displayed on AllCourses page
 */
export const courseCatalog: Course[] = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Learn coding languages and software development',
    imageSrc: '/images/software 1.png',
    category: 'Technology',
  },
  {
    id: 'english',
    title: 'English',
    description: 'Master the English language and communication',
    imageSrc: '/images/softwakre 1.png',
    category: 'Languages',
  },
  {
    id: 'math',
    title: 'Math',
    description: 'Explore mathematics and problem solving',
    imageSrc: '/images/softwdare 1.png',
    category: 'Sciences',
  },
  {
    id: 'arabic',
    title: 'Arabic',
    description: 'Learn Arabic language and literature',
    imageSrc: '/images/v2.png',
    category: 'Languages',
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Discover scientific principles and experiments',
    imageSrc: '/images/science1.png',
    category: 'Sciences',
  },
  {
    id: 'physics',
    title: 'Physics',
    description: 'Understand the laws of the physical world',
    imageSrc: '/images/physics1.png',
    category: 'Sciences',
  },
  {
    id: 'french',
    title: 'French',
    description: 'Learn French language and culture',
    imageSrc: '/images/french1.png',
    category: 'Languages',
  },
  {
    id: 'spanish',
    title: 'Spanish',
    description: 'Master Spanish speaking and writing',
    imageSrc: '/images/physics1.png', // Placeholder - reusing existing image
    category: 'Languages',
  },
  {
    id: 'italian',
    title: 'Italian',
    description: 'Explore Italian language and heritage',
    imageSrc: '/images/spain1.png',
    category: 'Languages',
  },
];

/**
 * Student's course progress - displayed on Dashboard
 */
export const studentCourseProgress: CourseProgress[] = [
  { courseId: 'arabic', name: 'Arabic', grade: 'A+', progress: 95, colorClass: 'bg-green-500' },
  { courseId: 'programming', name: 'Programming', grade: 'B+', progress: 80, colorClass: 'bg-yellow-400' },
  { courseId: 'science', name: 'Science', grade: 'A+', progress: 95, colorClass: 'bg-green-500' },
  { courseId: 'english', name: 'English', grade: 'A+', progress: 90, colorClass: 'bg-green-500' },
  { courseId: 'math', name: 'Maths', grade: 'B+', progress: 66, colorClass: 'bg-green-500' },
];

/**
 * Daily quests configuration
 */
export const dailyQuests: DailyQuest[] = [
  {
    id: 'earn-xp',
    title: 'Earn 10 XP',
    icon: 'Zap',
    iconColor: 'text-yellow-500',
    current: 10,
    target: 10,
    progressColor: 'bg-yellow-400',
  },
  {
    id: 'correct-streak',
    title: 'Get 5 in a row correct',
    icon: 'Target',
    iconColor: 'text-green-500',
    current: 0,
    target: 2,
    progressColor: 'bg-green-500',
  },
  {
    id: 'listen-exercises',
    title: 'Listen to 7 exercises',
    icon: 'Volume2',
    iconColor: 'text-blue-500',
    current: 0,
    target: 7,
    progressColor: 'bg-blue-500',
  },
];

/**
 * Current user's gamification stats
 */
export const gamificationStats: GamificationStats = {
  xp: 440,
  coins: 150,
  level: 1,
  xpToNextLevel: 1000,
  league: 'Silver League',
  dailyQuests: dailyQuests,
};

/**
 * Helper function to get a course by ID
 */
export const getCourseById = (id: string): Course | undefined => {
  return courseCatalog.find(course => course.id === id);
};

/**
 * Helper function to get courses by category
 */
export const getCoursesByCategory = (category: string): Course[] => {
  return courseCatalog.filter(course => course.category === category);
};
