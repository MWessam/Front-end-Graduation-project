import type { FC } from 'react';
import { useState, useMemo } from 'react';
import { Stage, Layer, Line, Text, Group } from 'react-konva';

/**
 * Quadratic Matcher
 * * Goal: Match the blue curve (Player) to the gray dashed curve (Target).
 * Teaches: How coefficients a, b, and c affect the parabola.
 */

// --- Graph Visualizer Component ---
interface Point {
  x: number;
  y: number;
}

interface GraphCurveOptions {
  points: Point[]; // Array of {x, y} points in math coordinates
  color?: string;
  strokeWidth?: number;
  dashed?: boolean;
  dashPattern?: number[]; // e.g., [10, 5] for dash-gap pattern
  opacity?: number;
  fill?: {
    enabled: boolean;
    color?: string;
    opacity?: number;
    fromX?: number; // Fill from this x value
    toX?: number;   // Fill to this x value
  };
}

interface GraphVisualizerProps {
  width?: number;
  height?: number;
  scale?: number;
  xRange?: number;
  yRange?: number;
  curves: GraphCurveOptions[];
  showGrid?: boolean;
  showAxes?: boolean;
  axisLabels?: { x?: string; y?: string };
}

const GraphVisualizer: FC<GraphVisualizerProps> = ({
  width = 800,
  height = 600,
  scale = 10,
  xRange = 12,
  yRange = 10,
  curves = [],
  showGrid = true,
  showAxes = true,
  axisLabels = { x: 'x', y: 'y' }
}) => {
  // Coordinate transformation: Math (x,y) -> Screen (pixels)
  const toScreen = (x: number, y: number) => ({
    x: (x * scale) + (width / 2),
    y: (-y * scale) + (height / 2)
  });

  // Convert points array to Konva Line format [x1, y1, x2, y2, ...]
  const pointsToKonvaFormat = (points: Point[]) => {
    const konvaPoints: number[] = [];
    points.forEach(point => {
      const screen = toScreen(point.x, point.y);
      konvaPoints.push(screen.x, screen.y);
    });
    return konvaPoints;
  };

  // Generate fill area polygon points
  const generateFillPoints = (points: Point[], fromX?: number, toX?: number) => {
    // Filter points within the fill range
    let filteredPoints = points;
    if (fromX !== undefined || toX !== undefined) {
      filteredPoints = points.filter(p => {
        const afterStart = fromX === undefined || p.x >= fromX;
        const beforeEnd = toX === undefined || p.x <= toX;
        return afterStart && beforeEnd;
      });
    }

    if (filteredPoints.length === 0) return [];

    // Create polygon: curve points + baseline points (on x-axis)
    const fillPolygon: number[] = [];
    
    // Add curve points from left to right
    filteredPoints.forEach(point => {
      const screen = toScreen(point.x, point.y);
      fillPolygon.push(screen.x, screen.y);
    });
    
    // Add baseline points from right to left (to close the shape)
    for (let i = filteredPoints.length - 1; i >= 0; i--) {
      const point = filteredPoints[i];
      const screen = toScreen(point.x, 0); // y=0 is the x-axis
      fillPolygon.push(screen.x, screen.y);
    }
    
    return fillPolygon;
  };

  // Grid lines
  const gridLines = useMemo(() => {
    if (!showGrid) return null;
    const lines = [];
    
    // Vertical lines
    for (let i = -xRange; i <= xRange; i++) {
      const start = toScreen(i, -yRange);
      const end = toScreen(i, yRange);
      const isAxis = i === 0 && showAxes;
      lines.push(
        <Line
          key={`v${i}`}
          points={[start.x, 0, end.x, height]}
          stroke={isAxis ? "#000" : "#e5e7eb"}
          strokeWidth={isAxis ? 2 : 1}
        />
      );
    }
    
    // Horizontal lines
    for (let i = -yRange; i <= yRange; i++) {
      const start = toScreen(-xRange, i);
      const end = toScreen(xRange, i);
      const isAxis = i === 0 && showAxes;
      lines.push(
        <Line
          key={`h${i}`}
          points={[0, start.y, width, end.y]}
          stroke={isAxis ? "#000" : "#e5e7eb"}
          strokeWidth={isAxis ? 2 : 1}
        />
      );
    }
    return lines;
  }, [showGrid, showAxes, xRange, yRange, width, height, scale]);

  return (
    <Stage width={width} height={height}>
      <Layer>
        {/* Grid */}
        {gridLines}

        {/* Draw each curve */}
        {curves.map((curve, index) => {
          const konvaPoints = pointsToKonvaFormat(curve.points);
          const fillPoints = curve.fill?.enabled 
            ? generateFillPoints(curve.points, curve.fill.fromX, curve.fill.toX)
            : [];

          return (
            <Group key={index}>
              {/* Fill area (if enabled) */}
              {curve.fill?.enabled && fillPoints.length > 0 && (
                <Line
                  points={fillPoints}
                  fill={curve.fill.color || curve.color || '#2563eb'}
                  opacity={curve.fill.opacity || 0.2}
                  closed={true}
                />
              )}
              
              {/* Curve line */}
              <Line
                points={konvaPoints}
                stroke={curve.color || '#2563eb'}
                strokeWidth={curve.strokeWidth || 3}
                dash={curve.dashed ? (curve.dashPattern || [15, 10]) : undefined}
                lineCap="round"
                lineJoin="round"
                opacity={curve.opacity || 1}
              />
            </Group>
          );
        })}

        {/* Axis labels */}
        {showAxes && (
          <>
            <Text 
              x={width - 25} 
              y={height / 2 + 10} 
              text={axisLabels.x || 'x'} 
              fontSize={16} 
              fontStyle="bold" 
            />
            <Text 
              x={width / 2 + 10} 
              y={20} 
              text={axisLabels.y || 'y'} 
              fontSize={16} 
              fontStyle="bold" 
            />
          </>
        )}
      </Layer>
    </Stage>
  );
};

// Helper function to generate points from any mathematical function
const generatePointsFromFunction = (
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  step: number = 0.1
): Point[] => {
  const points: Point[] = [];
  for (let x = xMin; x <= xMax; x += step) {
    const y = fn(x);
    if (isFinite(y)) { // Only add valid points
      points.push({ x, y });
    }
  }
  return points;
};

export { GraphVisualizer, generatePointsFromFunction, type Point, type GraphCurveOptions, type GraphVisualizerProps };

// --- Constants & Config ---
const TARGET = { a: 0.5, b: -2, c: -1 };

const QuestionTest: FC = () => {
  // --- State ---
  // The player's current coefficients
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  // Check if player is close enough to target
  const isMatch = Math.abs(a - TARGET.a) < 0.001 && 
                  Math.abs(b - TARGET.b) < 0.001 && 
                  Math.abs(c - TARGET.c) < 0.001;

  // Generate points using the helper function
  const playerPoints = useMemo(() => 
    generatePointsFromFunction((x) => (a * x * x) + (b * x) + c, -12, 12), 
    [a, b, c]
  );
  
  const targetPoints = useMemo(() => 
    generatePointsFromFunction((x) => (TARGET.a * x * x) + (TARGET.b * x) + TARGET.c, -12, 12), 
    []
  );

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
        <GraphVisualizer
          width={800}
          height={600}
          scale={10}
          xRange={12}
          yRange={10}
          curves={[
            {
              points: targetPoints,
              color: '#9ca3af',
              strokeWidth: 4,
              dashed: true,
              dashPattern: [15, 10],
              opacity: 0.6,
            },
            {
              points: playerPoints,
              color: isMatch ? '#059669' : '#2563eb',
              strokeWidth: 4,
            },
          ]}
          showGrid={true}
          showAxes={true}
        />
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

export default QuestionTest;