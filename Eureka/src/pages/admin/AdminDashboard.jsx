import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import AdminBreadcrumbs from '../../components/admin/AdminBreadcrumbs';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingSubject, setEditingSubject] = useState(null);
  const [formName, setFormName] = useState('');
  const [formIcon, setFormIcon] = useState('📚');
  const navigate = useNavigate();

  useEffect(() => {
    setSubjects(contentService.getSubjects());
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setEditingSubject(null);
    setFormName('');
    setFormIcon('📚');
    setModalOpen(true);
  };

  const openEditModal = (e, subject) => {
    e.preventDefault();
    e.stopPropagation();
    setModalMode('edit');
    setEditingSubject(subject);
    setFormName(subject.name);
    setFormIcon(subject.icon || '📚');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingSubject(null);
  };

  const submitModal = (e) => {
    e.preventDefault();
    const name = formName.trim();
    if (!name) return;
    if (modalMode === 'create') {
      contentService.saveSubject({
        id: Date.now(),
        name,
        icon: formIcon.trim() || '📚',
        description: 'New Subject',
      });
    } else if (editingSubject) {
      contentService.saveSubject({
        ...editingSubject,
        name,
        icon: formIcon.trim() || editingSubject.icon,
      });
    }
    setSubjects(contentService.getSubjects());
    closeModal();
  };

  const handleDeleteSubject = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      window.confirm(
        'Delete this subject and all lessons and questions under it? This cannot be undone.'
      )
    ) {
      contentService.deleteSubject(id);
      setSubjects(contentService.getSubjects());
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminBreadcrumbs items={[{ label: 'Admin' }, { label: 'Subjects' }]} />
      <header className="admin-header">
        <h1>Subject Management</h1>
        <button type="button" onClick={openCreateModal} className="btn-primary">
          <span className="material-icons">add</span>
          Create New Subject
        </button>
      </header>

      <div className="lessons-grid">
        {subjects.length === 0 ? (
          <div className="empty-state">
            <span className="material-icons">library_books</span>
            <p>No subjects found. Start by creating one!</p>
          </div>
        ) : (
          subjects.map((subject) => (
            <div
              key={subject.id}
              className="lesson-card-admin"
              onClick={() => navigate(`/admin/subjects/${subject.id}`)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ')
                  navigate(`/admin/subjects/${subject.id}`);
              }}
            >
              <div className="lesson-info">
                <span className="subject-icon">{subject.icon}</span>
                <div className="details">
                  <h3>{subject.name}</h3>
                  <p>{contentService.getLessonsBySubject(subject.id).length} Lessons</p>
                </div>
              </div>
              <div className="actions">
                <button
                  type="button"
                  onClick={(e) => openEditModal(e, subject)}
                  className="btn-icon"
                  title="Edit Subject"
                >
                  <span className="material-icons">edit</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDeleteSubject(e, subject.id)}
                  className="btn-icon delete"
                  title="Delete"
                >
                  <span className="material-icons">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="admin-modal-overlay" role="presentation" onClick={closeModal}>
          <div
            className="admin-modal"
            role="dialog"
            aria-labelledby="subject-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="subject-modal-title">{modalMode === 'create' ? 'New Subject' : 'Edit Subject'}</h2>
            <form onSubmit={submitModal}>
              <div className="field">
                <label htmlFor="subject-name">Name</label>
                <input
                  id="subject-name"
                  value={formName}
                  onChange={(ev) => setFormName(ev.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="subject-icon">Icon (emoji)</label>
                <input
                  id="subject-icon"
                  value={formIcon}
                  onChange={(ev) => setFormIcon(ev.target.value)}
                />
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="btn-ghost" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {modalMode === 'create' ? 'Create' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
