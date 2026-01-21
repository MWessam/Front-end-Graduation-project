import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Zap, Trophy, FileText, ShoppingBag, User, MoreHorizontal, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/student' },
    { name: 'Courses', icon: Zap, path: '/student/courses' },
    { name: 'Assignments', icon: Trophy, path: '/student/assignments' },
    { name: 'Quizzes', icon: FileText, path: '/student/quizzes' },
    { name: 'Shop', icon: ShoppingBag, path: '/student/shop' },
    { name: 'Profile', icon: User, path: '/student/profile' },
  ];

  return (
    <aside className="w-64 bg-slate-50 dark:bg-zinc-800 p-6 flex flex-col justify-between h-screen border-r border-gray-200 dark:border-zinc-700 fixed left-0 top-0 overflow-y-auto z-50">
      <div>
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ahmed Emad</h1>
          <p className="text-gray-500 dark:text-gray-400">Student</p>
        </div>

        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-green-500 text-white'
                        : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-zinc-700'
                    }`
                  }
                >
                  <item.icon size={24} />
                  <span className="font-semibold">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-zinc-700 transition-colors"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          <span className="font-semibold">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <NavLink
          to="/student/more"
          className={({ isActive }) =>
            `flex items-center gap-4 p-3 rounded-xl transition-colors ${
              isActive
                ? 'bg-green-500 text-white'
                : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-zinc-700'
            }`
          }
        >
          <MoreHorizontal size={24} />
          <span className="font-semibold">More</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
