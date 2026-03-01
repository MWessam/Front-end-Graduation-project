/**
 * Validates if the projectile hit the target.
 * @param {object} userAnswer - { hit: boolean, angle: number, velocity: number }
 * @param {object} expectedAnswerBody - { hit: boolean }
 */
export default function projectileHit(userAnswer, expectedAnswerBody) {
  if (!userAnswer || userAnswer.hit !== true) {
    return { correct: false, feedback: 'You missed the target. Try adjusting angle or velocity!' };
  }

  return { correct: true, feedback: 'Direct hit! Good shot!' };
}
