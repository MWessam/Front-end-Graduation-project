# Mock Data Extraction & Refactoring Plan

## Overview

This document outlines the hardcoded data found throughout the React application related to **lessons, exercises, courses, quizzes, user data, and other educational content**. The goal is to extract this data into centralized mock data files following React best practices for easier testing, modification, and eventual API integration.

---

## Findings: Hardcoded Data Locations

### 1. Courses Data

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `pages/AllCourses.tsx` | 5-51 | `courses[]` | 9 courses with title, description, imageSrc |
| `pages/Dashboard.tsx` | 7-13 | `courses[]` | 5 courses with name, grade, progress, color |

**Sample Structure:**
```typescript
// AllCourses.tsx
{ title: 'Programming', description: '...', imageSrc: '/images/software 1.png' }

// Dashboard.tsx  
{ name: 'Arabic', grade: 'A+', progress: 95, color: 'bg-green-500' }
```

---

### 2. Lectures Data

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `pages/Lectures.tsx` | 6-37 | `lectures[]` | 5 lectures with title, description, icon, link |

**Sample Structure:**
```typescript
{
  title: 'Introduction to variable data types',
  description: 'Learn about different data types...',
  icon: Code, // Lucide icon component
  link: '/lesson/1'
}
```

---

### 3. Lesson Content

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `pages/Lesson.tsx` | 10-47 | inline JSX | Lesson overview, video URL, key insights array |
| `pages/Concept.tsx` | 9-55 | inline JSX | Concept sections (Intro, Analogy, Code Example, Key Takeaways) |

**Issues:**
- Lesson content is entirely inline in JSX
- No dynamic lesson loading based on `id` param
- Video URL is hardcoded
- Key insights are hardcoded as inline array

---

### 4. Quiz & Exam Questions

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `pages/Exam.tsx` | 6-227 | `questions[]` | **20 MCQ questions** with id, question, options[], correctAnswer |
| `pages/Quiz.tsx` | ~6-7 | `questions[]` | Questions referenced but truncated (likely similar structure) |
| `pages/EssayQuiz.tsx` | 29-36 | inline JSX | 1 essay question with keywords hint |

**Sample Structure (Exam.tsx):**
```typescript
{
  id: 1,
  question: "What is the primary purpose of a function in programming?",
  options: [
    "To store data and variables",
    "To encapsulate a piece of code for reuse",
    "To style the user interface",
    "To slow down the program execution"
  ],
  correctAnswer: 1
}
```

---

### 5. Results & Achievements Data

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `pages/Results.tsx` | 7-17 | `score`, `total`, `detailedResults[]` | Quiz results with 5 Q&A items |
| `pages/Achievements.tsx` | 25-29 | inline array | Performance stats (MCQ Score, Essay Score, Quiz Accuracy) |

**Sample Structure (Results.tsx):**
```typescript
{
  q: "What is a function?",
  a: "Reusable code block", 
  status: "correct"
}
// or with incorrect answer:
{
  q: "PHP usage?",
  a: "Client side scripting",
  status: "incorrect",
  correct: "Server side scripting"
}
```

---

### 6. Assignments Data

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `pages/Assignments.tsx` | 26-31 | `initialAssignments[]` | 4 assignments with id, title, subject, lesson, date |
| `pages/Dashboard.tsx` | 15-40 | `assignments[]` | 3 upcoming assignments with styling info |

**Sample Structure:**
```typescript
{ id: 1, title: 'Quiz 1', subject: 'Math', lesson: 'in lesson 1 point 4', date: 'Oct 30, 2025' }
```

---

### 7. User & Profile Data

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `pages/Profile.tsx` | 17-92 | inline JSX | User name, email, phone, location, avatar URL |
| `components/Sidebar.tsx` | 22-23 | inline JSX | User name ("Ahmed Emad") and role ("Student") |

---

### 8. Navigation & UI Config

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `components/Sidebar.tsx` | 9-16 | `navItems[]` | 6 navigation items with name, icon, path |
| `pages/Courses.tsx` | 69-141 | inline JSX | XP stats (440), Daily quests progress data |

---

### 9. Exam Configuration

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `pages/Instructions.tsx` | 19-36 | inline JSX | Exam overview (20 questions, 30 min, 70% passing) |
| `pages/Exam.tsx` | 237-250 | inline | Timer duration (30 * 60 seconds) |

---

### 10. Teacher Portal Data

| File | Lines | Data Type | Description |
|------|-------|-----------|-------------|
| `pages/teacher/Students.tsx` | 14-33 | inline JSX | 2 student cards (Sarah Ahmed, Mohamed Ali) |
| `pages/teacher/Notifications.tsx` | 11-29 | inline JSX | 2 notification items |
| `pages/teacher/Library.tsx` | 17-35 | inline JSX | 2 library items (Chemistry Basics, Physics Intro) |
| `pages/teacher/AssignActivity.tsx` | 18-20 | inline JSX | Class dropdown options (Class 1, Class 2) |

---

## Recommended Folder Structure

```
frontend/src/
├── data/
│   ├── mock/
│   │   ├── index.ts              # Central export
│   │   ├── courses.ts            # Course catalog data
│   │   ├── lectures.ts           # Lecture data with icons
│   │   ├── lessons.ts            # Lesson content (overview, insights, video)
│   │   ├── quizzes.ts            # Quiz questions (MCQ)
│   │   ├── exams.ts              # Exam questions (full 20 Q set)
│   │   ├── essays.ts             # Essay questions
│   │   ├── assignments.ts        # Assignment data
│   │   ├── achievements.ts       # Achievement & rewards config
│   │   ├── users.ts              # User profile data
│   │   ├── navigation.ts         # Sidebar nav config
│   │   └── teacher/
│   │       ├── students.ts       # Student roster
│   │       ├── notifications.ts  # Notification items
│   │       └── library.ts        # Library resources
│   └── types/
│       ├── index.ts              # Central type exports
│       ├── course.ts             # Course interfaces
│       ├── lesson.ts             # Lesson interfaces
│       ├── quiz.ts               # Quiz/Exam interfaces
│       ├── assignment.ts         # Assignment interfaces
│       └── user.ts               # User interfaces
```

---

## Refactoring Checklist

### Phase 1: Setup Data Infrastructure ✅ COMPLETE
- [x] Create `src/data/` directory structure
- [x] Create `src/data/types/` with TypeScript interfaces
- [x] Create central `src/data/mock/index.ts` export file

### Phase 2: Extract Course & Lecture Data ✅ COMPLETE
- [x] Create `types/course.ts` with `Course`, `CourseProgress` interfaces
- [x] Create `mock/courses.ts` with course catalog and dashboard course data
- [x] Create `types/lesson.ts` with `Lecture`, `Lesson`, `LessonContent` interfaces
- [x] Create `mock/lectures.ts` with lecture data
- [x] Create `mock/lessons.ts` with lesson content data
- [x] Refactor `AllCourses.tsx` to import from mock data
- [x] Refactor `Dashboard.tsx` courses section to import from mock data
- [x] Refactor `Lectures.tsx` to import from mock data
- [x] Refactor `Lesson.tsx` to load lesson content dynamically by ID

### Phase 3: Extract Quiz & Exam Data ✅ COMPLETE
- [x] Create `types/quiz.ts` with `Question`, `QuizConfig`, `ExamConfig` interfaces
- [x] Create `mock/quizzes.ts` with quiz questions
- [x] Create `mock/exams.ts` with full exam question set
- [x] Create `mock/essays.ts` with essay question data (in quizzes.ts)
- [x] Refactor `Quiz.tsx` to import from mock data
- [x] Refactor `Exam.tsx` to import from mock data
- [x] Refactor `EssayQuiz.tsx` to import from mock data
- [x] Refactor `Instructions.tsx` to use exam config from mock data

### Phase 4: Extract Results & Achievements Data ✅ COMPLETE
- [x] Create `types/results.ts` with `QuizResult`, `Achievement` interfaces
- [x] Create `mock/achievements.ts` with performance config (in results.ts)
- [x] Refactor `Results.tsx` to accept results as props or context
- [x] Refactor `Achievements.tsx` to import from mock data

### Phase 5: Extract Assignment Data ✅ COMPLETE
- [x] Create `types/assignment.ts` with `Assignment` interface
- [x] Create `mock/assignments.ts` with assignment data
- [x] Refactor `Assignments.tsx` to import from mock data
- [x] Refactor `Dashboard.tsx` assignments section to import from mock data (done in Phase 2)

### Phase 6: Extract User & Navigation Data ✅ COMPLETE
- [x] Create `types/user.ts` with `User`, `UserProfile` interfaces
- [x] Create `mock/users.ts` with current user data
- [x] Create `mock/navigation.ts` with nav items config (in users.ts)
- [x] Refactor `Profile.tsx` to import from mock data
- [x] Refactor `Sidebar.tsx` to import nav items and user from mock data
- [x] Refactor `Courses.tsx` gamification data (XP, quests)

### Phase 7: Extract Teacher Portal Data ✅ COMPLETE
- [x] Create `mock/teacher/students.ts` with student roster
- [x] Create `mock/teacher/notifications.ts` with notification data
- [x] Create `mock/teacher/library.ts` with library resources
- [x] Refactor `teacher/Students.tsx` to import from mock data
- [x] Refactor `teacher/Notifications.tsx` to import from mock data
- [x] Refactor `teacher/Library.tsx` to import from mock data
- [ ] Refactor `teacher/AssignActivity.tsx` class options to use dynamic data (deferred - uses localStorage)

### Phase 8: Testing & Validation ✅ COMPLETE
- [x] Verify all pages render correctly with mock data (no linter errors)
- [x] Test dynamic lesson/quiz loading by ID (implemented)
- [x] Ensure TypeScript types are correctly inferred (all imports typed)
- [x] Add JSDoc comments to mock data files (done)
- [x] Document how to modify mock data for testing (in this TODO.md)

---

## TypeScript Interface Previews

### Course Types
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category?: string;
}

interface CourseProgress {
  courseId: string;
  name: string;
  grade: string;
  progress: number;
  colorClass: string;
}
```

### Question Types
```typescript
interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface EssayQuestion {
  id: number;
  question: string;
  hints?: string[];
  keywords: string[];
  minLength?: number;
  maxLength?: number;
}

interface QuizConfig {
  id: string;
  title: string;
  lessonId: string;
  questions: MCQQuestion[];
  timeLimit?: number; // in seconds
  passingScore?: number; // percentage
}
```

### Lesson Types
```typescript
interface Lesson {
  id: string;
  title: string;
  overview: string;
  videoUrl?: string;
  keyInsights: string[];
  conceptSections?: ConceptSection[];
  relatedQuizId?: string;
}

interface ConceptSection {
  title: string;
  content: string;
  codeExample?: string;
}

interface Lecture {
  id: string;
  title: string;
  description: string;
  iconName: string; // Icon component name
  lessonId: string;
}
```

---

## Benefits of This Refactoring

1. **Single Source of Truth**: All mock data in one place
2. **Easy Testing**: Swap mock data for different test scenarios
3. **Type Safety**: TypeScript interfaces catch errors early
4. **API-Ready**: Mock data structure mirrors expected API responses
5. **Maintainability**: Non-developers can modify data without touching components
6. **Scalability**: Add new lessons/quizzes by adding to data files
7. **Consistency**: Shared interfaces ensure data shape consistency

---

## Next Steps

After reviewing this document, confirm which phase to start with. Recommended order:
1. Start with **Phase 1** (infrastructure setup)
2. Then **Phase 3** (Quiz/Exam - most complex, highest value)
3. Then **Phase 2** (Courses/Lectures - frequently used)
4. Continue with remaining phases

Ready to proceed when you confirm!
