import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import './TeacherAssignActivity.css';

export default function TeacherAssignActivity() {
  const navigate = useNavigate();

  const [teacher] = useState({ name: 'Ahmed Emad', role: 'Teacher' });
  const [unreadCount] = useState(3);

  const [classes] = useState(() => {
    try {
      const raw = localStorage.getItem('teacherClassesData');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  });

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [assignType, setAssignType] = useState('class'); // 'class' or 'students'
  const [searchQuery, setSearchQuery] = useState('');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);

  // Assignment details
  const [assignmentDetails, setAssignmentDetails] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    return {
      dueDate: tomorrow.toISOString().split('T')[0],
      dueTime: '23:59',
      availability: 'immediate',
      startDate: '',
      timeLimit: '',
      attempts: '1',
      instructions: ''
    };
  });

  // Mock data
  const [activities] = useState([
    {
      id: 1,
      title: 'Cell Biology Quiz',
      description: 'Test your knowledge of cellular structures and functions with 20 multiple-choice questions.',
      type: 'quiz',
      subject: 'biology',
      questions: 20,
      duration: 30,
      lastUsed: '2024-03-10'
    },
    {
      id: 2,
      title: 'Photosynthesis Assignment',
      description: 'Research project on the light-dependent and light-independent reactions of photosynthesis.',
      type: 'assignment',
      subject: 'biology',
      pages: 3,
      points: 100,
      lastUsed: '2024-02-28'
    },
    {
      id: 3,
      title: 'Periodic Table Flashcards',
      description: 'Memorize elements, symbols, and atomic numbers with interactive flashcards.',
      type: 'flashcard',
      subject: 'chemistry',
      cards: 118,
      lastUsed: '2024-03-15'
    },
    {
      id: 4,
      title: 'Algebra Equations Quiz',
      description: 'Practice solving linear and quadratic equations with step-by-step feedback.',
      type: 'quiz',
      subject: 'math',
      questions: 15,
      duration: 25,
      lastUsed: '2024-03-05'
    },
    {
      id: 5,
      title: 'Physics Lab Report',
      description: 'Write-up template for the simple machines experiment with grading rubric.',
      type: 'assignment',
      subject: 'physics',
      pages: 5,
      points: 150,
      lastUsed: '2024-02-20'
    },
    {
      id: 6,
      title: 'Genetics Terminology',
      description: 'Flashcards covering key genetics terms and inheritance patterns.',
      type: 'flashcard',
      subject: 'biology',
      cards: 50,
      lastUsed: '2024-03-12'
    },
    {
      id: 7,
      title: 'Chemical Reactions Quiz',
      description: 'Identify reaction types and balance chemical equations.',
      type: 'quiz',
      subject: 'chemistry',
      questions: 18,
      duration: 35,
      lastUsed: '2024-02-25'
    },
    {
      id: 8,
      title: 'Geometry Proofs Assignment',
      description: 'Practice proving theorems with guided examples and practice problems.',
      type: 'assignment',
      subject: 'math',
      pages: 4,
      points: 120,
      lastUsed: '2024-03-08'
    }
  ]);

  const [students] = useState([
    { id: 1, name: 'Ahmed Mohamed', class: 'Class 1', avatar: 'A' },
    { id: 2, name: 'Fatma Hassan', class: 'Class 1', avatar: 'F' },
    { id: 3, name: 'Mohamed Ali', class: 'Class 2', avatar: 'M' },
    { id: 4, name: 'Huda Khattab', class: 'Class 2', avatar: 'H' },
    { id: 5, name: 'Ali Tarek', class: 'Class 3', avatar: 'A' },
    { id: 6, name: 'Mariam Noor', class: 'Class 3', avatar: 'M' },
    { id: 7, name: 'Mohamed Ibrahim', class: 'Class 4', avatar: 'M' },
    { id: 8, name: 'Ahmed Sayed', class: 'Class 4', avatar: 'A' }
  ]);

  // Stats
  const [assignedToday, setAssignedToday] = useState(() => {
    try {
      return parseInt(localStorage.getItem('assignmentsToday') || '0');
    } catch {
      return 0;
    }
  });
  const [totalAssignments, setTotalAssignments] = useState(() => {
    try {
      return parseInt(localStorage.getItem('totalAssignments') || '24');
    } catch {
      return 24;
    }
  });

  // Filtered activities
  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) return activities;
    const query = searchQuery.toLowerCase();
    return activities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.subject.toLowerCase().includes(query) ||
        activity.type.toLowerCase().includes(query)
    );
  }, [activities, searchQuery]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    if (!studentSearchQuery.trim()) return students;
    const query = studentSearchQuery.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.class.toLowerCase().includes(query)
    );
  }, [students, studentSearchQuery]);

  // Get relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays < 1) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Select activity
  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedActivity(null);
  };

  // Toggle class selection
  const handleToggleClass = (classId) => {
    setSelectedClasses((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    );
  };

  // Toggle student selection
  const handleToggleStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  // Handle assign type change
  const handleAssignTypeChange = (type) => {
    setAssignType(type);
    if (type === 'class') {
      setSelectedStudents([]);
    } else {
      setSelectedClasses([]);
    }
  };

  // Update assignment details
  const handleDetailsChange = (field, value) => {
    setAssignmentDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Handle availability change
  const handleAvailabilityChange = (value) => {
    if (value === 'schedule') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setAssignmentDetails((prev) => ({
        ...prev,
        availability: value,
        startDate: tomorrow.toISOString().split('T')[0]
      }));
    } else {
      setAssignmentDetails((prev) => ({
        ...prev,
        availability: value,
        startDate: ''
      }));
    }
  };

  // Validate step
  const validateStep = (step) => {
    if (step === 1) return selectedActivity !== null;
    if (step === 2) {
      if (assignType === 'class') return selectedClasses.length > 0;
      return selectedStudents.length > 0;
    }
    if (step === 3) return assignmentDetails.dueDate !== '';
    return true;
  };

  // Next step
  const handleNextStep = () => {
    if (!validateStep(currentStep)) {
      alert(
        currentStep === 1
          ? 'Please select an activity to assign'
          : currentStep === 2
          ? `Please select at least one ${assignType === 'class' ? 'class' : 'student'}`
          : 'Please complete all required fields'
      );
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Confirm assignment
  const handleConfirmAssignment = () => {
    if (!validateStep(3)) {
      alert('Please set a due date');
      return;
    }

    // Calculate total students
    let totalStudents = 0;
    let assignedTo = '';

    if (assignType === 'class') {
      selectedClasses.forEach((classId) => {
        const classItem = classes.find((c) => c.id === classId);
        if (classItem) {
          totalStudents += classItem.members || 0;
          if (assignedTo) assignedTo += ', ';
          assignedTo += classItem.name;
        }
      });
    } else {
      totalStudents = selectedStudents.length;
      assignedTo = `${selectedStudents.length} selected student${selectedStudents.length !== 1 ? 's' : ''}`;
    }

    // Update stats
    setAssignedToday((prev) => prev + 1);
    setTotalAssignments((prev) => prev + 1);
    localStorage.setItem('assignmentsToday', String(assignedToday + 1));
    localStorage.setItem('totalAssignments', String(totalAssignments + 1));

    // Show success modal
    setSummaryModalOpen(true);
  };

  // Close summary modal
  const handleCloseSummary = () => {
    setSummaryModalOpen(false);
  };

  // Assign another
  const handleAssignAnother = () => {
    setSummaryModalOpen(false);
    setCurrentStep(1);
    setSelectedActivity(null);
    setSelectedClasses([]);
    setSelectedStudents([]);
    setAssignType('class');
    setSearchQuery('');
    setStudentSearchQuery('');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    setAssignmentDetails({
      dueDate: tomorrow.toISOString().split('T')[0],
      dueTime: '23:59',
      availability: 'immediate',
      startDate: '',
      timeLimit: '',
      attempts: '1',
      instructions: ''
    });
  };

  // Format due date
  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get assigned to text
  const getAssignedToText = () => {
    if (assignType === 'class') {
      return selectedClasses
        .map((id) => {
          const classItem = classes.find((c) => c.id === id);
          return classItem?.name || '';
        })
        .filter(Boolean)
        .join(', ');
    }
    return `${selectedStudents.length} selected student${selectedStudents.length !== 1 ? 's' : ''}`;
  };

  // Get total students count
  const getTotalStudentsCount = () => {
    if (assignType === 'class') {
      return selectedClasses.reduce((total, id) => {
        const classItem = classes.find((c) => c.id === id);
        return total + (classItem?.members || 0);
      }, 0);
    }
    return selectedStudents.length;
  };

  // Set min dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 7);
    if (!assignmentDetails.dueDate) {
      setAssignmentDetails((prev) => ({
        ...prev,
        dueDate: tomorrow.toISOString().split('T')[0]
      }));
    }
  }, []);

  // Close modal on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && summaryModalOpen) {
        handleCloseSummary();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [summaryModalOpen]);

  return (
    <div className="teacher-assign-activity flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <TeacherSidebar teacher={teacher} classes={classes} onNewClass={() => navigate('/teacher/dashboard')} />

      <main className="teacher-assign-main flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="teacher-assign-header">
          <div className="teacher-assign-search">
            <span className="material-symbols-outlined teacher-assign-search-icon">search</span>
            <input
              type="text"
              className="teacher-assign-search-input"
              placeholder="Search flashcard sets, textbooks, questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="teacher-assign-search-clear" onClick={() => setSearchQuery('')}>
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>

          <div className="teacher-assign-header-actions">
            <button className="teacher-icon-btn" onClick={() => navigate('/teacher/notifications')}>
              <span className="material-symbols-outlined">notifications</span>
              {unreadCount > 0 && <span className="teacher-badge">{unreadCount}</span>}
            </button>
            <button className="teacher-icon-btn" onClick={() => navigate('/teacher/chat')}>
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="teacher-badge">1</span>
            </button>
            <div className="teacher-avatar" onClick={() => navigate('/teacher/dashboard')}>
              <span>{teacher.name.charAt(0)}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="teacher-assign-content">
          {/* Page Header */}
          <div className="teacher-assign-page-header">
            <div className="teacher-assign-header-content">
              <h1 className="teacher-assign-title">Assign Activity</h1>
              <p className="teacher-assign-subtitle">Create and distribute activities to your students</p>
              <div className="teacher-assign-stats">
                <div className="teacher-assign-stat-item">
                  <span className="teacher-assign-stat-value">{assignedToday}</span>
                  <span className="teacher-assign-stat-label">Assigned Today</span>
                </div>
                <div className="teacher-assign-stat-item">
                  <span className="teacher-assign-stat-value">{totalAssignments}</span>
                  <span className="teacher-assign-stat-label">Total Assignments</span>
                </div>
              </div>
            </div>
            <div className="teacher-assign-header-actions">
              <button className="teacher-btn teacher-btn-secondary" onClick={() => navigate('/teacher/dashboard')}>
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Wizard */}
          <div className="teacher-assign-wizard">
            {/* Progress Steps */}
            <div className="teacher-assign-progress-steps">
              <div className={`teacher-assign-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <div className="teacher-assign-step-number">1</div>
                <div className="teacher-assign-step-info">
                  <div className="teacher-assign-step-title">Select Activity</div>
                  <div className="teacher-assign-step-subtitle">Choose what to assign</div>
                </div>
              </div>
              <div className="teacher-assign-step-line"></div>
              <div className={`teacher-assign-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                <div className="teacher-assign-step-number">2</div>
                <div className="teacher-assign-step-info">
                  <div className="teacher-assign-step-title">Assign To</div>
                  <div className="teacher-assign-step-subtitle">Select recipients</div>
                </div>
              </div>
              <div className="teacher-assign-step-line"></div>
              <div className={`teacher-assign-step ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="teacher-assign-step-number">3</div>
                <div className="teacher-assign-step-info">
                  <div className="teacher-assign-step-title">Schedule</div>
                  <div className="teacher-assign-step-subtitle">Set dates & options</div>
                </div>
              </div>
            </div>

            {/* Step 1: Select Activity */}
            {currentStep === 1 && (
              <div className="teacher-assign-wizard-step active">
                <div className="teacher-assign-step-header">
                  <h3 className="teacher-assign-step-title">Select Activity</h3>
                  <p className="teacher-assign-step-description">
                    Choose the quiz, assignment, or flashcard set you want to assign
                  </p>
                </div>

                {filteredActivities.length === 0 ? (
                  <div className="teacher-assign-empty-state">
                    <div className="teacher-assign-empty-icon">
                      <span className="material-symbols-outlined">assignment</span>
                    </div>
                    <h3>No activities found</h3>
                    <p>Try adjusting your search or create a new activity</p>
                    <button className="teacher-btn teacher-btn-secondary" onClick={() => navigate('/teacher/library')}>
                      Go to Library
                    </button>
                  </div>
                ) : (
                  <div className="teacher-assign-activities-grid">
                    {filteredActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`teacher-assign-activity-card ${selectedActivity?.id === activity.id ? 'selected' : ''}`}
                        onClick={() => handleSelectActivity(activity)}
                      >
                        <div className="teacher-assign-activity-header">
                          <div>
                            <div className="teacher-assign-activity-title">{activity.title}</div>
                            <div className={`teacher-assign-activity-type ${activity.type}`}>
                              {activity.type === 'quiz' ? 'Quiz' : activity.type === 'assignment' ? 'Assignment' : 'Flashcard Set'}
                            </div>
                          </div>
                          <div className="teacher-assign-select-indicator"></div>
                        </div>
                        <div className="teacher-assign-activity-description">{activity.description}</div>
                        <div className="teacher-assign-activity-footer">
                          <span>
                            {activity.subject.charAt(0).toUpperCase() + activity.subject.slice(1)} • Last used{' '}
                            {getRelativeTime(activity.lastUsed)}
                          </span>
                          <span>
                            {activity.questions || activity.cards || activity.pages}{' '}
                            {activity.type === 'quiz' ? 'questions' : activity.type === 'flashcard' ? 'cards' : 'pages'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Preview */}
                {selectedActivity && (
                  <div className="teacher-assign-selected-preview">
                    <div className="teacher-assign-preview-header">
                      <h4>Selected Activity</h4>
                      <button className="teacher-assign-preview-close" onClick={handleClearSelection}>
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <div className="teacher-assign-preview-content">
                      <div className="teacher-assign-preview-title">{selectedActivity.title}</div>
                      <div className={`teacher-assign-preview-type ${selectedActivity.type}`}>
                        {selectedActivity.type === 'quiz' ? 'Quiz' : selectedActivity.type === 'assignment' ? 'Assignment' : 'Flashcard Set'}
                      </div>
                      <div className="teacher-assign-preview-description">{selectedActivity.description}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Assign To */}
            {currentStep === 2 && (
              <div className="teacher-assign-wizard-step active">
                <div className="teacher-assign-step-header">
                  <h3 className="teacher-assign-step-title">Assign To</h3>
                  <p className="teacher-assign-step-description">
                    Select which classes or individual students will receive this activity
                  </p>
                </div>

                <div className="teacher-assign-to-section">
                  <div className="teacher-assign-type-selector">
                    <button
                      className={`teacher-assign-type-btn ${assignType === 'class' ? 'active' : ''}`}
                      onClick={() => handleAssignTypeChange('class')}
                    >
                      Assign to Class
                    </button>
                    <button
                      className={`teacher-assign-type-btn ${assignType === 'students' ? 'active' : ''}`}
                      onClick={() => handleAssignTypeChange('students')}
                    >
                      Assign to Specific Students
                    </button>
                  </div>

                  {/* Class Selection */}
                  {assignType === 'class' && (
                    <div className="teacher-assign-options active">
                      <div className="teacher-assign-classes-list">
                        {classes.map((classItem) => (
                          <div
                            key={classItem.id}
                            className={`teacher-assign-class-item ${selectedClasses.includes(classItem.id) ? 'selected' : ''}`}
                            onClick={() => handleToggleClass(classItem.id)}
                          >
                            <div className="teacher-assign-class-name">{classItem.name}</div>
                            <div className="teacher-assign-class-description">{classItem.description}</div>
                            <div className="teacher-assign-class-stats">
                              <span>{classItem.members || 0} students</span>
                              <span>{classItem.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Students Selection */}
                  {assignType === 'students' && (
                    <div className="teacher-assign-options active">
                      <div className="teacher-assign-search">
                        <span className="material-symbols-outlined teacher-assign-search-icon">search</span>
                        <input
                          type="text"
                          className="teacher-assign-search-input"
                          placeholder="Search students..."
                          value={studentSearchQuery}
                          onChange={(e) => setStudentSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="teacher-assign-students-list">
                        {filteredStudents.map((student) => (
                          <div
                            key={student.id}
                            className={`teacher-assign-student-item ${selectedStudents.includes(student.id) ? 'selected' : ''}`}
                            onClick={() => handleToggleStudent(student.id)}
                          >
                            <div className="teacher-assign-student-info">
                              <div className="teacher-assign-student-avatar">{student.avatar}</div>
                              <div>
                                <div className="teacher-assign-student-name">{student.name}</div>
                                <div className="teacher-assign-student-class">{student.class}</div>
                              </div>
                            </div>
                            <div className="teacher-assign-student-checkbox"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <div className="teacher-assign-wizard-step active">
                <div className="teacher-assign-step-header">
                  <h3 className="teacher-assign-step-title">Schedule & Options</h3>
                  <p className="teacher-assign-step-description">Configure due dates, availability, and other settings</p>
                </div>

                <div className="teacher-assign-schedule-section">
                  <div className="teacher-assign-form-row">
                    <div className="teacher-assign-form-group">
                      <label htmlFor="due-date">Due Date</label>
                      <input
                        type="date"
                        id="due-date"
                        required
                        value={assignmentDetails.dueDate}
                        onChange={(e) => handleDetailsChange('dueDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="teacher-assign-form-group">
                      <label htmlFor="due-time">Due Time</label>
                      <input
                        type="time"
                        id="due-time"
                        value={assignmentDetails.dueTime}
                        onChange={(e) => handleDetailsChange('dueTime', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="teacher-assign-form-row">
                    <div className="teacher-assign-form-group">
                      <label htmlFor="availability">Availability</label>
                      <select
                        id="availability"
                        value={assignmentDetails.availability}
                        onChange={(e) => handleAvailabilityChange(e.target.value)}
                      >
                        <option value="immediate">Available immediately</option>
                        <option value="schedule">Schedule for later</option>
                      </select>
                    </div>
                    <div className="teacher-assign-form-group">
                      <label htmlFor="start-date">Available From (if scheduled)</label>
                      <input
                        type="date"
                        id="start-date"
                        value={assignmentDetails.startDate}
                        onChange={(e) => handleDetailsChange('startDate', e.target.value)}
                        disabled={assignmentDetails.availability === 'immediate'}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="teacher-assign-form-row">
                    <div className="teacher-assign-form-group">
                      <label htmlFor="time-limit">Time Limit (minutes)</label>
                      <input
                        type="number"
                        id="time-limit"
                        min="0"
                        placeholder="Unlimited"
                        value={assignmentDetails.timeLimit}
                        onChange={(e) => handleDetailsChange('timeLimit', e.target.value)}
                      />
                    </div>
                    <div className="teacher-assign-form-group">
                      <label htmlFor="attempts">Attempts Allowed</label>
                      <select
                        id="attempts"
                        value={assignmentDetails.attempts}
                        onChange={(e) => handleDetailsChange('attempts', e.target.value)}
                      >
                        <option value="1">1 attempt</option>
                        <option value="2">2 attempts</option>
                        <option value="3">3 attempts</option>
                        <option value="unlimited">Unlimited</option>
                      </select>
                    </div>
                  </div>

                  <div className="teacher-assign-form-group">
                    <label htmlFor="instructions">Additional Instructions</label>
                    <textarea
                      id="instructions"
                      placeholder="Add any special instructions for students..."
                      rows="3"
                      value={assignmentDetails.instructions}
                      onChange={(e) => handleDetailsChange('instructions', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation */}
            <div className="teacher-assign-wizard-navigation">
              <button
                className="teacher-btn teacher-btn-secondary"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                <span className="material-symbols-outlined">chevron_left</span>
                Previous
              </button>

              <div className="teacher-assign-step-indicator">
                <span className="teacher-assign-current-step">
                  Step {currentStep} of 3
                </span>
              </div>

              {currentStep < 3 ? (
                <button
                  className="teacher-btn teacher-btn-primary"
                  onClick={handleNextStep}
                  disabled={currentStep === 1 && !selectedActivity}
                >
                  Next Step
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              ) : (
                <button className="teacher-btn teacher-btn-success" onClick={handleConfirmAssignment}>
                  <span className="material-symbols-outlined">send</span>
                  Confirm Assignment
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {summaryModalOpen && (
        <div className="teacher-assign-modal" onClick={handleCloseSummary}>
          <div className="teacher-assign-modal-content teacher-assign-success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-assign-modal-header">
              <h3>Assignment Created Successfully!</h3>
              <button className="teacher-assign-modal-close" onClick={handleCloseSummary}>
                &times;
              </button>
            </div>
            <div className="teacher-assign-modal-body">
              <div className="teacher-assign-success-icon">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <h4 className="teacher-assign-success-title">{selectedActivity?.title}</h4>
              <div className="teacher-assign-success-details">
                <div className="teacher-assign-detail-item">
                  <span className="teacher-assign-detail-label">Assigned To:</span>
                  <span className="teacher-assign-detail-value">{getAssignedToText()}</span>
                </div>
                <div className="teacher-assign-detail-item">
                  <span className="teacher-assign-detail-label">Due Date:</span>
                  <span className="teacher-assign-detail-value">{formatDueDate(assignmentDetails.dueDate)}</span>
                </div>
                <div className="teacher-assign-detail-item">
                  <span className="teacher-assign-detail-label">Students:</span>
                  <span className="teacher-assign-detail-value">{getTotalStudentsCount()}</span>
                </div>
              </div>
              <div className="teacher-assign-success-actions">
                <button className="teacher-btn teacher-btn-secondary" onClick={handleCloseSummary}>
                  <span className="material-symbols-outlined">visibility</span>
                  View Assignment
                </button>
                <button className="teacher-btn teacher-btn-primary" onClick={handleAssignAnother}>
                  <span className="material-symbols-outlined">add</span>
                  Assign Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
