import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AllCourses.css';

const AllCourses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState(null);

  const isActive = (path) => location.pathname === path;

  const courses = [
    { 
      id: 1,
      title: 'Programming', 
      description: 'Learn coding languages and software development',
      icon: 'images/software 1.png'
    },
    { 
      id: 2,
      title: 'English', 
      description: 'Master the English language and communication',
      icon: 'images/softwakre 1.png'
    },
    { 
      id: 3,
      title: 'Math', 
      description: 'Explore mathematics and problem solving',
      icon: 'images/softwdare 1.png'
    },
    { 
      id: 4,
      title: 'Arabic', 
      description: 'Learn Arabic language and literature',
      icon: 'images/v2.png'
    },
    { 
      id: 5,
      title: 'Science', 
      description: 'Discover scientific principles and experiments',
      icon: 'images/science1.png'
    },
    { 
      id: 6,
      title: 'Physics', 
      description: 'Understand the laws of the physical world',
      icon: 'images/physics1.png'
    },
    { 
      id: 7,
      title: 'French', 
      description: 'Learn French language and culture',
      icon: 'images/french1.png'
    },
    { 
      id: 8,
      title: 'Spanish', 
      description: 'Master Spanish speaking and writing',
      icon: 'images/physics1.png'
    },
    { 
      id: 9,
      title: 'Italian', 
      description: 'Explore Italian language and heritage',
      icon: 'images/spain1.png'
    },
    { 
      id: 10,
      title: 'German', 
      description: 'Learn German grammar and vocabulary',
      icon: 'images/italian1.png'
    },
    { 
      id: 11,
      title: 'History', 
      description: 'Explore world history and civilizations',
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135707.png'
    },
    { 
      id: 12,
      title: 'Chemistry', 
      description: 'Study chemical reactions and elements',
      icon: 'https://cdn-icons-png.flaticon.com/512/2454/2454237.png'
    },
  ];

  const handleStartCourse = (courseId, courseTitle) => {
    setClickedButton(courseId);
    
    // Simulate course loading
    setTimeout(() => {
      // Navigate to lectures page (or course-specific page)
      navigate('/lectures');
      setClickedButton(null);
    }, 500);
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="flex min-h-screen font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ahmed Emad</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Student</p>
        </div>
        <nav>
          <ul className="nav-list">
            <li>
              <Link 
                to="/student" 
                className={`nav-item ${(isActive('/student') || isActive('/')) ? '' : ''}`}
              >
                <span className="material-symbols-outlined">home</span>
                <span className="font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/courses" 
                className={`nav-item ${isActive('/courses') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/classes" 
                className={`nav-item ${isActive('/classes') ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined">school</span>
                <span className="font-medium">Classes</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-item">
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className="font-medium">SHOP</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-item">
                <span className="material-symbols-outlined">person</span>
                <span className="font-medium">PROFILE</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-item">
                <span className="material-symbols-outlined">more_horiz</span>
                <span className="font-medium">MORE</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="page-title">Courses for all speakers</h1>
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <img 
                alt={`${course.title} course icon`} 
                className="course-icon" 
                src={course.icon}
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = 'none';
                }}
              />
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <button 
                className="course-button"
                onClick={() => handleStartCourse(course.id, course.title)}
                style={{
                  transform: clickedButton === course.id ? 'scale(0.95)' : 'scale(1)',
                  transition: 'transform 0.2s ease-in-out'
                }}
              >
                {clickedButton === course.id ? 'Starting...' : 'Start Learning'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllCourses;
