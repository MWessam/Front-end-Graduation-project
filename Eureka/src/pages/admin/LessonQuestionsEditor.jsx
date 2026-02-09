import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { QuestionType, InteractionMode, AnswerValidationType } from '../../exercises/types';
import { getQuestionRenderer } from '../../exercises/renderers';
import DynamicForm from '../../exercises/components/DynamicForm';
import './QuestionEditor.css'; // Reusing styles

import { getValidator } from '../../exercises/validators';

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
        context: '',
        domainData: {},
        interactionData: {}
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
  const [previewKey, setPreviewKey] = useState(0);

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

  // Get Schemas
  const DomainClass = Renderer?.DomainData;
  const InteractionClass = Renderer?.InteractionDataMap?.[question.questionBody.interactionMode];
  
  // Get Validator Schema
  const ValidatorFn = getValidator(question.answerValidationType);
  const validatorSchema = ValidatorFn?.schema;

  const handleTypeChange = (newType) => {
    const NewRenderer = getQuestionRenderer(newType);
    const validModes = NewRenderer?.availableInteractionModes || [];
    const newMode = validModes.length > 0 ? validModes[0] : InteractionMode.DISPLAY_SELECT;
    
    // Create new domain data instance
    const NewDomainClass = NewRenderer?.DomainData;
    const domainData = NewDomainClass ? new NewDomainClass() : {};

    // Create new interaction data instance
    const NewInteractionClass = NewRenderer?.InteractionDataMap?.[newMode];
    const interactionData = NewInteractionClass ? new NewInteractionClass() : {};

    const newBody = {
        interactionMode: newMode,
        context: question.questionBody.context || '',
        domainData,
        interactionData
    };

    updateQuestion({ 
        questionType: newType, 
        questionBody: newBody 
    });
  };

  const handleModeChange = (newMode) => {
    // Keep existing domain data, reset interaction data
    const NewInteractionClass = Renderer?.InteractionDataMap?.[newMode];
    const interactionData = NewInteractionClass ? new NewInteractionClass() : {};

    const newBody = {
        ...question.questionBody,
        interactionMode: newMode,
        interactionData
    };

    updateQuestion({ 
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
                onChange={(e) => handleModeChange(e.target.value)}
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

        {/* Dynamic Domain Data Form */}
        {DomainClass && DomainClass.schema && (
            <div className="dynamic-section">
                <h4>Domain Configuration</h4>
                <DynamicForm 
                    schema={DomainClass.schema}
                    data={question.questionBody.domainData || {}}
                    onChange={(newData) => updateBody({ domainData: newData })}
                />
            </div>
        )}

        {/* Dynamic Interaction Data Form */}
        {InteractionClass && InteractionClass.schema && (
            <div className="dynamic-section">
                <h4>Interaction Configuration</h4>
                <DynamicForm 
                    schema={InteractionClass.schema}
                    data={question.questionBody.interactionData || {}}
                    onChange={(newData) => updateBody({ interactionData: newData })}
                />
            </div>
        )}

        <div className="form-group">
            <label>Validation Strategy</label>
            <select
                value={question.answerValidationType}
                onChange={(e) => updateQuestion({ answerValidationType: e.target.value, expectedAnswer: {} })}
            >
                {Object.values(AnswerValidationType).map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>
        </div>

        {/* Dynamic Expected Answer Form */}
        {validatorSchema ? (
            <div className="dynamic-section">
                <h4>Expected Answer Configuration</h4>
                <DynamicForm 
                    schema={validatorSchema}
                    data={typeof question.expectedAnswer === 'object' ? question.expectedAnswer : {}}
                    onChange={(newData) => updateQuestion({ expectedAnswer: newData })}
                />
            </div>
        ) : (
            <div className="form-group">
                <label>Expected Answer (Raw)</label>
                <input 
                    value={typeof question.expectedAnswer === 'object' ? JSON.stringify(question.expectedAnswer) : question.expectedAnswer}
                    onChange={(e) => updateQuestion({ expectedAnswer: e.target.value })} 
                />
            </div>
        )}
      </div>

      <div className="editor-preview">
        <div className="preview-header">
            <h3>Preview</h3>
            <button className="btn-sm" onClick={() => {
                // Force re-render of preview by toggling a key or similar
                // For now, React state updates should trigger it automatically
                // But we can add a 'key' to the renderer to force fresh mount
                setPreviewKey(prev => prev + 1);
            }}>Refresh</button>
        </div>
        <div className="preview-box">
            {Renderer ? (
                <Renderer 
                    key={previewKey}
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
