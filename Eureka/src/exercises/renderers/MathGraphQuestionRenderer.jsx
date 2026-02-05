import React from 'react';
import { QuestionType, InteractionMode } from '../types';
import './MathGraphQuestionRenderer.css';

const W = 500;
const H = 320;
const PAD = 40;

function quad(a, b, c, x) {
  return a * x * x + b * x + c;
}

function samplePath(a, b, c, xMin, xMax, n = 80) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const x = xMin + (i / n) * (xMax - xMin);
    pts.push([x, quad(a, b, c, x)]);
  }
  return pts;
}

function toSvg(pts, xMin, xMax, yMin, yMax) {
  const xs = (x) => PAD + ((x - xMin) / (xMax - xMin)) * (W - 2 * PAD);
  const ys = (y) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - 2 * PAD);
  return pts.map(([x, y]) => `${xs(x)},${ys(y)}`).join(' ');
}

const STRATEGIES = {
  [InteractionMode.PARAMETER_ADJUST]: {
    render({ questionBody, value, onChange, disabled }) {
      const sliders = questionBody?.sliders ?? [
        { param: 'a', min: -5, max: 5, step: 0.1 },
        { param: 'b', min: -5, max: 5, step: 0.1 },
        { param: 'c', min: -5, max: 5, step: 0.1 },
      ];
      const refCurve = questionBody?.referenceCurve ?? { a: 1, b: 0, c: -1 };
      const canvas = questionBody?.canvas ?? { xMin: -5, xMax: 5, yMin: -8, yMax: 8 };
      const xMin = Number(canvas.xMin ?? -5);
      const xMax = Number(canvas.xMax ?? 5);
      const yMin = Number(canvas.yMin ?? -8);
      const yMax = Number(canvas.yMax ?? 8);

      const params = value?.params ?? {};
      const effective = {
        a: Number(params.a ?? refCurve.a ?? 1),
        b: Number(params.b ?? refCurve.b ?? 0),
        c: Number(params.c ?? refCurve.c ?? -1),
      };
      const a = effective.a;
      const b = effective.b;
      const c = effective.c;

      const refPath = toSvg(samplePath(refCurve.a, refCurve.b, refCurve.c, xMin, xMax), xMin, xMax, yMin, yMax);
      const userPath = toSvg(samplePath(a, b, c, xMin, xMax), xMin, xMax, yMin, yMax);
      const refStrokeD = `M ${refPath.replace(/ /g, ' L ')}`;
      const refPathD = `${refStrokeD} L ${W - PAD},${H - PAD} L ${PAD},${H - PAD} Z`;
      const userPathD = `M ${userPath.replace(/ /g, ' L ')}`;

      const handleSlider = (param, v) => {
        const next = { ...params, [param]: Number(v) };
        onChange?.({ params: next });
      };
      const sliderVal = (p) => effective[p] ?? 0;

      return (
        <div className="math-graph-parameter-adjust" data-testid="math-graph-parameter-adjust">
          <div className="math-graph-sliders">
            {sliders.map(({ param, min, max, step }) => (
              <div key={param} className="math-graph-slider-row">
                <label className="math-graph-slider-label">
                  <span className="math-graph-slider-param">{param}</span>
                  <span className="math-graph-slider-value">{sliderVal(param)}</span>
                </label>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={sliderVal(param)}
                  onChange={(e) => handleSlider(param, e.target.value)}
                  disabled={disabled}
                  className="math-graph-slider"
                />
              </div>
            ))}
          </div>
          <div className="math-graph-legend">
            <span className="math-graph-legend-ref">— Reference (blue, filled)</span>
            <span className="math-graph-legend-user">— — Your curve (dashed)</span>
          </div>
          <div className="math-graph-canvas-wrap">
            <svg viewBox={`0 0 ${W} ${H}`} className="math-graph-svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="math-graph-ref-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <g className="math-graph-axes">
                <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="rgb(156 163 175)" strokeWidth="1" />
                <line x1={W / 2} y1={PAD} x2={W / 2} y2={H - PAD} stroke="rgb(156 163 175)" strokeWidth="1" />
              </g>
              <path
                d={refPathD}
                fill="url(#math-graph-ref-fill)"
                className="math-graph-ref-area"
              />
              <path
                d={refStrokeD}
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="math-graph-ref-curve"
              />
              <path
                d={userPathD}
                fill="none"
                stroke="rgb(16 185 129)"
                strokeWidth="2"
                strokeDasharray="8 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="math-graph-user-curve"
              />
            </svg>
          </div>
        </div>
      );
    },
  },
  
};

const MathGraphQuestionRenderer = ({
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
      <div className="math-graph-unknown" data-testid="math-graph-unknown">
        Math graph does not support interaction mode: {interactionMode}
      </div>
    );
  }
  return strategy.render({ questionBody, value, onChange, disabled });
};

MathGraphQuestionRenderer.questionType = QuestionType.MATH_GRAPH;
MathGraphQuestionRenderer.availableInteractionModes = Object.keys(STRATEGIES);

export default MathGraphQuestionRenderer;
