import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import shared components
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load page components
const Achievements = lazy(() => import('./pages/Achievements'));
const AllCourses = lazy(() => import('./pages/AllCourses'));
const Classes = lazy(() => import('./pages/Classes'));
const StudentClass = lazy(() => import('./pages/StudentClass'));
const StudentClassSubject = lazy(() => import('./pages/StudentClassSubject'));
const Concept = lazy(() => import('./pages/Concept'));
const Edit = lazy(() => import('./pages/Edit'));
const Essay = lazy(() => import('./pages/Essay'));
const EssayResult = lazy(() => import('./pages/EssayResult'));
const Instructions = lazy(() => import('./pages/Instructions'));
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Lectures = lazy(() => import('./pages/Lectures'));
const McqEssay = lazy(() => import('./pages/McqEssay'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Result = lazy(() => import('./pages/Result'));
const ResultMcqEssay = lazy(() => import('./pages/ResultMcqEssay'));
const Student = lazy(() => import('./pages/Student'));
const Subjects = lazy(() => import('./pages/Subjects'));
const SubjectRoadmap = lazy(() => import('./pages/SubjectRoadmap'));
const Lesson = lazy(() => import('./pages/Lesson'));
const Exercises = lazy(() => import('./pages/Exercises'));
const TeacherQuiz = lazy(() => import('./pages/TeacherQuiz'));
const OTP = lazy(() => import('./pages/OTP'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const LessonEditor = lazy(() => import('./pages/admin/LessonEditor'));
const SubjectRoadmapAdmin = lazy(() => import('./pages/admin/SubjectRoadmapAdmin'));
const LessonQuestionsEditor = lazy(() => import('./pages/admin/LessonQuestionsEditor'));

// Teacher pages
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const TeacherClass = lazy(() => import('./pages/TeacherClass'));
const TeacherLibrary = lazy(() => import('./pages/TeacherLibrary'));
const TeacherAssignActivity = lazy(() => import('./pages/TeacherAssignActivity'));
const TeacherStudents = lazy(() => import('./pages/TeacherStudents'));
const TeacherChat = lazy(() => import('./pages/TeacherChat'));
const TeacherNotifications = lazy(() => import('./pages/TeacherNotifications'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTP />} />
        {/* Student Routes */}
        <Route path="/achievements" element={<ProtectedRoute allowedRoles={['student']}><Achievements /></ProtectedRoute>} />
        <Route path="/classes" element={<ProtectedRoute allowedRoles={['student']}><Classes /></ProtectedRoute>} />
        <Route path="/student/class/:id" element={<ProtectedRoute allowedRoles={['student']}><StudentClass /></ProtectedRoute>} />
        <Route path="/student/class/:classId/subjects/:subjectId" element={<ProtectedRoute allowedRoles={['student']}><StudentClassSubject /></ProtectedRoute>} />
        <Route path="/concept" element={<ProtectedRoute allowedRoles={['student']}><Concept /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute allowedRoles={['student']}><AllCourses /></ProtectedRoute>} />
        <Route path="/edit" element={<ProtectedRoute allowedRoles={['student']}><Edit /></ProtectedRoute>} />
        <Route path="/essay" element={<ProtectedRoute allowedRoles={['student']}><Essay /></ProtectedRoute>} />
        <Route path="/essay-result" element={<ProtectedRoute allowedRoles={['student']}><EssayResult /></ProtectedRoute>} />
        <Route path="/instructions" element={<ProtectedRoute allowedRoles={['student']}><Instructions /></ProtectedRoute>} />
        <Route path="/lectures" element={<ProtectedRoute allowedRoles={['student']}><Lectures /></ProtectedRoute>} />
        <Route path="/lesson-lec" element={<Navigate to="/lessons/1" replace />} />
        <Route path="/mcq-essay" element={<ProtectedRoute allowedRoles={['student']}><McqEssay /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute allowedRoles={['student']}><Quiz /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute allowedRoles={['student']}><Result /></ProtectedRoute>} />
        <Route path="/result-mcq-essay" element={<ProtectedRoute allowedRoles={['student']}><ResultMcqEssay /></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><Student /></ProtectedRoute>} />
        <Route path="/subjects" element={<ProtectedRoute allowedRoles={['student']}><Subjects /></ProtectedRoute>} />
        <Route path="/subjects/:id" element={<ProtectedRoute allowedRoles={['student']}><SubjectRoadmap /></ProtectedRoute>} />
        <Route path="/lessons/:id" element={<ProtectedRoute allowedRoles={['student']}><Lesson /></ProtectedRoute>} />
        <Route path="/lessons/:lessonId/exercises" element={<ProtectedRoute allowedRoles={['student']}><Exercises /></ProtectedRoute>} />
        <Route path="/exercises" element={<ProtectedRoute allowedRoles={['student']}><Exercises /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/subjects/:id" element={<ProtectedRoute allowedRoles={['admin']}><SubjectRoadmapAdmin /></ProtectedRoute>} />
        <Route path="/admin/lessons/:id" element={<ProtectedRoute allowedRoles={['admin']}><LessonEditor /></ProtectedRoute>} />
        <Route path="/admin/lessons/:lessonId/questions" element={<ProtectedRoute allowedRoles={['admin']}><LessonQuestionsEditor /></ProtectedRoute>} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/class/:classId/curriculum" element={<ProtectedRoute allowedRoles={['teacher']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/teacher/class/:classId/subjects/:id" element={<ProtectedRoute allowedRoles={['teacher']}><SubjectRoadmapAdmin /></ProtectedRoute>} />
        <Route path="/teacher/class/:classId/lessons/:lessonId/edit" element={<ProtectedRoute allowedRoles={['teacher']}><LessonEditor /></ProtectedRoute>} />
        <Route path="/teacher/class/:classId/lessons/:lessonId/questions" element={<ProtectedRoute allowedRoles={['teacher']}><LessonQuestionsEditor /></ProtectedRoute>} />
        <Route path="/teacher/class" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherClass /></ProtectedRoute>} />
        <Route path="/teacher/class/:id" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherClass /></ProtectedRoute>} />
        <Route path="/teacher/library" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherLibrary /></ProtectedRoute>} />
        <Route path="/teacher/assign-activity" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAssignActivity /></ProtectedRoute>} />
        <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherStudents /></ProtectedRoute>} />
        <Route path="/teacher/chat" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherChat /></ProtectedRoute>} />
        <Route path="/teacher/chat/:id" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherChat /></ProtectedRoute>} />
        <Route path="/teacher/notifications" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherNotifications /></ProtectedRoute>} />
        <Route path="/teacher-quiz" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherQuiz /></ProtectedRoute>} />

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
