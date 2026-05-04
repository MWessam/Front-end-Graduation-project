import React, { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import { useNavigate } from 'react-router-dom';
import { enrollInClass, getEnrolledClassIds, leaveClass } from '../services/studentClassService';
import './TeacherDashboard.css';

function readTeacherClasses() {
  try {
    const raw = localStorage.getItem('teacherClassesData');
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export default function Classes() {
  const studentData = useStudentData();
  const navigate = useNavigate();
  const [enrolledIds, setEnrolledIds] = useState(() => getEnrolledClassIds());

  const availableClasses = useMemo(() => readTeacherClasses(), []);

  const refreshEnrolled = () => setEnrolledIds(getEnrolledClassIds());

  const handleJoin = (classItem) => {
    enrollInClass(classItem.id);
    refreshEnrolled();
  };

  const handleLeave = (classItem, e) => {
    e.stopPropagation();
    leaveClass(classItem.id);
    refreshEnrolled();
  };

  const openClass = (classItem) => {
    navigate(`/student/class/${classItem.id}`);
  };

  return (
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <Sidebar studentData={studentData} />
      <main className="teacher-main flex-1 p-4 md:p-8">
        <div className="teacher-page-header">
          <div>
            <h1 className="teacher-page-title">Classes</h1>
            <p className="teacher-page-subtitle">Join a class your teacher created, then open it to study.</p>
          </div>
        </div>

        <section className="teacher-classes-grid">
          {availableClasses.length === 0 ? (
            <div className="teacher-empty card-box">
              <div className="teacher-empty-icon">
                <span className="material-icons">school</span>
              </div>
              <h3 className="teacher-empty-title">No classes yet</h3>
              <p className="teacher-empty-sub">
                When an instructor creates a class on Eureka, it will show up here.
              </p>
            </div>
          ) : (
            availableClasses.map((c) => {
              const enrolled = enrolledIds.includes(Number(c.id));
              return (
                <div
                  key={c.id}
                  className="teacher-class-card"
                  style={{ borderLeftColor: c.color || '#22c55e', cursor: 'default' }}
                >
                  <div className="teacher-class-card-header">
                    <div>
                      <h3 className="teacher-class-card-title">{c.name}</h3>
                      <p className="teacher-class-card-subtitle">{c.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {!enrolled ? (
                      <button
                        type="button"
                        className="teacher-btn teacher-btn-primary"
                        onClick={() => handleJoin(c)}
                      >
                        <span className="material-icons">person_add</span>
                        Join class
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="teacher-btn teacher-btn-primary"
                          onClick={() => openClass(c)}
                        >
                          <span className="material-icons">login</span>
                          Open class
                        </button>
                        <button type="button" className="teacher-btn" onClick={(e) => handleLeave(c, e)}>
                          Leave
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}
