import React from 'react';

const TeacherClassCard = ({ classItem, highlight, onOpenClass, onOpenUpdate, onOpenDelete }) => {
  return (
    <div
      className="teacher-class-card"
      style={{ ['--primary']: classItem.color }}
      onClick={() => onOpenClass(classItem)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpenClass(classItem);
      }}
    >
      <div className="teacher-class-card-header">
        <div className="teacher-class-card-headings">
          <h3 className="teacher-class-card-title">{highlight(classItem.name)}</h3>
          <p className="teacher-class-card-subtitle">{highlight(classItem.description)}</p>
          <p className="teacher-class-card-subtitle">{highlight(classItem.location)}</p>
        </div>

        <div className="teacher-class-card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="teacher-class-action"
            title="Delete"
            onClick={() => onOpenDelete(classItem)}
          >
            <span className="material-icons">more_horiz</span>
          </button>
          <button
            type="button"
            className="teacher-class-action"
            title="Edit"
            onClick={() => onOpenUpdate(classItem)}
          >
            <span className="material-icons">settings</span>
          </button>
        </div>
      </div>

      <div className="teacher-class-stats">
        <div className="teacher-class-stat">
          <span className="material-icons">bolt</span>
          <span>{classItem.sets} sets</span>
        </div>
        <div className="teacher-class-stat">
          <span className="material-icons">group</span>
          <span>{classItem.members} members</span>
        </div>
        <div className="teacher-class-stat">
          <span className="material-icons">assignment</span>
          <span>{classItem.exams} exams</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassCard;
