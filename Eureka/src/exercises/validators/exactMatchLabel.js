/**
 * Validator: EXACT_MATCH_LABEL
 * Compares userAnswer.selectedLabel (or selectedId, or selected) to expectedAnswerBody.
 * Supports both single values and arrays for multi-select questions.
 * @param {object} userAnswer - { selectedLabel?: string, selectedId?: string, selected?: string | string[] }
 * @param {string|string[]|object} expectedAnswerBody - Expected label string, array of labels, or { label: string }
 * @returns {{ correct: boolean, feedback?: string }}
 */
export default function exactMatchLabel(userAnswer, expectedAnswerBody) {
  // Get the actual answer from userAnswer
  const actual = userAnswer?.selectedLabel ?? userAnswer?.selectedId ?? userAnswer?.selected ?? '';
  
  // Determine expected value
  let expected;
  if (Array.isArray(expectedAnswerBody)) {
    expected = expectedAnswerBody;
  } else if (typeof expectedAnswerBody === 'string') {
    expected = expectedAnswerBody;
  } else {
    expected = expectedAnswerBody?.label ?? '';
  }
  
  // Handle array comparison (multi-select)
  if (Array.isArray(expected)) {
    const actualArray = Array.isArray(actual) ? actual : [actual].filter(Boolean);
    const expectedSet = new Set(expected.map((e) => String(e).trim().toLowerCase()));
    const actualSet = new Set(actualArray.map((a) => String(a).trim().toLowerCase()));
    
    // Check if sets are equal
    if (expectedSet.size !== actualSet.size) {
      return {
        correct: false,
        feedback: `Expected ${expected.length} selection(s), got ${actualArray.length}.`,
      };
    }
    
    for (const item of expectedSet) {
      if (!actualSet.has(item)) {
        return {
          correct: false,
          feedback: 'Some selections are incorrect.',
        };
      }
    }
    
    return { correct: true };
  }
  
  // Handle single value comparison
  const actualStr = Array.isArray(actual) ? actual[0] : actual;
  const correct =
    String(actualStr ?? '').trim().toLowerCase() === String(expected).trim().toLowerCase();
  return {
    correct,
    feedback: correct ? undefined : `Expected "${expected}".`,
  };
}
