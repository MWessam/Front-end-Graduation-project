import { AnswerValidationType } from '../types';
import exactMatchLabel from './exactMatchLabel';
import numericRange from './numericRange';
import moleculeStructureMatch from './moleculeStructureMatch';
import reactionProductMatch from './reactionProductMatch';
import matrixMatch from './matrixMatch';
import complexNumberMatch from './complexNumberMatch';
import projectileHit from './projectileHit';
import vectorMatch from './vectorMatch';

const REGISTRY = {
  [AnswerValidationType.EXACT_MATCH_LABEL]: exactMatchLabel,
  [AnswerValidationType.NUMERIC_RANGE]: numericRange,
  [AnswerValidationType.MOLECULE_STRUCTURE_MATCH]: moleculeStructureMatch,
  [AnswerValidationType.REACTION_PRODUCT_MATCH]: reactionProductMatch,
  [AnswerValidationType.MATRIX_MATCH]: matrixMatch,
  [AnswerValidationType.COMPLEX_NUMBER_MATCH]: complexNumberMatch,
  [AnswerValidationType.PROJECTILE_HIT]: projectileHit,
  [AnswerValidationType.VECTOR_MATCH]: vectorMatch,
};

/**
 * @param {string} answerValidationType - AnswerValidationType enum value
 * @returns {(userAnswer: object, expectedAnswerBody: object) => { correct: boolean, feedback?: string }}
 */
export function getValidator(answerValidationType) {
  const fn = REGISTRY[answerValidationType];
  if (!fn) {
    return (userAnswer, expectedAnswerBody) => ({
      correct: false,
      feedback: `Unknown validator: ${answerValidationType}`,
    });
  }
  return fn;
}
