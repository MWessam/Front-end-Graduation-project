/**
 * Mock data for results and achievements
 */

import type { QuestionResult, QuizResult, PerformanceStat, Reward, LevelProgress } from '../types';

/**
 * Sample quiz detailed results
 */
export const sampleDetailedResults: QuestionResult[] = [
  {
    question: 'What is a function?',
    userAnswer: 'Reusable code block',
    status: 'correct',
  },
  {
    question: 'Valid variable name?',
    userAnswer: '_variable',
    status: 'correct',
  },
  {
    question: 'HTML stands for?',
    userAnswer: 'Hyper Text Markup Language',
    status: 'correct',
  },
  {
    question: 'CSS purpose?',
    userAnswer: 'Styling',
    status: 'correct',
  },
  {
    question: 'PHP usage?',
    userAnswer: 'Client side scripting',
    status: 'incorrect',
    correctAnswer: 'Server side scripting',
  },
];

/**
 * Sample quiz result
 */
export const sampleQuizResult: QuizResult = {
  quizId: 'quiz-1',
  score: 8,
  totalQuestions: 10,
  percentage: 80,
  passed: true,
  completedAt: new Date().toISOString(),
  timeSpent: 420, // 7 minutes
  detailedResults: sampleDetailedResults,
};

/**
 * Performance stats for achievements page
 */
export const performanceStats: PerformanceStat[] = [
  {
    id: 'mcq-score',
    label: 'MCQ Score',
    value: 85,
    colorClass: 'bg-green-500',
  },
  {
    id: 'essay-score',
    label: 'Essay Score',
    value: 45,
    colorClass: 'bg-yellow-500',
  },
  {
    id: 'quiz-accuracy',
    label: 'Quiz Accuracy',
    value: 80,
    colorClass: 'bg-blue-500',
  },
];

/**
 * Rewards earned from completing a lesson
 */
export const lessonRewards: Reward[] = [
  {
    id: 'xp-reward',
    type: 'xp',
    amount: 150,
    label: 'XP Earned',
    icon: 'Star',
  },
  {
    id: 'coins-reward',
    type: 'coins',
    amount: 50,
    label: 'Coins Collected',
    icon: '🪙',
  },
  {
    id: 'rank-reward',
    type: 'rank',
    amount: 10,
    label: 'New Rank',
    icon: 'Award',
  },
];

/**
 * Current level progress
 */
export const currentLevelProgress: LevelProgress = {
  currentLevel: 1,
  nextLevel: 2,
  currentXP: 150,
  xpRequired: 1000,
  progressPercentage: 15,
};

/**
 * Achievement celebration data (for Achievements page)
 */
export const lessonCompleteData = {
  title: 'Congratulations! Lesson 1 Complete',
  subtitle: 'You have unlocked new achievements and earned valuable rewards!',
  performanceStats,
  rewards: lessonRewards,
  levelProgress: currentLevelProgress,
};

/**
 * Helper to calculate percentage
 */
export const calculatePercentage = (score: number, total: number): number => {
  return Math.round((score / total) * 100);
};

/**
 * Helper to determine pass/fail
 */
export const isPassing = (percentage: number, passingScore: number = 70): boolean => {
  return percentage >= passingScore;
};
