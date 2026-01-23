# Teacher Panel Migration (Pure HTML → React)

This checklist tracks **only the Teacher Panel pages** coming from:

`Pure Project/Project Graduate/Project Graduate/`

## Rules (per your instructions)

- **A task = one page**
- We progress **one page at a time**
- We **do not start the next page** until you approve the current page

---

## Routes + mapping

- **Teacher Dashboard**: `index.html` → `/teacher` (and `/teacher/dashboard`) → `src/pages/TeacherDashboard.jsx`
- **Teacher Class**: `class.html` → `/teacher/class/:id?` → `src/pages/TeacherClass.jsx`
- **Teacher Library**: `library.html` → `/teacher/library` → `src/pages/TeacherLibrary.jsx`
- **Assign Activity**: `assign-activity.html` → `/teacher/assign-activity` → `src/pages/TeacherAssignActivity.jsx`
- **Students**: `students.html` → `/teacher/students` → `src/pages/TeacherStudents.jsx`
- **Chat**: `chat.html` → `/teacher/chat/:id?` → `src/pages/TeacherChat.jsx`
- **Notifications**: `notifications.html` → `/teacher/notifications` → `src/pages/TeacherNotifications.jsx`

---

## ✅ Completed Tasks

### ✅ Teacher Dashboard (from `index.html`) - APPROVED
- [x] Scaffold page + CSS file created
- [x] Migrate HTML layout → JSX
- [x] Migrate CSS (global + page CSS) into Eureka styling approach
- [x] Port JS behaviors to React (state/hooks)
- [x] Replace `<a href="...">` with React Router navigation
- [x] Verify no console errors + passes smoke tests
- [x] ✅ Approved by Medow

### ✅ Teacher Class (from `class.html`) - APPROVED
- [x] Scaffold page + CSS file created
- [x] Migrate HTML layout → JSX
- [x] Migrate CSS (global + page CSS)
- [x] Port JS behaviors to React (tabs/modals/basic exam creation)
- [x] Replace links with React Router navigation
- [x] Verify no console errors + passes smoke tests
- [x] ✅ Approved by Medow

---

## Current task (do not advance without approval)

### ⬜ Teacher Library (from `library.html`)
- [x] Scaffold page + CSS file created
- [x] Migrate HTML layout → JSX
- [x] Migrate CSS (global + page CSS)
- [x] Port JS behaviors to React (filters/search/modals)
- [x] Replace links with React Router navigation
- [ ] Verify no console errors + passes smoke tests
- [ ] ✅ Approved by Medow (required to proceed)

---

## Remaining tasks (pages)

### ⬜ Teacher Assign Activity (from `assign-activity.html`)
- [x] Scaffold page + CSS file created
- [ ] Migrate HTML layout → JSX
- [ ] Migrate CSS (global + page CSS)
- [ ] Port JS behaviors to React (wizard steps/selection)
- [ ] Replace links with React Router navigation
- [ ] Verify no console errors + passes smoke tests
- [ ] ✅ Approved by Medow

### ⬜ Teacher Students (from `students.html`)
- [x] Scaffold page + CSS file created
- [ ] Migrate HTML layout → JSX
- [ ] Migrate CSS (global + page CSS)
- [ ] Port JS behaviors to React (search/filter/pagination/modals)
- [ ] Replace links with React Router navigation
- [ ] Verify no console errors + passes smoke tests
- [ ] ✅ Approved by Medow

### ⬜ Teacher Chat (from `chat.html`)
- [x] Scaffold page + CSS file created
- [ ] Migrate HTML layout → JSX
- [ ] Migrate CSS (global + page CSS)
- [ ] Port JS behaviors to React (messages/search/modals)
- [ ] Replace links with React Router navigation
- [ ] Verify no console errors + passes smoke tests
- [ ] ✅ Approved by Medow

### ⬜ Teacher Notifications (from `notifications.html`)
- [x] Scaffold page + CSS file created
- [ ] Migrate HTML layout → JSX
- [ ] Migrate CSS (global + page CSS)
- [ ] Port JS behaviors to React (filters/actions/settings modal)
- [ ] Replace links with React Router navigation
- [ ] Verify no console errors + passes smoke tests
- [ ] ✅ Approved by Medow

