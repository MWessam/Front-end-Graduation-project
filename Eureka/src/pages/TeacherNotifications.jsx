import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import './TeacherNotifications.css';

export default function TeacherNotifications() {
  const navigate = useNavigate();

  const [teacher] = useState({ name: 'Ahmed Emad', role: 'Teacher' });
  const [unreadCount] = useState(3);

  const [classes] = useState(() => {
    try {
      const raw = localStorage.getItem('teacherClassesData');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  });

  // Mock notifications data
  const [notifications, setNotifications] = useState(() => {
    try {
      const raw = localStorage.getItem('teacherNotificationsData');
      if (raw) {
        const parsed = JSON.parse(raw);
        // Convert timestamp strings back to Date objects
        return parsed.map((n) => ({
          ...n,
          timestamp: n.timestamp ? new Date(n.timestamp) : new Date()
        }));
      }
    } catch {
      // ignore
    }

    return [
      {
        id: 1,
        type: 'assignment',
        title: 'New Assignment Graded',
        content: 'Your submission for "Calculus Midterm" has been graded by Prof. Davis.',
        time: '5m ago',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
        important: true,
        icon: 'assignment',
        color: '#8b5cf6',
        class: 'Math 101',
        actions: ['view', 'reply']
      },
      {
        id: 2,
        type: 'message',
        title: 'Student Message',
        content: 'Ahmed Mohamed sent you a message regarding the "History Project".',
        time: '2h ago',
        timestamp: new Date(Date.now() - 2 * 3600000),
        read: false,
        important: false,
        icon: 'chat_bubble',
        color: '#3b82f6',
        student: 'Ahmed Mohamed',
        actions: ['reply', 'snooze']
      },
      {
        id: 3,
        type: 'class',
        title: 'Class Update',
        content: '"Physics 101" lecture tomorrow is cancelled. Please check your email for more details.',
        time: '1d ago',
        timestamp: new Date(Date.now() - 24 * 3600000),
        read: false,
        important: true,
        icon: 'campaign',
        color: '#f59e0b',
        class: 'Physics 101',
        actions: ['view', 'snooze']
      },
      {
        id: 4,
        type: 'class',
        title: 'New Group Member',
        content: 'Fatma Hassan has been added to your "Biology Study Group".',
        time: '2d ago',
        timestamp: new Date(Date.now() - 48 * 3600000),
        read: true,
        important: false,
        icon: 'group',
        color: '#8b5cf6',
        class: 'Biology Study Group',
        actions: ['view']
      },
      {
        id: 5,
        type: 'assignment',
        title: 'Upcoming Deadline',
        content: 'The "Literature Essay" is due in 3 days. Don\'t forget to submit.',
        time: '4d ago',
        timestamp: new Date(Date.now() - 96 * 3600000),
        read: true,
        important: true,
        icon: 'notification_important',
        color: '#ef4444',
        class: 'Literature 201',
        actions: ['view', 'snooze']
      },
      {
        id: 6,
        type: 'system',
        title: 'System Maintenance',
        content: 'The platform will be undergoing maintenance this Sunday from 2:00 AM to 4:00 AM.',
        time: '1w ago',
        timestamp: new Date(Date.now() - 7 * 24 * 3600000),
        read: true,
        important: false,
        icon: 'build',
        color: '#6b7280',
        actions: ['dismiss']
      },
      {
        id: 7,
        type: 'message',
        title: 'Parent Meeting Reminder',
        content: 'You have a scheduled parent-teacher meeting tomorrow at 3:00 PM.',
        time: '1w ago',
        timestamp: new Date(Date.now() - 7 * 24 * 3600000),
        read: true,
        important: true,
        icon: 'event',
        color: '#10b981',
        actions: ['view', 'snooze']
      },
      {
        id: 8,
        type: 'assignment',
        title: 'Quiz Results Available',
        content: 'Results for the "Chemistry Quiz" are now available for review.',
        time: '2w ago',
        timestamp: new Date(Date.now() - 14 * 24 * 3600000),
        read: true,
        important: false,
        icon: 'quiz',
        color: '#8b5cf6',
        class: 'Chemistry 101',
        actions: ['view']
      }
    ];
  });

  // UI State
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | unread | messages | assignments | classes
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    messages: true,
    assignments: true,
    classes: true,
    system: true,
    inapp: true,
    email: false,
    push: false,
    frequency: 'hourly'
  });

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    switch (filter) {
      case 'all':
        return notifications;
      case 'unread':
        return notifications.filter((n) => !n.read);
      case 'messages':
        return notifications.filter((n) => n.type === 'message');
      case 'assignments':
        return notifications.filter((n) => n.type === 'assignment');
      case 'classes':
        return notifications.filter((n) => n.type === 'class');
      default:
        return notifications;
    }
  }, [notifications, filter]);

  // Stats
  const totalNotifications = notifications.length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // Get relative time
  const getRelativeTime = (date) => {
    // Ensure date is a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffMs = now - dateObj;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffDays / 7);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    return dateObj.toLocaleDateString();
  };

  // Get icon class
  const getIconClass = (type) => {
    switch (type) {
      case 'message':
        return 'message';
      case 'assignment':
        return 'assignment';
      case 'class':
        return 'class';
      case 'system':
        return 'system';
      default:
        return '';
    }
  };

  // Mark as read
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Clear all
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  // Delete notification
  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Handle notification action
  const handleAction = (action, notification) => {
    switch (action) {
      case 'view':
        // Navigate based on notification type
        if (notification.type === 'message' && notification.student) {
          const student = notification.student.toLowerCase().replace(/\s+/g, '-');
          navigate(`/teacher/chat/${student}`);
        } else if (notification.class) {
          navigate('/teacher/class');
        }
        break;
      case 'reply':
        if (notification.student) {
          navigate(`/teacher/chat/${notification.student.toLowerCase().replace(/\s+/g, '-')}`);
        }
        break;
      case 'snooze':
        // Remove notification temporarily (simplified)
        handleDelete(notification.id);
        break;
      case 'delete':
      case 'dismiss':
        handleDelete(notification.id);
        break;
    }
  };

  // Save settings
  const handleSaveSettings = () => {
    try {
      localStorage.setItem('teacherNotificationSettings', JSON.stringify(settings));
    } catch {
      // ignore
    }
    setSettingsModalOpen(false);
  };

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('teacherNotificationsData', JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('teacherNotificationSettings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="teacher-notifications flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <TeacherSidebar teacher={teacher} classes={classes} onNewClass={() => navigate('/teacher/dashboard')} />

      <main className="teacher-notifications-main flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="teacher-notifications-header">
          <div className="teacher-notifications-search">
            <span className="material-symbols-outlined teacher-notifications-search-icon">search</span>
            <input
              type="text"
              className="teacher-notifications-search-input"
              placeholder="Search notifications..."
            />
          </div>

          <div className="teacher-notifications-header-actions">
            <button className="teacher-icon-btn" onClick={() => navigate('/teacher/notifications')}>
              <span className="material-symbols-outlined">notifications</span>
              {unreadCount > 0 && <span className="teacher-badge">{unreadCount}</span>}
            </button>
            <button className="teacher-icon-btn" onClick={() => navigate('/teacher/chat')}>
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="teacher-badge">1</span>
            </button>
            <div className="teacher-avatar" onClick={() => navigate('/teacher/dashboard')}>
              <span>{teacher.name.charAt(0)}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="teacher-notifications-content">
          {/* Page Header */}
          <div className="teacher-notifications-page-header">
            <div className="teacher-notifications-header-content">
              <h1 className="teacher-notifications-title">Notifications</h1>
              <p className="teacher-notifications-subtitle">Stay updated with your classes and activities</p>
              <div className="teacher-notifications-stats">
                <div className="teacher-notifications-stat-item">
                  <span className="teacher-notifications-stat-value">{totalNotifications}</span>
                  <span className="teacher-notifications-stat-label">Total</span>
                </div>
                <div className="teacher-notifications-stat-item">
                  <span className="teacher-notifications-stat-value">{unreadNotifications}</span>
                  <span className="teacher-notifications-stat-label">Unread</span>
                </div>
              </div>
            </div>
            <div className="teacher-notifications-header-actions">
              <button className="teacher-btn teacher-btn-secondary" onClick={() => navigate('/teacher/dashboard')}>
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="teacher-notifications-controls-section">
            <div className="teacher-notifications-filter-tabs">
              <button
                className={`teacher-notifications-filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`teacher-notifications-filter-tab ${filter === 'unread' ? 'active' : ''}`}
                onClick={() => setFilter('unread')}
              >
                Unread
              </button>
              <button
                className={`teacher-notifications-filter-tab ${filter === 'messages' ? 'active' : ''}`}
                onClick={() => setFilter('messages')}
              >
                Messages
              </button>
              <button
                className={`teacher-notifications-filter-tab ${filter === 'assignments' ? 'active' : ''}`}
                onClick={() => setFilter('assignments')}
              >
                Assignments
              </button>
              <button
                className={`teacher-notifications-filter-tab ${filter === 'classes' ? 'active' : ''}`}
                onClick={() => setFilter('classes')}
              >
                Classes
              </button>
            </div>

            <div className="teacher-notifications-actions-section">
              <button className="teacher-notifications-action-btn" onClick={handleMarkAllAsRead}>
                <span className="material-symbols-outlined">done_all</span>
                Mark all as read
              </button>
              <button className="teacher-notifications-action-btn" onClick={handleClearAll}>
                <span className="material-symbols-outlined">delete_sweep</span>
                Clear all
              </button>
              <button className="teacher-notifications-action-btn" onClick={() => setSettingsModalOpen(true)}>
                <span className="material-symbols-outlined">settings</span>
                Settings
              </button>
            </div>
          </div>

          {/* Notifications List */}
          {loading ? (
            <div className="teacher-notifications-loading-state">
              <div className="teacher-notifications-spinner"></div>
              <p>Loading notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="teacher-notifications-empty-state">
              <div className="teacher-notifications-empty-icon">
                <span className="material-symbols-outlined">notifications_off</span>
              </div>
              <h3>No notifications</h3>
              <p>You're all caught up!</p>
            </div>
          ) : (
            <div className="teacher-notifications-list">
              {filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`teacher-notifications-notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                >
                  <div className="teacher-notifications-notification-header">
                    <div className="teacher-notifications-notification-info">
                      <div
                        className={`teacher-notifications-notification-icon ${getIconClass(notification.type)}`}
                        style={{
                          backgroundColor: `${notification.color}20`,
                          color: notification.color
                        }}
                      >
                        <span className="material-symbols-outlined">{notification.icon}</span>
                      </div>
                      <div>
                        <h4 className="teacher-notifications-notification-title">{notification.title}</h4>
                        <div className="teacher-notifications-notification-meta">
                          <span className="teacher-notifications-notification-time">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                              schedule
                            </span>
                            {getRelativeTime(notification.timestamp)}
                          </span>
                          {notification.class && (
                            <span className="teacher-notifications-class-name">{notification.class}</span>
                          )}
                          {notification.student && (
                            <span className="teacher-notifications-student-name">{notification.student}</span>
                          )}
                          {notification.important && (
                            <span className="teacher-notifications-notification-badge teacher-notifications-important">
                              Important
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="teacher-notifications-notification-content">{notification.content}</div>
                  <div
                    className="teacher-notifications-notification-actions"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {notification.actions.includes('view') && (
                      <button
                        className="teacher-notifications-notification-action-btn teacher-notifications-read"
                        onClick={() => handleAction('view', notification)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          visibility
                        </span>
                        View
                      </button>
                    )}
                    {notification.actions.includes('reply') && (
                      <button
                        className="teacher-notifications-notification-action-btn teacher-notifications-read"
                        onClick={() => handleAction('reply', notification)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          reply
                        </span>
                        Reply
                      </button>
                    )}
                    {notification.actions.includes('snooze') && (
                      <button
                        className="teacher-notifications-notification-action-btn teacher-notifications-snooze"
                        onClick={() => handleAction('snooze', notification)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          snooze
                        </span>
                        Snooze
                      </button>
                    )}
                    {(notification.actions.includes('dismiss') || notification.actions.includes('delete')) && (
                      <button
                        className="teacher-notifications-notification-action-btn teacher-notifications-delete"
                        onClick={() => handleAction('delete', notification)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          {notification.actions.includes('dismiss') ? 'close' : 'delete'}
                        </span>
                        {notification.actions.includes('dismiss') ? 'Dismiss' : 'Delete'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Settings Modal */}
      {settingsModalOpen && (
        <div className="teacher-notifications-modal" onClick={() => setSettingsModalOpen(false)}>
          <div className="teacher-notifications-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-notifications-modal-header">
              <h3>Notification Settings</h3>
              <button className="teacher-notifications-modal-close" onClick={() => setSettingsModalOpen(false)}>
                &times;
              </button>
            </div>
            <div className="teacher-notifications-modal-body">
              <div className="teacher-notifications-setting-group">
                <h4 className="teacher-notifications-setting-title">Notification Types</h4>
                <div className="teacher-notifications-setting-option">
                  <input
                    type="checkbox"
                    id="setting-messages"
                    checked={settings.messages}
                    onChange={(e) => setSettings((prev) => ({ ...prev, messages: e.target.checked }))}
                  />
                  <label htmlFor="setting-messages">Messages from students</label>
                </div>
                <div className="teacher-notifications-setting-option">
                  <input
                    type="checkbox"
                    id="setting-assignments"
                    checked={settings.assignments}
                    onChange={(e) => setSettings((prev) => ({ ...prev, assignments: e.target.checked }))}
                  />
                  <label htmlFor="setting-assignments">Assignment submissions & grades</label>
                </div>
                <div className="teacher-notifications-setting-option">
                  <input
                    type="checkbox"
                    id="setting-classes"
                    checked={settings.classes}
                    onChange={(e) => setSettings((prev) => ({ ...prev, classes: e.target.checked }))}
                  />
                  <label htmlFor="setting-classes">Class updates & announcements</label>
                </div>
                <div className="teacher-notifications-setting-option">
                  <input
                    type="checkbox"
                    id="setting-system"
                    checked={settings.system}
                    onChange={(e) => setSettings((prev) => ({ ...prev, system: e.target.checked }))}
                  />
                  <label htmlFor="setting-system">System notifications</label>
                </div>
              </div>

              <div className="teacher-notifications-setting-group">
                <h4 className="teacher-notifications-setting-title">Notification Methods</h4>
                <div className="teacher-notifications-setting-option">
                  <input
                    type="checkbox"
                    id="setting-inapp"
                    checked={settings.inapp}
                    onChange={(e) => setSettings((prev) => ({ ...prev, inapp: e.target.checked }))}
                  />
                  <label htmlFor="setting-inapp">In-app notifications</label>
                </div>
                <div className="teacher-notifications-setting-option">
                  <input
                    type="checkbox"
                    id="setting-email"
                    checked={settings.email}
                    onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.checked }))}
                  />
                  <label htmlFor="setting-email">Email notifications</label>
                </div>
                <div className="teacher-notifications-setting-option">
                  <input
                    type="checkbox"
                    id="setting-push"
                    checked={settings.push}
                    onChange={(e) => setSettings((prev) => ({ ...prev, push: e.target.checked }))}
                  />
                  <label htmlFor="setting-push">Push notifications</label>
                </div>
              </div>

              <div className="teacher-notifications-setting-group">
                <h4 className="teacher-notifications-setting-title">Frequency</h4>
                <div className="teacher-notifications-setting-option">
                  <select
                    id="setting-frequency"
                    value={settings.frequency}
                    onChange={(e) => setSettings((prev) => ({ ...prev, frequency: e.target.value }))}
                  >
                    <option value="immediate">Immediate</option>
                    <option value="hourly">Hourly digest</option>
                    <option value="daily">Daily digest</option>
                    <option value="weekly">Weekly digest</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="teacher-notifications-modal-footer">
              <button
                className="teacher-btn teacher-btn-secondary"
                onClick={() => setSettingsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="teacher-btn teacher-btn-primary" onClick={handleSaveSettings}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
