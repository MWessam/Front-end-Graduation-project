/**
 * Mock data for teacher portal - Notifications
 */

import type { Notification } from '../../types';

/**
 * Teacher notifications
 */
export const teacherNotifications: Notification[] = [
  {
    id: 'notif-t1',
    type: 'info',
    message: 'New student joined Class 1',
    timestamp: '2 mins ago',
    read: false,
    link: '/teacher/students',
  },
  {
    id: 'notif-t2',
    type: 'success',
    message: 'Assignment posted successfully',
    timestamp: '1 hour ago',
    read: true,
  },
  {
    id: 'notif-t3',
    type: 'warning',
    message: '5 students have not submitted Quiz 3',
    timestamp: '3 hours ago',
    read: false,
    link: '/teacher/class/1',
  },
  {
    id: 'notif-t4',
    type: 'info',
    message: 'Class 2 exam results are ready',
    timestamp: '1 day ago',
    read: true,
  },
];

/**
 * Get unread notifications
 */
export const getUnreadNotifications = (): Notification[] => {
  return teacherNotifications.filter(n => !n.read);
};

/**
 * Get unread count
 */
export const getUnreadCount = (): number => {
  return teacherNotifications.filter(n => !n.read).length;
};

/**
 * Mark notification as read
 */
export const markAsRead = (id: string): void => {
  const notification = teacherNotifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = (): void => {
  teacherNotifications.forEach(n => {
    n.read = true;
  });
};
