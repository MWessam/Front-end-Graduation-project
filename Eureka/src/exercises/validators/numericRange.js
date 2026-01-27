/**
 * Validator: NUMERIC_RANGE
 * Checks that each param in userAnswer.params lies within expectedAnswerBody[param] = [min, max].
 * Also supports direct answer field: userAnswer.answer checked against expectedAnswerBody.answer = [min, max]
 * @param {object} userAnswer - { params?: { [key: string]: number }, answer?: number | string }
 * @param {object} expectedAnswerBody - { [paramName]: [min, max], ... } or { answer: [min, max] }
 * @returns {{ correct: boolean, feedback?: string }}
 */
export default function numericRange(userAnswer, expectedAnswerBody) {
  const ranges = expectedAnswerBody ?? {};
  
  // Handle direct answer field (for NUMERIC_INPUT mode)
  if (userAnswer?.answer !== undefined && ranges.answer) {
    const [min, max] = ranges.answer.map(Number);
    const v = Number(userAnswer.answer);
    
    if (Number.isNaN(v) || userAnswer.answer === '') {
      return { correct: false, feedback: 'Please enter a number.' };
    }
    
    if (v < min || v > max) {
      return {
        correct: false,
        feedback: `The answer should be between ${min} and ${max}.`,
      };
    }
    
    return { correct: true };
  }
  
  // Handle params object (for PARAMETER_ADJUST mode)
  const params = userAnswer?.params ?? {};
  
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
