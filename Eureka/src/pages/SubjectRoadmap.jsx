import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import { contentService } from '../services/contentService';
import './SubjectRoadmap.css';

const SubjectRoadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentData = useStudentData();
  
  // State for modals and tooltips
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [placementQuizResults, setPlacementQuizResults] = useState({}); // Track placement quiz attempts/results

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

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const allLessons = contentService.getLessons();
    // Filter by subject if needed, or just show all for now
    setLessons(allLessons.map(l => ({
      ...l,
      order: l.id,
      status: 'unlocked', // Default status for dynamic lessons
      progress: 0,
      mastery: 0,
      exerciseGroups: [
        { id: `ex-${l.id}`, title: 'Exercises', status: 'unlocked', exercisesCount: contentService.getQuestionsByLesson(l.id).length }
      ]
    })));
  }, [id]);

  // Get mastery level name and color
  const getMasteryInfo = (mastery) => {
    if (mastery >= 76) return { level: 'Master', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' };
    if (mastery >= 51) return { level: 'Advanced', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' };
    if (mastery >= 26) return { level: 'Intermediate', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' };
    return { level: 'Beginner', color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
  };

  const masteryInfo = getMasteryInfo(subjectData.masteryLevel);

  // Handle lesson button clicks
  const handleStudyLesson = (lessonId) => {
    navigate(`/lessons/${lessonId}`);
  };

  const handleSkipToLevel = (lesson) => {
    setSelectedLesson(lesson);
    setShowPlacementModal(true);
  };

  const handleStartPlacementQuiz = () => {
    if (selectedLesson) {
      // Navigate to placement quiz page
      navigate(`/lessons/${selectedLesson.id}/placement-quiz`);
    }
  };

  const handleClosePlacementModal = () => {
    setShowPlacementModal(false);
    setSelectedLesson(null);
  };

  // Get previous lesson info for placement quiz
  const getPreviousLessonInfo = (currentLesson) => {
    if (!currentLesson.placementQuiz || !currentLesson.placementQuiz.testsPreviousLesson) {
      return null;
    }
    const previousLessonId = currentLesson.placementQuiz.testsPreviousLesson;
    return lessons.find(l => l.id === previousLessonId);
  };

  // Check if placement quiz is available for a lesson
  const isPlacementQuizAvailable = (lesson) => {
    return lesson.placementQuiz && lesson.placementQuiz.available && lesson.status === 'locked';
  };

  // Handle exercise group clicks
  const handleExerciseGroupClick = (group, lesson) => {
    if (group.status === 'locked') {
      // Show tooltip/message about prerequisites
      return;
    }
    // Navigate to exercises - will be implemented later
    navigate(`/lessons/${lesson.id}/exercises/${group.id}`);
  };

  // Handle milestone quiz click
  const handleMilestoneQuizClick = (lesson) => {
    if (lesson.milestoneQuiz.status === 'ready' || lesson.milestoneQuiz.status === 'not_ready') {
      // Check if all exercise groups are completed
      const allCompleted = lesson.exerciseGroups.every(group => group.status === 'completed');
      if (allCompleted) {
        navigate(`/lessons/${lesson.id}/milestone-quiz`);
      }
    } else if (lesson.milestoneQuiz.status === 'failed') {
      // Retake quiz
      navigate(`/lessons/${lesson.id}/milestone-quiz`);
    } else if (lesson.milestoneQuiz.status === 'passed') {
      // Review quiz results
      navigate(`/lessons/${lesson.id}/milestone-quiz/results`);
    }
  };

  // Check if milestone quiz is ready (all exercise groups completed)
  const isMilestoneQuizReady = (lesson) => {
    return lesson.exerciseGroups.every(group => group.status === 'completed');
  };

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

        {/* Learning Roadmap - Levels with Lessons */}
        <div className="roadmap-content">
          <div className="roadmap-levels-container">
            {lessons.map((lesson, index) => {
              const isCompleted = lesson.status === 'completed';
              const isInProgress = lesson.status === 'in_progress';
              const isUnlocked = lesson.status === 'unlocked';
              const isLocked = lesson.status === 'locked';

              // Get mastery color and level
              const getMasteryColor = (mastery) => {
                if (mastery >= 76) return '#10b981';
                if (mastery >= 51) return '#3b82f6';
                if (mastery >= 26) return '#f59e0b';
                return '#6b7280';
              };

              const getMasteryLevel = (mastery) => {
                if (mastery >= 76) return 'Master';
                if (mastery >= 51) return 'Advanced';
                if (mastery >= 26) return 'Intermediate';
                return 'Beginner';
              };

              const masteryColor = getMasteryColor(lesson.mastery);
              const lessonMasteryLevel = getMasteryLevel(lesson.mastery);
              const lessonMasteryInfo = getMasteryInfo(lesson.mastery);

              return (
                <div key={lesson.id} className="roadmap-level-section">
                  {/* Level Header */}
                  <div className={`level-header ${lesson.status}`}>
                    <div className="level-header-content">
                      <div className="level-title-section">
                        <h2 className="level-title-text">
                          Level {lesson.order}: {lesson.title}
                        </h2>
                        <div className="level-meta-info">
                          {isInProgress && (
                            <span className="level-progress-indicator">{lesson.progress}%</span>
                          )}
                          {lesson.mastery > 0 && (
                            <div className="level-mastery-indicator">
                              <div className="level-mastery-ring-wrapper">
                                <svg className="level-mastery-ring-svg" viewBox="0 0 36 36">
                                  <path
                                    className="level-mastery-ring-bg"
                                    d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="2.5"
                                  />
                                  <path
                                    className="level-mastery-ring-fill"
                                    d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke={masteryColor}
                                    strokeWidth="2.5"
                                    strokeDasharray={`${lesson.mastery}, 100`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 18 18)"
                                  />
                                </svg>
                                <div className="level-mastery-percentage">{lesson.mastery}%</div>
                              </div>
                              <div className="level-mastery-label">
                                <span className="level-mastery-level" style={{ color: masteryColor }}>
                                  {lessonMasteryLevel}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {isLocked && isPlacementQuizAvailable(lesson) && (
                        <button
                          className="skip-to-level-button"
                          onClick={() => handleSkipToLevel(lesson)}
                        >
                          <span className="material-icons">fast_forward</span>
                          Skip to Level
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Lesson Nodes - Vertical Layout with Variations */}
                  <div className="lessons-nodes-container">
                    {lesson.exerciseGroups.map((group, groupIndex) => {
                      const isGroupCompleted = group.status === 'completed';
                      const isGroupInProgress = group.status === 'in_progress';
                      const isGroupLocked = group.status === 'locked';
                      const isGroupUnlocked = !isGroupCompleted && !isGroupInProgress && !isGroupLocked;

                      // Alternate left and right positioning
                      const isLeft = groupIndex % 2 === 0;
                      const nodePositionClass = isLeft ? 'node-left' : 'node-right';

                      return (
                        <div
                          key={group.id}
                          className={`lesson-node-wrapper ${nodePositionClass}`}
                        >
                          <div
                            className={`lesson-node ${group.status} ${isGroupInProgress ? 'current' : ''}`}
                            onClick={() => {
                              if (!isGroupLocked) {
                                navigate(`/lessons/${lesson.id}`);
                              }
                            }}
                            onMouseEnter={() => setHoveredNode(`${lesson.id}-${group.id}`)}
                            onMouseLeave={() => setHoveredNode(null)}
                          >
                            <div className="lesson-node-content">
                              {isGroupCompleted && (
                                <span className="material-icons lesson-node-icon">check_circle</span>
                              )}
                              {isGroupInProgress && (
                                <span className="material-icons lesson-node-icon">play_circle</span>
                              )}
                              {isGroupLocked && (
                                <span className="material-icons lesson-node-icon">lock</span>
                              )}
                              {isGroupUnlocked && (
                                <span className="lesson-node-number">{groupIndex + 1}</span>
                              )}
                            </div>
                            <div className="lesson-node-label">
                              <span className="lesson-node-title">{group.title}</span>
                              {group.isReview && (
                                <span className="lesson-node-review-badge">Review</span>
                              )}
                            </div>
                            {hoveredNode === `${lesson.id}-${group.id}` && !isGroupLocked && (
                              <div className="lesson-node-tooltip">
                                <div className="lesson-node-tooltip-title">{group.title}</div>
                                {group.exercisesCount && (
                                  <div className="lesson-node-tooltip-count">{group.exercisesCount} exercises</div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Placement Quiz Modal */}
        {showPlacementModal && selectedLesson && selectedLesson.placementQuiz && (
          <div className="modal-overlay" onClick={handleClosePlacementModal}>
            <div className="modal-content placement-quiz-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-header-icon-wrapper">
                  <span className="material-icons modal-header-icon">fast_forward</span>
                </div>
                <div className="modal-header-text">
                  <h3 className="modal-title">Skip to Level {selectedLesson.order}?</h3>
                  <p className="modal-subtitle">{selectedLesson.title}</p>
                </div>
                <button 
                  className="modal-close-button"
                  onClick={handleClosePlacementModal}
                  aria-label="Close modal"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="placement-quiz-info">
                  <div className="placement-quiz-info-item">
                    <span className="material-icons placement-quiz-info-icon">quiz</span>
                    <div className="placement-quiz-info-text">
                      <strong>Placement Quiz</strong>
                      <p>Test your knowledge to unlock this level</p>
                    </div>
                  </div>
                  {(() => {
                    const previousLesson = getPreviousLessonInfo(selectedLesson);
                    return previousLesson ? (
                      <div className="placement-quiz-info-item">
                        <span className="material-icons placement-quiz-info-icon">menu_book</span>
                        <div className="placement-quiz-info-text">
                          <strong>Tests Knowledge From:</strong>
                          <p>Level {previousLesson.order}: {previousLesson.title}</p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                  <div className="placement-quiz-info-item">
                    <span className="material-icons placement-quiz-info-icon">check_circle</span>
                    <div className="placement-quiz-info-text">
                      <strong>Passing Score:</strong>
                      <p>{selectedLesson.placementQuiz.requiredScore}% or higher</p>
                    </div>
                  </div>
                  {selectedLesson.placementQuiz.attempts > 0 && (
                    <div className="placement-quiz-info-item">
                      <span className="material-icons placement-quiz-info-icon">history</span>
                      <div className="placement-quiz-info-text">
                        <strong>Previous Attempts:</strong>
                        <p>
                          {selectedLesson.placementQuiz.attempts} attempt{selectedLesson.placementQuiz.attempts > 1 ? 's' : ''}
                          {selectedLesson.placementQuiz.lastScore !== null && (
                            <span className="placement-quiz-last-score">
                              {' '}(Last: {selectedLesson.placementQuiz.lastScore}%)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="placement-quiz-message">
                  <p className="modal-message">
                    If you pass the placement quiz, you'll unlock <strong>{selectedLesson.title}</strong> and can start learning immediately.
                  </p>
                  <p className="modal-submessage">
                    This quiz tests your understanding of the previous level's content. You can retake it if you don't pass.
                  </p>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  className="modal-cancel-button"
                  onClick={handleClosePlacementModal}
                >
                  Cancel
                </button>
                <button 
                  className="modal-confirm-button placement-quiz-button"
                  onClick={handleStartPlacementQuiz}
                >
                  <span className="material-icons">quiz</span>
                  Take Placement Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SubjectRoadmap;
