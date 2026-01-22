# Eureka - Student Requirements Documentation

## Overview
This document outlines the requirements for the student-facing features of the Eureka platform. The design should be inspired by Brilliant.org and Duolingo, focusing on intuitive learning paths, clear progress visualization, and engaging user experience.

---

## 1. Student Profile & Grade Management

### 1.1 Stored Grade
**Requirement:**
- The system must store the student's current grade level
- Grade should be selectable during registration or in profile settings
- Grade determines which subjects and curriculum are available
- Grade can be updated in profile settings

**Implementation:**
- Store grade in user profile (e.g., "Grade 9", "Grade 10", "University Year 1", etc.)
- Grade selection dropdown in registration/profile
- Grade affects subject availability and difficulty levels

---

## 2. Student Dashboard (`/student`)

### 2.1 Layout Structure
**Design Inspiration:** Brilliant.org + Duolingo

**Main Components:**
1. **Header Section**
   - Student name and grade
   - Quick stats (XP, level, streak)
   - Navigation menu

2. **Review Queue Section** (Top Priority - Always Visible)
   - Prominent placement at the top of dashboard
   - Display: "You have X exercises to review"
   - Large, prominent "Review" button
   - Visual indicator (badge/notification) when reviews are pending
   - Clicking "Review" navigates to Review Queue page

3. **Notification Center** (Header/Widget)
   - Notification bell icon in header
   - Badge showing unread notification count
   - Clicking opens notification dropdown or navigates to notifications page
   - Quick preview of recent notifications
   - Types of notifications:
     - Review queue reminders
     - New class materials
     - Upcoming exams/deadlines
     - Achievement unlocks
     - Lesson completion reminders

4. **Active Subjects Section**
   - Grid/list of all active subjects
   - Each subject card shows:
     - Subject name/icon
     - Progress percentage/bar
     - Last activity date
     - Current lesson/topic
     - Quick action buttons

5. **Statistics Cards**
   - Overall grade/performance
   - Courses completed
   - Upcoming deadlines
   - Recent achievements

6. **Recent Activity Feed**
   - Latest lessons completed
   - Recent achievements unlocked
   - Upcoming assignments/exams

### 2.2 Review Queue Widget
**Requirements:**
- **Position:** Top of dashboard, below header
- **Display Format:**
  ```
  ┌─────────────────────────────────────────┐
  │ ⚠️ Review Queue                          │
  │ You have 15 exercises to review         │
  │ [Review Now] button (prominent)         │
  └─────────────────────────────────────────┘
  ```
- **Functionality:**
  - Count updates in real-time
  - Show the total amount of reviews remaining
  - Clicking "Review Now" navigates to `/solve-exercises` with the option to only focus on global reviews.
  - Visual urgency indicator (color changes based on overdue reviews)

### 2.3 Active Subjects Display
**Requirements:**
- Show all subjects the student is enrolled in
- Each subject card displays:
  - Subject name and icon
  - Progress bar (0-100%)
  - Current lesson/topic name
  - Last activity timestamp
  - "Continue Learning" button
- Subjects with no progress should show:
  - "Start Learning" button
  - Empty progress state (like Brilliant)
  - Subject description/preview
- Clicking a subject navigates to subject roadmap page

**Visual Design:**
- Card-based layout (similar to Duolingo's course cards)
- Progress visualization (circular or linear progress bar)
- Hover effects and animations
- Responsive grid (2-3 columns on desktop, 1 on mobile)

---

## 3. Subjects Tab (`/subjects`) - Previously "Courses"

### 3.1 Page Purpose
- Display all available subjects for the student's current grade
- Show progress for subjects the student has started
- Allow subject selection and enrollment
- Search and filter subjects

### 3.2 Layout Structure
**Design Inspiration:** Brilliant.org course selection

**Main Components:**
1. **Header**
   - Page title: "Subjects"
   - Current grade indicator
   - **Search Bar** (prominent placement)
     - Real-time search as user types
     - Search by subject name (Arabic/English)
     - Search suggestions/autocomplete
   - **Filter Options**
     - Filter by category/type
     - Filter by progress status (All, Not Started, In Progress, Completed)
     - Filter by difficulty
     - Sort options (Alphabetical, Progress, Recently Accessed)

2. **Subject Grid**
   - Grid of subject cards
   - Each card shows:
     - Subject name
     - Subject icon/image
     - Progress indicator (if started)
     - "Start" or "Continue" button
     - Subject description (on hover/click)
   - Updates dynamically based on search/filter

3. **Progress States**
   - **Not Started:** 
     - No progress bar
     - "Start Learning" button
     - Empty state (like Brilliant)
   - **In Progress:**
     - Progress bar showing completion percentage
     - "Continue Learning" button
     - Current lesson indicator
   - **Completed:**
     - 100% progress bar
     - "Review" option

### 3.3 Search Functionality
**Requirements:**
- **Search Bar:**
  - Prominent placement at top of page
  - Real-time search results
  - Search by subject name (supports both Arabic and English)
  - Search history (optional)
  - Clear search button
  - Placeholder: "Search subjects..." / "ابحث عن المواد..."

- **Search Results:**
  - Highlight matching text
  - Show subject cards matching search
  - "No results found" message
  - Search suggestions as user types

### 3.4 Filter Functionality
**Requirements:**
- **Filter Options:**
  - Progress filter: All | Not Started | In Progress | Completed
  - Category filter: Math | Science | Languages | etc.
  - Difficulty filter: Beginner | Intermediate | Advanced
  - Sort by: Alphabetical | Progress | Recently Accessed | Popular

- **Filter UI:**
  - Dropdown menus or toggle buttons
  - Active filters shown as tags/chips
  - Clear all filters option
  - Filter count indicator

### 3.5 Subject Cards
**Requirements:**
- Visual design similar to Brilliant's course cards
- Hover effects showing more information
- Clicking card opens subject roadmap
- Progress visualization:
  - Circular progress indicator (like Duolingo)
  - Or linear progress bar
  - Percentage display
  - Visual mastery progression (like Duolingo/Brilliant)
- Subject categories/grouping (optional)

---

## 4. Subject Roadmap Page (`/subjects/:id`)

### 4.1 Page Purpose
- Display learning path/roadmap for a specific subject
- Show lesson progression (like Brilliant and Duolingo)
- Each lesson is a milestone (e.g., "Lesson 1: Complex Numbers", "Lesson 2: Quadratic Equations")
- Show exercise groups within each lesson (like Duolingo)
- Allow navigation between lessons
- Track completion status
- Visual mastery progression

### 4.2 Subject Structure
**Hierarchy:**
```
Subject
  └── Lesson 1 (Milestone: Complex Numbers)
      └── Exercise Group 1
      └── Exercise Group 2
      └── Exercise Group 3
      └── Milestone Quiz
  └── Lesson 2 (Milestone: Quadratic Equations)
      └── Exercise Group 1
      └── Exercise Group 2
      └── Milestone Quiz
  └── Lesson 3...
```

### 4.3 Layout Structure
**Design Inspiration:** Brilliant.org learning paths + Duolingo skill tree

**Main Components:**
1. **Subject Header**
   - Subject name and icon
   - Overall progress indicator
   - Subject description
   - Back button to subjects
   - Visual mastery progression indicator

2. **Learning Roadmap/Path**
   - Visual representation of lessons (milestones)
   - Linear path (like Duolingo) - recommended
   - Each lesson node shows:
     - Lesson number/title (e.g., "Lesson 1: Complex Numbers")
     - Completion status (locked/unlocked/completed)
     - Progress indicator
     - Lesson icon/thumbnail
     - Exercise groups count
     - Mastery level (visual indicator like Duolingo)
   - Connected path lines showing progression
   - Visual mastery progression bars/rings

3. **Lesson Cards/Nodes**
   - **Locked Lessons:**
     - Grayed out appearance
     - Lock icon
     - Prerequisite indicator
     - "Complete previous lesson" message
     - **Placement Quiz Option:**
       - If lesson is locked, show "Take Placement Quiz" button
       - Placement quiz tests knowledge of previous milestone
       - Passing placement quiz unlocks the lesson
       - Similar to Duolingo's "Test Out" feature
   - **Unlocked Lessons:**
     - Active appearance
     - "Start" button
     - Lesson preview/description
     - Shows exercise groups (like Duolingo circles)
   - **In Progress:**
     - Progress indicator
     - "Continue" button
     - Partial completion visualization
     - Shows completed exercise groups
   - **Completed:**
     - Checkmark/complete indicator
     - "Review" option
     - Mastery level indicator (like Duolingo)
     - Mastery percentage/ring

4. **Exercise Groups (within each lesson)**
   - Displayed as circles/bubbles (like Duolingo)
   - Each exercise group shows:
     - Completion status
     - Number of exercises
     - Progress indicator
   - Clicking exercise group opens exercises
   - Locked exercise groups show lock icon
   - Unlocking: Complete previous exercise group or pass placement quiz

5. **Milestone Quiz Indicator**
   - Each lesson has a milestone quiz
   - Shown as special node/circle at end of lesson
   - Must pass milestone quiz to unlock next lesson
   - Quiz completion status visible
   - "Take Quiz" button when ready

6. **Visual Mastery Progression**
   - Mastery rings/bars for each lesson (like Duolingo)
   - Overall subject mastery indicator
   - Color-coded mastery levels:
     - Beginner (0-25%)
     - Intermediate (26-50%)
     - Advanced (51-75%)
     - Master (76-100%)
   - Visual feedback on progress

### 4.3 Roadmap Design Options

#### Option A: Linear Path (Duolingo Style)
```
[Lesson 1 ✓] 
[Lesson 2 ✓]
 [Lesson 3 🔄]
 [Lesson 4 🔒] 
 [Lesson 5 🔒]
```
- Simple, linear progression
- Clear next step
- Easy to follow

### 4.4 Lesson Unlocking System
**Requirements:**
- **Prerequisites:**
  - Lessons unlock sequentially (complete previous lesson)
  - Must pass milestone quiz to unlock next lesson
  - Visual indication of prerequisites

- **Placement Quiz (Skip Option):**
  - If lesson is locked, student can take placement quiz
  - Placement quiz tests knowledge of previous milestone
  - Passing placement quiz unlocks the lesson (like Duolingo)
  - Placement quiz button visible on locked lessons
  - Modal/popup: "Skip to this lesson? Take placement quiz"
  - Quiz results determine if lesson unlocks

- **Milestone Questions:**
  - Each lesson has milestone questions/quiz
  - Must pass milestone quiz to progress
  - Quiz appears at end of lesson
  - Passing unlocks next lesson
  - Failing requires review and retake

### 4.5 Lesson Node States
**Requirements:**
- **Locked (🔒):**
  - Grayed out
  - Lock icon
  - Cannot be clicked directly
  - Shows prerequisite info on hover
  - **"Take Placement Quiz" button** (to skip/unlock)
  - Tooltip: "Complete Lesson X or take placement quiz"

- **Unlocked (🟢):**
  - Active, clickable
  - "Start" button
  - Lesson preview available
  - Hover shows description
  - Shows exercise groups (Duolingo-style circles)

- **In Progress (🔄):**
  - Active appearance
  - Progress ring/bar
  - "Continue" button
  - Shows completion percentage
  - Shows completed exercise groups
  - Mastery progression visible

- **Completed (✓):**
  - Checkmark indicator
  - Green/completed color
  - "Review" option
  - Mastery badge/level displayed
  - Mastery ring at 100% (like Duolingo)

### 4.6 Interaction Requirements
- **Clicking a lesson node:**
  - If unlocked/in progress: Navigate to lesson page
  - If locked: Show modal with options:
    - "Complete Previous Lesson"
    - "Take Placement Quiz" (to skip)
  - If completed: Option to review or retake
- **Clicking exercise group:**
  - If unlocked: Navigate to exercises
  - If locked: Show prerequisite message
  - If completed: Show review option
- **Clicking milestone quiz:**
  - Opens milestone quiz modal/page
  - Must pass to unlock next lesson
- Hover effects on lesson nodes and exercise groups
- Smooth animations for state changes
- Visual mastery progression updates in real-time
- Responsive design (mobile-friendly roadmap)
- Lesson completion automatically unlocks next lesson

---

## 5. Data Models

### 5.1 Student Profile
```javascript
{
  id: string,
  name: string,
  email: string,
  grade: string, // "Grade 9", "Grade 10", etc.
  xp: number,
  level: number,
  streak: number,
  enrolledSubjects: string[], // Subject IDs
  preferences: {
    language: "ar" | "en",
    theme: "light" | "dark"
  }
}
```

### 5.2 Subject
```javascript
{
  id: string,
  name: string,
  nameAr: string, // Arabic name
  icon: string,
  description: string,
  descriptionAr: string,
  gradeLevels: string[], // ["Grade 9", "Grade 10"]
  lessons: Lesson[],
  prerequisites: string[] // Other subject IDs
}
```

### 5.3 Lesson (Milestone)
```javascript
{
  id: string,
  subjectId: string,
  order: number,
  title: string, // e.g., "Complex Numbers"
  titleAr: string,
  description: string,
  prerequisites: string[], // Lesson IDs (previous lessons)
  estimatedTime: number, // minutes
  content: {
    type: "text" | "video" | "audio" | "mixed",
    data: any,
    interactiveElements: InteractiveElement[] // Templates for visualizations
  },
  exerciseGroups: ExerciseGroup[], // Like Duolingo circles
  milestoneQuiz: Quiz, // Required quiz to unlock next lesson
  placementQuiz: Quiz, // Optional quiz to skip/unlock this lesson
  masteryLevel: number, // 0-100, calculated from performance
  isMilestone: true // All lessons are milestones
}

ExerciseGroup {
  id: string,
  lessonId: string,
  order: number,
  title: string,
  exercises: Exercise[],
  prerequisites: string[], // Previous exercise group IDs
  completionStatus: "locked" | "unlocked" | "in_progress" | "completed"
}

InteractiveElement {
  id: string,
  type: "code_editor" | "diagram" | "simulation" | "visualization" | "drag_drop",
  template: string, // Template ID
  data: any,
  position: number // Position in lesson content
}
```

### 5.4 Student Progress
```javascript
{
  studentId: string,
  subjectId: string,
  lessonId: string,
  status: "locked" | "unlocked" | "in_progress" | "completed",
  progress: number, // 0-100
  lastAccessed: Date,
  completedAt: Date,
  timeSpent: number, // minutes
  attempts: number,
  mastery: number, // 0-100 (visual mastery progression)
  exerciseGroupsCompleted: number,
  totalExerciseGroups: number,
  milestoneQuizPassed: boolean,
  milestoneQuizScore: number,
  placementQuizTaken: boolean,
  placementQuizPassed: boolean
}
```

### 5.5 Review Queue
```javascript
{
  studentId: string,
  globalQueue: ReviewItem[],
  subjectQueues: {
    [subjectId: string]: ReviewItem[]
  },
  lessonQueues: {
    [lessonId: string]: ReviewItem[]
  }
}

ReviewItem {
  questionId: string,
  subjectId: string,
  lessonId: string,
  lastReviewed: Date,
  nextReview: Date,
  performance: number, // 0-100
  attempts: number,
  correctAttempts: number
}
```

---

## 6. User Flows

### 6.1 Student Dashboard Flow
```
1. Student logs in
2. Redirected to Dashboard (/student)
3. Sees Review Queue widget at top
4. Sees active subjects with progress
5. Can click:
   - "Review Now" → Review Queue page
   - Subject card → Subject Roadmap
   - "Continue Learning" on subject → Subject Roadmap
```

### 6.2 Subjects Selection Flow
```
1. Student navigates to Subjects tab (/subjects)
2. Sees all subjects for their grade
3. Can search for specific subject using search bar
4. Can filter subjects by category, progress, difficulty
5. Sees progress for started subjects
6. Clicks on a subject card
7. Navigates to Subject Roadmap page
```

### 6.3 Subject Roadmap Flow
```
1. Student views Subject Roadmap
2. Sees all lessons (milestones) in visual path
3. Sees exercise groups within each lesson (Duolingo-style)
4. Identifies:
   - Completed lessons (✓) with mastery level
   - Current lesson (🔄) with progress
   - Locked lessons (🔒)
5. For locked lesson:
   - Option 1: Complete previous lesson
   - Option 2: Click "Take Placement Quiz" to skip
6. Clicks on unlocked/in-progress lesson
7. Sees lesson with exercise groups
8. Completes exercise groups
9. Takes milestone quiz at end of lesson
10. Passes milestone quiz → Next lesson unlocks
11. Returns to roadmap
12. Visual mastery progression updates
```

### 6.4 Lesson Completion & Unlocking Flow
```
1. Student completes all exercise groups in lesson
2. Milestone quiz becomes available
3. Student takes milestone quiz
4. If passed:
   - Lesson marked as completed
   - Mastery level calculated
   - Next lesson automatically unlocks
   - Achievement/celebration animation (like Duolingo)
5. If failed:
   - Student can review lesson
   - Retake milestone quiz
   - Next lesson remains locked
6. Visual mastery progression updates on roadmap
```

---

## 7. Visual Design Guidelines

### 7.1 Color Scheme
- **Primary:** Use existing Eureka primary color
- **Progress:** Green for completed, Blue for in-progress, Gray for locked
- **Review Queue:** Orange/Red for urgency, Blue for normal
- **Cards:** White/Light background with subtle shadows

### 7.2 Typography
- Clear, readable fonts
- Subject names: Bold, larger
- Progress text: Medium weight
- Descriptions: Regular weight, smaller

### 7.3 Icons
- Subject icons: Distinct, recognizable
- Status icons: Lock, Checkmark, Progress ring
- Action icons: Play, Continue, Review

### 7.4 Animations
- Smooth transitions between states
- Progress bar animations
- Hover effects on cards
- Loading states
- Success animations (like Duolingo)

### 7.5 Responsive Design
- Mobile-first approach
- Dashboard: Stack vertically on mobile
- Subject cards: 1 column on mobile, 2-3 on tablet, 3-4 on desktop
- Roadmap: Scrollable horizontal on mobile, full view on desktop

---

## 8. Technical Requirements

### 8.1 State Management
- Student grade stored in user profile
- Subject progress tracked per student
- Review queue counts calculated in real-time
- Lesson unlock status determined by prerequisites

### 8.2 API Endpoints Needed
```
GET /api/students/:id/dashboard
GET /api/students/:id/subjects?grade=:grade&search=:query&filter=:filter
GET /api/students/:id/progress/:subjectId
GET /api/students/:id/review-queue/count
GET /api/students/:id/notifications
GET /api/subjects?grade=:grade&search=:query
GET /api/subjects/:id/roadmap
GET /api/lessons/:id
GET /api/lessons/:id/exercise-groups
GET /api/lessons/:id/placement-quiz
GET /api/lessons/:id/milestone-quiz
POST /api/students/:id/progress
POST /api/students/:id/lessons/:lessonId/complete
POST /api/students/:id/placement-quiz/:lessonId/submit
POST /api/students/:id/milestone-quiz/:lessonId/submit
```

### 8.3 Performance
- Lazy load subject cards
- Cache roadmap data
- Optimize review queue count calculation
- Fast navigation between pages

---

## 9. Acceptance Criteria

### 9.1 Student Dashboard
- [ ] Review queue widget displays correct count
- [ ] All active subjects are displayed
- [ ] Progress bars show accurate percentages
- [ ] Clicking "Review Now" navigates to review queue
- [ ] Clicking subject card navigates to roadmap
- [ ] Responsive on mobile devices

### 9.2 Subjects Tab
- [ ] Shows all subjects for student's grade
- [ ] Search bar works correctly (Arabic/English)
- [ ] Filter options work correctly
- [ ] Progress indicators are accurate
- [ ] Visual mastery progression displayed
- [ ] "Not started" subjects show empty state
- [ ] Clicking subject opens roadmap
- [ ] Search results update in real-time

### 9.3 Subject Roadmap
- [ ] All lessons (milestones) are displayed in correct order
- [ ] Exercise groups shown within each lesson (Duolingo-style)
- [ ] Lesson states (locked/unlocked/completed) are accurate
- [ ] Prerequisites are enforced
- [ ] Placement quiz option available for locked lessons
- [ ] Milestone quiz required to unlock next lesson
- [ ] Visual mastery progression displayed and updates correctly
- [ ] Clicking lesson navigates correctly
- [ ] Clicking exercise group navigates correctly
- [ ] Progress updates after lesson completion
- [ ] Next lesson unlocks automatically after milestone quiz passed
- [ ] Visual path is clear and intuitive
- [ ] Responsive on all devices

---

## 10. Lesson Explanation Pages (`/lessons/:id`)

### 10.1 Page Purpose
- Display lesson content (explanations, concepts)
- Support multiple content formats
- Include interactive elements and visualizations
- AI chatbot integration for help
- Track lesson completion
- Unlock next lesson upon completion

### 10.2 Layout Structure
**Design Inspiration:** Brilliant.org lesson pages + Duolingo content

**Main Components:**
1. **Lesson Header**
   - Lesson title (e.g., "Lesson 1: Complex Numbers")
   - Subject name and icon
   - Progress indicator
   - Back button to roadmap
   - AI Chatbot button (floating or in header)

2. **Content Area**
   - **Multiple Format Support:**
     - Text content
     - Video player (embedded)
     - Audio player
     - Mixed format (text + video + audio)
     - Format selector/toggle
   - **Interactive Elements:**
     - Code editors (for programming lessons)
     - Visual diagrams/builders
     - Simulations (physics, math)
     - Drag-and-drop exercises
     - Interactive visualizations using templates
   - Content sections with smooth scrolling

3. **AI Chatbot Integration**
   - Floating chat button (bottom right)
   - Context-aware: Understands current lesson
   - Features:
     - Answer questions about lesson
     - Explain concepts
     - Help with mistakes
     - Provide examples
     - Suggest practice problems
   - Chat window overlay
   - Persistent across page navigation

4. **Interactive Questions/Visualizations**
   - Embedded within lesson content
   - Uses platform templates
   - Types:
     - Code editor questions
     - Diagram builders
     - Simulations
     - Visual problem solving
     - Concept mapping
   - Immediate feedback
   - Progress tracking

5. **Lesson Completion Section**
   - "Mark as Complete" button
   - Completion tracking:
     - Time spent on lesson
     - Sections completed
     - Interactive elements completed
   - Completion animation (like Duolingo)
   - Unlock next lesson notification

6. **Navigation**
   - Previous lesson button
   - Next lesson button (unlocked after completion)
   - Return to roadmap button

### 10.3 Content Format Requirements
**Requirements:**
- **Format Selector:**
  - Toggle between Text | Audio | Video | Mixed
  - Remember preference
  - Smooth transitions

- **Text Format:**
  - Rich text content
  - Images and diagrams
  - Code blocks with syntax highlighting
  - Interactive elements embedded

- **Audio Format:**
  - Audio player with controls
  - Transcript available
  - Playback speed control
  - Chapter markers

- **Video Format:**
  - Video player (YouTube/Vimeo/self-hosted)
  - Playback controls
  - Subtitles/captions
  - Chapter navigation
  - Speed control

- **Mixed Format:**
  - Combination of text, video, audio
  - User can choose which to focus on
  - Synchronized content

### 10.4 Interactive Elements
**Requirements:**
- **Template-Based Visualizations:**
  - Use platform's interactive templates
  - Embed within lesson content
  - Types:
    - Code playgrounds
    - Math visualizations
    - Physics simulations
    - Concept diagrams
    - Interactive graphs
  - Save student work
  - Progress tracking

- **Interactive Questions:**
  - Embedded throughout lesson
  - Not graded (practice)
  - Immediate feedback
  - Hints available
  - AI chatbot help

### 10.5 Lesson Completion Tracking
**Requirements:**
- **Completion Criteria:**
  - All content sections viewed
  - All interactive elements completed
  - Optional: All practice questions attempted
  - Time spent threshold (optional)

- **Completion Flow:**
  1. Student completes all sections
  2. "Mark as Complete" button becomes active
  3. Student clicks button
  4. Completion animation (like Duolingo)
  5. Next lesson automatically unlocks
  6. Achievement/XP awarded
  7. Return to roadmap with updated progress

- **Progress Indicators:**
  - Progress bar showing completion
  - Section checklist
  - Time spent indicator
  - Interactive elements completion status

### 10.6 AI Chatbot Integration
**Requirements:**
- **Floating Chat Widget:**
  - Always accessible (bottom right)
  - Notification badge for new messages
  - Minimize/maximize functionality

- **Context Awareness:**
  - Knows current lesson
  - Understands lesson content
  - Can reference specific sections
  - Provides relevant examples

- **Features:**
  - Answer questions about concepts
  - Explain mistakes
  - Provide additional examples
  - Suggest practice problems
  - Help with interactive elements

### 10.7 User Flow
```
1. Student clicks lesson from roadmap
2. Lesson page loads with content
3. Student reads/watches/listens to content
4. Interacts with embedded elements
5. Uses AI chatbot for help (optional)
6. Completes all sections
7. Clicks "Mark as Complete"
8. Completion animation plays
9. Next lesson unlocks automatically
10. Returns to roadmap (or continues to next lesson)
```

---

## 11. Future Enhancements (Not in MVP)

- [ ] Subject recommendations based on performance
- [ ] Adaptive difficulty based on grade
- [ ] Social features (compare progress with friends)
- [ ] Subject categories/filters
- [ ] Favorite subjects
- [ ] Advanced subject search with filters
- [ ] Lesson notes/annotations
- [ ] Social sharing of progress
- [ ] Study groups
- [ ] Advanced roadmap customization

---

## Notes

- All designs should maintain bilingual support (Arabic/English)
- Dark mode support required
- Accessibility standards (WCAG 2.1 AA minimum)
- Performance: Page load < 2 seconds
- Mobile-first responsive design

---

---

## 12. Key Terminology Updates

- **"Courses" → "Subjects"**: All references to "courses" should be changed to "subjects"
- **Lessons = Milestones**: Each lesson is considered a milestone
- **Exercise Groups**: Collections of exercises within a lesson (like Duolingo circles)
- **Placement Quiz**: Quiz to skip/unlock a locked lesson
- **Milestone Quiz**: Required quiz at end of lesson to unlock next lesson
- **Visual Mastery Progression**: Visual representation of mastery level (like Duolingo mastery rings)

---

**Document Version:** 2.0  
**Last Updated:** Updated with search, filters, notification center, lesson structure, placement quizzes, milestone quizzes, visual mastery, AI chatbot, and interactive elements  
**Status:** Ready for review and refinement
