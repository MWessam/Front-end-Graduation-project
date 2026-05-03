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
