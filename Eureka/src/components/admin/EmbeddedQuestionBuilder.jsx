import React, { useEffect, useState, useCallback } from 'react';
import { QuestionType, InteractionMode, AnswerValidationType } from '../../exercises/types';
import { getQuestionRenderer } from '../../exercises/renderers';
import DynamicForm from '../../exercises/components/DynamicForm';
import { getValidator } from '../../exercises/validators';
import '../../pages/admin/QuestionEditor.css';
import './EmbeddedQuestionBuilder.css';

export default function EmbeddedQuestionBuilder({
  value,
  onChange,
  layout = 'compact',
}) {
  const [previewKey, setPreviewKey] = useState(0);
  const [previewValue, setPreviewValue] = useState({});

  const question = value;
  const bodySig =
    question != null
      ? JSON.stringify(question.questionBody?.domainData ?? {}) +
        JSON.stringify(question.questionBody?.interactionData ?? {})
      : '';

  useEffect(() => {
    setPreviewValue({});
  }, [question?.questionType, question?.questionBody?.interactionMode, previewKey, bodySig]);

  const handlePreviewChange = useCallback((next) => {
    setPreviewValue((prev) => ({ ...prev, ...next }));
  }, []);

  const emit = useCallback(
    (next) => {
      onChange?.(next);
    },
    [onChange]
  );

  const updateQuestion = (updates) => {
    emit({ ...question, ...updates });
  };

  const updateBody = (updates) => {
    emit({
      ...question,
      questionBody: { ...question.questionBody, ...updates },
    });
  };

  const Renderer = getQuestionRenderer(question.questionType);
  const availableModes = Renderer?.availableInteractionModes || Object.values(InteractionMode);
  const DomainClass = Renderer?.DomainData;
  const InteractionClass = Renderer?.InteractionDataMap?.[question.questionBody.interactionMode];
  const ValidatorFn = getValidator(question.answerValidationType);
  const validatorSchema = ValidatorFn?.schema;

  const handleTypeChange = (newType) => {
    const NewRenderer = getQuestionRenderer(newType);
    const validModes = NewRenderer?.availableInteractionModes || [];
    const newMode =
      validModes.length > 0 ? validModes[0] : InteractionMode.DISPLAY_SELECT;
    const NewDomainClass = NewRenderer?.DomainData;
    const domainData = NewDomainClass ? new NewDomainClass() : {};
    const NewInteractionClass = NewRenderer?.InteractionDataMap?.[newMode];
    const interactionData = NewInteractionClass ? new NewInteractionClass() : {};
    emit({
      ...question,
      questionType: newType,
      questionBody: {
        interactionMode: newMode,
        context: question.questionBody.context || '',
        domainData,
        interactionData,
      },
    });
  };

  const handleModeChange = (newMode) => {
    const NewInteractionClass = Renderer?.InteractionDataMap?.[newMode];
    const interactionData = NewInteractionClass ? new NewInteractionClass() : {};
    emit({
      ...question,
      questionBody: {
        ...question.questionBody,
        interactionMode: newMode,
        interactionData,
      },
    });
  };

  const rootCls =
    layout === 'split'
      ? 'embedded-q-builder embedded-q-builder--split split-editor'
      : 'embedded-q-builder embedded-q-builder--compact split-editor';

  return (
    <div className={rootCls}>
      <div className="editor-form">
        <h3 className="embedded-q-heading">Exercise builder</h3>
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
            <select value={question.questionType} onChange={(e) => handleTypeChange(e.target.value)}>
              {Object.values(QuestionType).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
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
                <option key={m} value={m}>
                  {m}
                </option>
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
            onChange={(e) =>
              updateQuestion({ answerValidationType: e.target.value, expectedAnswer: {} })
            }
          >
            {Object.values(AnswerValidationType).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {validatorSchema ? (
          <div className="dynamic-section">
            <h4>Expected Answer Configuration</h4>
            <DynamicForm
              schema={validatorSchema}
              data={
                typeof question.expectedAnswer === 'object' ? question.expectedAnswer : {}
              }
              onChange={(newData) => updateQuestion({ expectedAnswer: newData })}
            />
          </div>
        ) : (
          <div className="form-group">
            <label>Expected Answer (Raw)</label>
            <input
              value={
                typeof question.expectedAnswer === 'object'
                  ? JSON.stringify(question.expectedAnswer)
                  : question.expectedAnswer ?? ''
              }
              onChange={(e) => updateQuestion({ expectedAnswer: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="editor-preview">
        <div className="preview-header">
          <h3>Live preview</h3>
          <button
            type="button"
            className="btn-sm btn-preview-refresh"
            onClick={() => setPreviewKey((k) => k + 1)}
          >
            Refresh
          </button>
        </div>
        <div className="preview-box embedded-q-preview-box">
          {Renderer ? (
            <Renderer
              key={previewKey}
              questionType={question.questionType}
              interactionMode={question.questionBody.interactionMode}
              questionBody={question.questionBody}
              value={previewValue}
              onChange={handlePreviewChange}
              disabled={false}
            />
          ) : (
            <div className="no-renderer">No renderer for {question.questionType}</div>
          )}
        </div>
      </div>
    </div>
  );
}
