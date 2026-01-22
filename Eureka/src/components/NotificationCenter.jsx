import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotificationCenter.css';

const NotificationCenter = ({ notifications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getNotificationIcon = (type) => {
    const icons = {
      review: 'assignment',
      material: 'description',
      deadline: 'event',
      achievement: 'emoji_events',
      lesson: 'school'
    };
    return icons[type] || 'notifications';
  };

  const getNotificationColor = (type) => {
    const colors = {
      review: 'notification-review',
      material: 'notification-material',
      deadline: 'notification-deadline',
      achievement: 'notification-achievement',
      lesson: 'notification-lesson'
    };
    return colors[type] || '';
  };

  const handleNotificationClick = (notification) => {
    // Mark as read and navigate if needed
    if (notification.link) {
      setIsOpen(false);
    }
  };

  return (
    <div className="notification-center" ref={dropdownRef}>
      <button
        className="notification-bell"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <span className="material-icons">notifications</span>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3 className="notification-title">Notifications</h3>
            {unreadCount > 0 && (
              <span className="notification-unread-count">{unreadCount} unread</span>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <span className="material-icons">notifications_none</span>
                <p>No notifications</p>
              </div>
            ) : (
              notifications.slice(0, 5).map((notification, index) => (
                <Link
                  key={index}
                  to={notification.link || '#'}
                  className={`notification-item ${!notification.read ? 'notification-unread' : ''} ${getNotificationColor(notification.type)}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-icon-wrapper">
                    <span className="material-icons">{getNotificationIcon(notification.type)}</span>
                  </div>
                  <div className="notification-content">
                    <p className="notification-text">{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {!notification.read && <div className="notification-dot"></div>}
                </Link>
              ))
            )}
          </div>

          {notifications.length > 5 && (
            <div className="notification-footer">
              <Link to="/notifications" className="notification-view-all" onClick={() => setIsOpen(false)}>
                View all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
