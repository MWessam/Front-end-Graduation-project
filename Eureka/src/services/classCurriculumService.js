/**
 * Per-class curriculum (subjects, lessons, questions) in localStorage.
 * Isolated from platform admin catalog (contentService).
 */

const STORAGE_KEY = 'eureka_class_curricula';

function key(classId) {
  return String(classId);
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function ensureBucket(classId) {
  const all = readAll();
  const k = key(classId);
  if (!all[k]) {
    all[k] = { subjects: [], lessons: [], questions: [] };
    writeAll(all);
  }
  return all[k];
}

export function deleteAllForClass(classId) {
  const all = readAll();
  delete all[key(classId)];
  writeAll(all);
}

export function getSubjects(classId) {
  return [...ensureBucket(classId).subjects];
}

export function getSubjectById(classId, id) {
  return getSubjects(classId).find((s) => String(s.id) === String(id));
}

export function saveSubject(classId, subject) {
  const all = readAll();
  const k = key(classId);
  const bucket = all[k] || { subjects: [], lessons: [], questions: [] };
  const subjects = [...bucket.subjects];
  const idx = subjects.findIndex((s) => String(s.id) === String(subject.id));
  if (idx > -1) subjects[idx] = subject;
  else subjects.push(subject);
  bucket.subjects = subjects;
  all[k] = bucket;
  writeAll(all);
  return subject;
}

export function deleteSubject(classId, subjectId) {
  const all = readAll();
  const k = key(classId);
  const bucket = all[k];
  if (!bucket) return;

  const removeLessonIds = bucket.lessons
    .filter((l) => String(l.subject?.id) === String(subjectId))
    .map((l) => String(l.id));

  bucket.lessons = bucket.lessons.filter((l) => String(l.subject?.id) !== String(subjectId));
  bucket.subjects = bucket.subjects.filter((s) => String(s.id) !== String(subjectId));
  bucket.questions = bucket.questions.filter((q) => !removeLessonIds.includes(String(q.lessonId)));
  writeAll(all);
}

export function getLessons(classId) {
  return [...ensureBucket(classId).lessons];
}

export function getLessonsBySubject(classId, subjectId) {
  return getLessons(classId).filter((l) => String(l.subject?.id) === String(subjectId));
}

export function getLessonById(classId, lessonId) {
  return getLessons(classId).find((l) => String(l.id) === String(lessonId));
}

export function saveLesson(classId, lesson) {
  const all = readAll();
  const k = key(classId);
  const bucket = ensureBucket(classId);
  const lessons = [...bucket.lessons];
  const idx = lessons.findIndex((l) => String(l.id) === String(lesson.id));
  if (idx > -1) lessons[idx] = lesson;
  else lessons.push(lesson);
  bucket.lessons = lessons;
  all[k] = bucket;
  writeAll(all);
  return lesson;
}

export function deleteLesson(classId, lessonId) {
  const all = readAll();
  const k = key(classId);
  const bucket = all[k];
  if (!bucket) return;
  bucket.lessons = bucket.lessons.filter((l) => String(l.id) !== String(lessonId));
  bucket.questions = bucket.questions.filter((q) => String(q.lessonId) !== String(lessonId));
  writeAll(all);
}

export function getQuestions(classId) {
  return [...ensureBucket(classId).questions];
}

export function getQuestionsByLesson(classId, lessonId) {
  return getQuestions(classId).filter((q) => String(q.lessonId) === String(lessonId));
}

export function getQuestionById(classId, questionId) {
  return getQuestions(classId).find((q) => String(q.questionId) === String(questionId));
}

export function saveQuestion(classId, question) {
  const all = readAll();
  const k = key(classId);
  const bucket = ensureBucket(classId);
  const questions = [...bucket.questions];
  const idx = questions.findIndex((q) => String(q.questionId) === String(question.questionId));
  if (idx > -1) questions[idx] = question;
  else questions.push(question);
  bucket.questions = questions;
  all[k] = bucket;
  writeAll(all);
  return question;
}

export function deleteQuestion(classId, questionId) {
  const all = readAll();
  const k = key(classId);
  const bucket = all[k];
  if (!bucket) return;
  bucket.questions = bucket.questions.filter((q) => String(q.questionId) !== String(questionId));
  writeAll(all);
}
