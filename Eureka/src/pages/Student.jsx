import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NotificationCenter from '../components/NotificationCenter';
import { useStudentData } from '../hooks/useStudentData';
import './Student.css';

const Student = () => {
  const studentData = useStudentData();

  // Mock review queue data - will be replaced with API call
  const [reviewQueue] = useState({
    totalCount: 15
  });

  // Mock notifications data - will be replaced with API call
  const [notifications] = useState([
    {
      id: 1,
      type: 'review',
      message: 'You have 15 exercises to review',
      time: '2 hours ago',
      read: false,
      link: '/solve-exercises?filter=global'
    },
    {
      id: 2,
      type: 'achievement',
      message: 'Congratulations! You unlocked the "Math Master" achievement',
      time: '5 hours ago',
      read: false,
      link: '/achievements'
    },
    {
      id: 3,
      type: 'deadline',
      message: 'Assignment "Problem Solving" is due in 2 days',
      time: '1 day ago',
      read: true,
      link: '/assignments'
    },
    {
      id: 4,
      type: 'material',
      message: 'New materials available in Programming course',
      time: '2 days ago',
      read: true,
      link: '/courses'
    },
    {
      id: 5,
      type: 'lesson',
      message: 'You completed Lesson 3: Complex Numbers',
      time: '3 days ago',
      read: true,
      link: '/subjects/math'
    }
  ]);

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
      <Sidebar studentData={studentData} />

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
            
            {/* Header Actions - Stats and Notifications */}
            <div className="header-actions flex items-center gap-4">
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

              {/* Notification Center - Always visible */}
              <NotificationCenter notifications={notifications} />
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
