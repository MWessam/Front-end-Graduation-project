# Project TODO List

## Student Dashboard Implementation (`/student`)

Based on REQUIREMENTS_STUDENT.md Section 2 - Student Dashboard

### 🎯 Priority: Student Dashboard Components

#### 1. Header Section
- [ ] Display student name and grade
- [ ] Quick stats display (XP, level, streak)
- [ ] Navigation menu (sidebar or top nav)
- [ ] Responsive header layout

#### 2. Review Queue Widget (Top Priority - Always Visible)
- [ ] Prominent placement at top of dashboard (below header)
- [ ] Display: "You have X exercises to review"
- [ ] Large, prominent "Review Now" button
- [ ] Visual indicator (badge/notification) when reviews are pending
- [ ] Clicking "Review Now" navigates to `/solve-exercises` with global reviews filter
- [ ] Real-time count updates
- [ ] Visual urgency indicator (color changes based on overdue reviews)
- [ ] Show total amount of reviews remaining

#### 3. Notification Center (Header/Widget)
- [ ] Notification bell icon in header
- [ ] Badge showing unread notification count
- [ ] Clicking opens notification dropdown or navigates to notifications page
- [ ] Quick preview of recent notifications
- [ ] Support notification types:
  - [ ] Review queue reminders
  - [ ] New class materials
  - [ ] Upcoming exams/deadlines
  - [ ] Achievement unlocks
  - [ ] Lesson completion reminders

#### 4. Active Subjects Section
- [ ] Grid/list of all active subjects (enrolled subjects)
- [ ] Each subject card displays:
  - [ ] Subject name/icon
  - [ ] Progress percentage/bar (0-100%)
  - [ ] Last activity date
  - [ ] Current lesson/topic name
  - [ ] Quick action buttons ("Continue Learning" or "Start Learning")
- [ ] Subjects with no progress show:
  - [ ] "Start Learning" button
  - [ ] Empty progress state (like Brilliant)
  - [ ] Subject description/preview
- [ ] Clicking subject card navigates to subject roadmap page (`/subjects/:id`)
- [ ] Card-based layout (similar to Duolingo's course cards)
- [ ] Progress visualization (circular or linear progress bar)
- [ ] Hover effects and animations
- [ ] Responsive grid (2-3 columns on desktop, 1 on mobile)

#### 5. Statistics Cards
- [ ] Overall grade/performance card
- [ ] Courses completed card
- [ ] Upcoming deadlines card
- [ ] Recent achievements card
- [ ] Visual design matching Brilliant.org/Duolingo style

#### 6. Recent Activity Feed
- [ ] Latest lessons completed
- [ ] Recent achievements unlocked
- [ ] Upcoming assignments/exams
- [ ] Timestamp display
- [ ] Clickable items for navigation

### 🎨 Design & UX Requirements

- [ ] Design inspired by Brilliant.org + Duolingo
- [ ] Bilingual support (Arabic/English)
- [ ] Dark mode support
- [ ] Mobile-first responsive design
- [ ] Smooth animations and transitions
- [ ] Accessibility standards (WCAG 2.1 AA minimum)
- [ ] Performance: Page load < 2 seconds

### 🔌 API Integration

- [ ] `GET /api/students/:id/dashboard` - Fetch dashboard data
- [ ] `GET /api/students/:id/review-queue/count` - Get review count
- [ ] `GET /api/students/:id/notifications` - Fetch notifications
- [ ] `GET /api/students/:id/subjects` - Get enrolled subjects with progress
- [ ] Real-time updates for review queue count

### 📱 Responsive Design

- [ ] Mobile: Stack vertically, single column layout
- [ ] Tablet: 2-column grid for subject cards
- [ ] Desktop: 3-4 column grid for subject cards
- [ ] Review queue widget always visible and prominent on all devices

---

## Future Features (Not in MVP)

### Subjects Tab (`/subjects`)
- [ ] Display all available subjects for student's grade
- [ ] Search functionality (Arabic/English)
- [ ] Filter options (category, progress, difficulty)
- [ ] Subject enrollment
- [ ] Progress indicators for started subjects

### Subject Roadmap (`/subjects/:id`)
- [ ] Visual learning path/roadmap
- [ ] Lesson progression (milestones)
- [ ] Exercise groups within lessons (Duolingo-style)
- [ ] Lesson unlocking system
- [ ] Placement quiz functionality
- [ ] Milestone quiz system
- [ ] Visual mastery progression

### Lesson Pages (`/lessons/:id`)
- [ ] Multiple content formats (text, video, audio, mixed)
- [ ] Interactive elements and visualizations
- [ ] AI chatbot integration
- [ ] Lesson completion tracking

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

- **Current Focus**: Student Dashboard Implementation
- **Total Pages**: 20 (Legacy migration)
- **Completed**: 19 (Legacy migration)
- **In Progress**: Student Dashboard Enhancement
- **Progress**: Starting new implementation phase

## Notes

- Student Dashboard is being rebuilt to match REQUIREMENTS_STUDENT.md specifications
- Design inspiration: Brilliant.org + Duolingo
- All new features should maintain bilingual support (Arabic/English)
- Dark mode support required
- Mobile-first responsive design approach
