import { AnswerValidationType } from '../types';
import exactMatchLabel from './exactMatchLabel';

const REGISTRY = {
  [AnswerValidationType.EXACT_MATCH_LABEL]: exactMatchLabel,
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
