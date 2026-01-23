import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import './TeacherClass.css';

export default function TeacherClass() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const currentClass = useMemo(() => {
    const classId = id ? parseInt(id) : null;
    if (!classId) return null;
    return classes.find((c) => c.id === classId) || classes[0] || null;
  }, [classes, id]);

  const [activeTab, setActiveTab] = useState('materials');
  const [showInviteBanner, setShowInviteBanner] = useState(true);

  const [materials, setMaterials] = useState(() => {
    try {
      const raw = localStorage.getItem('teacherMaterialsData');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [
      {
        id: 1,
        title: 'Introduction to Chemistry',
        type: 'document',
        description: '<p><strong>Basic concepts</strong> of chemistry and <em>chemical reactions</em>.</p>',
        date: '2025-01-15',
        views: 124
      },
      {
        id: 2,
        title: 'Organic Chemistry Presentation',
        type: 'presentation',
        description: '<p>Comprehensive slides about organic compounds.</p>',
        date: '2025-01-20',
        views: 89
      }
    ];
  });

  const [exams, setExams] = useState(() => {
    try {
      const raw = localStorage.getItem('teacherExamsData');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [
      {
        id: 1,
        title: 'Midterm Exam',
        type: 'midterm',
        date: '2025-02-15',
        duration: 120,
        totalMarks: 100,
        description: 'Covers chapters 1-5',
        submissions: 28,
        averageScore: 78,
        highestScore: 95,
        lowestScore: 45
      }
    ];
  });

  const [modals, setModals] = useState({
    invite: false,
    addMaterial: false,
    classSettings: false,
    deleteClass: false,
    createExam: false,
    editExam: false,
    deleteExam: false,
    viewSubmissions: false,
    analytics: false,
    shareMaterial: false,
    downloadMaterial: false
  });

  const [examWizardStep, setExamWizardStep] = useState(1);
  const [examQuestions, setExamQuestions] = useState([]);
  const [examForm, setExamForm] = useState({
    title: '',
    type: '',
    date: '',
    duration: '',
    description: '',
    totalMarks: ''
  });

  const [materialForm, setMaterialForm] = useState({
    title: '',
    type: '',
    description: '',
    file: null
  });

  const [inviteMethod, setInviteMethod] = useState('link');
  const [inviteEmails, setInviteEmails] = useState('');

  useEffect(() => {
    if (!currentClass) {
      navigate('/teacher/dashboard');
    }
  }, [currentClass, navigate]);

  useEffect(() => {
    localStorage.setItem('teacherMaterialsData', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('teacherExamsData', JSON.stringify(exams));
  }, [exams]);

  const openModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeAllModals = () => {
    setModals({
      invite: false,
      addMaterial: false,
      classSettings: false,
      deleteClass: false,
      createExam: false,
      editExam: false,
      deleteExam: false,
      viewSubmissions: false,
      analytics: false,
      shareMaterial: false,
      downloadMaterial: false
    });
    setExamWizardStep(1);
    setExamQuestions([]);
    setExamForm({ title: '', type: '', date: '', duration: '', description: '', totalMarks: '' });
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeAllModals();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const getMaterialIcon = (type) => {
    const icons = {
      document: 'description',
      presentation: 'slideshow',
      video: 'videocam',
      link: 'link',
      assignment: 'assignment'
    };
    return icons[type] || 'description';
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!materialForm.title || !materialForm.type) return;

    const newMaterial = {
      id: materials.length ? Math.max(...materials.map((m) => m.id)) + 1 : 1,
      title: materialForm.title,
      type: materialForm.type,
      description: materialForm.description || '<p>No description provided.</p>',
      date: new Date().toISOString().split('T')[0],
      views: 0
    };

    setMaterials((prev) => [newMaterial, ...prev]);
    setMaterialForm({ title: '', type: '', description: '', file: null });
    closeAllModals();
  };

  const handleCreateExam = () => {
    if (!examForm.title || !examForm.type || !examForm.date || !examForm.duration || !examForm.totalMarks) {
      return;
    }

    const totalMarks = examQuestions.length > 0
      ? examQuestions.reduce((sum, q) => sum + (q.marks || 0), 0)
      : parseInt(examForm.totalMarks);

    const newExam = {
      id: exams.length ? Math.max(...exams.map((e) => e.id)) + 1 : 1,
      title: examForm.title,
      type: examForm.type,
      date: examForm.date,
      duration: parseInt(examForm.duration),
      totalMarks,
      description: examForm.description,
      questions: examQuestions,
      submissions: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0
    };

    setExams((prev) => [newExam, ...prev]);
    if (currentClass) {
      const updatedClasses = classes.map((c) =>
        c.id === currentClass.id ? { ...c, exams: (c.exams || 0) + 1 } : c
      );
      localStorage.setItem('teacherClassesData', JSON.stringify(updatedClasses));
    }
    closeAllModals();
  };

  const handleDeleteExam = (examId) => {
    setExams((prev) => prev.filter((e) => e.id !== examId));
    if (currentClass) {
      const updatedClasses = classes.map((c) =>
        c.id === currentClass.id ? { ...c, exams: Math.max(0, (c.exams || 0) - 1) } : c
      );
      localStorage.setItem('teacherClassesData', JSON.stringify(updatedClasses));
    }
    closeAllModals();
  };

  const handleDeleteClass = () => {
    if (!currentClass) return;
    const updatedClasses = classes.filter((c) => c.id !== currentClass.id);
    localStorage.setItem('teacherClassesData', JSON.stringify(updatedClasses));
    navigate('/teacher/dashboard');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could show a toast notification here
    });
  };

  if (!currentClass) {
    return (
      <div className="teacher-class-loading">
        <p>Loading class...</p>
      </div>
    );
  }

  return (
    <div className="teacher-class-dashboard flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <TeacherSidebar teacher={teacher} classes={classes} onNewClass={() => navigate('/teacher/dashboard')} />

      <main className="teacher-class-main flex-1 flex flex-col overflow-hidden">
        <header className="teacher-class-header">
          <div className="teacher-class-header-left">
            <button
              type="button"
              className="teacher-class-back-btn"
              onClick={() => navigate('/teacher/dashboard')}
            >
              <span className="material-icons">arrow_back</span>
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="teacher-class-header-actions">
            <button
              type="button"
              className="teacher-icon-btn"
              onClick={() => navigate('/teacher/notifications')}
            >
              <span className="material-icons">notifications</span>
              {unreadCount > 0 && <span className="teacher-badge">{unreadCount}</span>}
            </button>

            <button
              type="button"
              className="teacher-icon-btn"
              onClick={() => navigate('/teacher/students')}
            >
              <span className="material-icons">chat_bubble</span>
              <span className="teacher-badge teacher-badge-muted">1</span>
            </button>

            <div className="teacher-avatar" title={teacher.name}>
              {teacher.name?.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>

        <div
          className="teacher-class-banner"
          style={{
            background: `linear-gradient(135deg, ${currentClass.color} 0%, ${darkenColor(currentClass.color, 20)} 100%)`
          }}
        >
          <div className="teacher-class-banner-content">
            <h1 className="teacher-class-title">{currentClass.name}</h1>
            <div className="teacher-class-info">
              <span className="teacher-class-description">{currentClass.description}</span>
              <div className="teacher-class-location">
                <span className="material-icons">location_on</span>
                <span>{currentClass.location}</span>
              </div>
            </div>
          </div>
          <div className="teacher-class-banner-actions">
            <button
              type="button"
              className="teacher-btn teacher-btn-primary"
              onClick={() => openModal('invite')}
            >
              <span className="material-icons">person_add</span>
              Invite Students
            </button>
            <button
              type="button"
              className="teacher-btn"
              onClick={() => openModal('classSettings')}
            >
              <span className="material-icons">settings</span>
              Settings
            </button>
          </div>
        </div>

        <div className="teacher-class-nav-tabs">
          <nav className="teacher-class-tabs-container">
            <button
              type="button"
              className={`teacher-class-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
              onClick={() => setActiveTab('materials')}
            >
              <span className="material-icons">library_books</span>
              Materials
            </button>
            <button
              type="button"
              className={`teacher-class-tab-btn ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              <span className="material-icons">groups</span>
              Members
            </button>
            <button
              type="button"
              className={`teacher-class-tab-btn ${activeTab === 'exams' ? 'active' : ''}`}
              onClick={() => setActiveTab('exams')}
            >
              <span className="material-icons">quiz</span>
              Exams
              {currentClass.exams > 0 && (
                <span className="teacher-class-badge-count">{currentClass.exams}</span>
              )}
            </button>
          </nav>
        </div>

        <div className="teacher-class-content flex-1 overflow-y-auto">
          {activeTab === 'materials' && (
            <div className="teacher-class-tab-content">
              <div className="teacher-class-tab-header">
                <h2>Class Materials</h2>
                <button
                  type="button"
                  className="teacher-btn teacher-btn-primary"
                  onClick={() => openModal('addMaterial')}
                >
                  <span className="material-icons">add</span>
                  Add Material
                </button>
              </div>

              {showInviteBanner && (
                <div className="teacher-class-invite-banner">
                  <div className="teacher-class-banner-text">
                    <h3>Invite students to join this class</h3>
                    <p>Students get free access to activities and materials you add to your class.</p>
                  </div>
                  <button
                    type="button"
                    className="teacher-class-close-banner-btn"
                    onClick={() => setShowInviteBanner(false)}
                  >
                    <span className="material-icons">close</span>
                  </button>
                </div>
              )}

              <div className="teacher-class-invite-buttons-grid">
                <button
                  type="button"
                  className="teacher-class-invite-btn teacher-class-google-invite"
                  onClick={() => {
                    openModal('invite');
                    setInviteMethod('link');
                  }}
                >
                  <svg className="teacher-class-google-icon" viewBox="0 0 24 24">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                  Invite with Google
                </button>
                <button
                  type="button"
                  className="teacher-class-invite-btn teacher-class-email-invite"
                  onClick={() => {
                    openModal('invite');
                    setInviteMethod('email');
                  }}
                >
                  <span className="material-icons">mail</span>
                  Invite by Email
                </button>
                <button
                  type="button"
                  className="teacher-class-invite-btn teacher-class-copy-link-btn"
                  onClick={() => copyToClipboard('https://eureka.edu/class/join/abc123')}
                >
                  <span className="material-icons">content_copy</span>
                  Copy Link
                </button>
              </div>

              <div className="teacher-class-recent-section">
                <p className="teacher-class-section-label">A few minutes ago</p>
                <button
                  type="button"
                  className="teacher-class-action-card"
                  onClick={() => openModal('addMaterial')}
                >
                  <div className="teacher-class-action-icon">
                    <span className="material-icons">library_add</span>
                  </div>
                  <span className="teacher-class-action-text">Add Material</span>
                </button>
              </div>

              <div className="teacher-class-materials-list">
                {materials.map((material) => (
                  <div key={material.id} className="teacher-class-material-card">
                    <div className="teacher-class-material-header">
                      <div>
                        <h3 className="teacher-class-material-title">{material.title}</h3>
                        <span className="teacher-class-material-type">
                          <span className="material-icons">{getMaterialIcon(material.type)}</span>
                          {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                        </span>
                      </div>
                      <div className="teacher-class-material-actions">
                        <button
                          type="button"
                          className="teacher-class-material-action-btn"
                          onClick={() => {
                            openModal('downloadMaterial');
                          }}
                          title="Download"
                        >
                          <span className="material-icons">download</span>
                        </button>
                        <button
                          type="button"
                          className="teacher-class-material-action-btn"
                          onClick={() => {
                            openModal('shareMaterial');
                          }}
                          title="Share"
                        >
                          <span className="material-icons">share</span>
                        </button>
                      </div>
                    </div>
                    <div
                      className="teacher-class-material-description"
                      dangerouslySetInnerHTML={{ __html: material.description }}
                    />
                    <div className="teacher-class-material-footer">
                      <span className="teacher-class-material-date">
                        <span className="material-icons" style={{ fontSize: '14px' }}>
                          calendar_month
                        </span>
                        {new Date(material.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="teacher-class-material-views">
                        <span className="material-icons" style={{ fontSize: '14px' }}>
                          visibility
                        </span>
                        {material.views} views
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="teacher-class-tab-content">
              <div className="teacher-class-tab-header">
                <h2>Class Members</h2>
                <button
                  type="button"
                  className="teacher-btn teacher-btn-primary"
                  onClick={() => navigate('/teacher/students')}
                >
                  <span className="material-icons">groups</span>
                  Show Students
                </button>
              </div>

              <div className="teacher-class-recent-section">
                <p className="teacher-class-section-label">A few minutes ago</p>
                <button
                  type="button"
                  className="teacher-class-action-card"
                  onClick={() => navigate('/teacher/students')}
                >
                  <div className="teacher-class-action-icon">
                    <span className="material-icons">groups</span>
                  </div>
                  <span className="teacher-class-action-text">Show Students</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="teacher-class-tab-content">
              <div className="teacher-class-tab-header">
                <h2>Exams & Assignments</h2>
                <button
                  type="button"
                  className="teacher-btn teacher-btn-primary"
                  onClick={() => {
                    setExamWizardStep(1);
                    openModal('createExam');
                  }}
                >
                  <span className="material-icons">quiz</span>
                  Create Exam
                </button>
              </div>

              <div className="teacher-class-recent-section">
                <p className="teacher-class-section-label">A few minutes ago</p>
                <button
                  type="button"
                  className="teacher-class-action-card"
                  onClick={() => {
                    setExamWizardStep(1);
                    openModal('createExam');
                  }}
                >
                  <div className="teacher-class-action-icon">
                    <span className="material-icons">quiz</span>
                  </div>
                  <span className="teacher-class-action-text">Create Exam</span>
                </button>
              </div>

              <div className="teacher-class-exams-list">
                {exams.map((exam) => (
                  <div key={exam.id} className="teacher-class-exam-card">
                    <div className="teacher-class-exam-header">
                      <div>
                        <h3 className="teacher-class-exam-title">{exam.title}</h3>
                        <span className="teacher-class-exam-type">
                          {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                        </span>
                      </div>
                      <div className="teacher-class-material-actions">
                        <button
                          type="button"
                          className="teacher-class-material-action-btn"
                          onClick={() => {
                            setExamForm({
                              title: exam.title,
                              type: exam.type,
                              date: exam.date,
                              duration: exam.duration.toString(),
                              description: exam.description,
                              totalMarks: exam.totalMarks.toString()
                            });
                            openModal('editExam');
                          }}
                          title="Edit"
                        >
                          <span className="material-icons">edit</span>
                        </button>
                        <button
                          type="button"
                          className="teacher-class-material-action-btn"
                          onClick={() => {
                            openModal('deleteExam');
                            // Store exam ID for deletion
                          }}
                          title="Delete"
                        >
                          <span className="material-icons">delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="teacher-class-exam-details">
                      <div className="teacher-class-exam-detail">
                        <span className="material-icons">calendar_month</span>
                        <span>{new Date(exam.date).toLocaleDateString()}</span>
                      </div>
                      <div className="teacher-class-exam-detail">
                        <span className="material-icons">schedule</span>
                        <span>{exam.duration} min</span>
                      </div>
                      <div className="teacher-class-exam-detail">
                        <span className="material-icons">grade</span>
                        <span>{exam.totalMarks} marks</span>
                      </div>
                      <div className="teacher-class-exam-detail">
                        <span className="material-icons">group</span>
                        <span>{exam.submissions} submissions</span>
                      </div>
                    </div>
                    <div className="teacher-class-exam-actions">
                      <button
                        type="button"
                        className="teacher-btn"
                        onClick={() => {
                          openModal('viewSubmissions');
                        }}
                      >
                        <span className="material-icons" style={{ fontSize: '16px' }}>
                          visibility
                        </span>
                        View Submissions
                      </button>
                      <button
                        type="button"
                        className="teacher-btn teacher-btn-primary"
                        onClick={() => {
                          openModal('analytics');
                        }}
                      >
                        <span className="material-icons" style={{ fontSize: '16px' }}>
                          analytics
                        </span>
                        Analytics
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <footer className="teacher-class-footer">
            <p>© 2026 Eureka Instructor Panel – All rights reserved.</p>
          </footer>
        </div>
      </main>

      {/* Invite Students Modal */}
      {modals.invite && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Invite Students to Class</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="teacher-modal-body">
              <div className="teacher-class-invite-options">
                <div
                  className={`teacher-class-invite-option ${inviteMethod === 'link' ? 'active' : ''}`}
                  onClick={() => setInviteMethod('link')}
                >
                  <div className="teacher-class-option-header">
                    <span className="material-icons">link</span>
                    <h4>Share Link</h4>
                  </div>
                  <div className="teacher-class-invite-link-container">
                    <input
                      type="text"
                      readOnly
                      value="https://eureka.edu/class/join/abc123"
                      className="teacher-class-invite-link-input"
                    />
                    <button
                      type="button"
                      className="teacher-class-copy-link-btn-small"
                      onClick={() => copyToClipboard('https://eureka.edu/class/join/abc123')}
                    >
                      <span className="material-icons">content_copy</span>
                      Copy
                    </button>
                  </div>
                  <p className="teacher-class-option-description">Share this link with your students</p>
                </div>

                <div
                  className={`teacher-class-invite-option ${inviteMethod === 'email' ? 'active' : ''}`}
                  onClick={() => setInviteMethod('email')}
                >
                  <div className="teacher-class-option-header">
                    <span className="material-icons">mail</span>
                    <h4>Email Invites</h4>
                  </div>
                  <textarea
                    className="teacher-class-student-emails"
                    placeholder="Enter student emails (comma separated)"
                    value={inviteEmails}
                    onChange={(e) => setInviteEmails(e.target.value)}
                  />
                  <p className="teacher-class-option-description">Send direct email invitations</p>
                </div>

                <div
                  className={`teacher-class-invite-option ${inviteMethod === 'code' ? 'active' : ''}`}
                  onClick={() => setInviteMethod('code')}
                >
                  <div className="teacher-class-option-header">
                    <span className="material-icons">lock</span>
                    <h4>Class Code</h4>
                  </div>
                  <div className="teacher-class-code-container">
                    <div className="teacher-class-code">7A9B2C</div>
                    <button
                      type="button"
                      className="teacher-class-copy-code-btn"
                      onClick={() => copyToClipboard('7A9B2C')}
                    >
                      <span className="material-icons">content_copy</span>
                      Copy Code
                    </button>
                  </div>
                  <p className="teacher-class-option-description">Students can enter this code to join</p>
                </div>
              </div>
            </div>
            <div className="teacher-modal-footer">
              <button type="button" className="teacher-btn" onClick={closeAllModals}>
                Cancel
              </button>
              <button
                type="button"
                className="teacher-btn teacher-btn-primary"
                onClick={() => {
                  if (inviteMethod === 'email' && !inviteEmails.trim()) {
                    return;
                  }
                  closeAllModals();
                  setInviteEmails('');
                }}
              >
                Send Invitations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Material Modal */}
      {modals.addMaterial && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Add New Material</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form className="teacher-modal-body" onSubmit={handleAddMaterial}>
              <label className="teacher-field">
                <span>Material Title</span>
                <input
                  value={materialForm.title}
                  onChange={(e) => setMaterialForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Enter material title"
                  required
                />
              </label>

              <label className="teacher-field">
                <span>Type</span>
                <select
                  value={materialForm.type}
                  onChange={(e) => setMaterialForm((p) => ({ ...p, type: e.target.value }))}
                  required
                >
                  <option value="">Select type</option>
                  <option value="document">Document</option>
                  <option value="presentation">Presentation</option>
                  <option value="video">Video</option>
                  <option value="link">Link</option>
                  <option value="assignment">Assignment</option>
                </select>
              </label>

              <label className="teacher-field">
                <span>Description</span>
                <textarea
                  rows={3}
                  value={materialForm.description}
                  onChange={(e) => setMaterialForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Enter material description"
                />
              </label>

              <label className="teacher-field">
                <span>Upload File (Optional)</span>
                <div className="teacher-class-file-upload">
                  <input
                    type="file"
                    id="material-file"
                    onChange={(e) =>
                      setMaterialForm((p) => ({ ...p, file: e.target.files[0] || null }))
                    }
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="material-file" className="teacher-class-file-upload-label">
                    <span className="material-icons">upload</span>
                    Choose File
                  </label>
                  <span className="teacher-class-file-name">
                    {materialForm.file?.name || 'No file chosen'}
                  </span>
                </div>
              </label>

              <div className="teacher-modal-footer">
                <button type="button" className="teacher-btn" onClick={closeAllModals}>
                  Cancel
                </button>
                <button type="submit" className="teacher-btn teacher-btn-primary">
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Class Settings Modal */}
      {modals.classSettings && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Class Settings</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form
              className="teacher-modal-body"
              onSubmit={(e) => {
                e.preventDefault();
                // Update class logic here
                closeAllModals();
              }}
            >
              <label className="teacher-field">
                <span>Class Name</span>
                <input defaultValue={currentClass.name} required />
              </label>

              <label className="teacher-field">
                <span>Description</span>
                <textarea rows={3} defaultValue={currentClass.description} />
              </label>

              <div className="teacher-field">
                <span>Class Color</span>
                <div className="teacher-color-row">
                  {[
                    { label: 'Green', value: '#22c55e' },
                    { label: 'Blue', value: '#3b82f6' },
                    { label: 'Purple', value: '#8b5cf6' },
                    { label: 'Orange', value: '#f97316' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`teacher-color-swatch ${currentClass.color === opt.value ? 'active' : ''}`}
                      style={{ background: opt.value }}
                      title={opt.label}
                    />
                  ))}
                </div>
              </div>

              <div className="teacher-modal-footer">
                <button
                  type="button"
                  className="teacher-btn teacher-btn-danger"
                  onClick={() => {
                    closeAllModals();
                    openModal('deleteClass');
                  }}
                >
                  Delete Class
                </button>
                <button type="button" className="teacher-btn" onClick={closeAllModals}>
                  Cancel
                </button>
                <button type="submit" className="teacher-btn teacher-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Class Modal */}
      {modals.deleteClass && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content teacher-modal-danger"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Delete Class</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="teacher-modal-body">
              <div className="teacher-class-delete-icon">
                <span className="material-icons">warning</span>
              </div>
              <p className="teacher-danger-text">
                Are you sure you want to delete <strong>{currentClass.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="teacher-modal-footer">
                <button type="button" className="teacher-btn" onClick={closeAllModals}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="teacher-btn teacher-btn-danger"
                  onClick={handleDeleteClass}
                >
                  Delete Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Exam Modal - Simplified for now */}
      {modals.createExam && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content"
            style={{ maxWidth: '700px' }}
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Create New Exam</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <form
              className="teacher-modal-body"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateExam();
              }}
            >
              <label className="teacher-field">
                <span>Exam Title</span>
                <input
                  value={examForm.title}
                  onChange={(e) => setExamForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Enter exam title"
                  required
                />
              </label>

              <label className="teacher-field">
                <span>Exam Type</span>
                <select
                  value={examForm.type}
                  onChange={(e) => setExamForm((p) => ({ ...p, type: e.target.value }))}
                  required
                >
                  <option value="">Select type</option>
                  <option value="quiz">Quiz</option>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final Exam</option>
                  <option value="assignment">Assignment</option>
                </select>
              </label>

              <div className="teacher-class-form-row">
                <label className="teacher-field">
                  <span>Date</span>
                  <input
                    type="date"
                    value={examForm.date}
                    onChange={(e) => setExamForm((p) => ({ ...p, date: e.target.value }))}
                    required
                  />
                </label>
                <label className="teacher-field">
                  <span>Duration (minutes)</span>
                  <input
                    type="number"
                    value={examForm.duration}
                    onChange={(e) => setExamForm((p) => ({ ...p, duration: e.target.value }))}
                    placeholder="60"
                    min="1"
                    required
                  />
                </label>
              </div>

              <label className="teacher-field">
                <span>Description</span>
                <textarea
                  rows={3}
                  value={examForm.description}
                  onChange={(e) => setExamForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Enter exam description"
                />
              </label>

              <label className="teacher-field">
                <span>Total Marks</span>
                <input
                  type="number"
                  value={examForm.totalMarks}
                  onChange={(e) => setExamForm((p) => ({ ...p, totalMarks: e.target.value }))}
                  placeholder="100"
                  min="1"
                  required
                />
              </label>

              <div className="teacher-modal-footer">
                <button type="button" className="teacher-btn" onClick={closeAllModals}>
                  Cancel
                </button>
                <button type="submit" className="teacher-btn teacher-btn-primary">
                  Create Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Exam Modal */}
      {modals.deleteExam && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content teacher-modal-danger"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Delete Exam</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="teacher-modal-body">
              <div className="teacher-class-delete-icon">
                <span className="material-icons">warning</span>
              </div>
              <p className="teacher-danger-text">
                Are you sure you want to delete this exam? This action cannot be undone.
              </p>
              <div className="teacher-modal-footer">
                <button type="button" className="teacher-btn" onClick={closeAllModals}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="teacher-btn teacher-btn-danger"
                  onClick={() => {
                    // Delete exam logic
                    closeAllModals();
                  }}
                >
                  Delete Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Submissions Modal */}
      {modals.viewSubmissions && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Exam Submissions</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="teacher-modal-body">
              <div className="teacher-class-submissions-list">
                <p>Submissions will be displayed here.</p>
              </div>
            </div>
            <div className="teacher-modal-footer">
              <button type="button" className="teacher-btn" onClick={closeAllModals}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {modals.analytics && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Exam Analytics</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="teacher-modal-body">
              <div className="teacher-class-analytics-content">
                <div className="teacher-class-analytics-stats">
                  <div className="teacher-class-stat-item">
                    <h4>Total Submissions</h4>
                    <p>0</p>
                  </div>
                  <div className="teacher-class-stat-item">
                    <h4>Average Score</h4>
                    <p>0%</p>
                  </div>
                  <div className="teacher-class-stat-item">
                    <h4>Highest Score</h4>
                    <p>0%</p>
                  </div>
                  <div className="teacher-class-stat-item">
                    <h4>Lowest Score</h4>
                    <p>0%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="teacher-modal-footer">
              <button type="button" className="teacher-btn" onClick={closeAllModals}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Material Modal */}
      {modals.shareMaterial && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Share Material</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="teacher-modal-body">
              <div className="teacher-class-share-options">
                <div className="teacher-class-share-option">
                  <div className="teacher-class-share-link-container">
                    <input
                      type="text"
                      readOnly
                      value="https://eureka.edu/material/xyz789"
                      className="teacher-class-share-link-input"
                    />
                    <button
                      type="button"
                      className="teacher-class-copy-link-btn-small"
                      onClick={() => copyToClipboard('https://eureka.edu/material/xyz789')}
                    >
                      <span className="material-icons">content_copy</span>
                      Copy Link
                    </button>
                  </div>
                  <p className="teacher-class-option-description">Share this link with students</p>
                </div>
              </div>
            </div>
            <div className="teacher-modal-footer">
              <button type="button" className="teacher-btn" onClick={closeAllModals}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Material Modal */}
      {modals.downloadMaterial && (
        <div className="teacher-modal" onMouseDown={closeAllModals} role="presentation">
          <div
            className="teacher-modal-content"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="teacher-modal-header">
              <h3>Download Material</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAllModals} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="teacher-modal-body">
              <div className="teacher-class-download-options">
                <div className="teacher-class-download-option">
                  <div className="teacher-class-option-header">
                    <span className="material-icons">download</span>
                    <h4>Download Options</h4>
                  </div>
                  <label className="teacher-field">
                    <span>Format</span>
                    <select>
                      <option value="pdf">PDF</option>
                      <option value="docx">Word Document</option>
                      <option value="txt">Plain Text</option>
                      <option value="html">HTML</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <div className="teacher-modal-footer">
              <button type="button" className="teacher-btn" onClick={closeAllModals}>
                Cancel
              </button>
              <button type="button" className="teacher-btn teacher-btn-primary">
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}
