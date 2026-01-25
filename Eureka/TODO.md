# Project TODO List

## Exercises Page & Interactive Question System

**One question renderer per question type.** Each renderer has a **list of strategies** (per InteractionMode) that define how to use `questionBody` to render sub-properties and state. **Validator registry** for answer checking. **Mock backend** stores questions and validation schemes (AnswerValidationType + ExpectedAnswerBody). Brilliant-like UI.

---

### Phase 1: Foundation — Types & Routing ✅

- [x] **1.1** Add `exercises/types.js` with enums:
  - `QuestionType` (e.g. `MATH_GRAPH`, `BAR_CHART`, `MCQ`)
  - `InteractionMode` (e.g. `DISPLAY_SELECT`, `FUNCTION_INPUT`, `PARAMETER_ADJUST`, `ADD_POINTS`)
  - `AnswerValidationType` (e.g. `EXACT_MATCH_LABEL`, `FUNCTION_EQUIVALENCE`, `NUMERIC_RANGE`, `POINTS_SET_MATCH`)
- [x] **1.2** Add routes in `App.jsx`:
  - `/lessons/:lessonId/exercises` — exercises for a lesson (param = lesson id)
  - `/exercises` — supports `?reviewQueue=true` for dashboard review queue
- [x] **1.3** Ensure Lesson page "Start Exercise" navigates to `/lessons/:id/exercises`
- [x] **1.4** Update Dashboard "Review Now" to navigate to `/exercises?reviewQueue=true` (replace current `/solve-exercises?filter=global` link)
- [x] **1.5** Create minimal `Exercises` page component and wire it to both routes (branch on `reviewQueue` vs `lessonId`)

---

### Phase 2: Renderer & Strategies ✅

**Architecture:** One renderer per `QuestionType`. Each renderer owns a list of strategies (keyed by `InteractionMode`) that define how to render `questionBody` sub-properties and state.

- [x] **2.1** Registry: `QuestionType → renderer component` (`getQuestionRenderer(questionType)`). At least `BarChartQuestionRenderer` registered.
- [x] **2.2** Each renderer accepts: `questionType`, `interactionMode`, `questionBody`, `value`, `onChange`, `disabled`.
- [x] **2.3** Each renderer has a **strategies** map: `InteractionMode → strategy`. Strategy defines how to use `questionBody` to render the interactive UI and update `value` via `onChange`.
- [x] **2.4** Renderer resolves strategy by `interactionMode`, delegates rendering to it. Unknown mode → fallback UI.
- [x] **2.5** Implement **BarChart + DisplaySelect** strategy:
  - Renders bar chart from `questionBody`, allows selecting a bar
  - User answer shape: e.g. `{ selectedLabel: "PA" }`

---

### Phase 3: Validators & Validation Schemes ✅

- [x] **3.1** Define validator signature: `(userAnswer, expectedAnswerBody) → { correct: boolean, feedback?: string }`
- [x] **3.2** Create validator registry: `AnswerValidationType → validator function`
  - `getValidator(answerValidationType)` returns the validator (or a safe fallback)
- [x] **3.3** Implement validators for:
  - `EXACT_MATCH_LABEL` (e.g. compare `userAnswer.selectedLabel` to `expectedAnswerBody` string)
  - Optionally: `NUMERIC_RANGE`, `FUNCTION_EQUIVALENCE`, `POINTS_SET_MATCH` (can be stubbed initially)
- [x] **3.4** Document that backend stores **validation schemes** per Answer:
  - `answerValidationType` (which strategy to use)
  - `expectedAnswerBody` (payload compared with submitted answer)
  - Mock API will return these; frontend uses `getValidator` to run validation

---

### Phase 4: Mock Backend (Simulated) ✅

- [x] **4.1** Create mock API module (e.g. `exercises/api/mockQuestions.js` or similar):
  - `fetchQuestionsForLesson(lessonId)` → list of questions
  - `fetchQuestionsForReviewQueue()` → list of questions for review (when `reviewQueue=true`)
- [x] **4.2** Create mock API for answers:
  - `fetchAnswerForQuestion(questionId)` → `{ answerId, questionId, answerValidationType, expectedAnswerBody }`
- [x] **4.3** Add mock data:
  - Sample questions with `questionId`, `lessonId`, `questionHead`, `questionBody` (≤1kB JSON), `questionType`
  - `questionBody` includes `interactionMode` (or it can be inferred)
  - Sample answers with `answerValidationType` and `expectedAnswerBody` matching the validators
- [x] **4.4** Ensure at least one question uses **BarChart + DisplaySelect** and **EXACT_MATCH_LABEL** so the full flow is testable

---

### Phase 5: Exercises Page UI (Brilliant-like) ✅

- [x] **5.1** **Header:**
  - Close (X) button → back to lesson or dashboard
  - Progress bar (e.g. green = completed steps, grey = remaining)
  - Step dots (current step highlighted)
  - Points/energy indicator (e.g. "0" + lightning icon)
- [x] **5.2** **Main content:**
  - Context text (from `questionBody` or `questionHead`)
  - Question prompt/title
  - Render `QuestionRenderer` with current question’s `questionType`, `interactionMode`, `questionBody`
  - "Start over" button → resets current question’s interaction (clear user answer, reset strategy state)
- [x] **5.3** **Footer:**
  - "Check" button → submit current answer, run validator, show correct/incorrect + optional feedback
- [x] **5.4** Wire up state:
  - Current question index, list of questions (from mock API)
  - User answer state per question (or at least current)
  - On "Check": call `getValidator(answer.answerValidationType)`, then `validate(userAnswer, answer.expectedAnswerBody)`, display result
- [x] **5.5** Support both entry modes:
  - From **Lesson**: `lessonId` in route → fetch `fetchQuestionsForLesson(lessonId)`
  - From **Dashboard** (`reviewQueue=true`): fetch `fetchQuestionsForReviewQueue()`

---

### Phase 6: Integration & Polish ✅

- [x] **6.1** Lesson → "Start Exercise" → Exercises page with `lessonId`; questions load for that lesson
- [x] **6.2** Dashboard → "Review Now" → Exercises page with `reviewQueue=true`; questions load from review queue
- [x] **6.3** Full flow: load question → render via strategy → user interacts → "Check" → validate → show feedback
- [x] **6.4** "Start over" clears current question’s user answer and resets the interactive state
- [x] **6.5** Step navigation: previous/next question (if multiple); update progress bar and step dots
- [x] **6.6** Responsive layout, dark mode support, basic accessibility (focus, labels)

---

## Notes

- **Renderer**: One component only; strategies define how to render each `(QuestionType, InteractionMode)`.
- **Validation**: Backend stores only `answerValidationType` + `expectedAnswerBody`; frontend (and future backend) use the validator registry.
- **Mock backend**: All exercise and answer data is simulated; replace with real API when ready.
