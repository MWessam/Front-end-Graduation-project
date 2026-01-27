/**
 * ANGLE_MATCH validator
 * Validates that user's angle matches expected angle (with tolerance)
 * 
 * @param {Object} userAnswer - User's answer: { angle: number (radians), params?: { numerator, denominator } }
 * @param {Object} expectedAnswerBody - Expected: { angle: number (radians), tolerance?: number, acceptEquivalent?: boolean }
 * @returns {{ correct: boolean, feedback?: string }}
 */
export default function angleMatch(userAnswer, expectedAnswerBody) {
  const tolerance = expectedAnswerBody?.tolerance ?? 0.05; // ~3 degrees default
  const acceptEquivalent = expectedAnswerBody?.acceptEquivalent ?? true;
  
  let userAngle;
  
  // Handle different answer formats
  if (userAnswer?.angle !== undefined) {
    userAngle = userAnswer.angle;
  } else if (userAnswer?.params) {
    // Calculate angle from fraction input (numerator * π / denominator)
    const { numerator, denominator } = userAnswer.params;
    userAngle = (numerator * Math.PI) / (denominator || 1);
  } else {
    return {
      correct: false,
      feedback: 'No angle provided',
    };
  }
  
  const expectedAngle = expectedAnswerBody?.angle ?? 0;
  
  // Normalize angles to [0, 2π)
  const normalizedUser = normalizeAngle(userAngle);
  const normalizedExpected = normalizeAngle(expectedAngle);
  
  // Direct comparison
  let diff = Math.abs(normalizedUser - normalizedExpected);
  
  // Handle wrap-around (e.g., 0 and 2π are equivalent)
  if (diff > Math.PI) {
    diff = 2 * Math.PI - diff;
  }
  
  if (diff <= tolerance) {
    return { correct: true };
  }
  
  // Check for equivalent angles (coterminal)
  if (acceptEquivalent) {
    // User angle might be expressed differently but represent same position
    const userDegrees = (normalizedUser * 180) / Math.PI;
    const expectedDegrees = (normalizedExpected * 180) / Math.PI;
    
    if (Math.abs(userDegrees - expectedDegrees) <= (tolerance * 180) / Math.PI) {
      return { correct: true };
    }
  }
  
  // Generate feedback
  const expectedDeg = Math.round((expectedAngle * 180) / Math.PI);
  const userDeg = Math.round((userAngle * 180) / Math.PI);
  
  return {
    correct: false,
    feedback: `Expected angle: ${expectedDeg}° (${formatRadians(expectedAngle)}), got: ${userDeg}° (${formatRadians(userAngle)})`,
  };
}

/**
 * Normalize angle to [0, 2π)
 */
function normalizeAngle(angle) {
  const twoPi = 2 * Math.PI;
  return ((angle % twoPi) + twoPi) % twoPi;
}

/**
 * Format angle in radians as a fraction of π
 */
function formatRadians(angle) {
  const normalized = normalizeAngle(angle);
  const piMultiple = normalized / Math.PI;
  
  // Common fractions
  const fractions = [
    { value: 0, label: '0' },
    { value: 1/6, label: 'π/6' },
    { value: 1/4, label: 'π/4' },
    { value: 1/3, label: 'π/3' },
    { value: 1/2, label: 'π/2' },
    { value: 2/3, label: '2π/3' },
    { value: 3/4, label: '3π/4' },
    { value: 5/6, label: '5π/6' },
    { value: 1, label: 'π' },
    { value: 7/6, label: '7π/6' },
    { value: 5/4, label: '5π/4' },
    { value: 4/3, label: '4π/3' },
    { value: 3/2, label: '3π/2' },
    { value: 5/3, label: '5π/3' },
    { value: 7/4, label: '7π/4' },
    { value: 11/6, label: '11π/6' },
    { value: 2, label: '2π' },
  ];
  
  for (const { value, label } of fractions) {
    if (Math.abs(piMultiple - value) < 0.01) {
      return label;
    }
  }
  
  return `${piMultiple.toFixed(2)}π`;
}
