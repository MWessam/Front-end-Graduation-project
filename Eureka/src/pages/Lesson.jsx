import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import './Lesson.css';
import './Concept.css';
import './ConceptLesson.css';

const Lesson = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const studentData = useStudentData();
  const [currentView, setCurrentView] = useState('concept'); // 'concept' or 'lesson'

  // Mock lesson data - will be replaced with API call
  const [lessonData] = useState({
    id: id,
    title: 'Introduction to Arabic',
    titleArabic: 'مقدمة في اللغة العربية',
    description: 'Understanding The Fundamental Building Block Of Arabic Language',
    subject: {
      id: 1,
      name: 'Arabic',
      icon: '🇸🇦'
    }
  });

  const handleBack = () => {
    navigate(-1); // Go back to roadmap
  };

  const handleNext = () => {
    setCurrentView('lesson');
  };

  const handlePrevious = () => {
    setCurrentView('concept');
  };

  const handleStartExercise = () => {
    // Navigate to exercises - will be implemented later
    navigate(`/lessons/${id}/exercises`);
  };

  // Concept data
  const conceptSections = [
    {
      title: 'Introduction',
      content: 'A function in programming is a block of organized, reusable code that is written to perform a single, related action. Instead of writing the same code multiple times, you can put it inside a function and simply call that function whenever you need it.'
    },
    {
      title: 'Definition',
      content: 'A function in programming is a block of organized, reusable code that is written to perform a single, related action. Instead of writing the same code multiple times.'
    },
    {
      title: 'Real-Life Analogy',
      content: 'It helps programmers avoid repeating the same steps over and over again — just like you don\'t rebuild a coffee machine every time you want coffee. Think of a function like a vending machine or a coffee machine.'
    },
    {
      title: 'Mathematical View',
      content: 'It helps programmers avoid repeating the same steps over and over again — just like you don\'t rebuild a coffee machine every time you want coffee.',
      example: {
        function: 'f(x) = x + 5',
        input: 'x = 3',
        process: 'f(3) = 3 + 5',
        output: '8'
      }
    },
    {
      title: 'Programming View',
      content: 'It helps programmers avoid repeating the same steps over and over again — just like you don\'t rebuild a coffee machine every time you want coffee.',
      code: `function add(a, b) {
  return a + b;
}
const result = add(5, 10); // result is 15`
    }
  ];

  const keyTakeaways = [
    'Think of a function like a vending machine or a coffee machine.',
    'reusable block of code that performs one specific job.',
    'block of organized, reusable code that is written to perform a specific task.'
  ];

  // ConceptLesson data
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
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Sidebar */}
      <Sidebar studentData={studentData} />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {currentView === 'concept' ? (
          /* Concept View */
          <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl">{lessonData.subject.icon}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{lessonData.subject.name}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                {lessonData.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {lessonData.description}
              </p>
            </header>

            {/* Content Sections */}
            <main className="space-y-6">
              {conceptSections.map((section, index) => (
                <section
                  key={index}
                  className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.content}
                  </p>

                  {/* Mathematical Example */}
                  {section.example && (
                    <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-gray-800 dark:text-gray-200 mt-4">
                      <p>
                        <span className="font-semibold">Example :</span> If we have the function{' '}
                        <span className="text-primary font-bold">{section.example.function}</span>
                      </p>
                      <p className="mt-2">
                        input : <span className="text-primary font-bold">{section.example.input}</span>
                      </p>
                      <p className="mt-2">
                        process : <span className="text-primary font-bold">{section.example.process}</span>
                      </p>
                      <p className="mt-2">
                        output : <span className="font-bold">{section.example.output}</span>
                      </p>
                    </div>
                  )}

                  {/* Code Example */}
                  {section.code && (
                    <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-6 text-sm mt-4">
                      <pre className="code-block">
                        <code className="language-javascript" style={{ color: '#d4d4d4' }}>
                          <span style={{ color: '#569cd6' }}>function</span>{' '}
                          <span style={{ color: '#dcdcaa' }}>add</span>(
                          <span style={{ color: '#9cdcfe' }}>a</span>,{' '}
                          <span style={{ color: '#9cdcfe' }}>b</span>) {'{'}
                          <br />
                          {'  '}
                          <span style={{ color: '#c586c0' }}>return</span> a + b;
                          <br />
                          {'}'}
                          <br />
                          <span style={{ color: '#569cd6' }}>const</span>{' '}
                          <span style={{ color: '#9cdcfe' }}>result</span> ={' '}
                          <span style={{ color: '#dcdcaa' }}>add</span>(
                          <span style={{ color: '#b5cea8' }}>5</span>,{' '}
                          <span style={{ color: '#b5cea8' }}>10</span>);{' '}
                          <span style={{ color: '#6a9955' }}>// result is 15</span>
                        </code>
                      </pre>
                    </div>
                  )}
                </section>
              ))}

              {/* Key Takeaways */}
              <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Key Takeaways
                </h2>
                <ul className="space-y-3">
                  {keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start">
                      <span className="material-icons text-primary text-2xl mr-3">check_circle</span>
                      <span className="text-gray-700 dark:text-gray-300">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </main>

            {/* Footer Navigation */}
            <footer className="lesson-footer mt-12">
              <div className="lesson-footer-row">
              <button
                onClick={handleBack}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-background-dark transition-colors"
              >
                <span className="material-icons mr-2">arrow_back</span>
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark transition-colors"
              >
                Next
                <span className="material-icons ml-2">arrow_forward</span>
              </button>
              </div>
            </footer>
          </div>
        ) : (
          /* ConceptLesson View */
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{lessonData.subject.icon}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{lessonData.subject.name}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {lessonData.title}
              </h1>
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
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {concept.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{concept.description}</p>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Summary
              </h2>
              <div className="bg-background-light dark:bg-gray-800 p-8 border border-primary-light dark:border-green-800 rounded-lg">
                <ul className="space-y-4 list-disc list-inside text-gray-600 dark:text-gray-300">
                  {summaryPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Navigation */}
            <footer className="lesson-footer mt-16">
              <div className="lesson-footer-row">
              <div className="lesson-footer-left">
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="material-icons">arrow_back</span>
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleBack}
                  className="flex items-center space-x-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="material-icons">home</span>
                  <span>Back to Roadmap</span>
                </button>
              </div>
              <button
                onClick={handleStartExercise}
                className="flex items-center space-x-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl"
              >
                <span className="material-icons">play_arrow</span>
                <span>Start Exercise</span>
              </button>
              </div>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default Lesson;
