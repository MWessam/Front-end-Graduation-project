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
    {
      questionId: 'q-chem-1',
      lessonId: '2',
      questionHead: 'Build methane (CH₄)',
      questionBody: {
        interactionMode: InteractionMode.MOLECULE_BUILD,
        allowedElements: ['C', 'H'],
      },
      questionType: QuestionType.CHEMISTRY_MOLECULE_BUILDER,
    },
  ],
  '3': [
    {
      questionId: 'q-chem-2',
      lessonId: '3',
      questionHead: 'Build ethyl alcohol (C₂H₅OH)',
      questionBody: {
        interactionMode: InteractionMode.MOLECULE_BUILD,
        allowedElements: ['C', 'H', 'O'],
      },
      questionType: QuestionType.CHEMISTRY_MOLECULE_BUILDER,
    },
    {
      questionId: 'q-quad-1',
      lessonId: '3',
      questionHead: 'Match the quadratic curve: adjust a, b, and c so your dashed curve overlaps the blue curve.',
      questionBody: {
        interactionMode: InteractionMode.PARAMETER_ADJUST,
        template: 'quadratic',
        referenceCurve: { a: 1, b: 0, c: -1 },
        sliders: [
          { param: 'a', min: -3, max: 3, step: 0.1 },
          { param: 'b', min: -3, max: 3, step: 0.1 },
          { param: 'c', min: -5, max: 5, step: 0.1 },
        ],
        canvas: { xMin: -4, xMax: 4, yMin: -6, yMax: 6 },
      },
      questionType: QuestionType.MATH_GRAPH,
    },
  ],
};

/** Default lesson questions if lessonId not in map */
const DEFAULT_LESSON_QUESTIONS = MOCK_QUESTIONS_BY_LESSON['1'];

/** Review queue: mixed questions from different lessons */
const MOCK_REVIEW_QUESTIONS = [
  ...(MOCK_QUESTIONS_BY_LESSON['1'] ?? []),
  ...(MOCK_QUESTIONS_BY_LESSON['2'] ?? []),
  ...(MOCK_QUESTIONS_BY_LESSON['3'] ?? []),
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
  'q-chem-1': {
    answerId: 'a-chem-1',
    questionId: 'q-chem-1',
    answerValidationType: AnswerValidationType.MOLECULE_STRUCTURE_MATCH,
    expectedAnswerBody: {
      elementCounts: { C: 1, H: 4 },
      bondCount: 4,
      bondTypeCounts: { single: 4 },
    },
  },
  'q-chem-2': {
    answerId: 'a-chem-2',
    questionId: 'q-chem-2',
    answerValidationType: AnswerValidationType.MOLECULE_STRUCTURE_MATCH,
    expectedAnswerBody: {
      elementCounts: { C: 2, H: 6, O: 1 },
      bondCount: 8,
      bondTypeCounts: { single: 8 },
    },
  },
  'q-quad-1': {
    answerId: 'a-quad-1',
    questionId: 'q-quad-1',
    answerValidationType: AnswerValidationType.NUMERIC_RANGE,
    expectedAnswerBody: {
      a: [0.9, 1.1],
      b: [-0.2, 0.2],
      c: [-1.2, -0.8],
    },
  },
};

/**
 * Mock submissions store
 * @type {Object.<string, import('../types').UserQuestionSubmission>}
 */
const MOCK_SUBMISSIONS = {};

/**
 * Helper to build the scheduled queue based on SRS state.
 * Priority: Due reviews (EDF) -> New questions (optional).
 * @param {Array} questionList 
 * @param {boolean} includeNew 
 */
function getScheduledQueue(questionList, includeNew = true) {
  const now = Date.now();
  const due = [];
  const newItems = [];

  questionList.forEach((q) => {
    const sub = MOCK_SUBMISSIONS[q.questionId];
    if (!sub) {
      if (includeNew) newItems.push(q);
    } else if (sub.nextReviewTime <= now) {
      due.push({ ...q, nextReviewTime: sub.nextReviewTime });
    }
  });

  // Sort due by Earliest Deadline First
  due.sort((a, b) => a.nextReviewTime - b.nextReviewTime);

  return [...due, ...newItems];
}

/**
 * Fetch questions for a lesson.
 * @param {string} lessonId
 * @returns {Promise<Array<{ questionId, lessonId, questionHead, questionBody, questionType }>>}
 */
export async function fetchQuestionsForLesson(lessonId) {
  await delay();
  const list = MOCK_QUESTIONS_BY_LESSON[String(lessonId)] ?? DEFAULT_LESSON_QUESTIONS;
  return getScheduledQueue(list, true);
}

/**
 * Fetch questions for review queue (when reviewQueue=true).
 * Returns ONLY questions that are due for review.
 * @returns {Promise<Array<{ questionId, lessonId, questionHead, questionBody, questionType }>>}
 */
export async function fetchQuestionsForReviewQueue() {
  await delay();
  return getScheduledQueue(MOCK_REVIEW_QUESTIONS, false);
}

/**
 * Fetch the count of due reviews.
 * @returns {Promise<number>}
 */
export async function fetchReviewCount() {
  await delay();
  const now = Date.now();
  let count = 0;
  MOCK_REVIEW_QUESTIONS.forEach((q) => {
    const sub = MOCK_SUBMISSIONS[q.questionId];
    if (sub && sub.nextReviewTime <= now) {
      count++;
    }
  });
  return count;
}

/**
 * Submit an answer and update SRS scheduling.
 * @param {string} questionId
 * @param {boolean} isCorrect
 * @returns {Promise<import('../types').UserQuestionSubmission>}
 */
export async function submitQuestionResult(questionId, isCorrect) {
  await delay();
  const now = Date.now();
  const submission = MOCK_SUBMISSIONS[questionId];

  let nextInterval;
  if (!submission) {
    // First attempt: Wrong -> 30s, Right -> 24h
    nextInterval = isCorrect ? 24 * 60 * 60 * 1000 : 30 * 1000;
    MOCK_SUBMISSIONS[questionId] = {
      questionId,
      nextReviewTime: now + nextInterval,
      lastInterval: nextInterval,
      attempts: 1,
    };
  } else {
    // Subsequent attempts: Right -> x4, Wrong -> /4 (min 30s)
    const lastInterval = submission.lastInterval;
    nextInterval = isCorrect ? lastInterval * 4 : Math.max(30 * 1000, lastInterval / 4);
    MOCK_SUBMISSIONS[questionId] = {
      ...submission,
      nextReviewTime: now + nextInterval,
      lastInterval: nextInterval,
      attempts: submission.attempts + 1,
    };
  }

  return { ...MOCK_SUBMISSIONS[questionId] };
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
