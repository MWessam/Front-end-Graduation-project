import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonLec.css';

const LessonLec = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate('/quiz');
  };

  const insights = [
    {
      id: 1,
      text: 'A function in programming is a block of organized, reusable code that is written to perform a single, related action. Instead of writing.',
      active: true
    },
    {
      id: 2,
      text: 'It helps avoid repetition — instead of writing the same code many times, you write it once inside a function.',
      active: false
    },
    {
      id: 3,
      text: 'You can call the function whenever you need to use that task again.',
      active: true
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <main className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Lesson 1: Introduction to Programming
        </h1>

        {/* Lesson Overview */}
        <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Lesson Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">
            A function in programming is a block of organized, reusable code that is written to perform a single, related action. 
            Instead of writing the same code multiple times, you can put it inside a function and simply call that function whenever you need it.
          </p>
        </section>

        {/* Video Player */}
        <div className="relative rounded-lg overflow-hidden shadow-lg video-container">
          <video
            ref={videoRef}
            id="lessonVideo"
            className="w-full h-auto"
            poster="images/image copy 2.png"
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={isPlaying ? handlePause : handlePlay}
          >
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {showOverlay && (
            <div
              id="videoOverlay"
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer"
              onClick={handlePlay}
            >
              <button
                id="playButton"
                className="bg-white bg-opacity-30 backdrop-blur-sm rounded-full p-4 text-white hover:bg-opacity-50 transition-all"
              >
                <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent video-controls">
            <div className="flex items-center justify-between text-white text-xs">
              <span id="currentTime">{formatTime(currentTime)}</span>
              <div className="w-full mx-4 bg-white/30 h-1 rounded-full progress-bar-container">
                <div
                  id="progressBar"
                  className="bg-blue-500 h-1 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span id="duration">{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Insights</h2>
          <ul className="space-y-3">
            {insights.map((insight) => (
              <li
                key={insight.id}
                className={`insight-item flex items-center p-4 border rounded-full ${
                  insight.active
                    ? 'border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark'
                    : 'border-transparent bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    insight.active ? 'bg-primary' : 'bg-gray-600 dark:bg-gray-400'
                  }`}
                >
                  <span
                    className={`material-icons-outlined text-xl ${
                      insight.active ? 'text-white' : 'text-white dark:text-gray-800'
                    }`}
                  >
                    check
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{insight.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Ready to Test Section */}
        <section className="text-center pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to test your knowledge</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Take a short quiz to see what you have learned from this lesson
          </p>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8">
          <button
            onClick={handleBack}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-icons-outlined mr-2">arrow_back</span>
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Next
            <span className="material-icons-outlined ml-2">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default LessonLec;
