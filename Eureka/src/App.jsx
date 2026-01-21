import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all page components
import Achievements from './pages/Achievements';
import AllCourses from './pages/AllCourses';
import Classes from './pages/Classes';
import Concept from './pages/Concept';
import ConceptLesson from './pages/ConceptLesson';
import Courses from './pages/Courses';
import Edit from './pages/Edit';
import Essay from './pages/Essay';
import EssayResult from './pages/EssayResult';
import Instructions from './pages/Instructions';
import Lectures from './pages/Lectures';
import LessonLec from './pages/LessonLec';
import McqEssay from './pages/McqEssay';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import ResultMcqEssay from './pages/ResultMcqEssay';
import Student from './pages/Student';
import TeacherQuiz from './pages/TeacherQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/concept" element={<Concept />} />
        <Route path="/concept-lesson" element={<ConceptLesson />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/essay" element={<Essay />} />
        <Route path="/essay-result" element={<EssayResult />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/lesson-lec" element={<LessonLec />} />
        <Route path="/mcq-essay" element={<McqEssay />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result-mcq-essay" element={<ResultMcqEssay />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher-quiz" element={<TeacherQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
