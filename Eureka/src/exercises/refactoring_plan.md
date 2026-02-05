# Question Data Structure & Refactoring Analysis

## 1. Current State Analysis

Currently, the structure of `questionBody` and `expectedAnswer` is implicitly defined within each Renderer and Validator. There is no central contract, meaning the Editor must hardcode form fields or guess what data is needed.

### A. Renderers (View / Interaction)

The `questionBody` object drives how the question is rendered.

#### 1. Math Graph (`MATH_GRAPH`)
**Interaction Mode:** `PARAMETER_ADJUST`
**Required `questionBody` Fields:**
*   `sliders`: Array of objects defining the interactive sliders.
    *   `param`: string (e.g., "a")
    *   `min`: number
    *   `max`: number
    *   `step`: number
*   `referenceCurve`: Object defining the target curve.
    *   `a`: number
    *   `b`: number
    *   `c`: number
*   `canvas`: Object defining the coordinate system.
    *   `xMin`: number
    *   `xMax`: number
    *   `yMin`: number
    *   `yMax`: number

#### 2. Bar Chart (`BAR_CHART`)
**Interaction Mode:** `DISPLAY_SELECT`
**Required `questionBody` Fields:**
*   `context`: string (Text displayed above the chart)
*   `chart`: Object holding chart data.
    *   `data`: Array of objects.
        *   `label`: string (X-axis label)
        *   `value`: number (Bar height)
        *   `color`: string (Hex code)

#### 3. Molecule Builder (`CHEMISTRY_MOLECULE_BUILDER`)
**Interaction Mode:** `MOLECULE_BUILD`
**Required `questionBody` Fields:**
*   `allowedElements`: Array of strings (e.g., `['C', 'H', 'O']`)

---

### B. Validators (Logic / Grading)

The `expectedAnswer` field drives how the user's input is validated.

#### 1. Numeric Range (`NUMERIC_RANGE`)
**Used with:** Math Graph
**Required `expectedAnswer` Structure:**
*   Object mapping parameter names to valid ranges.
    *   Key: Parameter name (e.g., "a")
    *   Value: `[min, max]` (Array of two numbers)
*   **Example:** `{ "a": [0.9, 1.1], "b": [-0.1, 0.1] }`

#### 2. Exact Match Label (`EXACT_MATCH_LABEL`)
**Used with:** Bar Chart
**Required `expectedAnswer` Structure:**
*   String (Exact label text) OR Object `{ label: string }`
*   **Example:** `"2024"`

#### 3. Molecule Structure Match (`MOLECULE_STRUCTURE_MATCH`)
**Used with:** Molecule Builder
**Required `expectedAnswer` Structure:**
*   `elementCounts`: Object `{ "C": 2, "H": 6 }`
*   `bondCount`: number (Total bonds)
*   `bondTypeCounts`: Object `{ "single": 1, "double": 0 }`

---

## 2. Refactoring Proposal: Separated Domain & Interaction Models

Instead of creating a combinatorial explosion of classes (like `MathGraphParameterAdjustData`), we will enforce a strict separation of concerns within the `questionBody`.

### A. The Structure
The `questionBody` will be composed of two distinct, strongly-typed objects:

1.  **`domainData`**: The "Static" state. Defines *what* the question is about (e.g., the graph axes, the target curve, the chart bars). This is tied to `QuestionType`.
2.  **`interactionData`**: The "Dynamic" configuration. Defines *how* the user interacts (e.g., the slider limits, the drag zones, the available tools). This is tied to `InteractionMode`.

**JSON Structure Example:**
```json
{
  "questionType": "MATH_GRAPH",
  "questionBody": {
    "domainData": { ... },       // Validated by MathGraphDomainData class
    "interactionData": { ... }   // Validated by ParameterAdjustInteractionData class
  }
}
```

### B. Class Models

#### 1. Domain Data Classes (Tied to QuestionType)
These classes define the subject matter.

*   **`MathGraphDomainData`**:
    *   `canvas`: { xMin, xMax... }
    *   `referenceCurve`: { a, b, c }
*   **`BarChartDomainData`**:
    *   `dataset`: [{ label, value, color }]
*   **`MoleculeDomainData`**:
    *   `initialStructure`: { nodes, edges } (optional starting point)

#### 2. Interaction Data Classes (Tied to InteractionMode)
These classes define the mechanics.

*   **`ParameterAdjustInteractionData`**:
    *   `sliders`: [{ param: 'a', min: -5, max: 5 }]
*   **`DragPointInteractionData`**:
    *   `draggablePoints`: ['P1', 'P2']
    *   `constraints`: { snapToGrid: true }
*   **`MoleculeBuildInteractionData`**:
    *   `allowedElements`: ['C', 'H', 'O']
    *   `allowedBonds`: ['single', 'double']

### C. Implementation Plan

1.  **Create `src/exercises/data/domains/`**:
    *   `MathGraphDomain.js`
    *   `BarChartDomain.js`
    *   `MoleculeDomain.js`

2.  **Create `src/exercises/data/interactions/`**:
    *   `ParameterAdjustInteraction.js`
    *   `MoleculeBuildInteraction.js`
    *   `DisplaySelectInteraction.js`

3.  **Refactor Renderers**:
    *   Update `MathGraphQuestionRenderer` to instantiate:
        ```javascript
        const domain = new MathGraphDomain(questionBody.domainData);
        const interaction = new ParameterAdjustInteraction(questionBody.interactionData);
        ```
    *   The Renderer passes these strictly typed objects down to its strategy.

### D. Benefits
*   **True Orthogonality**: You can define `ParameterAdjustInteraction` once and use it for Math Graphs, Physics Simulations, or Economic Models without changing the interaction class.
*   **Clear Contracts**: The View knows exactly what it's getting.
    *   The *Graph Component* only cares about `MathGraphDomain`.
    *   The *Slider Component* only cares about `ParameterAdjustInteraction`.
*   **Simplified Validation**: We validate the domain and interaction independently.
