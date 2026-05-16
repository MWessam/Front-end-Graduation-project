/**
 * ContentService.js
 * Handles persistence for lessons, content cards, and exercises.
 * Uses localStorage as a temporary backend.
 */

const STORAGE_KEYS = {
  LESSONS: 'eureka_lessons',
  QUESTIONS: 'eureka_questions',
  SUBJECTS: 'eureka_subjects',
};

const DEFAULT_SUBJECTS = [
  { id: 1, name: 'Programming', icon: '💻', description: 'Learn to code' },
  { id: 2, name: 'Mathematics', icon: '📐', description: 'Numbers and logic' },
  { id: 3, name: 'Chemistry', icon: '🧪', description: 'Molecules and reactions' },
];

// Initial state if empty
const DEFAULT_LESSONS = [
  {
    id: '1',
    title: 'Introduction to Python Functions',
    subject: { id: 1, name: 'Programming', icon: '💻' },
    description: 'Understanding The Fundamental Building Block Of Mathematics And Programming',
    contentCards: [
      { 
        id: 101, 
        title: 'Introduction',
        blocks: [
          { id: 201, type: 'title', content: 'Introduction to Python Functions' },
          { id: 202, type: 'gamma', content: 'A function is a block of organized, reusable code that is written to perform a specific task.' },
          { id: 203, type: 'paragraph', content: 'A function in programming is a block of organized, reusable code that is written to perform a single, related action. Instead of writing the same code multiple times, you can put it inside a function and simply call that function whenever you need it.' },
        ]
      },
      {
        id: 102,
        title: 'Definition',
        blocks: [
          { id: 204, type: 'h2', content: 'Definition' },
          { id: 205, type: 'paragraph', content: 'A function in programming is a block of organized, reusable code that is written to perform a single, related action.' }
        ]
      },
      {
        id: 103,
        title: 'Real-Life Analogy',
        blocks: [
          { id: 206, type: 'h2', content: 'Real-Life Analogy' },
          { id: 207, type: 'paragraph', content: "It helps programmers avoid repeating the same steps over and over again — just like you don't rebuild a coffee machine every time you want coffee. Think of a function like a vending machine or a coffee machine." }
        ]
      },
      {
        id: 104,
        title: 'Video Lecture',
        blocks: [
          { id: 208, type: 'h2', content: 'Video Overview' },
          { id: 209, type: 'video', content: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
        ]
      }
    ],
  }
];

const DEFAULT_QUESTIONS = [
  {
    questionId: 'q-1',
    lessonId: '1',
    questionHead: 'What keyword is used to define a function in Python?',
    questionType: 'MCQ',
    questionBody: { 
      interactionMode: 'DISPLAY_SELECT',
      context: 'Python Syntax',
      domainData: {
        options: [
          { id: 'opt1', label: 'function' },
          { id: 'opt2', label: 'def' },
          { id: 'opt3', label: 'define' },
          { id: 'opt4', label: 'func' },
        ]
      }
    },
    answerValidationType: 'EXACT_MATCH_LABEL',
    expectedAnswer: { label: 'def' },
  },
  {
    questionId: 'q-2',
    lessonId: '1',
    questionHead: 'What is the primary purpose of a function in programming?',
    questionType: 'MCQ',
    questionBody: {
      interactionMode: 'DISPLAY_SELECT',
      context: 'Programming Basics',
      domainData: {
        options: [
          { id: 'opt1', label: 'To encapsulate a piece of code for reuse' },
          { id: 'opt2', label: 'To store data and variables' },
          { id: 'opt3', label: 'To style the user interface' },
          { id: 'opt4', label: 'To slow down the program execution' },
        ]
      }
    },
    answerValidationType: 'EXACT_MATCH_LABEL',
    expectedAnswer: { label: 'To encapsulate a piece of code for reuse' },
  }
];

export const LESSON_MATH_GRAPH_DEMO_ID = 'lesson-math-graph-demo';

const DEMO_MATH_GRAPH_LESSON = Object.freeze({
  id: LESSON_MATH_GRAPH_DEMO_ID,
  title: 'Interactive math graphs (demo)',
  subject: { id: 2, name: 'Mathematics', icon: '📐' },
  description: 'Samples for Eureka generalized graph questions.',
  contentCards: [],
});

const DEMO_MATH_GRAPH_QUESTIONS = Object.freeze([
  {
    questionId: 'q-mg-legacy-parabola',
    lessonId: LESSON_MATH_GRAPH_DEMO_ID,
    questionHead:
      'Classic mode: slide a, b and c until the dashed parabola matches the blue filled reference.',
    questionType: 'MATH_GRAPH',
    questionBody: {
      interactionMode: 'PARAMETER_ADJUST',
      context: 'Same question shape as older Eureka graph items (pure quadratic sliders).',
      domainData: {
        canvas: { xMin: -5, xMax: 5, yMin: -6, yMax: 8 },
        referenceCurve: { a: 1, b: 0, c: -1 },
        curves: [],
        parameters: [],
      },
      interactionData: {
        sliders: [
          { param: 'a', min: -3, max: 3, step: 0.05 },
          { param: 'b', min: -3, max: 3, step: 0.05 },
          { param: 'c', min: -4, max: 4, step: 0.05 },
        ],
      },
    },
    answerValidationType: 'NUMERIC_RANGE',
    expectedAnswer: {
      ranges: [
        { param: 'a', min: 0.94, max: 1.06 },
        { param: 'b', min: -0.08, max: 0.08 },
        { param: 'c', min: -1.06, max: -0.94 },
      ],
    },
  },
  {
    questionId: 'q-mg-sin-amplitude',
    lessonId: LESSON_MATH_GRAPH_DEMO_ID,
    questionHead: 'Match the dashed green sine to blue by adjusting amplitude a for y = a·sin(x).',
    questionType: 'MATH_GRAPH',
    questionBody: {
      interactionMode: 'PARAMETER_ADJUST',
      context: 'General-expression graphing (explicit y=f(x)).',
      domainData: {
        canvas: { xMin: -6.5, xMax: 6.5, yMin: -2.25, yMax: 2.25 },
        coordinateMode: 'CARTESIAN',
        curves: [
          {
            curveKind: 'explicit_y',
            expr: 'a*sin(x)',
            color: '#10b981',
            role: 'overlay',
            strokeDash: '6 4',
          },
          {
            curveKind: 'explicit_y',
            expr: 'sin(x)',
            color: '#2563eb',
            role: 'reference',
            strokeDash: '',
          },
        ],
        parameters: [{ name: 'a', min: 0.2, max: 2, step: 0.02, default: 0.65 }],
      },
      interactionData: {},
    },
    answerValidationType: 'NUMERIC_RANGE',
    expectedAnswer: { ranges: [{ param: 'a', min: 0.94, max: 1.06 }] },
  },
  {
    questionId: 'q-mg-complex-plane-sample',
    lessonId: LESSON_MATH_GRAPH_DEMO_ID,
    questionHead:
      'Axes show Re ↔ x and Im ↔ y. Explore the circle z = cos(t)+i sin(t) on the complex plane.',
    questionType: 'MATH_GRAPH',
    questionBody: {
      interactionMode: 'PARAMETER_ADJUST',
      context:
        'Coordinate cosmetic only (same math engine): parametric Re/Im parametric plotting.',
      domainData: {
        canvas: { xMin: -1.6, xMax: 1.6, yMin: -1.6, yMax: 1.6 },
        coordinateMode: 'COMPLEX_PLANE',
        curves: [
          {
            curveKind: 'parametric',
            xExpr: 'cos(t)',
            yExpr: 'sin(t)',
            tMin: 0,
            tMax: 6.28318,
            color: '#7c3aed',
            role: 'reference',
            strokeDash: '',
          },
        ],
        parameters: [],
      },
      interactionData: {},
    },
    answerValidationType: 'GRAPH_STATE_MATCH',
    expectedAnswer: {},
  },
  {
    questionId: 'q-mg-vector-angle',
    lessonId: LESSON_MATH_GRAPH_DEMO_ID,
    questionHead: 'Rotate the draggable vector so its direction is roughly along the positive y-axis (~90° to +x).',
    questionType: 'MATH_GRAPH',
    questionBody: {
      interactionMode: 'VECTOR_MANIPULATION',
      context: 'Drag the hollow handle at the arrow head (+x-axis is the horizontal number line ray).',
      domainData: {
        canvas: { xMin: -3, xMax: 3, yMin: -3, yMax: 3 },
        curves: [],
        vectors: [{ id: 'v1', ox: 0, oy: 0, hx: 1.25, hy: 0.1, dragHead: true, dragOrigin: false }],
        angles: [],
      },
      interactionData: {},
    },
    answerValidationType: 'GRAPH_STATE_MATCH',
    expectedAnswer: {
      angleToAxis: [{ vectorId: 'v1', axis: 'positiveX', minDeg: 80, maxDeg: 100 }],
    },
  },
  {
    questionId: 'q-mg-point-target',
    lessonId: LESSON_MATH_GRAPH_DEMO_ID,
    questionHead: 'Drag the red point into the neighborhood of (2, 1).',
    questionType: 'MATH_GRAPH',
    questionBody: {
      interactionMode: 'POINT_DRAG',
      context: 'Free draggable marker on the Cartesian plane.',
      domainData: {
        canvas: { xMin: -0.5, xMax: 4, yMin: -0.5, yMax: 3.5 },
        curves: [
          {
            curveKind: 'explicit_y',
            expr: '0',
            color: '#cbd5e1',
            role: 'reference',
            strokeDash: '',
          },
        ],
        points: [{ id: 'p1', x: 0, y: 0, drag: true }],
      },
      interactionData: {},
    },
    answerValidationType: 'GRAPH_STATE_MATCH',
    expectedAnswer: {
      pointBoxes: [
        { pointId: 'p1', xMin: 1.5, xMax: 2.5, yMin: 0.6, yMax: 1.45 },
      ],
    },
  },
  {
    questionId: 'q-mg-mcq-about-graph',
    lessonId: LESSON_MATH_GRAPH_DEMO_ID,
    questionHead: 'Shown: y = x² − 1. How does it intersect the horizontal x-axis?',
    questionType: 'MATH_GRAPH',
    questionBody: {
      interactionMode: 'GRAPH_MCQ_ASSISTED',
      context: 'MCQ scaffold with the plotted curve as a visual cue.',
      domainData: {
        canvas: { xMin: -3, xMax: 3, yMin: -2.25, yMax: 2.5 },
        curves: [
          {
            curveKind: 'quad',
            qa: 1,
            qb: 0,
            qc: -1,
            color: '#0369a1',
            role: 'reference',
            strokeDash: '',
          },
        ],
      },
      interactionData: {
        options: [
          { id: 'opt_two', label: 'Two distinct real intersections' },
          { id: 'opt_none', label: 'Never intersects' },
          { id: 'opt_touch', label: 'Touches once (double root only)' },
        ],
      },
    },
    answerValidationType: 'EXACT_MATCH_LABEL',
    expectedAnswer: { label: 'Two distinct real intersections' },
  },
  {
    questionId: 'q-mg-composite-phase-mcq',
    lessonId: LESSON_MATH_GRAPH_DEMO_ID,
    questionHead:
      'Slide k so dashed green aligns with blue sin(x); then confirm with the quiz choice.',
    questionType: 'MATH_GRAPH',
    questionBody: {
      interactionMode: 'GRAPH_COMPOSITE',
      context: 'Composite: parameter adjust + assisted MCQ in one exercise.',
      domainData: {
        canvas: { xMin: -6.5, xMax: 6.5, yMin: -2.25, yMax: 2.25 },
        curves: [
          { curveKind: 'explicit_y', expr: 'sin(x)', color: '#2563eb', role: 'reference', strokeDash: '' },
          { curveKind: 'explicit_y', expr: 'sin(x+k)', color: '#059669', role: 'overlay', strokeDash: '6 4' },
        ],
        parameters: [],
      },
      interactionData: {
        enableParameterAdjust: true,
        enableVectorDrag: false,
        enablePointDrag: false,
        enableMcq: true,
        sliders: [{ param: 'k', min: -1.8, max: 0.35, step: 0.03 }],
        options: [
          { id: 'ok', label: 'Green matches blue — phase looks aligned.' },
          { id: 'no', label: 'Still visibly shifted apart.' },
        ],
      },
    },
    answerValidationType: 'GRAPH_STATE_MATCH',
    expectedAnswer: {
      paramRanges: [{ param: 'k', min: -0.12, max: 0.12 }],
      mcqOptionId: 'ok',
    },
  },
  {
    questionId: 'q-mg-number-line',
    lessonId: LESSON_MATH_GRAPH_DEMO_ID,
    questionHead: 'NUMBER_LINE mode emphasizes the horizontal axis — drag point p1 toward x ≈ 1.75.',
    questionType: 'MATH_GRAPH',
    questionBody: {
      interactionMode: 'POINT_DRAG',
      context: 'Useful later for inequalities; here a thin planar strip with prominent x-axis.',
      domainData: {
        coordinateMode: 'NUMBER_LINE',
        canvas: { xMin: -0.5, xMax: 4, yMin: -1.2, yMax: 1.2 },
        curves: [],
        points: [{ id: 'p1', x: 0.2, y: 0, drag: true }],
      },
      interactionData: {},
    },
    answerValidationType: 'GRAPH_STATE_MATCH',
    expectedAnswer: {
      pointBoxes: [{ pointId: 'p1', xMin: 1.45, xMax: 2.05, yMin: -0.8, yMax: 0.8 }],
    },
  },
]);

function mergeMathGraphDemoSeed() {
  const flagKey = 'eureka_seed_math_graph_demo_v2';
  if (typeof localStorage === 'undefined') return;
  if (localStorage.getItem(flagKey)) return;
  try {
    const lessons = JSON.parse(localStorage.getItem(STORAGE_KEYS.LESSONS) || '[]');
    const hasLesson = lessons.some((l) => String(l.id) === LESSON_MATH_GRAPH_DEMO_ID);
    const nextLessons = hasLesson ? lessons : [...lessons, DEMO_MATH_GRAPH_LESSON];
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(nextLessons));

    const questions = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS) || '[]');
    const seen = new Set(questions.map((q) => String(q.questionId)));
    const appended = DEMO_MATH_GRAPH_QUESTIONS.filter((q) => !seen.has(String(q.questionId)));
    if (appended.length) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify([...questions, ...appended]));
    }
    localStorage.setItem(flagKey, '1');
  } catch (e) {
    console.warn('[contentService] mergeMathGraphDemoSeed', e);
  }
}

class ContentService {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
    }
    const existingLessons = JSON.parse(localStorage.getItem(STORAGE_KEYS.LESSONS) || '[]');
    if (!localStorage.getItem(STORAGE_KEYS.LESSONS) || (existingLessons.length === 1 && existingLessons[0].contentCards.length < 4)) {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(DEFAULT_LESSONS));
    }
    // Force refresh questions if it's the old single-question version
    const existingQuestions = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS) || '[]');
    if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS) || existingQuestions.length < 2) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(DEFAULT_QUESTIONS));
    }
    mergeMathGraphDemoSeed();
  }

  // --- Subjects ---

  getSubjects() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS));
  }

  getSubjectById(id) {
    return this.getSubjects().find((s) => String(s.id) === String(id));
  }

  saveSubject(subject) {
    const subjects = this.getSubjects();
    const index = subjects.findIndex((s) => String(s.id) === String(subject.id));
    if (index > -1) {
      subjects[index] = subject;
    } else {
      subjects.push(subject);
    }
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
    return subject;
  }

  deleteSubject(id) {
    const forSubject = this.getLessonsBySubject(id);
    forSubject.forEach((lesson) => this.deleteLesson(lesson.id));
    const subjects = this.getSubjects().filter((s) => String(s.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }

  // --- Lessons ---

  getLessons() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LESSONS));
  }

  getLessonsBySubject(subjectId) {
    return this.getLessons().filter((l) => String(l.subject?.id) === String(subjectId));
  }

  getLessonById(id) {
    return this.getLessons().find((l) => String(l.id) === String(id));
  }

  saveLesson(lesson) {
    const lessons = this.getLessons();
    const index = lessons.findIndex((l) => String(l.id) === String(lesson.id));
    if (index > -1) {
      lessons[index] = lesson;
    } else {
      lessons.push(lesson);
    }
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
    return lesson;
  }

  deleteLesson(id) {
    const lessons = this.getLessons().filter((l) => String(l.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
    
    // Also delete associated questions
    const questions = this.getQuestions().filter((q) => String(q.lessonId) !== String(id));
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }

  // --- Questions / Exercises ---

  getQuestions() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS));
  }

  getQuestionsByLesson(lessonId) {
    return this.getQuestions().filter((q) => String(q.lessonId) === String(lessonId));
  }

  getQuestionById(id) {
    return this.getQuestions().find((q) => String(q.questionId) === String(id));
  }

  saveQuestion(question) {
    const questions = this.getQuestions();
    const index = questions.findIndex((q) => String(q.questionId) === String(question.questionId));
    if (index > -1) {
      questions[index] = question;
    } else {
      questions.push(question);
    }
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
    return question;
  }

  deleteQuestion(id) {
    const questions = this.getQuestions().filter((q) => String(q.questionId) !== String(id));
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }
}

export const contentService = new ContentService();
