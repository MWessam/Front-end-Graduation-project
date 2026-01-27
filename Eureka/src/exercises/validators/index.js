import { AnswerValidationType } from '../types';
import exactMatchLabel from './exactMatchLabel';
import numericRange from './numericRange';
import moleculeStructureMatch from './moleculeStructureMatch';
// Phase 7: New validators for math questions
import pairMatch from './pairMatch';
import intervalMatch from './intervalMatch';
import pointsSetMatch from './pointsSetMatch';
import sequenceMatch from './sequenceMatch';
import angleMatch from './angleMatch';
import regionMatch from './regionMatch';

const REGISTRY = {
  // Existing validators
  [AnswerValidationType.EXACT_MATCH_LABEL]: exactMatchLabel,
  [AnswerValidationType.NUMERIC_RANGE]: numericRange,
  [AnswerValidationType.MOLECULE_STRUCTURE_MATCH]: moleculeStructureMatch,
  
  // Phase 7: Math validators
  [AnswerValidationType.PAIR_MATCH]: pairMatch,
  [AnswerValidationType.INTERVAL_MATCH]: intervalMatch,
  [AnswerValidationType.POINTS_SET_MATCH]: pointsSetMatch,
  [AnswerValidationType.SEQUENCE_MATCH]: sequenceMatch,
  [AnswerValidationType.ANGLE_MATCH]: angleMatch,
  [AnswerValidationType.REGION_MATCH]: regionMatch,
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
