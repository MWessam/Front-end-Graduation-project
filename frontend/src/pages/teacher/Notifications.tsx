import { useState } from 'react';
import '../../styles/teacher/notifications.css';
import { teacherNotifications, markAllAsRead } from '../../data/mock/teacher';
import type { Notification } from '../../data/types';

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(teacherNotifications);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    markAllAsRead(); // Also update the mock data
  };

  const getIconClass = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  const getIconName = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
        <button className="btn-secondary" onClick={handleMarkAllRead}>
          Mark all as read
        </button>
      </div>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`notification-item ${!notification.read ? 'unread' : ''}`}
          >
            <div className={`notification-icon ${getIconClass(notification.type)}`}>
              <span className="material-symbols-outlined">{getIconName(notification.type)}</span>
            </div>
            <div className="notification-content">
              <p>{notification.message}</p>
              <span className="time">{notification.timestamp}</span>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light-secondary)' }}>
            <p>No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
