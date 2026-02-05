import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all page components
import Achievements from './pages/Achievements';
import AllCourses from './pages/AllCourses';
import Classes from './pages/Classes';
import Concept from './pages/Concept';
import Courses from './pages/Courses';
import Edit from './pages/Edit';
import Essay from './pages/Essay';
import EssayResult from './pages/EssayResult';
import Instructions from './pages/Instructions';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Lectures from './pages/Lectures';
import LessonLec from './pages/LessonLec';
import McqEssay from './pages/McqEssay';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import ResultMcqEssay from './pages/ResultMcqEssay';
import Student from './pages/Student';
import Subjects from './pages/Subjects';
import SubjectRoadmap from './pages/SubjectRoadmap';
import Lesson from './pages/Lesson';
import Exercises from './pages/Exercises';
import TeacherQuiz from './pages/TeacherQuiz';
import OTP from './pages/OTP';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import LessonEditor from './pages/admin/LessonEditor';
import QuestionEditor from './pages/admin/QuestionEditor';
import SubjectRoadmapAdmin from './pages/admin/SubjectRoadmapAdmin';
import LessonQuestionsEditor from './pages/admin/LessonQuestionsEditor';

// Teacher (Pure Project/Project Graduate/Project Graduate) placeholder pages
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherClass from './pages/TeacherClass';
import TeacherLibrary from './pages/TeacherLibrary';
import TeacherAssignActivity from './pages/TeacherAssignActivity';
import TeacherStudents from './pages/TeacherStudents';
import TeacherChat from './pages/TeacherChat';
import TeacherNotifications from './pages/TeacherNotifications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTP />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/concept" element={<Concept />} />
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
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:id" element={<SubjectRoadmap />} />
        <Route path="/lessons/:id" element={<Lesson />} />
        <Route path="/lessons/:lessonId/exercises" element={<Exercises />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/teacher-quiz" element={<TeacherQuiz />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/subjects/:id" element={<SubjectRoadmapAdmin />} />
        <Route path="/admin/lessons/:id" element={<LessonEditor />} />
        <Route path="/admin/lessons/:lessonId/questions" element={<LessonQuestionsEditor />} />
        <Route path="/admin/questions/:id" element={<QuestionEditor />} />

        {/* Teacher panel (placeholders) */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/class" element={<TeacherClass />} />
        <Route path="/teacher/class/:id" element={<TeacherClass />} />
        <Route path="/teacher/library" element={<TeacherLibrary />} />
        <Route path="/teacher/assign-activity" element={<TeacherAssignActivity />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/teacher/chat" element={<TeacherChat />} />
        <Route path="/teacher/chat/:id" element={<TeacherChat />} />
        <Route path="/teacher/notifications" element={<TeacherNotifications />} />
      </Routes>
    </Router>
  );
}

export default App;
