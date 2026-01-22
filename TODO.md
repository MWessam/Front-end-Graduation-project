# Project TODO List

## ✅ Student Dashboard Implementation (`/student`) - COMPLETED

Based on REQUIREMENTS_STUDENT.md Section 2 - Student Dashboard

### 🎯 Priority: Student Dashboard Components

#### 1. Header Section ✅
- [x] Display student name and grade
- [x] Quick stats display (XP, level, streak)
- [x] Navigation menu (shared Sidebar component)
- [x] Responsive header layout

#### 2. Review Queue Widget (Top Priority - Always Visible) ✅
- [x] Prominent placement at top of dashboard (below header)
- [x] Display: "You have X exercises to review"
- [x] Large, prominent "Review Now" button
- [x] Visual indicator (badge/notification) when reviews are pending
- [x] Clicking "Review Now" navigates to `/solve-exercises` with global reviews filter
- [ ] Real-time count updates (ready for API integration)
- [x] Show total amount of reviews remaining

#### 3. Notification Center (Header/Widget) ✅
- [x] Notification bell icon in header
- [x] Badge showing unread notification count
- [x] Clicking opens notification dropdown
- [x] Quick preview of recent notifications
- [x] Support notification types:
  - [x] Review queue reminders
  - [x] New class materials
  - [x] Upcoming exams/deadlines
  - [x] Achievement unlocks
  - [x] Lesson completion reminders

#### 4. Active Subjects Section ✅
- [x] Grid/list of active subjects (only in-progress subjects shown)
- [x] Each subject card displays:
  - [x] Subject name/icon
  - [x] Progress percentage/bar (0-100%)
  - [x] Last activity date
  - [x] Current lesson/topic name
  - [x] Quick action buttons ("Continue Learning")
- [x] Empty state when no active subjects
- [x] Clicking subject card navigates to subject roadmap page (`/subjects/:id`)
- [x] Card-based layout (similar to Duolingo's course cards)
- [x] Progress visualization (linear progress bar)
- [x] Hover effects and animations
- [x] Responsive grid (auto-fill columns, min 280px per card)

#### 5. Statistics Cards ❌ Cancelled
- Removed per user request

#### 6. Recent Activity Feed ❌ Cancelled
- Removed per user request

### 🎨 Design & UX Requirements ✅

- [x] Design inspired by Brilliant.org + Duolingo
- [x] Dark mode support
- [x] Mobile-first responsive design
- [x] Smooth animations and transitions
- [ ] Accessibility standards (WCAG 2.1 AA minimum) - Ready for testing
- [ ] Performance: Page load < 2 seconds - Ready for testing

### 🔌 API Integration ⏳

- [ ] `GET /api/students/:id/dashboard` - Fetch dashboard data (ready to integrate)
- [ ] `GET /api/students/:id/review-queue/count` - Get review count (ready to integrate)
- [ ] `GET /api/students/:id/notifications` - Fetch notifications (ready to integrate)
- [ ] `GET /api/students/:id/subjects` - Get enrolled subjects with progress (ready to integrate)
- [ ] Real-time updates for review queue count (ready to integrate)

### 📱 Responsive Design ✅

- [x] Mobile: Stack vertically, single column layout
- [x] Tablet: Auto-fill grid for subject cards
- [x] Desktop: Auto-fill grid for subject cards
- [x] Review queue widget always visible and prominent on all devices

---

## 🎯 Subjects Tab Implementation (`/subjects`)

Based on REQUIREMENTS_STUDENT.md Section 3 - Subjects Tab

### Phase 1: Page Structure & Header ✅
- [x] Page title: "Subjects"
- [x] Current grade indicator
- [x] Sidebar integration (shared component)
- [x] Responsive header layout

### Phase 2: Search Functionality ✅
- [x] Prominent search bar at top of page
- [x] Real-time search as user types
- [x] Search by subject name (Arabic/English)
- [ ] Search suggestions/autocomplete (optional for now)
- [x] Clear search button
- [x] Bilingual placeholder text
- [ ] Highlight matching text in results (will be added when subject cards are implemented)
- [x] "No results found" message
- [ ] Search history (optional - can be added later)

### Phase 3: Filter Functionality ✅
- [x] Progress filter dropdown:
  - [x] All
  - [x] Not Started
  - [x] In Progress
  - [x] Completed
- [x] Category filter dropdown (dynamically generated from subjects)
- [x] Difficulty filter dropdown (Beginner, Intermediate, Advanced)
- [x] Sort options dropdown:
  - [x] Alphabetical
  - [x] Progress
  - [x] Recently Accessed
  - [x] Popular
- [x] Active filters shown as tags/chips
- [x] Clear all filters option
- [x] Filter count indicator

### Phase 4: Subject Grid & Cards ✅
- [x] Grid layout for subject cards
- [x] Subject card components with:
  - [x] Subject name
  - [x] Subject icon/image
  - [x] Subject description (for not started subjects)
  - [x] Progress indicator (if started)
  - [x] Action buttons ("Start Learning" or "Continue Learning" or "Review")
- [x] Progress states:
  - [x] Not Started: No progress bar, "Start Learning" button, description shown
  - [x] In Progress: Progress bar with percentage, "Continue Learning" button, current lesson indicator
  - [x] Completed: 100% progress bar, "Review" option
- [x] Visual design similar to Brilliant's course cards
- [x] Hover effects showing more information
- [x] Clicking card opens subject roadmap (`/subjects/:id`)
- [x] Progress visualization (linear progress bar)
- [x] Updates dynamically based on search/filter

### Phase 5: Subject Enrollment ✅
- [x] Subject enrollment functionality
- [x] "Start Learning" button enrolls student
- [x] Enrollment confirmation/feedback
- [x] Update subject list after enrollment
- [x] Navigate to roadmap after enrollment

### Phase 6: Responsive Design ✅
- [x] Mobile: Single column layout
- [x] Tablet: Auto-fill grid
- [x] Desktop: Auto-fill grid (min 280px per card)
- [x] Search bar responsive on all devices
- [x] Filter UI responsive (dropdowns, stacks on mobile)

### 🎨 Design & UX Requirements ✅
- [x] Design inspired by Brilliant.org course selection
- [x] Bilingual support (Arabic/English search)
- [x] Dark mode support
- [x] Mobile-first responsive design
- [x] Smooth animations and transitions
- [x] Accessibility standards (semantic HTML, ARIA labels)
- [x] Performance: Optimized filtering and rendering

### 🔌 API Integration ⏳
- [ ] `GET /api/subjects?grade=:grade&search=:query&filter=:filter` - Fetch subjects with filters (ready to integrate)
- [ ] `GET /api/students/:id/subjects` - Get enrolled subjects with progress (ready to integrate)
- [ ] `POST /api/students/:id/subjects/:subjectId/enroll` - Enroll in subject (ready to integrate)

**Note**: All components use mock data and are ready for API integration when backend is available.

## 🎯 Subject Roadmap Implementation (`/subjects/:id`)

Based on REQUIREMENTS_STUDENT.md Section 4 - Subject Roadmap Page

### Phase 1: Page Structure & Header
- [ ] Subject header with name and icon
- [ ] Overall progress indicator
- [ ] Subject description
- [ ] Back button to subjects page
- [ ] Visual mastery progression indicator
- [ ] Sidebar integration (shared component)

### Phase 2: Learning Roadmap/Path
- [ ] Visual representation of lessons (linear path)
- [ ] Lesson nodes/cards display:
  - [ ] Lesson number/title
  - [ ] Completion status (locked/unlocked/completed)
  - [ ] Progress indicator
  - [ ] Lesson icon/thumbnail
  - [ ] Exercise groups count
  - [ ] Mastery level indicator
- [ ] Connected path lines showing progression
- [ ] Visual mastery progression bars/rings

### Phase 3: Lesson Node States
- [ ] Locked Lessons:
  - [ ] Grayed out appearance
  - [ ] Lock icon
  - [ ] Prerequisite indicator
  - [ ] "Complete previous lesson" message
  - [ ] "Take Placement Quiz" button
- [ ] Unlocked Lessons:
  - [ ] Active appearance
  - [ ] "Start" button
  - [ ] Lesson preview/description
  - [ ] Exercise groups display (Duolingo circles)
- [ ] In Progress Lessons:
  - [ ] Progress indicator
  - [ ] "Continue" button
  - [ ] Partial completion visualization
  - [ ] Completed exercise groups shown
- [ ] Completed Lessons:
  - [ ] Checkmark/complete indicator
  - [ ] "Review" option
  - [ ] Mastery level indicator
  - [ ] Mastery percentage/ring

### Phase 4: Exercise Groups (Duolingo-style)
- [ ] Exercise groups displayed as circles/bubbles
- [ ] Each group shows:
  - [ ] Completion status
  - [ ] Number of exercises
  - [ ] Progress indicator
- [ ] Clicking exercise group opens exercises
- [ ] Locked exercise groups show lock icon
- [ ] Unlocking logic (complete previous or placement quiz)

### Phase 5: Milestone Quiz System
- [ ] Milestone quiz indicator at end of each lesson
- [ ] Special node/circle for milestone quiz
- [ ] Quiz completion status visible
- [ ] "Take Quiz" button when ready
- [ ] Passing quiz unlocks next lesson
- [ ] Failing requires review and retake

### Phase 6: Placement Quiz System
- [ ] Placement quiz option for locked lessons
- [ ] Modal/popup: "Skip to this lesson? Take placement quiz"
- [ ] Placement quiz tests previous milestone knowledge
- [ ] Passing unlocks the lesson
- [ ] Quiz results determine unlock status

### Phase 7: Visual Mastery Progression
- [ ] Mastery rings/bars for each lesson
- [ ] Overall subject mastery indicator
- [ ] Color-coded mastery levels:
  - [ ] Beginner (0-25%)
  - [ ] Intermediate (26-50%)
  - [ ] Advanced (51-75%)
  - [ ] Master (76-100%)
- [ ] Visual feedback on progress updates

### 🎨 Design & UX Requirements
- [ ] Design inspired by Brilliant.org + Duolingo
- [ ] Linear path layout (Duolingo-style)
- [ ] Bilingual support (Arabic/English)
- [ ] Dark mode support
- [ ] Mobile-first responsive design
- [ ] Smooth animations and transitions
- [ ] Accessibility standards (WCAG 2.1 AA minimum)

### 🔌 API Integration
- [ ] `GET /api/subjects/:id/roadmap` - Fetch roadmap data
- [ ] `GET /api/students/:id/progress/:subjectId` - Get student progress
- [ ] `POST /api/students/:id/placement-quiz/:lessonId/submit` - Submit placement quiz
- [ ] `POST /api/students/:id/milestone-quiz/:lessonId/submit` - Submit milestone quiz
- [ ] `POST /api/students/:id/lessons/:lessonId/complete` - Mark lesson complete

---

## 🎯 Lesson Pages Implementation (`/lessons/:id`)

Based on REQUIREMENTS_STUDENT.md Section 10 - Lesson Explanation Pages

### Phase 1: Page Structure & Header
- [ ] Lesson header with title
- [ ] Subject name and icon
- [ ] Progress indicator
- [ ] Back button to roadmap
- [ ] AI Chatbot button (floating or in header)
- [ ] Sidebar integration (shared component)

### Phase 2: Content Area - Multiple Formats
- [ ] Format selector/toggle (Text | Audio | Video | Mixed)
- [ ] Text format:
  - [ ] Rich text content
  - [ ] Images and diagrams
  - [ ] Code blocks with syntax highlighting
  - [ ] Interactive elements embedded
- [ ] Audio format:
  - [ ] Audio player with controls
  - [ ] Transcript available
  - [ ] Playback speed control
  - [ ] Chapter markers
- [ ] Video format:
  - [ ] Video player (embedded)
  - [ ] Playback controls
  - [ ] Subtitles/captions
  - [ ] Chapter navigation
  - [ ] Speed control
- [ ] Mixed format:
  - [ ] Combination of text, video, audio
  - [ ] Format switching
  - [ ] Preference memory

### Phase 3: Interactive Elements
- [ ] Code editors (for programming lessons)
- [ ] Visual diagrams/builders
- [ ] Simulations (physics, math)
- [ ] Drag-and-drop exercises
- [ ] Interactive visualizations using templates
- [ ] Embedded within lesson content
- [ ] Immediate feedback
- [ ] Progress tracking

### Phase 4: AI Chatbot Integration
- [ ] Floating chat button (bottom right)
- [ ] Context-aware chatbot (understands current lesson)
- [ ] Features:
  - [ ] Answer questions about lesson
  - [ ] Explain concepts
  - [ ] Help with mistakes
  - [ ] Provide examples
  - [ ] Suggest practice problems
- [ ] Chat window overlay
- [ ] Persistent across page navigation

### Phase 5: Lesson Completion
- [ ] "Mark as Complete" button
- [ ] Completion tracking:
  - [ ] Time spent on lesson
  - [ ] Sections completed
  - [ ] Interactive elements completed
- [ ] Completion animation (like Duolingo)
- [ ] Unlock next lesson notification
- [ ] Progress updates

### Phase 6: Navigation
- [ ] Previous lesson button
- [ ] Next lesson button (unlocked after completion)
- [ ] Return to roadmap button
- [ ] Smooth navigation transitions

### 🎨 Design & UX Requirements
- [ ] Design inspired by Brilliant.org + Duolingo
- [ ] Bilingual support (Arabic/English)
- [ ] Dark mode support
- [ ] Mobile-first responsive design
- [ ] Smooth animations and transitions
- [ ] Accessibility standards (WCAG 2.1 AA minimum)

### 🔌 API Integration
- [ ] `GET /api/lessons/:id` - Fetch lesson content
- [ ] `GET /api/lessons/:id/exercise-groups` - Get exercise groups
- [ ] `POST /api/students/:id/lessons/:lessonId/complete` - Mark lesson complete

---

## React Migration Progress (Legacy)

### ✅ Completed Tasks

- [x] **Student Dashboard** - Convert HTML/CSS/JS to React component (Basic version)
  - Converted HTML structure to JSX
  - Migrated CSS styles
  - Implemented React Router navigation
  - Added data-driven components
  - Set up Tailwind CSS configuration
  - ⚠️ **Note**: Needs to be updated to match new requirements

- [x] **AllCourses Page** - Convert HTML/CSS/JS to React component
  - Converted HTML structure to JSX
  - Migrated CSS styles with animations
  - Converted JavaScript functionality to React hooks
  - Implemented course button click handlers
  - Added navigation to lectures page
  - Made course data dynamic

- [x] **Assignment Page** - Convert HTML/CSS/JS to React component (REMOVED - replaced with Classes)

### ⏸️ Removed Pages

- [x] **Assignment Page** - Removed (replaced with Classes page)
- [x] **Quiz Page** - Removed (replaced with Classes page)
- [ ] **Classes Page** - Created (empty, to be implemented later)

### ⏳ Pending Tasks

- [ ] **Classes Page** - Empty placeholder (to be implemented later)

### ✅ All Other Pages Completed

- [x] **Concept Page** - Convert HTML/CSS/JS to React component
- [x] **ConceptLesson Page** - Convert HTML/CSS/JS to React component
- [x] **Courses Page** - Convert HTML/CSS/JS to React component
- [x] **Edit Page** - Convert HTML/CSS/JS to React component
- [x] **Landing Page** - Convert HTML/CSS/JS to React component
- [x] **Login Page** - Convert HTML/CSS/JS to React component
- [x] **OTP Verification Page** - Convert HTML/CSS/JS to React component
- [x] **Essay Page** - Convert HTML/CSS/JS to React component
- [x] **EssayResult Page** - Convert HTML/CSS/JS to React component
- [x] **Instructions Page** - Convert HTML/CSS/JS to React component
- [x] **Lectures Page** - Convert HTML/CSS/JS to React component
- [x] **LessonLec Page** - Convert HTML/CSS/JS to React component
- [x] **McqEssay Page** - Convert HTML/CSS/JS to React component
- [x] **Quiz Page** - Convert HTML/CSS/JS to React component
- [x] **Result Page** - Convert HTML/CSS/JS to React component
- [x] **ResultMcqEssay Page** - Convert HTML/CSS/JS to React component
- [x] **Achievements Page** - Convert HTML/CSS/JS to React component
- [x] **TeacherQuiz Page** - Convert HTML/CSS/JS to React component

## Summary

### Student Dashboard (`/student`) ✅
- **Status**: ✅ Completed
- **Components**: Header, Review Queue, Notifications, Active Subjects
- **Progress**: 100% (Core features complete)

### Subjects Tab (`/subjects`) ✅
- **Status**: ✅ Completed
- **Components**: Search, Filters, Subject Grid, Enrollment
- **Progress**: 100% (All phases complete)

### Subject Roadmap (`/subjects/:id`) ⏳
- **Status**: ⏳ In Progress - Planning
- **Components**: Roadmap Path, Lesson Nodes, Exercise Groups, Quizzes
- **Progress**: 0% (Planning phase)

### Lesson Pages (`/lessons/:id`) ⏳
- **Status**: ⏳ In Progress - Planning
- **Components**: Content Formats, Interactive Elements, AI Chatbot, Completion
- **Progress**: 0% (Planning phase)

### Legacy Migration
- **Total Pages**: 20 (Legacy migration)
- **Completed**: 19 (Legacy migration)
- **Pending**: 1 (Classes - intentionally left as placeholder)

## Notes

- Student Dashboard completed and matches REQUIREMENTS_STUDENT.md specifications
- Subjects Tab implementation starting
- Design inspiration: Brilliant.org + Duolingo
- All new features should maintain bilingual support (Arabic/English)
- Dark mode support required
- Mobile-first responsive design approach
