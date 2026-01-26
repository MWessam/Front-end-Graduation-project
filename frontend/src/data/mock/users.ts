/**
 * Mock data for users and navigation
 */

import type { StudentProfile, NavItem, Notification } from '../types';

/**
 * Current logged-in student user
 */
export const currentStudent: StudentProfile = {
  id: 'student-001',
  firstName: 'Ahmed',
  lastName: 'Emad',
  email: 'ahmed.emad@example.com',
  role: 'student',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
  phone: '+1234567890',
  location: 'Cairo, Egypt',
  enrolledCourses: ['programming', 'math', 'english', 'arabic', 'science'],
  completedCourses: ['arabic'],
  totalXP: 440,
  level: 1,
  streak: 5,
  achievements: ['first-lesson', 'quiz-master'],
};

/**
 * Student sidebar navigation items
 */
export const studentNavItems: NavItem[] = [
  { name: 'Dashboard', iconName: 'Home', path: '/student' },
  { name: 'Courses', iconName: 'Zap', path: '/student/courses' },
  { name: 'Assignments', iconName: 'Trophy', path: '/student/assignments' },
  { name: 'Quizzes', iconName: 'FileText', path: '/student/quizzes' },
  { name: 'Shop', iconName: 'ShoppingBag', path: '/student/shop' },
  { name: 'Profile', iconName: 'User', path: '/student/profile' },
];

/**
 * Teacher sidebar navigation items
 */
export const teacherNavItems: NavItem[] = [
  { name: 'Dashboard', iconName: 'Home', path: '/teacher' },
  { name: 'Classes', iconName: 'Users', path: '/teacher/classes' },
  { name: 'Students', iconName: 'GraduationCap', path: '/teacher/students' },
  { name: 'Library', iconName: 'BookOpen', path: '/teacher/library' },
  { name: 'Notifications', iconName: 'Bell', path: '/teacher/notifications', badge: 3 },
];

/**
 * Sample notifications
 */
export const sampleNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'info',
    message: 'New student joined Class 1',
    timestamp: '2 mins ago',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'success',
    message: 'Assignment posted successfully',
    timestamp: '1 hour ago',
    read: true,
  },
  {
    id: 'notif-3',
    type: 'warning',
    message: 'Quiz deadline approaching',
    timestamp: '3 hours ago',
    read: true,
  },
];

/**
 * Helper to get user's full name
 */
export const getFullName = (user: { firstName: string; lastName: string }): string => {
  return `${user.firstName} ${user.lastName}`;
};

/**
 * Helper to get user initials for avatar
 */
export const getInitials = (user: { firstName: string; lastName: string }): string => {
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
};
