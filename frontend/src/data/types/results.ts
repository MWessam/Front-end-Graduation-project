/**
 * Results and Achievement type definitions
 */

/**
 * Individual question result for detailed results view
 */
export interface QuestionResult {
  question: string;
  userAnswer: string;
  status: 'correct' | 'incorrect';
  correctAnswer?: string; // Only shown if incorrect
}

/**
 * Complete quiz/exam result
 */
export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  completedAt: string; // ISO date string
  timeSpent: number; // In seconds
  detailedResults: QuestionResult[];
}

/**
 * Performance stat for achievements page
 */
export interface PerformanceStat {
  id: string;
  label: string;
  value: number; // Percentage (0-100)
  colorClass: string; // Tailwind color class
}

/**
 * Reward earned from completing a lesson/quiz
 */
export interface Reward {
  id: string;
  type: 'xp' | 'coins' | 'badge' | 'rank';
  amount: number;
  label: string;
  icon?: string; // Icon name or emoji
}

/**
 * Achievement/badge definition
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string; // ISO date if unlocked
  progress?: number; // 0-100 if partially complete
  requirement?: string; // What's needed to unlock
}

/**
 * Level progress information
 */
export interface LevelProgress {
  currentLevel: number;
  nextLevel: number;
  currentXP: number;
  xpRequired: number;
  progressPercentage: number;
}
