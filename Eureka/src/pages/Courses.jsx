import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import './Courses.css';

const Courses = () => {
  const navigate = useNavigate();
  const studentData = useStudentData();

  const handleStarClick = () => {
    navigate('/courses');
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <Sidebar studentData={studentData} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-16 px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-16">Start Learning</h2>
        <div className="relative flex flex-col items-center space-y-8">
          <div className="custom-line line-1" />
          <div className="custom-line line-2" />

          <div className="flex flex-col items-center">
            <div
              onClick={handleStarClick}
              className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg clickable-star"
            >
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
          <button className="w-28 h-28 bg-purple-500 rounded-full flex items-center justify-center shadow-lg play-button">
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

        <div className="super-card">
          <h3 className="text-3xl font-bold mb-2">SUPER</h3>
          <p className="mb-4">Try Super for free</p>
          <p className="text-sm font-light mb-6">No ads, personalized practice, and unlimited Legendary!</p>
          <button className="super-button">TRY 1 WEEK FREE</button>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-4">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Silver League</h4>
            <Link to="#" className="text-sm font-bold text-blue-500 hover:underline">
              VIEW LEAGUE
            </Link>
          </div>
          <div className="info-card">
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
            <div className="quest-card">
              <div className="quest-header">
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-gray-800 dark:text-white">bolt</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-white">Earn 10 XP</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">menu_book</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill bg-yellow-400" style={{ width: '100%' }} />
              </div>
              <span className="progress-text">10 / 10</span>
            </div>

            <div className="quest-card">
              <div className="quest-header">
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-gray-800 dark:text-white">target</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-white">Get 5 in a row correct in 2 lessons</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">menu_book</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill bg-green-500" style={{ width: '25%' }} />
              </div>
              <span className="progress-text">0 / 2</span>
            </div>

            <div className="quest-card">
              <div className="quest-header">
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-gray-800 dark:text-white">volume_up</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-white">Listen to 7 exercises</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">menu_book</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill bg-blue-500" style={{ width: '0%' }} />
              </div>
              <span className="progress-text">0 / 7</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Courses;
