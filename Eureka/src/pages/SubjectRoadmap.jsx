import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import './SubjectRoadmap.css';

const SubjectRoadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentData = useStudentData();

  // Mock subject data - will be replaced with API call
  const [subjectData] = useState({
    id: id,
    name: 'Arabic',
    nameArabic: 'العربية',
    icon: '🇸🇦',
    description: 'Master the Arabic language through interactive lessons and exercises',
    descriptionArabic: 'أتقن اللغة العربية من خلال الدروس والتمارين التفاعلية',
    overallProgress: 45,
    masteryLevel: 35, // 0-100
    totalLessons: 10,
    completedLessons: 3,
    inProgressLessons: 1
  });

  // Get mastery level name and color
  const getMasteryInfo = (mastery) => {
    if (mastery >= 76) return { level: 'Master', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' };
    if (mastery >= 51) return { level: 'Advanced', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' };
    if (mastery >= 26) return { level: 'Intermediate', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' };
    return { level: 'Beginner', color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
  };

  const masteryInfo = getMasteryInfo(subjectData.masteryLevel);

  return (
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Sidebar */}
      <Sidebar studentData={studentData} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Subject Header */}
        <header className="subject-roadmap-header mb-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/subjects')}
            className="back-button"
            aria-label="Back to subjects"
          >
            <span className="material-icons">arrow_back</span>
            <span>Back to Subjects</span>
          </button>

          {/* Header Content */}
          <div className="subject-header-content">
            <div className="subject-header-main">
              <div className="subject-header-icon-wrapper">
                <div className="subject-header-icon">{subjectData.icon}</div>
              </div>
              <div className="subject-header-info">
                <h1 className="subject-header-title">{subjectData.name}</h1>
                <p className="subject-header-description">
                  {subjectData.description}
                </p>
              </div>
            </div>

            {/* Progress and Mastery Section */}
            <div className="subject-header-stats">
              {/* Overall Progress */}
              <div className="subject-stat-card">
                <div className="subject-stat-header">
                  <span className="material-icons subject-stat-icon">trending_up</span>
                  <span className="subject-stat-label">Progress</span>
                </div>
                <div className="subject-stat-value">{subjectData.overallProgress}%</div>
                <div className="subject-stat-progress-bar">
                  <div 
                    className="subject-stat-progress-fill" 
                    style={{ width: `${subjectData.overallProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Mastery Level */}
              <div className="subject-stat-card">
                <div className="subject-stat-header">
                  <span className="material-icons subject-stat-icon">star</span>
                  <span className="subject-stat-label">Mastery</span>
                </div>
                <div className="subject-stat-value" style={{ color: masteryInfo.color }}>
                  {masteryInfo.level}
                </div>
                <div className="subject-mastery-indicator" style={{ backgroundColor: masteryInfo.bgColor, color: masteryInfo.color }}>
                  <div className="subject-mastery-ring">
                    <svg className="subject-mastery-ring-svg" viewBox="0 0 36 36">
                      <path
                        className="subject-mastery-ring-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        className="subject-mastery-ring-fill"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={masteryInfo.color}
                        strokeWidth="3"
                        strokeDasharray={`${subjectData.masteryLevel}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="subject-mastery-percentage">{subjectData.masteryLevel}%</span>
                  </div>
                </div>
              </div>

              {/* Lessons Summary */}
              <div className="subject-stat-card">
                <div className="subject-stat-header">
                  <span className="material-icons subject-stat-icon">book</span>
                  <span className="subject-stat-label">Lessons</span>
                </div>
                <div className="subject-stat-value">
                  {subjectData.completedLessons} / {subjectData.totalLessons}
                </div>
                <div className="subject-stat-subtext">
                  {subjectData.inProgressLessons} in progress
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Roadmap Content - Will be added in Phase 2 */}
        <div className="roadmap-content">
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Learning roadmap will be displayed here (Phase 2)
          </p>
        </div>
      </main>
    </div>
  );
};

export default SubjectRoadmap;
