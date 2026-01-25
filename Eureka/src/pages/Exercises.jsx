import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getQuestionRenderer } from '../exercises/renderers';
import { getValidator } from '../exercises/validators';
import { fetchQuestionsForLesson, fetchQuestionsForReviewQueue, fetchAnswerForQuestion } from '../exercises/api/mockQuestions';
import { InteractionMode } from '../exercises/types';
import './Exercises.css';

const Exercises = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();

  const isReviewQueue = searchParams.get('reviewQueue') === 'true';
  const isLessonMode = Boolean(lessonId);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [checking, setChecking] = useState(false);

  const currentQuestion = questions[currentIndex] ?? null;
  const userAnswer = userAnswers[currentIndex] ?? null;

  const handleClose = () => {
    if (isLessonMode) navigate(`/lessons/${lessonId}`);
    else navigate('/student');
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const fetch = isReviewQueue ? fetchQuestionsForReviewQueue() : fetchQuestionsForLesson(lessonId || '1');
    fetch
      .then((list) => {
        if (!cancelled) {
          setQuestions(list);
          setCurrentIndex(0);
          setUserAnswers({});
          setFeedback(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? 'Failed to load questions');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [lessonId, isReviewQueue]);

  const handleAnswerChange = useCallback((value) => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: value }));
    setFeedback(null);
  }, [currentIndex]);

  const handleCheck = async () => {
    if (!currentQuestion) return;
    setChecking(true);
    setFeedback(null);
    try {
      const answer = await fetchAnswerForQuestion(currentQuestion.questionId);
      const validate = getValidator(answer.answerValidationType);
      const result = validate(userAnswer ?? {}, answer.expectedAnswerBody);
      setFeedback(result);
    } catch (e) {
      setFeedback({ correct: false, feedback: e?.message ?? 'Validation failed' });
    } finally {
      setChecking(false);
    }
  };

  const handleStartOver = useCallback(() => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentIndex];
      return next;
    });
    setFeedback(null);
  }, [currentIndex]);

  const handlePrevious = () => {
    if (currentIndex <= 0) return;
    setCurrentIndex((i) => i - 1);
    setFeedback(null);
  };

  const handleNext = () => {
    if (currentIndex >= questions.length - 1) return;
    setCurrentIndex((i) => i + 1);
    setFeedback(null);
  };

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const modeLabel = isReviewQueue ? 'Review queue' : (isLessonMode ? `Exercises for lesson ${lessonId}` : 'Exercises');

  const Renderer = currentQuestion ? getQuestionRenderer(currentQuestion.questionType) : null;
  const interactionMode = currentQuestion?.questionBody?.interactionMode ?? InteractionMode.DISPLAY_SELECT;

  return (
    <div className="exercises-page">
      <div className="exercises-container">
          <header className="exercises-header">
            <button type="button" onClick={handleClose} className="exercises-close" aria-label="Close">
              <span className="material-icons">close</span>
            </button>
            <div className="exercises-header-center">
              <h1 className="exercises-title">{modeLabel}</h1>
              <div className="exercises-progress-bar">
                <div className="exercises-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="exercises-step-dots">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`exercises-step-dot ${i === currentIndex ? 'exercises-step-dot-current' : ''}`}
                    onClick={() => { setCurrentIndex(i); setFeedback(null); }}
                    aria-label={`Question ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="exercises-points">
              <span className="material-icons exercises-points-icon">bolt</span>
              <span>0</span>
            </div>
          </header>

          {loading && (
            <div className="exercises-loading">
              <span className="material-icons spin">refresh</span>
              <p>Loading questions…</p>
            </div>
          )}

          {error && (
            <div className="exercises-error">
              <span className="material-icons">error_outline</span>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && questions.length === 0 && (
            <div className="exercises-empty">
              <span className="material-icons">quiz</span>
              <p>No questions available.</p>
            </div>
          )}

          {!loading && !error && currentQuestion && (
            <>
              <div className="exercises-main-wrap">
                <section className="exercises-main">
                  {currentQuestion.questionBody?.context && (
                    <p className="exercises-context">{currentQuestion.questionBody.context}</p>
                  )}
                  <h2 className="exercises-prompt">{currentQuestion.questionHead}</h2>

                  {Renderer ? (
                    <Renderer
                      questionType={currentQuestion.questionType}
                      interactionMode={interactionMode}
                      questionBody={currentQuestion.questionBody}
                      value={userAnswer}
                      onChange={handleAnswerChange}
                      disabled={!!feedback}
                    />
                  ) : (
                    <p className="exercises-unknown-type">No renderer for question type: {currentQuestion.questionType}</p>
                  )}

                  <div className="exercises-actions">
                    <button type="button" onClick={handleStartOver} className="exercises-start-over">
                      <span className="material-icons">refresh</span>
                      Start over
                    </button>
                  </div>

                  {feedback && (
                    <div className={`exercises-feedback ${feedback.correct ? 'exercises-feedback-correct' : 'exercises-feedback-incorrect'}`}>
                      <span className="material-icons">{feedback.correct ? 'check_circle' : 'cancel'}</span>
                      <p>{feedback.correct ? 'Correct!' : (feedback.feedback ?? 'Not quite.')}</p>
                    </div>
                  )}
                </section>
              </div>

              <footer className="exercises-footer">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="exercises-nav exercises-nav-prev"
                  disabled={currentIndex <= 0}
                >
                  <span className="material-icons">arrow_back</span>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={checking || !!feedback}
                  className="exercises-check-btn"
                >
                  {checking ? (
                    <>
                      <span className="material-icons spin">refresh</span>
                      Checking…
                    </>
                  ) : (
                    <>
                      <span className="material-icons">check</span>
                      Check
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="exercises-nav exercises-nav-next"
                  disabled={currentIndex >= questions.length - 1}
                >
                  Next
                  <span className="material-icons">arrow_forward</span>
                </button>
              </footer>
            </>
          )}
        </div>
    </div>
  );
};

export default Exercises;
