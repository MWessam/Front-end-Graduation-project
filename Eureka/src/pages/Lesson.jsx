import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import { contentService } from '../services/contentService';
import './Lesson.css';
import './Concept.css';
import { renderLessonSlideBlocks } from '../components/lesson/lessonBlockRender';

const Lesson = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const studentData = useStudentData();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = contentService.getLessonById(id);
    if (data) {
      setLessonData(data);
    }
    setLoading(false);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartExercise = () => {
    navigate(`/lessons/${id}/exercises`);
  };

  if (loading) return <div className="loading">Loading lesson...</div>;
  if (!lessonData) return <div className="error">Lesson not found</div>;

  const renderCard = (card) => {
    return (
      <section key={card.id} className="card-presentation mb-16 p-8 sm:p-12 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-[2.5rem] shadow-sm">
        {renderLessonSlideBlocks(card.blocks)}
      </section>
    );
  };

  return (
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <Sidebar studentData={studentData} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl">{lessonData.subject.icon}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">{lessonData.subject.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {lessonData.title}
            </h1>
          </header>

          {/* Content Cards */}
          <main className="lesson-content">
            {lessonData.contentCards.map(renderCard)}
          </main>

          {/* Footer Navigation */}
          <footer className="lesson-footer mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
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
      </main>
    </div>
  );
};

export default Lesson;
