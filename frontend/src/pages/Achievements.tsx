import { Award, Star, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { lessonCompleteData } from '../data/mock';

// Icon mapping for rewards
const iconMap: Record<string, LucideIcon | null> = {
  Star,
  Award,
};

const Achievements = () => {
  const { width, height } = useWindowSize();
  
  // Get achievement data from mock
  const { title, subtitle, performanceStats, rewards, levelProgress } = lessonCompleteData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />
      
      <div className="max-w-4xl w-full mx-auto space-y-8 z-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 animate-bounce">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{subtitle}</p>
        </header>

        <div className="space-y-8">
          {/* Performance Overview */}
          <section className="bg-white dark:bg-zinc-800 p-8 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Performance Overview</h2>
            <div className="space-y-6">
              {performanceStats.map((stat) => (
                <div key={stat.id} className="flex items-center">
                  <span className="w-1/4 text-gray-700 dark:text-gray-300 font-medium">{stat.label}</span>
                  <div className="w-2/4 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mx-4 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${stat.colorClass}`} 
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
            {rewards.map((reward) => {
              const IconComponent = reward.icon ? iconMap[reward.icon] : null;
              const isEmoji = reward.icon && !iconMap[reward.icon];
              
              return (
                <div 
                  key={reward.id}
                  className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                    {isEmoji ? (
                      <div className="text-3xl">{reward.icon}</div>
                    ) : IconComponent ? (
                      <IconComponent className="text-yellow-500" size={32} fill={reward.type === 'xp' ? 'currentColor' : 'none'} />
                    ) : (
                      <Star className="text-yellow-500" size={32} />
                    )}
                  </div>
                  <p className="font-bold text-2xl text-gray-900 dark:text-white mb-1">+{reward.amount}</p>
                  <p className="text-gray-600 dark:text-gray-400">{reward.label}</p>
                </div>
              );
            })}
          </section>

          {/* Level Progress */}
          <section className="bg-white dark:bg-zinc-800 p-8 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-900 dark:text-white">Level {levelProgress.currentLevel}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {levelProgress.currentXP}/{levelProgress.xpRequired} XP to Level {levelProgress.nextLevel}
              </span>
              <span className="font-bold text-gray-900 dark:text-white">Level {levelProgress.nextLevel}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-green-500 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${levelProgress.progressPercentage}%` }}
              />
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
