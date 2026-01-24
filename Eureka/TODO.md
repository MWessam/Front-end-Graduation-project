# Project TODO List

## Exercises Page & Interactive Question System

Single **QuestionRenderer** component plus **render strategies** (per QuestionType + InteractionMode) that tell it how to render the question body. **Validator registry** for answer checking. **Mock backend** stores questions and validation schemes (AnswerValidationType + ExpectedAnswerBody). Brilliant-like UI.

---

### Phase 1: Foundation — Types & Routing

- [ ] **1.1** Add `exercises/types.js` with enums:
  - `QuestionType` (e.g. `MATH_GRAPH`, `BAR_CHART`, `MCQ`)
  - `InteractionMode` (e.g. `DISPLAY_SELECT`, `FUNCTION_INPUT`, `PARAMETER_ADJUST`, `ADD_POINTS`)
  - `AnswerValidationType` (e.g. `EXACT_MATCH_LABEL`, `FUNCTION_EQUIVALENCE`, `NUMERIC_RANGE`, `POINTS_SET_MATCH`)
- [ ] **1.2** Add routes in `App.jsx`:
  - `/lessons/:lessonId/exercises` — exercises for a lesson (param = lesson id)
  - `/exercises` — supports `?reviewQueue=true` for dashboard review queue
- [ ] **1.3** Ensure Lesson page "Start Exercise" navigates to `/lessons/:id/exercises`
- [ ] **1.4** Update Dashboard "Review Now" to navigate to `/exercises?reviewQueue=true` (replace current `/solve-exercises?filter=global` link)
- [ ] **1.5** Create minimal `Exercises` page component and wire it to both routes (branch on `reviewQueue` vs `lessonId`)

---

### Phase 2: Renderer & Strategies

- [ ] **2.1** Create single `QuestionRenderer` component that accepts:
  - `questionBody` (JSON)
  - `questionType`, `interactionMode` (or derived from `questionBody`)
  - `value` (user answer), `onChange`, `disabled`
- [ ] **2.2** Define **render strategy** interface:
  - Strategy receives `questionBody`, `value`, `onChange`, `disabled`
  - Strategy is responsible for rendering the interactive UI (chart, inputs, graph, etc.) and updating `value` via `onChange`
- [ ] **2.3** Create strategy registry: `(QuestionType, InteractionMode) → strategy`
  - `getRenderStrategy(questionType, interactionMode)` returns the strategy (or a no-op/fallback)
  - Optional: `registerRenderStrategy(questionType, interactionMode, strategy)` for extensibility
- [ ] **2.4** Implement `QuestionRenderer` to:
  - Resolve strategy from registry using `questionType` + `interactionMode`
  - Delegate rendering to the strategy (strategy renders the question body)
- [ ] **2.5** Implement at least one concrete strategy (e.g. **BarChart + DisplaySelect**):
  - Strategy renders a bar chart from `questionBody` and allows selecting a bar
  - User answer shape: e.g. `{ selectedLabel: "PA" }`
  - Wire it in the registry for `BAR_CHART` + `DISPLAY_SELECT`

---

### Phase 3: Validators & Validation Schemes

- [ ] **3.1** Define validator signature: `(userAnswer, expectedAnswerBody) → { correct: boolean, feedback?: string }`
- [ ] **3.2** Create validator registry: `AnswerValidationType → validator function`
  - `getValidator(answerValidationType)` returns the validator (or a safe fallback)
- [ ] **3.3** Implement validators for:
  - `EXACT_MATCH_LABEL` (e.g. compare `userAnswer.selectedLabel` to `expectedAnswerBody` string)
  - Optionally: `NUMERIC_RANGE`, `FUNCTION_EQUIVALENCE`, `POINTS_SET_MATCH` (can be stubbed initially)
- [ ] **3.4** Document that backend stores **validation schemes** per Answer:
  - `answerValidationType` (which strategy to use)
  - `expectedAnswerBody` (payload compared with submitted answer)
  - Mock API will return these; frontend uses `getValidator` to run validation

---

### Phase 4: Mock Backend (Simulated)

- [ ] **4.1** Create mock API module (e.g. `exercises/api/mockQuestions.js` or similar):
  - `fetchQuestionsForLesson(lessonId)` → list of questions
  - `fetchQuestionsForReviewQueue()` → list of questions for review (when `reviewQueue=true`)
- [ ] **4.2** Create mock API for answers:
  - `fetchAnswerForQuestion(questionId)` → `{ answerId, questionId, answerValidationType, expectedAnswerBody }`
- [ ] **4.3** Add mock data:
  - Sample questions with `questionId`, `lessonId`, `questionHead`, `questionBody` (≤1kB JSON), `questionType`
  - `questionBody` includes `interactionMode` (or it can be inferred)
  - Sample answers with `answerValidationType` and `expectedAnswerBody` matching the validators
- [ ] **4.4** Ensure at least one question uses **BarChart + DisplaySelect** and **EXACT_MATCH_LABEL** so the full flow is testable

---

### Phase 5: Exercises Page UI (Brilliant-like)

- [ ] **5.1** **Header:**
  - Close (X) button → back to lesson or dashboard
  - Progress bar (e.g. green = completed steps, grey = remaining)
  - Step dots (current step highlighted)
  - Points/energy indicator (e.g. "0" + lightning icon)
- [ ] **5.2** **Main content:**
  - Context text (from `questionBody` or `questionHead`)
  - Question prompt/title
  - Render `QuestionRenderer` with current question’s `questionType`, `interactionMode`, `questionBody`
  - "Start over" button → resets current question’s interaction (clear user answer, reset strategy state)
- [ ] **5.3** **Footer:**
  - "Check" button → submit current answer, run validator, show correct/incorrect + optional feedback
- [ ] **5.4** Wire up state:
  - Current question index, list of questions (from mock API)
  - User answer state per question (or at least current)
  - On "Check": call `getValidator(answer.answerValidationType)`, then `validate(userAnswer, answer.expectedAnswerBody)`, display result
- [ ] **5.5** Support both entry modes:
  - From **Lesson**: `lessonId` in route → fetch `fetchQuestionsForLesson(lessonId)`
  - From **Dashboard** (`reviewQueue=true`): fetch `fetchQuestionsForReviewQueue()`

---

### Phase 6: Integration & Polish

- [ ] **6.1** Lesson → "Start Exercise" → Exercises page with `lessonId`; questions load for that lesson
- [ ] **6.2** Dashboard → "Review Now" → Exercises page with `reviewQueue=true`; questions load from review queue
- [ ] **6.3** Full flow: load question → render via strategy → user interacts → "Check" → validate → show feedback
- [ ] **6.4** "Start over" clears current question’s user answer and resets the interactive state
- [ ] **6.5** Step navigation: previous/next question (if multiple); update progress bar and step dots
- [ ] **6.6** Responsive layout, dark mode support, basic accessibility (focus, labels)

---

## Notes

- **Renderer**: One component only; strategies define how to render each `(QuestionType, InteractionMode)`.
- **Validation**: Backend stores only `answerValidationType` + `expectedAnswerBody`; frontend (and future backend) use the validator registry.
- **Mock backend**: All exercise and answer data is simulated; replace with real API when ready.
