/**
 * INTERVAL_MATCH validator
 * Validates that user's selected intervals match expected intervals
 * 
 * @param {Object} userAnswer - User's answer: { intervals: [{ left, right, leftOpen, rightOpen }, ...] }
 * @param {Object} expectedAnswerBody - Expected: { intervals: [{ left, right, leftOpen, rightOpen }, ...], tolerance?: number }
 * @returns {{ correct: boolean, feedback?: string }}
 */
export default function intervalMatch(userAnswer, expectedAnswerBody) {
  const userIntervals = userAnswer?.intervals ?? [];
  const expectedIntervals = expectedAnswerBody?.intervals ?? [];
  const tolerance = expectedAnswerBody?.tolerance ?? 0.01;
  
  if (expectedIntervals.length === 0 && userIntervals.length === 0) {
    return { correct: true };
  }
  
  if (userIntervals.length !== expectedIntervals.length) {
    return {
      correct: false,
      feedback: `Expected ${expectedIntervals.length} interval(s), got ${userIntervals.length}`,
    };
  }
  
  // Sort intervals by left endpoint for comparison
  const sortedUser = [...userIntervals].sort((a, b) => a.left - b.left);
  const sortedExpected = [...expectedIntervals].sort((a, b) => a.left - b.left);
  
  const errors = [];
  
  for (let i = 0; i < sortedExpected.length; i++) {
    const user = sortedUser[i];
    const expected = sortedExpected[i];
    
    // Check left endpoint
    if (Math.abs(user.left - expected.left) > tolerance) {
      errors.push(`Interval ${i + 1}: left endpoint should be ${expected.left}`);
      continue;
    }
    
    // Check right endpoint
    if (Math.abs(user.right - expected.right) > tolerance) {
      errors.push(`Interval ${i + 1}: right endpoint should be ${expected.right}`);
      continue;
    }
    
    // Check open/closed status
    if (user.leftOpen !== expected.leftOpen) {
      errors.push(`Interval ${i + 1}: left endpoint should be ${expected.leftOpen ? 'open' : 'closed'}`);
    }
    
    if (user.rightOpen !== expected.rightOpen) {
      errors.push(`Interval ${i + 1}: right endpoint should be ${expected.rightOpen ? 'open' : 'closed'}`);
    }
  }
  
  if (errors.length === 0) {
    return { correct: true };
  }
  
  return {
    correct: false,
    feedback: errors[0], // Return first error
  };
}
