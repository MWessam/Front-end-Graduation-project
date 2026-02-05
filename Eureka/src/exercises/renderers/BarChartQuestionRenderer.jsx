import React from 'react';
import { QuestionType, InteractionMode } from '../types';
import './BarChartQuestionRenderer.css';

/**
 * BarChart question renderer.
 * One renderer per question type. Has a list of strategies (per InteractionMode)
 * that define how to use questionBody to render sub-properties and state.
 */
const STRATEGIES = {
  [InteractionMode.DISPLAY_SELECT]: {
    render({ questionBody, value, onChange, disabled }) {
      const context = questionBody?.context ?? '';
      const data = questionBody?.chart?.data ?? [];
      const maxValue = Math.max(1, ...data.map((d) => Number(d.value) || 0));
      const selectedLabel = value?.selectedLabel ?? null;

      const handleBarClick = (label) => {
        if (disabled) return;
        onChange?.({ selectedLabel: label });
      };

      return (
        <div className="bar-chart-display-select" data-testid="bar-chart-display-select">
          {context && <p className="bar-chart-context">{context}</p>}
          <div className="bar-chart-wrapper">
            <div className="bar-chart-y-axis">
              {[0, Math.ceil(maxValue / 4), Math.ceil(maxValue / 2), Math.ceil((3 * maxValue) / 4), maxValue]
                .filter((v, i, a) => a.indexOf(v) === i)
                .sort((a, b) => a - b)
                .map((tick) => (
                  <span key={tick} className="bar-chart-y-tick">
                    {tick}
                  </span>
                ))}
            </div>
            <div className="bar-chart-bars">
              {data.map((d) => {
                const label = d.label ?? '';
                const val = Number(d.value) || 0;
                const pct = maxValue > 0 ? (val / maxValue) * 100 : 0;
                const color = d.color ?? '#94a3b8';
                const isSelected = selectedLabel === label;
                return (
                  <div key={label} className="bar-chart-bar-group">
                    <button
                      type="button"
                      className={`bar-chart-bar ${isSelected ? 'bar-chart-bar-selected' : ''}`}
                      style={{ height: `${Math.max(4, pct)}%`, backgroundColor: color }}
                      onClick={() => handleBarClick(label)}
                      disabled={disabled}
                      aria-pressed={isSelected}
                      aria-label={`Select ${label}`}
                    />
                    <span className="bar-chart-x-label">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    },
  },
};

const BarChartQuestionRenderer = ({ questionType, interactionMode, questionBody, value, onChange, disabled }) => {
  const strategy = STRATEGIES[interactionMode];
  if (!strategy) {
    return (
      <div className="bar-chart-unknown-mode" data-testid="bar-chart-unknown-mode">
        Bar chart does not support interaction mode: {interactionMode}
      </div>
    );
  }
  return strategy.render({ questionBody, value, onChange, disabled });
};

BarChartQuestionRenderer.questionType = QuestionType.BAR_CHART;
BarChartQuestionRenderer.availableInteractionModes = Object.keys(STRATEGIES);

export default BarChartQuestionRenderer;
