# Progress — Exercises Page & Interactive Question System

This file describes the **final agreed state** of the Exercises feature (architecture, data, UI, and flows). Implementation is tracked in `TODO.md`.

---

## 1. Architecture

### 1.1 Single renderer + strategies

- **One `QuestionRenderer` component** for all interactive questions.
- **Render strategies** define how to render the question body. Each strategy is keyed by `(QuestionType, InteractionMode)`.
- The renderer:
  - Receives `questionBody`, `questionType`, `interactionMode`, `value`, `onChange`, `disabled`.
  - Resolves the strategy from a registry and delegates rendering to it.
- Strategies know how to interpret `questionBody` and produce the right UI (bar chart, graph, inputs, etc.) and how to update the user answer via `onChange`.

### 1.2 Validation

- **Validator registry**: `AnswerValidationType → validator(userAnswer, expectedAnswerBody) → { correct, feedback? }`.
- **Backend** stores per Answer:
  - `answerValidationType` — which validator to use.
  - `expectedAnswerBody` — payload to compare with the submitted answer.
- Frontend (and future backend) use `getValidator(answerValidationType)` and run the validator on submit.

### 1.3 Data model

- **Question**: `questionId`, `lessonId`, `questionHead`, `questionBody` (JSON, max 1kB), `questionType`.
- **User answer**: Modified `questionBody`-like structure with state and any extra data (shape depends on strategy).
- **Answer**: `answerId`, `questionId`, `answerValidationType`, `expectedAnswerBody`.

---

## 2. Types (enums)

- **QuestionType**: e.g. `MATH_GRAPH`, `BAR_CHART`, `MCQ`.
- **InteractionMode**: e.g. `DISPLAY_SELECT`, `FUNCTION_INPUT`, `PARAMETER_ADJUST`, `ADD_POINTS`.
- **AnswerValidationType**: e.g. `EXACT_MATCH_LABEL`, `FUNCTION_EQUIVALENCE`, `NUMERIC_RANGE`, `POINTS_SET_MATCH`.

---

## 3. Routing & entry points

| Source | Route / params | Behavior |
|--------|----------------|----------|
| **Lesson** (Start Exercise) | `/lessons/:lessonId/exercises` | Load exercises for that lesson. Param = lesson id. |
| **Dashboard** (Review Now) | `/exercises?reviewQueue=true` | Load exercises from review queue. |

- Lesson page "Start Exercise" → `/lessons/:id/exercises`.
- Dashboard "Review Now" → `/exercises?reviewQueue=true`.

---

## 4. Mock backend (simulated)

- **Questions**: `fetchQuestionsForLesson(lessonId)`, `fetchQuestionsForReviewQueue()`.
- **Answers**: `fetchAnswerForQuestion(questionId)` → `{ answerId, questionId, answerValidationType, expectedAnswerBody }`.
- Mock data includes questions with `questionType`, `questionBody` (including `interactionMode`), and matching answers with validation schemes.

---

## 5. Exercises page UI (Brilliant-like)

- **Header**: Close (X), progress bar, step dots, points/energy.
- **Main**: Context, question prompt, `QuestionRenderer` (using strategy), "Start over" button.
- **Footer**: "Check" button to submit, validate, and show feedback.

---

## 6. End-to-end flow

1. User reaches Exercises via Lesson or Dashboard (review queue).
2. Page fetches questions (and per-question answers) from mock API.
3. For current question, renderer gets strategy from `(questionType, interactionMode)` and renders the body.
4. User interacts; strategy updates `value` via `onChange`.
5. User clicks "Check" → validator runs → correct/incorrect and optional feedback shown.
6. "Start over" resets current question’s interaction. Step navigation updates progress and dots.

---

## 7. Current implementation status

- **TODO.md** breaks down tasks into Phase 1–6.
- Work is tracked there; this file summarizes the **target final state** only.
