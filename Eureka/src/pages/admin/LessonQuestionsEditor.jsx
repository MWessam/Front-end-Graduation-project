import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resolveCurriculumApi } from '../../services/curriculumApi';
import { QuestionType, InteractionMode, AnswerValidationType } from '../../exercises/types';
import AdminBreadcrumbs from '../../components/admin/AdminBreadcrumbs';
import EmbeddedQuestionBuilder from '../../components/admin/EmbeddedQuestionBuilder';
import './AdminShared.css';
import './QuestionEditor.css';

const LessonQuestionsEditor = () => {
  const { lessonId, classId } = useParams();
  const api = useMemo(() => resolveCurriculumApi(classId), [classId]);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const l = api.getLessonById(lessonId);
    if (l) {
      setLesson(l);
      setQuestions(api.getQuestionsByLesson(lessonId));
    } else {
      navigate(api.paths.root);
    }
  }, [lessonId, navigate, api]);

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
    api.saveQuestion(newQuestion);
    setQuestions(api.getQuestionsByLesson(lessonId));
    setEditingId(newQuestion.questionId);
  };

  const handleDeleteQuestion = (qId, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this question?')) {
      api.deleteQuestion(qId);
      setQuestions(api.getQuestionsByLesson(lessonId));
      if (editingId === qId) setEditingId(null);
    }
  };

  const handleSaveQuestion = (updatedQuestion) => {
    api.saveQuestion(updatedQuestion);
    setQuestions(api.getQuestionsByLesson(lessonId));
  };

  const crumbs =
    lesson && api.mode === 'class'
      ? [
          { label: 'Class home', to: `/teacher/class/${api.classId}` },
          lesson.subject?.id != null && {
            label: lesson.subject?.name ?? 'Subject',
            to: api.paths.subject(lesson.subject.id),
          },
          { label: lesson.title || 'Lesson', to: api.paths.lessonEdit(lessonId) },
          { label: 'Questions' },
        ].filter(Boolean)
      : lesson
        ? [
            { label: 'Admin', to: '/admin' },
            lesson.subject?.id != null && {
              label: lesson.subject?.name ?? 'Subject',
              to: api.paths.subject(lesson.subject.id),
            },
            { label: lesson.title || 'Lesson', to: api.paths.lessonEdit(lessonId) },
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
            onClick={() => navigate(api.paths.lessonEdit(lessonId))}
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
            <SingleQuestionEditor api={api} questionId={editingId} onSave={handleSaveQuestion} />
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

const SingleQuestionEditor = ({ api, questionId, onSave }) => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    setQuestion(api.getQuestionById(questionId));
  }, [api, questionId]);

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
