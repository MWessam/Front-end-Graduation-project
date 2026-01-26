/**
 * Central export for all mock data
 * 
 * Usage:
 * import { courseCatalog, programmingExam, currentStudent } from '@/data/mock';
 * // or import specific modules:
 * import { getLessonById } from '@/data/mock/lessons';
 */

// ============================================
// COURSES
// ============================================
export {
  courseCatalog,
  studentCourseProgress,
  dailyQuests,
  gamificationStats,
  getCourseById,
  getCoursesByCategory,
} from './courses';

// ============================================
// LECTURES
// ============================================
export {
  programmingLectures,
  lecturesByCourse,
  getLecturesForCourse,
  getLectureById,
} from './lectures';

// ============================================
// LESSONS
// ============================================
export {
  lessons,
  getLessonById,
  getAllLessons,
  parseTakeaways,
} from './lessons';

// ============================================
// QUIZZES
// ============================================
export {
  programmingQuizQuestions,
  programmingQuiz,
  functionEssayQuestions,
  functionEssayQuiz,
  quizzes,
  essayQuizzes,
  getQuizById,
  getEssayQuizById,
} from './quizzes';

// ============================================
// EXAMS
// ============================================
export {
  programmingExamQuestions,
  programmingExam,
  examInstructions,
  exams,
  getExamById,
  getDefaultExam,
} from './exams';

// ============================================
// ASSIGNMENTS
// ============================================
export {
  studentAssignments,
  completedAssignments,
  dashboardAssignments,
  getAssignmentsByStatus,
  getAssignmentsBySubject,
} from './assignments';

// ============================================
// RESULTS & ACHIEVEMENTS
// ============================================
export {
  sampleDetailedResults,
  sampleQuizResult,
  performanceStats,
  lessonRewards,
  currentLevelProgress,
  lessonCompleteData,
  calculatePercentage,
  isPassing,
} from './results';

// ============================================
// USERS & NAVIGATION
// ============================================
export {
  currentStudent,
  studentNavItems,
  teacherNavItems,
  sampleNotifications,
  getFullName,
  getInitials,
} from './users';

// ============================================
// TEACHER PORTAL
// ============================================
export * from './teacher';
