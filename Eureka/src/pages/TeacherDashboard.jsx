import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import TeacherDashboardHeader from '../components/teacher/TeacherDashboardHeader';
import TeacherClassCard from '../components/teacher/TeacherClassCard';
import TeacherActivitySection from '../components/teacher/TeacherActivitySection';
import TeacherDashboardModals from '../components/teacher/TeacherDashboardModals';
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
      { id: 1, name: 'Class 1', description: 'Material for Substance', location: "Mansura's College - Mansura, Dept.", sets: 2, members: 15, exams: 3, color: '#22c55e' },
      { id: 2, name: 'Class 2', description: 'Students Groups', location: "Mansura's College - Mansura, Dept.", sets: 2, members: 22, exams: 5, color: '#3b82f6' },
      { id: 3, name: 'Class 3', description: 'Material for Substance', location: "Mansura's College - Mansura, Dept.", sets: 2, members: 18, exams: 2, color: '#8b5cf6' },
      { id: 4, name: 'Class 4', description: 'Students Groups', location: "Mansura's College - Mansura, Dept.", sets: 2, members: 25, exams: 4, color: '#f97316' }
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

  const [createForm, setCreateForm] = useState({ name: '', description: '', subject: '', color: '#22c55e' });
  const [updateForm, setUpdateForm] = useState({ id: null, name: '', location: '', description: '' });
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
        <TeacherDashboardHeader 
          search={search} 
          setSearch={setSearch} 
          teacher={teacher} 
          unreadCount={unreadCount} 
        />

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
              <TeacherClassCard 
                key={c.id} 
                classItem={c} 
                highlight={highlight} 
                onOpenClass={onOpenClass} 
                onOpenUpdate={onOpenUpdate} 
                onOpenDelete={onOpenDelete} 
              />
            ))
          )}
        </section>

        <TeacherActivitySection activity={activity} />

        <footer className="teacher-footer">
          <p>© 2026 Eureka Instructor Panel – All rights reserved.</p>
        </footer>

        <button type="button" className="teacher-fab" onClick={openCreate} aria-label="Create class">
          <span className="material-icons">add</span>
        </button>

        <TeacherDashboardModals 
          createOpen={createOpen}
          updateOpen={updateOpen}
          deleteOpen={deleteOpen}
          createForm={createForm}
          setCreateForm={setCreateForm}
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          deleteTarget={deleteTarget}
          onCreateSubmit={onCreateSubmit}
          onUpdateSubmit={onUpdateSubmit}
          onConfirmDelete={onConfirmDelete}
          closeAll={closeAll}
        />
      </main>
    </div>
  );
}

