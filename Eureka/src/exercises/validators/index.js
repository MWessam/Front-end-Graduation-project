import { AnswerValidationType } from '../types';
import exactMatchLabel from './exactMatchLabel';
import numericRange from './numericRange';
import moleculeStructureMatch from './moleculeStructureMatch';

const REGISTRY = {
  [AnswerValidationType.EXACT_MATCH_LABEL]: exactMatchLabel,
  [AnswerValidationType.NUMERIC_RANGE]: numericRange,
  [AnswerValidationType.MOLECULE_STRUCTURE_MATCH]: moleculeStructureMatch,
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
