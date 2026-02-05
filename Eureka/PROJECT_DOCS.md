# Eureka Project Documentation

## 1. Project Overview
Eureka is a modern educational platform frontend built with React and Vite. It provides a comprehensive interface for students and teachers, featuring interactive lessons, quizzes, assignment management, and a dashboard for tracking progress.

## 2. Technical Stack
- **Framework:** React 18+ (Functional Components & Hooks)
- **Build Tool:** Vite (Fast HMR & Bundling)
- **Language:** JavaScript (ES Modules) *with TypeScript configuration available for future migration*
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`) & React Context
- **Routing:** React Router DOM v6
- **Styling:** CSS (Co-located with components) & CSS Modules approach
- **Icons:** Lucide React

## 3. Architecture & Project Structure

The project follows a **Feature-Based** and **Domain-Driven** directory structure, ensuring scalability and maintainability.

### Directory Breakdown
```
src/
├── components/       # Shared UI components (Buttons, Sidebars, Cards)
│   ├── admin/        # Admin-specific UI components
│   └── ...
├── pages/            # Page-level components (Route targets)
│   ├── admin/        # Admin pages (Dashboard, Editors)
│   ├── Landing.jsx   # Public landing page
│   ├── Login.jsx     # Authentication
│   └── ...
├── exercises/        # Core Domain Logic for Interactive Questions
│   ├── renderers/    # Components to render specific question types (Strategy Pattern)
│   ├── validators/   # Logic to validate user answers against expected answers
│   └── types.js      # Centralized Type Definitions & Enums
├── services/         # Data Access Layer (API Abstraction)
│   └── contentService.js # Mock backend implementation using LocalStorage
├── store/            # Redux Global State
│   ├── slices/       # Redux Slices (e.g., cardsSlice)
│   └── index.js      # Store configuration
└── hooks/            # Custom React Hooks (e.g., useStudentData)
```

### Key Architectural Patterns

#### 1. Service Layer Pattern
Direct `localStorage` or API calls are **forbidden** in UI components. All data fetching and persistence logic is encapsulated in `src/services/`.
- **Example:** `contentService.js` handles all CRUD operations for lessons and questions.
- **Benefit:** Allows easy swapping of the mock backend with a real REST/GraphQL API in the future without changing UI code.

#### 2. Interactive Exercise Engine (Strategy Pattern)
The `src/exercises/` directory implements a flexible engine for rendering different types of educational questions.
- **Renderers:** `BarChartQuestionRenderer`, `MathGraphQuestionRenderer`, etc., are dynamically selected based on `QuestionType`.
- **Validators:** Answer validation logic is decoupled from rendering. `validators/` contains pure functions like `numericRange` or `exactMatchLabel` to verify answers.

#### 3. Component Co-location
Styles are co-located with their components.
- `Sidebar.jsx` and `Sidebar.css` live together.
- This ensures that deleting a component also removes its styles, preventing CSS bloat.

#### 4. Redux Toolkit
Global state (like user progress or lesson data) is managed via Redux Toolkit slices, reducing boilerplate and ensuring immutable state updates.

## 4. Best Practices & Standards

### Coding Standards
- **Functional Components:** All components are functional and use Hooks (`useState`, `useEffect`, `useDispatch`).
- **Naming Conventions:**
  - Components: `PascalCase` (e.g., `TeacherDashboard.jsx`)
  - Functions/Variables: `camelCase` (e.g., `fetchStudentData`)
  - Constants: `UPPER_SNAKE_CASE` (e.g., `QUESTION_TYPES`)
- **Prop Drilling:** Avoided where possible; use Redux for global state or Composition for deep trees.

### Development Workflow
1. **Mock First:** New features are built using the `contentService` mock backend first.
2. **Type Safety:** While currently JS, the project uses `types.js` to define "Enum-like" constants to prevent magic strings.
3. **Responsive Design:** CSS is written to support mobile, tablet, and desktop views (responsive-first).

## 5. Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 6. Testing Strategy
Refer to `TESTING.md` for detailed testing phases, specifically for the Interactive Question System. Testing should cover:
- **Unit:** Validators (pure functions).
- **Integration:** Renderers correctly displaying data and handling user interaction.
- **E2E:** Full flows (Lesson -> Exercise -> Result).
