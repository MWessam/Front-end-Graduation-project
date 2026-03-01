/**
 * Validates if the user's matrix matches the expected matrix.
 * @param {object} userAnswer - { cells: { [key: string]: { value: number, ... } } }
 * @param {object} expectedAnswerBody - { cells: { [key: string]: number } }
 */
export default function matrixMatch(userAnswer, expectedAnswerBody) {
  if (!userAnswer || !userAnswer.cells) {
    return { correct: false, feedback: 'No matrix cells filled.' };
  }

  const userCells = userAnswer.cells;
  const expectedCells = expectedAnswerBody.cells || {};

  // Check each cell in expected
  const keys = Object.keys(expectedCells);
  for (const key of keys) {
    const userCell = userCells[key];
    const expectedValue = expectedCells[key];

    // userCell is object { value, rowDropped, colDropped } or just value
    // Assuming my renderer stores value in .value
    const userValue = userCell?.value ?? userCell; 

    if (userValue === undefined || Math.abs(userValue - expectedValue) > 0.001) {
      return { 
        correct: false, 
        feedback: `Incorrect value at cell ${key.replace('-', ',')}. Expected ${expectedValue}, got ${userValue || 'empty'}.` 
      };
    }
  }

  return { correct: true, feedback: 'Matrix product is correct!' };
}
