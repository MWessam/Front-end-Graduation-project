# Exercises System — Walkthrough & Flow

This document explains how the **Exercises** feature works: architecture, data flow, and step-by-step user journey. It accompanies the interactive exercise UI (Brilliant-style, full-screen) used from Lesson pages and the Dashboard review queue.

---

## 1. Overview

The Exercises system lets students:

- **From a Lesson:** Complete exercises tied to that lesson (e.g. “What state has about 400 cafes?” with a bar chart).
- **From the Dashboard:** Work through a **review queue** of exercises from various lessons.

Exercises are **interactive**: the student interacts with a question (e.g. selecting a bar, typing a function, adjusting parameters), then clicks **Check** to validate. The UI shows correct/incorrect feedback.

The implementation uses:

- **One renderer per question type** (e.g. `BarChartQuestionRenderer`).
- **Strategies per renderer** (per `InteractionMode`) that define how to render `questionBody` and handle input.
- A **validator registry** keyed by `AnswerValidationType` to check submitted answers.
- A **mock API** that returns questions and answers (validation schemes). This can be replaced by a real backend later.

---

## 2. Entry Points & Routing

### 2.1 How you get to Exercises

| Source | Action | URL | Effect |
|--------|--------|-----|--------|
| **Lesson page** | Click “Start Exercise” | `/lessons/:lessonId/exercises` | Exercises for that lesson |
| **Dashboard** | Click “Review Now” (Review Queue) | `/exercises?reviewQueue=true` | Review-queue exercises |

### 2.2 Routes (`App.jsx`)

```text
/lessons/:lessonId/exercises  →  <Exercises />
/exercises                    →  <Exercises />   (query ?reviewQueue=true used for review mode)
```

The **same** `Exercises` page is used for both. It decides the mode from:

- **`lessonId`** in route params → lesson mode.
- **`reviewQueue=true`** in query → review-queue mode.

### 2.3 Where the links live

- **Lesson** (`Lesson.jsx`): “Start Exercise” calls `navigate(\`/lessons/${id}/exercises\`)`. The lesson’s `id` from `/lessons/:id` becomes `lessonId` on the exercises route.
- **Dashboard** (`Student.jsx`): “Review Now” is a `Link` to `/exercises?reviewQueue=true`.

---

## 3. Data Models

### 3.1 Question

Stored per question (e.g. from backend or mock API):

| Field | Type | Description |
|-------|------|-------------|
| `questionId` | string | Primary key |
| `lessonId` | string | Foreign key to lesson |
| `questionHead` | object (JSON, <= 1kB>) | Title / prompt (e.g. “What state has about 400 cafes?”) |
| `questionBody` | object (JSON, ≤1kB) | Payload for the renderer: context, chart data, etc. |
| `questionType` | enum | `QuestionType` (e.g. `BAR_CHART`, `MATH_GRAPH`, `MCQ`) |
| `InteractionMode` | enum | `InteractionMode` (e.g. `BAR_CHART`, `MATH_GRAPH`, `MCQ`) |

`questionBody` typically includes `interactionMode` (e.g. `DISPLAY_SELECT`) and type-specific data (e.g. `context`, `chart.data` for bar charts).

### 3.2 User answer

The **current answer** for a question. Shape depends on the renderer/strategy:

- **BarChart + DisplaySelect:** `{ selectedLabel: "PA" }`.
- **Function input:** `{ functions: [{ expr: "x^2" }] }`.
- **Parameter adjust:** `{ params: { a: 2, b: -1 } }`.

The Exercises page keeps `userAnswers` keyed by question index (or could be keyed by `questionId`). The renderer updates this via `onChange(value)`.

### 3.3 Answer (validation scheme)

Stored per question, describes **how** to validate and **what** is correct:

| Field | Type | Description |
|-------|------|-------------|
| `answerId` | string | Primary key |
| `questionId` | string | Links to question |
| `answerValidationType` | enum | `AnswerValidationType` (e.g. `EXACT_MATCH_LABEL`) |
| `expectedAnswerBody` | any | Compared with user answer (e.g. `"PA"` for `EXACT_MATCH_LABEL`) |

The frontend (and future backend) use `answerValidationType` to pick a validator and `expectedAnswerBody` as its second argument.

---

## 4. Types (Enums)

Defined in `src/exercises/types.js`:

### 4.1 `QuestionType`

What kind of question it is (determines which **renderer** to use):

- `MATH_GRAPH`
- `BAR_CHART`
- `MCQ`

### 4.2 `InteractionMode`

How the user interacts (determines which **strategy** inside a renderer):

- `DISPLAY_SELECT` — select from existing elements (e.g. bars, points)
- `FUNCTION_INPUT` — type function(s)
- `PARAMETER_ADJUST` — adjust parameters (sliders, etc.)
- `ADD_POINTS` — add data points

### 4.3 `AnswerValidationType`

Which **validator** to use:

- `EXACT_MATCH_LABEL` — match `userAnswer.selectedLabel` to `expectedAnswerBody`
- `FUNCTION_EQUIVALENCE`
- `NUMERIC_RANGE`
- `POINTS_SET_MATCH`

---

## 5. Architecture

### 5.1 One renderer per `QuestionType`

- **Registry:** `QuestionType →` React component (e.g. `BAR_CHART → BarChartQuestionRenderer`).
- **Lookup:** `getQuestionRenderer(questionType)` returns the component or `null`.
- **Registration:** `registerQuestionRenderer(questionType, component)` for extensibility.

### 5.2 Strategies per renderer

Each renderer owns a **list of strategies** keyed by `InteractionMode`:

- A strategy knows how to **render** `questionBody` (e.g. bar chart, inputs) and how to **update** the user answer via `onChange`.
- The renderer receives `questionType`, `interactionMode`, `questionBody`, `value`, `onChange`, `disabled`, picks the strategy for `interactionMode`, and delegates rendering to it.
- If there is no strategy for the mode, the renderer shows a fallback (e.g. “Bar chart does not support interaction mode: …”).

### 5.3 Validator registry

- **Registry:** `AnswerValidationType →` function `(userAnswer, expectedAnswerBody) → { correct, feedback? }`.
- **Lookup:** `getValidator(answerValidationType)`. Unknown type returns a fallback that yields `{ correct: false }`.

Validators are **pure** and **stateless** so the same logic can run on a backend.

---

## 6. File Structure

```text
src/
  exercises/
    types.js                    # QuestionType, InteractionMode, AnswerValidationType
    renderers/
      index.js                  # getQuestionRenderer, registerQuestionRenderer, registry
      BarChartQuestionRenderer.jsx
      BarChartQuestionRenderer.css
    validators/
      index.js                  # getValidator, registry
      exactMatchLabel.js        # EXACT_MATCH_LABEL validator
    api/
      mockQuestions.js          # fetchQuestionsForLesson, fetchQuestionsForReviewQueue,
                                # fetchAnswerForQuestion, mock data
  pages/
    Exercises.jsx               # Exercises page (full-screen, no sidebar)
    Exercises.css
```

---

## 7. End-to-End Flow

### 7.1 Navigate to Exercises

1. User is either:
   - On a **Lesson** page → clicks “Start Exercise” → `/lessons/1/exercises`, or
   - On **Dashboard** → clicks “Review Now” → `/exercises?reviewQueue=true`.
2. `Exercises` mounts. It reads `lessonId` from `useParams()` and `reviewQueue` from `useSearchParams().get('reviewQueue')`.

### 7.2 Load questions

1. `useEffect` runs when `lessonId` or `isReviewQueue` changes.
2. **If review queue:** `fetchQuestionsForReviewQueue()`.
3. **Else (lesson mode):** `fetchQuestionsForLesson(lessonId || '1')`.
4. On success: `setQuestions(list)`, `setCurrentIndex(0)`, clear `userAnswers` and `feedback`. On error: `setError(...)`.
5. Loading state shows a spinner until the fetch settles.

### 7.3 Render current question

1. `currentQuestion = questions[currentIndex]`.
2. `userAnswer = userAnswers[currentIndex]` (may be `null`).
3. **Renderer:** `Renderer = getQuestionRenderer(currentQuestion.questionType)` (e.g. `BarChartQuestionRenderer`).
4. **Interaction mode:** `interactionMode = currentQuestion.questionBody?.interactionMode ?? InteractionMode.DISPLAY_SELECT`.
5. The page renders:
   - **Header:** Close, title (“Exercises for lesson X” or “Review queue”), progress bar, step dots, points.
   - **Main:** Context (from `questionBody`), prompt (`questionHead`), then:

     ```jsx
     <Renderer
       questionType={...}
       interactionMode={interactionMode}
       questionBody={currentQuestion.questionBody}
       value={userAnswer}
       onChange={handleAnswerChange}
       disabled={!!feedback}
     />
     ```

   - “Start over” and, when present, feedback (correct/incorrect).
   - **Footer:** Previous, **Check**, Next.

### 7.4 User interacts

1. Renderer uses the strategy for `interactionMode` to render the UI (e.g. bar chart with clickable bars).
2. On interaction (e.g. bar click), the strategy calls `onChange({ selectedLabel: "PA" })`.
3. `handleAnswerChange` updates `userAnswers[currentIndex]` and clears `feedback`.

### 7.5 Check (validate)

1. User clicks **Check**.
2. `handleCheck` runs:
   - `answer = await fetchAnswerForQuestion(currentQuestion.questionId)`.
   - `validate = getValidator(answer.answerValidationType)` (e.g. `exactMatchLabel`).
   - `result = validate(userAnswer ?? {}, answer.expectedAnswerBody)`.
   - `setFeedback(result)` → `{ correct: true }` or `{ correct: false, feedback: "Expected \"PA\"." }`.
3. **Check** is disabled while `checking` or when `feedback` exists. The renderer is `disabled` when there is feedback so the user can’t change the answer.
4. Feedback UI shows “Correct!” or the validator’s `feedback` message.

### 7.6 Start over

1. User clicks “Start over”.
2. `handleStartOver` clears `userAnswers[currentIndex]` and `feedback`.
3. The renderer is enabled again; the user can change the selection and **Check** again.

### 7.7 Step navigation

1. **Previous / Next** change `currentIndex` and clear `feedback`.
2. **Step dots** jump to a specific index and clear `feedback`.
3. Progress bar and step dots reflect `currentIndex` and `questions.length`.

### 7.8 Close

1. User clicks the **X** in the header.
2. **Lesson mode:** `navigate(\`/lessons/${lessonId}\`)`.
3. **Review mode:** `navigate('/student')`.

---

## 8. BarChart + DisplaySelect Example

### 8.1 Question

```json
{
  "questionId": "q-bar-1",
  "lessonId": "1",
  "questionHead": "What state has about 400 cafes?",
  "questionBody": {
    "interactionMode": "DISPLAY_SELECT",
    "context": "This chart shows the number of Starbucks cafes in three states — …",
    "chart": {
      "type": "bar",
      "data": [
        { "label": "NJ", "value": 295, "color": "#ec4899" },
        { "label": "NY", "value": 635, "color": "#8b5cf6" },
        { "label": "PA", "value": 405, "color": "#94a3b8" }
      ]
    }
  },
  "questionType": "BAR_CHART"
}
```

### 8.2 Renderer and strategy

- **Renderer:** `BarChartQuestionRenderer` (from `getQuestionRenderer(QuestionType.BAR_CHART)`).
- **Strategy:** `InteractionMode.DISPLAY_SELECT` uses `questionBody.chart.data` to draw bars, and `value?.selectedLabel` to highlight the selected bar.
- **Interaction:** Clicking a bar calls `onChange({ selectedLabel: "PA" })`.

### 8.3 Answer (validation scheme)

```json
{
  "answerId": "a-bar-1",
  "questionId": "q-bar-1",
  "answerValidationType": "EXACT_MATCH_LABEL",
  "expectedAnswerBody": "PA"
}
```

### 8.4 Validation

1. User selects **PA** → `userAnswer = { selectedLabel: "PA" }`.
2. **Check** → `fetchAnswerForQuestion("q-bar-1")` → above answer.
3. `getValidator("EXACT_MATCH_LABEL")` → `exactMatchLabel`.
4. `exactMatchLabel({ selectedLabel: "PA" }, "PA")` → `{ correct: true }`.
5. UI shows “Correct!”.

If the user selects **NJ** or **NY**, `exactMatchLabel` returns `{ correct: false, feedback: "Expected \"PA\"." }`.

---

## 9. Mock API (`exercises/api/mockQuestions.js`)

### 9.1 Functions

- **`fetchQuestionsForLesson(lessonId)`**  
  Returns a list of questions for that lesson. Uses `MOCK_QUESTIONS_BY_LESSON[lessonId]` or a default. Simulates delay (~300 ms).

- **`fetchQuestionsForReviewQueue()`**  
  Returns a combined list of questions from several lessons (review queue).

- **`fetchAnswerForQuestion(questionId)`**  
  Returns the validation scheme for that question (`answerValidationType`, `expectedAnswerBody`). Unknown `questionId` gets a safe default.

### 9.2 Mock data

- **Lesson 1:** One BarChart question (“What state has about 400 cafes?”); correct answer **PA**.
- **Lesson 2:** One BarChart question (“Which state has the most cafes?”); correct answer **NY**.
- **Review queue:** Both questions.

---

## 10. UI Layout (Exercises Page)

- **Full-screen:** No sidebar; the Exercises page fills the viewport.
- **Header:** Close (X), title, progress bar, step dots, points (0 + bolt icon).
- **Main:** Scrollable area; centered card (max-width ~52rem) with context, prompt, renderer, “Start over,” and feedback.
- **Footer:** Light background; **Previous**, **Check** (primary green), **Next**.
- **States:** Loading, error, empty (no questions), and normal (question + footer).

---

## 11. Summary Diagram

```text
┌─────────────────────────────────────────────────────────────────┐
│  Lesson "Start Exercise"  or  Dashboard "Review Now"             │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  Exercises Page                                                  │
│  • Params: lessonId (optional)                                   │
│  • Query: reviewQueue=true (optional)                            │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  Fetch questions                                                 │
│  • reviewQueue → fetchQuestionsForReviewQueue()                  │
│  • else        → fetchQuestionsForLesson(lessonId)               │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  For current question:                                           │
│  • getQuestionRenderer(questionType) → Renderer                  │
│  • interactionMode from questionBody                             │
│  • Renderer(questionBody, value, onChange, disabled)             │
│    → strategy picks by interactionMode, renders UI               │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                    User interacts (e.g. select bar)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  onChange({ selectedLabel }) → userAnswers[index] updated        │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                        User clicks "Check"
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  fetchAnswerForQuestion(questionId)                              │
│  → getValidator(answerValidationType)                            │
│  → validate(userAnswer, expectedAnswerBody)                      │
│  → setFeedback({ correct, feedback })                            │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  Show "Correct!" or "Expected \"PA\"." ; disable Check & renderer │
│  User can "Start over" or go Prev/Next                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. Extending the System

- **New question type:** Add a renderer (e.g. `MathGraphQuestionRenderer`), implement strategies per `InteractionMode`, then `registerQuestionRenderer(QuestionType.MATH_GRAPH, MathGraphQuestionRenderer)`.
- **New interaction mode:** Add a strategy for that mode inside the relevant renderer(s).
- **New validator:** Implement `(userAnswer, expectedAnswerBody) → { correct, feedback? }`, register it under a new `AnswerValidationType` in `validators/index.js`.
- **Real backend:** Replace `mockQuestions.js` with API client that calls your backend; keep the same function shapes and data structures.
