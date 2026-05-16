import { contentService } from './contentService';
import * as classCurriculum from './classCurriculumService';

/**
 * Unified curriculum API for admin (platform) vs teacher (per-class).
 * @param {string|number|null|undefined} classId
 */
export function resolveCurriculumApi(classId) {
  if (classId === undefined || classId === null || classId === '') {
    return {
      mode: 'platform',
      classId: null,
      getSubjects: () => contentService.getSubjects(),
      getSubjectById: (id) => contentService.getSubjectById(id),
      saveSubject: (s) => contentService.saveSubject(s),
      deleteSubject: (id) => contentService.deleteSubject(id),
      getLessons: () => contentService.getLessons(),
      getLessonsBySubject: (sid) => contentService.getLessonsBySubject(sid),
      getLessonById: (lid) => contentService.getLessonById(lid),
      saveLesson: (l) => contentService.saveLesson(l),
      deleteLesson: (lid) => contentService.deleteLesson(lid),
      getQuestions: () => contentService.getQuestions(),
      getQuestionsByLesson: (lid) => contentService.getQuestionsByLesson(lid),
      getQuestionById: (qid) => contentService.getQuestionById(qid),
      saveQuestion: (q) => contentService.saveQuestion(q),
      deleteQuestion: (qid) => contentService.deleteQuestion(qid),
      paths: {
        root: '/admin',
        subject: (sid) => `/admin/subjects/${sid}`,
        lessonEdit: (lid) => `/admin/lessons/${lid}`,
        lessonQuestions: (lid) => `/admin/lessons/${lid}/questions`,
      },
    };
  }

  const cid = String(classId);
  return {
    mode: 'class',
    classId: cid,
    getSubjects: () => classCurriculum.getSubjects(cid),
    getSubjectById: (id) => classCurriculum.getSubjectById(cid, id),
    saveSubject: (s) => classCurriculum.saveSubject(cid, s),
    deleteSubject: (id) => classCurriculum.deleteSubject(cid, id),
    getLessons: () => classCurriculum.getLessons(cid),
    getLessonsBySubject: (sid) => classCurriculum.getLessonsBySubject(cid, sid),
    getLessonById: (lid) => classCurriculum.getLessonById(cid, lid),
    saveLesson: (l) => classCurriculum.saveLesson(cid, l),
    deleteLesson: (lid) => classCurriculum.deleteLesson(cid, lid),
    getQuestions: () => classCurriculum.getQuestions(cid),
    getQuestionsByLesson: (lid) => classCurriculum.getQuestionsByLesson(cid, lid),
    getQuestionById: (qid) => classCurriculum.getQuestionById(cid, qid),
    saveQuestion: (q) => classCurriculum.saveQuestion(cid, q),
    deleteQuestion: (qid) => classCurriculum.deleteQuestion(cid, qid),
    paths: {
      root: `/teacher/class/${cid}/curriculum`,
      subject: (sid) => `/teacher/class/${cid}/subjects/${sid}`,
      lessonEdit: (lid) => `/teacher/class/${cid}/lessons/${lid}/edit`,
      lessonQuestions: (lid) => `/teacher/class/${cid}/lessons/${lid}/questions`,
    },
  };
}
