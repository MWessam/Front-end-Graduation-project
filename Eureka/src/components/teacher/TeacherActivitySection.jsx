import React from 'react';

const TeacherActivitySection = ({ activity }) => {
  return (
    <section className="teacher-activity-section">
      <h2 className="teacher-section-title">Recent Activity</h2>
      <div className="teacher-activity-list">
        {activity.map((a) => (
          <div key={a.id} className="teacher-activity-item">
            <div className="teacher-activity-icon">
              <span className="material-icons">{a.icon}</span>
            </div>
            <div className="teacher-activity-content">
              <p>{a.text}</p>
              <span className="teacher-activity-time">{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherActivitySection;
