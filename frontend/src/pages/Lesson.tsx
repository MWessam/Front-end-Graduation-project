import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getLessonById } from '../data/mock';

const Lesson = () => {
  const { id } = useParams();
  
  // Get lesson data from mock data
  const lesson = id ? getLessonById(id) : undefined;

  // If lesson not found, redirect to lectures
  if (!lesson) {
    return <Navigate to="/lectures" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
        Lesson {id}: {lesson.title}
      </h1>

      <section className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Lesson Overview</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {lesson.overview}
        </p>
      </section>

      {lesson.videoUrl && (
        <div className="relative rounded-xl overflow-hidden shadow-lg bg-black aspect-video group">
          <video className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity">
            <source src={lesson.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors hover:scale-110 transform duration-200">
              <Play size={32} fill="currentColor" />
            </button>
          </div>
        </div>
      )}

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Insights</h2>
        <ul className="space-y-4">
          {lesson.keyInsights.map((text, i) => (
            <li key={i} className="flex items-start p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-4">
                <CheckCircle className="text-white" size={20} />
              </div>
              <p className="text-gray-700 dark:text-gray-300">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center py-8 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-zinc-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ready to test your knowledge?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Take a short quiz to see what you have learned from this lesson</p>
        <Link 
          to={lesson.relatedQuizId ? `/quiz/${lesson.relatedQuizId}` : '/quiz'} 
          className="inline-flex items-center px-8 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
        >
          Start Quiz
        </Link>
      </section>

      <div className="flex justify-between items-center pt-8">
        {lesson.previousLessonId ? (
          <Link 
            to={`/lesson/${lesson.previousLessonId}`} 
            className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Previous
          </Link>
        ) : (
          <Link 
            to="/lectures" 
            className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back
          </Link>
        )}
        
        {lesson.nextLessonId ? (
          <Link 
            to={`/lesson/${lesson.nextLessonId}`} 
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Next
            <ArrowRight className="ml-2" size={20} />
          </Link>
        ) : (
          <Link 
            to="/lectures" 
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Complete
            <ArrowRight className="ml-2" size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Lesson;
