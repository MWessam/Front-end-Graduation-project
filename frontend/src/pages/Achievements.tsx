import React, { useEffect } from 'react';
import { CheckCircle, Award, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Achievements = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />
      
      <div className="max-w-4xl w-full mx-auto space-y-8 z-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 animate-bounce">Congratulations! Lesson 1 Complete</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">You have unlocked new achievements and earned valuable rewards!</p>
        </header>

        <div className="space-y-8">
          {/* Performance Overview */}
          <section className="bg-white dark:bg-zinc-800 p-8 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Performance Overview</h2>
            <div className="space-y-6">
              {[
                { label: 'MCQ Score', value: 85, color: 'bg-green-500' },
                { label: 'Essay Score', value: 45, color: 'bg-yellow-500' },
                { label: 'Quiz Accuracy', value: 80, color: 'bg-blue-500' }
              ].map((stat) => (
                <div key={stat.label} className="flex items-center">
                  <span className="w-1/4 text-gray-700 dark:text-gray-300 font-medium">{stat.label}</span>
                  <div className="w-2/4 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mx-4 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${stat.color}`} 
                      style={{ width: `${stat.value}%` }} 
                    />
                  </div>
                  <span className="w-1/4 text-right font-bold text-gray-900 dark:text-white">{stat.value}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Rewards Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                <Star className="text-yellow-500" size={32} fill="currentColor" />
              </div>
              <p className="font-bold text-2xl text-gray-900 dark:text-white mb-1">+150</p>
              <p className="text-gray-600 dark:text-gray-400">XP Earned</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                 <div className="text-3xl">🪙</div>
              </div>
              <p className="font-bold text-2xl text-gray-900 dark:text-white mb-1">+50</p>
              <p className="text-gray-600 dark:text-gray-400">Coins Collected</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                <Award className="text-yellow-500" size={32} />
              </div>
              <p className="font-bold text-2xl text-gray-900 dark:text-white mb-1">+10</p>
              <p className="text-gray-600 dark:text-gray-400">New Rank</p>
            </div>
          </section>

          {/* Level Progress */}
          <section className="bg-white dark:bg-zinc-800 p-8 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-900 dark:text-white">Level 1</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">150/1000 XP to Level 2</span>
              <span className="font-bold text-gray-900 dark:text-white">Level 2</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '15%' }}></div>
            </div>
          </section>

          {/* Continue Button */}
          <footer className="text-center">
            <Link 
              to="/courses"
              className="inline-block bg-green-500 text-white font-bold py-4 px-12 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/40 transform hover:-translate-y-1"
            >
              Continue to Next Lesson
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Achievements;

