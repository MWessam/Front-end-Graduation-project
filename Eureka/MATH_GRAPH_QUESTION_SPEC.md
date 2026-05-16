# Math graph question type — product spec

This document defines how the **Math graph** question type should behave in Eureka for secondary / advanced math content, with **MCQ** as an explicit fallback or companion modality.

Goals:

- Primary modality for math-heavy items: interactive **graph plane** plus optional **multiple choice**.
- Support **ordinary real graphs**, the **complex plane**, **vectors**, **angles**, **number lines**, and **free points**—not limited to \(\,y=ax^2+bx+c\,\).
- **Interaction modes** are composable where needed (multiple modes active together).
- **MCQ**: learner selects among options while the canvas still exposes the above affordances if the author enables them.

---

## 1) Scope and fallbacks

| Role | Responsibility |
|------|----------------|
| **Math graph** | Visual reasoning, constructions, approximate answers, parameterized families, geometric relations (vectors/angles/points/cues). |
| **MCQ** | Definitive selection when grading must be categorical, ambiguous numerically, or when the stem is textual; can still embed the graph as scaffolding. |

When to prefer MCQ: multi-step proofs as discrete checkpoints, OCR-noisy textbook imports, “which statement is correct?”, distractors grounded in typical errors.

---

## 2) Coordinate systems

The renderer must support (at minimum) these modes, selectable per question via domain configuration:

**2.1 Cartesian \((x,y)\) — standard real graphs**

- Two perpendicular axes with sensible padding, ticks, axis labels (“\(x\)”, “\(y\)”).
- Optionally restrict view (min/max clip) independently per axis.

**2.2 Complex plane \((Re, Im)\)**

- Horizontal axis \(\equiv\) real part; vertical \(\equiv\) imaginary part.
- Curves parameterized as \(\,z(t)\,\) or as implicit relations interpreted in \(\mathbb{C}\) according to authoring rules authors document (e.g. only explicit \(z\) loci supported at first).

**2.3 Number line (1D)**

- A dedicated 1D track (often horizontal) with ticks and optionally a canonical **positive direction** interpreted as **the unit vector** along that line for angle definitions involving “the axis”.
- Useful for inequalities, intervals, projections, scalar components of vectors lying on that line.

The same underlying model can reuse “number line” as a constrained sub-canvas attached to Cartesian or standalone.

---

## 3) Graphed objects (“layers”)

All objects belong to typed layers authors can toggle and students can manipulate subject to interaction policy.

### 3.1 Curves / graphs

- **Arbitrary authored functions**, not restricted to quadratic:
  - explicit \(y=f(x)\) or \(x=g(y)\) where applicable;
  - parametric \(\,(x(t), y(t))\,\);
  - optional piecewise segments;
  - **reference vs student** overlays (reference curve fixed or semi-transparent; learner curve editable via parameters — see §5).
- **Rendering**: SVG or canvas strokes; clipped to viewport.

### 3.2 Points

- Placed anywhere in the active coordinate frame (subject to snap policies).
- Roles: anchors, draggable handles, intersections marked for feedback, placeholders for constructions.

### 3.3 Vectors

- Each vector has:

  - **origin** (tail),
  - **head** (end point defining direction and magnitude),
  - optional **styling ID** for legend / correctness hooks.

- **Configuration** controls whether each degree of freedom is **draggable** for the learner:
  - head only,
  - origin only,
  - **both**
  - or **frozen** (display-only scaffolding).

Vectors are first-class primitives (not encoded only as sliders); interaction policy is orthogonal to rendering.

### 3.4 Angles

- Defined between **two rays** emanating from a **common vertex** (usually the origin or a draggable point).

- Canonical case: **two vectors** share a vertex; renderer draws the **minor arc** (or exposes major/minor in domain data).

- **Number line as unit axis**: angle between a vector (or ray) and the **positive \(x\)-axis / number-line direction** is expressible without a second draggable vector author must draw both rays from the vertex; axis direction is implicit from the coordinate mode.

---

## 4) Interaction model

### 4.1 Policy vs modes

Two concepts:

| Concept | Meaning |
|---------|---------|
| **Interaction modes** | What categories of learner actions exist (`VECTOR_DRAG`, `POINT_DRAG`, `PARAMETER_ADJUST`, `MCQ_ONLY`, composites). |
| **Per-object constraints** | For each vector, point, slider-bound curve, flags: draggable head / origin / both / locked. |

Validators and feedback read **serialized state**: positions, angles, slider values, MCQ selections.

### 4.2 Required interaction modes

| Mode | Learner capability |
|------|---------------------|
| **Vector head drag** | Move only the arrow head along allowed paths (typically full plane unless constrained segment). |
| **Vector origin drag** | Move the tail similarly. |
| **Vector compound drag** | Both head and origin independently draggable (inherits per-vector locks). |
| **Point drag** | Move authored or spawned free points within canvas / snap grid. |
| **Parameter adjust** | Sliders / numeric stepping bound to named parameters that drive curves, anchors, affixes (“family” of graphs). Same pattern as existing `PARAMETER_ADJUST` but generalized to arbitrary parameter sets in domain schema. |
| **MCQ** | Discrete choice UI; optionally **dim** direct manipulation until “commit” depending on authoring. |

### 4.3 Composite interactions

Questions may activate **multiple modes simultaneously**, e.g.:

- Drag two vectors **and** answer an MCQ that references their angle bracket.
- Adjust \(a,k\) sliders **while** snapping a probe point along a curve.
- Freeze reference curve **and** drag learner vector to match geometric condition.

Compose by listing active modes plus **priorities**: which events capture pointer first (vectors vs curve vs sliders).

---

## 5) Validation (high level)

Validation strategies evolve with authoring but should include:

| Strategy | Typical use |
|----------|--------------|
| **Numeric range** on slider parameters (\(a\) in interval, \(\Delta\) classification). |
| **Geometric** tolerances (angle within \(\varepsilon\)°, lengths within \(\varepsilon\) in math units — account for viewport scale). |
| **Relative** constraints (“vector \( \vec{AB} \) parallel to \(\vec{v}\)” up to epsilon). |
| **MCQ** exact match label / id against options. |

Complex plane: same tolerance ideas in \(\mathbb{R}^2\) with **real and imaginary components** checked separately unless a modulus/argument check is authored.

---

## 6) Data model hints (conceptual shapes)

These shapes align with Eureka’s existing `questionBody`:

```text
coordinateMode: 'CARTESIAN' | 'COMPLEX_PLANE' | 'NUMBER_LINE' | 'NUMBER_LINE_EMBEDDED'
viewport: { xMin, xMax, yMin, yMax }   // omit y for pure number line where applicable

curves: [
  { id, kind: 'explicit' | 'parametric' | ..., expressionRefs: [...], role: 'reference'|'learner', style }
]

vectors: [
  { id, origin: { x, y }, head: { x, y }, drag: { origin: bool, head: bool } }
]

points: [
  { id, position: { x, y }, drag: bool }
]

angles: [
  { id, vertexId | vertex: { x, y }, armA: vectorId|'axis+x', armB: vectorId|'axis+x', showArc: bool }
]

parameters: [ { name, min, max, step, default, bindsTo: [...] } ]   // bindsTo links to curve coeffs or anchor shifts

interactionModesActive: ('VECTOR_DRAG' | 'POINT_DRAG' | 'PARAMETER_ADJUST' | 'MCQ')[]  
// plus optional composite metadata: precedence, snapping

mcq: { optional, options: [...], embeddedInGraph: bool }
```

Canonical serialization of learner state should be versioned (\`graphStateVersion\`) for migrations.

---

## 7) Implementation notes (engineering)

1. Replace “hard-coded quadratic sampler” math with a **small expression/parametric evaluator** sandboxed (whitelist functions, timeouts, disallow arbitrary JS in stored content).
2. **Complex plane** is mostly a **coordinate relabel + rendering** convention; evaluator may need complex-aware ops or split real/parametric \(\,(Re(z(t)), Im(z(t)))\,\).
3. **Angles** derive from atan2 deltas with explicit branch rules when comparing to textbooks.
4. **Composite modes** imply a single renderer that dispatches drag handlers by hit-testing order and respects per-object `drag` flags.

---

## 8) Relation to existing codebase

Today’s **`MATH_GRAPH`** exercise is narrowly tailored to quadratic curve matching and sliders. This spec intentionally **extends** that type (or successors it) toward:

- general curves & planes,
- first-class geometric objects,
- **stacked interactions** plus **MCQ** as a parallel channel.

Separate document **`EXERCISES_ARCHITECTURE_AND_AI_QUESTION_GUIDE.md`** remains the procedural checklist for adding types; this file is the **feature target** for the math graph subsystem.
