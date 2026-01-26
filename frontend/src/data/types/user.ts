/**
 * User and Profile type definitions
 */

/**
 * User role enumeration
 */
export type UserRole = 'student' | 'teacher' | 'admin';

/**
 * Basic user information
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

/**
 * Extended user profile with additional details
 */
export interface UserProfile extends User {
  phone?: string;
  location?: string;
  bio?: string;
  joinedAt?: string; // ISO date string
  lastActiveAt?: string;
}

/**
 * Student-specific data
 */
export interface StudentProfile extends UserProfile {
  role: 'student';
  grade?: string;
  enrolledCourses: string[]; // Course IDs
  completedCourses: string[];
  totalXP: number;
  level: number;
  streak: number; // Days in a row
  achievements: string[]; // Achievement IDs
}

/**
 * Teacher-specific data
 */
export interface TeacherProfile extends UserProfile {
  role: 'teacher';
  department?: string;
  classes: string[]; // Class IDs
  totalStudents: number;
}

/**
 * Navigation item for sidebar
 */
export interface NavItem {
  name: string;
  iconName: string; // Icon component name from lucide-react
  path: string;
  badge?: number; // Optional notification badge count
}

/**
 * Notification item
 */
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string; // Relative time string (e.g., '2 mins ago')
  read: boolean;
  link?: string;
}
