import React from 'react';
import '../../styles/teacher/students.css';

const Students = () => {
  return (
    <div className="page-content">
        <div className="page-header">
            <h1 className="page-title">Students</h1>
            <div className="search-container">
                <input type="text" placeholder="Search students..." className="search-input" />
            </div>
        </div>
        <div className="students-list">
            <div className="student-card">
                <div className="student-avatar">S</div>
                <div className="student-info">
                    <h3>Sarah Ahmed</h3>
                    <p>Class 1</p>
                </div>
                <button className="btn-icon">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </div>
            <div className="student-card">
                <div className="student-avatar">M</div>
                <div className="student-info">
                    <h3>Mohamed Ali</h3>
                    <p>Class 2</p>
                </div>
                <button className="btn-icon">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Students;


