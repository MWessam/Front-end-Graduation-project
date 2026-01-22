# Testing Checklist

## General Testing Guidelines

Before marking any page as complete, please verify all items in the checklist below. All tests should be performed in both light and dark modes, and on multiple screen sizes (mobile, tablet, desktop).

---

## 🎯 Student Dashboard (`/student`) - New Requirements

Based on REQUIREMENTS_STUDENT.md Section 2

### Visual Checks

#### Header Section
- [ ] Page loads without errors
- [ ] Student name displays correctly
- [ ] Student grade displays correctly (e.g., "Grade 9", "Grade 10")
- [ ] Quick stats display: XP, level, streak
- [ ] Navigation menu is visible and styled correctly
- [ ] Active link (Dashboard) is highlighted
- [ ] Header is responsive on all devices

#### Review Queue Widget (Top Priority)
- [ ] Review Queue widget appears at top of dashboard (below header)
- [ ] Widget displays: "You have X exercises to review"
- [ ] Count updates in real-time when reviews are added/completed
- [ ] Large, prominent "Review Now" button is visible
- [ ] Visual indicator/badge shows when reviews are pending
- [ ] Color changes based on urgency (normal vs overdue)
- [ ] Widget is always visible (not hidden)
- [ ] Widget is prominent and eye-catching
- [ ] Responsive on mobile/tablet/desktop

#### Notification Center
- [ ] Notification bell icon appears in header
- [ ] Badge shows unread notification count (or hides when count is 0)
- [ ] Clicking bell opens dropdown or navigates to notifications page
- [ ] Quick preview of recent notifications displays
- [ ] Notification types display correctly:
  - [ ] Review queue reminders
  - [ ] New class materials
  - [ ] Upcoming exams/deadlines
  - [ ] Achievement unlocks
  - [ ] Lesson completion reminders
- [ ] Unread notifications are visually distinct
- [ ] Notification dropdown is responsive

#### Active Subjects Section
- [ ] All enrolled subjects are displayed
- [ ] Subject cards show:
  - [ ] Subject name/icon
  - [ ] Progress percentage/bar (0-100%)
  - [ ] Last activity date
  - [ ] Current lesson/topic name
  - [ ] Action buttons ("Continue Learning" or "Start Learning")
- [ ] Subjects with no progress show:
  - [ ] "Start Learning" button
  - [ ] Empty progress state (like Brilliant)
  - [ ] Subject description/preview
- [ ] Progress bars are accurate
- [ ] Card-based layout (similar to Duolingo)
- [ ] Progress visualization (circular or linear)
- [ ] Hover effects work on cards
- [ ] Animations are smooth
- [ ] Grid is responsive:
  - [ ] 1 column on mobile
  - [ ] 2 columns on tablet
  - [ ] 3 columns on desktop

#### Statistics Cards
- [ ] Overall grade/performance card displays
- [ ] Courses completed card displays
- [ ] Upcoming deadlines card displays
- [ ] Recent achievements card displays
- [ ] All statistics are accurate
- [ ] Cards match Brilliant.org/Duolingo style
- [ ] Cards are responsive

#### Recent Activity Feed
- [ ] Latest lessons completed display
- [ ] Recent achievements unlocked display
- [ ] Upcoming assignments/exams display
- [ ] Timestamps are shown
- [ ] Items are clickable and navigate correctly
- [ ] Feed updates in real-time

### Functional Checks

#### Navigation
- [ ] Clicking "Review Now" navigates to `/solve-exercises` with global reviews filter
- [ ] Clicking subject card navigates to `/subjects/:id` (subject roadmap)
- [ ] Clicking "Continue Learning" navigates to subject roadmap
- [ ] Clicking "Start Learning" navigates to subject roadmap
- [ ] All navigation links work correctly
- [ ] Back button works correctly

#### Review Queue
- [ ] Review count updates when reviews are added
- [ ] Review count updates when reviews are completed
- [ ] Urgency indicator changes color based on overdue reviews
- [ ] "Review Now" button is always clickable when reviews exist

#### Notifications
- [ ] Notification count updates in real-time
- [ ] Clicking notification navigates to correct page
- [ ] Notification dropdown closes when clicking outside
- [ ] Marking notifications as read updates the badge

#### Subjects
- [ ] Subject progress is accurate
- [ ] Last activity date is correct
- [ ] Current lesson/topic is accurate
- [ ] Progress bars reflect actual progress
- [ ] Subject cards are interactive

### Data Checks

#### Student Profile Data
- [ ] Student name displays correctly
- [ ] Student grade displays correctly
- [ ] XP value is accurate
- [ ] Level is accurate
- [ ] Streak count is accurate

#### Review Queue Data
- [ ] Review count matches actual pending reviews
- [ ] Count includes all review types (global, subject, lesson)
- [ ] Overdue reviews are identified correctly

#### Subject Data
- [ ] All enrolled subjects are displayed
- [ ] Progress percentages are accurate
- [ ] Last activity dates are correct
- [ ] Current lesson/topic names are correct
- [ ] Subject icons/images display correctly

#### Statistics Data
- [ ] Overall grade is accurate
- [ ] Courses completed count is accurate
- [ ] Upcoming deadlines count is accurate
- [ ] Recent achievements are displayed correctly

### Performance Checks
- [ ] Page loads in < 2 seconds
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth animations (60fps)
- [ ] Lazy loading works for subject cards
- [ ] API calls are optimized

### Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility Checks
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets standards
- [ ] Focus indicators are visible
- [ ] Alt text for images/icons

### Responsive Design Checks
- [ ] Mobile (320px - 768px): Stack vertically, single column
- [ ] Tablet (768px - 1024px): 2-column grid
- [ ] Desktop (1024px+): 3-4 column grid
- [ ] Review queue widget is always visible and prominent
- [ ] All components are readable and usable on all sizes
- [ ] Touch targets are appropriately sized on mobile

### Bilingual Support
- [ ] Arabic text displays correctly (RTL)
- [ ] English text displays correctly (LTR)
- [ ] Language switching works
- [ ] All UI elements support both languages
- [ ] Text doesn't overflow in either language

### Dark Mode
- [ ] Dark mode toggle works
- [ ] All components display correctly in dark mode
- [ ] Colors have sufficient contrast in dark mode
- [ ] Icons are visible in dark mode
- [ ] Text is readable in dark mode

**Status**: ⏳ Pending Implementation

---

## ✅ Legacy Pages (Already Migrated)

### Student Dashboard (Legacy Version)
**Status**: ✅ Basic version completed, needs enhancement to match new requirements

### AllCourses Page (`/courses`)
**Status**: ✅ Ready for Testing

### Assignment Page (`/assignment`)
**Status**: ✅ Ready for Testing

### Concept Page (`/concept`)
**Status**: ✅ Ready for Testing

### ConceptLesson Page (`/concept-lesson`)
**Status**: ✅ Ready for Testing

### Courses Page (`/courses`)
**Status**: ✅ Ready for Testing

### Edit Page (`/edit`)
**Status**: ✅ Ready for Testing

### Landing Page (`/`)
**Status**: ✅ Ready for Testing

### Login Page (`/login`)
**Status**: ✅ Ready for Testing

### OTP Verification Page (`/otp`)
**Status**: ✅ Ready for Testing

### Essay Page (`/essay`)
**Status**: ✅ Ready for Testing

### EssayResult Page (`/essay-result`)
**Status**: ✅ Ready for Testing

### Instructions Page (`/instructions`)
**Status**: ✅ Ready for Testing

### Lectures Page (`/lectures`)
**Status**: ✅ Ready for Testing

### LessonLec Page (`/lesson-lec`)
**Status**: ✅ Ready for Testing

### McqEssay Page (`/mcq-essay`)
**Status**: ✅ Ready for Testing

### Quiz Page (`/quiz`)
**Status**: ✅ Ready for Testing

### Result Page (`/result`)
**Status**: ✅ Ready for Testing

### ResultMcqEssay Page (`/result-mcq-essay`)
**Status**: ✅ Ready for Testing

### Achievements Page (`/achievements`)
**Status**: ✅ Ready for Testing

### TeacherQuiz Page (`/teacher-quiz`)
**Status**: ✅ Ready for Testing

---

## Notes

- Mark items as complete by checking the boxes
- Report any issues found during testing
- Update status as pages are implemented and tested
- All new features should be tested in both light and dark modes
- Test on multiple devices and browsers
- Ensure bilingual support (Arabic/English) works correctly
- Verify accessibility standards are met
