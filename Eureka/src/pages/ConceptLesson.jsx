import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConceptLesson.css';

const ConceptLesson = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Download functionality can be implemented later
    alert('Download functionality coming soon!');
  };

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  const concepts = [
    {
      id: 1,
      icon: 'images/calculate 1.png',
      title: 'Concept of a function',
      description: 'A block of organized, reusable code that is written to perform a specific task.'
    },
    {
      id: 2,
      icon: 'images/calcculate 1.png',
      title: 'Defining and calling a function',
      description: 'Learn how to define functions and call them in your code.'
    },
    {
      id: 3,
      icon: 'images/1.png',
      title: 'Function arguments',
      description: 'Understand how to pass data to functions using parameters.'
    },
    {
      id: 4,
      icon: 'images/v1.png',
      title: 'Scope of variable',
      description: 'Learn about local and global variable scope in functions.'
    }
  ];

  const summaryPoints = [
    'A function is a block of organized, reusable code',
    'Functions help programmers avoid repeating the same steps',
    'Functions can accept parameters and return values',
    'Variables inside functions have local scope by default'
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Introduction to Python Functions</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="material-icons text-xl">print</span>
            <span>Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-full hover:opacity-90 transition-opacity"
          >
            <span className="material-icons text-xl">download</span>
            <span>Download</span>
          </button>
        </div>
      </header>

      {/* Concept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {concepts.map((concept) => (
          <div
            key={concept.id}
            className="concept-card bg-background-light dark:bg-gray-800 p-6 border border-primary-light dark:border-green-800 rounded-lg"
          >
            <img
              alt={`${concept.title} icon`}
              className="h-16 w-16 mb-4"
              src={concept.icon}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{concept.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{concept.description}</p>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Summary</h2>
        <div className="bg-background-light dark:bg-gray-800 p-8 border border-primary-light dark:border-green-800 rounded-lg">
          <ul className="space-y-4 list-disc list-inside text-gray-600 dark:text-gray-300">
            {summaryPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Start Quiz Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to test your Knowledge</h2>
        <button
          onClick={handleStartQuiz}
          className="px-10 py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          Start Quiz
        </button>
      </div>

      {/* Footer Navigation */}
      <footer className="mt-16">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="material-icons">arrow_back</span>
          <span>Back</span>
        </button>
      </footer>
    </div>
  );
};

export default ConceptLesson;
