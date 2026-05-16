import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import { resolveCurriculumApi } from '../services/curriculumApi';
import { isEnrolledInClass } from '../services/studentClassService';
import './TeacherClass.css';

function darkenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

function readTeacherClasses() {
  try {
    const raw = localStorage.getItem('teacherClassesData');
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export default function StudentClass() {
  const navigate = useNavigate();
  const { id } = useParams();
  const studentData = useStudentData();
  const cid = id ? Number(id) : NaN;

  const classMeta = useMemo(() => {
    const list = readTeacherClasses();
    return list.find((c) => Number(c.id) === cid) || null;
  }, [cid]);

  const api = useMemo(() => resolveCurriculumApi(id), [id]);
  const [subjects, setSubjects] = useState([]);
  const [activeTab, setActiveTab] = useState('subjects');

  useEffect(() => {
    setSubjects(api.getSubjects());
  }, [api]);

  useEffect(() => {
    if (Number.isNaN(cid) || !classMeta || !isEnrolledInClass(cid)) {
      navigate('/classes');
    }
  }, [cid, classMeta, navigate]);

  if (!classMeta) {
    return (
      <div className="teacher-class-loading">
        <p>Loading class…</p>
      </div>
    );
  }

  return (
    <div className="teacher-class-dashboard flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <Sidebar studentData={studentData} />
      <main className="teacher-class-main flex-1 flex flex-col overflow-hidden">
        <header className="teacher-class-header">
          <div className="teacher-class-header-left">
            <button
              type="button"
              className="teacher-class-back-btn"
              onClick={() => navigate('/classes')}
            >
              <span className="material-icons">arrow_back</span>
              <span>Classes</span>
            </button>
          </div>
        </header>

        <div
          className="teacher-class-banner"
          style={{
            background: `linear-gradient(135deg, ${classMeta.color || '#22c55e'} 0%, ${darkenColor(classMeta.color || '#22c55e', 20)} 100%)`,
          }}
        >
          <div className="teacher-class-banner-content">
            <h1 className="teacher-class-title">{classMeta.name}</h1>
            <div className="teacher-class-info">
              <span className="teacher-class-description">{classMeta.description}</span>
              {classMeta.location && (
                <div className="teacher-class-location">
                  <span className="material-icons">location_on</span>
                  <span>{classMeta.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="teacher-class-nav-tabs">
          <nav className="teacher-class-tabs-container">
            <button
              type="button"
              className={`teacher-class-tab-btn ${activeTab === 'subjects' ? 'active' : ''}`}
              onClick={() => setActiveTab('subjects')}
            >
              <span className="material-icons">topic</span>
              Subjects
            </button>
            <button
              type="button"
              className={`teacher-class-tab-btn ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              <span className="material-icons">groups</span>
              Members
            </button>
            <button
              type="button"
              className={`teacher-class-tab-btn ${activeTab === 'exams' ? 'active' : ''}`}
              onClick={() => setActiveTab('exams')}
            >
              <span className="material-icons">quiz</span>
              Exams
            </button>
          </nav>
        </div>

        <div className="teacher-class-content flex-1 overflow-y-auto">
          {activeTab === 'subjects' && (
            <div className="teacher-class-tab-content">
              <div className="teacher-class-tab-header">
                <h2>Subjects</h2>
              </div>
              <div className="teacher-class-materials-list teacher-class-subjects-list">
                {subjects.length === 0 ? (
                  <div className="teacher-class-empty-curriculum">
                    <span className="material-icons teacher-class-empty-icon">topic</span>
                    <p>Your teacher has not added subjects to this class yet.</p>
                  </div>
                ) : (
                  subjects.map((subject) => {
                    const lessonCount = api.getLessonsBySubject(subject.id).length;
                    return (
                      <div key={subject.id} className="teacher-class-material-card teacher-class-subject-card">
                        <button
                          type="button"
                          className="teacher-class-subject-toggle"
                          onClick={() => navigate(`/student/class/${cid}/subjects/${subject.id}`)}
                        >
                          <span className="teacher-class-subject-icon">{subject.icon || '📚'}</span>
                          <div className="teacher-class-subject-toggle-text">
                            <h3 className="teacher-class-material-title">{subject.name}</h3>
                            <span className="teacher-class-material-type">
                              {lessonCount} lesson{lessonCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <span className="material-icons teacher-class-chevron">chevron_right</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="teacher-class-tab-content">
              <div className="teacher-class-tab-header">
                <h2>Class members</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                The class roster is managed by your teacher.
              </p>
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="teacher-class-tab-content">
              <div className="teacher-class-tab-header">
                <h2>Exams</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                When your teacher assigns exams for this class, they will appear here.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
