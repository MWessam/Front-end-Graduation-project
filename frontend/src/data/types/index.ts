/**
 * Central export for all type definitions
 * 
 * Usage:
 * import { Course, Lesson, MCQQuestion } from '@/data/types';
 * // or
 * import type { Course, Lesson } from '@/data/types';
 */

// Course types
export type {
  Course,
  CourseProgress,
  DailyQuest,
  GamificationStats,
} from './course';

// Lesson types
export type {
  Lecture,
  ConceptSection,
  Lesson,
  LessonProgress,
} from './lesson';

// Quiz and Exam types
export type {
  MCQQuestion,
  EssayQuestion,
  QuizConfig,
  ExamConfig,
  EssayQuizConfig,
  QuestionAnswer,
  QuestionStatus,
} from './quiz';

// Assignment types
export type {
  Assignment,
  DashboardAssignment,
  AssignmentSubmission,
} from './assignment';

// Results and Achievement types
export type {
  QuestionResult,
  QuizResult,
  PerformanceStat,
  Reward,
  Achievement,
  LevelProgress,
} from './results';

// User types
export type {
  UserRole,
  User,
  UserProfile,
  StudentProfile,
  TeacherProfile,
  NavItem,
  Notification,
} from './user';

// Teacher portal types
export type {
  ClassData,
  StudentRecord,
  LibraryResource,
  ClassMaterial,
  TeacherExam,
  TeacherExamQuestion,
  ActivityAssignment,
} from './teacher';
