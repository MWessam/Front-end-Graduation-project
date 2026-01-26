/**
 * Mock data for assignments
 */

import type { Assignment, DashboardAssignment } from '../types';

/**
 * Student assignments list (Assignments page)
 */
export const studentAssignments: Assignment[] = [
  {
    id: 1,
    title: 'Quiz 1',
    subject: 'Math',
    lesson: 'in lesson 1 point 4',
    date: 'Oct 30, 2025',
    status: 'pending',
    type: 'quiz',
  },
  {
    id: 2,
    title: 'Quiz 2',
    subject: 'Programming',
    lesson: 'in lesson 1 point 4',
    date: 'Oct 30, 2025',
    status: 'pending',
    type: 'quiz',
  },
  {
    id: 3,
    title: 'Quiz 3',
    subject: 'English',
    lesson: 'in lesson 1 point 4',
    date: 'Oct 30, 2025',
    status: 'pending',
    type: 'quiz',
  },
  {
    id: 4,
    title: 'Quiz 4',
    subject: 'Math',
    lesson: 'in lesson 1 point 4',
    date: 'Oct 30, 2025',
    status: 'pending',
    type: 'quiz',
  },
];

/**
 * Completed assignments (for demo purposes, same as pending)
 */
export const completedAssignments: Assignment[] = [
  {
    id: 101,
    title: 'Quiz 1',
    subject: 'Math',
    lesson: 'in lesson 1 point 4',
    date: 'Oct 25, 2025',
    status: 'completed',
    type: 'quiz',
  },
  {
    id: 102,
    title: 'Quiz 2',
    subject: 'Programming',
    lesson: 'in lesson 1 point 4',
    date: 'Oct 25, 2025',
    status: 'completed',
    type: 'quiz',
  },
  {
    id: 103,
    title: 'Quiz 3',
    subject: 'English',
    lesson: 'in lesson 1 point 4',
    date: 'Oct 25, 2025',
    status: 'completed',
    type: 'quiz',
  },
  {
    id: 104,
    title: 'Quiz 4',
    subject: 'Math',
    lesson: 'in lesson 1 point 4',
    date: 'Oct 25, 2025',
    status: 'completed',
    type: 'quiz',
  },
];

/**
 * Dashboard upcoming assignments (with styling info)
 */
export const dashboardAssignments: DashboardAssignment[] = [
  {
    id: 'dash-1',
    title: 'Psychology Paper 2',
    subtitle: 'Due this week',
    iconName: 'FileText',
    iconBg: 'bg-blue-500',
    iconColor: 'text-white',
    bgColor: 'bg-blue-100 dark:bg-blue-900/40',
  },
  {
    id: 'dash-2',
    title: 'Problem Solving',
    subtitle: 'Due this week',
    iconName: 'Brain',
    iconBg: 'bg-purple-600/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-slate-50 dark:bg-zinc-800',
  },
  {
    id: 'dash-3',
    title: 'Art History Essay',
    subtitle: 'Due this week',
    iconName: 'PenTool',
    iconBg: 'bg-blue-600/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-slate-50 dark:bg-zinc-800',
  },
];

/**
 * Helper function to get assignments by status
 */
export const getAssignmentsByStatus = (status: Assignment['status']): Assignment[] => {
  return studentAssignments.filter(a => a.status === status);
};

/**
 * Helper function to get assignments by subject
 */
export const getAssignmentsBySubject = (subject: string): Assignment[] => {
  return studentAssignments.filter(a => a.subject === subject);
};
