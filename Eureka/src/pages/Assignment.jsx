import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Assignment.css';

const Assignment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentAssignments, setCurrentAssignments] = useState([
    { id: 1, name: 'Quiz 1', subject: 'Math', lesson: 'in lesson 1 point 4', date: 'Oct 30, 2025' },
    { id: 2, name: 'Quiz 2', subject: 'Programming', lesson: 'in lesson 1 point 4', date: 'Oct 30, 2025' },
    { id: 3, name: 'Quiz 3', subject: 'English', lesson: 'in lesson 1 point 4', date: 'Oct 30, 2025' },
    { id: 4, name: 'Quiz 4', subject: 'Math', lesson: 'in lesson 1 point 4', date: 'Oct 30, 2025' },
  ]);
  const [completedAssignments, setCompletedAssignments] = useState([
    { id: 5, name: 'Quiz 1', subject: 'Math', lesson: 'in lesson 1 point 4', date: 'Oct 30, 2025' },
    { id: 6, name: 'Quiz 2', subject: 'Programming', lesson: 'in lesson 1 point 4', date: 'Oct 30, 2025' },
    { id: 7, name: 'Quiz 3', subject: 'English', lesson: 'in lesson 1 point 4', date: 'Oct 30, 2025' },
    { id: 8, name: 'Quiz 4', subject: 'Math', lesson: 'in lesson 1 point 4', date: 'Oct 30, 2025' },
  ]);

  const isActive = (path) => location.pathname === path;

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleEdit = (assignmentId) => {
    showToastNotification('Edit functionality coming soon!');
  };

  const handleDelete = (assignmentId, isCompleted = false) => {
    if (isCompleted) {
      setCompletedAssignments(prev => prev.filter(a => a.id !== assignmentId));
    } else {
      setCurrentAssignments(prev => prev.filter(a => a.id !== assignmentId));
    }
    showToastNotification('Task deleted successfully!');
  };

  const handleView = (assignmentId) => {
    showToastNotification('View functionality coming soon!');
  };

  const renderAssignmentItem = (assignment, isCompleted = false) => (
    <div 
      key={assignment.id} 
      className="grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-800"
    >
      <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 cursor-grab">drag_indicator</span>
      <span className="font-medium text-primary">{assignment.name}</span>
      <div>
        <p className="font-semibold text-slate-700 dark:text-slate-300">{assignment.subject}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{assignment.lesson}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/50 px-3 py-1 rounded-full w-fit">
        <span className="material-symbols-outlined text-sm">calendar_today</span>
        {assignment.date}
      </div>
      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
        <button onClick={() => handleView(assignment.id)}>
          <span className="material-symbols-outlined">visibility</span>
        </button>
        <button className="edit-btn" onClick={() => handleEdit(assignment.id)}>
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button className="delete-btn" onClick={() => handleDelete(assignment.id, isCompleted)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-700 dark:text-slate-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 flex flex-col border-r border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 p-6">
          <img 
            alt="LearnPro logo" 
            className="h-10 w-10" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD85ZZ0ViT2q6vjOcJOto2x7Cm3bOy3_3O8qJorSeZ2EFouctjKHQ60_MJuuxt3f4Qdfs92zm1_UP5Tu7J_dJiwhGgWubhajXr3IujK_FdgAz5O9mnH17BEuYgBMT1QAhqizOYZtWRhggZfgGj3J2UotNqcDDHY1II2l55iwLv22ftsrAxK5CCdCM56dUufjHfSRCDp90OafiEbPgEg-ouuyYykaLx4j69eIcjZRdPYXuWGn9HmHVUHWltaK86cpQ1LZkXkccMYxj8"
          />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Learn<span className="text-primary">Pro</span>
          </h1>
        </div>
        <div className="flex flex-col items-center p-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Ahmed Emad</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Student</p>
        </div>
        <nav className="flex-grow px-4 space-y-2 mt-6">
          <Link 
            to="/student" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 ${isActive('/student') || isActive('/') ? 'bg-primary text-white' : ''}`}
          >
            <span className="material-symbols-outlined">home</span>
            Dashboard
          </Link>
          <Link 
            to="/courses" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 ${isActive('/courses') ? 'bg-primary text-white' : ''}`}
          >
            <span className="material-symbols-outlined">bolt</span>
            Courses
          </Link>
          <Link 
            to="/assignment" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive('/assignment') ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <span className="material-symbols-outlined">school</span>
            Assignments
          </Link>
          <Link 
            to="/quiz" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 ${isActive('/quiz') ? 'bg-primary text-white' : ''}`}
          >
            <span className="material-symbols-outlined">article</span>
            Quizes
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">shopping_bag</span>
            SHOP
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">person</span>
            PROFILE
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">more_horiz</span>
            MORE
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between h-20 px-8">
            <nav className="flex items-center space-x-8 text-slate-600 dark:text-slate-400">
              <Link to="/student" className="font-medium hover:text-primary">Dashboard</Link>
              <span className="font-medium text-primary border-b-2 border-primary pb-1">My Assignments</span>
              <Link to="/courses" className="font-medium hover:text-primary">Courses</Link>
              <Link to="#" className="font-medium hover:text-primary">Grades</Link>
              <Link to="#" className="font-medium hover:text-primary">Students</Link>
            </nav>
            <div className="flex items-center space-x-6 text-slate-500 dark:text-slate-400">
              <button><span className="material-symbols-outlined">search</span></button>
              <button><span className="material-symbols-outlined">notifications</span></button>
              <button><span className="material-symbols-outlined">help</span></button>
              <button className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-300">person</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">My Assignments</h1>
          
          {/* Current Assignments */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-primary mr-3"></div>
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Assignments</h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined">add</span>
                Quiz
              </button>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">expand_more</span>
                <h3 className="font-semibold text-slate-800 dark:text-white">Current Assignments({currentAssignments.length})</h3>
              </div>
              <div className="space-y-2">
                {currentAssignments.map(assignment => renderAssignmentItem(assignment, false))}
              </div>
            </div>
          </div>

          {/* Completed Assignments */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-white">Completed Assignments({completedAssignments.length})</h3>
            </div>
            <div className="space-y-2">
              {completedAssignments.map(assignment => renderAssignmentItem(assignment, true))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
              Next
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-transform duration-300 ${showToast ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center">
            <span className="material-symbols-outlined mr-2">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment;
