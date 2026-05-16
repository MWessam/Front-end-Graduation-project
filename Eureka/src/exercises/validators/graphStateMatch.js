import { FieldType } from '../data/BaseData';

function degBetweenVectorAndPositiveX(dx, dy) {
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function inRange(v, min, max) {
  const n = Number(v);
  if (Number.isNaN(n)) return false;
  return n >= Number(min) && n <= Number(max);
}

function inBox(px, py, box) {
  return (
    inRange(px, box.xMin, box.xMax) &&
    inRange(py, box.yMin, box.yMax)
  );
}

function graphStateMatch(userAnswer = {}, expected = {}) {
  const params = userAnswer.params ?? {};

  if (Array.isArray(expected.paramRanges)) {
    for (const row of expected.paramRanges) {
      const p = row.param;
      const v = params[p];
      if (!inRange(v, row.min, row.max)) {
        return {
          correct: false,
          feedback: `Adjust ${p} into [${row.min}, ${row.max}].`,
        };
      }
    }
  }

  const pointsState = userAnswer.points ?? {};
  if (Array.isArray(expected.pointBoxes)) {
    for (const box of expected.pointBoxes) {
      const p = pointsState[box.pointId];
      if (!p) {
        return { correct: false, feedback: `Move point "${box.pointId}".` };
      }
      if (!inBox(p.x, p.y, box)) {
        return {
          correct: false,
          feedback: `Place "${box.pointId}" in the highlighted region.`,
        };
      }
    }
  }

  const vectorsState = userAnswer.vectors ?? {};
  if (Array.isArray(expected.vectorHeadBoxes)) {
    for (const box of expected.vectorHeadBoxes) {
      const v = vectorsState[box.vectorId];
      if (!v) {
        return { correct: false, feedback: `Move vector "${box.vectorId}".` };
      }
      if (!inBox(v.hx, v.hy, box)) {
        return {
          correct: false,
          feedback: `Place the head of "${box.vectorId}" in the target region.`,
        };
      }
    }
  }

  if (Array.isArray(expected.angleToAxis)) {
    for (const spec of expected.angleToAxis) {
      const v = vectorsState[spec.vectorId];
      if (!v) {
        return { correct: false, feedback: `Vector "${spec.vectorId}" is missing.` };
      }
      const dx = Number(v.hx) - Number(v.ox);
      const dy = Number(v.hy) - Number(v.oy);
      let deg = degBetweenVectorAndPositiveX(dx, dy);
      if (spec.axis === 'positiveX' || !spec.axis) {
        // use deg as-is
      }
      if (!inRange(deg, spec.minDeg, spec.maxDeg)) {
        return {
          correct: false,
          feedback: `Angle vs +x should be between ${spec.minDeg}° and ${spec.maxDeg}° (now ${deg.toFixed(1)}°).`,
        };
      }
    }
  }

  if (expected.mcqOptionId != null && expected.mcqOptionId !== '') {
    const sel = userAnswer.selectedId ?? userAnswer.selectedLabel;
    if (String(sel) !== String(expected.mcqOptionId)) {
      return { correct: false, feedback: 'Choose the correct option.' };
    }
  }

  return { correct: true };
}

graphStateMatch.schema = [
  {
    key: 'pointBoxes',
    type: FieldType.ARRAY,
    label: 'Point target boxes (optional)',
    itemSchema: [
      { key: 'pointId', type: FieldType.TEXT, label: 'Point id', default: 'p1' },
      { key: 'xMin', type: FieldType.NUMBER, label: 'x min', default: 0 },
      { key: 'xMax', type: FieldType.NUMBER, label: 'x max', default: 1 },
      { key: 'yMin', type: FieldType.NUMBER, label: 'y min', default: 0 },
      { key: 'yMax', type: FieldType.NUMBER, label: 'y max', default: 1 },
    ],
  },
  {
    key: 'paramRanges',
    type: FieldType.ARRAY,
    label: 'Parameter ranges (optional)',
    itemSchema: [
      { key: 'param', type: FieldType.TEXT, label: 'Param', default: 'a' },
      { key: 'min', type: FieldType.NUMBER, label: 'Min', default: 0 },
      { key: 'max', type: FieldType.NUMBER, label: 'Max', default: 1 },
    ],
  },
  {
    key: 'vectorHeadBoxes',
    type: FieldType.ARRAY,
    label: 'Vector head target boxes (optional)',
    itemSchema: [
      { key: 'vectorId', type: FieldType.TEXT, label: 'Vector id', default: 'v1' },
      { key: 'xMin', type: FieldType.NUMBER, label: 'Head x min', default: 0 },
      { key: 'xMax', type: FieldType.NUMBER, label: 'Head x max', default: 1 },
      { key: 'yMin', type: FieldType.NUMBER, label: 'Head y min', default: 0 },
      { key: 'yMax', type: FieldType.NUMBER, label: 'Head y max', default: 1 },
    ],
  },
  {
    key: 'angleToAxis',
    type: FieldType.ARRAY,
    label: 'Angle vs +x axis (optional)',
    itemSchema: [
      { key: 'vectorId', type: FieldType.TEXT, label: 'Vector id', default: 'v1' },
      {
        key: 'axis',
        type: FieldType.SELECT,
        label: 'Axis',
        options: ['positiveX'],
        default: 'positiveX',
      },
      { key: 'minDeg', type: FieldType.NUMBER, label: 'Min °', default: 0 },
      { key: 'maxDeg', type: FieldType.NUMBER, label: 'Max °', default: 90 },
    ],
  },
  { key: 'mcqOptionId', type: FieldType.TEXT, label: 'Expected MCQ option id (optional)', default: '' },
];

export default graphStateMatch;
