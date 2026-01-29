import { Link } from 'react-router-dom';
import { Code, Database, Layout, Terminal, Cpu, type LucideIcon } from 'lucide-react';
import { programmingLectures } from '../data/mock';

// Icon mapping - converts icon name strings to actual icon components
const iconMap: Record<string, LucideIcon> = {
  Code,
  Database,
  Layout,
  Terminal,
  Cpu,
};

const Lectures = () => {
  return (
    <div className="space-y-8">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Programming</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">A Comprehensive series of lectures to master the fundamentals</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {programmingLectures.map((lecture) => {
          const IconComponent = iconMap[lecture.iconName];
          return (
            <div key={lecture.id} className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-shadow flex flex-col">
              <div className="p-6 flex-1">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                  {IconComponent && <IconComponent className="text-green-600 dark:text-green-400" size={24} />}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{lecture.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{lecture.description}</p>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Link 
                  to={`/lesson/${lecture.lessonId}`}
                  className="block w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white text-center font-bold rounded-xl transition-colors"
                >
                  View Lecture
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lectures;
