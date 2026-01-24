import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import './TeacherStudents.css';

export default function TeacherStudents() {
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

  // Mock students data
  const [students, setStudents] = useState(() => {
    try {
      const raw = localStorage.getItem('teacherStudentsData');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }

    return [
      {
        id: 1,
        name: 'Ahmed Mohamed',
        email: 'ahmed.mohamed@example.com',
        avatar: '',
        studentId: 'STU-2025-001',
        status: 'active',
        joinDate: '2024-01-15',
        activities: 24,
        avgScore: 92,
        online: true,
        assessments: [
          { name: 'Quiz 1', score: '18/20', percentage: 90 },
          { name: 'Quiz 2', score: '12/15', percentage: 80 },
          { name: 'Bank of Questions', score: '75%', percentage: 75 },
          { name: 'Assignment 1', score: '20/25', percentage: 80 },
          { name: 'Project Draft Submission', score: '60%', percentage: 60 }
        ]
      },
      {
        id: 2,
        name: 'Ahmed Sayed',
        email: 'ahmed.sayed@example.com',
        avatar: '',
        studentId: 'STU-2025-002',
        status: 'active',
        joinDate: '2024-02-10',
        activities: 18,
        avgScore: 88,
        online: false,
        assessments: [
          { name: 'Quiz 1', score: '15/20', percentage: 75 },
          { name: 'Quiz 2', score: '10/15', percentage: 67 },
          { name: 'Bank of Questions', score: '85%', percentage: 85 },
          { name: 'Assignment 1', score: '18/25', percentage: 72 },
          { name: 'Project Draft Submission', score: '75%', percentage: 75 }
        ]
      },
      {
        id: 3,
        name: 'Ali Tarek',
        email: 'ali.tarek@example.com',
        avatar: '',
        studentId: 'STU-2025-003',
        status: 'active',
        joinDate: '2024-01-20',
        activities: 32,
        avgScore: 95,
        online: true,
        assessments: [
          { name: 'Quiz 1', score: '20/20', percentage: 100 },
          { name: 'Quiz 2', score: '15/15', percentage: 100 },
          { name: 'Bank of Questions', score: '95%', percentage: 95 },
          { name: 'Assignment 1', score: '24/25', percentage: 96 },
          { name: 'Project Draft Submission', score: '90%', percentage: 90 }
        ]
      },
      {
        id: 4,
        name: 'Fatma Hassan',
        email: 'fatma.hassan@example.com',
        avatar: '',
        studentId: 'STU-2025-004',
        status: 'inactive',
        joinDate: '2024-03-05',
        activities: 8,
        avgScore: 75,
        online: false,
        assessments: [
          { name: 'Quiz 1', score: '12/20', percentage: 60 },
          { name: 'Quiz 2', score: '8/15', percentage: 53 },
          { name: 'Bank of Questions', score: '65%', percentage: 65 },
          { name: 'Assignment 1', score: '15/25', percentage: 60 },
          { name: 'Project Draft Submission', score: '50%', percentage: 50 }
        ]
      },
      {
        id: 5,
        name: 'Huda Khattab',
        email: 'huda.khattab@example.com',
        avatar: '',
        studentId: 'STU-2025-005',
        status: 'active',
        joinDate: '2024-02-28',
        activities: 15,
        avgScore: 85,
        online: true,
        assessments: [
          { name: 'Quiz 1', score: '16/20', percentage: 80 },
          { name: 'Quiz 2', score: '11/15', percentage: 73 },
          { name: 'Bank of Questions', score: '80%', percentage: 80 },
          { name: 'Assignment 1', score: '19/25', percentage: 76 },
          { name: 'Project Draft Submission', score: '70%', percentage: 70 }
        ]
      },
      {
        id: 6,
        name: 'Mariam Noor',
        email: 'mariam.noor@example.com',
        avatar: '',
        studentId: 'STU-2025-006',
        status: 'pending',
        joinDate: '2024-03-15',
        activities: 0,
        avgScore: 0,
        online: false,
        assessments: [
          { name: 'Quiz 1', score: '0/20', percentage: 0 },
          { name: 'Quiz 2', score: '0/15', percentage: 0 },
          { name: 'Bank of Questions', score: '0%', percentage: 0 },
          { name: 'Assignment 1', score: '0/25', percentage: 0 },
          { name: 'Project Draft Submission', score: '0%', percentage: 0 }
        ]
      },
      {
        id: 7,
        name: 'Mohamed Ali',
        email: 'mohamed.ali@example.com',
        avatar: '',
        studentId: 'STU-2025-007',
        status: 'active',
        joinDate: '2024-01-12',
        activities: 28,
        avgScore: 90,
        online: false,
        assessments: [
          { name: 'Quiz 1', score: '17/20', percentage: 85 },
          { name: 'Quiz 2', score: '13/15', percentage: 87 },
          { name: 'Bank of Questions', score: '90%', percentage: 90 },
          { name: 'Assignment 1', score: '22/25', percentage: 88 },
          { name: 'Project Draft Submission', score: '85%', percentage: 85 }
        ]
      },
      {
        id: 8,
        name: 'Mohamed Ibrahim',
        email: 'mohamed.ibrahim@example.com',
        avatar: '',
        studentId: 'STU-2025-008',
        status: 'active',
        joinDate: '2024-02-22',
        activities: 20,
        avgScore: 87,
        online: true,
        assessments: [
          { name: 'Quiz 1', score: '16/20', percentage: 80 },
          { name: 'Quiz 2', score: '12/15', percentage: 80 },
          { name: 'Bank of Questions', score: '85%', percentage: 85 },
          { name: 'Assignment 1', score: '20/25', percentage: 80 },
          { name: 'Project Draft Submission', score: '80%', percentage: 80 }
        ]
      }
    ];
  });

  // UI State
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [filterRecent, setFilterRecent] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const studentsPerPage = 6;

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter((student) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (
          !student.name.toLowerCase().includes(query) &&
          !student.email.toLowerCase().includes(query) &&
          !student.studentId.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Status filters
      if (filterActive && student.status === 'active') return true;
      if (filterInactive && student.status === 'inactive') return true;
      if (filterRecent) {
        const joinDate = new Date(student.joinDate);
        const daysSinceJoin = (Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceJoin <= 30) return true;
      }

      // If no filters are active, show all
      if (!filterActive && !filterInactive && !filterRecent) return true;

      return false;
    });

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'recent':
          return new Date(b.joinDate) - new Date(a.joinDate);
        case 'active':
          return b.activities - a.activities;
        default:
          return 0;
      }
    });

    return sorted;
  }, [students, searchQuery, filterActive, filterInactive, filterRecent, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedStudents.length / studentsPerPage);
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * studentsPerPage;
    return filteredAndSortedStudents.slice(startIndex, startIndex + studentsPerPage);
  }, [filteredAndSortedStudents, currentPage]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status badge class and text
  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { class: 'status-active', text: 'Active' };
      case 'inactive':
        return { class: 'status-inactive', text: 'Inactive' };
      case 'pending':
        return { class: 'status-pending', text: 'Pending' };
      default:
        return { class: 'status-active', text: 'Active' };
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Handle filter toggle
  const handleFilterToggle = (filter) => {
    if (filter === 'active') setFilterActive(!filterActive);
    if (filter === 'inactive') setFilterInactive(!filterInactive);
    if (filter === 'recent') setFilterRecent(!filterRecent);
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (sort) => {
    setSortBy(sort);
    setSortMenuOpen(false);
    setCurrentPage(1);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterActive(true);
    setFilterInactive(false);
    setFilterRecent(false);
    setSortBy('name');
    setCurrentPage(1);
  };

  // Open student details
  const handleOpenDetails = (student) => {
    setSelectedStudent(student);
    setDetailsModalOpen(true);
  };

  // Open delete confirmation
  const handleOpenDelete = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  // Delete student
  const handleDeleteStudent = () => {
    if (studentToDelete) {
      setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
      setDeleteModalOpen(false);
      setStudentToDelete(null);
      setSelectedStudent(null);
      setDetailsModalOpen(false);

      // Save to localStorage
      try {
        const updated = students.filter((s) => s.id !== studentToDelete.id);
        localStorage.setItem('teacherStudentsData', JSON.stringify(updated));
      } catch {
        // ignore
      }

      // Reset to first page if needed
      if (currentPage > Math.ceil((filteredAndSortedStudents.length - 1) / studentsPerPage)) {
        setCurrentPage(1);
      }
    }
  };

  // Navigate to chat
  const handleChat = (student) => {
    navigate(`/teacher/chat/${student.id}`);
  };

  // Change photo (placeholder)
  const handleChangePhoto = () => {
    alert('Photo upload feature would be implemented here');
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown')) {
        setFilterMenuOpen(false);
        setSortMenuOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Close modals on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setDeleteModalOpen(false);
        setDetailsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Save students to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('teacherStudentsData', JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages === 0) return pages;

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pages.push('ellipsis-start');
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="teacher-students flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <TeacherSidebar teacher={teacher} classes={classes} onNewClass={() => navigate('/teacher/dashboard')} />

      <main className="teacher-students-main flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="teacher-students-header">
          <div className="teacher-students-search">
            <span className="material-symbols-outlined teacher-students-search-icon">search</span>
            <input
              type="text"
              className="teacher-students-search-input"
              placeholder="Search students by name or email..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button className="teacher-students-search-clear" onClick={handleClearSearch}>
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>

          <div className="teacher-students-header-actions">
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
        <div className="teacher-students-content">
          {/* Page Header */}
          <div className="teacher-students-page-header">
            <div className="teacher-students-header-content">
              <h1 className="teacher-students-title">Students Members</h1>
              <p className="teacher-students-subtitle">List of students enrolled in this class</p>
              <div className="teacher-students-class-info">
                <span className="teacher-students-class-badge">Class 1</span>
                <span className="teacher-students-count">
                  <span className="material-symbols-outlined">people</span>
                  {filteredAndSortedStudents.length} Students
                </span>
              </div>
            </div>
            <div className="teacher-students-header-actions">
              <button className="teacher-btn teacher-btn-secondary" onClick={() => navigate('/teacher/dashboard')}>
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="teacher-students-controls-section">
            <div className="teacher-students-search-container">
              <span className="material-symbols-outlined teacher-students-search-icon">search</span>
              <input
                type="text"
                className="teacher-students-search-input"
                placeholder="Search students by name or email..."
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery && (
                <button className="teacher-students-search-clear" onClick={handleClearSearch}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>

            <div className="teacher-students-filter-actions">
              <div className={`teacher-students-dropdown ${filterMenuOpen ? 'show' : ''}`}>
                <button
                  className="teacher-students-filter-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilterMenuOpen(!filterMenuOpen);
                    setSortMenuOpen(false);
                  }}
                >
                  <span className="material-symbols-outlined">filter_list</span>
                  Filter
                  <span className="material-symbols-outlined teacher-students-dropdown-icon">expand_more</span>
                </button>
                <div className="teacher-students-dropdown-menu">
                  <div className="teacher-students-filter-option">
                    <input
                      type="checkbox"
                      id="filter-active"
                      checked={filterActive}
                      onChange={() => handleFilterToggle('active')}
                    />
                    <label htmlFor="filter-active">Active Students</label>
                  </div>
                  <div className="teacher-students-filter-option">
                    <input
                      type="checkbox"
                      id="filter-inactive"
                      checked={filterInactive}
                      onChange={() => handleFilterToggle('inactive')}
                    />
                    <label htmlFor="filter-inactive">Inactive Students</label>
                  </div>
                  <div className="teacher-students-filter-divider"></div>
                  <div className="teacher-students-filter-option">
                    <input
                      type="checkbox"
                      id="filter-recent"
                      checked={filterRecent}
                      onChange={() => handleFilterToggle('recent')}
                    />
                    <label htmlFor="filter-recent">Recently Joined</label>
                  </div>
                </div>
              </div>

              <div className={`teacher-students-dropdown ${sortMenuOpen ? 'show' : ''}`}>
                <button
                  className="teacher-students-filter-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortMenuOpen(!sortMenuOpen);
                    setFilterMenuOpen(false);
                  }}
                >
                  <span className="material-symbols-outlined">swap_vert</span>
                  Sort By
                  <span className="material-symbols-outlined teacher-students-dropdown-icon">expand_more</span>
                </button>
                <div className="teacher-students-dropdown-menu">
                  <button
                    className={`teacher-students-sort-option ${sortBy === 'name' ? 'active' : ''}`}
                    onClick={() => handleSort('name')}
                  >
                    Name (A-Z)
                  </button>
                  <button
                    className={`teacher-students-sort-option ${sortBy === 'name-desc' ? 'active' : ''}`}
                    onClick={() => handleSort('name-desc')}
                  >
                    Name (Z-A)
                  </button>
                  <button
                    className={`teacher-students-sort-option ${sortBy === 'recent' ? 'active' : ''}`}
                    onClick={() => handleSort('recent')}
                  >
                    Recently Added
                  </button>
                  <button
                    className={`teacher-students-sort-option ${sortBy === 'active' ? 'active' : ''}`}
                    onClick={() => handleSort('active')}
                  >
                    Most Active
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Students List */}
          <div className="teacher-students-list-container">
            <div className="teacher-students-list-header">
              <div className="teacher-students-header-item teacher-students-name-header">Student</div>
              <div className="teacher-students-header-item teacher-students-email-header">Email</div>
              <div className="teacher-students-header-item teacher-students-status-header">Status</div>
              <div className="teacher-students-header-item teacher-students-join-header">Joined</div>
              <div className="teacher-students-header-item teacher-students-actions-header">Actions</div>
            </div>

            {loading ? (
              <div className="teacher-students-loading-state">
                <div className="teacher-students-spinner"></div>
                <p>Loading students...</p>
              </div>
            ) : filteredAndSortedStudents.length === 0 ? (
              <div className="teacher-students-empty-state">
                <div className="teacher-students-empty-icon">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <h3>No students found</h3>
                <p>Try adjusting your search or filters</p>
                <button className="teacher-btn teacher-btn-secondary" onClick={handleResetFilters}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="teacher-students-list">
                {paginatedStudents.map((student) => {
                  const statusInfo = getStatusInfo(student.status);
                  return (
                    <div
                      key={student.id}
                      className="teacher-students-student-item"
                      onClick={() => handleOpenDetails(student)}
                    >
                      <div className="teacher-students-student-info">
                        <div className={`teacher-students-student-avatar ${student.avatar ? '' : 'default'}`}>
                          {student.avatar ? (
                            <img src={student.avatar} alt={student.name} onError={(e) => {
                              e.target.onerror = null;
                              e.target.parentElement.className = 'teacher-students-student-avatar default';
                              e.target.parentElement.innerHTML = '<span class="material-symbols-outlined">person</span>';
                            }} />
                          ) : (
                            <span className="material-symbols-outlined">person</span>
                          )}
                        </div>
                        <div className="teacher-students-student-details">
                          <div className="teacher-students-student-name">
                            {student.name}
                            {student.online && <span className="teacher-students-online-badge"></span>}
                          </div>
                          <div className="teacher-students-student-email">{student.email}</div>
                        </div>
                      </div>
                      <div className="teacher-students-student-email teacher-students-mobile-only">{student.email}</div>
                      <div className={`teacher-students-status-badge ${statusInfo.class}`}>{statusInfo.text}</div>
                      <div className="teacher-students-join-date">{formatDate(student.joinDate)}</div>
                      <div
                        className="teacher-students-student-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="teacher-students-action-btn teacher-students-chat"
                          title="Send message"
                          onClick={() => handleChat(student)}
                        >
                          <span className="material-symbols-outlined">chat_bubble_outline</span>
                        </button>
                        <button
                          className="teacher-students-action-btn teacher-students-view"
                          title="View details"
                          onClick={() => handleOpenDetails(student)}
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                        <button
                          className="teacher-students-action-btn teacher-students-delete"
                          title="Delete student"
                          onClick={() => handleOpenDelete(student)}
                        >
                          <span className="material-symbols-outlined">delete_outline</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && filteredAndSortedStudents.length > 0 && (
            <div className="teacher-students-pagination">
              <button
                className="teacher-students-pagination-btn teacher-students-prev-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="material-symbols-outlined">chevron_left</span>
                Previous
              </button>

              <div className="teacher-students-page-numbers">
                {getPageNumbers().map((page, index) => {
                  if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                    return (
                      <span key={`ellipsis-${index}`} className="teacher-students-ellipsis">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      className={`teacher-students-page-number ${page === currentPage ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="teacher-students-pagination-btn teacher-students-next-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && studentToDelete && (
        <div className="teacher-students-modal" onClick={() => setDeleteModalOpen(false)}>
          <div className="teacher-students-modal-content teacher-students-delete-modal-new" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-students-delete-modal-content">
              <div className="teacher-students-delete-modal-icon">
                <span className="material-symbols-outlined">priority_high</span>
              </div>
              <h2 className="teacher-students-delete-modal-title">Delete Student?</h2>
              <p className="teacher-students-delete-modal-message">
                Are you sure you want to delete <strong>{studentToDelete.name}</strong>? This action cannot be undone.
              </p>
              <div className="teacher-students-delete-modal-actions">
                <button
                  className="teacher-students-delete-modal-cancel-btn"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="teacher-students-delete-modal-confirm-btn" onClick={handleDeleteStudent}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {detailsModalOpen && selectedStudent && (
        <div className="teacher-students-modal teacher-students-student-details-modal-new" onClick={() => setDetailsModalOpen(false)}>
          <div className="teacher-students-modal-content teacher-students-student-details-content" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-students-modal-header">
              <div>
                <h3 className="teacher-students-modal-title">Student Profile</h3>
                <p className="teacher-students-modal-subtitle">Academic Performance & Course Information</p>
              </div>
              <button className="teacher-students-modal-close" onClick={() => setDetailsModalOpen(false)}>
                &times;
              </button>
            </div>

            <div className="teacher-students-modal-back-btn">
              <button className="teacher-students-back-button" onClick={() => setDetailsModalOpen(false)}>
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
            </div>

            <div className="teacher-students-modal-body">
              {/* Profile Section */}
              <div className="teacher-students-profile-section">
                <div className="teacher-students-profile-picture-container">
                  <div className={`teacher-students-profile-picture ${selectedStudent.avatar ? '' : 'default'}`} id="detail-avatar">
                    {selectedStudent.avatar ? (
                      <img
                        src={selectedStudent.avatar}
                        alt={selectedStudent.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentElement.className = 'teacher-students-profile-picture default';
                          e.target.parentElement.innerHTML = '<span class="material-symbols-outlined">person</span>';
                        }}
                      />
                    ) : (
                      <span className="material-symbols-outlined">person</span>
                    )}
                  </div>
                  <button className="teacher-students-camera-button" onClick={handleChangePhoto}>
                    <span className="material-symbols-outlined">photo_camera</span>
                  </button>
                </div>
                <h4 className="teacher-students-student-name">{selectedStudent.name}</h4>
                <p className="teacher-students-student-email">{selectedStudent.email}</p>
                <p className="teacher-students-student-id">{selectedStudent.studentId}</p>

                {/* Action Buttons */}
                <div className="teacher-students-profile-actions">
                  <button
                    className="teacher-students-profile-action-btn teacher-students-delete-btn"
                    onClick={() => {
                      setDetailsModalOpen(false);
                      setTimeout(() => handleOpenDelete(selectedStudent), 300);
                    }}
                  >
                    <span className="material-symbols-outlined">delete</span>
                    <span>Delete</span>
                  </button>
                  <button
                    className="teacher-students-profile-action-btn teacher-students-message-btn"
                    onClick={() => handleChat(selectedStudent)}
                  >
                    <span className="material-symbols-outlined">chat_bubble_outline</span>
                    <span>Message</span>
                  </button>
                </div>
              </div>

              {/* Assessments Section */}
              <div className="teacher-students-assessments-section">
                <h5 className="teacher-students-section-title">Assessments & Activity Progress</h5>

                <div className="teacher-students-assessments-table">
                  <div className="teacher-students-table-header">
                    <div className="teacher-students-table-cell teacher-students-assessment-name">Assessment Name</div>
                    <div className="teacher-students-table-cell teacher-students-score">Score</div>
                    <div className="teacher-students-table-cell teacher-students-progress">Progress</div>
                  </div>

                  <div className="teacher-students-assessments-list">
                    {selectedStudent.assessments.map((assessment, index) => {
                      let progressClass = 'medium';
                      if (assessment.percentage >= 80) progressClass = 'high';
                      else if (assessment.percentage <= 50) progressClass = 'low';

                      return (
                        <div key={index} className="teacher-students-assessment-item">
                          <div className="teacher-students-assessment-item-name">{assessment.name}</div>
                          <div className="teacher-students-assessment-item-score">{assessment.score}</div>
                          <div className="teacher-students-progress-bar-container">
                            <div className="teacher-students-progress-bar">
                              <div
                                className={`teacher-students-progress-fill ${progressClass}`}
                                style={{ width: `${assessment.percentage}%` }}
                              ></div>
                            </div>
                            <span className="teacher-students-progress-percentage">{assessment.percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
