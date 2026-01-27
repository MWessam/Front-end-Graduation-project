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
  - Render `QuestionRenderer` with current question's `questionType`, `interactionMode`, `questionBody`
  - "Start over" button → resets current question's interaction (clear user answer, reset strategy state)
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
- [x] **6.4** "Start over" clears current question's user answer and resets the interactive state
- [x] **6.5** Step navigation: previous/next question (if multiple); update progress bar and step dots
- [x] **6.6** Responsive layout, dark mode support, basic accessibility (focus, labels)

---

## Phase 7: Mathematics Interactive Questions — NEW ⬜

### 7.1 Algebra — Complex Numbers (الأعداد المركبة)

- [ ] **7.1.1** Plot complex number on Argand diagram
  - Type: `MATH_GRAPH` | Mode: `ADD_POINTS` | Validator: `POINTS_SET_MATCH`
  - User clicks to place point (x = real, y = imaginary)
  
- [ ] **7.1.2** Identify real and imaginary parts from graph
  - Type: `MATH_GRAPH` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  - Display complex number, select Re(z) or Im(z) value
  
- [ ] **7.1.3** Add two complex numbers visually (vector addition)
  - Type: `MATH_GRAPH` | Mode: `ADD_POINTS` | Validator: `POINTS_SET_MATCH`
  - Show two vectors, user clicks on sum position

- [ ] **7.1.4** **NEW** — Complex number modulus calculation
  - Type: `MATH_GRAPH` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  - Given z on diagram, calculate |z|

- [ ] **7.1.5** **NEW** — Complex number argument (θ) identification
  - Type: `MATH_GRAPH` | Mode: `ANGLE_SELECT` | Validator: `NUMERIC_RANGE`
  - Select angle of complex number from origin

---

### 7.2 Algebra — Quadratic Equations (المعادلات التربيعية)

- [ ] **7.2.1** Determine discriminant sign from graph shape
  - Type: `MATH_GRAPH` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  - Show parabola, select: "Two distinct real", "Two equal", "Complex"
  
- [ ] **7.2.2** Match quadratic curve by adjusting a, b, c
  - Type: `MATH_GRAPH` | Mode: `PARAMETER_ADJUST` | Validator: `NUMERIC_RANGE`
  - Sliders for a, b, c; match target curve
  
- [ ] **7.2.3** Find roots visually (x-intercepts)
  - Type: `MATH_GRAPH` | Mode: `ADD_POINTS` | Validator: `POINTS_SET_MATCH`
  - Click on x-intercept points
  
- [ ] **7.2.4** Identify vertex of parabola
  - Type: `MATH_GRAPH` | Mode: `ADD_POINTS` | Validator: `POINTS_SET_MATCH`
  - Click on vertex location

- [ ] **7.2.5** **NEW** — Complete the square visualization
  - Type: `MATH_GRAPH` | Mode: `STEP_SELECT` | Validator: `SEQUENCE_MATCH`
  - Order steps to complete the square

- [ ] **7.2.6** **NEW** — Quadratic formula component identification
  - Type: `DRAG_MATCH` | Mode: `DRAG_MATCH` | Validator: `PAIR_MATCH`
  - Match a, b, c to formula parts

---

### 7.3 Algebra — Function Sign (إشارة الدالة)

- [ ] **7.3.1** Select intervals where f(x) > 0
  - Type: `MATH_GRAPH` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  - Multi-select intervals from options
  
- [ ] **7.3.2** **NEW** — Number line interval selection
  - Type: `NUMBER_LINE` | Mode: `INTERVAL_SELECT` | Validator: `INTERVAL_MATCH`
  - Drag endpoints to select solution interval
  
- [ ] **7.3.3** Color regions positive/negative
  - Type: `MATH_GRAPH` | Mode: `REGION_SELECT` | Validator: `REGION_MATCH`
  - Click to shade positive/negative regions

- [ ] **7.3.4** **NEW** — Sign table completion
  - Type: `TABLE_FILL` | Mode: `TABLE_FILL` | Validator: `TABLE_MATCH`
  - Fill in +/- signs in function sign table

---

### 7.4 Algebra — Quadratic Inequalities (متباينات الدرجة الثانية)

- [ ] **7.4.1** Shade solution region on graph
  - Type: `MATH_GRAPH` | Mode: `REGION_SELECT` | Validator: `REGION_MATCH`
  
- [ ] **7.4.2** Select solution interval on number line
  - Type: `NUMBER_LINE` | Mode: `INTERVAL_SELECT` | Validator: `INTERVAL_MATCH`
  
- [ ] **7.4.3** Match inequality to its solution set
  - Type: `MCQ` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`

- [ ] **7.4.4** **NEW** — Inequality direction from graph
  - Type: `MATH_GRAPH` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  - Given shaded region, identify the inequality symbol

---

### 7.5 Similarity — Similar Polygons (تشابه المضلعات)

- [ ] **7.5.1** Identify corresponding vertices
  - Type: `GEOMETRY` | Mode: `VERTEX_MATCH` | Validator: `PAIR_MATCH`
  
- [ ] **7.5.2** Calculate scale factor from diagram
  - Type: `GEOMETRY` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  
- [ ] **7.5.3** Drag to match corresponding sides
  - Type: `GEOMETRY` | Mode: `DRAG_MATCH` | Validator: `PAIR_MATCH`

- [ ] **7.5.4** **NEW** — Scale factor slider matching
  - Type: `GEOMETRY` | Mode: `PARAMETER_ADJUST` | Validator: `NUMERIC_RANGE`
  - Adjust slider to scale polygon to match target

---

### 7.6 Similarity — Similar Triangles (تشابه المثلثات)

- [ ] **7.6.1** Identify similarity criterion (AA, SAS, SSS)
  - Type: `MCQ` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  
- [ ] **7.6.2** Find missing side length using similarity
  - Type: `GEOMETRY` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  
- [ ] **7.6.3** Prove triangles are similar (step selection)
  - Type: `PROOF_BUILDER` | Mode: `STEP_SELECT` | Validator: `PROOF_MATCH`

- [ ] **7.6.4** **NEW** — Triangle side ratio builder
  - Type: `DRAG_MATCH` | Mode: `DRAG_MATCH` | Validator: `PAIR_MATCH`
  - Match sides to create correct proportions

---

### 7.7 Similarity — Area Ratio (نسبة المساحات)

- [ ] **7.7.1** Calculate area ratio from linear ratio
  - Type: `MCQ` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  
- [ ] **7.7.2** Visual area comparison with squares
  - Type: `GEOMETRY` | Mode: `PARAMETER_ADJUST` | Validator: `NUMERIC_RANGE`

- [ ] **7.7.3** **NEW** — Area ratio interactive calculator
  - Type: `GEOMETRY` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  - Given k (linear ratio), calculate k² (area ratio)

---

### 7.8 Similarity — Circle Applications (تطبيقات الدائرة)

- [ ] **7.8.1** Find chord length using similarity
  - Type: `CIRCLE_GEOMETRY` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  
- [ ] **7.8.2** Identify similar triangles in circle
  - Type: `CIRCLE_GEOMETRY` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  
- [ ] **7.8.3** Power of a point calculation
  - Type: `CIRCLE_GEOMETRY` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`

- [ ] **7.8.4** **NEW** — Secant-tangent relationship
  - Type: `CIRCLE_GEOMETRY` | Mode: `DRAG_MATCH` | Validator: `PAIR_MATCH`
  - Match segments to their relationships

---

### 7.9 Proportion Theorems — Parallel Lines (الخطوط المتوازية)

- [ ] **7.9.1** Find unknown segment length
  - Type: `GEOMETRY` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  
- [ ] **7.9.2** Identify parallel lines from proportions
  - Type: `GEOMETRY` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  
- [ ] **7.9.3** Drag point to create specific ratio
  - Type: `GEOMETRY` | Mode: `POINT_DRAG` | Validator: `NUMERIC_RANGE`

- [ ] **7.9.4** **NEW** — Proportion equation builder
  - Type: `DRAG_MATCH` | Mode: `DRAG_MATCH` | Validator: `PAIR_MATCH`
  - Arrange segments into valid proportion

---

### 7.10 Proportion Theorems — Angle Bisector (منصف الزاوية)

- [ ] **7.10.1** Calculate segment ratios
  - Type: `GEOMETRY` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  
- [ ] **7.10.2** Locate point dividing segment in given ratio
  - Type: `GEOMETRY` | Mode: `ADD_POINTS` | Validator: `POINTS_SET_MATCH`

- [ ] **7.10.3** **NEW** — Bisector theorem visualization
  - Type: `GEOMETRY` | Mode: `PARAMETER_ADJUST` | Validator: `NUMERIC_RANGE`
  - Adjust point D on BC to satisfy AD bisects angle A

---

### 7.11 Trigonometry — Directed Angles (الزوايا الموجهة)

- [ ] **7.11.1** Convert degrees to radians (slider)
  - Type: `UNIT_CIRCLE` | Mode: `PARAMETER_ADJUST` | Validator: `NUMERIC_RANGE`
  
- [ ] **7.11.2** Place angle on unit circle
  - Type: `UNIT_CIRCLE` | Mode: `ANGLE_INPUT` | Validator: `NUMERIC_RANGE`
  
- [ ] **7.11.3** Identify quadrant from angle
  - Type: `UNIT_CIRCLE` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`

- [ ] **7.11.4** **NEW** — Coterminal angle finder
  - Type: `UNIT_CIRCLE` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  - Find coterminal angle in [0, 2π)

- [ ] **7.11.5** **NEW** — Reference angle identification
  - Type: `UNIT_CIRCLE` | Mode: `ANGLE_INPUT` | Validator: `NUMERIC_RANGE`
  - Given angle θ, mark the reference angle

---

### 7.12 Trigonometry — Trig Functions (الدوال المثلثية)

- [ ] **7.12.1** Find sin/cos/tan from unit circle
  - Type: `UNIT_CIRCLE` | Mode: `DISPLAY_SELECT` | Validator: `NUMERIC_RANGE`
  
- [ ] **7.12.2** Identify trig value sign by quadrant
  - Type: `UNIT_CIRCLE` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  
- [ ] **7.12.3** Match angle to point on unit circle
  - Type: `UNIT_CIRCLE` | Mode: `ADD_POINTS` | Validator: `POINTS_SET_MATCH`

- [ ] **7.12.4** **NEW** — Coordinate-to-trig value mapper
  - Type: `UNIT_CIRCLE` | Mode: `DRAG_MATCH` | Validator: `PAIR_MATCH`
  - Match (cos θ, sin θ) pairs to angles

- [ ] **7.12.5** **NEW** — Special angles quick quiz
  - Type: `UNIT_CIRCLE` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  - Rapid-fire sin/cos/tan values for special angles

---

### 7.13 Trigonometry — Related Angles (الزوايا المنتسبة)

- [ ] **7.13.1** Find sin(180° - θ) given sin(θ)
  - Type: `MCQ` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  
- [ ] **7.13.2** Match related angle formulas
  - Type: `DRAG_MATCH` | Mode: `DRAG_MATCH` | Validator: `PAIR_MATCH`
  
- [ ] **7.13.3** Simplify expression using related angles
  - Type: `EXPRESSION_BUILDER` | Mode: `STEP_SELECT` | Validator: `EXPRESSION_MATCH`

- [ ] **7.13.4** **NEW** — Related angle visual proof
  - Type: `UNIT_CIRCLE` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  - Show why sin(180° - θ) = sin(θ) visually

---

### 7.14 Trigonometry — Graphing (رسم الدوال المثلثية)

- [ ] **7.14.1** Adjust amplitude, period, phase shift
  - Type: `MATH_GRAPH` | Mode: `PARAMETER_ADJUST` | Validator: `NUMERIC_RANGE`
  
- [ ] **7.14.2** Identify function from graph
  - Type: `MATH_GRAPH` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`
  
- [ ] **7.14.3** Find max/min points on trig graph
  - Type: `MATH_GRAPH` | Mode: `ADD_POINTS` | Validator: `POINTS_SET_MATCH`

- [ ] **7.14.4** **NEW** — Period calculation from graph
  - Type: `MATH_GRAPH` | Mode: `NUMERIC_INPUT` | Validator: `NUMERIC_RANGE`
  - Measure distance between peaks

- [ ] **7.14.5** **NEW** — Transform sin to cos
  - Type: `MATH_GRAPH` | Mode: `PARAMETER_ADJUST` | Validator: `NUMERIC_RANGE`
  - Adjust phase to transform y = sin(x) to y = cos(x)

---

### 7.15 Trigonometry — Inverse Trig (إيجاد الزاوية)

- [ ] **7.15.1** Given sin(θ) = 0.5, find all θ in [0, 2π]
  - Type: `UNIT_CIRCLE` | Mode: `ADD_POINTS` | Validator: `POINTS_SET_MATCH`
  
- [ ] **7.15.2** Select correct angle from options
  - Type: `MCQ` | Mode: `DISPLAY_SELECT` | Validator: `EXACT_MATCH_LABEL`

- [ ] **7.15.3** **NEW** — All solutions in range finder
  - Type: `UNIT_CIRCLE` | Mode: `MULTI_POINT_SELECT` | Validator: `POINTS_SET_MATCH`
  - Find all angles where cos(θ) = -1/2 in [0, 4π]

---

## Phase 8: New Question Types Implementation 🟡

### 8.1 Core Components (High Priority)

- [x] **8.1.1** `UNIT_CIRCLE` Question Type ✅
  - Component: `UnitCircleQuestionRenderer.jsx`
  - Modes: `ANGLE_INPUT`, `ADD_POINTS`, `DISPLAY_SELECT`, `PARAMETER_ADJUST`
  - Features: Special angle snapping, radian/degree toggle, coordinate display

- [x] **8.1.2** `GEOMETRY` Question Type ✅
  - Component: `GeometryQuestionRenderer.jsx`
  - Modes: `DISPLAY_SELECT`, `NUMERIC_INPUT`, `ADD_POINTS`, `PARAMETER_ADJUST`
  - Features: Triangle/polygon rendering, measurement display, similarity indicators

- [x] **8.1.3** `NUMBER_LINE` Question Type ✅
  - Component: `NumberLineQuestionRenderer.jsx`
  - Modes: `INTERVAL_SELECT`, `DISPLAY_SELECT`, `REGION_SELECT`
  - Features: Draggable endpoints, open/closed interval indicators, sign markers

- [x] **8.1.4** `DRAG_MATCH` Question Type ✅
  - Component: `DragMatchQuestionRenderer.jsx`
  - Modes: `DRAG_MATCH`, `DRAG_ORDER`
  - Features: Draggable items, drop zones, connection lines

- [ ] **8.1.5** `CIRCLE_GEOMETRY` Question Type
  - Component: `CircleGeometryQuestionRenderer.jsx`
  - Modes: `NUMERIC_INPUT`, `DISPLAY_SELECT`, `DRAG_MATCH`
  - Features: Chord, secant, tangent visualization

---

### 8.2 New Validators

- [x] **8.2.1** `INTERVAL_MATCH` — Check interval endpoints and open/closed status ✅
- [x] **8.2.2** `PAIR_MATCH` — Check matched pairs (for drag-match) ✅
- [x] **8.2.3** `REGION_MATCH` — Check shaded region selection ✅
- [x] **8.2.4** `SEQUENCE_MATCH` — Check ordered sequence ✅
- [x] **8.2.5** `POINTS_SET_MATCH` — Check placed points (unordered) ✅
- [x] **8.2.6** `ANGLE_MATCH` — Check angle value within tolerance ✅
- [ ] **8.2.7** `TABLE_MATCH` — Check table cell values
- [ ] **8.2.8** `PROOF_MATCH` — Check proof step order and validity
- [ ] **8.2.9** `EXPRESSION_MATCH` — Check mathematical expression equivalence

---

### 8.3 New Interaction Modes

- [x] **8.3.1** `INTERVAL_SELECT` — Select interval on number line ✅
- [x] **8.3.2** `REGION_SELECT` — Select/shade regions on graph ✅
- [x] **8.3.3** `ANGLE_INPUT` — Input angle on unit circle ✅
- [x] **8.3.4** `NUMERIC_INPUT` — Enter numeric value ✅
- [x] **8.3.5** `DRAG_MATCH` — Match pairs by dragging ✅
- [x] **8.3.6** `DRAG_ORDER` — Order items by dragging ✅
- [ ] **8.3.7** `VERTEX_MATCH` — Match vertices between shapes
- [ ] **8.3.8** `POINT_DRAG` — Drag point to specific location
- [ ] **8.3.9** `STEP_SELECT` — Select steps in order (for proofs)
- [ ] **8.3.10** `TABLE_FILL` — Fill table cells
- [ ] **8.3.11** `MULTI_POINT_SELECT` — Select multiple points

---

## Phase 9: Mock Data for Math Questions ⬜

- [ ] **9.1** Add 5+ Complex Numbers questions to mock data
- [ ] **9.2** Add 5+ Quadratic Equations questions to mock data
- [ ] **9.3** Add 5+ Function Sign questions to mock data
- [ ] **9.4** Add 5+ Similarity questions to mock data
- [ ] **9.5** Add 5+ Proportion Theorems questions to mock data
- [ ] **9.6** Add 10+ Trigonometry questions to mock data (various topics)

---

## Phase 10: Localization & Polish ⬜

- [ ] **10.1** Arabic translations for all math questions
- [ ] **10.2** RTL layout support for Arabic mode
- [ ] **10.3** Arabic numeral support (٠١٢٣٤٥٦٧٨٩)
- [ ] **10.4** Math symbol rendering (π, θ, √, etc.)
- [ ] **10.5** Responsive design for all new components

---

## Notes

- **Renderer**: One component only; strategies define how to render each `(QuestionType, InteractionMode)`.
- **Validation**: Backend stores only `answerValidationType` + `expectedAnswerBody`; frontend (and future backend) use the validator registry.
- **Mock backend**: All exercise and answer data is simulated; replace with real API when ready.
- **Priority**: Focus on `UNIT_CIRCLE`, `GEOMETRY`, `NUMBER_LINE` as they cover most math topics.
