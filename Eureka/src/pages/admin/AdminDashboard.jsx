import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSubjects(contentService.getSubjects());
  }, []);

  const handleCreateSubject = () => {
    const name = prompt('Enter subject name:');
    if (!name) return;
    const icon = prompt('Enter subject icon (emoji):', '📚');
    
    const newSubject = {
      id: Date.now(),
      name,
      icon,
      description: 'New Subject'
    };
    contentService.saveSubject(newSubject);
    setSubjects(contentService.getSubjects());
  };

  const handleEditSubject = (e, subject) => {
    e.preventDefault();
    e.stopPropagation();
    const name = prompt('Edit subject name:', subject.name);
    if (name === null) return;
    const icon = prompt('Edit subject icon:', subject.icon);
    
    contentService.saveSubject({ ...subject, name, icon: icon || subject.icon });
    setSubjects(contentService.getSubjects());
  };

  const handleDeleteSubject = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Delete this subject? This will not delete associated lessons automatically in this demo.')) {
      contentService.deleteSubject(id);
      setSubjects(contentService.getSubjects());
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Subject Management</h1>
        <button onClick={handleCreateSubject} className="btn-primary">
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
            >
              <div className="lesson-info">
                <span className="subject-icon">{subject.icon}</span>
                <div className="details">
                  <h3>{subject.name}</h3>
                  <p>{contentService.getLessonsBySubject(subject.id).length} Lessons</p>
                </div>
              </div>
              <div className="actions">
                <button onClick={(e) => handleEditSubject(e, subject)} className="btn-icon" title="Edit Subject">
                  <span className="material-icons">edit</span>
                </button>
                <button onClick={(e) => handleDeleteSubject(e, subject.id)} className="btn-icon delete" title="Delete">
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

export default AdminDashboard;
