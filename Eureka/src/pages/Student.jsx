import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Student.css';

const Student = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Mock student data - will be replaced with API call
  const [studentData] = useState({
    name: 'Ahmed Emad',
    grade: 'Grade 10',
    xp: 2840,
    level: 5,
    streak: 7
  });

  // Mock review queue data - will be replaced with API call
  const [reviewQueue] = useState({
    totalCount: 15
  });

  const courses = [
    { name: 'Arabic', grade: 'A+', progress: 95, color: 'green' },
    { name: 'Programming', grade: 'B+', progress: 80, color: 'yellow' },
    { name: 'Science', grade: 'A+', progress: 95, color: 'green' },
    { name: 'English', grade: 'A+', progress: 90, color: 'green' },
    { name: 'Maths', grade: 'B+', progress: 66, color: 'green' },
  ];

  const assignments = [
    { title: 'Psychology Paper 2', due: 'Due this week', icon: 'article', bgClass: 'blue' },
    { title: 'Problem Solving', due: 'Due this week', icon: 'psychology_alt', bgClass: 'normal', iconBg: 'purple-bg' },
    { title: 'Art History Essay', due: 'Due this week', icon: 'draw', bgClass: 'normal', iconBg: 'blue2-bg' },
  ];

  return (
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-50 dark:bg-zinc-800 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{studentData.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{studentData.grade}</p>
            
            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-icon">⭐</span>
                <div className="stat-content">
                  <span className="stat-value">{studentData.xp.toLocaleString()}</span>
                  <span className="stat-label">XP</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🎯</span>
                <div className="stat-content">
                  <span className="stat-value">Level {studentData.level}</span>
                  <span className="stat-label">Level</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🔥</span>
                <div className="stat-content">
                  <span className="stat-value">{studentData.streak}</span>
                  <span className="stat-label">Day Streak</span>
                </div>
              </div>
            </div>
          </div>

          <nav>
            <ul>
              <li className="mb-2">
                <Link 
                  to="/student" 
                  className={isActive('/student') || isActive('/') ? 'active-link' : 'nav-link'}
                >
                  <span className="material-icons">home</span>
                  <span className={isActive('/student') || isActive('/') ? 'font-semibold' : ''}>Dashboard</span>
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/courses" className={isActive('/courses') ? 'active-link' : 'nav-link'}>
                  <span className="material-icons">bolt</span>
                  <span>Courses</span>
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/classes" className={isActive('/classes') ? 'active-link' : 'nav-link'}>
                  <span className="material-icons">school</span>
                  <span>Classes</span>
                </Link>
              </li>

              <li className="mb-2">
                <Link to="#" className="nav-link">
                  <span className="material-icons">shopping_bag</span>
                  <span>Shop</span>
                </Link>
              </li>

              <li className="mb-2">
                <Link to="#" className="nav-link">
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

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header Section */}
        <header className="dashboard-header mb-6">
          <div className="header-content">
            <div className="header-title-section">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Welcome back, {studentData.name} • {studentData.grade}
              </p>
            </div>
            
            {/* Header Quick Stats - Visible on larger screens */}
            <div className="header-stats hidden lg:flex items-center gap-6">
              <div className="header-stat">
                <span className="stat-icon-header">⭐</span>
                <div>
                  <div className="stat-value-header">{studentData.xp.toLocaleString()}</div>
                  <div className="stat-label-header">XP</div>
                </div>
              </div>
              <div className="header-stat">
                <span className="stat-icon-header">🎯</span>
                <div>
                  <div className="stat-value-header">Level {studentData.level}</div>
                  <div className="stat-label-header">Level</div>
                </div>
              </div>
              <div className="header-stat">
                <span className="stat-icon-header">🔥</span>
                <div>
                  <div className="stat-value-header">{studentData.streak}</div>
                  <div className="stat-label-header">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Review Queue Widget - Top Priority */}
        {reviewQueue.totalCount > 0 && (
          <div className="review-queue-widget mb-6">
            <div className="review-queue-content">
              <div className="review-queue-icon">
                <span className="material-icons">assignment</span>
                {reviewQueue.totalCount > 0 && (
                  <span className="review-badge">{reviewQueue.totalCount}</span>
                )}
              </div>
              <div className="review-queue-text">
                <h3 className="review-queue-title">Review Queue</h3>
                <p className="review-queue-message">
                  You have <strong>{reviewQueue.totalCount}</strong> {reviewQueue.totalCount === 1 ? 'exercise' : 'exercises'} to review
                </p>
              </div>
              <Link 
                to="/solve-exercises?filter=global" 
                className="review-now-button"
              >
                Review Now
                <span className="material-icons">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-8">
          {/* LEFT Section */}
          <div className="col-span-12 lg:col-span-8">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="card-box">
                <p className="text-gray-500 dark:text-gray-400">Overall Grade</p>
                <p className="big-num">88%</p>
                <p className="text-primary font-medium">Keep up the great work!</p>
              </div>

              <div className="card-box">
                <p className="text-gray-500 dark:text-gray-400">Courses Completed</p>
                <p className="big-num">4</p>
                <p className="text-primary font-medium">Keep up the great work!</p>
              </div>

              <div className="card-box">
                <p className="text-gray-500 dark:text-gray-400">Upcoming Deadlines</p>
                <p className="big-num">3</p>
                <p className="text-primary font-medium">Due this week</p>
              </div>
            </div>

            {/* TABLE */}
            <div className="table-wrapper">
              <table className="w-full text-left">
                <thead className="table-head">
                  <tr>
                    <th className="th">Course Name</th>
                    <th className="th">Current Grade</th>
                    <th className="th">Progress</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} className="row">
                      <td className="td">{course.name}</td>
                      <td className="td">{course.grade}</td>
                      <td className="td">
                        <div className="progress-holder">
                          <div className="progress-bg">
                            <div 
                              className={course.color === 'yellow' ? 'progress-yellow' : 'progress-fill'} 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-num">{course.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT Section */}
          <div className="col-span-12 lg:col-span-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Assignments</h3>

            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className={`assignment ${assignment.bgClass}`}>
                  <div className={`icon ${assignment.iconBg || 'blue-bg'}`}>
                    <span className={`material-icons ${assignment.iconBg ? 'text-purple-600 dark:text-purple-400' : assignment.iconBg === 'blue2-bg' ? 'text-blue-600 dark:text-blue-400' : 'text-white'}`}>
                      {assignment.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="task-title">{assignment.title}</h4>
                    <p className="task-sub">{assignment.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Student;
