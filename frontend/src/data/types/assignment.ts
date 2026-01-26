/**
 * Assignment type definitions
 */

/**
 * Represents a student assignment
 */
export interface Assignment {
  id: number;
  title: string;
  subject: string;
  lesson: string;
  date: string; // Display date string (e.g., 'Oct 30, 2025')
  dueDate?: string; // ISO date string for sorting/comparison
  status?: 'pending' | 'completed' | 'overdue';
  type?: 'quiz' | 'essay' | 'project' | 'homework';
}

/**
 * Dashboard assignment card (with styling info)
 */
export interface DashboardAssignment {
  id: string;
  title: string;
  subtitle: string;
  iconName: string; // Icon component name from lucide-react
  iconBg: string; // Tailwind background class
  iconColor: string; // Tailwind text color class
  bgColor: string; // Card background color class
  link?: string;
}

/**
 * Assignment submission record
 */
export interface AssignmentSubmission {
  assignmentId: number;
  submittedAt: string; // ISO date string
  score?: number;
  feedback?: string;
  attempts: number;
}
