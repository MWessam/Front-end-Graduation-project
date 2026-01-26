/**
 * Quiz, Exam, and Question type definitions
 */

/**
 * Multiple choice question
 */
export interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation?: string; // Optional explanation shown after answering
  points?: number; // Points for this question (defaults to 1)
}

/**
 * Essay/written response question
 */
export interface EssayQuestion {
  id: number;
  question: string;
  hints?: string[]; // Helper hints shown to student
  keywords: string[]; // Keywords to check in answer validation
  minLength?: number; // Minimum character count
  maxLength?: number; // Maximum character count
  sampleAnswer?: string; // For reference/grading
  points?: number;
}

/**
 * Configuration for a quiz (shorter assessment)
 */
export interface QuizConfig {
  id: string;
  title: string;
  subtitle?: string;
  lessonId: string;
  courseId?: string;
  questions: MCQQuestion[];
  timeLimit?: number; // In seconds, optional for quizzes
  passingScore?: number; // Percentage (0-100)
  allowRetry?: boolean;
  showCorrectAnswers?: boolean;
}

/**
 * Configuration for a full exam
 */
export interface ExamConfig {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  questions: MCQQuestion[];
  totalQuestions: number;
  timeLimit: number; // In seconds (e.g., 30 * 60 for 30 min)
  passingScore: number; // Percentage (e.g., 70)
  allowNavigation: boolean; // Can go back to previous questions
  showTimer: boolean;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
}

/**
 * Essay quiz configuration
 */
export interface EssayQuizConfig {
  id: string;
  title: string;
  lessonId: string;
  questions: EssayQuestion[];
  totalQuestions: number;
}

/**
 * User's answer record for a single question
 */
export interface QuestionAnswer {
  questionId: number;
  selectedAnswer?: number; // For MCQ
  writtenAnswer?: string; // For essay
  isCorrect?: boolean;
  timeSpent?: number; // Seconds spent on this question
}

/**
 * Question status during exam (for navigation UI)
 */
export type QuestionStatus = 'not-seen' | 'unanswered' | 'answered' | 'reviewed';
