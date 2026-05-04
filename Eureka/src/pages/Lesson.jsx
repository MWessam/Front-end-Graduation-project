import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import { resolveCurriculumApi } from '../services/curriculumApi';
import './Lesson.css';
import './Concept.css';
import { renderLessonSlideBlocks } from '../components/lesson/lessonBlockRender';

const Lesson = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const studentData = useStudentData();
  const classIdParam = searchParams.get('classId');
  const subjectIdParam = searchParams.get('subjectId');
  const fromStudentClass = searchParams.get('from') === 'student-class';
  const api = useMemo(() => resolveCurriculumApi(classIdParam), [classIdParam]);
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = api.getLessonById(id);
    if (data) {
      setLessonData(data);
    }
    setLoading(false);
  }, [id, api]);

  const buildExerciseSearch = () => {
    const p = new URLSearchParams();
    if (classIdParam) p.set('classId', classIdParam);
    if (fromStudentClass) p.set('from', 'student-class');
    if (subjectIdParam) p.set('subjectId', subjectIdParam);
    const s = p.toString();
    return s ? `?${s}` : '';
  };

  const handleBack = () => {
    if (fromStudentClass && classIdParam) {
      if (subjectIdParam) {
        navigate(`/student/class/${classIdParam}/subjects/${subjectIdParam}`);
      } else {
        navigate(`/student/class/${classIdParam}`);
      }
      return;
    }
    navigate(-1);
  };

  const handleStartExercise = () => {
    navigate(`/lessons/${id}/exercises${buildExerciseSearch()}`);
  };

  if (loading) return <div className="loading">Loading lesson...</div>;
  if (!lessonData) return <div className="error">Lesson not found</div>;

  const cards = lessonData.contentCards || [];
  const hasSlides = cards.some((c) => (c.blocks || []).length > 0);
  const subj = lessonData.subject || {};

  const renderCard = (card) => {
    return (
      <section
        key={card.id}
        className="card-presentation mb-16 p-8 sm:p-12 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-[2.5rem] shadow-sm"
      >
        {renderLessonSlideBlocks(card.blocks)}
      </section>
    );
  };

  const pageInner = (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          {subj.icon != null && subj.icon !== '' && <span className="text-4xl">{subj.icon}</span>}
          {subj.name && (
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">
              {subj.name}
            </span>
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {lessonData.title}
        </h1>
      </header>

      <div className="lesson-content">
        {!hasSlides ? (
          <div className="mb-12 p-8 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 text-center text-gray-600 dark:text-gray-400">
            <span className="material-icons text-4xl mb-2 text-gray-400">quiz</span>
            <p>This lesson has no slides yet. Open exercises to view questions.</p>
          </div>
        ) : (
          cards.map(renderCard)
        )}
      </div>

      <footer className="lesson-footer mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <button
            onClick={handleBack}
            className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <span className="material-icons mr-2">arrow_back</span>
            Back
          </button>
          <button
            onClick={handleStartExercise}
            className="flex items-center px-8 py-3 bg-primary text-white text-base font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-200 dark:shadow-none transition-all"
          >
            Start Exercises
            <span className="material-icons ml-2">play_arrow</span>
          </button>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <Sidebar studentData={studentData} />
      <main className="flex-1 overflow-y-auto">{pageInner}</main>
    </div>
  );
};

export default Lesson;
