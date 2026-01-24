# Testing — Exercises Page & Interactive Question System

Test **at the end of each phase** (and after full integration). Use both light and dark modes, and multiple viewports (mobile, tablet, desktop) where relevant.

---

## After Phase 1: Foundation — Types & Routing

- [ ] **Types**: `exercises/types.js` (or equivalent) exports `QuestionType`, `InteractionMode`, `AnswerValidationType`. No runtime errors when importing.
- [ ] **Routes**: Visiting `/lessons/1/exercises` and `/exercises?reviewQueue=true` renders the Exercises page (or placeholder) without crashing.
- [ ] **Lesson**: From a lesson page, "Start Exercise" navigates to `/lessons/:id/exercises` with the correct lesson id.
- [ ] **Dashboard**: "Review Now" navigates to `/exercises?reviewQueue=true`.
- [ ] **App**: Both routes are registered in `App.jsx`; no console errors on navigation.
- [ ] **Params**: Exercises page correctly reads `lessonId` from route params and `reviewQueue` from query (when applicable).

---

## After Phase 2: Renderer & Strategies

- [ ] **QuestionRenderer**: Component accepts `questionBody`, `questionType`, `interactionMode`, `value`, `onChange`, `disabled` and renders without error.
- [ ] **Strategy registry**: `getRenderStrategy(questionType, interactionMode)` returns a strategy; unknown pairs return a safe fallback (e.g. "Unknown question type").
- [ ] **BarChart + DisplaySelect**: For a question with `BAR_CHART` + `DISPLAY_SELECT`, the renderer shows a bar chart and allows selecting a bar; `onChange` is called with the expected user-answer shape (e.g. `{ selectedLabel }`).
- [ ] **Controlled state**: Parent can control `value` and `disabled`; renderer reflects them (e.g. disabled prevents selection).

---

## After Phase 3: Validators & Validation Schemes

- [ ] **Registry**: `getValidator(answerValidationType)` returns a function; unknown type returns a fallback that yields `{ correct: false }` (or similar).
- [ ] **EXACT_MATCH_LABEL**: Validator returns `{ correct: true }` when `userAnswer.selectedLabel` matches `expectedAnswerBody`; `{ correct: false, feedback? }` otherwise.
- [ ] **Pure functions**: Validators have no side effects; same inputs always give same result.
- [ ] **Docs**: Validation scheme storage (Answer: `answerValidationType` + `expectedAnswerBody`) is documented or apparent in code.

---

## After Phase 4: Mock Backend

- [ ] **Fetch questions**: `fetchQuestionsForLesson(lessonId)` and `fetchQuestionsForReviewQueue()` return arrays of questions with `questionId`, `lessonId`, `questionHead`, `questionBody`, `questionType`.
- [ ] **Fetch answers**: `fetchAnswerForQuestion(questionId)` returns `{ answerId, questionId, answerValidationType, expectedAnswerBody }`.
- [ ] **BarChart + EXACT_MATCH**: At least one mock question uses BarChart + DisplaySelect and a matching answer with `EXACT_MATCH_LABEL` and a string `expectedAnswerBody`.
- [ ] **Data shape**: `questionBody` includes (or allows inferring) `interactionMode`; structure is consistent with render strategies and validators.

---

## After Phase 5: Exercises Page UI (Brilliant-like)

- [ ] **Header**: Close (X), progress bar, step dots, and points/energy indicator are present and laid out correctly.
- [ ] **Main**: Context, question prompt, `QuestionRenderer` output, and "Start over" button are visible.
- [ ] **Footer**: "Check" button is present and clearly actionable.
- [ ] **Modes**: With `lessonId` in route, page fetches lesson questions; with `reviewQueue=true`, page fetches review-queue questions.
- [ ] **State**: User answer state is maintained; "Check" triggers validation and shows correct/incorrect (and optional feedback).
- [ ] **Start over**: "Start over" clears the current question’s user answer and resets the interactive state.
- [ ] **Responsive**: Layout works on mobile, tablet, and desktop; no horizontal overflow.
- [ ] **Dark mode**: All UI elements remain readable and usable in dark mode.

---

## After Phase 6: Integration & Polish

- [ ] **Lesson → Exercises**: From a lesson, "Start Exercise" → Exercises page loads; questions for that lesson appear.
- [ ] **Dashboard → Exercises**: "Review Now" → Exercises page with `reviewQueue=true`; review-queue questions load.
- [ ] **Full flow**: Load question → interact (e.g. select bar) → "Check" → validator runs → feedback displayed.
- [ ] **Correct/incorrect**: Submitting correct answer shows success; incorrect shows failure and optional feedback.
- [ ] **Step navigation**: Previous/next (if multiple questions) updates current question, progress bar, and step dots.
- [ ] **Close**: Close (X) returns to lesson or dashboard as appropriate.
- [ ] **Accessibility**: Focus order and labels are reasonable; keyboard users can reach key controls.
- [ ] **Console**: No errors or warnings during normal use.

---

## Final smoke tests (full feature)

- [ ] **Lesson flow**: Subject roadmap → Lesson → "Start Exercise" → Exercises → complete at least one question → "Check" → see feedback.
- [ ] **Review flow**: Dashboard → "Review Now" → Exercises → complete at least one question → "Check" → see feedback.
- [ ] **Multi-question**: With multiple questions, step navigation and progress indicators update correctly.
- [ ] **Start over**: After interacting, "Start over" resets the question; user can answer again and "Check" works.
- [ ] **No regressions**: Existing Lesson, Dashboard, and routing behavior still work as before.
