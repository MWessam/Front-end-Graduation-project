import { AnswerValidationType } from '../types';
import { contentService } from '../../services/contentService';
import { resolveCurriculumApi } from '../../services/curriculumApi';

/** Simulated delay (ms) for fetch calls */
const MOCK_DELAY = 300;
const STORAGE_KEY = 'eureka_srs_submissions';

function delay(ms = MOCK_DELAY) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Mock submissions store
 * @type {Object.<string, import('../types').UserQuestionSubmission>}
 */
const MOCK_SUBMISSIONS = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

function saveSubmissions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_SUBMISSIONS));
}

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
 * @param {string|number|null|undefined} classId when set, load from class-scoped curriculum
 * @returns {Promise<Array>}
 */
export async function fetchQuestionsForLesson(lessonId, classId) {
  await delay();
  const api = resolveCurriculumApi(classId);
  const list = api.getQuestionsByLesson(lessonId);
  return getScheduledQueue(list, true);
}

/**
 * Fetch questions for review queue (when reviewQueue=true).
 * Returns ONLY questions that are due for review.
 * @returns {Promise<Array>}
 */
export async function fetchQuestionsForReviewQueue() {
  await delay();
  const allQuestions = contentService.getQuestions();
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
  const allQuestions = contentService.getQuestions();
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

  saveSubmissions();
  return { ...MOCK_SUBMISSIONS[questionId] };
}

/**
 * Fetch answer (validation scheme) for a question.
 * @param {string} questionId
 * @returns {Promise<{ answerId, questionId, answerValidationType, expectedAnswerBody }>}
 */
export async function fetchAnswerForQuestion(questionId, classId) {
  await delay();
  const api = resolveCurriculumApi(classId);
  const question = api.getQuestionById(questionId);
  if (!question) {
    return {
      answerId: `a-${questionId}`,
      questionId,
      answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
      expectedAnswerBody: '',
    };
  }
  return {
    answerId: `a-${questionId}`,
    questionId,
    answerValidationType: question.answerValidationType,
    expectedAnswerBody: question.expectedAnswer,
  };
}
