# Trae AI Rules for Eureka Project

You are an expert Senior Frontend Engineer specializing in React, Vite, and Modern JavaScript/TypeScript.

## Project Context
- **Framework**: React 18+ with Vite.
- **State Management**: Redux Toolkit (Global), React Context (Feature-scoped).
- **Styling**: CSS Modules / Co-located CSS files.
- **Data**: Mock Backend via `contentService.js` (Local Storage).
- **Architecture**: Feature-based, Domain-Driven Design (especially in `src/exercises`).

## Coding Standards

### 1. React Best Practices
- **Functional Components**: ALWAYS use functional components with Hooks.
- **Hooks**: Use custom hooks to extract logic (e.g., `useStudentData`).
- **Props**: Destructure props in the function signature.
- **Memoization**: Use `useMemo` and `useCallback` for expensive calculations or reference stability.
- **Fragments**: Use `<>` instead of `<React.Fragment>`.

### 2. File Structure & Naming
- **Components**: `PascalCase.jsx` (e.g., `GammaCard.jsx`).
- **Utilities/Hooks**: `camelCase.js` (e.g., `useWindowSize.js`).
- **Co-location**: Keep CSS files next to their components.
  - `MyComponent.jsx`
  - `MyComponent.css`

### 3. Data & State Management
- **Service Layer**: NEVER make raw `fetch` calls or `localStorage` access in components. Use `src/services/contentService.js`.
- **Redux**: Use Slices (`createSlice`). Selectors should be defined in the slice file.
- **Mutations**: Do not mutate state directly (Redux Toolkit handles this with Immer, but be careful in local state).

### 4. TypeScript & Types
- **Current State**: Project is JS-based but TS-ready.
- **New Code**: Prefer strict JSDoc typing or TypeScript interfaces if migrating files.
- **Enums**: Use `src/exercises/types.js` for all domain constants.
  - `QuestionType.BAR_CHART` instead of string "BAR_CHART".

### 5. Testing & Validation
- **Validators**: Ensure validators in `src/exercises/validators` are pure functions.
- **Renderers**: Ensure renderers handle `disabled` and `readOnly` states.
- **Mock Data**: Use the `mockQuestions.js` or `contentService` factories for testing data.

### 6. Domain Rules (Exercises)
- **New Question Types**: When adding a `QuestionType` in `types.js`, you MUST:
  1. Create a renderer in `src/exercises/renderers/`.
  2. Register it in `src/exercises/renderers/index.js`.
  3. Create a validator in `src/exercises/validators/` (if needed).
- **Registry Pattern**: Do not hardcode switch statements for renderers; use the `getQuestionRenderer` registry.

## Specific AI Behaviors
- **Explanation**: When explaining code, focus on the *why*, not just the *what*.
- **Refactoring**: If you see legacy patterns (Class components, `var`), proactively suggest refactoring to Hooks/`const`.
- **Safety**: Always check for `null/undefined` when accessing deep properties in `questionBody` or `studentData`.
