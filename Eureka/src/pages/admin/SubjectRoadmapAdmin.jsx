import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import './AdminDashboard.css'; // Reusing admin styles

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
    // Refresh list
    setLessons(contentService.getLessonsBySubject(id));
    // Optional: navigate immediately to edit
    // navigate(`/admin/lessons/${newLesson.id}`);
  };

  const handleDeleteLesson = (lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      contentService.deleteLesson(lessonId);
      setLessons(contentService.getLessonsBySubject(id));
    }
  };

  if (!subject) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <button onClick={() => navigate('/admin')} className="btn-icon">
            <span className="material-icons">arrow_back</span>
          </button>
          <h1>{subject.icon} {subject.name} - Lessons</h1>
        </div>
        <button onClick={handleCreateLesson} className="btn-primary">
          <span className="material-icons">add</span>
          Create New Lesson
        </button>
      </header>

      <div className="lessons-grid">
        {lessons.length === 0 ? (
          <div className="empty-state">
            <p>No lessons found for this subject.</p>
          </div>
        ) : (
          lessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card-admin">
              <div className="lesson-info">
                <div className="details">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.contentCards.length} Cards • {contentService.getQuestionsByLesson(lesson.id).length} Questions</p>
                </div>
              </div>
              <div className="actions">
                <Link to={`/admin/lessons/${lesson.id}`} className="btn-icon" title="Edit Content">
                  <span className="material-icons">edit</span>
                </Link>
                <Link to={`/admin/lessons/${lesson.id}/questions`} className="btn-icon" title="Manage Questions">
                  <span className="material-icons">quiz</span>
                </Link>
                 <button onClick={() => handleDeleteLesson(lesson.id)} className="btn-icon delete" title="Delete">
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
