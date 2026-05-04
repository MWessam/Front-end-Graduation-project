import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import { resolveCurriculumApi } from '../services/curriculumApi';
import { isEnrolledInClass } from '../services/studentClassService';
import { lessonHasSlideContent } from '../utils/lessonContent';
import './TeacherClass.css';

function readTeacherClasses() {
  try {
    const raw = localStorage.getItem('teacherClassesData');
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export default function StudentClassSubject() {
  const navigate = useNavigate();
  const { classId, subjectId } = useParams();
  const studentData = useStudentData();
  const cid = classId ? Number(classId) : NaN;
  const api = useMemo(() => resolveCurriculumApi(classId), [classId]);

  const classMeta = useMemo(() => {
    const list = readTeacherClasses();
    return list.find((c) => Number(c.id) === cid) || null;
  }, [cid]);

  const subject = api.getSubjectById(subjectId);
  const lessons = subject ? api.getLessonsBySubject(subjectId) : [];

  useEffect(() => {
    if (Number.isNaN(cid) || !classMeta || !isEnrolledInClass(cid)) {
      navigate('/classes');
    }
  }, [cid, classMeta, navigate]);

  useEffect(() => {
    if (classMeta && isEnrolledInClass(cid) && !subject) {
      navigate(`/student/class/${cid}`);
    }
  }, [subject, classMeta, cid, navigate]);

  const openLesson = (lesson) => {
    const q = new URLSearchParams({
      classId: String(cid),
      from: 'student-class',
      subjectId: String(subjectId),
    });
    const suffix = `?${q.toString()}`;
    if (lessonHasSlideContent(lesson)) {
      navigate(`/lessons/${lesson.id}${suffix}`);
    } else {
      navigate(`/lessons/${lesson.id}/exercises${suffix}`);
    }
  };

  if (!classMeta || !subject) {
    return (
      <div className="teacher-class-loading">
        <p>Loading…</p>
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
              onClick={() => navigate(`/student/class/${cid}`)}
            >
              <span className="material-icons">arrow_back</span>
              <span>Subjects</span>
            </button>
          </div>
        </header>

        <div className="teacher-class-content flex-1 overflow-y-auto">
          <div className="teacher-class-tab-content">
            <div className="teacher-class-tab-header">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{classMeta.name}</p>
                <h2 className="flex items-center gap-2">
                  <span>{subject.icon || '📚'}</span>
                  {subject.name}
                </h2>
              </div>
            </div>

            <ul className="teacher-class-lesson-list rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900">
              {lessons.length === 0 ? (
                <li className="teacher-class-lesson-empty">No lessons in this subject yet.</li>
              ) : (
                lessons.map((lesson) => {
                  const qCount = api.getQuestionsByLesson(lesson.id).length;
                  const slides = lessonHasSlideContent(lesson);
                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        className="teacher-class-lesson-row bg-transparent dark:bg-transparent"
                        onClick={() => openLesson(lesson)}
                      >
                        <span className="material-icons teacher-class-lesson-row-icon">
                          {slides ? 'auto_stories' : 'quiz'}
                        </span>
                        <div className="teacher-class-lesson-row-body">
                          <span className="teacher-class-lesson-title">{lesson.title}</span>
                          <span className="teacher-class-lesson-meta">
                            {slides ? 'Lesson' : 'Exercises only'} · {qCount} question
                            {qCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <span className="material-icons">chevron_right</span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
