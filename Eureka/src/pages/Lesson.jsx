import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStudentData } from '../hooks/useStudentData';
import { contentService } from '../services/contentService';
import './Lesson.css';
import './Concept.css';

const Lesson = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const studentData = useStudentData();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = contentService.getLessonById(id);
    if (data) {
      setLessonData(data);
    }
    setLoading(false);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartExercise = () => {
    navigate(`/lessons/${id}/exercises`);
  };

  if (loading) return <div className="loading">Loading lesson...</div>;
  if (!lessonData) return <div className="error">Lesson not found</div>;

  const renderBlock = (block) => {
    switch (block.type) {
      case 'title':
        return <h1 key={block.id} className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8">{block.content}</h1>;
      case 'h1':
        return <h1 key={block.id} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">{block.content}</h1>;
      case 'h2':
        return <h2 key={block.id} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">{block.content}</h2>;
      case 'h3':
        return <h3 key={block.id} className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">{block.content}</h3>;
      case 'h4':
        return <h4 key={block.id} className="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-4">{block.content}</h4>;
      case 'paragraph':
        return <p key={block.id} className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">{block.content}</p>;
      case 'bullet_list':
        return (
          <ul key={block.id} className="space-y-4 mb-8 list-disc list-inside">
            {block.content.split('\n').filter(li => li.trim()).map((item, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 text-lg">{item}</li>
            ))}
          </ul>
        );
      case 'numbered_list':
        return (
          <ol key={block.id} className="space-y-4 mb-8 list-decimal list-inside">
            {block.content.split('\n').filter(li => li.trim()).map((item, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 text-lg">{item}</li>
            ))}
          </ol>
        );
      case 'video':
        return (
          <div key={block.id} className="video-container mb-10 rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="500"
              src={block.content.replace('watch?v=', 'embed/')}
              title="Video content"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      case 'image':
        return (
          <div key={block.id} className="image-container mb-10">
            <img src={block.content} alt="Content" className="w-full rounded-2xl shadow-xl" />
          </div>
        );
      case 'audio':
        return (
          <div key={block.id} className="audio-container mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
            <audio src={block.content} controls className="w-full" />
          </div>
        );
      case 'code':
        return (
          <div key={block.id} className="bg-slate-900 rounded-2xl p-8 text-sm mb-8 font-mono overflow-x-auto shadow-xl">
            <pre><code className="text-slate-200">{block.content}</code></pre>
          </div>
        );
      case 'gamma':
        return (
          <div key={block.id} className="gamma-card p-10 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 rounded-3xl mb-10 shadow-sm">
            <div className="flex items-start gap-6">
              <span className="material-icons text-indigo-500 text-4xl">auto_awesome</span>
              <p className="text-indigo-900 dark:text-indigo-200 text-xl leading-relaxed italic">
                {block.content}
              </p>
            </div>
          </div>
        );
      case 'question':
        return (
          <div key={block.id} className="question-block p-8 border-2 border-primary/20 rounded-3xl mb-10 bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-bold mb-6">{typeof block.content === 'object' ? block.content.question : 'Interactive Question'}</h3>
            <div className="space-y-3">
              {typeof block.content === 'object' && block.content.options?.map((opt, i) => (
                <button key={i} className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderCard = (card) => {
    return (
      <section key={card.id} className="card-presentation mb-16 p-8 sm:p-12 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-[2.5rem] shadow-sm">
        {card.blocks.map(renderBlock)}
      </section>
    );
  };

  return (
    <div className="flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      <Sidebar studentData={studentData} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl">{lessonData.subject.icon}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">{lessonData.subject.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {lessonData.title}
            </h1>
          </header>

          {/* Content Cards */}
          <main className="lesson-content">
            {lessonData.contentCards.map(renderCard)}
          </main>

          {/* Footer Navigation */}
          <footer className="lesson-footer mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <span className="material-icons mr-2">arrow_back</span>
                Back
              </button>
              <button
                onClick={handleStartExercise}
                className="flex items-center px-8 py-3 bg-primary text-white text-base font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-200 dark:shadow-none transition-all"
              >
                Start Exercises
                <span className="material-icons ml-2">play_arrow</span>
              </button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Lesson;
