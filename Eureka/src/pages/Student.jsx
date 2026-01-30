import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NotificationCenter from '../components/NotificationCenter';
import { useStudentData } from '../hooks/useStudentData';
import { fetchReviewCount } from '../exercises/api/mockQuestions';
import './Student.css';

const Student = () => {
  const studentData = useStudentData();

  // Mock review queue data - will be replaced with API call
  const [reviewQueue, setReviewQueue] = useState({
    totalCount: 0
  });

  useEffect(() => {
    fetchReviewCount().then(count => {
      setReviewQueue({ totalCount: count });
    });
  }, []);

  // Mock notifications data - will be replaced with API call
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchReviewCount().then(count => {
      setReviewQueue({ totalCount: count });
      
      // Update notifications based on review count
      const reviewNotification = count > 0 ? [{
        id: 1,
        type: 'review',
        message: `You have ${count} exercise${count === 1 ? '' : 's'} to review`,
        time: 'Just now',
        read: false,
        link: '/exercises?reviewQueue=true'
      }] : [];

      setNotifications([
        ...reviewNotification,
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
    });
  }, []);

  // Mock active subjects data - will be replaced with API call
  const [activeSubjects] = useState([
    {
      id: 1,
      name: 'Arabic',
      icon: '🇸🇦',
      progress: 95,
      currentLesson: 'Lesson 8: Advanced Grammar',
      lastActivity: '2 hours ago',
      hasProgress: true
    },
    {
      id: 2,
      name: 'Programming',
      icon: '💻',
      progress: 80,
      currentLesson: 'Lesson 5: Data Structures',
      lastActivity: '1 day ago',
      hasProgress: true
    },
    {
      id: 3,
      name: 'Science',
      icon: '🔬',
      progress: 95,
      currentLesson: 'Lesson 10: Chemistry Basics',
      lastActivity: '3 hours ago',
      hasProgress: true
    },
    {
      id: 4,
      name: 'English',
      icon: '📚',
      progress: 90,
      currentLesson: 'Lesson 7: Literature Analysis',
      lastActivity: '5 hours ago',
      hasProgress: true
    },
    {
      id: 5,
      name: 'Maths',
      icon: '📐',
      progress: 66,
      currentLesson: 'Lesson 4: Algebra',
      lastActivity: '2 days ago',
      hasProgress: true
    },
    {
      id: 6,
      name: 'Physics',
      icon: '⚛️',
      progress: 0,
      currentLesson: null,
      lastActivity: null,
      hasProgress: false,
      description: 'Explore the fundamental laws of physics and mechanics'
    }
  ]);


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
                to="/exercises?reviewQueue=true" 
                className="review-now-button"
              >
                Review Now
                <span className="material-icons">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}

        {/* Active Subjects Section - Only In Progress */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Active Subjects</h3>
          {activeSubjects.filter(subject => subject.hasProgress && subject.progress > 0).length > 0 ? (
            <div className="subjects-grid">
              {activeSubjects.filter(subject => subject.hasProgress && subject.progress > 0).map((subject) => (
                <Link
                  key={subject.id}
                  to={`/subjects/${subject.id}`}
                  className="subject-card"
                >
                  <div className="subject-card-header">
                    <div className="subject-icon">{subject.icon}</div>
                    <h4 className="subject-name">{subject.name}</h4>
                  </div>

                  <div className="subject-progress-section">
                    <div className="subject-progress-info">
                      <span className="subject-progress-label">Progress</span>
                      <span className="subject-progress-percentage">{subject.progress}%</span>
                    </div>
                    <div className="subject-progress-bar">
                      <div 
                        className="subject-progress-fill" 
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="subject-details">
                    <div className="subject-detail-item">
                      <span className="material-icons subject-detail-icon">book</span>
                      <span className="subject-detail-text">{subject.currentLesson}</span>
                    </div>
                    <div className="subject-detail-item">
                      <span className="material-icons subject-detail-icon">schedule</span>
                      <span className="subject-detail-text">{subject.lastActivity}</span>
                    </div>
                  </div>

                  <button 
                    className="subject-action-button subject-continue-button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = `/subjects/${subject.id}`;
                    }}
                  >
                    Continue Learning
                    <span className="material-icons">arrow_forward</span>
                  </button>
                </Link>
              ))}
            </div>
          ) : (
            <div className="subjects-empty-state">
              <div className="empty-state-icon">
                <span className="material-icons">school</span>
              </div>
              <h4 className="empty-state-title">No Active Subjects</h4>
              <p className="empty-state-message">
                You haven't started any subjects yet. Browse available subjects to begin your learning journey!
              </p>
              <Link to="/courses" className="empty-state-button">
                Browse Subjects
                <span className="material-icons">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Student;
