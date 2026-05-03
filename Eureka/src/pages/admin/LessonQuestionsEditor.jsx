import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { QuestionType, InteractionMode, AnswerValidationType } from '../../exercises/types';
import AdminBreadcrumbs from '../../components/admin/AdminBreadcrumbs';
import EmbeddedQuestionBuilder from '../../components/admin/EmbeddedQuestionBuilder';
import './AdminShared.css';
import './QuestionEditor.css';

const LessonQuestionsEditor = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const l = contentService.getLessonById(lessonId);
    if (l) {
      setLesson(l);
      setQuestions(contentService.getQuestionsByLesson(lessonId));
    } else {
      navigate('/admin');
    }
  }, [lessonId, navigate]);

  const handleAddQuestion = () => {
    const newQuestion = {
      questionId: `q-${Date.now()}`,
      lessonId: lessonId,
      questionHead: 'New Question',
      questionType: QuestionType.MCQ,
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        context: '',
        domainData: {},
        interactionData: {},
      },
      answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
      expectedAnswer: {},
    };
    contentService.saveQuestion(newQuestion);
    setQuestions(contentService.getQuestionsByLesson(lessonId));
    setEditingId(newQuestion.questionId);
  };

  const handleDeleteQuestion = (qId, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this question?')) {
      contentService.deleteQuestion(qId);
      setQuestions(contentService.getQuestionsByLesson(lessonId));
      if (editingId === qId) setEditingId(null);
    }
  };

  const handleSaveQuestion = (updatedQuestion) => {
    contentService.saveQuestion(updatedQuestion);
    setQuestions(contentService.getQuestionsByLesson(lessonId));
  };

  const crumbs = lesson
    ? [
        { label: 'Admin', to: '/admin' },
        lesson.subject?.id != null && {
          label: lesson.subject?.name ?? 'Subject',
          to: `/admin/subjects/${lesson.subject.id}`,
        },
        { label: lesson.title || 'Lesson', to: `/admin/lessons/${lessonId}` },
        { label: 'Questions' },
      ].filter(Boolean)
    : [];

  return (
    <div className="lesson-questions-page">
      <AdminBreadcrumbs items={crumbs} />
      <header className="admin-header">
        <div className="header-left">
          <button
            type="button"
            onClick={() => navigate(`/admin/lessons/${lessonId}`)}
            className="btn-icon"
          >
            <span className="material-icons">arrow_back</span>
          </button>
          <h1>Questions: {lesson?.title ?? '…'}</h1>
        </div>
        <button type="button" onClick={handleAddQuestion} className="btn-primary">
          <span className="material-icons">add</span>
          Add Question
        </button>
      </header>

      <div className="questions-container">
        <div className="questions-list">
          {questions.length === 0 ? (
            <div className="questions-list-empty">
              <span className="material-icons">quiz</span>
              <p>No questions yet. Add one to start.</p>
            </div>
          ) : (
            questions.map((q) => (
              <div
                key={q.questionId}
                className={`question-list-item ${editingId === q.questionId ? 'active' : ''}`}
                onClick={() => setEditingId(q.questionId)}
                role="button"
                tabIndex={0}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') setEditingId(q.questionId);
                }}
              >
                <div className="q-info">
                  <strong>{q.questionHead || 'Untitled Question'}</strong>
                  <span className="badge">{q.questionType}</span>
                </div>
                <button
                  type="button"
                  className="btn-icon delete"
                  onClick={(e) => handleDeleteQuestion(q.questionId, e)}
                >
                  <span className="material-icons">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="question-editor-panel">
          {editingId ? (
            <SingleQuestionEditor questionId={editingId} onSave={handleSaveQuestion} />
          ) : (
            <div className="empty-panel">
              <span className="material-icons empty-panel-icon">touch_app</span>
              <p>Select a question to edit or add a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SingleQuestionEditor = ({ questionId, onSave }) => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    setQuestion(contentService.getQuestionById(questionId));
  }, [questionId]);

  if (!question) {
    return (
      <div className="question-editor-loading">
        <span className="material-icons">hourglass_empty</span>
        Loading…
      </div>
    );
  }

  return (
    <EmbeddedQuestionBuilder
      layout="split"
      value={question}
      onChange={(next) => {
        setQuestion(next);
        onSave(next);
      }}
    />
  );
};

export default LessonQuestionsEditor;
