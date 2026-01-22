import React from 'react';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';

const Classes = () => {
  const studentData = useStudentData();

  return (
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Sidebar */}
      <Sidebar studentData={studentData} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Classes</h1>
        <p className="text-gray-500 dark:text-gray-400">Classes page - to be implemented</p>
      </main>
    </div>
  );
};

export default Classes;
