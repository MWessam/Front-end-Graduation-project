/**
 * POINTS_SET_MATCH validator
 * Validates that user's placed points match expected points (unordered)
 * 
 * @param {Object} userAnswer - User's answer: { points: [{ x, y, angle? }, ...] }
 * @param {Object} expectedAnswerBody - Expected: { points: [{ x, y, angle? }, ...], tolerance?: number, useAngle?: boolean }
 * @returns {{ correct: boolean, feedback?: string }}
 */
export default function pointsSetMatch(userAnswer, expectedAnswerBody) {
  const userPoints = userAnswer?.points ?? [];
  const expectedPoints = expectedAnswerBody?.points ?? [];
  const tolerance = expectedAnswerBody?.tolerance ?? 0.1;
  const useAngle = expectedAnswerBody?.useAngle ?? false;
  
  if (expectedPoints.length === 0 && userPoints.length === 0) {
    return { correct: true };
  }
  
  if (userPoints.length !== expectedPoints.length) {
    return {
      correct: false,
      feedback: `Expected ${expectedPoints.length} point(s), got ${userPoints.length}`,
    };
  }
  
  // For each expected point, find a matching user point
  const matchedUserIndices = new Set();
  const unmatchedExpected = [];
  
  for (const expected of expectedPoints) {
    let found = false;
    
    for (let i = 0; i < userPoints.length; i++) {
      if (matchedUserIndices.has(i)) continue;
      
      const user = userPoints[i];
      let isMatch = false;
      
      if (useAngle && expected.angle !== undefined && user.angle !== undefined) {
        // Match by angle (for unit circle)
        const angleDiff = Math.abs(normalizeAngle(user.angle) - normalizeAngle(expected.angle));
        isMatch = angleDiff < tolerance || Math.abs(angleDiff - 2 * Math.PI) < tolerance;
      } else {
        // Match by coordinates
        const dx = Math.abs((user.x ?? 0) - (expected.x ?? 0));
        const dy = Math.abs((user.y ?? 0) - (expected.y ?? 0));
        isMatch = dx < tolerance && dy < tolerance;
      }
      
      if (isMatch) {
        matchedUserIndices.add(i);
        found = true;
        break;
      }
    }
    
    if (!found) {
      unmatchedExpected.push(expected);
    }
  }
  
  if (unmatchedExpected.length === 0) {
    return { correct: true };
  }
  
  // Generate feedback
  const correctCount = expectedPoints.length - unmatchedExpected.length;
  
  if (correctCount === 0) {
    return {
      correct: false,
      feedback: 'None of the points are in the correct position',
    };
  }
  
  return {
    correct: false,
    feedback: `${correctCount} of ${expectedPoints.length} points correct`,
  };
}

/**
 * Normalize angle to [0, 2π)
 */
function normalizeAngle(angle) {
  const twoPi = 2 * Math.PI;
  return ((angle % twoPi) + twoPi) % twoPi;
}
