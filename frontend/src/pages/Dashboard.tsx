import React from 'react';
import { Star, FileText, Brain, PenTool } from 'lucide-react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';

const Dashboard = () => {
  const courses = [
    { name: 'Arabic', grade: 'A+', progress: 95, color: 'bg-green-500' },
    { name: 'Programming', grade: 'B+', progress: 80, color: 'bg-yellow-400' },
    { name: 'Science', grade: 'A+', progress: 95, color: 'bg-green-500' },
    { name: 'English', grade: 'A+', progress: 90, color: 'bg-green-500' },
    { name: 'Maths', grade: 'B+', progress: 66, color: 'bg-green-500' },
  ];

  const assignments = [
    {
      title: 'Psychology Paper 2',
      subtitle: 'Due this week',
      icon: FileText,
      iconBg: 'bg-blue-500',
      iconColor: 'text-white',
      bg: 'bg-blue-100 dark:bg-blue-900/40',
    },
    {
      title: 'Problem Solving',
      subtitle: 'Due this week',
      icon: Brain,
      iconBg: 'bg-purple-600/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-slate-50 dark:bg-zinc-800',
    },
    {
      title: 'Art History Essay',
      subtitle: 'Due this week',
      icon: PenTool,
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-slate-50 dark:bg-zinc-800',
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">My Progress</h2>

        <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 px-4 py-2 rounded-full shadow-sm">
          <Star className="text-yellow-500 dark:text-yellow-400 fill-current" size={20} />
          <span className="font-semibold text-yellow-600 dark:text-yellow-300">440</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT Section */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <p className="text-gray-500 dark:text-gray-400">Overall Grade</p>
              <p className="text-5xl font-bold my-2 text-gray-900 dark:text-white">88%</p>
              <p className="text-green-500 font-medium">Keep up the great work!</p>
            </Card>

            <Card>
              <p className="text-gray-500 dark:text-gray-400">Courses Completed</p>
              <p className="text-5xl font-bold my-2 text-gray-900 dark:text-white">4</p>
              <p className="text-green-500 font-medium">Keep up the great work!</p>
            </Card>

            <Card>
              <p className="text-gray-500 dark:text-gray-400">Upcoming Deadlines</p>
              <p className="text-5xl font-bold my-2 text-gray-900 dark:text-white">3</p>
              <p className="text-green-500 font-medium">Due this week</p>
            </Card>
          </div>

          {/* TABLE */}
          <Card className="overflow-hidden p-0">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 dark:bg-zinc-700/50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Course Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Current Grade</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                {courses.map((course) => (
                  <tr key={course.name} className="hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{course.name}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{course.grade}</td>
                    <td className="p-4 w-1/3">
                      <div className="flex items-center gap-4">
                        <ProgressBar progress={course.progress} colorClass={course.color} />
                        <span className="font-semibold text-sm text-gray-700 dark:text-gray-300 min-w-[2.5rem]">{course.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* RIGHT Section */}
        <div className="col-span-12 lg:col-span-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Assignments</h3>

          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.title} className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${assignment.bg}`}>
                <div className={`p-2 rounded-xl ${assignment.iconBg}`}>
                  <assignment.icon className={assignment.iconColor} size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{assignment.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

