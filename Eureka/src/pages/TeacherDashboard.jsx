import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import './TeacherDashboard.css';

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const [teacher] = useState({ name: 'Ahmed Emad', role: 'Teacher' });
  const [unreadCount] = useState(3);

  const [classes, setClasses] = useState(() => {
    try {
      const raw = localStorage.getItem('teacherClassesData');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }

    return [
      {
        id: 1,
        name: 'Class 1',
        description: 'Material for Substance',
        location: "Mansura's College - Mansura, Dept.",
        sets: 2,
        members: 15,
        exams: 3,
        color: '#22c55e'
      },
      {
        id: 2,
        name: 'Class 2',
        description: 'Students Groups',
        location: "Mansura's College - Mansura, Dept.",
        sets: 2,
        members: 22,
        exams: 5,
        color: '#3b82f6'
      },
      {
        id: 3,
        name: 'Class 3',
        description: 'Material for Substance',
        location: "Mansura's College - Mansura, Dept.",
        sets: 2,
        members: 18,
        exams: 2,
        color: '#8b5cf6'
      },
      {
        id: 4,
        name: 'Class 4',
        description: 'Students Groups',
        location: "Mansura's College - Mansura, Dept.",
        sets: 2,
        members: 25,
        exams: 4,
        color: '#f97316'
      }
    ];
  });

  const [search, setSearch] = useState('');

  const [activity, setActivity] = useState([
    { id: 1, icon: 'assignment_added', text: 'You assigned a new quiz to Class 1', time: '2 hours ago' },
    { id: 2, icon: 'person_add', text: 'New student joined Class 3', time: 'Yesterday' },
    { id: 3, icon: 'library_add', text: 'You created a new flashcard set in Class 2', time: '2 days ago' }
  ]);

  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    subject: '',
    color: '#22c55e'
  });

  const [updateForm, setUpdateForm] = useState({
    id: null,
    name: '',
    location: '',
    description: ''
  });

  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    localStorage.setItem('teacherClassesData', JSON.stringify(classes));
  }, [classes]);

  const filteredClasses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return classes;
    return classes.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    });
  }, [classes, search]);

  const openCreate = () => setCreateOpen(true);
  const closeAll = () => {
    setCreateOpen(false);
    setUpdateOpen(false);
    setDeleteOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const addActivity = (type, message) => {
    const icon = type === 'created' ? 'add_circle' : type === 'updated' ? 'edit' : 'delete';
    const item = { id: Date.now(), icon, text: message, time: 'Just now' };
    setActivity((prev) => [item, ...prev].slice(0, 5));
  };

  const highlight = (text) => {
    const q = search.trim();
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="teacher-highlight">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const onCreateSubmit = (e) => {
    e.preventDefault();
    const name = createForm.name.trim();
    if (!name) return;

    const newClass = {
      id: classes.length ? Math.max(...classes.map((c) => c.id)) + 1 : 1,
      name,
      description: createForm.description.trim() || 'New Class',
      location: "Mansura's College - Mansura, Dept.",
      sets: 0,
      members: 0,
      exams: 0,
      color: createForm.color
    };

    setClasses((prev) => [...prev, newClass]);
    addActivity('created', `You created a new class: ${newClass.name}`);
    setCreateForm({ name: '', description: '', subject: '', color: '#22c55e' });
    closeAll();
  };

  const onOpenUpdate = (c) => {
    setUpdateForm({ id: c.id, name: c.name, location: c.location, description: c.description });
    setUpdateOpen(true);
  };

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    if (!updateForm.id) return;
    const name = updateForm.name.trim();
    const location = updateForm.location.trim();
    if (!name || !location) return;

    setClasses((prev) =>
      prev.map((c) =>
        c.id === updateForm.id ? { ...c, name, location, description: updateForm.description.trim() } : c
      )
    );
    addActivity('updated', `You updated class: ${name}`);
    closeAll();
  };

  const onOpenDelete = (c) => {
    setDeleteTarget(c);
    setDeleteOpen(true);
  };

  const onConfirmDelete = () => {
    if (!deleteTarget) return;
    setClasses((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    addActivity('deleted', `You deleted class: ${deleteTarget.name}`);
    setDeleteTarget(null);
    closeAll();
  };

  const onOpenClass = (c) => {
    localStorage.setItem('currentTeacherClass', JSON.stringify(c));
    navigate(`/teacher/class/${c.id}`);
  };

  return (
    <div className="teacher-dashboard flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <TeacherSidebar teacher={teacher} classes={classes} onNewClass={openCreate} />

      <main className="teacher-main flex-1 p-4 md:p-8">
        <header className="teacher-header">
          <div className="teacher-search">
            <span className="material-icons teacher-search-icon">search</span>
            <input
              className="teacher-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search classes, location, description..."
            />
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

        <div className="teacher-page-header">
          <div>
            <h1 className="teacher-page-title">Your Classes</h1>
            <p className="teacher-page-subtitle">Manage your classes and recent activity</p>
          </div>
          <div className="teacher-page-actions">
            <button type="button" className="teacher-btn teacher-btn-primary" onClick={openCreate}>
              <span className="material-icons">add</span>
              Create Class
            </button>
          </div>
        </div>

        <section className="teacher-classes-grid">
          {filteredClasses.length === 0 ? (
            <div className="teacher-empty card-box">
              <div className="teacher-empty-icon">
                <span className="material-icons">search_off</span>
              </div>
              <h3 className="teacher-empty-title">No classes found</h3>
              <p className="teacher-empty-sub">Try different search terms.</p>
            </div>
          ) : (
            filteredClasses.map((c) => (
              <div
                key={c.id}
                className="teacher-class-card"
                style={{ ['--primary']: c.color }}
                onClick={() => onOpenClass(c)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenClass(c);
                }}
              >
                <div className="teacher-class-card-header">
                  <div className="teacher-class-card-headings">
                    <h3 className="teacher-class-card-title">{highlight(c.name)}</h3>
                    <p className="teacher-class-card-subtitle">{highlight(c.description)}</p>
                    <p className="teacher-class-card-subtitle">{highlight(c.location)}</p>
                  </div>

                  <div className="teacher-class-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="teacher-class-action"
                      title="Delete"
                      onClick={() => onOpenDelete(c)}
                    >
                      <span className="material-icons">more_horiz</span>
                    </button>
                    <button
                      type="button"
                      className="teacher-class-action"
                      title="Edit"
                      onClick={() => onOpenUpdate(c)}
                    >
                      <span className="material-icons">settings</span>
                    </button>
                  </div>
                </div>

                <div className="teacher-class-stats">
                  <div className="teacher-class-stat">
                    <span className="material-icons">bolt</span>
                    <span>{c.sets} sets</span>
                  </div>
                  <div className="teacher-class-stat">
                    <span className="material-icons">group</span>
                    <span>{c.members} members</span>
                  </div>
                  <div className="teacher-class-stat">
                    <span className="material-icons">assignment</span>
                    <span>{c.exams} exams</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        <section className="teacher-activity-section">
          <h2 className="teacher-section-title">Recent Activity</h2>
          <div className="teacher-activity-list">
            {activity.map((a) => (
              <div key={a.id} className="teacher-activity-item">
                <div className="teacher-activity-icon">
                  <span className="material-icons">{a.icon}</span>
                </div>
                <div className="teacher-activity-content">
                  <p>{a.text}</p>
                  <span className="teacher-activity-time">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="teacher-footer">
          <p>© 2026 Eureka Instructor Panel – All rights reserved.</p>
        </footer>

        <button type="button" className="teacher-fab" onClick={openCreate} aria-label="Create class">
          <span className="material-icons">add</span>
        </button>

        {/* Create Class Modal */}
        {createOpen && (
          <div className="teacher-modal" onMouseDown={closeAll} role="presentation">
            <div className="teacher-modal-content" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
              <div className="teacher-modal-header">
                <h3>Create New Class</h3>
                <button type="button" className="teacher-modal-close" onClick={closeAll} aria-label="Close">
                  <span className="material-icons">close</span>
                </button>
              </div>

              <form className="teacher-modal-body" onSubmit={onCreateSubmit}>
                <label className="teacher-field">
                  <span>Class Name</span>
                  <input
                    value={createForm.name}
                    onChange={(e) => setCreateForm((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                </label>

                <label className="teacher-field">
                  <span>Description</span>
                  <textarea
                    rows={3}
                    value={createForm.description}
                    onChange={(e) => setCreateForm((p) => ({ ...p, description: e.target.value }))}
                  />
                </label>

                <label className="teacher-field">
                  <span>Subject</span>
                  <input
                    value={createForm.subject}
                    onChange={(e) => setCreateForm((p) => ({ ...p, subject: e.target.value }))}
                    placeholder="Optional"
                  />
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
                        className={`teacher-color-swatch ${createForm.color === opt.value ? 'active' : ''}`}
                        style={{ background: opt.value }}
                        title={opt.label}
                        onClick={() => setCreateForm((p) => ({ ...p, color: opt.value }))}
                      />
                    ))}
                  </div>
                </div>

                <div className="teacher-modal-footer">
                  <button type="button" className="teacher-btn" onClick={closeAll}>
                    Cancel
                  </button>
                  <button type="submit" className="teacher-btn teacher-btn-primary">
                    Create Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Class Modal */}
        {updateOpen && (
          <div className="teacher-modal" onMouseDown={closeAll} role="presentation">
            <div className="teacher-modal-content" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
              <div className="teacher-modal-header">
                <h3>Update Class Details</h3>
                <button type="button" className="teacher-modal-close" onClick={closeAll} aria-label="Close">
                  <span className="material-icons">close</span>
                </button>
              </div>

              <form className="teacher-modal-body" onSubmit={onUpdateSubmit}>
                <label className="teacher-field">
                  <span>Class Name</span>
                  <input
                    value={updateForm.name}
                    onChange={(e) => setUpdateForm((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                </label>

                <label className="teacher-field">
                  <span>Class Location</span>
                  <input
                    value={updateForm.location}
                    onChange={(e) => setUpdateForm((p) => ({ ...p, location: e.target.value }))}
                    required
                  />
                </label>

                <label className="teacher-field">
                  <span>Class Description</span>
                  <textarea
                    rows={3}
                    value={updateForm.description}
                    onChange={(e) => setUpdateForm((p) => ({ ...p, description: e.target.value }))}
                  />
                </label>

                <div className="teacher-modal-footer">
                  <button type="button" className="teacher-btn" onClick={closeAll}>
                    Cancel
                  </button>
                  <button type="submit" className="teacher-btn teacher-btn-primary">
                    Update Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Class Modal */}
        {deleteOpen && (
          <div className="teacher-modal" onMouseDown={closeAll} role="presentation">
            <div className="teacher-modal-content teacher-modal-danger" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
              <div className="teacher-modal-header">
                <h3>Delete Class</h3>
                <button type="button" className="teacher-modal-close" onClick={closeAll} aria-label="Close">
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="teacher-modal-body">
                <p className="teacher-danger-text">
                  Are you sure you want to delete{' '}
                  <strong>{deleteTarget?.name || 'this class'}</strong>? This action cannot be undone.
                </p>

                <div className="teacher-modal-footer">
                  <button type="button" className="teacher-btn" onClick={closeAll}>
                    Cancel
                  </button>
                  <button type="button" className="teacher-btn teacher-btn-danger" onClick={onConfirmDelete}>
                    Delete Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

