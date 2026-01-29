/**
 * Validator: NUMERIC_RANGE
 * Checks that each param in userAnswer.params lies within expectedAnswerBody[param] = [min, max].
 * @param {object} userAnswer - { params?: { [key: string]: number } }
 * @param {object} expectedAnswerBody - { [paramName]: [min, max], ... }
 * @returns {{ correct: boolean, feedback?: string }}
 */
export default function numericRange(userAnswer, expectedAnswerBody) {
  const params = userAnswer?.params ?? {};
  const ranges = expectedAnswerBody ?? {};
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
