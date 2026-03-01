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
      questionId: 'q-bar-freq',
      lessonId: '1',
      questionHead: 'Pick the most frequent item.',
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        context: 'Frequency of items selected.',
        chart: {
          type: 'bar',
          data: [
            { label: 'A', value: 10, color: '#ec4899' },
            { label: 'B', value: 50, color: '#8b5cf6' },
            { label: 'C', value: 30, color: '#94a3b8' },
            { label: 'D', value: 20, color: '#f43f5e' },
            { label: 'E', value: 80, color: '#10b981' }, // Highest
            { label: 'F', value: 40, color: '#3b82f6' },
            { label: 'G', value: 60, color: '#f59e0b' },
            { label: 'H', value: 15, color: '#6366f1' },
            { label: 'I', value: 25, color: '#ec4899' },
            { label: 'J', value: 35, color: '#8b5cf6' },
          ],
        },
      },
      questionType: QuestionType.BAR_CHART,
    },
    {
      questionId: 'q-bar-high',
      lessonId: '1',
      questionHead: 'Pick the highest picked item.',
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        context: 'Select the item with the highest value.',
        chart: {
          type: 'bar',
          data: [
            { label: 'Apple', value: 120, color: '#ec4899' },
            { label: 'Banana', value: 90, color: '#8b5cf6' },
            { label: 'Cherry', value: 60, color: '#94a3b8' },
            { label: 'Date', value: 150, color: '#f43f5e' }, // Highest
            { label: 'Elderberry', value: 40, color: '#10b981' },
            { label: 'Fig', value: 80, color: '#3b82f6' },
            { label: 'Grape', value: 110, color: '#f59e0b' },
            { label: 'Honeydew', value: 70, color: '#6366f1' },
            { label: 'Iceberg', value: 30, color: '#ec4899' },
            { label: 'Jackfruit', value: 100, color: '#8b5cf6' },
          ],
        },
      },
      questionType: QuestionType.BAR_CHART,
    },
    {
      questionId: 'q-quad-match',
      lessonId: '1',
      questionHead: 'Match the quadratic curve.',
      questionBody: {
        interactionMode: InteractionMode.PARAMETER_ADJUST,
        template: 'quadratic',
        referenceCurve: { a: 1, b: -2, c: 1 },
        sliders: [
          { param: 'a', min: -3, max: 3, step: 0.1, initial: 0 },
          { param: 'b', min: -3, max: 3, step: 0.1, initial: 0 },
          { param: 'c', min: -5, max: 5, step: 0.1, initial: 0 },
        ],
        canvas: { xMin: -4, xMax: 4, yMin: -6, yMax: 6 },
      },
      questionType: QuestionType.MATH_GRAPH,
    },
    {
      questionId: 'q-chem-methane',
      lessonId: '1',
      questionHead: 'Build Methane (CH₄)',
      questionBody: {
        interactionMode: InteractionMode.MOLECULE_BUILD,
        allowedElements: ['C', 'H'],
      },
      questionType: QuestionType.CHEMISTRY_MOLECULE_BUILDER,
    },
    {
      questionId: 'q-chem-methyl',
      lessonId: '1',
      questionHead: 'Build Methyl (CH₃)',
      questionBody: {
        interactionMode: InteractionMode.MOLECULE_BUILD,
        allowedElements: ['C', 'H'],
      },
      questionType: QuestionType.CHEMISTRY_MOLECULE_BUILDER,
    },
    {
      questionId: 'q-matrix-mult',
      lessonId: '1',
      questionHead: 'Calculate the matrix product.',
      questionBody: {
        interactionMode: InteractionMode.MATRIX_DRAG,
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[2, 0], [1, 2]],
      },
      questionType: QuestionType.MATH_MATRIX_MULTIPLICATION,
    },
    {
      questionId: 'q-vec-add',
      lessonId: '1',
      questionHead: 'Add the two vectors (Create the Resultant).',
      questionBody: {
        interactionMode: InteractionMode.VECTOR_ADDITION,
        vectors: [
          { start: { x: 0, y: 0 }, end: { x: 2, y: 3 }, label: 'A', color: '#3b82f6' },
          { start: { x: 2, y: 3 }, end: { x: 5, y: 1 }, label: 'B', color: '#10b981' },
        ],
      },
      questionType: QuestionType.MATH_VECTOR_OPERATION,
    },
    {
      questionId: 'q-vec-sub',
      lessonId: '1',
      questionHead: 'Subtract vector B from A (A - B). Create the Resultant.',
      questionBody: {
        interactionMode: InteractionMode.VECTOR_SUBTRACTION,
        vectors: [
          { start: { x: 0, y: 0 }, end: { x: 4, y: 2 }, label: 'A', color: '#3b82f6' },
          { start: { x: 0, y: 0 }, end: { x: 1, y: 3 }, label: 'B', color: '#10b981' },
        ],
      },
      questionType: QuestionType.MATH_VECTOR_OPERATION,
    },
  ],
};

/** Default lesson questions if lessonId not in map */
const DEFAULT_LESSON_QUESTIONS = MOCK_QUESTIONS_BY_LESSON['1'];

/** Review queue: mixed questions from different lessons */
const MOCK_REVIEW_QUESTIONS = [
  ...(MOCK_QUESTIONS_BY_LESSON['1'] ?? []),
];

/**
 * Mock answers: answerValidationType + expectedAnswerBody.
 */
const MOCK_ANSWERS = {
  'q-bar-freq': {
    answerId: 'a-bar-freq',
    questionId: 'q-bar-freq',
    answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
    expectedAnswerBody: 'E',
  },
  'q-bar-high': {
    answerId: 'a-bar-high',
    questionId: 'q-bar-high',
    answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
    expectedAnswerBody: 'Date',
  },
  'q-quad-match': {
    answerId: 'a-quad-match',
    questionId: 'q-quad-match',
    answerValidationType: AnswerValidationType.NUMERIC_RANGE,
    expectedAnswerBody: {
      a: [0.9, 1.1],
      b: [-2.1, -1.9],
      c: [0.9, 1.1],
    },
  },
  'q-chem-methane': {
    answerId: 'a-chem-methane',
    questionId: 'q-chem-methane',
    answerValidationType: AnswerValidationType.MOLECULE_STRUCTURE_MATCH,
    expectedAnswerBody: {
      elementCounts: { C: 1, H: 4 },
      bondCount: 4,
      bondTypeCounts: { single: 4 },
    },
  },
  'q-chem-methyl': {
    answerId: 'a-chem-methyl',
    questionId: 'q-chem-methyl',
    answerValidationType: AnswerValidationType.MOLECULE_STRUCTURE_MATCH,
    expectedAnswerBody: {
      elementCounts: { C: 1, H: 3 },
      bondCount: 3,
      bondTypeCounts: { single: 3 },
    },
  },
  'q-matrix-mult': {
    answerId: 'a-matrix-mult',
    questionId: 'q-matrix-mult',
    answerValidationType: AnswerValidationType.MATRIX_MATCH,
    expectedAnswerBody: {
      cells: {
        '0-0': 4,
        '0-1': 4,
        '1-0': 10,
        '1-1': 8,
      },
    },
  },
  'q-vec-add': {
    answerId: 'a-vec-add',
    questionId: 'q-vec-add',
    answerValidationType: AnswerValidationType.VECTOR_MATCH,
    expectedAnswerBody: {
      start: { x: 0, y: 0 },
      end: { x: 5, y: 1 },
    },
  },
  'q-vec-sub': {
    answerId: 'a-vec-sub',
    questionId: 'q-vec-sub',
    answerValidationType: AnswerValidationType.VECTOR_MATCH,
    expectedAnswerBody: {
      start: { x: 0, y: 0 },
      end: { x: 3, y: -1 },
    },
  },
};

/**
 * Mock submissions store
 * Pre-populated to show review queue items.
 */
const MOCK_SUBMISSIONS = {
  'q-bar-freq': {
    questionId: 'q-bar-freq',
    nextReviewTime: Date.now() - 10000, // Due
    lastInterval: 30000,
    attempts: 1,
  },
  'q-chem-methane': {
    questionId: 'q-chem-methane',
    nextReviewTime: Date.now() - 5000, // Due
    lastInterval: 30000,
    attempts: 1,
  }
};

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
  // Aggregate all questions for review
  const allQuestions = [
    ...(MOCK_QUESTIONS_BY_LESSON['1'] ?? []),
    // Add other lessons if they exist
  ];
  return getScheduledQueue(allQuestions, false);
}

/**
 * Fetch the count of due reviews.
 * @returns {Promise<number>}
 */
export async function fetchReviewCount() {
  await delay();
  const now = Date.now();
  let count = 0;
  
  // Iterate over all possible questions
  const allQuestions = [
      ...(MOCK_QUESTIONS_BY_LESSON['1'] ?? []),
  ];

  allQuestions.forEach((q) => {
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
