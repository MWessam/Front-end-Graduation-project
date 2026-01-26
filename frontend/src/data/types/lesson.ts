/**
 * Lesson and Lecture type definitions
 */

/**
 * Represents a lecture card shown in the Lectures listing page
 */
export interface Lecture {
  id: string;
  title: string;
  description: string;
  iconName: string; // Icon component name from lucide-react (e.g., 'Code', 'Database')
  lessonId: string; // Links to the full lesson content
}

/**
 * A section within a concept/lesson explanation
 */
export interface ConceptSection {
  id: string;
  title: string;
  type: 'text' | 'code' | 'analogy' | 'takeaways';
  content: string;
  codeLanguage?: string; // For code sections (e.g., 'javascript', 'python')
}

/**
 * Represents the full content of a lesson
 */
export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  overview: string;
  videoUrl?: string;
  keyInsights: string[];
  conceptSections?: ConceptSection[];
  relatedQuizId?: string;
  nextLessonId?: string;
  previousLessonId?: string;
}

/**
 * Lesson completion/progress tracking
 */
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string; // ISO date string
  videoWatched: boolean;
  quizCompleted: boolean;
  quizScore?: number;
}
