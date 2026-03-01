import React, { useState, useRef, useEffect } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './MathComplexNumberRenderer.css';

const STRATEGIES = {
  [InteractionMode.COMPLEX_PLANE]: {
    render({ questionBody, value, onChange, disabled }) {
      // value = { r: 1, theta: 0.785 } (polar coordinates)
      // or { re: 0.707, im: 0.707 } (rectangular)
      
      const target = questionBody?.target ?? null; // { re, im } or { r, theta }
      
      const currentRe = value?.re ?? 0.5;
      const currentIm = value?.im ?? 0.5;
      
      const svgRef = useRef(null);
      const [isDragging, setIsDragging] = useState(false);

      const radius = 100; // SVG pixels for unit circle radius
      const center = 150; // SVG center
      
      const toSvgCoords = (re, im) => ({
        x: center + re * radius,
        y: center - im * radius // Y is inverted in SVG
      });

      const fromSvgCoords = (x, y) => ({
        re: (x - center) / radius,
        im: (center - y) / radius
      });

      const { x, y } = toSvgCoords(currentRe, currentIm);

      const handlePointerDown = (e) => {
        if (disabled) return;
        e.target.setPointerCapture(e.pointerId);
        setIsDragging(true);
      };

      const handlePointerMove = (e) => {
        if (!isDragging || disabled) return;
        const svg = svgRef.current;
        if (!svg) return;
        
        const rect = svg.getBoundingClientRect();
        const svgX = e.clientX - rect.left;
        const svgY = e.clientY - rect.top;
        
        let { re, im } = fromSvgCoords(svgX, svgY);
        
        // Optional: Snap to unit circle?
        // Let's constrain max radius to 1.5 for usability, but highlight unit circle
        
        // Update state
        onChange?.({ re, im });
      };

      const handlePointerUp = (e) => {
        setIsDragging(false);
        e.target.releasePointerCapture(e.pointerId);
      };
      
      // Calculations for display
      const r = Math.sqrt(currentRe*currentRe + currentIm*currentIm);
      const theta = Math.atan2(currentIm, currentRe); // radians
      const thetaDeg = (theta * 180 / Math.PI + 360) % 360;

      return (
        <div className="complex-plane-container">
            <svg 
                ref={svgRef}
                width="300" 
                height="300" 
                className="complex-plane-svg"
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {/* Grid */}
                <line x1="0" y1={center} x2="300" y2={center} stroke="#ddd" />
                <line x1={center} y1="0" x2={center} y2="300" stroke="#ddd" />
                
                {/* Unit Circle */}
                <circle cx={center} cy={center} r={radius} fill="none" stroke="#ccc" strokeDasharray="4" />
                
                {/* Target (if exists) */}
                {target && (
                    <circle 
                        cx={toSvgCoords(target.re, target.im).x} 
                        cy={toSvgCoords(target.re, target.im).y} 
                        r="5" 
                        fill="rgba(255,0,0,0.3)" 
                    />
                )}

                {/* Vector Line */}
                <line 
                    x1={center} 
                    y1={center} 
                    x2={x} 
                    y2={y} 
                    stroke="#3b82f6" 
                    strokeWidth="2"
                />

                {/* Point Handle */}
                <circle 
                    cx={x} 
                    cy={y} 
                    r="8" 
                    fill="#3b82f6" 
                    cursor={disabled ? 'default' : 'pointer'}
                    onPointerDown={handlePointerDown}
                />
                
                {/* Text Labels */}
                <text x="280" y={center + 15} fill="#999">Re</text>
                <text x={center + 5} y="20" fill="#999">Im</text>
            </svg>
            
            <div className="complex-info">
                <div className="info-item">
                    <label>z = </label>
                    <span>{currentRe.toFixed(2)} + {currentIm.toFixed(2)}i</span>
                </div>
                <div className="info-item">
                    <label>|z| = </label>
                    <span>{r.toFixed(2)}</span>
                </div>
                <div className="info-item">
                    <label>arg(z) = </label>
                    <span>{thetaDeg.toFixed(0)}°</span>
                </div>
            </div>
        </div>
      );
    }
  }
};

const MathComplexNumberRenderer = ({ questionType, interactionMode, questionBody, value, onChange, disabled }) => {
  const strategy = STRATEGIES[interactionMode];
  if (!strategy) {
    return <div>Unsupported mode: {interactionMode}</div>;
  }
  return strategy.render({ questionBody, value, onChange, disabled });
};

MathComplexNumberRenderer.questionType = QuestionType.MATH_COMPLEX_NUMBER;
export default MathComplexNumberRenderer;
