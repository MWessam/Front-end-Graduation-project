import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Concept.css';

const Concept = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate('/concept-lesson');
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 antialiased min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">Concept Of Function</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Understanding The Fundamental Building Block Of Mathmatics And Programming
        </p>
      </header>

      <main className="space-y-6">
        {/* Introduction Section */}
        <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            A function in programming is a block of organized, reusable code that is written to perform a single, related action. 
            Instead of writing the same code multiple times, you can put it inside a function and simply call that function whenever you need it.
          </p>
        </section>

        {/* Definition Section */}
        <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Definition</h2>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              A function in programming is a block of organized, reusable code that is written to perform a single, related action. 
              Instead of writing the same code multiple times.
            </p>
          </div>
        </section>

        {/* Real-Life Analogy Section */}
        <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Real-Life Analogy</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            It helps programmers avoid repeating the same steps over and over again — just like you don't rebuild a coffee machine 
            every time you want coffee. Think of a function like a vending machine or a coffee machine.
          </p>
        </section>

        {/* Mathematical View Section */}
        <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mathematical View</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            It helps programmers avoid repeating the same steps over and over again — just like you don't rebuild a coffee machine 
            every time you want coffee.
          </p>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-gray-800 dark:text-gray-200">
            <p>
              <span className="font-semibold">Example :</span> If we have the function{' '}
              <span className="text-primary font-bold">f(x) = x + 5</span>
            </p>
            <p className="mt-2">
              input : <span className="text-primary font-bold">x = 3</span>
            </p>
            <p className="mt-2">
              process : <span className="text-primary font-bold">f(3) = 3 + 5</span>
            </p>
            <p className="mt-2">
              output : <span className="font-bold">8</span>
            </p>
          </div>
        </section>

        {/* Programming View Section */}
        <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50">
          <h2 className="text-2xl font-bold text-primary mb-4">Programming View</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            It helps programmers avoid repeating the same steps over and over again — just like you don't rebuild a coffee machine 
            every time you want coffee.
          </p>
          <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-6 text-sm">
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
        </section>

        {/* Key Takeaways Section */}
        <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Takeaways</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="material-icons text-primary text-2xl mr-3">check_circle</span>
              <span className="text-gray-700 dark:text-gray-300">
                Think of a function like a vending machine or a coffee machine.
              </span>
            </li>
            <li className="flex items-start">
              <span className="material-icons text-primary text-2xl mr-3">check_circle</span>
              <span className="text-gray-700 dark:text-gray-300">
                reusable block of code that performs one specific job.
              </span>
            </li>
            <li className="flex items-start">
              <span className="material-icons text-primary text-2xl mr-3">check_circle</span>
              <span className="text-gray-700 dark:text-gray-300">
                block of organized, reusable code that is written to perform a specific task.
              </span>
            </li>
          </ul>
        </section>

        {/* Real-Life Analogy (Duplicate Section) */}
        <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Real-Life Analogy</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            It helps programmers avoid repeating the same steps over and over again — just like you don't rebuild a coffee machine 
            every time you want coffee.
          </p>
        </section>
      </main>

      {/* Footer Navigation */}
      <footer className="mt-12 flex justify-between items-center">
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
      </footer>
    </div>
  );
};

export default Concept;
