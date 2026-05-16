import React from 'react';
import { QuestionType, InteractionMode } from '../types';
import './McqQuestionRenderer.css';
import { McqDomain } from '../data/domains/McqDomain';
import { DisplaySelectInteraction } from '../data/interactions/DisplaySelectInteraction';

const STRATEGIES = {
  [InteractionMode.DISPLAY_SELECT]: {
    render({ domain, interaction, value, onChange, disabled }) {
      const options = domain?.options ?? [];
      const selectedId = value?.selectedId ?? null;

      const handleSelect = (id) => {
        if (disabled) return;
        onChange?.({ selectedId: id, selectedLabel: options.find(o => o.id === id)?.label });
      };

      return (
        <div className="mcq-display-select">
          <div className="mcq-options-list">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`mcq-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.id)}
                  disabled={disabled}
                >
                  <span className="mcq-option-indicator"></span>
                  <span className="mcq-option-label">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      );
    },
  },
};

const McqQuestionRenderer = ({
  questionType,
  interactionMode,
  questionBody,
  value,
  onChange,
  disabled,
}) => {
  const strategy = STRATEGIES[interactionMode];
  if (!strategy) {
    return (
      <div className="mcq-unknown-mode">
        MCQ does not support interaction mode: {interactionMode}
      </div>
    );
  }

  const domain = new McqDomain(questionBody?.domainData);
  const interaction = interactionMode === InteractionMode.DISPLAY_SELECT
      ? new DisplaySelectInteraction(questionBody?.interactionData)
      : null;

  return strategy.render({ domain, interaction, value, onChange, disabled });
};

McqQuestionRenderer.questionType = QuestionType.MCQ;
McqQuestionRenderer.availableInteractionModes = Object.keys(STRATEGIES);
McqQuestionRenderer.DomainData = McqDomain;
McqQuestionRenderer.InteractionDataMap = {
    [InteractionMode.DISPLAY_SELECT]: DisplaySelectInteraction
};

export default McqQuestionRenderer;
