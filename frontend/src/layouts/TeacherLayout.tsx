import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../styles/teacher/main.css';

const TeacherLayout = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    // Load classes
    const storedClasses = localStorage.getItem('classesData');
    if (storedClasses) {
        setClasses(JSON.parse(storedClasses));
    } else {
        // Default data from script.js
        const defaultClasses = [
            { id: 1, name: "Class 1", description: "Material for Substance", location: "Mansura's College - Mansura, Dept.", sets: 2, members: 15, exams: 3, color: "#22c55e" },
            { id: 2, name: "Class 2", description: "Students Groups", location: "Mansura's College - Mansura, Dept.", sets: 2, members: 22, exams: 5, color: "#3b82f6" },
            { id: 3, name: "Class 3", description: "Material for Substance", location: "Mansura's College - Mansura, Dept.", sets: 2, members: 18, exams: 2, color: "#8b5cf6" },
            { id: 4, name: "Class 4", description: "Students Groups", location: "Mansura's College - Mansura, Dept.", sets: 2, members: 25, exams: 4, color: "#f97316" }
        ];
        localStorage.setItem('classesData', JSON.stringify(defaultClasses));
        setClasses(defaultClasses);
    }

    // Apply theme
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
  }, [theme]);

  // Listen for storage updates (to update sidebar when classes change in dashboard)
  useEffect(() => {
    const handleStorageChange = () => {
        const storedClasses = localStorage.getItem('classesData');
        if (storedClasses) {
            setClasses(JSON.parse(storedClasses));
        }
    };
    
    // Custom event for local updates
    window.addEventListener('classesUpdated', handleStorageChange);
    return () => window.removeEventListener('classesUpdated', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="dashboard-container">
        <aside className="sidebar">
            <div className="profile-section">
                <div className="profile-picture">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3xxhnHeziCEJ0RSUApUH-m9jDKjmLYIDSne5UvCMHba5okpEUvUZ5T-jt2GFmwGAPjmtoQwu1nI99dOmGgGhZnR6fep9hb8hq2JUeGUD9NbQ-qVLIfxigK0E_Vowf56QmyS-7QvA43XWnypFoZsaWJA06Zcvldh8rRv8R09nAdS1FKxheHfpbQT1MsdQqNIKxhE7Y1c9dkMG7Mr26Vzis96oAPLEMBa3OmJMWVnGeeVL1_ZKzl4je3R8yj4xai76ODfkEba8RJdQ" alt="Ahmed Emad Profile"/>
                </div>
                <div className="profile-info">
                    <h2 className="profile-name">Ahmed Emad</h2>
                    <p className="profile-role">Teacher</p>
                </div>
            </div>

            <nav className="main-nav">
                <ul className="nav-list">
                    <li className={`nav-item ${location.pathname === '/teacher' ? 'active' : ''}`}>
                        <Link to="/teacher" className="nav-link">
                            <span className="material-symbols-outlined">home</span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/teacher/library' ? 'active' : ''}`}>
                        <Link to="/teacher/library" className="nav-link">
                            <span className="material-symbols-outlined">auto_stories</span>
                            <span>Your Library</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/teacher/notifications' ? 'active' : ''}`}>
                        <Link to="/teacher/notifications" className="nav-link">
                            <span className="material-symbols-outlined">notifications</span>
                            <span>Notifications</span>
                        </Link>
                    </li>
                </ul>

                <div className="nav-section">
                    <h3 className="section-title">Your Classes</h3>
                    <ul className="nav-list" id="sidebar-classes-list">
                        {classes.map((cls: any) => (
                            <li key={cls.id} className={`nav-item ${location.pathname === `/teacher/class/${cls.id}` ? 'active' : ''}`}>
                                <Link to={`/teacher/class/${cls.id}`} className="nav-link class-link">
                                    {cls.name}
                                </Link>
                            </li>
                        ))}
                        <li className="nav-item">
                            {/* Trigger modal logic via event or context - simpler to navigate to Dashboard and open modal? 
                                Or keep modal global. The original JS opens modal from sidebar link.
                                For now, link to dashboard with create intent?
                            */}
                            <Link to="/teacher?action=create" className="nav-link new-class-link">
                                <span className="material-symbols-outlined">add</span>
                                <span>New class</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="nav-section">
                    <h3 className="section-title">Teacher Tools</h3>
                    <ul className="nav-list">
                        <li className={`nav-item ${location.pathname === '/teacher/assign' ? 'active' : ''}`}>
                            <Link to="/teacher/assign" className="nav-link">
                                <span className="material-symbols-outlined">task_alt</span>
                                <span>Assign activity</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="mode-toggle">
                    <button id="theme-toggle" className="theme-toggle-btn" onClick={toggleTheme}>
                        <span className="material-symbols-outlined light-icon">light_mode</span>
                        <span className="material-symbols-outlined dark-icon">dark_mode</span>
                        <span className="toggle-slider"></span>
                    </button>
                    <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
                </div>
            </div>
        </aside>

        <main className="main-content">
            <Outlet />
        </main>
    </div>
  );
};

export default TeacherLayout;

