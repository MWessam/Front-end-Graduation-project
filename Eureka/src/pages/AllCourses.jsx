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
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-50 dark:bg-zinc-800 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ahmed Emad</h1>
            <p className="text-gray-500 dark:text-gray-400">Student</p>
          </div>

          <nav>
            <ul>
              <li className="mb-2">
                <Link 
                  to="/student" 
                  className={isActive('/student') || isActive('/') ? 'active-link' : 'nav-link'}
                >
                  <span className="material-icons">home</span>
                  <span className={isActive('/student') || isActive('/') ? 'font-semibold' : ''}>Dashboard</span>
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/courses" className={isActive('/courses') ? 'active-link' : 'nav-link'}>
                  <span className="material-icons">bolt</span>
                  <span>Courses</span>
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/classes" className={isActive('/classes') ? 'active-link' : 'nav-link'}>
                  <span className="material-icons">school</span>
                  <span>Classes</span>
                </Link>
              </li>

              <li className="mb-2">
                <Link to="#" className="nav-link">
                  <span className="material-icons">shopping_bag</span>
                  <span>Shop</span>
                </Link>
              </li>

              <li className="mb-2">
                <Link to="#" className="nav-link">
                  <span className="material-icons">person</span>
                  <span>Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <Link to="#" className="nav-link">
            <span className="material-icons">more_horiz</span>
            <span>More</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Courses for all speakers</h1>
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
