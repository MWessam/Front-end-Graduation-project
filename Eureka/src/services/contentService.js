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
    contentCards: [
      { 
        id: 101, 
        blocks: [
          { id: 201, type: 'title', content: 'Introduction to Python Functions' },
          { id: 202, type: 'gamma', content: 'A function is a block of organized, reusable code that is written to perform a specific task.' },
          { id: 203, type: 'h1', content: 'Why use functions?' },
          { id: 204, type: 'bullet_list', content: "Avoid repeating the same steps\nOrganize code into logical blocks\nMake code easier to read and maintain" },
          { id: 205, type: 'h2', content: 'Basic Syntax' },
          { id: 206, type: 'code', content: 'def my_function():\n  print("Hello from a function")' },
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
      context: 'Python Syntax'
    },
    answerValidationType: 'EXACT_MATCH_LABEL',
    expectedAnswer: 'def',
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
    if (!localStorage.getItem(STORAGE_KEYS.LESSONS)) {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(DEFAULT_LESSONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS)) {
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
    const subjects = this.getSubjects().filter((s) => String(s.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
    // Ideally delete lessons too, but keeping it simple for now
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
