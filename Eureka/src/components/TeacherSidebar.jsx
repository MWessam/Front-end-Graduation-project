import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import './TeacherSidebar.css';

export default function TeacherSidebar({ teacher, classes, onNewClass }) {
  const teacherName = teacher?.name || 'Teacher';
  const teacherRole = teacher?.role || 'Teacher';

  return (
    <aside className="sidebar teacher-sidebar">
      <div>
        <div className="sidebar-header">
          <h1 className="sidebar-name">{teacherName}</h1>
          <p className="sidebar-grade">{teacherRole}</p>
        </div>

        <nav>
          <ul>
            <li className="nav-item">
              <NavLink
                to="/teacher/dashboard"
                className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
                end
              >
                <span className="material-icons">home</span>
                <span>Home</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/teacher/library"
                className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
              >
                <span className="material-icons">auto_stories</span>
                <span>Your Library</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/teacher/notifications"
                className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
              >
                <span className="material-icons">notifications</span>
                <span>Notifications</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="teacher-sidebar-section">
          <h3 className="teacher-sidebar-section-title">Your Classes</h3>
          <ul className="teacher-sidebar-class-list">
            {classes?.map((c) => (
              <li key={c.id} className="nav-item">
                <NavLink
                  to={`/teacher/class/${c.id}`}
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
                >
                  <span className="material-icons">school</span>
                  <span className="teacher-sidebar-class-name">{c.name}</span>
                </NavLink>
              </li>
            ))}

            <li className="nav-item">
              <button type="button" className="nav-link teacher-sidebar-new-class" onClick={onNewClass}>
                <span className="material-icons">add</span>
                <span>New class</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="teacher-sidebar-section">
          <h3 className="teacher-sidebar-section-title">Teacher Tools</h3>
          <ul>
            <li className="nav-item">
              <NavLink
                to="/teacher/assign-activity"
                className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
              >
                <span className="material-icons">task_alt</span>
                <span>Assign activity</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <NavLink to="#" className="nav-link" onClick={(e) => e.preventDefault()}>
          <span className="material-icons">more_horiz</span>
          <span>More</span>
        </NavLink>
      </div>
    </aside>
  );
}

