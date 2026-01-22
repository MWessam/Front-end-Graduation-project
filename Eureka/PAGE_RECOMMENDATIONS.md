# Eureka Platform - Page Recommendations & Requirements

Based on the project proposal analysis, this document outlines all pages that should exist, their current status, missing features, and implementation priorities.

---

## 📋 Table of Contents

1. [Current Pages Analysis](#current-pages-analysis)
2. [Missing Critical Pages](#missing-critical-pages)
3. [Page-by-Page Recommendations](#page-by-page-recommendations)
4. [Priority Implementation Order](#priority-implementation-order)
5. [Design Recommendations](#design-recommendations)
6. [Functional Requirements Mapping](#functional-requirements-mapping)

---

## Current Pages Analysis

### ✅ Implemented Pages
- Landing Page (`/landing`)
- Login/Registration (`/login`)
- OTP Verification (`/verify-otp`)
- Student Dashboard (`/student`)
- Courses/Start Learning (`/courses`)
- All Courses (`/courses`)
- Concept/Lesson Pages (`/concept`, `/concept-lesson`)
- Lectures (`/lectures`)
- Lesson Lecture (`/lesson-lec`)
- Quiz (`/quiz`)
- Essay (`/essay`)
- MCQ Essay (`/mcq-essay`)
- Results Pages (`/result`, `/essay-result`, `/result-mcq-essay`)
- Instructions (`/instructions`)
- Teacher Quiz (`/teacher-quiz`)
- Achievements (`/achievements`)

### ⚠️ Partially Implemented
- Classes Page (`/classes`) - **Currently empty placeholder**

### ❌ Missing Pages
- Review Queue Page
- Teacher Dashboard
- Profile Page
- Notifications Page
- Search/Explore Page
- AI Chatbot Interface
- Shop/Rewards Page (placeholder exists)

---

## Missing Critical Pages

### 1. **Review Queue Page** - HIGHEST PRIORITY
**Status:** ❌ Missing  
**Functional Requirements:** FR29, FR30, FR31, FR32

**Purpose:**
- Core feature for spaced repetition system
- Manages three review queues (Global, Subject-level, Lesson-level)
- Adaptive review timing based on performance

**Key Features Needed:**
- Display pending questions in each queue
- Show last review date and next review date
- Adaptive scheduling based on student performance
- Move questions between queues based on performance
- Quick review interface

---

### 2. **Teacher Dashboard** - HIGHEST PRIORITY
**Status:** ❌ Missing  
**Functional Requirements:** FR16, FR17, FR18, FR19, FR20, FR21, FR22

**Purpose:**
- Central hub for teachers to manage classes and content
- Student progress tracking and analytics
- Decision Support System (DSS) for identifying weak areas

**Key Features Needed:**
- Class management (create, view, manage students)
- Content creation (lessons, exercises, exams)
- Student progress tracking
- Performance analytics and trends
- DSS for identifying weak areas
- Preview functionality before publishing

---

### 3. **Profile Page** - HIGH PRIORITY
**Status:** ❌ Missing  
**Functional Requirements:** FR2, FR3

**Purpose:**
- User profile management
- Learning statistics and achievements
- Settings and preferences

**Key Features Needed:**
- Update basic profile (name, picture)
- Learning statistics dashboard
- Achievement gallery
- Settings:
  - Language toggle (Arabic/English)
  - Theme preferences
  - Notification settings
  - Privacy settings
  - Account management

---

### 4. **Notifications Page** - HIGH PRIORITY
**Status:** ❌ Missing  
**Functional Requirements:** FR37, FR38, FR39, FR40

**Purpose:**
- Centralized notification center
- Alerts for reviews, class updates, exams

**Key Features Needed:**
- Pending spaced repetition reviews
- New class materials/announcements
- Upcoming exams/deadlines
- Teacher notifications (submissions, alerts)
- Mark as read functionality
- Notification preferences

---

### 5. **Search/Explore Page** - MEDIUM PRIORITY
**Status:** ❌ Missing  
**Functional Requirements:** FR13

**Purpose:**
- Search functionality for subjects and lessons
- Content discovery

**Key Features Needed:**
- Search bar for subjects and lessons
- Filter options (subject, difficulty, duration)
- Recent searches
- Trending/popular content
- Course recommendations

---

### 6. **AI Chatbot Interface** - HIGH PRIORITY
**Status:** ❌ Missing  
**Functional Requirements:** FR6

**Purpose:**
- Context-aware help during learning
- Explanation of mistakes
- Lesson assistance

**Key Features Needed:**
- Floating chat widget (available on all pages)
- Context-aware responses
- Help with mistakes
- Lesson explanations
- Integration in lesson pages

---

### 7. **Shop/Rewards Page** - LOW PRIORITY
**Status:** ⚠️ Placeholder exists  
**Functional Requirements:** Gamification (FR33, FR34)

**Purpose:**
- Virtual currency and rewards
- Freemium model features

**Key Features Needed:**
- Virtual currency display (coins/points)
- Rewards store
- Unlockable content
- Premium features
- Badges/avatars
- Theme customization

---

## Page-by-Page Recommendations

### 1. Landing Page (`/landing`)
**Status:** ✅ Implemented  
**Enhancements Needed:**

- [ ] Add Arabic/English language toggle (bilingual support requirement)
- [ ] Add testimonials section
- [ ] Add demo video/interactive preview
- [ ] Add pricing tiers (freemium model mentioned in proposal)
- [ ] Add "How it Works" section explaining spaced repetition
- [ ] Add feature highlights (AI chatbot, interactive questions, etc.)

---

### 2. Login/Registration (`/login`)
**Status:** ✅ Implemented  
**Enhancements Needed:**

- [ ] Third-party authentication (Google, Facebook) - **FR1**
- [ ] Password reset functionality - **FR4**
- [ ] Role selection (Student/Teacher) - ✅ Already implemented
- [ ] Email verification flow
- [ ] Remember me functionality

---

### 3. OTP Verification (`/verify-otp`)
**Status:** ✅ Complete  
**No changes needed**

---

### 4. Student Dashboard (`/student`)
**Status:** ✅ Basic implementation  
**Missing Critical Features:**

#### Spaced Repetition Review Queue (FR29, FR30)
- [ ] **Review Queue Indicator**
  - Show pending reviews count for each queue (Global, Subject, Lesson)
  - Quick access button to review queue page
  - Visual indicator when reviews are due

#### Mistake Tracking (FR11)
- [ ] **Mistake Tracking Visualization**
  - Chart showing mistakes over time
  - Topics with most mistakes
  - Mistake frequency by subject
  - Improvement trends

#### Lesson Completion Tracking (FR10)
- [ ] **Enhanced Progress Tracking**
  - Visual progress bars for each subject
  - Completion percentage per course
  - Lesson completion checklist
  - Milestone achievements

#### AI Chatbot Integration (FR6)
- [ ] **AI Chatbot Access**
  - Floating chat button in header
  - Quick access to help
  - Context-aware assistance

#### Search Functionality (FR13)
- [ ] **Search Bar**
  - Search subjects and lessons
  - Quick search in header
  - Search history

#### Notification Center (FR37-FR39)
- [ ] **Notifications Widget**
  - Pending reviews count
  - New class materials
  - Upcoming exams/deadlines
  - Notification bell icon with badge

**Suggested Dashboard Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Header: My Progress | [Search] | [AI Chat] | [Notifications] │
├─────────────────────────────────────────────────────────┤
│ Stats Cards (Overall Grade, Courses Completed, etc.)    │
├─────────────────────────────────────────────────────────┤
│ ⚠️ Review Queue Widget                                   │
│   - Global Queue: 15 questions due                       │
│   - Subject Queue: 8 questions due                      │
│   - Lesson Queue: 3 questions due                       │
│   [Start Review Session]                                 │
├─────────────────────────────────────────────────────────┤
│ 📊 Mistake Tracking Chart                               │
│   - Mistakes over time visualization                    │
│   - Top struggling topics                               │
├─────────────────────────────────────────────────────────┤
│ 📚 Course Progress Table                                 │
│   - Course name, grade, progress bar                     │
├─────────────────────────────────────────────────────────┤
│ 📅 Upcoming Assignments/Exams                           │
│   - Due this week items                                 │
├─────────────────────────────────────────────────────────┤
│ 🔔 Recent Notifications                                 │
│   - Latest 5 notifications                              │
└─────────────────────────────────────────────────────────┘
```

---

### 5. Courses/Start Learning (`/courses`)
**Status:** ✅ Basic implementation  
**Missing Features:**

#### Placement Quiz (FR9)
- [ ] **Skip to Later Lessons**
  - "Take Placement Quiz" button
  - Assess current knowledge level
  - Unlock appropriate lessons based on performance

#### Visual Mastery Progression (FR36)
- [ ] **Mastery Level Indicators**
  - Show mastery level for each topic (Beginner → Advanced)
  - Visual mastery progression bars
  - Topic difficulty indicators

#### Milestone Questions (FR8)
- [ ] **Lesson Unlocking System**
  - Lock/unlock indicators for lessons
  - Required milestone questions to unlock
  - Prerequisites visualization
  - Progress gates

**Suggested Enhancements:**
- Add "Take Placement Quiz" button at top
- Show mastery level badges on each topic
- Add lock icons for locked lessons
- Show prerequisites for each lesson
- Add estimated time to complete

---

### 6. All Courses (`/courses`)
**Status:** ✅ Good implementation  
**Enhancements Needed:**

- [ ] Filter by subject, difficulty, duration
- [ ] Search functionality
- [ ] Course ratings/reviews
- [ ] Estimated completion time
- [ ] Course difficulty indicators
- [ ] Popular/trending courses section

---

### 7. Concept/Lesson Explanation Pages (`/concept`, `/concept-lesson`)
**Status:** ✅ Good implementation  
**Missing Critical Features:**

#### AI Chatbot Integration (FR6)
- [ ] **Floating Chat Widget**
  - Context-aware help during lesson
  - Ask questions about current lesson
  - Get explanations for concepts
  - Help with mistakes

#### Multiple Format Support (FR5)
- [ ] **Content Formats**
  - Currently: Text only
  - Needed: Audio, Video, Mixed formats
  - Format selector/toggle
  - Video player integration
  - Audio player integration

#### Interactive Elements
- [ ] **Enhanced Interactivity**
  - Code playgrounds for programming lessons
  - Visual simulations for physics/math
  - Interactive diagrams
  - Drag-and-drop concept builders

#### Lesson Completion Tracking
- [ ] **Completion Status**
  - Mark lesson as complete
  - Track reading time
  - Save progress
  - Resume from last position

**Suggested Layout:**
```
┌─────────────────────────────────────────────┐
│ [Back] Lesson Title [AI Chat Icon] [Language]│
├─────────────────────────────────────────────┤
│ Content Format: [Text] [Audio] [Video] [Mixed]│
├─────────────────────────────────────────────┤
│ Content Area:                                │
│ - Text content                               │
│ - Video player (if video format)            │
│ - Audio player (if audio format)             │
│ - Interactive elements                       │
│ - Code playgrounds                            │
├─────────────────────────────────────────────┤
│ [Previous] [Mark Complete] [Practice] [Next] │
└─────────────────────────────────────────────┘
```

---

### 8. Classes Page (`/classes`) - **CRITICAL: EMPTY**
**Status:** ❌ Empty placeholder  
**Functional Requirements:** FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25, FR26

**Must Implement:**

#### Student View (FR14, FR15)
- [ ] **Class List**
  - Display all joined classes
  - Class cards with key information
  - Join class functionality (class code)
  - Class search/filter

- [ ] **Class Dashboard (per class)**
  - Class materials (lessons, exercises, exams)
  - Class announcements
  - Student-teacher chat (FR23)
  - Comments and reactions on materials (FR24, FR25)
  - Class progress tracking
  - Upcoming exams/deadlines
  - Class calendar

#### Teacher View (FR16-FR22)
- [ ] **Class Management**
  - Create new class
  - Add/remove students (FR17)
  - Class settings
  - Class code generation

- [ ] **Content Creation (FR18)**
  - Create lessons using interactive templates
  - Create exercises
  - Create exams
  - Use platform's interactive framework

- [ ] **Content Management (FR19)**
  - Edit created materials
  - Delete materials
  - Duplicate materials
  - Organize materials

- [ ] **Preview Functionality (FR20)**
  - Preview exercises before publishing
  - Preview exams before publishing
  - Test as student view

- [ ] **Student Progress Tracking (FR21)**
  - View individual student progress
  - Class-wide progress overview
  - Assignment completion status
  - Exam performance

- [ ] **Decision Support System (FR22)**
  - Identify weak areas across class
  - Performance trends analysis
  - Recommendations for focus areas
  - Student performance alerts

- [ ] **Moderation (FR26)**
  - Moderate comments
  - Remove inappropriate content
  - Manage class discussions

**Suggested Layout:**
```
┌─────────────────────────────────────────────┐
│ My Classes | [Create Class] (Teacher only) │
├─────────────────────────────────────────────┤
│ Class Cards Grid:                            │
│ ┌─────────────────────────────────────┐     │
│ │ Class Name | Subject                 │     │
│ │ Students: 25 | Next Exam: Jan 15    │     │
│ │ Progress: 75%                        │     │
│ │ [Enter Class] [View Progress]        │     │
│ └─────────────────────────────────────┘     │
│                                              │
│ [Join Class] Button (with class code input) │
└─────────────────────────────────────────────┘

Class Detail Page:
┌─────────────────────────────────────────────┐
│ Class Header: Name, Subject, Teacher        │
├─────────────────────────────────────────────┤
│ Tabs: [Materials] [Announcements] [Chat]    │
│       [Students] [Progress] [Settings]      │
├─────────────────────────────────────────────┤
│ Materials Section:                           │
│ - Lessons list                               │
│ - Exercises list                             │
│ - Exams list                                 │
│ - [Create New] button (Teacher)              │
├─────────────────────────────────────────────┤
│ Announcements Feed                           │
│ Chat Interface                               │
│ Student List (Teacher view)                  │
└─────────────────────────────────────────────┘
```

---

### 9. Review Queue Page - **CRITICAL: MISSING**
**Status:** ❌ Missing  
**Functional Requirements:** FR29, FR30, FR31, FR32

**Must Implement:**

#### Three Review Queues (FR29)
- [ ] **Global Queue**
  - All questions from all subjects
  - Cross-subject review

- [ ] **Subject-Level Queue**
  - Questions specific to a subject
  - Subject-filtered review

- [ ] **Lesson-Level Queue**
  - Questions from specific lesson
  - Focused lesson review

#### Review Queue Management (FR30)
- [ ] **Queue Integration**
  - Add class questions to queues (if student opts in)
  - Add exam questions to queues (if student opts in)
  - Queue selection preferences

#### Adaptive Review Timing (FR31)
- [ ] **Adaptive Scheduling**
  - Review times based on student performance
  - Calculate next review date
  - Performance-based intervals
  - Spaced repetition algorithm implementation

#### Question Movement (FR32)
- [ ] **Dynamic Queue Management**
  - Move questions between queues based on performance
  - Promote/demote questions
  - Archive mastered questions
  - Reset review schedule for difficult questions

**Suggested Layout:**
```
┌─────────────────────────────────────────────┐
│ Review Queues                                │
├─────────────────────────────────────────────┤
│ Tabs: [Global] [Subject] [Lesson]           │
├─────────────────────────────────────────────┤
│ Queue Statistics:                            │
│ - Questions Due: 15                          │
│ - Due Today: 5                               │
│ - Due This Week: 10                          │
├─────────────────────────────────────────────┤
│ Questions List:                               │
│ ┌─────────────────────────────────────┐     │
│ │ Question Preview                     │     │
│ │ Subject: Math | Lesson: Functions    │     │
│ │ Last reviewed: 2 days ago            │     │
│ │ Next review: Today                  │     │
│ │ Performance: 75% (Good)             │     │
│ │ [Review Now] [Schedule Later]        │     │
│ └─────────────────────────────────────┘     │
├─────────────────────────────────────────────┤
│ [Start Review Session] Button                │
└─────────────────────────────────────────────┘

Review Session Interface:
┌─────────────────────────────────────────────┐
│ Reviewing: Question 1 of 15                  │
├─────────────────────────────────────────────┤
│ Question Display                             │
│ [Answer Input/Selection]                    │
├─────────────────────────────────────────────┤
│ [Show Answer] [Mark Correct] [Mark Incorrect]│
│ Performance affects next review date         │
└─────────────────────────────────────────────┘
```

---

### 10. Interactive Question Pages
**Status:** ⚠️ Partially implemented (MCQ only)  
**Functional Requirements:** FR27, FR28

**Current State:**
- ✅ MCQ questions implemented
- ❌ Other interactive question types missing

**Missing Question Types:**

#### Interactive Questions (FR27)
- [ ] **Code Editor Questions**
  - Syntax highlighting
  - Code execution
  - Test cases
  - Feedback on code

- [ ] **Drag-and-Drop Questions**
  - Match concepts
  - Order steps
  - Categorize items
  - Build structures

- [ ] **Visual Diagram Builders**
  - Create flowcharts
  - Build concept maps
  - Draw diagrams
  - Visual problem solving

- [ ] **Interactive Essay Questions**
  - Node-based answer building (FR requirement)
  - Visual concept mapping
  - Structured essay construction
  - Component-based answers

- [ ] **Simulation-Based Questions**
  - Physics simulations
  - Math visualizations
  - Interactive experiments
  - Parameter manipulation

#### Spaced Repetition Integration (FR28)
- [ ] **Question Tracking**
  - Add solved questions to review queues
  - Track performance per question
  - Adaptive difficulty
  - Mistake tracking

#### Adaptive Question Generation
- [ ] **AI-Generated Questions**
  - Based on student performance
  - Focus on struggling areas
  - Personalized difficulty
  - Concept-specific questions

---

### 11. Exam System (`/instructions`, `/teacher-quiz`)
**Status:** ✅ Good implementation  
**Enhancements Needed:**

#### Security Features (FR42, FR43)
- [ ] **Full-Screen Lock Mode**
  - Lock browser to full-screen
  - Prevent minimizing
  - Disable task switching

- [ ] **Tab Switching Prevention**
  - Detect tab switches
  - Warn on tab switch
  - Log suspicious activity
  - Auto-submit on multiple violations

#### AI Proctoring (Proposal Requirement)
- [ ] **Proctoring Features**
  - Camera access indicator
  - Microphone monitoring
  - Activity monitoring
  - Screen recording (optional)
  - Face detection
  - Eye movement tracking

#### Question Randomization (FR41)
- [ ] **Randomization**
  - Randomize question order
  - Randomize option order
  - Different question sets per student

#### Auto-Submit (FR45)
- [ ] **Time Management**
  - Auto-submit on time expiry
  - Warning before time expires
  - Time extension requests (teacher approval)

#### Question Types (FR44)
- [ ] **Multiple Question Types**
  - ✅ MCQ - Implemented
  - ✅ Essay - Implemented
  - ✅ Interactive - Partially implemented
  - ❌ Interactive-essay - Needs implementation

**Suggested Enhancements:**
- Add proctoring status indicator
- Show camera/microphone status
- Display activity warnings
- Add "Request Time Extension" button
- Show security violations log

---

### 12. Teacher Dashboard - **CRITICAL: MISSING**
**Status:** ❌ Missing  
**Functional Requirements:** FR16, FR17, FR18, FR19, FR20, FR21, FR22

**Must Implement:**

#### Class Management (FR16, FR17)
- [ ] **Class Overview**
  - List all created classes
  - Class statistics (students, assignments, exams)
  - Quick actions (create class, manage students)

- [ ] **Student Management**
  - Add students to classes
  - Remove students from classes
  - View student list per class
  - Student search/filter

#### Content Creation (FR18)
- [ ] **Content Creation Hub**
  - Create lessons using interactive templates
  - Create exercises
  - Create exams
  - Use platform's interactive framework
  - Template library
  - Content duplication

#### Content Management (FR19)
- [ ] **Edit/Delete Functionality**
  - Edit created materials
  - Delete materials
  - Archive materials
  - Version history
  - Bulk operations

#### Preview Functionality (FR20)
- [ ] **Preview Before Publishing**
  - Preview exercises as student would see
  - Preview exams
  - Test interactive elements
  - Validate content

#### Student Progress Tracking (FR21)
- [ ] **Progress Dashboard**
  - Individual student progress
  - Class-wide progress overview
  - Assignment completion rates
  - Exam performance statistics
  - Time spent on materials
  - Engagement metrics

#### Decision Support System (FR22)
- [ ] **Analytics & Insights**
  - Identify weak areas across class
  - Performance trends over time
  - Recommendations for focus areas
  - Student performance alerts
  - Comparative analysis
  - Predictive analytics

**Suggested Layout:**
```
┌─────────────────────────────────────────────┐
│ Teacher Dashboard                           │
├─────────────────────────────────────────────┤
│ Quick Actions:                              │
│ [Create Class] [Create Content] [View All] │
├─────────────────────────────────────────────┤
│ My Classes:                                 │
│ ┌─────────────────────────────────────┐   │
│ │ Class Name | Students: 25           │   │
│ │ Active Assignments: 3               │   │
│ │ [Manage] [View Progress] [Analytics]│   │
│ └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│ Student Analytics Overview:                │
│ - Total Students: 150                      │
│ - Average Performance: 78%                │
│ - Students Needing Attention: 12          │
├─────────────────────────────────────────────┤
│ Performance Insights (DSS):                │
│ - Weak Areas: Functions, Loops            │
│ - Trending Down: Arrays                   │
│ - Recommendations: Focus on Functions     │
├─────────────────────────────────────────────┤
│ Recent Activity:                           │
│ - New submissions: 5                      │
│ - Exams completed: 3                      │
│ - Class discussions: 8                     │
└─────────────────────────────────────────────┘
```

---

### 13. Profile Page - **MISSING**
**Status:** ❌ Missing  
**Functional Requirements:** FR2, FR3

**Must Implement:**

#### Profile Management (FR2)
- [ ] **Basic Information**
  - Update name
  - Upload/change profile picture
  - Edit email (with verification)
  - Update bio/description

#### Learning Statistics
- [ ] **Statistics Dashboard**
  - Total XP earned
  - Current level
  - Courses completed
  - Questions answered
  - Review sessions completed
  - Learning streak
  - Time spent learning

#### Achievement Gallery
- [ ] **Achievements Display**
  - All earned achievements
  - Achievement progress
  - Badge collection
  - Milestone achievements

#### Settings
- [ ] **Language Settings**
  - Arabic/English toggle
  - Language preference

- [ ] **Theme Preferences**
  - Light/Dark mode toggle
  - Theme customization

- [ ] **Notification Settings**
  - Email notifications
  - Push notifications
  - Review reminders
  - Class updates

- [ ] **Privacy Settings**
  - Profile visibility
  - Data sharing preferences
  - Account deletion

- [ ] **Account Management**
  - Change password
  - Two-factor authentication
  - Connected accounts
  - Data export

**Suggested Layout:**
```
┌─────────────────────────────────────────────┐
│ Profile                                     │
├─────────────────────────────────────────────┤
│ Profile Header:                             │
│ [Profile Picture] Name | [Edit]            │
│ Role: Student | Level: 5                    │
├─────────────────────────────────────────────┤
│ Tabs: [Overview] [Statistics] [Achievements] │
│       [Settings] [Privacy]                  │
├─────────────────────────────────────────────┤
│ Overview Tab:                               │
│ - Basic Information (editable)              │
│ - Bio/Description                           │
│ - Join Date                                  │
├─────────────────────────────────────────────┤
│ Statistics Tab:                             │
│ - Learning Stats                            │
│ - Progress Charts                           │
│ - Performance Metrics                       │
├─────────────────────────────────────────────┤
│ Achievements Tab:                            │
│ - Achievement Grid                          │
│ - Progress Indicators                       │
├─────────────────────────────────────────────┤
│ Settings Tab:                                │
│ - Language: [Arabic] [English]              │
│ - Theme: [Light] [Dark]                     │
│ - Notifications: [Toggle switches]          │
│ - Privacy: [Options]                        │
└─────────────────────────────────────────────┘
```

---

### 14. Notifications Page - **MISSING**
**Status:** ❌ Missing  
**Functional Requirements:** FR37, FR38, FR39, FR40

**Must Implement:**

#### Student Notifications (FR37, FR38, FR39)
- [ ] **Review Reminders**
  - Pending spaced repetition reviews
  - Review queue notifications
  - Overdue reviews

- [ ] **Class Updates**
  - New class materials posted
  - New assignments
  - New exams scheduled
  - Class announcements

- [ ] **Deadline Reminders**
  - Upcoming exams
  - Assignment due dates
  - Review deadlines

#### Teacher Notifications (FR40)
- [ ] **Student Activity**
  - Student submissions
  - Exam completions
  - Assignment submissions
  - Class activity alerts

- [ ] **Performance Alerts**
  - Student performance drops
  - Class-wide issues
  - DSS recommendations

#### Notification Management
- [ ] **Notification Features**
  - Mark as read/unread
  - Delete notifications
  - Filter by type
  - Notification preferences
  - Email digest options

**Suggested Layout:**
```
┌─────────────────────────────────────────────┐
│ Notifications                                │
├─────────────────────────────────────────────┤
│ Filter: [All] [Reviews] [Classes] [Exams]  │
│ [Mark All Read] [Clear All]                 │
├─────────────────────────────────────────────┤
│ Notification List:                           │
│ ┌─────────────────────────────────────┐     │
│ │ 🔔 Review Queue: 15 questions due   │     │
│ │ 2 hours ago | [Mark Read] [View]    │     │
│ └─────────────────────────────────────┘     │
│ ┌─────────────────────────────────────┐     │
│ │ 📚 New Material: Math - Functions    │     │
│ │ 5 hours ago | [Mark Read] [View]    │     │
│ └─────────────────────────────────────┘     │
│ ┌─────────────────────────────────────┐     │
│ │ ⏰ Exam Reminder: Programming Quiz   │     │
│ │ Tomorrow at 10:00 AM                │     │
│ │ [Mark Read] [View]                   │     │
│ └─────────────────────────────────────┘     │
└─────────────────────────────────────────────┘
```

---

### 15. Search/Explore Page - **MISSING**
**Status:** ❌ Missing  
**Functional Requirements:** FR13

**Must Implement:**

#### Search Functionality
- [ ] **Search Bar**
  - Search subjects
  - Search lessons
  - Search classes
  - Real-time search results
  - Search history

#### Filter Options
- [ ] **Advanced Filters**
  - Filter by subject
  - Filter by difficulty
  - Filter by duration
  - Filter by completion status
  - Sort options

#### Content Discovery
- [ ] **Discovery Features**
  - Recent searches
  - Trending content
  - Popular courses
  - Recommended content
  - Recently viewed

**Suggested Layout:**
```
┌─────────────────────────────────────────────┐
│ Search & Explore                            │
├─────────────────────────────────────────────┤
│ Search Bar: [Search subjects, lessons...]  │
│ [🔍]                                        │
├─────────────────────────────────────────────┤
│ Filters: [Subject ▼] [Difficulty ▼] [Sort] │
├─────────────────────────────────────────────┤
│ Results:                                     │
│ ┌─────────────────────────────────────┐     │
│ │ Course/Lesson Card                   │     │
│ │ Subject | Difficulty | Duration      │     │
│ │ [View] [Add to Favorites]            │     │
│ └─────────────────────────────────────┘     │
├─────────────────────────────────────────────┤
│ Trending: [Popular Courses]                 │
│ Recent: [Your Recent Searches]              │
└─────────────────────────────────────────────┘
```

---

### 16. AI Chatbot Interface - **MISSING**
**Status:** ❌ Missing  
**Functional Requirements:** FR6

**Must Implement:**

#### Chat Widget
- [ ] **Floating Chat Button**
  - Available on all pages
  - Persistent across navigation
  - Notification badge for new messages

#### Context Awareness
- [ ] **Context-Aware Responses**
  - Understand current lesson context
  - Provide relevant explanations
  - Reference current content
  - Lesson-specific help

#### Features
- [ ] **Chatbot Capabilities**
  - Help with mistakes
  - Explain concepts
  - Answer questions about lessons
  - Provide study tips
  - Suggest practice problems

#### Integration Points
- [ ] **Page Integration**
  - Lesson pages (primary)
  - Quiz pages
  - Review queue pages
  - Dashboard (general help)

**Suggested Layout:**
```
Floating Chat Widget (Bottom Right):
┌─────────────────────────┐
│ [Chat Icon]             │
│ (with notification badge)│
└─────────────────────────┘

Chat Window (when opened):
┌─────────────────────────────┐
│ AI Assistant                │
│ [Minimize] [Close]          │
├─────────────────────────────┤
│ Chat Messages:              │
│ User: "What is a function?" │
│ Bot: "A function is..."     │
│                             │
│ [Context: Lesson: Functions] │
├─────────────────────────────┤
│ [Type your question...]     │
│ [Send]                      │
└─────────────────────────────┘
```

---

### 17. Shop/Rewards Page (`/shop`)
**Status:** ⚠️ Placeholder exists  
**Functional Requirements:** FR33, FR34 (Gamification)

**Should Include:**

#### Virtual Currency
- [ ] **Currency Display**
  - Current coins/points balance
  - XP display
  - Currency earning history

#### Rewards Store
- [ ] **Available Rewards**
  - Unlockable content
  - Premium features
  - Badges/avatars
  - Theme customization
  - Streak freezes
  - Bonus XP multipliers

#### Freemium Features
- [ ] **Premium Options**
  - Premium subscription tiers
  - One-time purchases
  - Gift options

**Suggested Layout:**
```
┌─────────────────────────────────────────────┐
│ Shop & Rewards                              │
├─────────────────────────────────────────────┤
│ Your Balance:                               │
│ ⭐ 440 XP | 💰 250 Coins                    │
├─────────────────────────────────────────────┤
│ Categories:                                 │
│ [Content] [Features] [Cosmetics] [Premium] │
├─────────────────────────────────────────────┤
│ Rewards Grid:                                │
│ ┌─────────────────────────────────────┐     │
│ │ Premium Theme Pack                   │     │
│ │ 💰 100 Coins                         │     │
│ │ [Purchase]                           │     │
│ └─────────────────────────────────────┘     │
└─────────────────────────────────────────────┘
```

---

## Priority Implementation Order

### 🔴 Phase 1: Critical Missing Features (Weeks 1-4)

1. **Classes Page** (`/classes`)
   - **Priority:** HIGHEST
   - **Reason:** Core feature for teacher-student interaction
   - **FR:** FR14-FR26
   - **Estimated Effort:** High

2. **Review Queue Page**
   - **Priority:** HIGHEST
   - **Reason:** Core spaced repetition feature
   - **FR:** FR29-FR32
   - **Estimated Effort:** High

3. **Teacher Dashboard**
   - **Priority:** HIGHEST
   - **Reason:** Essential for teacher functionality
   - **FR:** FR16-FR22
   - **Estimated Effort:** High

4. **AI Chatbot Integration**
   - **Priority:** HIGH
   - **Reason:** Core feature mentioned in proposal
   - **FR:** FR6
   - **Estimated Effort:** Medium-High

5. **Profile Page**
   - **Priority:** HIGH
   - **Reason:** Basic user management
   - **FR:** FR2, FR3
   - **Estimated Effort:** Medium

### 🟡 Phase 2: Enhanced Features (Weeks 5-8)

6. **Notification System**
   - **Priority:** HIGH
   - **FR:** FR37-FR40
   - **Estimated Effort:** Medium

7. **Search Functionality**
   - **Priority:** MEDIUM
   - **FR:** FR13
   - **Estimated Effort:** Medium

8. **Interactive Question Types**
   - **Priority:** HIGH
   - **FR:** FR27, FR28
   - **Estimated Effort:** High

9. **Mistake Tracking Visualization**
   - **Priority:** MEDIUM
   - **FR:** FR11
   - **Estimated Effort:** Medium

10. **Enhanced Student Dashboard**
    - **Priority:** MEDIUM
    - **FR:** FR10, FR11, FR29, FR30
    - **Estimated Effort:** Medium

### 🟢 Phase 3: Polish and Optimization (Weeks 9-12)

11. **Shop/Rewards Page**
    - **Priority:** LOW
    - **FR:** FR33, FR34
    - **Estimated Effort:** Medium

12. **Enhanced Gamification**
    - **Priority:** LOW
    - **FR:** FR33-FR36
    - **Estimated Effort:** Low-Medium

13. **Performance Optimizations**
    - **Priority:** MEDIUM
    - **Estimated Effort:** Medium-High

14. **Mobile Responsiveness**
    - **Priority:** MEDIUM
    - **Estimated Effort:** High

---

## Design Recommendations

### 1. Bilingual Support
- **Requirement:** Support Arabic and English (FR requirement)
- **Implementation:**
  - Language toggle in header (all pages)
  - RTL support for Arabic
  - Translated content
  - Language preference saved in profile

### 2. Consistent Navigation
- **Requirement:** Unified navigation experience
- **Implementation:**
  - Consistent sidebar across all pages
  - Breadcrumb navigation
  - Active state indicators
  - Mobile-responsive menu

### 3. Dark Mode
- **Requirement:** Theme support
- **Implementation:**
  - All pages support dark mode
  - Theme toggle in header
  - Preference saved in profile
  - Smooth theme transitions

### 4. Gamification Balance
- **Requirement:** Not too addictive (FR35)
- **Implementation:**
  - Subtle progress indicators
  - No streak pressure
  - Balanced rewards
  - Focus on learning, not gaming

### 5. Accessibility
- **Requirement:** Inclusive design
- **Implementation:**
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  - High contrast mode
  - Font size options

### 6. Responsive Design
- **Requirement:** Mobile-first approach
- **Implementation:**
  - Mobile-optimized layouts
  - Touch-friendly interactions
  - Responsive grids
  - Adaptive components

### 7. Performance
- **Requirement:** Fast loading
- **Implementation:**
  - Code splitting
  - Lazy loading
  - Image optimization
  - Caching strategies

---

## Functional Requirements Mapping

### Authentication & User Management
- ✅ FR1: Register/Login (needs third-party auth)
- ✅ FR2: Update profile (needs Profile page)
- ✅ FR3: Logout (implemented)
- ❌ FR4: Password reset (needs implementation)

### Student Learning Features
- ⚠️ FR5: Multiple format lessons (text only currently)
- ❌ FR6: AI chatbot (missing)
- ✅ FR7: Practice exercises (implemented)
- ❌ FR8: Milestone questions (missing)
- ❌ FR9: Placement quiz (missing)
- ⚠️ FR10: Lesson completion tracking (basic)
- ❌ FR11: Mistake tracking (missing visualization)
- ⚠️ FR12: Review progress (basic)
- ❌ FR13: Search (missing)

### Classroom Features
- ❌ FR14: Join classes (Classes page empty)
- ❌ FR15: Class-specific content (Classes page empty)
- ❌ FR16: Create classes (Teacher Dashboard missing)
- ❌ FR17: Manage students (Teacher Dashboard missing)
- ❌ FR18: Create content (Teacher Dashboard missing)
- ❌ FR19: Edit/delete content (Teacher Dashboard missing)
- ❌ FR20: Preview content (Teacher Dashboard missing)
- ❌ FR21: Track progress (Teacher Dashboard missing)
- ❌ FR22: DSS (Teacher Dashboard missing)

### Teacher-Student Interaction
- ❌ FR23: Direct chat (Classes page empty)
- ❌ FR24: Comments (Classes page empty)
- ❌ FR25: Reactions (Classes page empty)
- ❌ FR26: Moderation (Classes page empty)

### Interactive Content & Learning Mechanics
- ⚠️ FR27: Interactive questions (MCQ only)
- ⚠️ FR28: Spaced repetition (basic, needs Review Queue)
- ❌ FR29: Three review queues (missing)
- ❌ FR30: Queue integration (missing)
- ❌ FR31: Adaptive timing (missing)
- ❌ FR32: Question movement (missing)

### Gamification & Motivation
- ✅ FR33: XP, levels, progress (implemented)
- ✅ FR34: Achievements (implemented)
- ✅ FR35: Balanced gamification (implemented)
- ❌ FR36: Visual mastery (missing)

### Notification System
- ❌ FR37: Review notifications (missing)
- ❌ FR38: Class material notifications (missing)
- ❌ FR39: Deadline notifications (missing)
- ❌ FR40: Teacher notifications (missing)

### Exam System & Proctoring
- ❌ FR41: Question randomization (missing)
- ❌ FR42: Full-screen lock (missing)
- ❌ FR43: Tab switching prevention (missing)
- ⚠️ FR44: Question types (MCQ, Essay, Interactive - missing Interactive-essay)
- ✅ FR45: Auto-submit (implemented)

---

## Next Steps

1. **Review this document** - Go through each page recommendation
2. **Clarify requirements** - Provide detailed requirements for each feature
3. **Prioritize implementation** - Confirm priority order
4. **Start development** - Begin with Phase 1 critical features

---

## Notes

- This document is based on the project proposal analysis
- All functional requirements (FR) are referenced from the proposal
- Estimated effort levels are rough estimates
- Design suggestions are recommendations and can be adjusted
- All features should maintain bilingual support (Arabic/English)
- Gamification should remain balanced and non-addictive (FR35)

---

**Document Version:** 1.0  
**Last Updated:** Based on project proposal analysis  
**Status:** Ready for review and requirement clarification
