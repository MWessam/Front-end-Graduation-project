import React, { useState, useCallback, useRef, useEffect } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './NumberLineQuestionRenderer.css';

const WIDTH = 600;
const HEIGHT = 120;
const PADDING = 50;
const LINE_Y = 60;

// Convert number line value to SVG x coordinate
function toSvgX(value, min, max) {
  return PADDING + ((value - min) / (max - min)) * (WIDTH - 2 * PADDING);
}

// Convert SVG x coordinate to number line value
function fromSvgX(svgX, min, max) {
  return min + ((svgX - PADDING) / (WIDTH - 2 * PADDING)) * (max - min);
}

// Snap to nice values
function snapToNice(value, step = 0.5) {
  return Math.round(value / step) * step;
}

/**
 * INTERVAL_SELECT: User selects an interval by dragging endpoints
 */
function IntervalSelectMode({ questionBody, value, onChange, disabled }) {
  const min = questionBody?.range?.min ?? -5;
  const max = questionBody?.range?.max ?? 5;
  const step = questionBody?.step ?? 0.5;
  const allowMultiple = questionBody?.allowMultiple ?? false;
  
  const intervals = value?.intervals ?? [];
  const [dragging, setDragging] = useState(null);
  const svgRef = useRef(null);
  
  // Generate tick marks
  const ticks = [];
  for (let v = min; v <= max; v += step) {
    ticks.push(v);
  }
  
  const handleMouseDown = useCallback((e, intervalIndex, endpoint) => {
    if (disabled) return;
    setDragging({ intervalIndex, endpoint });
  }, [disabled]);
  
  const handleMouseMove = useCallback((e) => {
    if (!dragging || disabled) return;
    
    const svg = svgRef.current;
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let newValue = fromSvgX(svgX, min, max);
    newValue = Math.max(min, Math.min(max, newValue));
    newValue = snapToNice(newValue, step);
    
    const newIntervals = [...intervals];
    const interval = { ...newIntervals[dragging.intervalIndex] };
    
    if (dragging.endpoint === 'left') {
      interval.left = Math.min(newValue, interval.right - step);
    } else {
      interval.right = Math.max(newValue, interval.left + step);
    }
    
    newIntervals[dragging.intervalIndex] = interval;
    onChange?.({ intervals: newIntervals });
  }, [dragging, disabled, intervals, min, max, step, onChange]);
  
  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);
  
  const handleAddInterval = useCallback(() => {
    if (disabled) return;
    const newInterval = {
      left: 0,
      right: 2,
      leftOpen: false,
      rightOpen: false,
    };
    onChange?.({ intervals: [...intervals, newInterval] });
  }, [disabled, intervals, onChange]);
  
  const handleRemoveInterval = useCallback((index) => {
    if (disabled) return;
    const newIntervals = intervals.filter((_, i) => i !== index);
    onChange?.({ intervals: newIntervals });
  }, [disabled, intervals, onChange]);
  
  const handleToggleEndpoint = useCallback((intervalIndex, endpoint) => {
    if (disabled) return;
    const newIntervals = [...intervals];
    const interval = { ...newIntervals[intervalIndex] };
    if (endpoint === 'left') {
      interval.leftOpen = !interval.leftOpen;
    } else {
      interval.rightOpen = !interval.rightOpen;
    }
    newIntervals[intervalIndex] = interval;
    onChange?.({ intervals: newIntervals });
  }, [disabled, intervals, onChange]);
  
  // Add interval if empty
  useEffect(() => {
    if (intervals.length === 0 && !disabled) {
      handleAddInterval();
    }
  }, []);
  
  return (
    <div className="number-line-interval-select" data-testid="number-line-interval-select">
      <div className="number-line-canvas-wrap">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="number-line-svg"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Number line */}
          <line
            x1={PADDING}
            y1={LINE_Y}
            x2={WIDTH - PADDING}
            y2={LINE_Y}
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Arrow heads */}
          <polygon
            points={`${PADDING - 10},${LINE_Y} ${PADDING},${LINE_Y - 5} ${PADDING},${LINE_Y + 5}`}
            fill="currentColor"
          />
          <polygon
            points={`${WIDTH - PADDING + 10},${LINE_Y} ${WIDTH - PADDING},${LINE_Y - 5} ${WIDTH - PADDING},${LINE_Y + 5}`}
            fill="currentColor"
          />
          
          {/* Tick marks */}
          {ticks.map((v) => {
            const x = toSvgX(v, min, max);
            const isMain = Number.isInteger(v);
            return (
              <g key={v}>
                <line
                  x1={x}
                  y1={LINE_Y - (isMain ? 10 : 5)}
                  x2={x}
                  y2={LINE_Y + (isMain ? 10 : 5)}
                  stroke="currentColor"
                  strokeWidth={isMain ? 2 : 1}
                />
                {isMain && (
                  <text
                    x={x}
                    y={LINE_Y + 28}
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    {v}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Origin label */}
          <circle cx={toSvgX(0, min, max)} cy={LINE_Y} r="4" fill="currentColor" />
          
          {/* Selected intervals */}
          {intervals.map((interval, index) => {
            const leftX = toSvgX(interval.left, min, max);
            const rightX = toSvgX(interval.right, min, max);
            
            return (
              <g key={index} className="number-line-interval">
                {/* Interval line */}
                <line
                  x1={leftX}
                  y1={LINE_Y}
                  x2={rightX}
                  y2={LINE_Y}
                  stroke="rgb(16, 185, 129)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                
                {/* Left endpoint */}
                <circle
                  cx={leftX}
                  cy={LINE_Y}
                  r="10"
                  fill={interval.leftOpen ? 'var(--bg-primary, white)' : 'rgb(16, 185, 129)'}
                  stroke="rgb(16, 185, 129)"
                  strokeWidth="3"
                  style={{ cursor: disabled ? 'default' : 'ew-resize' }}
                  onMouseDown={(e) => handleMouseDown(e, index, 'left')}
                  onDoubleClick={() => handleToggleEndpoint(index, 'left')}
                />
                
                {/* Right endpoint */}
                <circle
                  cx={rightX}
                  cy={LINE_Y}
                  r="10"
                  fill={interval.rightOpen ? 'var(--bg-primary, white)' : 'rgb(16, 185, 129)'}
                  stroke="rgb(16, 185, 129)"
                  strokeWidth="3"
                  style={{ cursor: disabled ? 'default' : 'ew-resize' }}
                  onMouseDown={(e) => handleMouseDown(e, index, 'right')}
                  onDoubleClick={() => handleToggleEndpoint(index, 'right')}
                />
                
                {/* Value labels */}
                <text
                  x={leftX}
                  y={LINE_Y - 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="rgb(16, 185, 129)"
                  fontWeight="600"
                >
                  {interval.left}
                </text>
                <text
                  x={rightX}
                  y={LINE_Y - 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="rgb(16, 185, 129)"
                  fontWeight="600"
                >
                  {interval.right}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Interval notation display */}
      <div className="number-line-info">
        <div className="number-line-notation">
          <span className="number-line-notation-label">Interval notation:</span>
          {intervals.map((interval, index) => (
            <span key={index} className="number-line-notation-value">
              {interval.leftOpen ? '(' : '['}
              {interval.left}, {interval.right}
              {interval.rightOpen ? ')' : ']'}
              {!disabled && (
                <button
                  className="number-line-remove-btn"
                  onClick={() => handleRemoveInterval(index)}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        
        {allowMultiple && !disabled && (
          <button className="number-line-add-btn" onClick={handleAddInterval}>
            + Add interval
          </button>
        )}
        
        <div className="number-line-help">
          <span>Drag endpoints to adjust • Double-click to toggle open/closed</span>
        </div>
      </div>
    </div>
  );
}

/**
 * DISPLAY_SELECT: User selects from given interval options
 */
function DisplaySelectMode({ questionBody, value, onChange, disabled }) {
  const min = questionBody?.range?.min ?? -5;
  const max = questionBody?.range?.max ?? 5;
  const options = questionBody?.options ?? [];
  const highlightIntervals = questionBody?.highlightIntervals ?? [];
  const multiSelect = questionBody?.multiSelect ?? false;
  
  const selected = multiSelect ? (value?.selected ?? []) : value?.selected;
  
  const handleSelect = useCallback((optionValue) => {
    if (disabled) return;
    
    if (multiSelect) {
      const currentSelected = selected ?? [];
      const isSelected = currentSelected.includes(optionValue);
      const newSelected = isSelected
        ? currentSelected.filter((v) => v !== optionValue)
        : [...currentSelected, optionValue];
      onChange?.({ selected: newSelected });
    } else {
      onChange?.({ selected: optionValue });
    }
  }, [disabled, onChange, selected, multiSelect]);
  
  // Generate tick marks
  const ticks = [];
  for (let v = min; v <= max; v += 1) {
    ticks.push(v);
  }
  
  return (
    <div className="number-line-display-select" data-testid="number-line-display-select">
      <div className="number-line-canvas-wrap">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="number-line-svg">
          {/* Number line */}
          <line
            x1={PADDING}
            y1={LINE_Y}
            x2={WIDTH - PADDING}
            y2={LINE_Y}
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Arrow heads */}
          <polygon
            points={`${PADDING - 10},${LINE_Y} ${PADDING},${LINE_Y - 5} ${PADDING},${LINE_Y + 5}`}
            fill="currentColor"
          />
          <polygon
            points={`${WIDTH - PADDING + 10},${LINE_Y} ${WIDTH - PADDING},${LINE_Y - 5} ${WIDTH - PADDING},${LINE_Y + 5}`}
            fill="currentColor"
          />
          
          {/* Tick marks */}
          {ticks.map((v) => {
            const x = toSvgX(v, min, max);
            return (
              <g key={v}>
                <line
                  x1={x}
                  y1={LINE_Y - 10}
                  x2={x}
                  y2={LINE_Y + 10}
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={LINE_Y + 28}
                  textAnchor="middle"
                  fontSize="12"
                  fill="currentColor"
                >
                  {v}
                </text>
              </g>
            );
          })}
          
          {/* Highlight intervals (from function sign) */}
          {highlightIntervals.map((interval, index) => {
            const leftX = interval.left === '-inf' 
              ? PADDING - 5 
              : toSvgX(interval.left, min, max);
            const rightX = interval.right === 'inf' 
              ? WIDTH - PADDING + 5 
              : toSvgX(interval.right, min, max);
            const color = interval.sign === '+' ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)';
            
            return (
              <g key={index}>
                <line
                  x1={leftX}
                  y1={LINE_Y}
                  x2={rightX}
                  y2={LINE_Y}
                  stroke={color}
                  strokeWidth="4"
                  opacity="0.5"
                />
                <text
                  x={(leftX + rightX) / 2}
                  y={LINE_Y - 15}
                  textAnchor="middle"
                  fontSize="16"
                  fill={color}
                  fontWeight="bold"
                >
                  {interval.sign}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="number-line-options">
        {options.map((option) => {
          const isSelected = multiSelect
            ? (selected ?? []).includes(option.value)
            : selected === option.value;
            
          return (
            <button
              key={option.value}
              className={`number-line-option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              disabled={disabled}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * REGION_SELECT: User clicks to select/shade regions (for sign analysis)
 */
function RegionSelectMode({ questionBody, value, onChange, disabled }) {
  const min = questionBody?.range?.min ?? -5;
  const max = questionBody?.range?.max ?? 5;
  const criticalPoints = questionBody?.criticalPoints ?? [];
  const signLabels = questionBody?.signLabels ?? ['+', '-'];
  
  const selectedRegions = value?.regions ?? {};
  
  // Create regions from critical points
  const regions = [];
  const sortedPoints = [...criticalPoints].sort((a, b) => a - b);
  
  // Add negative infinity region
  if (sortedPoints.length > 0) {
    regions.push({ left: '-inf', right: sortedPoints[0], id: 'r0' });
  }
  
  // Add middle regions
  for (let i = 0; i < sortedPoints.length - 1; i++) {
    regions.push({ 
      left: sortedPoints[i], 
      right: sortedPoints[i + 1], 
      id: `r${i + 1}` 
    });
  }
  
  // Add positive infinity region
  if (sortedPoints.length > 0) {
    regions.push({ 
      left: sortedPoints[sortedPoints.length - 1], 
      right: 'inf', 
      id: `r${sortedPoints.length}` 
    });
  }
  
  const handleRegionClick = useCallback((regionId) => {
    if (disabled) return;
    
    const currentSign = selectedRegions[regionId];
    const signIndex = signLabels.indexOf(currentSign);
    const nextSign = signLabels[(signIndex + 1) % signLabels.length];
    
    onChange?.({
      regions: {
        ...selectedRegions,
        [regionId]: currentSign === nextSign ? null : nextSign,
      },
    });
  }, [disabled, selectedRegions, signLabels, onChange]);
  
  // Generate tick marks
  const ticks = [];
  for (let v = min; v <= max; v += 1) {
    ticks.push(v);
  }
  
  return (
    <div className="number-line-region-select" data-testid="number-line-region-select">
      <div className="number-line-canvas-wrap">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT + 30}`} className="number-line-svg number-line-svg-tall">
          {/* Regions */}
          {regions.map((region) => {
            const leftX = region.left === '-inf' 
              ? PADDING 
              : toSvgX(region.left, min, max);
            const rightX = region.right === 'inf' 
              ? WIDTH - PADDING 
              : toSvgX(region.right, min, max);
            const sign = selectedRegions[region.id];
            const color = sign === '+' 
              ? 'rgba(16, 185, 129, 0.3)' 
              : sign === '-' 
                ? 'rgba(239, 68, 68, 0.3)' 
                : 'transparent';
            
            return (
              <g key={region.id} className="number-line-region">
                <rect
                  x={leftX}
                  y={LINE_Y - 30}
                  width={rightX - leftX}
                  height={60}
                  fill={color}
                  style={{ cursor: disabled ? 'default' : 'pointer' }}
                  onClick={() => handleRegionClick(region.id)}
                />
                {sign && (
                  <text
                    x={(leftX + rightX) / 2}
                    y={LINE_Y - 15}
                    textAnchor="middle"
                    fontSize="20"
                    fill={sign === '+' ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'}
                    fontWeight="bold"
                    style={{ pointerEvents: 'none' }}
                  >
                    {sign}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Number line */}
          <line
            x1={PADDING}
            y1={LINE_Y}
            x2={WIDTH - PADDING}
            y2={LINE_Y}
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Arrow heads */}
          <polygon
            points={`${PADDING - 10},${LINE_Y} ${PADDING},${LINE_Y - 5} ${PADDING},${LINE_Y + 5}`}
            fill="currentColor"
          />
          <polygon
            points={`${WIDTH - PADDING + 10},${LINE_Y} ${WIDTH - PADDING},${LINE_Y - 5} ${WIDTH - PADDING},${LINE_Y + 5}`}
            fill="currentColor"
          />
          
          {/* Tick marks */}
          {ticks.map((v) => {
            const x = toSvgX(v, min, max);
            return (
              <g key={v}>
                <line
                  x1={x}
                  y1={LINE_Y - 8}
                  x2={x}
                  y2={LINE_Y + 8}
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={LINE_Y + 45}
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                >
                  {v}
                </text>
              </g>
            );
          })}
          
          {/* Critical points */}
          {criticalPoints.map((point) => {
            const x = toSvgX(point, min, max);
            return (
              <g key={point}>
                <circle cx={x} cy={LINE_Y} r="6" fill="rgb(59, 130, 246)" />
                <text
                  x={x}
                  y={LINE_Y + 25}
                  textAnchor="middle"
                  fontSize="12"
                  fill="rgb(59, 130, 246)"
                  fontWeight="600"
                >
                  {point}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="number-line-help">
        <span>Click on regions to mark their sign (+ or -)</span>
      </div>
    </div>
  );
}

/**
 * NumberLineQuestionRenderer
 * Renders interactive number line questions for inequalities
 */
const NumberLineQuestionRenderer = ({
  questionType,
  interactionMode,
  questionBody,
  value,
  onChange,
  disabled,
}) => {
  switch (interactionMode) {
    case InteractionMode.INTERVAL_SELECT:
      return (
        <IntervalSelectMode
          questionBody={questionBody}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    
    case InteractionMode.DISPLAY_SELECT:
      return (
        <DisplaySelectMode
          questionBody={questionBody}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    
    case InteractionMode.REGION_SELECT:
      return (
        <RegionSelectMode
          questionBody={questionBody}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    
    default:
      return (
        <div className="number-line-unknown" data-testid="number-line-unknown">
          Number line does not support interaction mode: {interactionMode}
        </div>
      );
  }
};

NumberLineQuestionRenderer.questionType = QuestionType.NUMBER_LINE;

export default NumberLineQuestionRenderer;
