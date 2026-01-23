import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import './TeacherLibrary.css';

export default function TeacherLibrary() {
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

  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // all | flashcard | quiz | assignment | textbook
  const [subjectFilter, setSubjectFilter] = useState('all'); // all | biology | chemistry | physics | math
  const [sort, setSort] = useState('recent'); // recent | alphabetical | alphabetical-desc | used

  const [subjectMenuOpen, setSubjectMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    type: '',
    subject: ''
  });

  const [resources, setResources] = useState(() => {
    try {
      const raw = localStorage.getItem('teacherLibraryResources');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }

    return [
      {
        id: 1,
        title: 'Cell Biology Flashcards',
        description: 'Key concepts and diagrams for cellular structures and functions. Contains 50 cards.',
        type: 'flashcard',
        subject: 'biology',
        cards: 50,
        lastUpdated: '2024-03-15',
        color: '#3b82f6'
      },
      {
        id: 2,
        title: 'Photosynthesis Quiz',
        description: '20-question MCQ quiz covering light-dependent and independent reactions.',
        type: 'quiz',
        subject: 'biology',
        questions: 20,
        lastUpdated: '2024-03-10',
        color: '#10b981'
      },
      {
        id: 3,
        title: 'Lab Report: Mitosis',
        description: 'Assignment guidelines and rubric for microscope observation of onion root tip cells.',
        type: 'assignment',
        subject: 'biology',
        lastUpdated: '2024-03-05',
        color: '#8b5cf6'
      },
      {
        id: 4,
        title: 'Modern Chemistry Ch. 4',
        description: 'Atomic structure, isotopes, electron configurations. Includes practice problems.',
        type: 'textbook',
        subject: 'chemistry',
        pages: 45,
        lastUpdated: '2024-02-28',
        color: '#f59e0b'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('teacherLibraryResources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest('.teacher-library-dropdown')) {
        setSubjectMenuOpen(false);
        setSortMenuOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCreateOpen(false);
        setSubjectMenuOpen(false);
        setSortMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = resources.filter((r) => {
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;
      if (subjectFilter !== 'all' && r.subject !== subjectFilter) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
      );
    });

    const usageValue = (r) => r.cards || r.questions || r.pages || 0;

    arr = [...arr].sort((a, b) => {
      if (sort === 'recent') return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      if (sort === 'alphabetical') return a.title.localeCompare(b.title);
      if (sort === 'alphabetical-desc') return b.title.localeCompare(a.title);
      if (sort === 'used') return usageValue(b) - usageValue(a);
      return 0;
    });

    return arr;
  }, [query, resources, subjectFilter, sort, typeFilter]);

  const totalResources = filtered.length;
  const totalFlashcards = useMemo(() => {
    return resources.filter((r) => r.type === 'flashcard').reduce((sum, r) => sum + (r.cards || 0), 0);
  }, [resources]);

  const getTypeLabel = (t) => {
    switch (t) {
      case 'flashcard':
        return 'Flashcard Set';
      case 'quiz':
        return 'Quiz';
      case 'assignment':
        return 'Assignment';
      case 'textbook':
        return 'Textbook';
      default:
        return 'Resource';
    }
  };

  const getCountText = (r) => {
    if (r.type === 'flashcard') return `${r.cards || 0} cards`;
    if (r.type === 'quiz') return `${r.questions || 0} questions`;
    if (r.type === 'textbook') return `${r.pages || 0} pages`;
    return '';
  };

  const sortLabel = (s) => {
    switch (s) {
      case 'recent':
        return 'Recently Added';
      case 'alphabetical':
        return 'Alphabetical (A-Z)';
      case 'alphabetical-desc':
        return 'Alphabetical (Z-A)';
      case 'used':
        return 'Most Used';
      default:
        return 'Recently Added';
    }
  };

  const subjectLabel = (s) => {
    if (s === 'all') return 'Filter by Subject';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const openCreate = () => {
    setCreateForm({ title: '', description: '', type: '', subject: '' });
    setCreateOpen(true);
  };

  const closeCreate = () => setCreateOpen(false);

  const getColorForType = (t) => {
    switch (t) {
      case 'flashcard':
        return '#3b82f6';
      case 'quiz':
        return '#10b981';
      case 'assignment':
        return '#8b5cf6';
      case 'textbook':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const onCreateSubmit = (e) => {
    e.preventDefault();
    if (!createForm.title.trim() || !createForm.type) return;

    const newItem = {
      id: resources.length ? Math.max(...resources.map((r) => r.id)) + 1 : 1,
      title: createForm.title.trim(),
      description: createForm.description.trim() || 'New resource',
      type: createForm.type,
      subject: createForm.subject || 'general',
      lastUpdated: new Date().toISOString().split('T')[0],
      color: getColorForType(createForm.type)
    };

    // Attach count fields like the original
    if (newItem.type === 'flashcard') newItem.cards = Math.floor(Math.random() * 50) + 10;
    if (newItem.type === 'quiz') newItem.questions = Math.floor(Math.random() * 30) + 5;
    if (newItem.type === 'textbook') newItem.pages = Math.floor(Math.random() * 100) + 20;

    setResources((prev) => [newItem, ...prev]);
    closeCreate();
  };

  return (
    <div className="teacher-library flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <TeacherSidebar teacher={teacher} classes={classes} onNewClass={() => navigate('/teacher/dashboard')} />

      <main className="teacher-library-main flex-1">
        <header className="teacher-library-header">
          <div className="teacher-library-search">
            <span className="material-icons teacher-library-search-icon">search</span>
            <input
              id="library-search"
              className="teacher-library-search-input"
              placeholder="Search flashcard sets, textbooks, questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query.trim() && (
              <button
                type="button"
                className="teacher-library-search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <span className="material-icons">close</span>
              </button>
            )}
          </div>

          <div className="teacher-header-actions">
            <button type="button" className="teacher-icon-btn" onClick={() => navigate('/teacher/notifications')}>
              <span className="material-icons">notifications</span>
              {unreadCount > 0 && <span className="teacher-badge">{unreadCount}</span>}
            </button>

            <button type="button" className="teacher-icon-btn" onClick={() => navigate('/teacher/students')}>
              <span className="material-icons">chat_bubble</span>
              <span className="teacher-badge teacher-badge-muted">1</span>
            </button>

            <div className="teacher-avatar" title={teacher.name}>
              {teacher.name?.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="teacher-library-content">
          <div className="teacher-library-page-header">
            <div className="teacher-library-header-content">
              <h1 className="teacher-library-title">Your Library</h1>
              <p className="teacher-library-subtitle">Manage and organize your teaching resources</p>
              <div className="teacher-library-stats">
                <div className="teacher-library-stat">
                  <span className="teacher-library-stat-value">{totalResources}</span>
                  <span className="teacher-library-stat-label">Resources</span>
                </div>
                <div className="teacher-library-stat">
                  <span className="teacher-library-stat-value">{totalFlashcards}</span>
                  <span className="teacher-library-stat-label">Flashcards</span>
                </div>
              </div>
            </div>

            <div className="teacher-library-header-actions">
              <button type="button" className="teacher-btn teacher-btn-primary" onClick={openCreate}>
                <span className="material-icons">add</span>
                Create New Resource
              </button>
            </div>
          </div>

          <div className="teacher-library-filter-section">
            <div className="teacher-library-filter-tabs">
              {[
                { key: 'all', label: 'All' },
                { key: 'flashcard', label: 'Flashcards' },
                { key: 'quiz', label: 'Quizzes' },
                { key: 'assignment', label: 'Assignments' },
                { key: 'textbook', label: 'Textbooks' }
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={`teacher-library-filter-tab ${typeFilter === t.key ? 'active' : ''}`}
                  onClick={() => setTypeFilter(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="teacher-library-filter-controls">
              <div className={`teacher-library-dropdown ${subjectMenuOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="teacher-library-filter-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSubjectMenuOpen((v) => !v);
                    setSortMenuOpen(false);
                  }}
                >
                  <span className="material-icons">filter_list</span>
                  {subjectLabel(subjectFilter)}
                  <span className="material-icons teacher-library-dropdown-icon">expand_more</span>
                </button>
                {subjectMenuOpen && (
                  <div className="teacher-library-dropdown-menu">
                    {[
                      { key: 'all', label: 'All Subjects' },
                      { key: 'biology', label: 'Biology' },
                      { key: 'chemistry', label: 'Chemistry' },
                      { key: 'physics', label: 'Physics' },
                      { key: 'math', label: 'Mathematics' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        className={`teacher-library-filter-option ${
                          subjectFilter === opt.key ? 'active' : ''
                        }`}
                        onClick={() => {
                          setSubjectFilter(opt.key);
                          setSubjectMenuOpen(false);
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={`teacher-library-dropdown ${sortMenuOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="teacher-library-filter-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortMenuOpen((v) => !v);
                    setSubjectMenuOpen(false);
                  }}
                >
                  <span className="material-icons">sort</span>
                  {sortLabel(sort)}
                  <span className="material-icons teacher-library-dropdown-icon">expand_more</span>
                </button>
                {sortMenuOpen && (
                  <div className="teacher-library-dropdown-menu">
                    {[
                      { key: 'recent', label: 'Recently Added' },
                      { key: 'alphabetical', label: 'Alphabetical (A-Z)' },
                      { key: 'alphabetical-desc', label: 'Alphabetical (Z-A)' },
                      { key: 'used', label: 'Most Used' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        className={`teacher-library-filter-option ${sort === opt.key ? 'active' : ''}`}
                        onClick={() => {
                          setSort(opt.key);
                          setSortMenuOpen(false);
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="teacher-library-empty">
              <div className="teacher-library-empty-icon">
                <span className="material-icons">library_books</span>
              </div>
              <h3>No resources found</h3>
              <p>Try adjusting your search or filters</p>
              <button
                type="button"
                className="teacher-btn"
                onClick={() => {
                  setQuery('');
                  setTypeFilter('all');
                  setSubjectFilter('all');
                  setSort('recent');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="teacher-library-grid">
              {filtered.map((r) => (
                <div key={r.id} className="teacher-library-card" style={{ ['--accent']: r.color }}>
                  <div className="teacher-library-card-header">
                    <div>
                      <h3 className="teacher-library-card-title">{r.title}</h3>
                      <span className={`teacher-library-type-badge ${r.type}`}>{getTypeLabel(r.type)}</span>
                      <p className="teacher-library-subject-tag">
                        {r.subject.charAt(0).toUpperCase() + r.subject.slice(1)}
                      </p>
                    </div>
                    <div className="teacher-library-card-actions">
                      <button type="button" className="teacher-library-icon-action" title="More options">
                        <span className="material-icons">more_horiz</span>
                      </button>
                      <button type="button" className="teacher-library-icon-action" title="Favorite">
                        <span className="material-icons">favorite_border</span>
                      </button>
                    </div>
                  </div>

                  <p className="teacher-library-card-desc">{r.description}</p>

                  <div className="teacher-library-card-footer">
                    <span className="teacher-library-meta">
                      <span className="material-icons" style={{ fontSize: 14, verticalAlign: 'middle' }}>
                        schedule
                      </span>{' '}
                      {r.lastUpdated} • {getCountText(r)}
                    </span>
                    <div className="teacher-library-footer-actions">
                      <button type="button" className="teacher-library-footer-btn">
                        <span className="material-icons" style={{ fontSize: 14 }}>
                          edit
                        </span>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="teacher-library-footer-btn primary"
                        onClick={() => navigate('/teacher/assign-activity')}
                      >
                        <span className="material-icons" style={{ fontSize: 14 }}>
                          assignment_add
                        </span>
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Resource Modal */}
        {createOpen && (
          <div className="teacher-modal" onMouseDown={closeCreate} role="presentation">
            <div
              className="teacher-modal-content"
              onMouseDown={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="teacher-modal-header">
                <h3>Create New Resource</h3>
                <button type="button" className="teacher-modal-close" onClick={closeCreate} aria-label="Close">
                  <span className="material-icons">close</span>
                </button>
              </div>

              <form className="teacher-modal-body" onSubmit={onCreateSubmit}>
                <label className="teacher-field">
                  <span>Resource Title</span>
                  <input
                    value={createForm.title}
                    onChange={(e) => setCreateForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Enter resource title"
                    required
                  />
                </label>

                <label className="teacher-field">
                  <span>Description</span>
                  <textarea
                    rows={3}
                    value={createForm.description}
                    onChange={(e) => setCreateForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Enter resource description"
                  />
                </label>

                <label className="teacher-field">
                  <span>Resource Type</span>
                  <select
                    value={createForm.type}
                    onChange={(e) => setCreateForm((p) => ({ ...p, type: e.target.value }))}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="flashcard">Flashcard Set</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                    <option value="textbook">Textbook</option>
                  </select>
                </label>

                <label className="teacher-field">
                  <span>Subject</span>
                  <select
                    value={createForm.subject}
                    onChange={(e) => setCreateForm((p) => ({ ...p, subject: e.target.value }))}
                  >
                    <option value="">Select subject</option>
                    <option value="biology">Biology</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="physics">Physics</option>
                    <option value="math">Mathematics</option>
                  </select>
                </label>

                <div className="teacher-modal-footer">
                  <button type="button" className="teacher-btn" onClick={closeCreate}>
                    Cancel
                  </button>
                  <button type="submit" className="teacher-btn teacher-btn-primary">
                    Create Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

