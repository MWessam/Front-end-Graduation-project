/**
 * Mock data for teacher portal - Students
 */

import type { StudentRecord } from '../../types';

/**
 * Student roster
 */
export const studentRoster: StudentRecord[] = [
  {
    id: 'student-001',
    name: 'Sarah Ahmed',
    email: 'sarah.ahmed@example.com',
    className: 'Class 1',
    avatarInitial: 'S',
    enrolledAt: '2025-09-01',
    lastActive: '2025-10-28',
    progress: 85,
  },
  {
    id: 'student-002',
    name: 'Mohamed Ali',
    email: 'mohamed.ali@example.com',
    className: 'Class 2',
    avatarInitial: 'M',
    enrolledAt: '2025-09-01',
    lastActive: '2025-10-27',
    progress: 72,
  },
  {
    id: 'student-003',
    name: 'Fatima Hassan',
    email: 'fatima.hassan@example.com',
    className: 'Class 1',
    avatarInitial: 'F',
    enrolledAt: '2025-09-05',
    lastActive: '2025-10-28',
    progress: 90,
  },
  {
    id: 'student-004',
    name: 'Omar Khalil',
    email: 'omar.khalil@example.com',
    className: 'Class 2',
    avatarInitial: 'O',
    enrolledAt: '2025-09-10',
    lastActive: '2025-10-26',
    progress: 65,
  },
];

/**
 * Get students by class name
 */
export const getStudentsByClass = (className: string): StudentRecord[] => {
  return studentRoster.filter(s => s.className === className);
};

/**
 * Get student by ID
 */
export const getStudentById = (id: string): StudentRecord | undefined => {
  return studentRoster.find(s => s.id === id);
};

/**
 * Search students by name
 */
export const searchStudents = (query: string): StudentRecord[] => {
  const lowerQuery = query.toLowerCase();
  return studentRoster.filter(s => 
    s.name.toLowerCase().includes(lowerQuery) ||
    s.email?.toLowerCase().includes(lowerQuery)
  );
};
