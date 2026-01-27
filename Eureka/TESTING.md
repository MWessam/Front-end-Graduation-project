# Testing — Exercises Page & Interactive Question System

Test **at the end of each phase** (and after full integration). Use both light and dark modes, and multiple viewports (mobile, tablet, desktop) where relevant.

---

## Completed Phases (Foundation)

### After Phase 1: Foundation — Types & Routing ✅

- [x] **Types**: `exercises/types.js` (or equivalent) exports `QuestionType`, `InteractionMode`, `AnswerValidationType`. No runtime errors when importing.
- [x] **Routes**: Visiting `/lessons/1/exercises` and `/exercises?reviewQueue=true` renders the Exercises page (or placeholder) without crashing.
- [x] **Lesson**: From a lesson page, "Start Exercise" navigates to `/lessons/:id/exercises` with the correct lesson id.
- [x] **Dashboard**: "Review Now" navigates to `/exercises?reviewQueue=true`.
- [x] **App**: Both routes are registered in `App.jsx`; no console errors on navigation.
- [x] **Params**: Exercises page correctly reads `lessonId` from route params and `reviewQueue` from query (when applicable).

---

### After Phase 2: Renderer & Strategies ✅

- [x] **Registry**: `getQuestionRenderer(questionType)` returns the renderer component; unknown type returns `null` or safe fallback.
- [x] **BarChartQuestionRenderer**: Accepts `questionType`, `interactionMode`, `questionBody`, `value`, `onChange`, `disabled`; renders without error.
- [x] **Strategies per renderer**: Renderer picks strategy by `interactionMode`; unknown mode shows fallback UI.
- [x] **BarChart + DisplaySelect**: For `BAR_CHART` + `DISPLAY_SELECT`, renderer shows bar chart and allows selecting a bar.
- [x] **Controlled state**: Parent controls `value` and `disabled`; renderer reflects them.

---

### After Phase 3: Validators & Validation Schemes ✅

- [x] **Registry**: `getValidator(answerValidationType)` returns a function; unknown type returns a fallback.
- [x] **EXACT_MATCH_LABEL**: Validator returns `{ correct: true }` when values match.
- [x] **Pure functions**: Validators have no side effects.
- [x] **Docs**: Validation scheme storage is documented.

---

### After Phase 4: Mock Backend ✅

- [x] **Fetch questions**: Mock API functions return arrays of questions.
- [x] **Fetch answers**: Mock API returns validation schemes.
- [x] **BarChart + EXACT_MATCH**: At least one mock question uses this combination.
- [x] **Data shape**: `questionBody` includes `interactionMode`.

---

### After Phase 5: Exercises Page UI ✅

- [x] **Header**: Close (X), progress bar, step dots, and points indicator present.
- [x] **Main**: Context, question prompt, renderer output, and "Start over" button visible.
- [x] **Footer**: "Check" button present and actionable.
- [x] **Modes**: Page correctly fetches based on route params.
- [x] **State**: User answer state maintained; validation works.
- [x] **Start over**: Resets current question.
- [x] **Responsive**: Layout works on all viewports.
- [x] **Dark mode**: All UI elements readable.

---

### After Phase 6: Integration & Polish ✅

- [x] **Lesson → Exercises**: Full navigation flow works.
- [x] **Dashboard → Exercises**: Review queue flow works.
- [x] **Full flow**: Complete question interaction and validation works.
- [x] **Step navigation**: Previous/next updates correctly.
- [x] **Close**: Returns to appropriate page.
- [x] **Accessibility**: Focus order and labels reasonable.
- [x] **Console**: No errors during normal use.

---

## Phase 7: Mathematics Questions Testing

### 7.1 Complex Numbers Questions

#### Test: Plot Complex Number on Argand Diagram
- [ ] **Setup**: Load question with `MATH_GRAPH` type and `ADD_POINTS` mode
- [ ] **Interaction**: Click on coordinate (3, 2) to place point
- [ ] **Validation**: "Check" button validates point is at correct location
- [ ] **Feedback**: Show correct/incorrect with visual highlight
- [ ] **Reset**: "Start over" clears placed point
- [ ] **Arabic**: Switch to Arabic mode, verify labels are RTL

#### Test: Identify Real/Imaginary Parts
- [ ] **Setup**: Load question showing complex number on graph
- [ ] **Interaction**: Select correct value from options
- [ ] **Validation**: `EXACT_MATCH_LABEL` validator works correctly
- [ ] **Bilingual**: Both English and Arabic options display correctly

#### Test: Vector Addition of Complex Numbers
- [ ] **Setup**: Load question with two complex numbers displayed as vectors
- [ ] **Interaction**: Click to place sum vector endpoint
- [ ] **Validation**: `POINTS_SET_MATCH` validator checks position within tolerance
- [ ] **Visual**: Vectors displayed with arrows and labels

---

### 7.2 Quadratic Equations Questions

#### Test: Discriminant from Graph Shape
- [ ] **Setup**: Load question showing parabola
- [ ] **Interaction**: Select nature of roots (distinct/equal/complex)
- [ ] **Validation**: Correct answer based on parabola intersection with x-axis
- [ ] **Variants**: Test with parabolas above, touching, and crossing x-axis

#### Test: Parameter Adjustment (a, b, c)
- [ ] **Setup**: Load question with target curve and sliders
- [ ] **Interaction**: Adjust a, b, c sliders to match target curve
- [ ] **Visual**: Live curve update as sliders move
- [ ] **Validation**: `NUMERIC_RANGE` checks all three parameters
- [ ] **Tolerance**: Accept values within reasonable tolerance

#### Test: Find Roots (X-Intercepts)
- [ ] **Setup**: Load question with parabola crossing x-axis
- [ ] **Interaction**: Click on both x-intercept points
- [ ] **Validation**: Both points must be correct
- [ ] **Order**: Points can be added in any order
- [ ] **Delete**: User can remove incorrectly placed points

#### Test: Identify Vertex
- [ ] **Setup**: Load question with parabola
- [ ] **Interaction**: Click on vertex (minimum or maximum point)
- [ ] **Validation**: Single point validation with tolerance
- [ ] **Visual**: Highlight vertex area on hover

---

### 7.3 Function Sign Questions

#### Test: Select Positive Intervals
- [ ] **Setup**: Load question with function graph (e.g., x² - 4)
- [ ] **Interaction**: Multi-select intervals where f(x) > 0
- [ ] **Validation**: All correct intervals must be selected, no extras
- [ ] **Visual**: Intervals clearly labeled with mathematical notation

#### Test: Number Line Interval Selection (NEW)
- [ ] **Setup**: Load `NUMBER_LINE` question type
- [ ] **Render**: Number line displays with correct scale and labels
- [ ] **Interaction**: Drag endpoints to select interval(s)
- [ ] **Open/Closed**: Toggle between open (○) and closed (●) endpoints
- [ ] **Multiple**: Support selecting multiple disjoint intervals
- [ ] **Validation**: `INTERVAL_MATCH` validator checks all aspects

#### Test: Region Shading
- [ ] **Setup**: Load question with graph and regions
- [ ] **Interaction**: Click to shade positive/negative regions
- [ ] **Toggle**: Click again to unshade
- [ ] **Colors**: Different colors for positive (green) and negative (red)
- [ ] **Validation**: `REGION_MATCH` checks shaded regions

---

### 7.4 Quadratic Inequalities Questions

#### Test: Shade Solution Region
- [ ] **Setup**: Load question with parabola and inequality
- [ ] **Visual**: Parabola with dashed/solid line based on inequality type
- [ ] **Interaction**: Click to shade solution region
- [ ] **Validation**: Correct region(s) must be shaded

#### Test: Number Line Solution
- [ ] **Setup**: Load inequality (e.g., x² - 4 < 0)
- [ ] **Interaction**: Select interval (-2, 2) on number line
- [ ] **Notation**: Show correct interval notation after check
- [ ] **Validation**: Endpoints and open/closed status correct

---

### 7.5-7.7 Similarity Questions

#### Test: Identify Corresponding Vertices (NEW)
- [ ] **Setup**: Load `GEOMETRY` question with two similar polygons
- [ ] **Render**: Both polygons displayed with labeled vertices
- [ ] **Interaction**: Click vertices in matching pairs
- [ ] **Visual**: Lines connect matched vertices
- [ ] **Validation**: `PAIR_MATCH` checks all pairs

#### Test: Calculate Scale Factor
- [ ] **Setup**: Load question with two similar triangles and side lengths
- [ ] **Interaction**: Enter numeric value for scale factor
- [ ] **Validation**: `NUMERIC_RANGE` with appropriate tolerance
- [ ] **Hint**: Show which sides correspond after check

#### Test: Match Corresponding Sides (NEW)
- [ ] **Setup**: Load question with draggable side labels
- [ ] **Interaction**: Drag sides from one shape to match on other
- [ ] **Visual**: Highlight matched sides with same color
- [ ] **Validation**: All pairs must be correctly matched

#### Test: Similarity Criterion Selection
- [ ] **Setup**: Load question with two triangles and given information
- [ ] **Options**: AA, SAS, SSS criteria
- [ ] **Interaction**: Select correct criterion
- [ ] **Explanation**: Show why criterion applies after check

---

### 7.8 Circle Applications Questions (NEW)

#### Test: Find Chord Length
- [ ] **Setup**: Load `CIRCLE_GEOMETRY` question with intersecting chords
- [ ] **Visual**: Circle with labeled chords and given lengths
- [ ] **Interaction**: Enter calculated chord length
- [ ] **Validation**: `NUMERIC_RANGE` validator
- [ ] **Formula**: Show formula after check

#### Test: Power of a Point
- [ ] **Setup**: Load question with point and secants/tangents
- [ ] **Interaction**: Calculate and enter power value
- [ ] **Validation**: Accept equivalent values

---

### 7.9-7.10 Proportion Theorems Questions

#### Test: Find Unknown Segment
- [ ] **Setup**: Load question with parallel lines cutting transversals
- [ ] **Visual**: Labeled diagram with known and unknown segments
- [ ] **Interaction**: Enter calculated segment length
- [ ] **Steps**: Show calculation steps after check

#### Test: Drag Point for Ratio (NEW)
- [ ] **Setup**: Load question with segment and target ratio
- [ ] **Interaction**: Drag point along segment
- [ ] **Live Update**: Show current ratio as point moves
- [ ] **Snap**: Optional snap to nice ratios
- [ ] **Validation**: Point position gives correct ratio

---

### 7.11 Directed Angles Questions (NEW)

#### Test: Degrees to Radians Conversion
- [ ] **Setup**: Load `UNIT_CIRCLE` question
- [ ] **Render**: Unit circle with degree markings
- [ ] **Interaction**: Adjust sliders for numerator/denominator of π
- [ ] **Visual**: Show angle arc updating in real-time
- [ ] **Validation**: Accept equivalent forms (e.g., 2π/3 = 4π/6)

#### Test: Place Angle on Unit Circle
- [ ] **Setup**: Load question with target angle
- [ ] **Interaction**: Click or drag to place angle
- [ ] **Snap**: Optional snap to special angles (30°, 45°, 60°, etc.)
- [ ] **Display**: Show both degree and radian measure
- [ ] **Validation**: Accept within tolerance

#### Test: Identify Quadrant
- [ ] **Setup**: Load question with given angle (may be negative or > 360°)
- [ ] **Options**: Q1, Q2, Q3, Q4
- [ ] **Interaction**: Select correct quadrant
- [ ] **Visual**: Highlight quadrant after check

---

### 7.12 Trigonometric Functions Questions

#### Test: Find sin/cos/tan from Unit Circle
- [ ] **Setup**: Load question with point on unit circle
- [ ] **Visual**: Point marked, coordinates displayed optionally
- [ ] **Interaction**: Select or enter trig value
- [ ] **Validation**: `NUMERIC_RANGE` for non-special angles

#### Test: Sign by Quadrant
- [ ] **Setup**: Load question asking sign of trig function in given quadrant
- [ ] **Options**: Positive (+), Negative (-)
- [ ] **ASTC Rule**: Test all quadrants and functions

#### Test: Match Angle to Point (NEW)
- [ ] **Setup**: Load question with special angles list
- [ ] **Interaction**: Click on unit circle to place points for each angle
- [ ] **Multiple**: Support placing multiple points
- [ ] **Labels**: Points labeled with angle values
- [ ] **Validation**: All points must be correct

---

### 7.13 Related Angles Questions

#### Test: Related Angle Calculation
- [ ] **Setup**: Load question with given sin(θ) value
- [ ] **Task**: Find sin(180° - θ), cos(90° - θ), etc.
- [ ] **Options**: Multiple choice with common errors as distractors
- [ ] **Validation**: Exact match

#### Test: Match Related Angle Formulas (NEW)
- [ ] **Setup**: Load `DRAG_MATCH` question
- [ ] **Items**: Angles like (180° - θ), (180° + θ), (360° - θ), etc.
- [ ] **Targets**: Equivalent expressions like sin(θ), -sin(θ), cos(θ), etc.
- [ ] **Interaction**: Drag to match
- [ ] **Validation**: All pairs correct

---

### 7.14 Graphing Trigonometric Functions Questions

#### Test: Parameter Adjustment
- [ ] **Setup**: Load question with target trig curve
- [ ] **Sliders**: Amplitude, Period, Phase Shift, Vertical Shift
- [ ] **Visual**: Live curve update
- [ ] **Validation**: All parameters within tolerance

#### Test: Identify Function from Graph
- [ ] **Setup**: Load question with trig graph displayed
- [ ] **Options**: Various functions (y = sin(x), y = 2cos(x), etc.)
- [ ] **Interaction**: Select matching function
- [ ] **Variants**: Include transformed functions

#### Test: Find Max/Min Points
- [ ] **Setup**: Load question with trig graph
- [ ] **Task**: Click on all maximum or minimum points
- [ ] **Multiple**: Support multiple correct points
- [ ] **Periodic**: Points repeat every period
- [ ] **Validation**: All required points clicked

---

### 7.15 Inverse Trig Questions

#### Test: All Angles with Given Trig Value
- [ ] **Setup**: Load question like "Find all θ where sin(θ) = 0.5 in [0, 2π]"
- [ ] **Interaction**: Click on unit circle to mark all valid angles
- [ ] **Multiple**: Two angles usually required
- [ ] **Validation**: All and only correct angles marked

---

## Phase 8: New Question Types Testing

### Test: UNIT_CIRCLE Renderer
- [ ] **Render**: Circle centered with radius 1, axes labeled
- [ ] **Special Points**: Mark (1,0), (0,1), (-1,0), (0,-1)
- [ ] **Quadrants**: Clearly distinguishable
- [ ] **Angles**: Support displaying angle arc from positive x-axis
- [ ] **Coordinates**: Show (cos θ, sin θ) for selected point
- [ ] **RTL**: Works correctly in Arabic mode

### Test: GEOMETRY Renderer
- [ ] **Triangles**: Render with correct proportions and labels
- [ ] **Polygons**: Support 3-6 sided polygons
- [ ] **Measurements**: Show side lengths and angles
- [ ] **Similarity Marks**: Indicate corresponding parts
- [ ] **Interactive**: Support point selection, dragging

### Test: NUMBER_LINE Renderer
- [ ] **Scale**: Auto-scale based on problem range
- [ ] **Labels**: Clear tick marks and numbers
- [ ] **Intervals**: Draggable endpoints
- [ ] **Notation**: Open (○) vs closed (●) circles
- [ ] **Multiple**: Support disjoint interval selection

### Test: DRAG_MATCH Renderer
- [ ] **Draggable**: Items can be picked up and moved
- [ ] **Drop Zones**: Clear target areas
- [ ] **Connection**: Lines show matched pairs
- [ ] **Reorder**: Items can be re-matched
- [ ] **Touch**: Works on mobile with touch

### Test: CIRCLE_GEOMETRY Renderer
- [ ] **Circle**: Properly drawn with center marked
- [ ] **Chords**: Lines correctly positioned
- [ ] **Tangents**: Touch circle at exactly one point
- [ ] **Secants**: Pass through circle correctly
- [ ] **Labels**: Segment lengths displayed

---

## Phase 9: Validator Testing

### Test: INTERVAL_MATCH Validator
- [ ] **Correct**: `[-2, 3)` matches expected `[-2, 3)`
- [ ] **Wrong Endpoint**: `[-2, 4)` fails against `[-2, 3)`
- [ ] **Wrong Bracket**: `[-2, 3]` fails against `[-2, 3)`
- [ ] **Multiple**: `(-∞, -2) ∪ (3, ∞)` matches expected
- [ ] **Tolerance**: Optional numeric tolerance for endpoints

### Test: PAIR_MATCH Validator
- [ ] **All Correct**: Full match passes
- [ ] **Partial**: Partial match shows which are correct/incorrect
- [ ] **Wrong**: Complete mismatch fails
- [ ] **Order**: Pairs can be in any order

### Test: REGION_MATCH Validator
- [ ] **Exact**: Shaded regions match exactly
- [ ] **Partial**: Some regions correct, some wrong
- [ ] **Feedback**: Indicate which regions are wrong

---

## Phase 10: Localization Testing

### Test: Arabic Mode
- [ ] **RTL Layout**: All components flip correctly
- [ ] **Arabic Text**: Questions display in Arabic
- [ ] **Arabic Numerals**: Option to use ٠١٢٣٤٥٦٧٨٩
- [ ] **Math Symbols**: π, θ, √ display correctly
- [ ] **Mixed Content**: Arabic text with Latin math notation works

---

## Final Smoke Tests

### Math Flow Test
- [ ] **Navigate**: Dashboard → Subject → Lesson → Exercises
- [ ] **Load**: Math questions load correctly
- [ ] **Interact**: Complete at least one question of each type
- [ ] **Validate**: Check button works, feedback displayed
- [ ] **Progress**: Step navigation updates correctly
- [ ] **Complete**: Finish all questions, see completion state

### Cross-Browser Testing
- [ ] **Chrome**: All features work
- [ ] **Firefox**: All features work
- [ ] **Safari**: All features work (especially Canvas/SVG)
- [ ] **Edge**: All features work
- [ ] **Mobile Chrome**: Touch interactions work
- [ ] **Mobile Safari**: Touch interactions work

### Performance Testing
- [ ] **Load Time**: Questions load within 2 seconds
- [ ] **Interaction**: No lag on slider/drag operations
- [ ] **Memory**: No memory leaks on question navigation
- [ ] **Canvas**: Smooth rendering at 60fps

---

## Bug Report Template

When reporting bugs, include:

```markdown
### Bug Description
[Brief description of the issue]

### Question Type
[e.g., UNIT_CIRCLE, GEOMETRY, NUMBER_LINE]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Screenshots/Videos
[If applicable]

### Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Viewport: [e.g., 1920x1080]
- Language Mode: [English/Arabic]
```
