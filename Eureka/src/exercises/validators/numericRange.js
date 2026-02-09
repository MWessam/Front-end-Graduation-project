import { FieldType } from '../data/BaseData';

/**
 * Validator: NUMERIC_RANGE
 * Checks that each param in userAnswer.params lies within expectedAnswerBody[param] = [min, max].
 * @param {object} userAnswer - { params?: { [key: string]: number } }
 * @param {object} expectedAnswerBody - { ranges: [{ param, min, max }] }
 * @returns {{ correct: boolean, feedback?: string }}
 */
function numericRange(userAnswer, expectedAnswerBody) {
  const params = userAnswer?.params ?? {};
  // Normalize old format { "a": [0,1] } vs new format { ranges: [...] }
  let ranges = {};
  
  if (Array.isArray(expectedAnswerBody?.ranges)) {
      expectedAnswerBody.ranges.forEach(r => {
          ranges[r.param] = [r.min, r.max];
      });
  } else {
      ranges = expectedAnswerBody ?? {};
  }

  for (const [key, range] of Object.entries(ranges)) {
    if (!Array.isArray(range) || range.length < 2) continue;
    const [min, max] = range.map(Number);
    const v = Number(params[key]);
    if (typeof params[key] === 'undefined' || Number.isNaN(v)) {
      return { correct: false, feedback: `Adjust the ${key} slider.` };
    }
    if (v < min || v > max) {
      return {
        correct: false,
        feedback: `${key} must be between ${min} and ${max}.`,
      };
    }
  }
  return { correct: true };
}

numericRange.schema = [
    {
        key: 'ranges',
        type: FieldType.ARRAY,
        label: 'Valid Parameter Ranges',
        itemSchema: [
            { key: 'param', type: FieldType.TEXT, label: 'Parameter' },
            { key: 'min', type: FieldType.NUMBER, label: 'Min Valid Value' },
            { key: 'max', type: FieldType.NUMBER, label: 'Max Valid Value' }
        ]
    }
];

export default numericRange;
