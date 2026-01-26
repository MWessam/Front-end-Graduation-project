/**
 * Teacher portal specific type definitions
 */

/**
 * Class/classroom data
 */
export interface ClassData {
  id: number;
  name: string;
  description: string;
  location: string;
  sets: number;
  members: number;
  exams: number;
  color: string; // Hex color (e.g., '#22c55e')
  createdAt?: string;
}

/**
 * Student in a class roster
 */
export interface StudentRecord {
  id: string;
  name: string;
  email?: string;
  className: string;
  avatarInitial: string; // First letter for avatar
  enrolledAt?: string;
  lastActive?: string;
  progress?: number;
}

/**
 * Library resource item
 */
export interface LibraryResource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'presentation' | 'link';
  description?: string;
  iconType: 'document' | 'video'; // For icon styling
  uploadedAt?: string;
  views?: number;
  downloadUrl?: string;
}

/**
 * Class material
 */
export interface ClassMaterial {
  id: number;
  title: string;
  type: 'document' | 'presentation' | 'video' | 'link';
  description: string;
  date: string;
  views: number;
  classId?: number;
}

/**
 * Teacher-created exam
 */
export interface TeacherExam {
  id: number;
  title: string;
  type: 'quiz' | 'midterm' | 'final';
  date: string;
  duration: number; // In minutes
  totalMarks: number;
  description?: string;
  questions: TeacherExamQuestion[];
  submissions: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  classId?: number;
}

/**
 * Question created by teacher for exam
 */
export interface TeacherExamQuestion {
  id: number;
  type: 'multiple-choice' | 'essay' | 'true-false';
  question: string;
  marks: number;
  options?: string[];
  correctAnswer?: number;
  sampleAnswer?: string;
}

/**
 * Activity assignment form data
 */
export interface ActivityAssignment {
  id?: string;
  title: string;
  classId: string;
  description: string;
  dueDate?: string;
  type?: 'quiz' | 'assignment' | 'project';
}
