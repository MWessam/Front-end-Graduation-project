export default function vectorMatch(userAnswer, expectedAnswerBody) {
  if (!userAnswer || !userAnswer.gridVector) {
    return { correct: false, feedback: 'Please draw a vector.' };
  }
  const { start, end } = userAnswer.gridVector;
  const userDx = Math.round(Number(end.x) - Number(start.x));
  const userDy = Math.round(Number(end.y) - Number(start.y));

  const expStart = expectedAnswerBody.start || { x: 0, y: 0 };
  const expEnd = expectedAnswerBody.end || { x: 0, y: 0 };
  const expDx = Math.round(Number(expEnd.x) - Number(expStart.x));
  const expDy = Math.round(Number(expEnd.y) - Number(expStart.y));

  if (userDx === expDx && userDy === expDy) {
    return { correct: true };
  }
  return { correct: false, feedback: '' };
}
