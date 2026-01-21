import React, { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, MousePointer, Monitor, Wifi, Battery } from 'lucide-react';
import { Link } from 'react-router-dom';

const Instructions = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-zinc-700">
        <header className="bg-sky-500 text-white p-8 text-center">
          <h1 className="text-3xl font-bold">Programming Fundamentals Exam</h1>
          <p className="text-sky-100 mt-2">Please read the instructions carefully before starting</p>
        </header>

        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Exam Overview</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-sky-500" size={20} />
                <span>Total Questions: <strong>20 Multiple Choice Questions</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-sky-500" size={20} />
                <span>Time Limit: <strong>30 minutes</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <AlertTriangle className="text-sky-500" size={20} />
                <span>Passing Score: <strong>70% (14 correct answers)</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <MousePointer className="text-sky-500" size={20} />
                <span>Navigation: You can navigate between questions using Previous and Next buttons</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Important Guidelines</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <div className="flex gap-3">
                <AlertTriangle className="text-yellow-500 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Please Note</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>Do not refresh the page during the exam</li>
                    <li>Your answers will be automatically saved</li>
                    <li>The timer will continue even if you close the browser</li>
                    <li>You cannot pause the exam once started</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technical Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Wifi className="text-sky-500" size={18} /> Stable internet
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="text-sky-500" size={18} /> Modern browser
              </div>
              <div className="flex items-center gap-2">
                <Battery className="text-sky-500" size={18} /> Device charged
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-200 dark:border-zinc-700">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-sky-500 focus:ring-sky-500 cursor-pointer"
              />
              <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                I have read and understood all the instructions. I am ready to begin the exam and agree to abide by all the rules and guidelines.
              </span>
            </label>
          </div>

          <div className="text-center">
            <Link 
              to="/exam"
              onClick={(e) => !agreed && e.preventDefault()}
              className={`inline-block px-12 py-4 rounded-xl font-bold text-white transition-all ${
                agreed 
                  ? 'bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/30 transform hover:-translate-y-1' 
                  : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              }`}
            >
              Start Exam
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;

