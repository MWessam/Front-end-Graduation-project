/**
 * Exercise system enums.
 * Single source of truth for question types, interaction modes, and validation strategies.
 */

export const QuestionType = Object.freeze({
  MATH_GRAPH: 'MATH_GRAPH',
  BAR_CHART: 'BAR_CHART',
  MCQ: 'MCQ',
  CHEMISTRY_MOLECULE_BUILDER: 'CHEMISTRY_MOLECULE_BUILDER',
});

export const InteractionMode = Object.freeze({
  DISPLAY_SELECT: 'DISPLAY_SELECT',
  PARAMETER_ADJUST: 'PARAMETER_ADJUST',
  MOLECULE_BUILD: 'MOLECULE_BUILD',
});

export const AnswerValidationType = Object.freeze({
  EXACT_MATCH_LABEL: 'EXACT_MATCH_LABEL',
  NUMERIC_RANGE: 'NUMERIC_RANGE',
  MOLECULE_STRUCTURE_MATCH: 'MOLECULE_STRUCTURE_MATCH',
});

/**
 * @typedef {Object} UserQuestionSubmission
 * @property {string} questionId
 * @property {number} nextReviewTime - Timestamp in ms
 * @property {number} lastInterval - Interval in ms
 * @property {number} attempts - Total attempts
 */
