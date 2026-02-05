import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { QuestionType, InteractionMode, AnswerValidationType } from '../../exercises/types';
import './QuestionEditor.css';

const QuestionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const data = contentService.getQuestionById(id);
    if (data) {
      setQuestion(data);
    } else {
      navigate('/admin');
    }
  }, [id, navigate]);

  const handleSave = () => {
    contentService.saveQuestion(question);
    alert('Question saved!');
    navigate(`/admin/lessons/${question.lessonId}`);
  };

  const updateQuestion = (updates) => {
    setQuestion((prev) => ({ ...prev, ...updates }));
  };

  const updateBody = (updates) => {
    setQuestion((prev) => ({
      ...prev,
      questionBody: { ...prev.questionBody, ...updates },
    }));
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="question-editor">
      <header className="editor-header">
        <div className="left">
          <button onClick={() => navigate(`/admin/lessons/${question.lessonId}`)} className="btn-back">
            <span className="material-icons">arrow_back</span>
          </button>
          <h1>Edit Exercise</h1>
        </div>
        <button onClick={handleSave} className="btn-save">
          <span className="material-icons">save</span>
          Save Exercise
        </button>
      </header>

      <div className="editor-grid">
        <section className="settings-section">
          <h2>Basic Settings</h2>
          <div className="form-group">
            <label>Question Header (Prompt)</label>
            <textarea
              value={question.questionHead}
              onChange={(e) => updateQuestion({ questionHead: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Question Type</label>
            <select
              value={question.questionType}
              onChange={(e) => updateQuestion({ questionType: e.target.value })}
            >
              {Object.values(QuestionType).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Interaction Mode</label>
            <select
              value={question.questionBody.interactionMode}
              onChange={(e) => updateBody({ interactionMode: e.target.value })}
            >
              {Object.values(InteractionMode).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Validation Type</label>
            <select
              value={question.answerValidationType}
              onChange={(e) => updateQuestion({ answerValidationType: e.target.value })}
            >
              {Object.values(AnswerValidationType).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="content-section">
          <h2>Question Content</h2>
          <div className="form-group">
            <label>Context (Optional text above prompt)</label>
            <textarea
              value={question.questionBody.context || ''}
              onChange={(e) => updateBody({ context: e.target.value })}
            />
          </div>

          {/* Dynamic forms based on QuestionType */}
          {question.questionType === QuestionType.BAR_CHART && (
            <div className="type-specific-form">
              <h3>Bar Chart Data</h3>
              {question.questionBody.chart?.data.map((item, i) => (
                <div key={i} className="chart-data-row">
                  <input
                    type="text"
                    placeholder="Label"
                    value={item.label}
                    onChange={(e) => {
                      const newData = [...question.questionBody.chart.data];
                      newData[i].label = e.target.value;
                      updateBody({ chart: { ...question.questionBody.chart, data: newData } });
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) => {
                      const newData = [...question.questionBody.chart.data];
                      newData[i].value = Number(e.target.value);
                      updateBody({ chart: { ...question.questionBody.chart, data: newData } });
                    }}
                  />
                  <input
                    type="color"
                    value={item.color}
                    onChange={(e) => {
                      const newData = [...question.questionBody.chart.data];
                      newData[i].color = e.target.value;
                      updateBody({ chart: { ...question.questionBody.chart, data: newData } });
                    }}
                  />
                </div>
              ))}
              <button onClick={() => {
                const currentData = question.questionBody.chart?.data || [];
                updateBody({
                  chart: {
                    type: 'bar',
                    data: [...currentData, { label: 'New', value: 0, color: '#3b82f6' }]
                  }
                });
              }}>Add Bar</button>
            </div>
          )}

          {question.questionType === QuestionType.CHEMISTRY_MOLECULE_BUILDER && (
            <div className="type-specific-form">
              <h3>Allowed Elements</h3>
              <input
                type="text"
                placeholder="Comma separated (e.g. C,H,O)"
                value={question.questionBody.allowedElements?.join(',') || ''}
                onChange={(e) => updateBody({ allowedElements: e.target.value.split(',').map(s => s.trim()) })}
              />
            </div>
          )}

          {question.questionType === QuestionType.MATH_GRAPH && (
            <div className="type-specific-form">
              <h3>Graph Settings</h3>
              <div className="form-group">
                <label>Template</label>
                <input
                  type="text"
                  value={question.questionBody.template || 'quadratic'}
                  onChange={(e) => updateBody({ template: e.target.value })}
                />
              </div>
              {/* Sliders and Reference Curve settings would go here */}
              <p className="hint">Complex graph parameters can be edited in the raw JSON below.</p>
            </div>
          )}

          <div className="form-group">
            <label>Expected Answer (Body/JSON)</label>
            <textarea
              className="code-font"
              value={typeof question.expectedAnswer === 'object' ? JSON.stringify(question.expectedAnswer, null, 2) : question.expectedAnswer}
              onChange={(e) => {
                let val = e.target.value;
                try {
                  val = JSON.parse(val);
                } catch (err) {}
                updateQuestion({ expectedAnswer: val });
              }}
              placeholder="Enter answer string or JSON object"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuestionEditor;
