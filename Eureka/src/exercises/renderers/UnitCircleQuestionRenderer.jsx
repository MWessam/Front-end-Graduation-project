import React, { useCallback } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './UnitCircleQuestionRenderer.css';

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 150;
const PADDING = 40;

// Special angles in radians with their coordinates
const SPECIAL_ANGLES = [
  { deg: 0, rad: 0, label: '0', x: 1, y: 0 },
  { deg: 30, rad: Math.PI / 6, label: 'π/6', x: Math.sqrt(3) / 2, y: 0.5 },
  { deg: 45, rad: Math.PI / 4, label: 'π/4', x: Math.sqrt(2) / 2, y: Math.sqrt(2) / 2 },
  { deg: 60, rad: Math.PI / 3, label: 'π/3', x: 0.5, y: Math.sqrt(3) / 2 },
  { deg: 90, rad: Math.PI / 2, label: 'π/2', x: 0, y: 1 },
  { deg: 120, rad: (2 * Math.PI) / 3, label: '2π/3', x: -0.5, y: Math.sqrt(3) / 2 },
  { deg: 135, rad: (3 * Math.PI) / 4, label: '3π/4', x: -Math.sqrt(2) / 2, y: Math.sqrt(2) / 2 },
  { deg: 150, rad: (5 * Math.PI) / 6, label: '5π/6', x: -Math.sqrt(3) / 2, y: 0.5 },
  { deg: 180, rad: Math.PI, label: 'π', x: -1, y: 0 },
  { deg: 210, rad: (7 * Math.PI) / 6, label: '7π/6', x: -Math.sqrt(3) / 2, y: -0.5 },
  { deg: 225, rad: (5 * Math.PI) / 4, label: '5π/4', x: -Math.sqrt(2) / 2, y: -Math.sqrt(2) / 2 },
  { deg: 240, rad: (4 * Math.PI) / 3, label: '4π/3', x: -0.5, y: -Math.sqrt(3) / 2 },
  { deg: 270, rad: (3 * Math.PI) / 2, label: '3π/2', x: 0, y: -1 },
  { deg: 300, rad: (5 * Math.PI) / 3, label: '5π/3', x: 0.5, y: -Math.sqrt(3) / 2 },
  { deg: 315, rad: (7 * Math.PI) / 4, label: '7π/4', x: Math.sqrt(2) / 2, y: -Math.sqrt(2) / 2 },
  { deg: 330, rad: (11 * Math.PI) / 6, label: '11π/6', x: Math.sqrt(3) / 2, y: -0.5 },
  { deg: 360, rad: 2 * Math.PI, label: '2π', x: 1, y: 0 },
];

// Convert unit circle coordinates to SVG coordinates
function toSvg(x, y) {
  return {
    x: CENTER + x * RADIUS,
    y: CENTER - y * RADIUS, // Flip Y for SVG
  };
}

// Convert SVG coordinates to unit circle coordinates
function fromSvg(svgX, svgY) {
  return {
    x: (svgX - CENTER) / RADIUS,
    y: -(svgY - CENTER) / RADIUS, // Flip Y back
  };
}

// Find closest special angle within tolerance (in radians)
function snapToSpecialAngle(rad, tolerance = 0.15) {
  const normalizedRad = ((rad % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  for (const special of SPECIAL_ANGLES) {
    if (Math.abs(normalizedRad - special.rad) < tolerance) {
      return special;
    }
  }
  return null;
}

// Calculate angle from coordinates
function getAngleFromCoords(x, y) {
  let angle = Math.atan2(y, x);
  if (angle < 0) angle += 2 * Math.PI;
  return angle;
}

// Get quadrant from angle
function getQuadrant(rad) {
  const normalized = ((rad % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  if (normalized < Math.PI / 2) return 1;
  if (normalized < Math.PI) return 2;
  if (normalized < (3 * Math.PI) / 2) return 3;
  return 4;
}

// Draw arc path for angle
function describeArc(startAngle, endAngle, arcRadius) {
  const startX = CENTER + Math.cos(startAngle) * arcRadius;
  const startY = CENTER - Math.sin(startAngle) * arcRadius;
  const endX = CENTER + Math.cos(endAngle) * arcRadius;
  const endY = CENTER - Math.sin(endAngle) * arcRadius;
  
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
  
  return `M ${CENTER} ${CENTER} L ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${endX} ${endY} Z`;
}

// Process click on SVG to get angle
function processCircleClick(e, snapToSpecial) {
  const svg = e.currentTarget;
  const rect = svg.getBoundingClientRect();
  const svgX = ((e.clientX - rect.left) / rect.width) * SIZE;
  const svgY = ((e.clientY - rect.top) / rect.height) * SIZE;
  
  const coords = fromSvg(svgX, svgY);
  const dist = Math.sqrt(coords.x ** 2 + coords.y ** 2);
  
  // Normalize to unit circle
  const unitX = coords.x / dist;
  const unitY = coords.y / dist;
  
  let angle = getAngleFromCoords(unitX, unitY);
  
  // Snap to special angles if enabled
  if (snapToSpecial) {
    const snapped = snapToSpecialAngle(angle);
    if (snapped) {
      angle = snapped.rad;
    }
  }
  
  return angle;
}

/**
 * Renders the base unit circle SVG with axes and grid
 */
function UnitCircleSVG({ children, showLabels, onClick, cursor }) {
  return (
    <svg 
      viewBox={`0 0 ${SIZE} ${SIZE}`} 
      className="unit-circle-svg"
      onClick={onClick}
      style={{ cursor: cursor || 'default' }}
    >
      {/* Grid lines */}
      <g className="unit-circle-grid" opacity="0.2">
        {[-1, -0.5, 0.5, 1].map((v) => {
          const pos = toSvg(v, 0);
          return (
            <line 
              key={`vline-${v}`}
              x1={pos.x} y1={PADDING} 
              x2={pos.x} y2={SIZE - PADDING}
              stroke="currentColor" 
              strokeWidth="1"
            />
          );
        })}
        {[-1, -0.5, 0.5, 1].map((v) => {
          const pos = toSvg(0, v);
          return (
            <line 
              key={`hline-${v}`}
              x1={PADDING} y1={pos.y} 
              x2={SIZE - PADDING} y2={pos.y}
              stroke="currentColor" 
              strokeWidth="1"
            />
          );
        })}
      </g>
      
      {/* Axes */}
      <g className="unit-circle-axes">
        <line x1={PADDING} y1={CENTER} x2={SIZE - PADDING} y2={CENTER} stroke="currentColor" strokeWidth="1.5" />
        <line x1={CENTER} y1={PADDING} x2={CENTER} y2={SIZE - PADDING} stroke="currentColor" strokeWidth="1.5" />
        {/* Arrow heads */}
        <polygon points={`${SIZE - PADDING},${CENTER} ${SIZE - PADDING - 8},${CENTER - 4} ${SIZE - PADDING - 8},${CENTER + 4}`} fill="currentColor" />
        <polygon points={`${CENTER},${PADDING} ${CENTER - 4},${PADDING + 8} ${CENTER + 4},${PADDING + 8}`} fill="currentColor" />
      </g>
      
      {/* Unit circle */}
      <circle 
        cx={CENTER} 
        cy={CENTER} 
        r={RADIUS} 
        fill="none" 
        stroke="rgb(59, 130, 246)" 
        strokeWidth="2"
        className="unit-circle-main"
      />
      
      {/* Special angle dots */}
      {showLabels && SPECIAL_ANGLES.slice(0, -1).map((angle) => {
        const pos = toSvg(angle.x, angle.y);
        return (
          <g key={angle.deg} className="unit-circle-special-point">
            <circle cx={pos.x} cy={pos.y} r="3" fill="rgb(156, 163, 175)" />
            <text 
              x={pos.x + (angle.x > 0 ? 12 : -12)} 
              y={pos.y + (angle.y > 0 ? -8 : 12)}
              className="unit-circle-label"
              textAnchor={angle.x > 0 ? 'start' : 'end'}
              fontSize="10"
              fill="currentColor"
              opacity="0.6"
            >
              {angle.label}
            </text>
          </g>
        );
      })}
      
      {/* Axis labels */}
      <text x={SIZE - PADDING + 15} y={CENTER + 5} fontSize="14" fill="currentColor">x</text>
      <text x={CENTER + 8} y={PADDING - 10} fontSize="14" fill="currentColor">y</text>
      <text x={CENTER + 8} y={CENTER + 18} fontSize="12" fill="currentColor" opacity="0.6">O</text>
      
      {children}
    </svg>
  );
}

/**
 * ANGLE_INPUT: User clicks on the unit circle to place an angle
 */
function AngleInputMode({ questionBody, value, onChange, disabled }) {
  const showLabels = questionBody?.showLabels !== false;
  const snapToSpecial = questionBody?.snapToSpecialAngles !== false;
  const showCoordinates = questionBody?.showCoordinates !== false;
  
  const currentAngle = value?.angle ?? null;
  const currentPoint = currentAngle !== null ? {
    x: Math.cos(currentAngle),
    y: Math.sin(currentAngle),
  } : null;
  
  const handleCircleClick = useCallback((e) => {
    if (disabled) return;
    const angle = processCircleClick(e, snapToSpecial);
    onChange?.({ angle, x: Math.cos(angle), y: Math.sin(angle) });
  }, [disabled, onChange, snapToSpecial]);
  
  return (
    <div className="unit-circle-angle-input" data-testid="unit-circle-angle-input">
      <div className="unit-circle-canvas-wrap">
        <UnitCircleSVG 
          showLabels={showLabels} 
          onClick={handleCircleClick}
          cursor={disabled ? 'default' : 'crosshair'}
        >
          {/* Current angle arc */}
          {currentAngle !== null && currentAngle > 0 && (
            <path
              d={describeArc(0, currentAngle, 40)}
              fill="rgba(16, 185, 129, 0.2)"
              stroke="rgb(16, 185, 129)"
              strokeWidth="2"
              className="unit-circle-arc"
            />
          )}
          
          {/* Current point */}
          {currentPoint && (
            <g className="unit-circle-current-point">
              <line 
                x1={CENTER} y1={CENTER} 
                x2={toSvg(currentPoint.x, currentPoint.y).x} 
                y2={toSvg(currentPoint.x, currentPoint.y).y}
                stroke="rgb(16, 185, 129)"
                strokeWidth="2"
              />
              <circle 
                cx={toSvg(currentPoint.x, currentPoint.y).x} 
                cy={toSvg(currentPoint.x, currentPoint.y).y} 
                r="8" 
                fill="rgb(16, 185, 129)"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          )}
        </UnitCircleSVG>
      </div>
      
      {/* Display current value */}
      {showCoordinates && currentAngle !== null && (
        <div className="unit-circle-info">
          <div className="unit-circle-info-row">
            <span className="unit-circle-info-label">Angle (θ):</span>
            <span className="unit-circle-info-value">
              {(currentAngle * 180 / Math.PI).toFixed(1)}° = {(currentAngle / Math.PI).toFixed(3)}π rad
            </span>
          </div>
          <div className="unit-circle-info-row">
            <span className="unit-circle-info-label">Point:</span>
            <span className="unit-circle-info-value">
              (cos θ, sin θ) = ({currentPoint.x.toFixed(3)}, {currentPoint.y.toFixed(3)})
            </span>
          </div>
          <div className="unit-circle-info-row">
            <span className="unit-circle-info-label">Quadrant:</span>
            <span className="unit-circle-info-value">Q{getQuadrant(currentAngle)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ADD_POINTS: User clicks to add multiple points on the unit circle
 */
function AddPointsMode({ questionBody, value, onChange, disabled }) {
  const maxPoints = questionBody?.maxPoints ?? 2;
  const showLabels = questionBody?.showLabels !== false;
  const snapToSpecial = questionBody?.snapToSpecialAngles !== false;
  
  const points = value?.points ?? [];
  
  const handleCircleClick = useCallback((e) => {
    if (disabled || points.length >= maxPoints) return;
    
    const angle = processCircleClick(e, snapToSpecial);
    const newPoint = {
      angle,
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    
    onChange?.({ points: [...points, newPoint] });
  }, [disabled, onChange, points, maxPoints, snapToSpecial]);
  
  const handleRemovePoint = useCallback((index) => {
    if (disabled) return;
    const newPoints = points.filter((_, i) => i !== index);
    onChange?.({ points: newPoints });
  }, [disabled, onChange, points]);
  
  return (
    <div className="unit-circle-add-points" data-testid="unit-circle-add-points">
      <div className="unit-circle-canvas-wrap">
        <UnitCircleSVG 
          showLabels={showLabels}
          onClick={handleCircleClick}
          cursor={disabled || points.length >= maxPoints ? 'default' : 'crosshair'}
        >
          {/* Placed points */}
          {points.map((point, index) => {
            const pos = toSvg(point.x, point.y);
            return (
              <g key={index} className="unit-circle-placed-point">
                <line 
                  x1={CENTER} y1={CENTER} 
                  x2={pos.x} y2={pos.y}
                  stroke="rgb(16, 185, 129)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <circle 
                  cx={pos.x} 
                  cy={pos.y} 
                  r="10" 
                  fill="rgb(16, 185, 129)"
                  stroke="white"
                  strokeWidth="2"
                  style={{ cursor: disabled ? 'default' : 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePoint(index);
                  }}
                />
                <text 
                  x={pos.x} 
                  y={pos.y + 4} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="white"
                  style={{ pointerEvents: 'none' }}
                >
                  {index + 1}
                </text>
              </g>
            );
          })}
        </UnitCircleSVG>
      </div>
      
      {/* Points info */}
      <div className="unit-circle-points-info">
        <div className="unit-circle-points-count">
          Points: {points.length} / {maxPoints}
        </div>
        {points.length > 0 && (
          <div className="unit-circle-points-list">
            {points.map((point, index) => (
              <div key={index} className="unit-circle-point-item">
                <span>Point {index + 1}: θ = {(point.angle * 180 / Math.PI).toFixed(0)}°</span>
                {!disabled && (
                  <button 
                    className="unit-circle-remove-btn"
                    onClick={() => handleRemovePoint(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * DISPLAY_SELECT: User selects from options (e.g., quadrant, trig value sign)
 */
function DisplaySelectMode({ questionBody, value, onChange, disabled }) {
  const options = questionBody?.options ?? [];
  const showCircle = questionBody?.showCircle !== false;
  const highlightAngle = questionBody?.highlightAngle;
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
  
  return (
    <div className="unit-circle-display-select" data-testid="unit-circle-display-select">
      {showCircle && (
        <div className="unit-circle-canvas-wrap unit-circle-canvas-small">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="unit-circle-svg">
            {/* Axes */}
            <g className="unit-circle-axes">
              <line x1={PADDING} y1={CENTER} x2={SIZE - PADDING} y2={CENTER} stroke="currentColor" strokeWidth="1.5" />
              <line x1={CENTER} y1={PADDING} x2={CENTER} y2={SIZE - PADDING} stroke="currentColor" strokeWidth="1.5" />
            </g>
            
            {/* Unit circle */}
            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2" />
            
            {/* Quadrant labels */}
            <text x={CENTER + 60} y={CENTER - 60} fontSize="20" fill="currentColor" opacity="0.4">I</text>
            <text x={CENTER - 70} y={CENTER - 60} fontSize="20" fill="currentColor" opacity="0.4">II</text>
            <text x={CENTER - 75} y={CENTER + 75} fontSize="20" fill="currentColor" opacity="0.4">III</text>
            <text x={CENTER + 55} y={CENTER + 75} fontSize="20" fill="currentColor" opacity="0.4">IV</text>
            
            {/* Highlight angle if provided */}
            {highlightAngle !== undefined && (
              <g className="unit-circle-highlight">
                <path
                  d={describeArc(0, highlightAngle, 50)}
                  fill="rgba(59, 130, 246, 0.2)"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                />
                <line 
                  x1={CENTER} y1={CENTER}
                  x2={CENTER + Math.cos(highlightAngle) * RADIUS}
                  y2={CENTER - Math.sin(highlightAngle) * RADIUS}
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                />
                <circle 
                  cx={CENTER + Math.cos(highlightAngle) * RADIUS}
                  cy={CENTER - Math.sin(highlightAngle) * RADIUS}
                  r="6"
                  fill="rgb(59, 130, 246)"
                />
              </g>
            )}
          </svg>
        </div>
      )}
      
      <div className="unit-circle-options">
        {options.map((option) => {
          const isSelected = multiSelect
            ? (selected ?? []).includes(option.value)
            : selected === option.value;
            
          return (
            <button
              key={option.value}
              className={`unit-circle-option ${isSelected ? 'selected' : ''}`}
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
 * PARAMETER_ADJUST: User adjusts sliders to set angle (for degree/radian conversion)
 */
function ParameterAdjustMode({ questionBody, value, onChange, disabled }) {
  const inputType = questionBody?.inputType ?? 'radians';
  const showCircle = questionBody?.showUnitCircle !== false;
  const denominatorOptions = questionBody?.denominatorOptions ?? [1, 2, 3, 4, 6];
  
  const params = value?.params ?? { numerator: 0, denominator: 6 };
  const numerator = params.numerator ?? 0;
  const denominator = params.denominator ?? 6;
  
  const angleRad = inputType === 'radians' 
    ? (numerator * Math.PI) / denominator
    : (numerator * Math.PI) / 180;
  
  const handleChange = useCallback((param, val) => {
    if (disabled) return;
    onChange?.({ params: { ...params, [param]: Number(val) } });
  }, [disabled, onChange, params]);
  
  return (
    <div className="unit-circle-parameter-adjust" data-testid="unit-circle-parameter-adjust">
      <div className="unit-circle-sliders">
        <div className="unit-circle-fraction-input">
          <label>Angle in radians:</label>
          <div className="unit-circle-fraction">
            <input
              type="number"
              value={numerator}
              onChange={(e) => handleChange('numerator', e.target.value)}
              disabled={disabled}
              min={0}
              max={12}
              className="unit-circle-fraction-num"
            />
            <span className="unit-circle-fraction-pi">π</span>
            <span className="unit-circle-fraction-slash">/</span>
            <select
              value={denominator}
              onChange={(e) => handleChange('denominator', e.target.value)}
              disabled={disabled}
              className="unit-circle-fraction-denom"
            >
              {denominatorOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="unit-circle-result">
          <span className="unit-circle-result-label">= </span>
          <span className="unit-circle-result-value">
            {(angleRad * 180 / Math.PI).toFixed(1)}°
          </span>
        </div>
      </div>
      
      {showCircle && (
        <div className="unit-circle-canvas-wrap">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="unit-circle-svg">
            {/* Axes */}
            <g className="unit-circle-axes">
              <line x1={PADDING} y1={CENTER} x2={SIZE - PADDING} y2={CENTER} stroke="currentColor" strokeWidth="1.5" />
              <line x1={CENTER} y1={PADDING} x2={CENTER} y2={SIZE - PADDING} stroke="currentColor" strokeWidth="1.5" />
            </g>
            
            {/* Unit circle */}
            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2" />
            
            {/* Angle arc */}
            {angleRad > 0 && (
              <path
                d={describeArc(0, angleRad, 50)}
                fill="rgba(16, 185, 129, 0.2)"
                stroke="rgb(16, 185, 129)"
                strokeWidth="2"
              />
            )}
            
            {/* Radius line */}
            <line 
              x1={CENTER} y1={CENTER}
              x2={CENTER + Math.cos(angleRad) * RADIUS}
              y2={CENTER - Math.sin(angleRad) * RADIUS}
              stroke="rgb(16, 185, 129)"
              strokeWidth="2"
            />
            
            {/* Point on circle */}
            <circle 
              cx={CENTER + Math.cos(angleRad) * RADIUS}
              cy={CENTER - Math.sin(angleRad) * RADIUS}
              r="8"
              fill="rgb(16, 185, 129)"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

/**
 * UnitCircleQuestionRenderer
 * Renders interactive unit circle questions for trigonometry
 */
const UnitCircleQuestionRenderer = ({
  questionType,
  interactionMode,
  questionBody,
  value,
  onChange,
  disabled,
}) => {
  // Render the appropriate mode component
  switch (interactionMode) {
    case InteractionMode.ANGLE_INPUT:
      return (
        <AngleInputMode
          questionBody={questionBody}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    
    case InteractionMode.ADD_POINTS:
      return (
        <AddPointsMode
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
    
    case InteractionMode.PARAMETER_ADJUST:
      return (
        <ParameterAdjustMode
          questionBody={questionBody}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    
    default:
      return (
        <div className="unit-circle-unknown" data-testid="unit-circle-unknown">
          Unit circle does not support interaction mode: {interactionMode}
        </div>
      );
  }
};

UnitCircleQuestionRenderer.questionType = QuestionType.UNIT_CIRCLE;

export default UnitCircleQuestionRenderer;
