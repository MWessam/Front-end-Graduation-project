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

  // Mock lessons data with exercise groups - will be replaced with API call
  const [lessons] = useState([
    {
      id: 1,
      order: 1,
      title: 'Introduction to Arabic',
      titleArabic: 'مقدمة في اللغة العربية',
      status: 'completed', // locked, unlocked, in_progress, completed
      progress: 100,
      mastery: 85,
      exerciseGroups: [
        { id: 1, title: 'Greetings', status: 'completed', exercisesCount: 5 },
        { id: 2, title: 'Basic Phrases', status: 'completed', exercisesCount: 6 },
        { id: 3, title: 'Numbers 1-10', status: 'completed', exercisesCount: 4 },
        { id: 4, title: 'Level Review', status: 'completed', exercisesCount: 8, isReview: true }
      ],
      milestoneQuizPassed: true
    },
    {
      id: 2,
      order: 2,
      title: 'Arabic Alphabet',
      titleArabic: 'الأبجدية العربية',
      status: 'completed',
      progress: 100,
      mastery: 90,
      exerciseGroups: [
        { id: 5, title: 'Letters A-J', status: 'completed', exercisesCount: 5 },
        { id: 6, title: 'Letters K-T', status: 'completed', exercisesCount: 6 },
        { id: 7, title: 'Letters U-Z', status: 'completed', exercisesCount: 5 },
        { id: 8, title: 'Level Review', status: 'completed', exercisesCount: 10, isReview: true }
      ],
      milestoneQuizPassed: true
    },
    {
      id: 3,
      order: 3,
      title: 'Basic Grammar',
      titleArabic: 'القواعد الأساسية',
      status: 'completed',
      progress: 100,
      mastery: 75,
      exerciseGroups: [
        { id: 9, title: 'Nouns and Articles', status: 'completed', exercisesCount: 4 },
        { id: 10, title: 'Pronouns', status: 'completed', exercisesCount: 5 },
        { id: 11, title: 'Level Review', status: 'completed', exercisesCount: 8, isReview: true }
      ],
      milestoneQuizPassed: true
    },
    {
      id: 4,
      order: 4,
      title: 'Verb Conjugation',
      titleArabic: 'تصريف الأفعال',
      status: 'in_progress',
      progress: 60,
      mastery: 50,
      exerciseGroups: [
        { id: 12, title: 'Present Tense', status: 'completed', exercisesCount: 5 },
        { id: 13, title: 'Past Tense', status: 'completed', exercisesCount: 6 },
        { id: 14, title: 'Future Tense', status: 'in_progress', exercisesCount: 4 },
        { id: 15, title: 'Level Review', status: 'locked', exercisesCount: 8, isReview: true }
      ],
      milestoneQuizPassed: false
    },
    {
      id: 5,
      order: 5,
      title: 'Sentence Structure',
      titleArabic: 'تركيب الجمل',
      status: 'unlocked',
      progress: 0,
      mastery: 0,
      exerciseGroups: [
        { id: 16, title: 'Simple Sentences', status: 'locked', exercisesCount: 4 },
        { id: 17, title: 'Complex Sentences', status: 'locked', exercisesCount: 5 },
        { id: 18, title: 'Level Review', status: 'locked', exercisesCount: 7, isReview: true }
      ],
      milestoneQuizPassed: false
    },
    {
      id: 6,
      order: 6,
      title: 'Advanced Grammar',
      titleArabic: 'القواعد المتقدمة',
      status: 'locked',
      progress: 0,
      mastery: 0,
      exerciseGroups: [
        { id: 19, title: 'Conditional Sentences', status: 'locked', exercisesCount: 5 },
        { id: 20, title: 'Passive Voice', status: 'locked', exercisesCount: 6 },
        { id: 21, title: 'Level Review', status: 'locked', exercisesCount: 9, isReview: true }
      ],
      milestoneQuizPassed: false
    }
  ]);

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

        {/* Learning Roadmap/Path - Game-like Structure */}
        <div className="roadmap-content">
          <h2 className="roadmap-section-title">Learning Path</h2>
          <div className="roadmap-game-path">
            {lessons.map((lesson, index) => {
              const isLast = index === lessons.length - 1;
              const isCompleted = lesson.status === 'completed';
              const isInProgress = lesson.status === 'in_progress';
              const isUnlocked = lesson.status === 'unlocked';
              const isLocked = lesson.status === 'locked';

              // Get mastery color
              const getMasteryColor = (mastery) => {
                if (mastery >= 76) return '#10b981';
                if (mastery >= 51) return '#3b82f6';
                if (mastery >= 26) return '#f59e0b';
                return '#6b7280';
              };

              const masteryColor = getMasteryColor(lesson.mastery);

              return (
                <React.Fragment key={lesson.id}>
                  {/* Lesson/Level Section */}
                  <div className="lesson-section">
                    {/* Level Header Banner */}
                    <div className={`level-header-banner ${lesson.status}`}>
                      <div className="level-header-content">
                        <div className="level-header-left">
                          <div className="level-number">LEVEL {lesson.order}</div>
                          <h3 className="level-title">{lesson.title}</h3>
                          {isInProgress && (
                            <div className="level-progress-badge">{lesson.progress}%</div>
                          )}
                        </div>
                        <div className="level-header-actions">
                          {isLocked ? (
                            <button className="level-skip-button">
                              <span className="material-icons">fast_forward</span>
                              Skip To Level
                            </button>
                          ) : (
                            <button className="level-study-button">
                              <span className="material-icons">menu_book</span>
                              Study Lesson
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Exercise Groups - Game Nodes (Vertical Layout) */}
                    <div className="exercise-groups-game-container">
                      {lesson.exerciseGroups.map((group, groupIndex) => {
                        const isGroupCompleted = group.status === 'completed';
                        const isGroupInProgress = group.status === 'in_progress';
                        const isGroupLocked = group.status === 'locked';
                        const isGroupUnlocked = !isGroupCompleted && !isGroupInProgress && !isGroupLocked;

                        // Get node color based on status
                        let nodeColor = '#9ca3af';
                        let nodeBg = '#f3f4f6';
                        if (isGroupCompleted) {
                          nodeColor = '#10b981';
                          nodeBg = 'rgba(16, 185, 129, 0.1)';
                        } else if (isGroupInProgress) {
                          nodeColor = '#3b82f6';
                          nodeBg = 'rgba(59, 130, 246, 0.1)';
                        } else if (isGroupUnlocked) {
                          nodeColor = '#f59e0b';
                          nodeBg = 'rgba(245, 158, 11, 0.1)';
                        }

                        // Random left/right margin variation (but constant vertical margin)
                        const marginVariations = [
                          { marginLeft: '0', marginRight: 'auto' },
                          { marginLeft: '2rem', marginRight: 'auto' },
                          { marginLeft: '4rem', marginRight: 'auto' },
                          { marginLeft: 'auto', marginRight: '0' },
                          { marginLeft: 'auto', marginRight: '2rem' },
                          { marginLeft: 'auto', marginRight: '4rem' },
                          { marginLeft: '1rem', marginRight: 'auto' },
                          { marginLeft: 'auto', marginRight: '1rem' }
                        ];
                        const marginStyle = marginVariations[groupIndex % marginVariations.length];

                        return (
                          <div key={group.id} className="exercise-group-game-wrapper" style={marginStyle}>
                            {/* Path connector to next node (vertical) */}
                            {groupIndex < lesson.exerciseGroups.length - 1 && (
                              <div 
                                className={`game-path-connector-vertical ${isGroupCompleted ? 'completed' : isGroupLocked ? 'locked' : 'active'}`}
                                style={isGroupCompleted ? { backgroundColor: nodeColor } : {}}
                              ></div>
                            )}
                            
                            {/* Game Node */}
                            <div 
                              className={`game-node ${group.status}`}
                              style={{
                                backgroundColor: nodeBg,
                                borderColor: nodeColor,
                                boxShadow: isGroupInProgress ? `0 0 0 3px ${nodeColor}40` : 'none'
                              }}
                            >
                              {/* Node Icon */}
                              <div className="game-node-icon" style={{ color: nodeColor }}>
                                {isGroupCompleted && (
                                  <span className="material-icons">check</span>
                                )}
                                {isGroupInProgress && (
                                  <span className="material-icons">play_arrow</span>
                                )}
                                {isGroupLocked && (
                                  <span className="material-icons">lock</span>
                                )}
                                {isGroupUnlocked && (
                                  <span className="game-node-number">{groupIndex + 1}</span>
                                )}
                              </div>

                              {/* Node Label */}
                              <div className="game-node-label">
                                <span className="game-node-title">{group.title}</span>
                                {group.isReview && (
                                  <span className="game-node-review-tag">Review</span>
                                )}
                              </div>

                              {/* Exercise Count Badge */}
                              {!isGroupLocked && (
                                <div className="game-node-badge" style={{ backgroundColor: nodeColor }}>
                                  {group.exercisesCount}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Path Connector Between Lessons */}
                  {!isLast && (
                    <div className={`lesson-path-connector ${isCompleted ? 'completed' : isInProgress ? 'in-progress' : 'locked'}`}>
                      <div 
                        className="lesson-connector-line" 
                        style={isCompleted ? { backgroundColor: masteryColor } : {}}
                      ></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectRoadmap;
