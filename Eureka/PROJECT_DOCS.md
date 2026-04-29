# Eureka Project Documentation

## 1. Project Overview
Eureka is a modern educational platform frontend built with React and Vite. It provides a comprehensive interface for students and teachers, featuring interactive lessons, quizzes, assignment management, and a dashboard for tracking progress.

### Current State
- **Phase:** Frontend prototype with mock backend (localStorage)
- **Auth:** Context-based mock authentication with Protected Routes
- **Data:** All data stored in localStorage via `contentService`

---

## 2. Technical Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | React | 18.2+ |
| **Build Tool** | Vite | 5.x |
| **Language** | JavaScript (ES Modules) | — |
| **State Management** | Redux Toolkit | 2.11+ |
| **Routing** | React Router DOM (with Lazy Loading) | 6.30+ |
| **Testing** | Vitest + React Testing Library | 1.3+ |
| **Drag & Drop** | dnd-kit | 6.3+ |
| **Rich Text Editor** | BlockNote (TipTap-based) + Mantine | latest |
| **Animation** | Framer Motion | 12.29+ |
| **Icons** | Lucide React + Material Icons (CDN) + Font Awesome (CDN) | mixed |
| **CSS** | Tailwind (CDN) + component-level CSS files | mixed |
| **TypeScript** | Config present, not adopted in source | 5.x configs |

---

## 3. Architecture & Patterns

### 3.1 Feature-First Directory Layout

```
src/
├── components/       Shared UI (Sidebar, NotificationCenter, ErrorBoundary)
│   ├── admin/        Admin-specific UI (GammaCard, BlockNoteEditor)
│   ├── teacher/      Teacher-specific UI (ClassCard, DashboardModals)
│   └── ProtectedRoute.jsx Auth route guards
├── context/          React Context (AuthContext)
├── pages/            Page-level route targets (Lazy Loaded)
│   └── admin/        Admin pages
├── test/             Testing setup and helpers
```

### 3.2 Key Architectural Patterns

#### 1. Role-Based Access Control (RBAC)
Routes are protected by a `ProtectedRoute` component that checks for an active session in `AuthContext` and validates the user's role (`student`, `teacher`, or `admin`).

#### 2. Error Resilience
A global `ErrorBoundary` wraps the application to catch runtime errors and provide a graceful fallback UI instead of a blank screen.

#### 3. Performance Optimization (Code Splitting)
All routes are dynamically imported using `React.lazy` and `Suspense`, ensuring the initial bundle only contains essential code.

#### 4. Service Layer Pattern
All data CRUD goes through `src/services/contentService.js`. UI components never touch `localStorage` directly.

---

## 11. Build & Configuration

### 11.1 NPM Scripts

```json
{
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint .",
    "format": "prettier --write ."
}
```

---

## 12. Audit Findings (Updated 2026-04-27)

### 12.1 Critical Issues (Resolved)

| # | Issue | Status |
|---|-------|--------|
| C1 | **No authentication** | ✅ Resolved: Mock AuthContext implemented |
| C2 | **No route guards** | ✅ Resolved: ProtectedRoute implemented for all roles |
| C3 | **ESLint doesn't cover JS files** | ✅ Resolved: Updated eslint.config.js |
| C4 | **No error boundaries** | ✅ Resolved: ErrorBoundary component added |

### 12.2 High Severity (Partially Resolved)

| # | Issue | Status |
|---|-------|--------|
| H1 | **TeacherDashboard monolithic** | ✅ Resolved: Split into sub-components |
| H2 | **Tailwind via CDN** | ⏸️ Ignored per user request |
| H3 | **No test infrastructure** | ✅ Resolved: Vitest + setup implemented |
| H4 | **No 404/error route** | ✅ Resolved: NotFound page added |
| H5 | **No lazy loading** | ✅ Resolved: Suspense + lazy implemented |
| H6 | **Mixed icon libraries** | ⏸️ Ignored per user request |
