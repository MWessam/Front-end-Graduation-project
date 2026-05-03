import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ studentData }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isActive = (path) => location.pathname === path;
  const userRoles = Array.isArray(user?.roles) ? user.roles : [user?.role];
  const isMultiRole = userRoles.length > 1;

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">
          <h1 className="sidebar-name">{studentData?.name || user?.name || 'Student'}</h1>
          <p className="sidebar-grade">{studentData?.grade || (isMultiRole ? 'Superuser' : user?.role)}</p>
          
          {/* Role Switcher for Multi-role users */}
          {isMultiRole && (
            <div className="role-badges mt-2 flex gap-2">
              {userRoles.includes('admin') && <Link to="/admin" className="role-badge admin">A</Link>}
              {userRoles.includes('teacher') && <Link to="/teacher/dashboard" className="role-badge teacher">T</Link>}
              {userRoles.includes('student') && <Link to="/student" className="role-badge student">S</Link>}
            </div>
          )}
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-icon">⭐</span>
                <div className="stat-content">
                  <span className="stat-value">{(studentData.xp || 0).toLocaleString()}</span>
                  <span className="stat-label">XP</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🎯</span>
                <div className="stat-content">
                  <span className="stat-value">Level {studentData.level || 0}</span>
                  <span className="stat-label">Level</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🔥</span>
                <div className="stat-content">
                  <span className="stat-value">{studentData.streak || 0}</span>
                  <span className="stat-label">Day Streak</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav>
          <ul>
            <li className="nav-item">
              <Link 
                to="/student" 
                className={isActive('/student') || isActive('/') ? 'active-link' : 'nav-link'}
              >
                <span className="material-icons">home</span>
                <span className={isActive('/student') || isActive('/') ? 'font-semibold' : ''}>Dashboard</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/subjects" className={isActive('/subjects') ? 'active-link' : 'nav-link'}>
                <span className="material-icons">bolt</span>
                <span>Subjects</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/classes" className={isActive('/classes') ? 'active-link' : 'nav-link'}>
                <span className="material-icons">school</span>
                <span>Classes</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/shop" className={isActive('/shop') ? 'active-link' : 'nav-link'}>
                <span className="material-icons">shopping_bag</span>
                <span>Shop</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/profile" className={isActive('/profile') ? 'active-link' : 'nav-link'}>
                <span className="material-icons">person</span>
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <Link to="#" className="nav-link">
          <span className="material-icons">more_horiz</span>
          <span>More</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
