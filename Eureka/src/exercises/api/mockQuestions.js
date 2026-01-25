import { QuestionType, InteractionMode, AnswerValidationType } from '../types';

/** Simulated delay (ms) for fetch calls */
const MOCK_DELAY = 300;

function delay(ms = MOCK_DELAY) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Mock questions: BarChart + DisplaySelect (Starbucks-style).
 * questionBody: { context, chart: { type, data: [{ label, value, color }] } }
 * interactionMode in body or derived.
 */
const MOCK_QUESTIONS_BY_LESSON = {
  '1': [
    {
      questionId: 'q-bar-1',
      lessonId: '1',
      questionHead: 'What state has about 400 cafes?',
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        context:
          'This chart shows the number of Starbucks cafes in three states — New Jersey, New York, and Pennsylvania.',
        chart: {
          type: 'bar',
          data: [
            { label: 'NJ', value: 295, color: '#ec4899' },
            { label: 'NY', value: 635, color: '#8b5cf6' },
            { label: 'PA', value: 405, color: '#94a3b8' },
          ],
        },
      },
      questionType: QuestionType.BAR_CHART,
    },
  ],
  '2': [
    {
      questionId: 'q-bar-2',
      lessonId: '2',
      questionHead: 'Which state has the most cafes?',
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        context: 'Starbucks cafes by state.',
        chart: {
          type: 'bar',
          data: [
            { label: 'NJ', value: 295, color: '#ec4899' },
            { label: 'NY', value: 635, color: '#8b5cf6' },
            { label: 'PA', value: 405, color: '#94a3b8' },
          ],
        },
      },
      questionType: QuestionType.BAR_CHART,
    },
  ],
};

/** Default lesson questions if lessonId not in map */
const DEFAULT_LESSON_QUESTIONS = MOCK_QUESTIONS_BY_LESSON['1'];

/** Review queue: mixed questions from different lessons */
const MOCK_REVIEW_QUESTIONS = [
  ...MOCK_QUESTIONS_BY_LESSON['1'],
  ...(MOCK_QUESTIONS_BY_LESSON['2'] ?? []),
];

/**
 * Mock answers: answerValidationType + expectedAnswerBody.
 */
const MOCK_ANSWERS = {
  'q-bar-1': {
    answerId: 'a-bar-1',
    questionId: 'q-bar-1',
    answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
    expectedAnswerBody: 'PA',
  },
  'q-bar-2': {
    answerId: 'a-bar-2',
    questionId: 'q-bar-2',
    answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
    expectedAnswerBody: 'NY',
  },
};

/**
 * Fetch questions for a lesson.
 * @param {string} lessonId
 * @returns {Promise<Array<{ questionId, lessonId, questionHead, questionBody, questionType }>>}
 */
export async function fetchQuestionsForLesson(lessonId) {
  await delay();
  const list = MOCK_QUESTIONS_BY_LESSON[String(lessonId)] ?? DEFAULT_LESSON_QUESTIONS;
  return [...list];
}

/**
 * Fetch questions for review queue (when reviewQueue=true).
 * @returns {Promise<Array<{ questionId, lessonId, questionHead, questionBody, questionType }>>}
 */
export async function fetchQuestionsForReviewQueue() {
  await delay();
  return [...MOCK_REVIEW_QUESTIONS];
}

/**
 * Fetch answer (validation scheme) for a question.
 * @param {string} questionId
 * @returns {Promise<{ answerId, questionId, answerValidationType, expectedAnswerBody }>}
 */
export async function fetchAnswerForQuestion(questionId) {
  await delay();
  const answer = MOCK_ANSWERS[questionId];
  if (!answer) {
    return {
      answerId: `a-${questionId}`,
      questionId,
      answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
      expectedAnswerBody: '',
    };
  }
  return { ...answer };
}
