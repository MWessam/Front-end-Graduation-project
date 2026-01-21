import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import AllCourses from './pages/AllCourses';
import Assignments from './pages/Assignments';
import Quiz from './pages/Quiz';
import Exam from './pages/Exam';
import Lectures from './pages/Lectures';
import Lesson from './pages/Lesson';
import Concept from './pages/Concept';
import Results from './pages/Results';
import EssayQuiz from './pages/EssayQuiz';
import Achievements from './pages/Achievements';
import Instructions from './pages/Instructions';
import Profile from './pages/Profile';
import { ThemeProvider } from './components/ThemeProvider';

// Auth Pages
import Landing from './pages/auth/Landing';
import Login from './pages/auth/Login';
import OTPVerification from './pages/auth/OTPVerification';

// Teacher Pages
import TeacherLayout from './layouts/TeacherLayout';
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherClass from './pages/teacher/Class';
import TeacherLibrary from './pages/teacher/Library';
import TeacherNotifications from './pages/teacher/Notifications';
import TeacherStudents from './pages/teacher/Students';
import TeacherAssign from './pages/teacher/AssignActivity';
import InteractiveGraphicsTest from './pages/InteractiveGraphicsTest';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Test Route - Interactive Graphics */}
          <Route path="/" element={<Landing />} />
          {/* Auth Routes */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test-graphics" element={<InteractiveGraphicsTest />} />
          <Route path="/verify-otp" element={<OTPVerification />} />

          {/* Student Routes */}
          <Route path="/student" element={<Layout><Dashboard /></Layout>} />
          <Route path="/student/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/student/all-courses" element={<Layout><AllCourses /></Layout>} />
          <Route path="/student/assignments" element={<Layout><Assignments /></Layout>} />
          <Route path="/student/quizzes" element={<Layout><Assignments /></Layout>} />
          <Route path="/student/lectures" element={<Layout><Lectures /></Layout>} />
          <Route path="/student/lesson/:id" element={<Layout><Lesson /></Layout>} />
          <Route path="/student/concept" element={<Layout><Concept /></Layout>} />
          <Route path="/student/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/student/shop" element={<Layout><div className="p-8 text-xl font-bold">Shop Page (Coming Soon)</div></Layout>} />
          <Route path="/student/more" element={<Layout><div className="p-8 text-xl font-bold">More Page (Coming Soon)</div></Layout>} />

          {/* Student Standalone Pages */}
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/results" element={<Results />} />
          <Route path="/essay-quiz" element={<EssayQuiz />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/instructions" element={<Instructions />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="class/:id" element={<TeacherClass />} />
            <Route path="library" element={<TeacherLibrary />} />
            <Route path="notifications" element={<TeacherNotifications />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="assign" element={<TeacherAssign />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
