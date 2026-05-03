import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import AdminBreadcrumbs from '../../components/admin/AdminBreadcrumbs';
import './AdminDashboard.css';

const SubjectRoadmapAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const subj = contentService.getSubjectById(id);
    if (subj) {
      setSubject(subj);
      setLessons(contentService.getLessonsBySubject(id));
    } else {
      navigate('/admin');
    }
  }, [id, navigate]);

  const handleCreateLesson = () => {
    const newLesson = {
      id: Date.now(),
      title: 'New Lesson',
      subject: { id: subject.id, name: subject.name, icon: subject.icon },
      contentCards: [],
    };
    contentService.saveLesson(newLesson);
    setLessons(contentService.getLessonsBySubject(id));
  };

  const handleDeleteLesson = (e, lessonId) => {
    e.stopPropagation();
    if (window.confirm('Delete this lesson and its questions?')) {
      contentService.deleteLesson(lessonId);
      setLessons(contentService.getLessonsBySubject(id));
    }
  };

  if (!subject) {
    return <div className="admin-dashboard loading-subject">Loading...</div>;
  }

  const crumbs = [
    { label: 'Admin', to: '/admin' },
    { label: subject.name ?? 'Subject' },
  ];

  return (
    <div className="admin-dashboard">
      <AdminBreadcrumbs items={crumbs} />
      <header className="admin-header">
        <div className="header-left">
          <button type="button" onClick={() => navigate('/admin')} className="btn-icon">
            <span className="material-icons">arrow_back</span>
          </button>
          <h1>
            {subject.icon} {subject.name}
          </h1>
        </div>
        <button type="button" onClick={handleCreateLesson} className="btn-primary">
          <span className="material-icons">add</span>
          Create New Lesson
        </button>
      </header>

      <div className="lessons-grid">
        {lessons.length === 0 ? (
          <div className="empty-state empty-state-lessons">
            <span className="material-icons">auto_stories</span>
            <p>No lessons yet. Create one to start adding content.</p>
          </div>
        ) : (
          lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="lesson-card-admin lesson-card-roadmap"
              onClick={() => navigate(`/admin/lessons/${lesson.id}`)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ')
                  navigate(`/admin/lessons/${lesson.id}`);
              }}
            >
              <div className="lesson-info">
                <div className="details">
                  <h3>{lesson.title}</h3>
                  <p>
                    {lesson.contentCards.length} Cards •{' '}
                    {contentService.getQuestionsByLesson(lesson.id).length} Questions
                  </p>
                </div>
              </div>
              <div className="actions" onClick={(e) => e.stopPropagation()}>
                <Link to={`/admin/lessons/${lesson.id}`} className="btn-icon" title="Edit Content">
                  <span className="material-icons">edit</span>
                </Link>
                <Link
                  to={`/admin/lessons/${lesson.id}/questions`}
                  className="btn-icon"
                  title="Manage Questions"
                >
                  <span className="material-icons">quiz</span>
                </Link>
                <button
                  type="button"
                  onClick={(e) => handleDeleteLesson(e, lesson.id)}
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
    </div>
  );
};

export default SubjectRoadmapAdmin;
