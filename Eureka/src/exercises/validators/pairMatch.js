/**
 * PAIR_MATCH validator
 * Validates that user's matched pairs are correct
 * 
 * @param {Object} userAnswer - User's answer: { matches: { leftId: rightId, ... } }
 * @param {Object} expectedAnswerBody - Expected: { matches: { leftId: rightId, ... } }
 * @returns {{ correct: boolean, feedback?: string }}
 */
export default function pairMatch(userAnswer, expectedAnswerBody) {
  const userMatches = userAnswer?.matches ?? {};
  const expectedMatches = expectedAnswerBody?.matches ?? {};
  
  // Count expected matches
  const expectedKeys = Object.keys(expectedMatches);
  const expectedCount = expectedKeys.length;
  
  if (expectedCount === 0) {
    return { correct: true };
  }
  
  // Count correct matches
  let correctCount = 0;
  const wrongMatches = [];
  const missingMatches = [];
  
  for (const [leftId, rightId] of Object.entries(expectedMatches)) {
    if (userMatches[leftId] === rightId) {
      correctCount++;
    } else if (userMatches[leftId]) {
      wrongMatches.push(leftId);
    } else {
      missingMatches.push(leftId);
    }
  }
  
  // Check for extra matches
  const extraMatches = Object.keys(userMatches).filter(
    (key) => !expectedMatches.hasOwnProperty(key)
  );
  
  const allCorrect = correctCount === expectedCount && extraMatches.length === 0;
  
  if (allCorrect) {
    return { correct: true };
  }
  
  // Generate feedback
  const feedbackParts = [];
  
  if (correctCount > 0) {
    feedbackParts.push(`${correctCount} of ${expectedCount} matches correct`);
  }
  
  if (wrongMatches.length > 0) {
    feedbackParts.push(`${wrongMatches.length} incorrect`);
  }
  
  if (missingMatches.length > 0) {
    feedbackParts.push(`${missingMatches.length} missing`);
  }
  
  return {
    correct: false,
    feedback: feedbackParts.join(', ') || 'Matches are incorrect',
  };
}
