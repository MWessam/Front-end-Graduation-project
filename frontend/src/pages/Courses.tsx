import { Star, Check, Lock, Play, Zap, Target, Volume2, Construction, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { gamificationStats, dailyQuests } from '../data/mock';

// Icon mapping for daily quests
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Target,
  Volume2,
};

const Courses = () => {
  const { xp, league } = gamificationStats;

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Main Path Content */}
      <div className="col-span-12 lg:col-span-8 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-16">Start Learning</h2>
        
        <div className="relative flex flex-col items-center space-y-8 w-full max-w-md">
          {/* Connecting Line Background */}
          <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2 -z-10" />

          {/* Node 1: Start */}
          <div className="flex flex-col items-center z-10">
            <Link to="/lesson/1" className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer ring-4 ring-white dark:ring-zinc-900">
              <Star className="text-white fill-current" size={48} />
            </Link>
            <span className="mt-3 text-blue-500 font-bold tracking-widest text-sm bg-white dark:bg-background-dark px-2">START</span>
          </div>

          {/* Node 2: Completed */}
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10 ring-4 ring-white dark:ring-zinc-900">
            <Check className="text-white" size={32} />
          </div>

          {/* Node 3: Complex Group */}
          <div className="relative py-8 w-full flex justify-center">
            <div className="relative">
              {/* Center Node */}
              <div className="w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center shadow-md z-10 relative ring-4 ring-white dark:ring-zinc-900">
                <Star className="text-white fill-current" size={32} />
              </div>
              
              {/* Left Node */}
              <div className="absolute -left-24 top-4 w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center shadow-md ring-4 ring-white dark:ring-zinc-900">
                <Lock className="text-white" size={32} />
              </div>
              
              {/* Right Node */}
              <div className="absolute -right-24 top-8 w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center shadow-md ring-4 ring-white dark:ring-zinc-900">
                <Lock className="text-white" size={32} />
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="py-12 text-gray-500 dark:text-gray-400 text-center bg-background-light dark:bg-background-dark z-10">
            Describe the basic contexts
          </p>

          {/* Jump Button */}
          <div className="flex flex-col items-center z-10">
            <span className="mb-2 text-purple-600 font-bold text-sm tracking-widest">JUMP HERE?</span>
            <button className="w-28 h-28 bg-purple-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform hover:bg-purple-600 ring-4 ring-white dark:ring-zinc-900">
              <Play className="text-white fill-current" size={64} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-12 lg:col-span-4 space-y-8">
        {/* Stats */}
        <div className="flex justify-end items-center space-x-2">
          <img alt="Diamond icon" className="w-7 h-7" src="https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b01574520c19.svg" /> 
          <span className="font-bold text-lg text-gray-800 dark:text-white">{xp}</span>
        </div>

        {/* Super Card */}
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-6 text-white text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-2">SUPER</h3>
          <p className="mb-4">Try Super for free</p>
          <p className="text-sm font-light mb-6">No ads, personalized practice, and unlimited Legendary!</p>
          <button className="w-full bg-white text-blue-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors">
            TRY 1 WEEK FREE
          </button>
        </div>

        {/* League */}
        <div>
          <div className="flex justify-between items-baseline mb-4">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{league}</h4>
            <Link to="#" className="text-sm font-bold text-blue-500 hover:underline">VIEW LEAGUE</Link>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
            <Construction className="text-gray-400" size={32} />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete a lesson to join this week's leaderboard and compete against other learners
            </p>
          </div>
        </div>

        {/* Daily Quests */}
        <div>
          <div className="flex justify-between items-baseline mb-4">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Daily Quests</h4>
            <Link to="#" className="text-sm font-bold text-blue-500 hover:underline">VIEW ALL</Link>
          </div>
          
          <div className="space-y-4">
            {dailyQuests.map((quest) => {
              const IconComponent = iconMap[quest.icon];
              const progress = (quest.current / quest.target) * 100;
              
              return (
                <div key={quest.id} className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      {IconComponent && <IconComponent className={quest.iconColor} size={20} />}
                      <span className="font-bold text-sm text-gray-800 dark:text-white">{quest.title}</span>
                    </div>
                    {IconComponent && <IconComponent className="text-gray-300" size={20} />}
                  </div>
                  <ProgressBar progress={progress} colorClass={quest.progressColor} className="h-2.5" />
                  <span className="block text-right text-xs font-bold text-gray-500 mt-1">
                    {quest.current} / {quest.target}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
