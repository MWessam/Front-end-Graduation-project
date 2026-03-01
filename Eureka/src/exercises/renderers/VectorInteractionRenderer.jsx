import React, { useState, useRef, useEffect } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './VectorInteractionRenderer.css';

const GRID_SIZE = 40;
const ORIGIN_X = 300;
const ORIGIN_Y = 200;
const HIT_RADIUS = 20;

function gridToPixel(gx, gy) {
  return {
    x: ORIGIN_X + gx * GRID_SIZE,
    y: ORIGIN_Y - gy * GRID_SIZE,
  };
}

function pixelToGrid(px, py) {
  return {
    x: Math.round((px - ORIGIN_X) / GRID_SIZE),
    y: Math.round((ORIGIN_Y - py) / GRID_SIZE),
  };
}

const VectorInteractionRenderer = ({ questionType, interactionMode, questionBody, value, onChange, disabled }) => {
  const vectors = questionBody?.vectors || [];
  const correctAnswer = value?.correctAnswer;
  const displayVector = (() => {
    if (correctAnswer?.start != null && correctAnswer?.end != null) {
      const gx0 = Math.round(Number(correctAnswer.start.x));
      const gy0 = Math.round(Number(correctAnswer.start.y));
      const gx1 = Math.round(Number(correctAnswer.end.x));
      const gy1 = Math.round(Number(correctAnswer.end.y));
      return {
        start: gridToPixel(gx0, gy0),
        end: gridToPixel(gx1, gy1),
      };
    }
    return value?.userVector || null;
  })();
  const [userVector, setUserVector] = useState(displayVector);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState(null);

  const svgRef = useRef(null);

  useEffect(() => {
    if (correctAnswer?.start != null && correctAnswer?.end != null) {
      const gx0 = Math.round(Number(correctAnswer.start.x));
      const gy0 = Math.round(Number(correctAnswer.start.y));
      const gx1 = Math.round(Number(correctAnswer.end.x));
      const gy1 = Math.round(Number(correctAnswer.end.y));
      setUserVector({
        start: gridToPixel(gx0, gy0),
        end: gridToPixel(gx1, gy1),
      });
    } else if (value?.userVector) {
      setUserVector(value.userVector);
    }
  }, [value, correctAnswer]);

  const getSvgPoint = (clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  const snapPixelToIntegerGrid = (px, py) => {
    const g = pixelToGrid(px, py);
    return gridToPixel(g.x, g.y);
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    const pt = getSvgPoint(e.clientX, e.clientY);
    const snapped = snapPixelToIntegerGrid(pt.x, pt.y);

    if (userVector) {
      const headDist = Math.hypot(userVector.end.x - pt.x, userVector.end.y - pt.y);
      const tailDist = Math.hypot(userVector.start.x - pt.x, userVector.start.y - pt.y);
      if (headDist < HIT_RADIUS) {
        setIsDragging(true);
        setDragType('end');
        return;
      }
      if (tailDist < HIT_RADIUS) {
        setIsDragging(true);
        setDragType('start');
        return;
      }
    }

    setUserVector({ start: snapped, end: snapped });
    setIsDragging(true);
    setDragType('new');
  };

  const handleMouseMove = (e) => {
    if (!isDragging || disabled) return;
    const pt = getSvgPoint(e.clientX, e.clientY);
    const snapped = snapPixelToIntegerGrid(pt.x, pt.y);
    if (dragType === 'new' || dragType === 'end') {
      setUserVector(prev => ({ ...prev, end: snapped }));
    } else if (dragType === 'start') {
      setUserVector(prev => ({ ...prev, start: snapped }));
    }
  };

  const handleMouseUp = () => {
    if (isDragging && userVector) {
      const snappedStart = snapPixelToIntegerGrid(userVector.start.x, userVector.start.y);
      const snappedEnd = snapPixelToIntegerGrid(userVector.end.x, userVector.end.y);
      const snappedVector = { start: snappedStart, end: snappedEnd };
      setUserVector(snappedVector);
      setIsDragging(false);
      setDragType(null);
      const gStart = pixelToGrid(snappedStart.x, snappedStart.y);
      const gEnd = pixelToGrid(snappedEnd.x, snappedEnd.y);
      onChange?.({ userVector: snappedVector, gridVector: { start: gStart, end: gEnd } });
    } else if (isDragging) {
      setIsDragging(false);
      setDragType(null);
    }
  };

  const renderGrid = () => {
    const lines = [];
    const width = 600;
    const height = 400;
    for (let n = -8; n <= 8; n++) {
      const x = ORIGIN_X + n * GRID_SIZE;
      if (x >= 0 && x <= width) {
        lines.push(<line key={`v-${n}`} x1={x} y1={0} x2={x} y2={height} stroke="#e2e8f0" strokeWidth="1" />);
      }
    }
    for (let n = -6; n <= 6; n++) {
      const y = ORIGIN_Y - n * GRID_SIZE;
      if (y >= 0 && y <= height) {
        lines.push(<line key={`h-${n}`} x1={0} y1={y} x2={width} y2={y} stroke="#e2e8f0" strokeWidth="1" />);
      }
    }
    return lines;
  };

  const renderArrow = (start, end, color, label) => {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const headLen = 10;
    const x1 = end.x - headLen * Math.cos(angle - Math.PI / 6);
    const y1 = end.y - headLen * Math.sin(angle - Math.PI / 6);
    const x2 = end.x - headLen * Math.cos(angle + Math.PI / 6);
    const y2 = end.y - headLen * Math.sin(angle + Math.PI / 6);

    return (
      <g>
        <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} strokeWidth="3" />
        <polygon points={`${end.x},${end.y} ${x1},${y1} ${x2},${y2}`} fill={color} />
        {label && (
            <text x={(start.x + end.x) / 2} y={(start.y + end.y) / 2 - 10} fill={color} fontSize="14" fontWeight="bold">
                {label}
            </text>
        )}
      </g>
    );
  };

  return (
    <div className="vector-renderer-container">
      <svg
        ref={svgRef}
        width="600"
        height="400"
        className="vector-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ border: '1px solid #ccc', backgroundColor: '#fff', cursor: isDragging ? 'grabbing' : 'crosshair' }}
      >
        {renderGrid()}
        
        <line x1={ORIGIN_X} y1="0" x2={ORIGIN_X} y2="400" stroke="#94a3b8" strokeWidth="2" />
        <line x1="0" y1={ORIGIN_Y} x2="600" y2={ORIGIN_Y} stroke="#94a3b8" strokeWidth="2" />

        {/* Given Vectors (integer grid: 1, 2, 3... from origin) */}
        {vectors.map((v, i) => {
            const startP = gridToPixel(Number(v.start.x), Number(v.start.y));
            const endP = gridToPixel(Number(v.end.x), Number(v.end.y));
            return <React.Fragment key={i}>{renderArrow(startP, endP, v.color || '#3b82f6', v.label)}</React.Fragment>;
        })}

        {/* User Vector or correct answer */}
        {userVector && renderArrow(userVector.start, userVector.end, '#ef4444', 'R')}
        
        {/* Ghost line while dragging new vector */}
        {isDragging && dragType === 'new' && (
            <line 
                x1={userVector.start.x} 
                y1={userVector.start.y} 
                x2={userVector.end.x} 
                y2={userVector.end.y} 
                stroke="#ef4444" 
                strokeWidth="1" 
                strokeDasharray="4" 
            />
        )}
      </svg>
      <div className="vector-controls">
        <p className="text-sm text-gray-500 mt-2">
            Click and drag on the grid to create the Resultant Vector (R). Drag endpoints to adjust.
        </p>
      </div>
    </div>
  );
};

VectorInteractionRenderer.questionType = QuestionType.MATH_VECTOR_OPERATION;
export default VectorInteractionRenderer;
