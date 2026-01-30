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
  FUNCTION_INPUT: 'FUNCTION_INPUT',
  PARAMETER_ADJUST: 'PARAMETER_ADJUST',
  ADD_POINTS: 'ADD_POINTS',
  MOLECULE_BUILD: 'MOLECULE_BUILD',
});

export const AnswerValidationType = Object.freeze({
  EXACT_MATCH_LABEL: 'EXACT_MATCH_LABEL',
  FUNCTION_EQUIVALENCE: 'FUNCTION_EQUIVALENCE',
  NUMERIC_RANGE: 'NUMERIC_RANGE',
  POINTS_SET_MATCH: 'POINTS_SET_MATCH',
  MOLECULE_STRUCTURE_MATCH: 'MOLECULE_STRUCTURE_MATCH',
});

/**
 * @typedef {Object} UserQuestionSubmission
 * @property {string} questionId
 * @property {number} nextReviewTime - Timestamp in ms
 * @property {number} lastInterval - Interval in ms
 * @property {number} attempts - Total attempts
 */
