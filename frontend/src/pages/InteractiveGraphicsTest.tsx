import { useState, useMemo } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';

/**
 * Quadratic Matcher
 * * Goal: Match the blue curve (Player) to the gray dashed curve (Target).
 * Teaches: How coefficients a, b, and c affect the parabola.
 */

// --- Constants & Config ---
const WIDTH = 800;
const HEIGHT = 600;
const SCALE = 40; // 1 Math Unit = 40 Pixels
const X_RANGE = 12; // How many units to draw left/right

// Target Equation: y = 0.5x^2 - 2x - 1
const TARGET = { a: 0.5, b: -2, c: -1 };

// --- Math Helpers ---

// 1. Coordinate Mapping: Math (x,y) -> Screen (pixels)
// Screen X = (Math X * Scale) + Center Offset
// Screen Y = (Math Y * -Scale) + Center Offset (Negative because Canvas Y goes down)
const toScreen = (x: number, y: number) => ({
  x: (x * SCALE) + (WIDTH / 2),
  y: (-y * SCALE) + (HEIGHT / 2)
});

// 2. Generate Points for Konva Line
// We calculate 'y' for every 0.1 'x' step and convert to screen coords
const generateParabolaPoints = (a: number, b: number, c: number) => {
  const points: number[] = [];
  for (let x = -X_RANGE; x <= X_RANGE; x += 0.1) {
    const y = (a * (x * x)) + (b * x) + c;
    const screenPos = toScreen(x, y);
    points.push(screenPos.x, screenPos.y);
  }
  return points;
};

const InteractiveGraphicsTest = () => {
  // --- State ---
  // The player's current coefficients
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  // Check if player is close enough to target
  const isMatch = Math.abs(a - TARGET.a) < 0.1 && 
                  Math.abs(b - TARGET.b) < 0.2 && 
                  Math.abs(c - TARGET.c) < 0.2;

  // Memoize point calculations so we don't recalculate if state doesn't change
  const playerPoints = useMemo(() => generateParabolaPoints(a, b, c), [a, b, c]);
  const targetPoints = useMemo(() => generateParabolaPoints(TARGET.a, TARGET.b, TARGET.c), []);

  // --- Grid Generators ---
  const gridLines = useMemo(() => {
    const lines = [];
    // Vertical lines
    for (let i = -X_RANGE; i <= X_RANGE; i++) {
      const start = toScreen(i, -100);
      const end = toScreen(i, 100);
      lines.push(
        <Line 
          key={`v${i}`} 
          points={[start.x, 0, end.x, HEIGHT]} 
          stroke={i === 0 ? "#000" : "#e5e7eb"} 
          strokeWidth={i === 0 ? 2 : 1} 
        />
      );
    }
    // Horizontal lines
    for (let i = -10; i <= 10; i++) {
      const start = toScreen(-100, i);
      const end = toScreen(100, i);
      lines.push(
        <Line 
          key={`h${i}`} 
          points={[0, start.y, WIDTH, end.y]} 
          stroke={i === 0 ? "#000" : "#e5e7eb"} 
          strokeWidth={i === 0 ? 2 : 1} 
        />
      );
    }
    return lines;
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6 font-sans">
      
      {/* Header & Feedback */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quadratic Equation Matcher</h1>
        <div className={`text-lg px-4 py-2 rounded-lg transition-colors duration-300 ${isMatch ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-white text-gray-600 border border-gray-200'}`}>
          {isMatch 
            ? "🎉 Perfect Match! You found the equation!" 
            : "Adjust the sliders below to match the blue curve to the gray one."}
        </div>
      </div>

      {/* The Canvas */}
      <div className="relative shadow-xl rounded-xl overflow-hidden border border-gray-200 bg-white">
        <Stage width={WIDTH} height={HEIGHT}>
          <Layer>
            {/* 1. Draw Grid */}
            {gridLines}

            {/* 2. Target Curve (The Goal) */}
            <Line
              points={targetPoints}
              stroke="#9ca3af" // Gray
              strokeWidth={4}
              dash={[15, 10]} // Dashed line
              lineCap="round"
              lineJoin="round"
              opacity={0.6}
            />

            {/* 3. Player Curve (Interactive) */}
            <Line
              points={playerPoints}
              stroke={isMatch ? "#059669" : "#2563eb"} // Blue, turns Green on success
              strokeWidth={4}
              lineCap="round"
              lineJoin="round"
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.1}
            />

            {/* 4. Axis Labels */}
            <Text x={WIDTH - 20} y={HEIGHT/2 + 10} text="x" fontSize={16} fontStyle="bold" />
            <Text x={WIDTH/2 + 10} y={20} text="y" fontSize={16} fontStyle="bold" />
          </Layer>
        </Stage>
      </div>

      {/* Controls */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md w-full max-w-2xl border border-gray-200">
        <div className="text-center mb-6">
          <span className="text-2xl font-mono text-gray-700">
            y = 
            <span className="font-bold text-blue-600"> {a.toFixed(1)}</span>x² + 
            <span className="font-bold text-purple-600"> {b.toFixed(1)}</span>x + 
            <span className="font-bold text-pink-600"> {c.toFixed(1)}</span>
          </span>
        </div>

        <div className="space-y-6">
          {/* Slider A */}
          <div className="flex items-center gap-4">
            <label className="w-8 font-bold text-blue-600 text-lg">a:</label>
            <input 
              type="range" min="-3" max="3" step="0.1" 
              value={a} 
              onChange={(e) => setA(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="w-12 text-right font-mono">{a.toFixed(1)}</span>
          </div>

          {/* Slider B */}
          <div className="flex items-center gap-4">
            <label className="w-8 font-bold text-purple-600 text-lg">b:</label>
            <input 
              type="range" min="-5" max="5" step="0.1" 
              value={b} 
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <span className="w-12 text-right font-mono">{b.toFixed(1)}</span>
          </div>

          {/* Slider C */}
          <div className="flex items-center gap-4">
            <label className="w-8 font-bold text-pink-600 text-lg">c:</label>
            <input 
              type="range" min="-5" max="5" step="0.1" 
              value={c} 
              onChange={(e) => setC(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
            />
            <span className="w-12 text-right font-mono">{c.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGraphicsTest;