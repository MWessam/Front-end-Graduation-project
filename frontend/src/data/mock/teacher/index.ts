/**
 * Central export for teacher portal mock data
 */

// Students
export {
  studentRoster,
  getStudentsByClass,
  getStudentById,
  searchStudents,
} from './students';

// Notifications
export {
  teacherNotifications,
  getUnreadNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from './notifications';

// Library
export {
  libraryResources,
  getResourcesByType,
  searchResources,
  getResourceById,
} from './library';
