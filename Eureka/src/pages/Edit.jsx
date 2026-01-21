import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Edit.css';

const Edit = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <aside className="w-64 border-r border-gray-200 dark:border-gray-700 p-8 flex flex-col justify-between">
        <div>
          <div className="mb-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ahmed Emad</h1>
            <p className="text-gray-500 dark:text-gray-400">Student</p>
          </div>
          <nav className="space-y-2">
            <Link
              to="/student"
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg ${
                isActive('/student') || isActive('/') ? 'bg-primary text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined">home</span>
              <span>Dashboard</span>
            </Link>
            <Link
              to="/courses"
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg ${
                isActive('/courses') ? 'bg-primary text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 700" }}>
                bolt
              </span>
              <span>Courses</span>
            </Link>
            <Link
              to="/classes"
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg ${
                isActive('/classes') ? 'bg-primary text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined">school</span>
              <span>Classes</span>
            </Link>
            <Link to="#" className="flex items-center space-x-4 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined">storefront</span>
              <span>SHOP</span>
            </Link>
            <Link to="#" className="flex items-center space-x-4 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined">person</span>
              <span>PROFILE</span>
            </Link>
          </nav>
        </div>
        <Link to="#" className="flex items-center space-x-4 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">more_horiz</span>
          <span>MORE</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-16 px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-16">Start Learning</h2>
        <div className="relative flex flex-col items-center space-y-8">
          <div className="custom-line line-1" />
          <div className="custom-line line-2" />

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-5xl">star</span>
            </div>
            <span className="mt-3 text-blue-500 font-bold tracking-widest text-sm">START</span>
          </div>

          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-4xl">check</span>
          </div>

          <div className="relative w-full">
            <div className="custom-line line-3" style={{ height: '120px', top: '0px' }} />
            <div className="w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            </div>
            <div className="absolute -left-28 top-28 w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                castle
              </span>
            </div>
            <div className="absolute left-28 top-32 w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                emoji_events
              </span>
            </div>
          </div>
        </div>

        <p className="mt-80 text-gray-500 dark:text-gray-400">Describe the basic contexts</p>

        <div className="mt-auto flex flex-col items-center mb-8">
          <span className="mb-2 text-purple-600 font-bold text-sm tracking-widest">JUMP HERE?</span>
          <button className="w-28 h-28 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </button>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 space-y-8">
        <div className="flex justify-end items-center space-x-2">
          <img
            alt="Diamond icon"
            className="w-7 h-7"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6bKF4raYLnuUXvJ_U44TgmZF-KzDG5-XmmYQKI_DDxJUzvBOLvmZgqczpGBP7g2c3FlvrZJ153g0UGsG-6VPBVT3Zmvex5KhlwaJnwauJbewpatT8W5zyye9SYR_VbMCdWw4KwByj6jz3x93FIpukxWnIt3mkhI4lRBDOBSXm4EGyDbH1iLQ7q9noUg8kKChhXMl8ehzNfTCrdHhepu5JS6lmliRP41oQWpmd2yTkInNtUnfm_xMoD_DwPdQj9knLq6o05j2WazM"
          />
          <span className="font-bold text-lg text-gray-800 dark:text-white">440</span>
        </div>

        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-6 text-white text-center">
          <h3 className="text-3xl font-bold mb-2">SUPER</h3>
          <p className="mb-4">Try Super for free</p>
          <p className="text-sm font-light mb-6">No ads, personalized practice, and unlimited Legendary!</p>
          <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors">
            TRY 1 WEEK FREE
          </button>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-4">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Silver League</h4>
            <Link to="#" className="text-sm font-bold text-blue-500 hover:underline">
              VIEW LEAGUE
            </Link>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex items-center space-x-4">
            <span className="material-symbols-outlined text-4xl text-gray-600 dark:text-gray-400">construction</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete a lesson to join this week's leaderboard and compete against other learners
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-4">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Daily Quests</h4>
            <Link to="#" className="text-sm font-bold text-blue-500 hover:underline">
              VIEW ALL
            </Link>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-gray-800 dark:text-white">bolt</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-white">Earn 10 XP</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">menu_book</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '100%' }} />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block text-center">10 / 10</span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-gray-800 dark:text-white">target</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-white">Get 5 in a row correct in 2 lessons</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">menu_book</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '25%' }} />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block text-center">0 / 2</span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-gray-800 dark:text-white">volume_up</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-white">Listen to 7 exercises</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">menu_book</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '0%' }} />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block text-center">0 / 7</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Edit;
