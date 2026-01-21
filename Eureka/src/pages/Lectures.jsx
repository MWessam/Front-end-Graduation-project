import React from 'react';
import { Link } from 'react-router-dom';
import './Lectures.css';

const Lectures = () => {
  const lectures = [
    {
      id: 1,
      icon: 'images/code (1) 1.png',
      title: 'Introduction to variable data types',
      description: 'Learn about different data types and how to use variables in programming',
      link: '/lesson-lec'
    },
    {
      id: 2,
      icon: 'images/code (.1) 1.png',
      title: 'Understanding the control flow',
      description: 'Master conditional statements and loops for program control',
      link: '#'
    },
    {
      id: 3,
      icon: 'images/code (b1) 1.png',
      title: 'Functions and modularity',
      description: 'Create reusable code with functions and understand modular programming',
      link: '#'
    },
    {
      id: 4,
      icon: 'images/code (m1) 1.png',
      title: 'MySQL and Database',
      description: 'Learn database fundamentals and SQL queries with MySQL',
      link: '#'
    },
    {
      id: 5,
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174854.png',
      title: 'HTML and Definition',
      description: 'Build web page structure with HyperText Markup Language',
      link: '#'
    },
    {
      id: 6,
      icon: 'https://cdn-icons-png.flaticon.com/512/732/732190.png',
      title: 'Cascading Style Sheet',
      description: 'Style and design beautiful web pages with CSS',
      link: '#'
    },
    {
      id: 7,
      icon: 'https://cdn-icons-png.flaticon.com/512/919/919830.png',
      title: 'PHP',
      description: 'Server-side scripting for dynamic web applications',
      link: '#'
    },
    {
      id: 8,
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png',
      title: 'Python Advanced',
      description: 'Advanced Python concepts and programming techniques',
      link: '#'
    },
    {
      id: 9,
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
      title: 'JavaScript Fundamentals',
      description: 'Client-side scripting and interactive web development',
      link: '#'
    }
  ];

  return (
    <div className="main-container bg-background-light dark:bg-background-dark font-display text-zinc-900 dark:text-zinc-100 min-h-screen">
      <div className="content-wrapper">
        <header className="page-header">
          <h1 className="page-title">Programming</h1>
          <p className="page-subtitle">A Comprehensive series of lectures to master the fundamentals</p>
        </header>

        <main className="main-content">
          <div className="lectures-container">
            {lectures.map((lecture) => (
              <div key={lecture.id} className="lecture-card">
                <div className="lecture-content">
                  <div className="lecture-icon">
                    <img
                      alt={`${lecture.title} icon`}
                      src={lecture.icon}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="lecture-info">
                    <h2 className="lecture-title">{lecture.title}</h2>
                    <p className="lecture-description">{lecture.description}</p>
                  </div>
                </div>
                {lecture.link === '#' ? (
                  <button className="lecture-button" disabled>
                    View Lecture
                  </button>
                ) : (
                  <Link to={lecture.link} className="lecture-button">
                    View Lecture
                  </Link>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Lectures;
