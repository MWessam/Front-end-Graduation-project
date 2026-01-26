import React, { useState } from 'react';
import '../../styles/teacher/students.css';
import { studentRoster, searchStudents } from '../../data/mock/teacher';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter students based on search
  const filteredStudents = searchTerm 
    ? searchStudents(searchTerm) 
    : studentRoster;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Students</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search students..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="students-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id} className="student-card">
              <div className="student-avatar">{student.avatarInitial}</div>
              <div className="student-info">
                <h3>{student.name}</h3>
                <p>{student.className}</p>
              </div>
              <button className="btn-icon">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          ))
        ) : (
          <div className="no-results" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light-secondary)' }}>
            <p>No students found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
