/**
 * SEQUENCE_MATCH validator
 * Validates that user's ordered sequence matches expected order
 * 
 * @param {Object} userAnswer - User's answer: { order: ['id1', 'id2', ...] }
 * @param {Object} expectedAnswerBody - Expected: { order: ['id1', 'id2', ...] }
 * @returns {{ correct: boolean, feedback?: string }}
 */
export default function sequenceMatch(userAnswer, expectedAnswerBody) {
  const userOrder = userAnswer?.order ?? [];
  const expectedOrder = expectedAnswerBody?.order ?? [];
  
  if (expectedOrder.length === 0 && userOrder.length === 0) {
    return { correct: true };
  }
  
  if (userOrder.length !== expectedOrder.length) {
    return {
      correct: false,
      feedback: `Expected ${expectedOrder.length} items, got ${userOrder.length}`,
    };
  }
  
  // Check each position
  let correctPositions = 0;
  const incorrectPositions = [];
  
  for (let i = 0; i < expectedOrder.length; i++) {
    if (userOrder[i] === expectedOrder[i]) {
      correctPositions++;
    } else {
      incorrectPositions.push(i + 1); // 1-indexed for user feedback
    }
  }
  
  if (correctPositions === expectedOrder.length) {
    return { correct: true };
  }
  
  // Generate feedback
  if (correctPositions === 0) {
    return {
      correct: false,
      feedback: 'The order is completely incorrect',
    };
  }
  
  return {
    correct: false,
    feedback: `${correctPositions} of ${expectedOrder.length} items in correct position`,
  };
}
