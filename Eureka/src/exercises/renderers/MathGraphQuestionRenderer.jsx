import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './MathGraphQuestionRenderer.css';
import { MathGraphDomain } from '../data/domains/MathGraphDomain';
import { ParameterAdjustInteraction } from '../data/interactions/ParameterAdjustInteraction';
import { GraphCompositeInteraction } from '../data/interactions/GraphCompositeInteraction';
import { GraphMcqInteraction } from '../data/interactions/GraphMcqInteraction';
import { VectorDragInteraction } from '../data/interactions/VectorDragInteraction';
import { PointDragInteraction } from '../data/interactions/PointDragInteraction';
import { sampleYs, sampleParametric } from '../math/safeGraphEval';

const W = 520;
const H = 360;
const PAD = 48;

function quadY(a, b, c, x) {
  return a * x * x + b * x + c;
}

function legacySamplePath(a, b, c, xMin, xMax, n = 80) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const x = xMin + (i / n) * (xMax - xMin);
    pts.push([x, quadY(a, b, c, x)]);
  }
  return pts;
}

function linspace(a, b, n) {
  if (n < 2) return [a];
  const out = [];
  for (let i = 0; i < n; i++) out.push(a + (i / (n - 1)) * (b - a || 1));
  return out;
}

function curvePolyline(curve, canvas, params, samples = 140) {
  const { xMin, xMax } = canvas;
  const scope = { ...params };
  const kind = String(curve.curveKind || 'explicit_y').toLowerCase();
  try {
    if (kind === 'quad') {
      const qa = Number(scope.qa ?? curve.qa ?? 1);
      const qb = Number(scope.qb ?? curve.qb ?? 0);
      const qc = Number(scope.qc ?? curve.qc ?? 0);
      const xs = linspace(xMin, xMax, samples);
      return xs.map((x) => [x, quadY(qa, qb, qc, x)]);
    }
    if (kind === 'parametric') {
      const ts = linspace(Number(curve.tMin ?? 0), Number(curve.tMax ?? 6.28318), samples);
      return sampleParametric(
        String(curve.xExpr || 'cos(t)'),
        String(curve.yExpr || 'sin(t)'),
        ts,
        scope
      );
    }
    const xs = linspace(xMin, xMax, samples);
    const ys = sampleYs(String(curve.expr || '0'), 'x', xs, scope);
    return xs.map((x, i) => [x, ys[i]]);
  } catch {
    return [];
  }
}

function toSvgXY(x, y, canvas) {
  const { xMin, xMax, yMin, yMax } = canvas;
  const sx = PAD + ((x - xMin) / (xMax - xMin || 1)) * (W - 2 * PAD);
  const sy = H - PAD - ((y - yMin) / (yMax - yMin || 1)) * (H - 2 * PAD);
  return [sx, sy];
}

function toMathXY(sx, sy, canvas) {
  const { xMin, xMax, yMin, yMax } = canvas;
  const x = xMin + ((sx - PAD) / (W - 2 * PAD || 1)) * (xMax - xMin);
  const y = yMin + ((H - PAD - sy) / (H - 2 * PAD || 1)) * (yMax - yMin);
  return [x, y];
}

function effectiveMergedParams(domain, value, sliders) {
  const out = { ...(value?.params || {}) };
  for (const p of domain.parameters || []) {
    const name = p.name;
    if (name && out[name] === undefined) {
      out[name] = Number(p.default ?? p.min ?? 0);
    }
  }
  for (const s of sliders || []) {
    if (s?.param != null && out[s.param] === undefined) {
      const lo = Number(s.min);
      const hi = Number(s.max);
      out[s.param] = Number.isFinite(lo) && Number.isFinite(hi) ? (lo + hi) / 2 : 0;
    }
  }
  return out;
}

function effectiveVectors(domain, value) {
  const map = {};
  for (const def of domain.vectors || []) {
    const id = def.id;
    if (!id) continue;
    const st = value?.vectors?.[id] || {};
    map[id] = {
      ox: Number(st.ox ?? def.ox ?? 0),
      oy: Number(st.oy ?? def.oy ?? 0),
      hx: Number(st.hx ?? def.hx ?? 1),
      hy: Number(st.hy ?? def.hy ?? 0),
      dragHead: def.dragHead !== false,
      dragOrigin: !!def.dragOrigin,
    };
  }
  return map;
}

function effectivePoints(domain, value) {
  const map = {};
  for (const def of domain.points || []) {
    const id = def.id;
    if (!id) continue;
    const st = value?.points?.[id] || {};
    map[id] = {
      x: Number(st.x ?? def.x ?? 0),
      y: Number(st.y ?? def.y ?? 0),
      drag: def.drag !== false,
    };
  }
  return map;
}

function pathFromPts(pts, canvas) {
  if (!pts.length) return '';
  const [x0, y0] = toSvgXY(pts[0][0], pts[0][1], canvas);
  let d = `M ${x0} ${y0}`;
  for (let i = 1; i < pts.length; i++) {
    const [sx, sy] = toSvgXY(pts[i][0], pts[i][1], canvas);
    d += ` L ${sx} ${sy}`;
  }
  return d;
}

function AngleArcSvg({ canvas, vx, vy, ux, uy, wx, wy }) {
  const [osx, osy] = toSvgXY(vx, vy, canvas);
  const r = Math.min(48, (W - 2 * PAD) * 0.12);
  const ang1 = Math.atan2(uy, ux);
  const ang2 = Math.atan2(wy, wx);
  let delta = ang2 - ang1;
  while (delta <= -Math.PI) delta += 2 * Math.PI;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  const x1 = osx + r * Math.cos(ang1);
  const y1 = osy - r * Math.sin(ang1);
  const x2 = osx + r * Math.cos(ang2);
  const y2 = osy - r * Math.sin(ang2);
  const large = Math.abs(delta) > Math.PI ? 1 : 0;
  const sweep = delta >= 0 ? 1 : 0;
  return (
    <path
      d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`}
      fill="none"
      stroke="rgb(234 179 8)"
      strokeWidth="2"
      className="math-graph-angle-arc"
    />
  );
}

function GeneralGraphSvg({
  domain,
  params,
  vectorsMap,
  pointsMap,
  onPatchVectors,
  onPatchPoints,
  disabled,
  numberLineMode,
  complexLabels,
}) {
  const canvas = domain.canvas || { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
  const dragState = useRef(null);
  const svgRef = useRef(null);
  const headAngle = (sx0, sy0, sx1, sy1) => (Math.atan2(sy1 - sy0, sx1 - sx0) * 180) / Math.PI;

  const curves = domain.curves || [];

  const polylines = useMemo(() => {
    return curves.map((c) => ({
      d: pathFromPts(curvePolyline(c, canvas, params), canvas),
      color: c.color || '#3b82f6',
      dash: c.strokeDash || '',
      role: c.role || 'reference',
    }));
  }, [curves, canvas, params]);

  useEffect(() => {
    const up = () => {
      dragState.current = null;
    };
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      if (!dragState.current || disabled) return;
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const sx = ((e.clientX - rect.left) / rect.width) * W;
      const sy = ((e.clientY - rect.top) / rect.height) * H;
      const [mx, my] = toMathXY(sx, sy, canvas);
      const { kind, id, part } = dragState.current;
      if (kind === 'vector') {
        const v = vectorsMap[id];
        if (!v) return;
        if (part === 'head' && v.dragHead) {
          onPatchVectors?.(id, { hx: mx, hy: my, ox: v.ox, oy: v.oy });
        } else if (part === 'origin' && v.dragOrigin) {
          const dx = v.hx - v.ox;
          const dy = v.hy - v.oy;
          onPatchVectors?.(id, { ox: mx, oy: my, hx: mx + dx, hy: my + dy });
        }
      } else if (kind === 'point') {
        const p = pointsMap[id];
        if (p?.drag) {
          onPatchPoints?.(id, { x: mx, y: my });
        }
      }
    },
    [canvas, vectorsMap, pointsMap, onPatchVectors, onPatchPoints, disabled]
  );

  const vxLabel = complexLabels ? 'Re' : 'x';
  const vyLabel = complexLabels ? 'Im' : 'y';

  return (
    <div className="math-graph-canvas-wrap math-graph-canvas-wrap--wide">
      <svg
        ref={svgRef}
        role="presentation"
        viewBox={`0 0 ${W} ${H}`}
        className="math-graph-svg"
        preserveAspectRatio="xMidYMid meet"
        onPointerMove={onPointerMove}
      >
        <rect x={0} y={0} width={W} height={H} fill="transparent" className="math-graph-drag-surface" />
        <defs>
          <linearGradient id="math-graph-ref-fill-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <g className="math-graph-axes">
          {!numberLineMode ? (
            <>
              <line
                x1={PAD}
                y1={toSvgXY(0, 0, canvas)[1]}
                x2={W - PAD}
                y2={toSvgXY(0, 0, canvas)[1]}
                stroke="rgb(156 163 175)"
                strokeWidth={1}
              />
              <line
                x1={toSvgXY(0, 0, canvas)[0]}
                y1={PAD}
                x2={toSvgXY(0, 0, canvas)[0]}
                y2={H - PAD}
                stroke="rgb(156 163 175)"
                strokeWidth={1}
              />
            </>
          ) : (
            <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="rgb(71 85 105)" strokeWidth={3} />
          )}
          <text x={W - PAD + 2} y={toSvgXY(0, 0, canvas)[1] - 6} fontSize={11} fill="rgb(100 116 139)">
            {vxLabel}
          </text>
          {!numberLineMode && (
            <text x={toSvgXY(0, 0, canvas)[0] + 4} y={PAD + 2} fontSize={11} fill="rgb(100 116 139)">
              {vyLabel}
            </text>
          )}
        </g>

        {polylines.map((pl, i) => {
          if (!pl.d) return null;
          const isRef = pl.role === 'reference';
          return (
            <g key={`c-${i}`}>
              {isRef && pl.d.startsWith('M') && (
                <path
                  d={`${pl.d} L ${W - PAD},${H - PAD} L ${PAD},${H - PAD} Z`}
                  fill="url(#math-graph-ref-fill-2)"
                  opacity={0.9}
                />
              )}
              <path
                d={pl.d}
                fill="none"
                stroke={pl.color}
                strokeWidth={isRef ? 2.5 : 2}
                strokeDasharray={pl.dash || (isRef ? '' : '7 5')}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {domain.angles?.map((spec, ai) => {
          if (spec.showArc === false) return null;
          const va = vectorsMap[spec.vectorIdA];
          const vb = vectorsMap[spec.vectorIdB];
          if (!va || !vb) return null;
          const vtx = va.ox;
          const vty = va.oy;
          const udx = va.hx - va.ox;
          const udy = va.hy - va.oy;
          const wdx = vb.hx - vb.ox;
          const wdy = vb.hy - vb.oy;
          const originDist = Math.hypot(vb.ox - vtx, vb.oy - vty);
          const sameOrigin = originDist < 1e-3;
          if (!sameOrigin && !spec.allowDifferentOrigins) return null;
          return (
            <AngleArcSvg
              key={`a-${ai}`}
              canvas={canvas}
              vx={vtx}
              vy={vty}
              ux={udx}
              uy={udy}
              wx={wdx}
              wy={wdy}
            />
          );
        })}

        {Object.entries(vectorsMap).map(([id, v]) => {
          const [sx0, sy0] = toSvgXY(v.ox, v.oy, canvas);
          const [sx1, sy1] = toSvgXY(v.hx, v.hy, canvas);
          const canHead = !disabled && v.dragHead;
          const canOrig = !disabled && v.dragOrigin;
          const rot = headAngle(sx0, sy0, sx1, sy1);
          return (
            <g key={`vec-${id}`} className="math-graph-vector">
              <line x1={sx0} y1={sy0} x2={sx1} y2={sy1} stroke="rgb(15 23 42)" strokeWidth={2.5} />
              <polygon
                points={`${sx1},${sy1} ${sx1 - 9},${sy1 - 5} ${sx1 - 9},${sy1 + 5}`}
                fill="rgb(15 23 42)"
                transform={`rotate(${rot},${sx1},${sy1})`}
              />
              {canOrig && (
                <circle
                  cx={sx0}
                  cy={sy0}
                  r={11}
                  className="math-graph-handle math-graph-handle--origin"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    dragState.current = { kind: 'vector', id, part: 'origin' };
                  }}
                />
              )}
              {canHead && (
                <circle
                  cx={sx1}
                  cy={sy1}
                  r={12}
                  className="math-graph-handle math-graph-handle--head"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    dragState.current = { kind: 'vector', id, part: 'head' };
                  }}
                />
              )}
            </g>
          );
        })}

        {Object.entries(pointsMap).map(([id, p]) => {
          const [px, py] = toSvgXY(p.x, p.y, canvas);
          if (!p.drag || disabled) {
            return (
              <circle key={`pt-${id}`} cx={px} cy={py} r={7} fill="rgb(220 38 38)" stroke="#fff" strokeWidth={2} />
            );
          }
          return (
            <circle
              key={`pt-${id}`}
              cx={px}
              cy={py}
              r={12}
              className="math-graph-handle math-graph-handle--point"
              fill="rgb(220 38 38)"
              stroke="#fff"
              strokeWidth={2}
              onPointerDown={(e) => {
                e.stopPropagation();
                dragState.current = { kind: 'point', id, part: 'xy' };
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function McqAssistPanel({ options, value, onChange, disabled }) {
  const selectedId = value?.selectedId ?? null;
  return (
    <div className="math-graph-mcq" role="group" aria-label="Choices">
      {options?.map((opt) => {
        const isSel = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            className={`math-graph-mcq-opt ${isSel ? 'selected' : ''}`}
            disabled={disabled}
            onClick={() =>
              onChange?.({
                ...value,
                selectedId: opt.id,
                selectedLabel: opt.label,
              })
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function renderLegacyQuad({ domain, interaction, value, onChange, disabled }) {
  const sliders = interaction?.sliders ?? [];
  const refCurve = domain?.referenceCurve ?? { a: 1, b: 0, c: -1 };
  const canvas = domain?.canvas ?? { xMin: -5, xMax: 5, yMin: -8, yMax: 8 };
  const xMin = Number(canvas.xMin);
  const xMax = Number(canvas.xMax);
  const yMin = Number(canvas.yMin);
  const yMax = Number(canvas.yMax);
  const params = value?.params ?? {};
  const effective = {
    a: Number(params.a ?? refCurve.a),
    b: Number(params.b ?? refCurve.b),
    c: Number(params.c ?? refCurve.c),
  };
  const refPathPts = legacySamplePath(refCurve.a, refCurve.b, refCurve.c, xMin, xMax);
  const userPathPts = legacySamplePath(effective.a, effective.b, effective.c, xMin, xMax);
  const refStrokeD = pathFromPts(refPathPts, canvas);
  const refPathD = refStrokeD
    ? `${refStrokeD} L ${W - PAD},${H - PAD} L ${PAD},${H - PAD} Z`
    : '';
  const userStrokeD = pathFromPts(userPathPts, canvas);

  const handleSlider = (param, v) => {
    const { params: _p, ...rest } = value && typeof value === 'object' ? value : {};
    onChange?.({ ...rest, params: { ...params, [param]: Number(v) } });
  };

  const sliderVal = (p) => effective[p] ?? 0;

  return (
    <div className="math-graph-parameter-adjust math-graph-parameter-adjust--legacy" data-testid="math-graph-parameter-adjust">
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
          {refPathD && (
            <path d={refPathD} fill="url(#math-graph-ref-fill)" className="math-graph-ref-area" />
          )}
          {refStrokeD && (
            <path
              d={refStrokeD}
              fill="none"
              stroke="rgb(59 130 246)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="math-graph-ref-curve"
            />
          )}
          {userStrokeD && (
            <path
              d={userStrokeD}
              fill="none"
              stroke="rgb(16 185 129)"
              strokeWidth={2}
              strokeDasharray="8 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="math-graph-user-curve"
            />
          )}
        </svg>
      </div>
    </div>
  );
}

function mergeVectorsIntoValue(value, vectorsMap) {
  const next = { ...value, vectors: { ...(value?.vectors || {}) } };
  for (const id of Object.keys(vectorsMap)) {
    next.vectors[id] = { ...vectorsMap[id] };
  }
  return next;
}

function mergePointsIntoValue(value, pointsMap) {
  const next = { ...value, points: { ...(value?.points || {}) } };
  for (const id of Object.keys(pointsMap)) {
    next.points[id] = { ...pointsMap[id] };
  }
  return next;
}

function GeneralGraphInteractive({
  domain,
  sliders,
  value,
  onChange,
  disabled,
  showMcq,
  mcqOptions,
}) {
  const params = effectiveMergedParams(domain, value, sliders);
  const vectorsMap = useMemo(
    () => effectiveVectors(domain, value),
    [domain.vectors, value?.vectors]
  );
  const pointsMap = useMemo(
    () => effectivePoints(domain, value),
    [domain.points, value?.points]
  );

  const onPatchVectors = useCallback(
    (id, patch) => {
      const base = vectorsMap[id];
      if (!base) return;
      const nextMap = { ...vectorsMap, [id]: { ...base, ...patch } };
      onChange?.(mergeVectorsIntoValue(value, nextMap));
    },
    [vectorsMap, value, onChange]
  );

  const onPatchPoints = useCallback(
    (id, patch) => {
      const base = pointsMap[id];
      if (!base) return;
      const nextMap = { ...pointsMap, [id]: { ...base, ...patch } };
      onChange?.(mergePointsIntoValue(value, nextMap));
    },
    [pointsMap, value, onChange]
  );

  const setParam = (name, num) => {
    onChange?.({ ...value, params: { ...params, [name]: num } });
  };

  const cm = domain.coordinateMode || 'CARTESIAN';
  const numberLineMode = cm === 'NUMBER_LINE';
  const complexLabels = cm === 'COMPLEX_PLANE';

  return (
    <div className="math-graph-general" data-testid="math-graph-general">
      {(sliders || []).length > 0 && (
        <div className="math-graph-sliders">
          {sliders.map(({ param, min, max, step }) => (
            <div key={param} className="math-graph-slider-row">
              <label className="math-graph-slider-label">
                <span className="math-graph-slider-param">{param}</span>
                <span className="math-graph-slider-value">{params[param]}</span>
              </label>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={params[param] ?? 0}
                onChange={(e) => setParam(param, Number(e.target.value))}
                disabled={disabled}
                className="math-graph-slider"
              />
            </div>
          ))}
        </div>
      )}
      <GeneralGraphSvg
        domain={domain}
        params={params}
        vectorsMap={vectorsMap}
        pointsMap={pointsMap}
        onPatchVectors={onPatchVectors}
        onPatchPoints={onPatchPoints}
        disabled={disabled}
        numberLineMode={numberLineMode}
        complexLabels={complexLabels}
      />
      {showMcq && mcqOptions?.length > 0 && (
        <McqAssistPanel options={mcqOptions} value={value} onChange={onChange} disabled={disabled} />
      )}
    </div>
  );
}

function isLegacyQuadraticParameterAdjust(domain, interactionMode) {
  if (interactionMode !== InteractionMode.PARAMETER_ADJUST) return false;
  const hasCurves = Array.isArray(domain.curves) && domain.curves.length > 0;
  const hasParams = Array.isArray(domain.parameters) && domain.parameters.length > 0;
  return !hasCurves && !hasParams;
}

const MathGraphQuestionRenderer = ({
  questionType,
  interactionMode,
  questionBody,
  value,
  onChange,
  disabled,
}) => {
  const domain = new MathGraphDomain(questionBody?.domainData);
  const mode = interactionMode ?? InteractionMode.PARAMETER_ADJUST;

  if (isLegacyQuadraticParameterAdjust(domain, mode)) {
    const interaction = new ParameterAdjustInteraction(questionBody?.interactionData);
    return renderLegacyQuad({ domain, interaction, value, onChange, disabled });
  }

  if (mode === InteractionMode.PARAMETER_ADJUST) {
    const interaction = new ParameterAdjustInteraction(questionBody?.interactionData);
    const sliders = domain.parameters?.length
      ? domain.parameters.map((p) => ({
          param: p.name,
          min: p.min,
          max: p.max,
          step: p.step,
        }))
      : interaction.sliders;
    return (
      <GeneralGraphInteractive
        domain={domain}
        sliders={sliders}
        value={value}
        onChange={onChange}
        disabled={disabled}
        showMcq={false}
        mcqOptions={[]}
      />
    );
  }

  if (mode === InteractionMode.VECTOR_MANIPULATION) {
    return (
      <GeneralGraphInteractive
        domain={domain}
        sliders={[]}
        value={value}
        onChange={onChange}
        disabled={disabled}
        showMcq={false}
        mcqOptions={[]}
      />
    );
  }

  if (mode === InteractionMode.POINT_DRAG) {
    return (
      <GeneralGraphInteractive
        domain={domain}
        sliders={[]}
        value={value}
        onChange={onChange}
        disabled={disabled}
        showMcq={false}
        mcqOptions={[]}
      />
    );
  }

  if (mode === InteractionMode.GRAPH_MCQ_ASSISTED) {
    const interaction = new GraphMcqInteraction(questionBody?.interactionData);
    return (
      <GeneralGraphInteractive
        domain={domain}
        sliders={[]}
        value={value}
        onChange={onChange}
        disabled={disabled}
        showMcq
        mcqOptions={interaction.options}
      />
    );
  }

  if (mode === InteractionMode.GRAPH_COMPOSITE) {
    const interaction = new GraphCompositeInteraction(questionBody?.interactionData);
    const sliders =
      interaction.enableParameterAdjust && interaction.sliders?.length
        ? interaction.sliders
        : domain.parameters?.length
          ? domain.parameters.map((p) => ({
              param: p.name,
              min: p.min,
              max: p.max,
              step: p.step,
            }))
          : [];
    const showMcq = interaction.enableMcq;
    const showSliders = interaction.enableParameterAdjust && sliders.length > 0;
    const domainForComposite = new MathGraphDomain({
      canvas: domain.canvas,
      coordinateMode: domain.coordinateMode,
      referenceCurve: domain.referenceCurve,
      curves: domain.curves,
      vectors: (domain.vectors || []).map((v) => ({
        ...v,
        dragHead: !!(interaction.enableVectorDrag && v.dragHead),
        dragOrigin: !!(interaction.enableVectorDrag && v.dragOrigin),
      })),
      points: (domain.points || []).map((p) => ({
        ...p,
        drag: !!(interaction.enablePointDrag && p.drag),
      })),
      angles: domain.angles,
      parameters: domain.parameters,
    });
    return (
      <GeneralGraphInteractive
        domain={domainForComposite}
        sliders={showSliders ? sliders : []}
        value={value}
        onChange={onChange}
        disabled={disabled}
        showMcq={showMcq}
        mcqOptions={interaction.options}
      />
    );
  }

  return (
    <div className="math-graph-unknown" data-testid="math-graph-unknown">
      Math graph does not support interaction mode: {mode}
    </div>
  );
};

MathGraphQuestionRenderer.questionType = QuestionType.MATH_GRAPH;

MathGraphQuestionRenderer.availableInteractionModes = [
  InteractionMode.PARAMETER_ADJUST,
  InteractionMode.VECTOR_MANIPULATION,
  InteractionMode.POINT_DRAG,
  InteractionMode.GRAPH_MCQ_ASSISTED,
  InteractionMode.GRAPH_COMPOSITE,
];

MathGraphQuestionRenderer.DomainData = MathGraphDomain;
MathGraphQuestionRenderer.InteractionDataMap = {
  [InteractionMode.PARAMETER_ADJUST]: ParameterAdjustInteraction,
  [InteractionMode.GRAPH_MCQ_ASSISTED]: GraphMcqInteraction,
  [InteractionMode.GRAPH_COMPOSITE]: GraphCompositeInteraction,
  [InteractionMode.VECTOR_MANIPULATION]: VectorDragInteraction,
  [InteractionMode.POINT_DRAG]: PointDragInteraction,
};

export default MathGraphQuestionRenderer;
