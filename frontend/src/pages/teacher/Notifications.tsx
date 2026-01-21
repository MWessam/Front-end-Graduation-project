import React from 'react';
import '../../styles/teacher/notifications.css';

const Notifications = () => {
  return (
    <div className="page-content">
        <div className="page-header">
            <h1 className="page-title">Notifications</h1>
            <button className="btn-secondary">Mark all as read</button>
        </div>
        <div className="notifications-list">
            <div className="notification-item unread">
                <div className="notification-icon info">
                    <span className="material-symbols-outlined">info</span>
                </div>
                <div className="notification-content">
                    <p>New student joined Class 1</p>
                    <span className="time">2 mins ago</span>
                </div>
            </div>
            <div className="notification-item">
                <div className="notification-icon success">
                    <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div className="notification-content">
                    <p>Assignment posted successfully</p>
                    <span className="time">1 hour ago</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Notifications;


