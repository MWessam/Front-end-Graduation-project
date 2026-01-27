/**
 * REGION_MATCH validator
 * Validates that user's selected/shaded regions match expected regions
 * 
 * @param {Object} userAnswer - User's answer: { regions: { regionId: sign, ... } } or { selected: [regionId, ...] }
 * @param {Object} expectedAnswerBody - Expected: { regions: { regionId: sign, ... } } or { selected: [regionId, ...] }
 * @returns {{ correct: boolean, feedback?: string }}
 */
export default function regionMatch(userAnswer, expectedAnswerBody) {
  // Handle object format (sign analysis)
  if (expectedAnswerBody?.regions) {
    const userRegions = userAnswer?.regions ?? {};
    const expectedRegions = expectedAnswerBody.regions;
    
    const expectedKeys = Object.keys(expectedRegions);
    let correctCount = 0;
    const errors = [];
    
    for (const regionId of expectedKeys) {
      const expected = expectedRegions[regionId];
      const user = userRegions[regionId];
      
      if (user === expected) {
        correctCount++;
      } else if (user === undefined || user === null) {
        errors.push(`Region ${regionId} not marked`);
      } else {
        errors.push(`Region ${regionId} should be "${expected}", got "${user}"`);
      }
    }
    
    if (correctCount === expectedKeys.length) {
      return { correct: true };
    }
    
    return {
      correct: false,
      feedback: `${correctCount} of ${expectedKeys.length} regions correct. ${errors[0]}`,
    };
  }
  
  // Handle array format (simple selection)
  if (expectedAnswerBody?.selected) {
    const userSelected = userAnswer?.selected ?? [];
    const expectedSelected = expectedAnswerBody.selected;
    
    const userSet = new Set(Array.isArray(userSelected) ? userSelected : [userSelected]);
    const expectedSet = new Set(expectedSelected);
    
    // Check if sets are equal
    if (userSet.size !== expectedSet.size) {
      return {
        correct: false,
        feedback: `Selected ${userSet.size} region(s), expected ${expectedSet.size}`,
      };
    }
    
    for (const item of expectedSet) {
      if (!userSet.has(item)) {
        return {
          correct: false,
          feedback: 'Some selected regions are incorrect',
        };
      }
    }
    
    return { correct: true };
  }
  
  return {
    correct: false,
    feedback: 'Invalid answer format',
  };
}
