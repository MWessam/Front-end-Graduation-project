import React from 'react';
import '../../styles/teacher/library.css';

const Library = () => {
  return (
    <div className="page-content">
        <div className="page-header">
            <h1 className="page-title">Your Library</h1>
            <div className="page-actions">
                <button className="btn-primary">
                    <span className="material-symbols-outlined">upload</span>
                    Upload Resource
                </button>
            </div>
        </div>
        <div className="library-grid">
            {/* Sample items */}
            <div className="library-card">
                <div className="card-icon document">
                    <span className="material-symbols-outlined">description</span>
                </div>
                <div className="card-details">
                    <h3>Chemistry Basics</h3>
                    <p>PDF Document</p>
                </div>
            </div>
            <div className="library-card">
                <div className="card-icon video">
                    <span className="material-symbols-outlined">play_circle</span>
                </div>
                <div className="card-details">
                    <h3>Physics Intro</h3>
                    <p>Video Lesson</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Library;


