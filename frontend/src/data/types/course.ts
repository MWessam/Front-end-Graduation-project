/**
 * Course-related type definitions
 */

/**
 * Represents a course in the course catalog
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category?: string;
  isActive?: boolean;
}

/**
 * Represents a student's progress in a specific course
 * Used in Dashboard progress table
 */
export interface CourseProgress {
  courseId: string;
  name: string;
  grade: string;
  progress: number; // 0-100
  colorClass: string; // Tailwind color class e.g. 'bg-green-500'
}

/**
 * Daily quest/challenge configuration
 */
export interface DailyQuest {
  id: string;
  title: string;
  icon: string; // Icon name from lucide-react
  iconColor: string; // Tailwind color class
  current: number;
  target: number;
  progressColor: string; // Tailwind color class for progress bar
}

/**
 * Gamification/XP related data
 */
export interface GamificationStats {
  xp: number;
  coins: number;
  level: number;
  xpToNextLevel: number;
  league: string;
  dailyQuests: DailyQuest[];
}
