import React, { useState } from 'react';
import '../../styles/teacher/library.css';
import { libraryResources, searchResources } from '../../data/mock/teacher';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter resources based on search
  const filteredResources = searchTerm 
    ? searchResources(searchTerm) 
    : libraryResources;

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
      
      {/* Search */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input 
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            width: '100%',
            maxWidth: '300px'
          }}
        />
      </div>

      <div className="library-grid">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div key={resource.id} className="library-card">
              <div className={`card-icon ${resource.iconType}`}>
                <span className="material-symbols-outlined">
                  {resource.type === 'video' ? 'play_circle' : 'description'}
                </span>
              </div>
              <div className="card-details">
                <h3>{resource.title}</h3>
                <p>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</p>
                {resource.views !== undefined && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-light-secondary)' }}>
                    {resource.views} views
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1/-1', color: 'var(--text-light-secondary)' }}>
            <p>No resources found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
