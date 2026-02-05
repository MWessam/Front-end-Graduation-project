import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { QuestionType, InteractionMode, AnswerValidationType } from '../../exercises/types';
import { getQuestionRenderer } from '../../exercises/renderers';
import './QuestionEditor.css'; // Reusing styles

const LessonQuestionsEditor = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null); // ID of question being edited
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
        context: ''
      },
      answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
      expectedAnswer: '',
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
    // Don't close, just save
  };

  return (
    <div className="lesson-questions-page">
      <header className="admin-header">
         <div className="header-left">
          <button onClick={() => navigate(`/admin/lessons/${lessonId}`)} className="btn-icon">
            <span className="material-icons">arrow_back</span>
          </button>
          <h1>Questions for: {lesson?.title}</h1>
        </div>
        <button onClick={handleAddQuestion} className="btn-primary">
          <span className="material-icons">add</span>
          Add Question
        </button>
      </header>

      <div className="questions-container">
        <div className="questions-list">
          {questions.map(q => (
            <div 
              key={q.questionId} 
              className={`question-list-item ${editingId === q.questionId ? 'active' : ''}`}
              onClick={() => setEditingId(q.questionId)}
            >
              <div className="q-info">
                <strong>{q.questionHead || 'Untitled Question'}</strong>
                <span className="badge">{q.questionType}</span>
              </div>
              <button className="btn-icon delete" onClick={(e) => handleDeleteQuestion(q.questionId, e)}>
                <span className="material-icons">delete</span>
              </button>
            </div>
          ))}
        </div>

        <div className="question-editor-panel">
          {editingId ? (
            <SingleQuestionEditor 
              questionId={editingId} 
              onSave={handleSaveQuestion}
            />
          ) : (
            <div className="empty-panel">
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
    const data = contentService.getQuestionById(questionId);
    setQuestion(data);
  }, [questionId]);

  if (!question) return <div>Loading...</div>;

  const updateQuestion = (updates) => {
    const updated = { ...question, ...updates };
    setQuestion(updated);
    onSave(updated);
  };

  const updateBody = (updates) => {
    const updated = {
      ...question,
      questionBody: { ...question.questionBody, ...updates },
    };
    setQuestion(updated);
    onSave(updated);
  };

  const Renderer = getQuestionRenderer(question.questionType);
  const availableModes = Renderer?.availableInteractionModes || Object.values(InteractionMode);

  const handleTypeChange = (newType) => {
    const NewRenderer = getQuestionRenderer(newType);
    const validModes = NewRenderer?.availableInteractionModes || [];
    const newMode = validModes.length > 0 ? validModes[0] : InteractionMode.DISPLAY_SELECT;
    
    const newBody = {
        interactionMode: newMode,
        context: question.questionBody.context || '',
    };

    updateQuestion({ 
        questionType: newType, 
        questionBody: newBody 
    });
  };

  return (
    <div className="split-editor">
      <div className="editor-form">
        <h3>Settings</h3>
        <div className="form-group">
            <label>Title / Prompt</label>
            <textarea
              value={question.questionHead}
              onChange={(e) => updateQuestion({ questionHead: e.target.value })}
            />
        </div>
        
        <div className="row">
            <div className="form-group half">
                <label>Type</label>
                <select
                value={question.questionType}
                onChange={(e) => handleTypeChange(e.target.value)}
                >
                {Object.values(QuestionType).map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
                </select>
            </div>
            <div className="form-group half">
                <label>Interaction</label>
                <select
                value={question.questionBody.interactionMode}
                onChange={(e) => updateBody({ interactionMode: e.target.value })}
                >
                {availableModes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                ))}
                </select>
            </div>
        </div>

        <div className="form-group">
            <label>Context</label>
            <textarea
                value={question.questionBody.context || ''}
                onChange={(e) => updateBody({ context: e.target.value })}
                rows={3}
            />
        </div>

        {/* Dynamic Fields */}
        {question.questionType === QuestionType.BAR_CHART && (
             <div className="type-specific-form">
                <h4>Chart Data</h4>
                <button className="btn-sm" onClick={() => {
                     const currentData = question.questionBody.chart?.data || [];
                     updateBody({
                       chart: {
                         type: 'bar',
                         data: [...currentData, { label: 'New', value: 10, color: '#3b82f6' }]
                       }
                     });
                }}>Add Bar</button>
                {(question.questionBody.chart?.data || []).map((item, i) => (
                    <div key={i} className="chart-data-row compact">
                        <input value={item.label} onChange={(e) => {
                             const newData = [...question.questionBody.chart.data];
                             newData[i].label = e.target.value;
                             updateBody({ chart: { ...question.questionBody.chart, data: newData } });
                        }} placeholder="Lbl" />
                        <input type="number" value={item.value} onChange={(e) => {
                             const newData = [...question.questionBody.chart.data];
                             newData[i].value = Number(e.target.value);
                             updateBody({ chart: { ...question.questionBody.chart, data: newData } });
                        }} placeholder="Val" style={{width: '60px'}} />
                         <input type="color" value={item.color} onChange={(e) => {
                             const newData = [...question.questionBody.chart.data];
                             newData[i].color = e.target.value;
                             updateBody({ chart: { ...question.questionBody.chart, data: newData } });
                        }} />
                         <button onClick={() => {
                             const newData = question.questionBody.chart.data.filter((_, idx) => idx !== i);
                             updateBody({ chart: { ...question.questionBody.chart, data: newData } });
                         }}>x</button>
                    </div>
                ))}
             </div>
        )}

        <div className="form-group">
            <label>Expected Answer</label>
            <input 
                value={typeof question.expectedAnswer === 'object' ? JSON.stringify(question.expectedAnswer) : question.expectedAnswer}
                onChange={(e) => updateQuestion({ expectedAnswer: e.target.value })} 
            />
        </div>
      </div>

      <div className="editor-preview">
        <h3>Preview</h3>
        <div className="preview-box">
            {Renderer ? (
                <Renderer 
                    questionType={question.questionType}
                    interactionMode={question.questionBody.interactionMode}
                    questionBody={question.questionBody}
                    value={{}} // Empty value for preview
                    onChange={() => {}} 
                    disabled={false}
                />
            ) : (
                <div className="no-renderer">No renderer for {question.questionType}</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default LessonQuestionsEditor;
