import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboardHeader = ({ search, setSearch, teacher, unreadCount }) => {
  const navigate = useNavigate();

  return (
    <header className="teacher-header">
      <div className="teacher-search">
        <span className="material-icons teacher-search-icon">search</span>
        <input
          className="teacher-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search classes, location, description..."
        />
      </div>

      <div className="teacher-header-actions">
        <button type="button" className="teacher-icon-btn" onClick={() => navigate('/teacher/notifications')}>
          <span className="material-icons">notifications</span>
          {unreadCount > 0 && <span className="teacher-badge">{unreadCount}</span>}
        </button>

        <button type="button" className="teacher-icon-btn" onClick={() => navigate('/teacher/students')}>
          <span className="material-icons">chat_bubble</span>
          <span className="teacher-badge teacher-badge-muted">1</span>
        </button>

        <div className="teacher-avatar" title={teacher.name}>
          {teacher.name?.slice(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default TeacherDashboardHeader;
