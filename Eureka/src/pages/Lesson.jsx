import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import LessonEditor from '../components/LessonEditor';
import { LESSON_1_CONTENT } from '../exercises/api/lesson1Data';
import './Lesson.css';

const Lesson = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const studentData = useStudentData();
  
  // For now, we only have mock content for Lesson 1.
  // If id is not 1, we show default content or empty.
  const lessonContent = id === '1' ? LESSON_1_CONTENT : [
    { type: "paragraph", content: "Content for this lesson is not yet available." }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartExercise = () => {
    navigate(`/lessons/${id}/exercises`);
  };

  return (
    <div className="lesson-page flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <Sidebar studentData={studentData} />
      <main className="flex-1 p-4 md:p-8">
        <header className="lesson-header mb-6">
          <button
            onClick={handleBack}
            className="back-button"
            aria-label="Back to roadmap"
          >
            <span className="material-icons">arrow_back</span>
            <span>Back to Roadmap</span>
          </button>
          <div className="lesson-header-row">
            <h1 className="lesson-title">
              {id === '1' ? "Lesson 1: Interactive Learning" : `Lesson ${id}`}
            </h1>
            <button
              onClick={handleStartExercise}
              className="lesson-start-exercises-btn"
            >
              <span className="material-icons">play_arrow</span>
              <span>Start Exercises</span>
            </button>
          </div>
        </header>

        <div className="lesson-content-wrapper">
          <LessonEditor initialContent={lessonContent} />
        </div>
      </main>
    </div>
  );
};

export default Lesson;
