import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Instructions.css';

const Instructions = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleStartExam = () => {
    // Store exam start time in localStorage
    const examStartTime = new Date().getTime();
    localStorage.setItem('examStartTime', examStartTime);

    // Navigate to teacher quiz page
    navigate('/teacher-quiz');
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-6 text-center">
            <h1 className="text-3xl font-bold">Programming Fundamentals Exam</h1>
            <p className="text-blue-100 mt-2">Please read the instructions carefully before starting</p>
          </div>

          {/* Instructions Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Exam Overview */}
              <section>
                <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">
                  Exam Overview
                </h2>
                <ul className="space-y-3 text-text-light-secondary dark:text-text-dark-secondary">
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 text-lg">check_circle</span>
                    <span>
                      Total Questions: <strong>20 Multiple Choice Questions</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 text-lg">check_circle</span>
                    <span>
                      Time Limit: <strong>30 minutes</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 text-lg">check_circle</span>
                    <span>
                      Passing Score: <strong>70% (14 correct answers)</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 text-lg">check_circle</span>
                    <span>Navigation: You can navigate between questions using Previous and Next buttons</span>
                  </li>
                </ul>
              </section>

              {/* Question Navigation */}
              <section>
                <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">
                  Question Navigation
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-6 h-6 rounded bg-red-600" />
                    <span>Unanswered Question</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-6 h-6 rounded bg-slate-300 dark:bg-slate-500" />
                    <span>Not Visited Question</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-6 h-6 rounded bg-blue-500" />
                    <span>Reviewed Question</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-6 h-6 rounded bg-green-500" />
                    <span>Answered Question</span>
                  </div>
                </div>
              </section>

              {/* Important Guidelines */}
              <section>
                <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">
                  Important Guidelines
                </h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="material-icons text-yellow-500">warning</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Please Note</h3>
                      <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Do not refresh the page during the exam</li>
                          <li>Your answers will be automatically saved</li>
                          <li>The timer will continue even if you close the browser</li>
                          <li>You cannot pause the exam once started</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Technical Requirements */}
              <section>
                <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">
                  Technical Requirements
                </h2>
                <ul className="space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 text-lg">computer</span>
                    <span>Stable internet connection required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 text-lg">visibility</span>
                    <span>Use a modern browser (Chrome, Firefox, Safari, or Edge)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 text-lg">power</span>
                    <span>Ensure your device is charged or plugged in</span>
                  </li>
                </ul>
              </section>
            </div>

            {/* Agreement Checkbox */}
            <div className="mt-8 p-4 border border-border-light dark:border-border-dark rounded-lg">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 mr-3 rounded text-primary focus:ring-primary w-5 h-5"
                />
                <span className="text-text-light-secondary dark:text-text-dark-secondary">
                  I have read and understood all the instructions. I am ready to begin the exam and agree to abide by
                  all the rules and guidelines.
                </span>
              </label>
            </div>

            {/* Start Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleStartExam}
                disabled={!agreed}
                className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
