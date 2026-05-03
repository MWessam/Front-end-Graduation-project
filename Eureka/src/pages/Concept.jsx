import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../services/contentService';
import './Concept.css';

const Concept = () => {
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, concept page defaults to lesson '1'
    const data = contentService.getLessonById('1');
    if (data) {
      setLessonData(data);
    }
    setLoading(false);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate('/quiz');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!lessonData) return <div className="error">Content not found</div>;

  const renderBlock = (block) => {
    switch (block.type) {
      case 'title':
        return null; // Handled in header
      case 'h1':
      case 'h2':
        return <h2 key={block.id} className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{block.content}</h2>;
      case 'paragraph':
        return <p key={block.id} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{block.content}</p>;
      case 'gamma':
        return (
           <div key={block.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
            <p className="text-gray-700 dark:text-gray-300 italic">{block.content}</p>
          </div>
        );
      case 'code':
        return (
          <div key={block.id} className="bg-gray-800 dark:bg-gray-900 rounded-lg p-6 text-sm mb-4">
            <pre className="code-block">
              <code className="language-javascript" style={{ color: '#d4d4d4' }}>
                {block.content}
              </code>
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 antialiased min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">{lessonData.title}</h1>
        {lessonData.description && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {lessonData.description}
          </p>
        )}
      </header>

      <main className="space-y-6">
        {lessonData.contentCards.map(card => (
          <section key={card.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50">
            {card.blocks.map(renderBlock)}
          </section>
        ))}
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
