import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import './Subjects.css';

const Subjects = () => {
  const studentData = useStudentData();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [progressFilter, setProgressFilter] = useState('all');
  
  // Enrollment state
  const [enrollingSubjectId, setEnrollingSubjectId] = useState(null);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(null);

  // Mock subjects data - will be replaced with API call
  const [allSubjects, setAllSubjects] = useState([
    {
      id: 1,
      name: 'Arabic',
      nameArabic: 'العربية',
      icon: '🇸🇦',
      progress: 95,
      currentLesson: 'Lesson 8: Advanced Grammar',
      lastActivity: '2 hours ago',
      hasProgress: true,
      category: 'Languages',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      name: 'Programming',
      nameArabic: 'البرمجة',
      icon: '💻',
      progress: 80,
      currentLesson: 'Lesson 5: Data Structures',
      lastActivity: '1 day ago',
      hasProgress: true,
      category: 'Technology',
      difficulty: 'Advanced'
    },
    {
      id: 3,
      name: 'Science',
      nameArabic: 'العلوم',
      icon: '🔬',
      progress: 95,
      currentLesson: 'Lesson 10: Chemistry Basics',
      lastActivity: '3 hours ago',
      hasProgress: true,
      category: 'Science',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      name: 'English',
      nameArabic: 'الإنجليزية',
      icon: '📚',
      progress: 90,
      currentLesson: 'Lesson 7: Literature Analysis',
      lastActivity: '5 hours ago',
      hasProgress: true,
      category: 'Languages',
      difficulty: 'Intermediate'
    },
    {
      id: 5,
      name: 'Maths',
      nameArabic: 'الرياضيات',
      icon: '📐',
      progress: 66,
      currentLesson: 'Lesson 4: Algebra',
      lastActivity: '2 days ago',
      hasProgress: true,
      category: 'Math',
      difficulty: 'Intermediate'
    },
    {
      id: 6,
      name: 'Physics',
      nameArabic: 'الفيزياء',
      icon: '⚛️',
      progress: 0,
      currentLesson: null,
      lastActivity: null,
      hasProgress: false,
      category: 'Science',
      difficulty: 'Advanced',
      description: 'Explore the fundamental laws of physics and mechanics'
    },
    {
      id: 7,
      name: 'Chemistry',
      nameArabic: 'الكيمياء',
      icon: '🧪',
      progress: 0,
      currentLesson: null,
      lastActivity: null,
      hasProgress: false,
      category: 'Science',
      difficulty: 'Advanced',
      description: 'Study chemical reactions and elements'
    },
    {
      id: 8,
      name: 'History',
      nameArabic: 'التاريخ',
      icon: '📜',
      progress: 0,
      currentLesson: null,
      lastActivity: null,
      hasProgress: false,
      category: 'Social Studies',
      difficulty: 'Beginner',
      description: 'Explore world history and civilizations'
    },
    {
      id: 9,
      name: 'Biology',
      nameArabic: 'الأحياء',
      icon: '🌱',
      progress: 100,
      currentLesson: 'All Lessons Completed',
      lastActivity: '1 week ago',
      hasProgress: true,
      category: 'Science',
      difficulty: 'Intermediate',
      description: 'Study of living organisms'
    }
  ]);

  // Filter subjects based on search and progress
  const filteredSubjects = allSubjects.filter(subject => {
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const nameMatch = subject.name.toLowerCase().includes(query);
      const arabicMatch = subject.nameArabic?.toLowerCase().includes(query);
      if (!nameMatch && !arabicMatch) return false;
    }
    
    // Progress filter
    if (progressFilter === 'not-started') {
      if (subject.progress > 0) return false;
    } else if (progressFilter === 'in-progress') {
      if (subject.progress === 0 || subject.progress === 100) return false;
    } else if (progressFilter === 'completed') {
      if (subject.progress !== 100) return false;
    }
    
    return true;
  });

  // Count active filters
  const activeFiltersCount = progressFilter !== 'all' ? 1 : 0;

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearAllFilters = () => {
    setProgressFilter('all');
    setSearchQuery('');
  };

  const handleRemoveFilter = (filterType) => {
    if (filterType === 'progress') {
      setProgressFilter('all');
    }
  };

  // Handle subject enrollment
  const handleEnrollSubject = async (subjectId) => {
    setEnrollingSubjectId(subjectId);
    setEnrollmentSuccess(null);

    try {
      // Simulate API call - will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Update subject state to enrolled (in progress with 0% progress)
      setAllSubjects(prevSubjects => 
        prevSubjects.map(subject => 
          subject.id === subjectId 
            ? { 
                ...subject, 
                progress: 0,
                hasProgress: true,
                currentLesson: 'Lesson 1: Introduction',
                lastActivity: 'Just now'
              }
            : subject
        )
      );

      setEnrollmentSuccess(subjectId);
      
      // Clear success message after 3 seconds and navigate
      setTimeout(() => {
        setEnrollmentSuccess(null);
        setEnrollingSubjectId(null);
        // Navigate to subject roadmap
        window.location.href = `/subjects/${subjectId}`;
      }, 1500);

    } catch (error) {
      console.error('Enrollment failed:', error);
      setEnrollingSubjectId(null);
      // In real app, show error message to user
    }
  };

  return (
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Sidebar */}
      <Sidebar studentData={studentData} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header Section */}
        <header className="subjects-header mb-6">
          <div className="subjects-header-content">
            <div className="subjects-header-title-section">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Subjects</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {studentData.grade}
              </p>
            </div>
          </div>
        </header>

        {/* Search Bar Section */}
        <div className="subjects-search-section mb-6">
          <div className="search-bar-container">
            <div className="search-bar-wrapper">
              <span className="material-icons search-icon">search</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search subjects... / ابحث عن المواد..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear-button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <span className="material-icons">close</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="subjects-filters-section mb-6">
          <div className="filters-container">
            <div className="filters-row">
              {/* Progress Filter */}
              <div className="filter-group">
                <label className="filter-label">Progress</label>
                <select
                  className="filter-select"
                  value={progressFilter}
                  onChange={(e) => setProgressFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Active Filters & Clear All */}
            {(activeFiltersCount > 0 || searchQuery) && (
              <div className="active-filters-row">
                <div className="active-filters-container">
                  {searchQuery && (
                    <span className="filter-chip">
                      Search: "{searchQuery}"
                      <button
                        className="filter-chip-remove"
                        onClick={handleClearSearch}
                        aria-label="Remove search filter"
                      >
                        <span className="material-icons">close</span>
                      </button>
                    </span>
                  )}
                  {progressFilter !== 'all' && (
                    <span className="filter-chip">
                      Progress: {progressFilter === 'not-started' ? 'Not Started' : progressFilter === 'in-progress' ? 'In Progress' : 'Completed'}
                      <button
                        className="filter-chip-remove"
                        onClick={() => handleRemoveFilter('progress')}
                        aria-label="Remove progress filter"
                      >
                        <span className="material-icons">close</span>
                      </button>
                    </span>
                  )}
                </div>
                {(activeFiltersCount > 0 || searchQuery) && (
                  <button
                    className="clear-all-filters-button"
                    onClick={handleClearAllFilters}
                  >
                    <span className="material-icons">clear_all</span>
                    Clear All
                  </button>
                )}
              </div>
            )}

            {/* Filter Count Indicator */}
            {activeFiltersCount > 0 && (
              <div className="filter-count-indicator">
                {filteredSubjects.length} {filteredSubjects.length === 1 ? 'subject' : 'subjects'} found
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="subjects-content">
          {/* No results message */}
          {filteredSubjects.length === 0 && (
            <div className="no-results-message">
              <span className="material-icons no-results-icon">search_off</span>
              <h3 className="no-results-title">No results found</h3>
              <p className="no-results-text">
                {searchQuery 
                  ? `No subjects match your search "${searchQuery}". Try a different search term.`
                  : 'No subjects match the selected filters. Try adjusting your filters.'}
              </p>
            </div>
          )}

          {/* Subject Grid */}
          {filteredSubjects.length > 0 && (
            <div className="subjects-grid">
              {filteredSubjects.map((subject) => {
                const isNotStarted = subject.progress === 0;
                const isCompleted = subject.progress === 100;
                const isInProgress = !isNotStarted && !isCompleted;

                return (
                  <Link
                    key={subject.id}
                    to={`/subjects/${subject.id}`}
                    className="subject-card"
                  >
                    <div className="subject-card-header">
                      <div className="subject-icon">{subject.icon}</div>
                      <h4 className="subject-name">{subject.name}</h4>
                    </div>

                    {/* Progress Section - Only show if started */}
                    {(isInProgress || isCompleted) && (
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
                    )}

                    {/* Not Started - Show description */}
                    {isNotStarted && subject.description && (
                      <p className="subject-description">{subject.description}</p>
                    )}

                    {/* Details - Only show if in progress */}
                    {isInProgress && (
                      <div className="subject-details">
                        {subject.currentLesson && (
                          <div className="subject-detail-item">
                            <span className="material-icons subject-detail-icon">book</span>
                            <span className="subject-detail-text">{subject.currentLesson}</span>
                          </div>
                        )}
                        {subject.lastActivity && (
                          <div className="subject-detail-item">
                            <span className="material-icons subject-detail-icon">schedule</span>
                            <span className="subject-detail-text">{subject.lastActivity}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <button 
                      className={`subject-action-button ${
                        isNotStarted 
                          ? 'subject-start-button' 
                          : isCompleted 
                          ? 'subject-review-button' 
                          : 'subject-continue-button'
                      } ${enrollingSubjectId === subject.id ? 'enrolling' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        if (isNotStarted) {
                          // Enroll in subject
                          handleEnrollSubject(subject.id);
                        } else {
                          // Navigate to roadmap
                          window.location.href = `/subjects/${subject.id}`;
                        }
                      }}
                      disabled={enrollingSubjectId === subject.id}
                    >
                      {enrollingSubjectId === subject.id ? (
                        <>
                          <span className="material-icons spinning">refresh</span>
                          Enrolling...
                        </>
                      ) : enrollmentSuccess === subject.id ? (
                        <>
                          <span className="material-icons">check_circle</span>
                          Enrolled!
                        </>
                      ) : (
                        <>
                          {isNotStarted 
                            ? 'Start Learning' 
                            : isCompleted 
                            ? 'Review' 
                            : 'Continue Learning'}
                          <span className="material-icons">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Subjects;
