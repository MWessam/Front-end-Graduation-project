import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Achievements.css';

const Achievements = () => {
  const navigate = useNavigate();
  const celebrationRef = useRef(null);

  useEffect(() => {
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-bar, .level-progress');
    progressBars.forEach((bar) => {
      const width = bar.getAttribute('data-width') || bar.style.width;
      setTimeout(() => {
        bar.style.width = `${width}%`;
      }, 1000);
    });

    // Create celebration confetti
    createConfetti();
  }, []);

  const createConfetti = () => {
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
    const container = celebrationRef.current;
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
      container.appendChild(confetti);
    }
  };

  const handleContinue = () => {
    navigate('/courses');
  };

  const handleAchievementClick = (target) => {
    if (target && target !== '#') {
      // Navigate to achievement target if it's a valid route
      const routes = {
        'quiz.html': '/quiz',
        'essay.html': '/essay',
        'mcq_essay.html': '/mcq-essay'
      };
      const route = routes[target];
      if (route) {
        navigate(route);
      }
    }
  };

  const achievements = [
    { id: 1, icon: 'done_all', title: 'Quiz master', target: 'quiz.html', locked: false },
    { id: 2, icon: 'article', title: 'First Essay', target: 'essay.html', locked: false },
    { id: 3, icon: 'article', title: 'Streak Start', target: 'mcq_essay.html', locked: false },
    { id: 4, icon: 'schedule', title: 'Fast Learner', target: null, locked: true }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 antialiased">
      <div className="max-w-4xl w-full mx-auto space-y-8">
        {/* Celebration Animation Container */}
        <div ref={celebrationRef} id="celebration" className="fixed inset-0 pointer-events-none z-50" />

        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white achievement-title">
            Congratulations! Lesson 1 Complete
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 achievement-subtitle">
            You have unlocked new achievements and earned valuable rewards Keep up the Great work!
          </p>
        </header>

        <main className="space-y-8">
          {/* Performance Overview */}
          <section className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 performance-card">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Performance Overview</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <span className="w-1/4 text-gray-700 dark:text-gray-300">MCQ Score</span>
                <div className="w-2/4 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mx-4">
                  <div className="bg-primary h-2.5 rounded-full progress-bar" data-width="85" style={{ width: '0%' }} />
                </div>
                <span className="w-1/4 text-right font-semibold text-gray-900 dark:text-white">85%</span>
              </div>
              <div className="flex items-center">
                <span className="w-1/4 text-gray-700 dark:text-gray-300">Essay Score</span>
                <div className="w-2/4 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mx-4">
                  <div className="bg-primary h-2.5 rounded-full progress-bar" data-width="45" style={{ width: '0%' }} />
                </div>
                <span className="w-1/4 text-right font-semibold text-gray-900 dark:text-white">45%</span>
              </div>
              <div className="flex items-center">
                <span className="w-1/4 text-gray-700 dark:text-gray-300">Quiz Accuracy</span>
                <div className="w-2/4 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mx-4">
                  <div className="bg-primary h-2.5 rounded-full progress-bar" data-width="80" style={{ width: '0%' }} />
                </div>
                <span className="w-1/4 text-right font-semibold text-gray-900 dark:text-white">80%</span>
              </div>
            </div>
          </section>

          {/* Rewards Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="reward-card bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
              <img
                alt="Yellow star icon for XP points"
                className="h-16 w-16 mb-2 reward-icon"
                src="https://cdn-icons-png.flaticon.com/512/9297/9297932.png"
              />
              <p className="font-bold text-lg text-gray-900 dark:text-white">+ 150</p>
              <p className="text-gray-600 dark:text-gray-400">XP earned</p>
            </div>
            <div className="reward-card bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
              <img
                alt="Gold coin icon with a dollar sign"
                className="h-16 w-16 mb-2 reward-icon"
                src="https://cdn-icons-png.flaticon.com/512/9297/9297933.png"
              />
              <p className="font-bold text-lg text-gray-900 dark:text-white">+50</p>
              <p className="text-gray-600 dark:text-gray-400">Coin Collected</p>
            </div>
            <div className="reward-card bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
              <img
                alt="Gold medal icon with a number one on it"
                className="h-16 w-16 mb-2 reward-icon"
                src="https://cdn-icons-png.flaticon.com/512/9297/9297934.png"
              />
              <p className="font-bold text-lg text-gray-900 dark:text-white">+10</p>
              <p className="text-gray-600 dark:text-gray-400">New Rank</p>
            </div>
          </section>

          {/* Level Progress */}
          <section className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 level-card">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-900 dark:text-white">Level 1</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">150/1000 XP to Level 6</span>
              <span className="font-bold text-gray-900 dark:text-white">Level 6</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full level-progress" data-width="15" style={{ width: '0%' }} />
            </div>
          </section>

          {/* Achievements Section */}
          <section className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 achievements-section">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Achievements Unlocked</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`achievement-item flex flex-col items-center ${achievement.locked ? 'locked' : ''}`}
                  onClick={() => !achievement.locked && handleAchievementClick(achievement.target)}
                  style={{ cursor: achievement.locked ? 'not-allowed' : 'pointer' }}
                >
                  <div
                    className={`w-20 h-20 flex items-center justify-center rounded-full mb-3 achievement-icon ${
                      achievement.locked
                        ? 'bg-gray-100 dark:bg-gray-700/50'
                        : 'bg-green-100 dark:bg-green-900/50'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        achievement.locked
                          ? 'text-gray-600 dark:text-gray-400'
                          : 'text-primary'
                      }`}
                    >
                      {achievement.icon}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{achievement.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Continue Button */}
          <footer className="text-center space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              You have unlocked new achievements and earned valuable rewards Keep up the Great work!
            </p>
            <button
              onClick={handleContinue}
              className="continue-button bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors"
            >
              Continue to next lesson
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Achievements;
