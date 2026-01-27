import React, { useCallback, useRef } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './GeometryQuestionRenderer.css';

const SIZE = 500;
const PADDING = 50;

// Helper to calculate triangle vertices from sides using law of cosines
function calculateTriangleVertices(sides, scale = 1, offset = { x: 0, y: 0 }) {
  const [a, b, c] = sides.map((s) => s * scale);
  
  // Place first vertex at origin, second on x-axis
  const A = { x: offset.x, y: offset.y };
  const B = { x: offset.x + c, y: offset.y };
  
  // Use law of cosines to find angle at A
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const angleA = Math.acos(Math.max(-1, Math.min(1, cosA)));
  
  const C = {
    x: offset.x + b * Math.cos(angleA),
    y: offset.y - b * Math.sin(angleA), // Negative for SVG coordinates
  };
  
  return { A, B, C };
}

// Draw triangle path
function trianglePath(vertices) {
  const { A, B, C } = vertices;
  return `M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`;
}

// Calculate centroid
function centroid(vertices) {
  const { A, B, C } = vertices;
  return {
    x: (A.x + B.x + C.x) / 3,
    y: (A.y + B.y + C.y) / 3,
  };
}

// Prepare triangle data from question body
function prepareTriangleData(triangles, scale = 30) {
  return triangles.map((t, index) => {
    const offset = {
      x: PADDING + (index * (SIZE - 2 * PADDING)) / Math.max(triangles.length, 1) + 50,
      y: SIZE / 2 + 50,
    };
    return {
      ...t,
      vertices: calculateTriangleVertices(t.sides, scale, offset),
    };
  });
}

/**
 * Renders triangles in an SVG
 */
function TriangleSVG({ triangleData }) {
  return (
    <>
      {triangleData.map((triangle, index) => {
        const { vertices, name, sides } = triangle;
        const center = centroid(vertices);
        
        return (
          <g key={index} className="geometry-triangle">
            {/* Triangle fill */}
            <path
              d={trianglePath(vertices)}
              fill={`rgba(59, 130, 246, ${0.1 + index * 0.1})`}
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
            />
            
            {/* Vertex labels */}
            {name && (
              <>
                <text
                  x={vertices.A.x - 15}
                  y={vertices.A.y + 5}
                  fontSize="14"
                  fill="currentColor"
                  fontWeight="600"
                >
                  {name[0]}
                </text>
                <text
                  x={vertices.B.x + 10}
                  y={vertices.B.y + 5}
                  fontSize="14"
                  fill="currentColor"
                  fontWeight="600"
                >
                  {name[1]}
                </text>
                <text
                  x={vertices.C.x + (vertices.C.x > center.x ? 10 : -15)}
                  y={vertices.C.y - 10}
                  fontSize="14"
                  fill="currentColor"
                  fontWeight="600"
                >
                  {name[2]}
                </text>
              </>
            )}
            
            {/* Side lengths */}
            {sides && (
              <>
                <text
                  x={(vertices.B.x + vertices.C.x) / 2 + 10}
                  y={(vertices.B.y + vertices.C.y) / 2}
                  fontSize="12"
                  fill="rgb(59, 130, 246)"
                  fontWeight="500"
                >
                  {sides[0]}
                </text>
                <text
                  x={(vertices.A.x + vertices.C.x) / 2 - 20}
                  y={(vertices.A.y + vertices.C.y) / 2}
                  fontSize="12"
                  fill="rgb(59, 130, 246)"
                  fontWeight="500"
                >
                  {sides[1]}
                </text>
                <text
                  x={(vertices.A.x + vertices.B.x) / 2}
                  y={vertices.A.y + 20}
                  fontSize="12"
                  fill="rgb(59, 130, 246)"
                  fontWeight="500"
                >
                  {sides[2]}
                </text>
              </>
            )}
          </g>
        );
      })}
    </>
  );
}

/**
 * DISPLAY_SELECT: User selects from options about geometric figures
 */
function DisplaySelectMode({ questionBody, value, onChange, disabled }) {
  const triangles = questionBody?.triangles ?? [];
  const options = questionBody?.options ?? [];
  const showDiagram = questionBody?.showDiagram !== false;
  
  const selected = value?.selected;
  const triangleData = prepareTriangleData(triangles);
  
  const handleSelect = useCallback((optionValue) => {
    if (disabled) return;
    onChange?.({ selected: optionValue });
  }, [disabled, onChange]);
  
  return (
    <div className="geometry-display-select" data-testid="geometry-display-select">
      {showDiagram && triangleData.length > 0 && (
        <div className="geometry-canvas-wrap">
          <svg viewBox={`0 0 ${SIZE} ${SIZE * 0.7}`} className="geometry-svg">
            <TriangleSVG triangleData={triangleData} />
          </svg>
        </div>
      )}
      
      <div className="geometry-options">
        {options.map((option) => (
          <button
            key={option.value}
            className={`geometry-option ${selected === option.value ? 'selected' : ''}`}
            onClick={() => handleSelect(option.value)}
            disabled={disabled}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * NUMERIC_INPUT: User enters a numeric answer (e.g., scale factor, side length)
 */
function NumericInputMode({ questionBody, value, onChange, disabled }) {
  const triangles = questionBody?.triangles ?? [];
  const showDiagram = questionBody?.showDiagram !== false;
  const placeholder = questionBody?.placeholder ?? 'Enter value';
  const unit = questionBody?.unit ?? '';
  const label = questionBody?.label ?? 'Answer:';
  
  const answer = value?.answer ?? '';
  const triangleData = prepareTriangleData(triangles);
  
  const handleChange = useCallback((e) => {
    if (disabled) return;
    onChange?.({ answer: e.target.value });
  }, [disabled, onChange]);
  
  return (
    <div className="geometry-numeric-input" data-testid="geometry-numeric-input">
      {showDiagram && triangleData.length > 0 && (
        <div className="geometry-canvas-wrap">
          <svg viewBox={`0 0 ${SIZE} ${SIZE * 0.7}`} className="geometry-svg">
            <TriangleSVG triangleData={triangleData} />
          </svg>
        </div>
      )}
      
      <div className="geometry-input-group">
        <label className="geometry-input-label">{label}</label>
        <div className="geometry-input-row">
          <input
            type="number"
            value={answer}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            className="geometry-input"
            step="any"
          />
          {unit && <span className="geometry-input-unit">{unit}</span>}
        </div>
      </div>
    </div>
  );
}

/**
 * ADD_POINTS: User clicks to add points (e.g., mark vertices)
 */
function AddPointsMode({ questionBody, value, onChange, disabled }) {
  const triangles = questionBody?.triangles ?? [];
  const maxPoints = questionBody?.maxPoints ?? 3;
  const showDiagram = questionBody?.showDiagram !== false;
  
  const points = value?.points ?? [];
  const svgRef = useRef(null);
  const triangleData = prepareTriangleData(triangles);
  
  const handleClick = useCallback((e) => {
    if (disabled || points.length >= maxPoints) return;
    
    const svg = svgRef.current;
    if (!svg) return;
    
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * (SIZE * 0.7);
    
    onChange?.({ points: [...points, { x, y }] });
  }, [disabled, points, maxPoints, onChange]);
  
  const handleRemovePoint = useCallback((index) => {
    if (disabled) return;
    onChange?.({ points: points.filter((_, i) => i !== index) });
  }, [disabled, points, onChange]);
  
  return (
    <div className="geometry-add-points" data-testid="geometry-add-points">
      <div className="geometry-canvas-wrap">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE * 0.7}`}
          className="geometry-svg"
          onClick={handleClick}
          style={{ cursor: disabled || points.length >= maxPoints ? 'default' : 'crosshair' }}
        >
          {/* Background grid */}
          <g className="geometry-grid" opacity="0.1">
            {Array.from({ length: 11 }).map((_, i) => {
              const x = PADDING + (i * (SIZE - 2 * PADDING)) / 10;
              return <line key={`v${i}`} x1={x} y1={0} x2={x} y2={SIZE * 0.7} stroke="currentColor" />;
            })}
            {Array.from({ length: 8 }).map((_, i) => {
              const y = (i * SIZE * 0.7) / 7;
              return <line key={`h${i}`} x1={PADDING} y1={y} x2={SIZE - PADDING} y2={y} stroke="currentColor" />;
            })}
          </g>
          
          {/* Triangles */}
          <TriangleSVG triangleData={triangleData} />
          
          {/* User placed points */}
          {points.map((point, index) => (
            <g key={index} className="geometry-point">
              <circle
                cx={point.x}
                cy={point.y}
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
                x={point.x}
                y={point.y + 4}
                textAnchor="middle"
                fontSize="10"
                fill="white"
                style={{ pointerEvents: 'none' }}
              >
                {index + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="geometry-points-info">
        <span>Points: {points.length} / {maxPoints}</span>
        {points.length > 0 && !disabled && (
          <button
            className="geometry-clear-btn"
            onClick={() => onChange?.({ points: [] })}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * PARAMETER_ADJUST: User adjusts parameters (e.g., scale factor slider)
 */
function ParameterAdjustMode({ questionBody, value, onChange, disabled }) {
  const baseTriangle = questionBody?.baseTriangle ?? { name: 'ABC', sides: [3, 4, 5] };
  const sliders = questionBody?.sliders ?? [
    { param: 'scale', min: 0.5, max: 3, step: 0.1, label: 'Scale Factor' },
  ];
  
  const params = value?.params ?? { scale: 1 };
  const scale = params.scale ?? 1;
  
  const handleSlider = useCallback((param, val) => {
    if (disabled) return;
    onChange?.({ params: { ...params, [param]: Number(val) } });
  }, [disabled, params, onChange]);
  
  // Calculate both triangles
  const baseVertices = calculateTriangleVertices(baseTriangle.sides, 40, { x: PADDING + 50, y: SIZE / 2 + 50 });
  const scaledVertices = calculateTriangleVertices(
    baseTriangle.sides.map((s) => s * scale),
    40,
    { x: SIZE / 2 + 50, y: SIZE / 2 + 50 }
  );
  
  return (
    <div className="geometry-parameter-adjust" data-testid="geometry-parameter-adjust">
      <div className="geometry-canvas-wrap">
        <svg viewBox={`0 0 ${SIZE} ${SIZE * 0.7}`} className="geometry-svg">
          {/* Base triangle */}
          <g className="geometry-triangle geometry-triangle-base">
            <path
              d={trianglePath(baseVertices)}
              fill="rgba(59, 130, 246, 0.1)"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
            />
            <text x={baseVertices.A.x - 15} y={baseVertices.A.y + 5} fontSize="14" fill="rgb(59, 130, 246)" fontWeight="600">A</text>
            <text x={baseVertices.B.x + 10} y={baseVertices.B.y + 5} fontSize="14" fill="rgb(59, 130, 246)" fontWeight="600">B</text>
            <text x={baseVertices.C.x - 15} y={baseVertices.C.y - 10} fontSize="14" fill="rgb(59, 130, 246)" fontWeight="600">C</text>
          </g>
          
          {/* Scaled triangle */}
          <g className="geometry-triangle geometry-triangle-scaled">
            <path
              d={trianglePath(scaledVertices)}
              fill="rgba(16, 185, 129, 0.1)"
              stroke="rgb(16, 185, 129)"
              strokeWidth="2"
              strokeDasharray="8 4"
            />
            <text x={scaledVertices.A.x - 15} y={scaledVertices.A.y + 5} fontSize="14" fill="rgb(16, 185, 129)" fontWeight="600">A'</text>
            <text x={scaledVertices.B.x + 10} y={scaledVertices.B.y + 5} fontSize="14" fill="rgb(16, 185, 129)" fontWeight="600">B'</text>
            <text x={scaledVertices.C.x + 10} y={scaledVertices.C.y - 10} fontSize="14" fill="rgb(16, 185, 129)" fontWeight="600">C'</text>
          </g>
          
          {/* Legend */}
          <g transform="translate(20, 20)">
            <rect x="0" y="0" width="15" height="15" fill="rgba(59, 130, 246, 0.3)" stroke="rgb(59, 130, 246)" strokeWidth="2" />
            <text x="22" y="12" fontSize="12" fill="currentColor">Original</text>
            <rect x="0" y="25" width="15" height="15" fill="rgba(16, 185, 129, 0.3)" stroke="rgb(16, 185, 129)" strokeWidth="2" strokeDasharray="4 2" />
            <text x="22" y="37" fontSize="12" fill="currentColor">Scaled (k = {scale})</text>
          </g>
        </svg>
      </div>
      
      <div className="geometry-sliders">
        {sliders.map(({ param, min, max, step, label }) => (
          <div key={param} className="geometry-slider-row">
            <label className="geometry-slider-label">
              <span>{label}</span>
              <span className="geometry-slider-value">{params[param] ?? 1}</span>
            </label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={params[param] ?? 1}
              onChange={(e) => handleSlider(param, e.target.value)}
              disabled={disabled}
              className="geometry-slider"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * GeometryQuestionRenderer
 * Renders interactive geometry questions
 */
const GeometryQuestionRenderer = ({
  questionType,
  interactionMode,
  questionBody,
  value,
  onChange,
  disabled,
}) => {
  switch (interactionMode) {
    case InteractionMode.DISPLAY_SELECT:
      return (
        <DisplaySelectMode
          questionBody={questionBody}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    
    case InteractionMode.NUMERIC_INPUT:
      return (
        <NumericInputMode
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
        <div className="geometry-unknown" data-testid="geometry-unknown">
          Geometry does not support interaction mode: {interactionMode}
        </div>
      );
  }
};

GeometryQuestionRenderer.questionType = QuestionType.GEOMETRY;

export default GeometryQuestionRenderer;
