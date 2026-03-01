import React, { useState, useRef, useEffect } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './PhysicsProjectileRenderer.css';

const STRATEGIES = {
  [InteractionMode.PROJECTILE_LAUNCH]: {
    render({ questionBody, value, onChange, disabled }) {
      // value = { angle: 45, velocity: 50, hit: boolean }
      
      const target = questionBody?.target ?? { x: 300, y: 0, width: 50, height: 50 }; // y=0 is ground level
      const gravity = 9.8;
      
      const [angle, setAngle] = useState(value?.angle ?? 45);
      const [velocity, setVelocity] = useState(value?.velocity ?? 60);
      const [isAnimating, setIsAnimating] = useState(false);
      const [ballPos, setBallPos] = useState({ x: 0, y: 0 }); // Relative to cannon
      const [pathPoints, setPathPoints] = useState([]);
      const [hit, setHit] = useState(value?.hit ?? false);
      const [missed, setMissed] = useState(false);

      const canvasRef = useRef(null);
      const animationRef = useRef(null);
      const startTimeRef = useRef(null);

      // Constants for rendering
      const CANNON_X = 50;
      const CANNON_Y = 250; // Ground level in SVG coords
      const SCALE = 3; // 1 meter = 3 pixels

      const toRad = (deg) => (deg * Math.PI) / 180;

      // Calculate trajectory points for preview
      useEffect(() => {
        if (isAnimating) return;
        const pts = [];
        const v0 = velocity;
        const theta = toRad(angle);
        const g = gravity;
        
        // x(t) = v0 * cos(theta) * t
        // y(t) = v0 * sin(theta) * t - 0.5 * g * t^2
        
        for (let t = 0; t < 10; t += 0.1) {
            const x = v0 * Math.cos(theta) * t;
            const y = v0 * Math.sin(theta) * t - 0.5 * g * t * t;
            if (y < -10) break; // Hit ground
            pts.push({ x: x * SCALE, y: -y * SCALE }); // Invert Y for SVG
        }
        setPathPoints(pts);
      }, [angle, velocity, isAnimating]);

      const startSimulation = () => {
        if (disabled || isAnimating) return;
        setIsAnimating(true);
        setHit(false);
        setMissed(false);
        startTimeRef.current = Date.now();
        setBallPos({ x: 0, y: 0 });
        
        const animate = () => {
            const now = Date.now();
            const t = (now - startTimeRef.current) / 1000 * 2; // 2x speed
            
            const v0 = velocity;
            const theta = toRad(angle);
            const g = gravity;
            
            const realX = v0 * Math.cos(theta) * t;
            const realY = v0 * Math.sin(theta) * t - 0.5 * g * t * t;
            
            const svgX = realX * SCALE;
            const svgY = -realY * SCALE; // Up is negative in SVG
            
            // Check collision
            // Target coordinates in SVG space relative to cannon origin (0,0 is cannon muzzle)
            // But target is defined relative to ground...
            // Let's standardise: SVG Origin (0,0) is top-left.
            // Ground Y = 250.
            // Cannon Muzzle ~ (50, 240) depending on angle? Simplified: Muzzle is origin for physics.
            
            const targetSvgX = (target.x * SCALE); // Relative to cannon X?
            // Let's say target.x is distance from cannon in meters.
            
            const targetXMin = target.x * SCALE;
            const targetXMax = targetXMin + target.width;
            const targetYMin = -target.height; // Height above ground (negative relative to ground level)
            const targetYMax = 0;

            // Current ball pos relative to ground (y=0 is ground, positive is up)
            // realY is meters up.
            // Check bounds
            // Simplest hit check:
            if (realX * SCALE >= targetXMin && realX * SCALE <= targetXMax && 
                realY * SCALE <= target.height && realY >= 0) {
                    // HIT!
                    setHit(true);
                    setIsAnimating(false);
                    onChange?.({ angle, velocity, hit: true });
                    return;
            }

            if (realY < 0) {
                // Hit ground
                setIsAnimating(false);
                setMissed(true);
                return;
            }
            
            setBallPos({ x: svgX, y: svgY });
            animationRef.current = requestAnimationFrame(animate);
        };
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      useEffect(() => {
          return () => cancelAnimationFrame(animationRef.current);
      }, []);

      const handleAngleChange = (e) => {
          setAngle(Number(e.target.value));
          onChange?.({ angle: Number(e.target.value), velocity, hit: false });
      };

      const handleVelocityChange = (e) => {
          setVelocity(Number(e.target.value));
          onChange?.({ angle, velocity: Number(e.target.value), hit: false });
      };

      return (
        <div className="physics-projectile-container">
            <div className="game-area">
                <svg width="600" height="300" className="game-canvas">
                    {/* Sky */}
                    <rect x="0" y="0" width="600" height="300" fill="#e0f2fe" />
                    
                    {/* Ground */}
                    <rect x="0" y={CANNON_Y} width="600" height="50" fill="#22c55e" />
                    
                    {/* Trajectory Preview */}
                    {!isAnimating && (
                        <polyline 
                            points={pathPoints.map(p => `${CANNON_X + p.x},${CANNON_Y + p.y}`).join(' ')}
                            fill="none"
                            stroke="#94a3b8"
                            strokeDasharray="4"
                        />
                    )}
                    
                    {/* Target */}
                    <rect 
                        x={CANNON_X + target.x * SCALE} 
                        y={CANNON_Y - target.height} 
                        width={target.width} 
                        height={target.height} 
                        fill={hit ? "#ef4444" : "#f59e0b"} 
                        stroke="#b45309"
                        strokeWidth="2"
                    />
                    {hit && (
                        <text x={CANNON_X + target.x * SCALE} y={CANNON_Y - target.height - 10} fill="#ef4444" fontWeight="bold">HIT!</text>
                    )}
                    
                    {/* Cannon Base */}
                    <circle cx={CANNON_X} cy={CANNON_Y} r="15" fill="#333" />
                    
                    {/* Cannon Barrel (Rotated) */}
                    <g transform={`translate(${CANNON_X}, ${CANNON_Y}) rotate(${-angle})`}>
                        <rect x="0" y="-10" width="40" height="20" fill="#555" rx="2" />
                    </g>

                    {/* Ball */}
                    <circle 
                        cx={CANNON_X + ballPos.x} 
                        cy={CANNON_Y + ballPos.y} 
                        r="8" 
                        fill="#333" 
                        className={isAnimating ? '' : 'hidden-ball'}
                    />
                </svg>
            </div>

            <div className="controls-area">
                <div className="control-group">
                    <label>Angle: {angle}°</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="90" 
                        value={angle} 
                        onChange={handleAngleChange} 
                        disabled={isAnimating || disabled}
                    />
                </div>
                <div className="control-group">
                    <label>Velocity: {velocity} m/s</label>
                    <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={velocity} 
                        onChange={handleVelocityChange} 
                        disabled={isAnimating || disabled}
                    />
                </div>
                <button 
                    className="fire-btn" 
                    onClick={startSimulation}
                    disabled={isAnimating || disabled}
                >
                    {isAnimating ? 'Firing...' : 'FIRE!'}
                </button>
            </div>
            
            <div className="instructions">
                Adjust angle and velocity to hit the target box!
            </div>
        </div>
      );
    }
  }
};

const PhysicsProjectileRenderer = ({ questionType, interactionMode, questionBody, value, onChange, disabled }) => {
  const strategy = STRATEGIES[interactionMode];
  if (!strategy) {
    return <div>Unsupported mode: {interactionMode}</div>;
  }
  return strategy.render({ questionBody, value, onChange, disabled });
};

PhysicsProjectileRenderer.questionType = QuestionType.PHYSICS_PROJECTILE;
export default PhysicsProjectileRenderer;
