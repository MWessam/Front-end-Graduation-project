import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginRole, setLoginRole] = useState<'student' | 'teacher'>('student');
  const [registerRole, setRegisterRole] = useState<'student' | 'teacher'>('student');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    if (loginRole === 'student') {
        navigate('/student');
    } else {
        navigate('/teacher');
    }
  };

  const handleRegisterSubmit = () => {
    // Navigate to OTP
    navigate('/verify-otp');
  };

  return (
    <div className="main-container">
      <button id="themeToggle" className="theme-btn" onClick={toggleTheme}>
        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>

      {/* Login Section */}
      <div id="loginSection" className={`auth-wrapper ${isLogin ? 'active' : ''}`}>
        <div className="left-panel login-gradient">
            <div className="brand-content fade-in-left">
                <h1>Welcome Back to the<br/>World of Learning</h1>
                <div className="brand-icon">
                    <i className="fa-solid fa-book-open"></i>
                </div>
                <div className="secure-badge">
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <span>Secure access for Students and Teachers</span>
                </div>
            </div>
        </div>

        <div className="right-panel">
            <div className="auth-card fade-in-up">
                <h2>Login to Your Account</h2>
                <p className="subtitle">Continue your journey as a Student or Teacher.</p>

                <div className="role-switcher">
                    <button 
                        className={`role-btn ${loginRole === 'student' ? 'active' : ''}`} 
                        onClick={() => setLoginRole('student')}
                    >
                        <i className="fa-regular fa-user"></i> Student
                    </button>
                    <button 
                        className={`role-btn ${loginRole === 'teacher' ? 'active' : ''}`} 
                        onClick={() => setLoginRole('teacher')}
                    >
                        <i className="fa-solid fa-chalkboard-user"></i> Teacher
                    </button>
                </div>

                <form id="loginForm" onSubmit={handleLoginSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" required />
                    </div>

                    <div className="form-options">
                        <label className="checkbox-container">
                            <input type="checkbox" /> Remember Me
                            <span className="checkmark"></span>
                        </label>
                        <Link to="/verify-otp" className="forgot-link">Forgot Password?</Link>
                    </div>

                    <button type="submit" className="submit-btn gradient-btn">Login</button>
                </form>

                <div className="bottom-text">
                    New to our platform? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>Create an Account</a>
                </div>
            </div>
        </div>
      </div>

      {/* Register Section */}
      <div id="registerSection" className={`auth-wrapper ${!isLogin ? 'active' : ''}`}>
        <div className="left-panel register-gradient">
            <div className="brand-content fade-in-left">
                <h1>Shape the Future —<br/>Join as a Teacher<br/>or Student</h1>
                <p className="brand-desc">Empowering education through connection, innovation, and collaboration.</p>
                <div className="features-list">
                    <span><i className="fa-solid fa-book-open-reader"></i> Inspiring learning journeys</span>
                    <span><i className="fa-solid fa-graduation-cap"></i> Built for students & teachers</span>
                </div>
            </div>
        </div>

        <div className="right-panel">
            <div className="auth-card fade-in-up">
                <h2>Join the Learning Revolution</h2>
                <p className="subtitle">Create an account to make an impact.</p>

                <div className="role-switcher">
                    <button 
                        className={`role-btn ${registerRole === 'student' ? 'active' : ''}`} 
                        onClick={() => setRegisterRole('student')}
                    >
                        <i className="fa-regular fa-user"></i> Student
                    </button>
                    <button 
                        className={`role-btn ${registerRole === 'teacher' ? 'active' : ''}`} 
                        onClick={() => setRegisterRole('teacher')}
                    >
                        <i className="fa-solid fa-chalkboard-user"></i> Teacher
                    </button>
                </div>

                <form id="registerForm">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="John Smith" required />
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="john@example.com" required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" required />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="••••••••" required />
                    </div>

                    {registerRole === 'teacher' && (
                        <div id="teacherFields" className="dynamic-fields">
                            <div className="input-group">
                                <label>Subject Specialty</label>
                                <select>
                                    <option>Select a subject...</option>
                                    <option>Mathematics</option>
                                    <option>Science</option>
                                    <option>Literature</option>
                                    <option>Coding</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Experience Level</label>
                                <select>
                                    <option>Select your level...</option>
                                    <option>Junior (1-3 years)</option>
                                    <option>Mid-Level (3-5 years)</option>
                                    <option>Senior (5+ years)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {registerRole === 'student' && (
                        <div id="studentFields" className="dynamic-fields">
                            <div className="input-group">
                                <label>Current Grade</label>
                                <select>
                                    <option>Select your grade...</option>
                                    <option>High School</option>
                                    <option>Undergraduate</option>
                                    <option>Postgraduate</option>
                                </select>
                            </div>
                        </div>
                    )}
                    
                    <button type="button" className="submit-btn solid-blue-btn" onClick={handleRegisterSubmit}> 
                        Create Account
                    </button>
                </form>

                <div className="bottom-text">
                    Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>Sign In</a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


