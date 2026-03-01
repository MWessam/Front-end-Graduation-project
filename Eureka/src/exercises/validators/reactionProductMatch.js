/**
 * Validates if the user mixed the correct reagents to form the product.
 * @param {object} userAnswer - { addedReagents: string[] }
 * @param {object} expectedAnswerBody - { reagents: string[] }
 */
export default function reactionProductMatch(userAnswer, expectedAnswerBody) {
  if (!userAnswer || !userAnswer.addedReagents) {
    return { correct: false, feedback: 'No reagents added.' };
  }

  const userReagents = new Set(userAnswer.addedReagents);
  const expectedReagents = new Set(expectedAnswerBody.reagents || []);

  // Check if all expected reagents are present
  const missing = [...expectedReagents].filter(r => !userReagents.has(r));
  
  if (missing.length > 0) {
    return { correct: false, feedback: `Missing reagents: ${missing.join(', ')}` };
  }

  // Check for extra reagents? Maybe not strict, but usually in chemistry "pure" reaction implies only necessary ones.
  // Let's be strict for now.
  const extra = [...userReagents].filter(r => !expectedReagents.has(r));
  if (extra.length > 0) {
    return { correct: false, feedback: `Extra reagents added: ${extra.join(', ')}` };
  }

  return { correct: true, feedback: 'Correct reaction performed!' };
}
