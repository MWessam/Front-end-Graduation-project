import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Database, Layout, Terminal, Cpu } from 'lucide-react';
import Card from '../components/Card';

const lectures = [
  {
    title: 'Introduction to variable data types',
    description: 'Learn about different data types and how to use variables in programming',
    icon: Code,
    link: '/lesson/1'
  },
  {
    title: 'Understanding the control flow',
    description: 'Master conditional statements and loops for program control',
    icon: Cpu,
    link: '/lesson/2'
  },
  {
    title: 'Functions and modularity',
    description: 'Create reusable code with functions and understand modular programming',
    icon: Terminal,
    link: '/lesson/3'
  },
  {
    title: 'MySQL and Database',
    description: 'Learn database fundamentals and SQL queries with MySQL',
    icon: Database,
    link: '/lesson/4'
  },
  {
    title: 'HTML and Definition',
    description: 'Build web page structure with HyperText Markup Language',
    icon: Layout,
    link: '/lesson/5'
  }
];

const Lectures = () => {
  return (
    <div className="space-y-8">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Programming</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">A Comprehensive series of lectures to master the fundamentals</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {lectures.map((lecture, index) => (
          <div key={index} className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-shadow flex flex-col">
            <div className="p-6 flex-1">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <lecture.icon className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{lecture.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{lecture.description}</p>
            </div>
            <div className="p-6 pt-0 mt-auto">
              <Link 
                to={lecture.link}
                className="block w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white text-center font-bold rounded-xl transition-colors"
              >
                View Lecture
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lectures;

