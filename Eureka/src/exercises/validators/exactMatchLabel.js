import { FieldType } from '../data/BaseData';

/**
 * Validator: EXACT_MATCH_LABEL
 * Compares userAnswer.selectedLabel (or selectedId) to expectedAnswerBody (string or { label }).
 * @param {object} userAnswer - { selectedLabel?: string, selectedId?: string }
 * @param {string|object} expectedAnswerBody - Expected label string or { label: string }
 * @returns {{ correct: boolean, feedback?: string }}
 */
function exactMatchLabel(userAnswer, expectedAnswerBody) {
  const actual = userAnswer?.selectedLabel ?? userAnswer?.selectedId ?? '';
  const expected =
    typeof expectedAnswerBody === 'string'
      ? expectedAnswerBody
      : expectedAnswerBody?.label ?? '';
  const correct =
    String(actual).trim().toLowerCase() === String(expected).trim().toLowerCase();
  return {
    correct,
    feedback: correct ? undefined : `Expected "${expected}".`,
  };
}

exactMatchLabel.schema = [
    { key: 'label', type: FieldType.TEXT, label: 'Expected Label', default: '' }
];

export default exactMatchLabel;
