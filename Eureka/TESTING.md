# Testing Checklist

## General Testing Guidelines

Before marking any page as complete, please verify all items in the checklist below.

---

## ✅ Student Dashboard (`/student` or `/`)

### Visual Checks
- [ ] Page loads without errors
- [ ] Sidebar displays correctly with user name "Ahmed Emad"
- [ ] Navigation links are visible and styled correctly
- [ ] Active link (Dashboard) is highlighted in green
- [ ] Main content area displays "My Progress" header
- [ ] Score badge (440 ⭐) appears in top right
- [ ] Three stat cards display: Overall Grade (88%), Courses Completed (4), Upcoming Deadlines (3)
- [ ] Course progress table displays all 5 courses
- [ ] Progress bars show correct percentages
- [ ] Upcoming Assignments section displays 3 assignments
- [ ] Dark mode works (if applicable)

### Functional Checks
- [ ] Clicking "Courses" navigates to `/courses` (page may be empty)
- [ ] Clicking "Assignments" navigates to `/assignment` (page may be empty)
- [ ] Clicking "Quizzes" navigates to `/quiz` (page may be empty)
- [ ] All navigation links are clickable
- [ ] Page is responsive on mobile/tablet/desktop
- [ ] No console errors

### Data Checks
- [ ] Course data displays correctly:
  - Arabic: A+, 95%
  - Programming: B+, 80%
  - Science: A+, 95%
  - English: A+, 90%
  - Maths: B+, 66%
- [ ] Assignment data displays correctly:
  - Psychology Paper 2
  - Problem Solving
  - Art History Essay

### Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

**Status**: ✅ Ready for Testing

---

## ✅ AllCourses Page (`/courses`)

### Visual Checks
- [ ] Page loads without errors
- [ ] Sidebar displays correctly
- [ ] Page title "Courses for all speakers" displays
- [ ] Course grid displays all courses
- [ ] Each course card shows:
  - Course icon/image
  - Course title
  - Course description
  - "Start Learning" button
- [ ] Course cards have hover effect (lift up)
- [ ] Cards animate in on page load
- [ ] Dark mode works (if applicable)

### Functional Checks
- [ ] Navigation from sidebar works
- [ ] "Courses" link is active/highlighted
- [ ] Clicking "Start Learning" button shows "Starting..." text
- [ ] Clicking "Start Learning" navigates to `/lectures` page after 0.5s
- [ ] Course cards are interactive (hover effects work)
- [ ] Page is responsive (mobile/tablet/desktop)
- [ ] Grid adjusts to screen size:
  - 1 column on mobile
  - 2 columns on tablet
  - 3 columns on desktop
- [ ] No console errors

### Data Checks
- [ ] All 12 courses display:
  - Programming
  - English
  - Math
  - Arabic
  - Science
  - Physics
  - French
  - Spanish
  - Italian
  - German
  - History
  - Chemistry
- [ ] Each course has correct icon/image
- [ ] Each course has correct description

### Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

**Status**: ✅ Ready for Testing

---

## ✅ Assignment Page (`/assignment`)

### Visual Checks
- [ ] Page loads without errors
- [ ] Sidebar displays correctly with LearnPro logo
- [ ] User name "Ahmed Emad" displays in sidebar
- [ ] "Assignments" link is active/highlighted
- [ ] Header navigation displays correctly
- [ ] "My Assignments" title displays
- [ ] Current Assignments section shows 4 assignments
- [ ] Completed Assignments section shows 4 assignments
- [ ] Each assignment item displays:
  - Drag indicator icon
  - Quiz name
  - Subject and lesson info
  - Date badge
  - View/Edit/Delete buttons
- [ ] Back and Next buttons display at bottom
- [ ] Dark mode works (if applicable)

### Functional Checks
- [ ] Navigation from sidebar works
- [ ] Clicking "Delete" button removes assignment from list
- [ ] Toast notification appears when deleting
- [ ] Toast notification shows "Task deleted successfully!"
- [ ] Toast notification disappears after 3 seconds
- [ ] Clicking "Edit" button shows toast (functionality coming soon)
- [ ] Clicking "View" button shows toast (functionality coming soon)
- [ ] Back button navigates to previous page
- [ ] "Add Quiz" button is clickable
- [ ] Page is responsive
- [ ] No console errors

### Data Checks
- [ ] Current Assignments display:
  - Quiz 1 (Math)
  - Quiz 2 (Programming)
  - Quiz 3 (English)
  - Quiz 4 (Math)
- [ ] Completed Assignments display:
  - Quiz 1 (Math)
  - Quiz 2 (Programming)
  - Quiz 3 (English)
  - Quiz 4 (Math)
- [ ] All dates show "Oct 30, 2025"
- [ ] Assignment count updates when items are deleted

### Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

**Status**: ✅ Ready for Testing

---

## ⏳ Concept Page (`/concept`)

**Status**: ⏳ Pending Migration

---

## ⏳ ConceptLesson Page (`/concept-lesson`)

**Status**: ⏳ Pending Migration

---

## ⏳ Courses Page (`/courses`)

**Status**: ⏳ Pending Migration

---

## ⏳ Edit Page (`/edit`)

**Status**: ⏳ Pending Migration

---

## ⏳ Essay Page (`/essay`)

**Status**: ⏳ Pending Migration

---

## ⏳ EssayResult Page (`/essay-result`)

**Status**: ⏳ Pending Migration

---

## ⏳ Instructions Page (`/instructions`)

**Status**: ⏳ Pending Migration

---

## ⏳ Lectures Page (`/lectures`)

**Status**: ⏳ Pending Migration

---

## ⏳ LessonLec Page (`/lesson-lec`)

**Status**: ⏳ Pending Migration

---

## ⏳ McqEssay Page (`/mcq-essay`)

**Status**: ⏳ Pending Migration

---

## ⏳ Quiz Page (`/quiz`)

**Status**: ⏳ Pending Migration

---

## ⏳ Result Page (`/result`)

**Status**: ⏳ Pending Migration

---

## ⏳ ResultMcqEssay Page (`/result-mcq-essay`)

**Status**: ⏳ Pending Migration

---

## ⏳ Achievements Page (`/achievements`)

**Status**: ⏳ Pending Migration

---

## ⏳ TeacherQuiz Page (`/teacher-quiz`)

**Status**: ⏳ Pending Migration

---

## Notes

- Mark items as complete by checking the boxes
- Report any issues found during testing
- Update status as pages are migrated and tested
