/**
 * Validates if the user's complex number is close to the expected value.
 * @param {object} userAnswer - { re: number, im: number }
 * @param {object} expectedAnswerBody - { re: number, im: number, tolerance: number }
 */
export default function complexNumberMatch(userAnswer, expectedAnswerBody) {
  if (!userAnswer || userAnswer.re === undefined || userAnswer.im === undefined) {
    return { correct: false, feedback: 'No complex number selected.' };
  }

  const userRe = userAnswer.re;
  const userIm = userAnswer.im;
  const expectedRe = expectedAnswerBody.re;
  const expectedIm = expectedAnswerBody.im;
  const tolerance = expectedAnswerBody.tolerance || 0.1;

  const diffRe = Math.abs(userRe - expectedRe);
  const diffIm = Math.abs(userIm - expectedIm);

  if (diffRe > tolerance || diffIm > tolerance) {
    return { 
      correct: false, 
      feedback: `Incorrect position. You are off by (${diffRe.toFixed(2)}, ${diffIm.toFixed(2)}i). Tolerance is ${tolerance}.` 
    };
  }

  return { correct: true, feedback: 'Correct complex number located!' };
}
