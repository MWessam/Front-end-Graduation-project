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
  
  // =====================================================
  // PHASE 7: MATHEMATICS QUESTIONS
  // =====================================================
  
  // Lesson 4: Trigonometry - Directed Angles
  '4': [
    {
      questionId: 'q-trig-angle-1',
      lessonId: '4',
      questionHead: 'Convert 120° to radians. Express as a fraction of π.',
      questionHead_ar: 'حول 120° إلى التقدير الدائري. عبر عنها ككسر من π',
      questionBody: {
        interactionMode: InteractionMode.PARAMETER_ADJUST,
        inputType: 'radians',
        showUnitCircle: true,
        denominatorOptions: [1, 2, 3, 4, 6],
      },
      questionType: QuestionType.UNIT_CIRCLE,
    },
    {
      questionId: 'q-trig-angle-2',
      lessonId: '4',
      questionHead: 'Click on the unit circle to place the angle θ = 5π/6',
      questionHead_ar: 'اضغط على دائرة الوحدة لتحديد موضع الزاوية θ = 5π/6',
      questionBody: {
        interactionMode: InteractionMode.ANGLE_INPUT,
        showLabels: true,
        snapToSpecialAngles: true,
        showCoordinates: true,
      },
      questionType: QuestionType.UNIT_CIRCLE,
    },
    {
      questionId: 'q-trig-quadrant-1',
      lessonId: '4',
      questionHead: 'In which quadrant does the angle 240° lie?',
      questionHead_ar: 'في أي ربع تقع الزاوية 240°؟',
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        showCircle: true,
        highlightAngle: (240 * Math.PI) / 180,
        options: [
          { label: 'Quadrant I (الربع الأول)', value: 'Q1' },
          { label: 'Quadrant II (الربع الثاني)', value: 'Q2' },
          { label: 'Quadrant III (الربع الثالث)', value: 'Q3' },
          { label: 'Quadrant IV (الربع الرابع)', value: 'Q4' },
        ],
      },
      questionType: QuestionType.UNIT_CIRCLE,
    },
  ],
  
  // Lesson 5: Trigonometry - Trig Functions on Unit Circle
  '5': [
    {
      questionId: 'q-trig-func-1',
      lessonId: '5',
      questionHead: 'Click on all angles θ where sin(θ) = 1/2 in the interval [0, 2π]',
      questionHead_ar: 'حدد جميع الزوايا θ حيث جا(θ) = 1/2 في الفترة [0, 2π]',
      questionBody: {
        interactionMode: InteractionMode.ADD_POINTS,
        maxPoints: 2,
        showLabels: true,
        snapToSpecialAngles: true,
      },
      questionType: QuestionType.UNIT_CIRCLE,
    },
    {
      questionId: 'q-trig-sign-1',
      lessonId: '5',
      questionHead: 'What is the sign of cos(θ) in Quadrant II?',
      questionHead_ar: 'ما إشارة جتا(θ) في الربع الثاني؟',
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        showCircle: true,
        options: [
          { label: 'Positive (+)', value: 'positive' },
          { label: 'Negative (-)', value: 'negative' },
          { label: 'Zero (0)', value: 'zero' },
        ],
      },
      questionType: QuestionType.UNIT_CIRCLE,
    },
  ],
  
  // Lesson 6: Quadratic Inequalities
  '6': [
    {
      questionId: 'q-ineq-interval-1',
      lessonId: '6',
      questionHead: 'Select the solution interval for x² - 4 < 0',
      questionHead_ar: 'حدد فترة الحل للمتباينة س² - 4 < 0',
      questionBody: {
        interactionMode: InteractionMode.INTERVAL_SELECT,
        range: { min: -5, max: 5 },
        step: 0.5,
      },
      questionType: QuestionType.NUMBER_LINE,
    },
    {
      questionId: 'q-ineq-sign-1',
      lessonId: '6',
      questionHead: 'Mark the sign of f(x) = x² - 4 in each region',
      questionHead_ar: 'حدد إشارة د(س) = س² - 4 في كل منطقة',
      questionBody: {
        interactionMode: InteractionMode.REGION_SELECT,
        range: { min: -5, max: 5 },
        criticalPoints: [-2, 2],
        signLabels: ['+', '-'],
      },
      questionType: QuestionType.NUMBER_LINE,
    },
    {
      questionId: 'q-ineq-select-1',
      lessonId: '6',
      questionHead: 'Select all intervals where x² - 1 > 0',
      questionHead_ar: 'حدد جميع الفترات حيث س² - 1 > 0',
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        range: { min: -4, max: 4 },
        multiSelect: true,
        highlightIntervals: [
          { left: '-inf', right: -1, sign: '+' },
          { left: -1, right: 1, sign: '-' },
          { left: 1, right: 'inf', sign: '+' },
        ],
        options: [
          { label: '(-∞, -1)', value: 'neg_inf_to_neg1' },
          { label: '(-1, 1)', value: 'neg1_to_1' },
          { label: '(1, ∞)', value: '1_to_pos_inf' },
        ],
      },
      questionType: QuestionType.NUMBER_LINE,
    },
  ],
  
  // Lesson 7: Similarity - Similar Triangles
  '7': [
    {
      questionId: 'q-sim-ratio-1',
      lessonId: '7',
      questionHead: 'If △ABC ~ △DEF with sides 3, 4, 5 and 6, 8, 10 respectively, what is the ratio of similarity?',
      questionHead_ar: 'إذا كان △ABC ~ △DEF بأضلاع 3، 4، 5 و 6، 8، 10 على التوالي، ما نسبة التشابه؟',
      questionBody: {
        interactionMode: InteractionMode.NUMERIC_INPUT,
        showDiagram: true,
        triangles: [
          { name: 'ABC', sides: [3, 4, 5] },
          { name: 'DEF', sides: [6, 8, 10] },
        ],
        label: 'Scale factor (k):',
        placeholder: 'Enter ratio',
      },
      questionType: QuestionType.GEOMETRY,
    },
    {
      questionId: 'q-sim-criterion-1',
      lessonId: '7',
      questionHead: 'Which similarity criterion applies? Two triangles have angles 30°, 60°, 90° and 30°, 60°, 90°.',
      questionHead_ar: 'أي معيار تشابه ينطبق؟ مثلثان لهما زوايا 30°، 60°، 90° و 30°، 60°، 90°',
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        showDiagram: true,
        triangles: [
          { name: 'ABC', sides: [1, 1.73, 2] },
          { name: 'DEF', sides: [2, 3.46, 4] },
        ],
        options: [
          { label: 'AA (Angle-Angle)', value: 'AA' },
          { label: 'SAS (Side-Angle-Side)', value: 'SAS' },
          { label: 'SSS (Side-Side-Side)', value: 'SSS' },
        ],
      },
      questionType: QuestionType.GEOMETRY,
    },
    {
      questionId: 'q-sim-scale-1',
      lessonId: '7',
      questionHead: 'Adjust the scale factor to make triangle A\'B\'C\' similar to △ABC with ratio 2:1',
      questionHead_ar: 'اضبط معامل القياس لجعل المثلث A\'B\'C\' مشابهًا لـ △ABC بنسبة 2:1',
      questionBody: {
        interactionMode: InteractionMode.PARAMETER_ADJUST,
        baseTriangle: { name: 'ABC', sides: [3, 4, 5] },
        sliders: [
          { param: 'scale', min: 0.5, max: 3, step: 0.1, label: 'Scale Factor (k)' },
        ],
      },
      questionType: QuestionType.GEOMETRY,
    },
  ],
  
  // Lesson 8: Related Angles - Match Formulas
  '8': [
    {
      questionId: 'q-related-match-1',
      lessonId: '8',
      questionHead: 'Match each related angle expression to its equivalent',
      questionHead_ar: 'طابق كل تعبير زاوية منتسبة مع مكافئه',
      questionBody: {
        interactionMode: InteractionMode.DRAG_MATCH,
        leftItems: [
          { id: 'l1', label: 'sin(180° - θ)' },
          { id: 'l2', label: 'cos(180° - θ)' },
          { id: 'l3', label: 'sin(180° + θ)' },
          { id: 'l4', label: 'cos(360° - θ)' },
        ],
        rightItems: [
          { id: 'r1', label: 'sin(θ)' },
          { id: 'r2', label: '-cos(θ)' },
          { id: 'r3', label: '-sin(θ)' },
          { id: 'r4', label: 'cos(θ)' },
        ],
      },
      questionType: QuestionType.DRAG_MATCH,
    },
    {
      questionId: 'q-related-order-1',
      lessonId: '8',
      questionHead: 'Order these angles from smallest to largest (in standard position)',
      questionHead_ar: 'رتب هذه الزوايا من الأصغر إلى الأكبر (في الوضع القياسي)',
      questionBody: {
        interactionMode: InteractionMode.DRAG_ORDER,
        items: [
          { id: 'a1', label: '5π/6' },
          { id: 'a2', label: 'π/4' },
          { id: 'a3', label: '2π/3' },
          { id: 'a4', label: 'π/3' },
        ],
        shuffled: true,
      },
      questionType: QuestionType.DRAG_MATCH,
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
  ...(MOCK_QUESTIONS_BY_LESSON['4'] ?? []),
  ...(MOCK_QUESTIONS_BY_LESSON['5'] ?? []),
  ...(MOCK_QUESTIONS_BY_LESSON['6'] ?? []),
  ...(MOCK_QUESTIONS_BY_LESSON['7'] ?? []),
  ...(MOCK_QUESTIONS_BY_LESSON['8'] ?? []),
];

/**
 * Mock answers: answerValidationType + expectedAnswerBody.
 */
const MOCK_ANSWERS = {
  // Existing answers
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
  
  // =====================================================
  // PHASE 7: MATHEMATICS ANSWERS
  // =====================================================
  
  // Lesson 4: Trigonometry - Directed Angles
  'q-trig-angle-1': {
    answerId: 'a-trig-angle-1',
    questionId: 'q-trig-angle-1',
    answerValidationType: AnswerValidationType.ANGLE_MATCH,
    expectedAnswerBody: {
      angle: (2 * Math.PI) / 3, // 120° = 2π/3
      tolerance: 0.05,
      acceptEquivalent: true,
    },
  },
  'q-trig-angle-2': {
    answerId: 'a-trig-angle-2',
    questionId: 'q-trig-angle-2',
    answerValidationType: AnswerValidationType.ANGLE_MATCH,
    expectedAnswerBody: {
      angle: (5 * Math.PI) / 6, // 5π/6 = 150°
      tolerance: 0.1,
    },
  },
  'q-trig-quadrant-1': {
    answerId: 'a-trig-quadrant-1',
    questionId: 'q-trig-quadrant-1',
    answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
    expectedAnswerBody: 'Q3', // 240° is in Quadrant III
  },
  
  // Lesson 5: Trigonometry - Trig Functions
  'q-trig-func-1': {
    answerId: 'a-trig-func-1',
    questionId: 'q-trig-func-1',
    answerValidationType: AnswerValidationType.POINTS_SET_MATCH,
    expectedAnswerBody: {
      points: [
        { angle: Math.PI / 6 },   // 30°
        { angle: (5 * Math.PI) / 6 }, // 150°
      ],
      tolerance: 0.15,
      useAngle: true,
    },
  },
  'q-trig-sign-1': {
    answerId: 'a-trig-sign-1',
    questionId: 'q-trig-sign-1',
    answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
    expectedAnswerBody: 'negative', // cos is negative in Q2
  },
  
  // Lesson 6: Quadratic Inequalities
  'q-ineq-interval-1': {
    answerId: 'a-ineq-interval-1',
    questionId: 'q-ineq-interval-1',
    answerValidationType: AnswerValidationType.INTERVAL_MATCH,
    expectedAnswerBody: {
      intervals: [
        { left: -2, right: 2, leftOpen: true, rightOpen: true },
      ],
      tolerance: 0.1,
    },
  },
  'q-ineq-sign-1': {
    answerId: 'a-ineq-sign-1',
    questionId: 'q-ineq-sign-1',
    answerValidationType: AnswerValidationType.REGION_MATCH,
    expectedAnswerBody: {
      regions: {
        'r0': '+', // (-∞, -2)
        'r1': '-', // (-2, 2)
        'r2': '+', // (2, ∞)
      },
    },
  },
  'q-ineq-select-1': {
    answerId: 'a-ineq-select-1',
    questionId: 'q-ineq-select-1',
    answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
    expectedAnswerBody: ['neg_inf_to_neg1', '1_to_pos_inf'], // x² - 1 > 0 when x < -1 or x > 1
  },
  
  // Lesson 7: Similarity
  'q-sim-ratio-1': {
    answerId: 'a-sim-ratio-1',
    questionId: 'q-sim-ratio-1',
    answerValidationType: AnswerValidationType.NUMERIC_RANGE,
    expectedAnswerBody: {
      answer: [1.9, 2.1], // Scale factor is 2 (6/3 = 8/4 = 10/5 = 2)
    },
  },
  'q-sim-criterion-1': {
    answerId: 'a-sim-criterion-1',
    questionId: 'q-sim-criterion-1',
    answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
    expectedAnswerBody: 'AA',
  },
  'q-sim-scale-1': {
    answerId: 'a-sim-scale-1',
    questionId: 'q-sim-scale-1',
    answerValidationType: AnswerValidationType.NUMERIC_RANGE,
    expectedAnswerBody: {
      scale: [1.9, 2.1], // Target scale factor is 2
    },
  },
  
  // Lesson 8: Related Angles
  'q-related-match-1': {
    answerId: 'a-related-match-1',
    questionId: 'q-related-match-1',
    answerValidationType: AnswerValidationType.PAIR_MATCH,
    expectedAnswerBody: {
      matches: {
        'l1': 'r1', // sin(180° - θ) = sin(θ)
        'l2': 'r2', // cos(180° - θ) = -cos(θ)
        'l3': 'r3', // sin(180° + θ) = -sin(θ)
        'l4': 'r4', // cos(360° - θ) = cos(θ)
      },
    },
  },
  'q-related-order-1': {
    answerId: 'a-related-order-1',
    questionId: 'q-related-order-1',
    answerValidationType: AnswerValidationType.SEQUENCE_MATCH,
    expectedAnswerBody: {
      order: ['a2', 'a4', 'a3', 'a1'], // π/4, π/3, 2π/3, 5π/6 (0.785, 1.047, 2.094, 2.618)
    },
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
