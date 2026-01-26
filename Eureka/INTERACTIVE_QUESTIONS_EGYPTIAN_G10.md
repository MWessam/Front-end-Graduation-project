# Interactive Questions for Egyptian Grade 10 (أولى ثانوي) Curriculum

This document proposes interactive question ideas for the Egyptian Grade 10 (First Year Secondary) curriculum, utilizing the existing Eureka exercise system and suggesting new question types where needed.

---

## Table of Contents

1. [Mathematics (الرياضيات)](#1-mathematics-الرياضيات)
2. [Integrated Sciences (العلوم المتكاملة)](#2-integrated-sciences-العلوم-المتكاملة)
3. [Arabic Language (اللغة العربية)](#3-arabic-language-اللغة-العربية)
4. [History (التاريخ)](#4-history-التاريخ)
5. [Philosophy and Logic (الفلسفة والمنطق)](#5-philosophy-and-logic-الفلسفة-والمنطق)
6. [Foreign Languages](#6-foreign-languages)
7. [Programming and AI (البرمجة والذكاء الاصطناعي)](#7-programming-and-ai)
8. [New Question Types Needed](#8-new-question-types-needed)

---

## 1. Mathematics (الرياضيات)

### 1.1 Algebra, Relations and Functions (الجبر والعلاقات والدوال)

#### 1.1.1 Complex Numbers (الأعداد المركبة)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Plot complex number on Argand diagram | `MATH_GRAPH` | `ADD_POINTS` | `POINTS_SET_MATCH` |
| Identify real and imaginary parts from graph | `MATH_GRAPH` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Add two complex numbers visually (vector addition) | `MATH_GRAPH` | `ADD_POINTS` | `POINTS_SET_MATCH` |

**Example Question:**
```json
{
  "questionId": "math-complex-1",
  "lessonId": "math-algebra-1",
  "questionHead": "Plot the complex number 3 + 2i on the Argand diagram",
  "questionHead_ar": "ارسم العدد المركب 3 + 2ت على مستوى أرجاند",
  "questionBody": {
    "interactionMode": "ADD_POINTS",
    "canvas": { "xMin": -5, "xMax": 5, "yMin": -5, "yMax": 5 },
    "axisLabels": { "x": "Real (الحقيقي)", "y": "Imaginary (التخيلي)" },
    "gridLines": true
  },
  "questionType": "MATH_GRAPH"
}
```

#### 1.1.2 Quadratic Equations (المعادلات التربيعية)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Determine discriminant sign from graph shape | `MATH_GRAPH` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Match quadratic curve by adjusting a, b, c | `MATH_GRAPH` | `PARAMETER_ADJUST` | `NUMERIC_RANGE` |
| Find roots visually (x-intercepts) | `MATH_GRAPH` | `ADD_POINTS` | `POINTS_SET_MATCH` |
| Identify vertex of parabola | `MATH_GRAPH` | `ADD_POINTS` | `POINTS_SET_MATCH` |

**Example Question (Discriminant):**
```json
{
  "questionId": "math-quad-discriminant-1",
  "questionHead": "Based on the graph, what is the nature of the roots?",
  "questionHead_ar": "بناءً على الرسم البياني، ما نوع جذري المعادلة؟",
  "questionBody": {
    "interactionMode": "DISPLAY_SELECT",
    "referenceCurve": { "a": 1, "b": 0, "c": 2 },
    "options": [
      { "label": "Two distinct real roots (جذران حقيقيان مختلفان)", "value": "distinct" },
      { "label": "Two equal real roots (جذران حقيقيان متساويان)", "value": "equal" },
      { "label": "Two complex roots (جذران مركبان)", "value": "complex" }
    ]
  },
  "questionType": "MATH_GRAPH"
}
```

#### 1.1.3 Function Sign (إشارة الدالة)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Select intervals where f(x) > 0 | `MATH_GRAPH` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Drag and drop signs on number line | **NEW: `NUMBER_LINE`** | `INTERVAL_SELECT` | `INTERVAL_MATCH` |
| Color regions positive/negative | `MATH_GRAPH` | `REGION_SELECT` | `REGION_MATCH` |

**Example Question:**
```json
{
  "questionId": "math-function-sign-1",
  "questionHead": "Select all intervals where f(x) = x² - 4 is positive",
  "questionHead_ar": "حدد الفترات التي تكون فيها د(س) = س² - 4 موجبة",
  "questionBody": {
    "interactionMode": "DISPLAY_SELECT",
    "function": "x^2 - 4",
    "intervals": [
      { "label": "(-∞, -2)", "value": "neg_inf_to_neg2" },
      { "label": "(-2, 2)", "value": "neg2_to_2" },
      { "label": "(2, ∞)", "value": "2_to_pos_inf" }
    ],
    "multiSelect": true
  },
  "questionType": "MATH_GRAPH"
}
```

#### 1.1.4 Quadratic Inequalities (متباينات الدرجة الثانية)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Shade solution region on graph | `MATH_GRAPH` | `REGION_SELECT` | `REGION_MATCH` |
| Select solution interval on number line | **NEW: `NUMBER_LINE`** | `INTERVAL_SELECT` | `INTERVAL_MATCH` |
| Match inequality to its solution set | `MCQ` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |

---

### 1.2 Similarity (التشابه)

#### 1.2.1 Similar Polygons (تشابه المضلعات)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Identify corresponding vertices | **NEW: `GEOMETRY`** | `VERTEX_MATCH` | `PAIR_MATCH` |
| Calculate scale factor from diagram | `MCQ` | `DISPLAY_SELECT` | `NUMERIC_RANGE` |
| Drag to match corresponding sides | **NEW: `GEOMETRY`** | `DRAG_MATCH` | `PAIR_MATCH` |

**Example Question:**
```json
{
  "questionId": "math-similarity-1",
  "questionHead": "If ΔABC ~ ΔDEF, what is the ratio of similarity?",
  "questionHead_ar": "إذا كان △ABC ~ △DEF، ما هي نسبة التشابه؟",
  "questionBody": {
    "interactionMode": "DISPLAY_SELECT",
    "triangles": [
      { "name": "ABC", "sides": [3, 4, 5] },
      { "name": "DEF", "sides": [6, 8, 10] }
    ],
    "showDiagram": true
  },
  "questionType": "GEOMETRY"
}
```

#### 1.2.2 Similar Triangles (تشابه المثلثات)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Identify similarity criterion (AA, SAS, SSS) | `MCQ` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Find missing side length using similarity | **NEW: `GEOMETRY`** | `NUMERIC_INPUT` | `NUMERIC_RANGE` |
| Prove triangles are similar (step selection) | **NEW: `PROOF_BUILDER`** | `STEP_SELECT` | `PROOF_MATCH` |

#### 1.2.3 Area Ratio of Similar Polygons

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Calculate area ratio from linear ratio | `MCQ` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Visual comparison with area squares | **NEW: `GEOMETRY`** | `PARAMETER_ADJUST` | `NUMERIC_RANGE` |

#### 1.2.4 Circle Applications (تطبيقات التشابه في الدائرة)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Find chord length using similarity | **NEW: `CIRCLE_GEOMETRY`** | `NUMERIC_INPUT` | `NUMERIC_RANGE` |
| Identify similar triangles in circle | **NEW: `CIRCLE_GEOMETRY`** | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Power of a point calculation | **NEW: `CIRCLE_GEOMETRY`** | `NUMERIC_INPUT` | `NUMERIC_RANGE` |

---

### 1.3 Proportion Theorems (نظريات التناسب)

#### 1.3.1 Parallel Lines & Proportional Parts

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Find unknown segment length | **NEW: `GEOMETRY`** | `NUMERIC_INPUT` | `NUMERIC_RANGE` |
| Identify parallel lines from proportions | **NEW: `GEOMETRY`** | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Drag point to create specific ratio | **NEW: `GEOMETRY`** | `POINT_DRAG` | `NUMERIC_RANGE` |

#### 1.3.2 Angle Bisector Theorem (منصف الزاوية)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Calculate segment ratios | **NEW: `GEOMETRY`** | `NUMERIC_INPUT` | `NUMERIC_RANGE` |
| Locate point dividing segment in given ratio | **NEW: `GEOMETRY`** | `ADD_POINTS` | `POINTS_SET_MATCH` |

---

### 1.4 Trigonometry (حساب المثلثات)

#### 1.4.1 Directed Angles (الزاوية الموجهة)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Convert degrees to radians (slider) | **NEW: `UNIT_CIRCLE`** | `PARAMETER_ADJUST` | `NUMERIC_RANGE` |
| Place angle on unit circle | **NEW: `UNIT_CIRCLE`** | `ANGLE_INPUT` | `NUMERIC_RANGE` |
| Identify quadrant from angle | **NEW: `UNIT_CIRCLE`** | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |

**Example Question:**
```json
{
  "questionId": "math-trig-angle-1",
  "questionHead": "Convert 120° to radians",
  "questionHead_ar": "حول 120° إلى التقدير الدائري",
  "questionBody": {
    "interactionMode": "PARAMETER_ADJUST",
    "inputType": "radians",
    "showUnitCircle": true,
    "sliders": [
      { "param": "numerator", "min": 0, "max": 6, "step": 1 },
      { "param": "denominator", "options": [1, 2, 3, 4, 6] }
    ]
  },
  "questionType": "UNIT_CIRCLE"
}
```

#### 1.4.2 Trigonometric Functions (الدوال المثلثية)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Find sin/cos/tan from unit circle | **NEW: `UNIT_CIRCLE`** | `DISPLAY_SELECT` | `NUMERIC_RANGE` |
| Identify trig value sign by quadrant | **NEW: `UNIT_CIRCLE`** | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Match angle to point on unit circle | **NEW: `UNIT_CIRCLE`** | `ADD_POINTS` | `POINTS_SET_MATCH` |

**Example Question:**
```json
{
  "questionId": "math-trig-function-1",
  "questionHead": "Click on the unit circle to show where θ = 5π/6",
  "questionHead_ar": "اضغط على دائرة الوحدة لتحديد موضع θ = 5π/6",
  "questionBody": {
    "interactionMode": "ADD_POINTS",
    "showUnitCircle": true,
    "showGrid": true,
    "snapToSpecialAngles": true
  },
  "questionType": "UNIT_CIRCLE"
}
```

#### 1.4.3 Related Angles (الزوايا المنتسبة)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Find sin(180° - θ) given sin(θ) | `MCQ` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Match related angle formulas | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |
| Simplify expression using related angles | **NEW: `EXPRESSION_BUILDER`** | `STEP_SELECT` | `EXPRESSION_MATCH` |

#### 1.4.4 Graphing Trigonometric Functions

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Adjust amplitude, period, phase shift | `MATH_GRAPH` | `PARAMETER_ADJUST` | `NUMERIC_RANGE` |
| Identify function from graph | `MATH_GRAPH` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Find max/min points on trig graph | `MATH_GRAPH` | `ADD_POINTS` | `POINTS_SET_MATCH` |

**Example Question:**
```json
{
  "questionId": "math-trig-graph-1",
  "questionHead": "Adjust the parameters to match y = 2sin(x)",
  "questionHead_ar": "اضبط المعاملات لتطابق ص = 2جا(س)",
  "questionBody": {
    "interactionMode": "PARAMETER_ADJUST",
    "template": "trigonometric",
    "referenceCurve": { "type": "sin", "amplitude": 2, "period": "2π", "phase": 0, "vertical": 0 },
    "sliders": [
      { "param": "amplitude", "min": 0.5, "max": 3, "step": 0.5, "label": "Amplitude (السعة)" },
      { "param": "period", "min": 1, "max": 4, "step": 0.5, "label": "Period (الدورة)" },
      { "param": "phase", "min": -3.14, "max": 3.14, "step": 0.1, "label": "Phase Shift (الإزاحة الأفقية)" }
    ],
    "canvas": { "xMin": -6.28, "xMax": 6.28, "yMin": -3, "yMax": 3 }
  },
  "questionType": "MATH_GRAPH"
}
```

#### 1.4.5 Finding Angle from Trig Ratio

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Given sin(θ) = 0.5, find all θ in [0, 2π] | **NEW: `UNIT_CIRCLE`** | `ADD_POINTS` | `POINTS_SET_MATCH` |
| Select correct angle from options | `MCQ` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |

---

## 2. Integrated Sciences (العلوم المتكاملة)

The new curriculum combines Physics, Chemistry, and Biology into integrated themes focused on **Energy and Environment**.

### 2.1 Natural Resources (الموارد الطبيعية)

#### 2.1.1 Energy Transfer in Ecosystems

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Build food chain/web | **NEW: `ECOSYSTEM_BUILDER`** | `DRAG_CONNECT` | `CHAIN_MATCH` |
| Calculate energy transfer (10% rule) | `BAR_CHART` | `DISPLAY_SELECT` | `NUMERIC_RANGE` |
| Identify trophic levels | `MCQ` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |

**Example Question:**
```json
{
  "questionId": "sci-ecosystem-1",
  "questionHead": "Build a food chain: Grass → Grasshopper → Frog → Snake → Hawk",
  "questionHead_ar": "قم ببناء سلسلة غذائية: عشب ← جندب ← ضفدع ← ثعبان ← صقر",
  "questionBody": {
    "interactionMode": "DRAG_CONNECT",
    "organisms": [
      { "id": "grass", "name": "Grass (عشب)", "type": "producer" },
      { "id": "grasshopper", "name": "Grasshopper (جندب)", "type": "primary_consumer" },
      { "id": "frog", "name": "Frog (ضفدع)", "type": "secondary_consumer" },
      { "id": "snake", "name": "Snake (ثعبان)", "type": "tertiary_consumer" },
      { "id": "hawk", "name": "Hawk (صقر)", "type": "apex_predator" }
    ],
    "shuffled": true
  },
  "questionType": "ECOSYSTEM_BUILDER"
}
```

#### 2.1.2 Energy Pyramid

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Complete energy pyramid with values | **NEW: `PYRAMID_BUILDER`** | `NUMERIC_INPUT` | `NUMERIC_RANGE` |
| Select which level has most energy | `BAR_CHART` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |

### 2.2 Renewable & Non-Renewable Energy

#### 2.2.1 Energy Sources Classification

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Sort energy sources (drag to categories) | **NEW: `CATEGORY_SORT`** | `DRAG_SORT` | `CATEGORY_MATCH` |
| Compare CO2 emissions (bar chart) | `BAR_CHART` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |

**Example Question:**
```json
{
  "questionId": "sci-energy-sort-1",
  "questionHead": "Classify these energy sources as renewable or non-renewable",
  "questionHead_ar": "صنف مصادر الطاقة التالية إلى متجددة وغير متجددة",
  "questionBody": {
    "interactionMode": "DRAG_SORT",
    "categories": [
      { "id": "renewable", "name": "Renewable (متجددة)" },
      { "id": "nonrenewable", "name": "Non-renewable (غير متجددة)" }
    ],
    "items": [
      { "id": "solar", "name": "Solar (الشمسية)" },
      { "id": "coal", "name": "Coal (الفحم)" },
      { "id": "wind", "name": "Wind (الرياح)" },
      { "id": "oil", "name": "Oil (البترول)" },
      { "id": "geothermal", "name": "Geothermal (الحرارة الأرضية)" },
      { "id": "natural_gas", "name": "Natural Gas (الغاز الطبيعي)" }
    ]
  },
  "questionType": "CATEGORY_SORT"
}
```

#### 2.2.2 Solar Energy

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Adjust solar panel angle for max efficiency | **NEW: `SIMULATION`** | `PARAMETER_ADJUST` | `NUMERIC_RANGE` |
| Calculate solar panel output | `MCQ` | `DISPLAY_SELECT` | `NUMERIC_RANGE` |

#### 2.2.3 Biomass and Biofuels

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Order biofuel production steps | **NEW: `SEQUENCE_ORDER`** | `DRAG_ORDER` | `SEQUENCE_MATCH` |
| Identify biomass sources | `MCQ` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |

### 2.3 Resource Recycling (تدوير الموارد)

#### 2.3.1 Separation Techniques

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Match separation technique to mixture | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |
| Simulate distillation process | **NEW: `LAB_SIMULATION`** | `STEP_SELECT` | `SEQUENCE_MATCH` |

**Example Question:**
```json
{
  "questionId": "sci-separation-1",
  "questionHead": "Match each mixture with the best separation technique",
  "questionHead_ar": "طابق كل خليط مع أفضل طريقة فصل",
  "questionBody": {
    "interactionMode": "DRAG_MATCH",
    "mixtures": [
      { "id": "sand_water", "name": "Sand and Water (رمل وماء)" },
      { "id": "salt_water", "name": "Salt and Water (ملح وماء)" },
      { "id": "oil_water", "name": "Oil and Water (زيت وماء)" },
      { "id": "iron_sulfur", "name": "Iron and Sulfur (حديد وكبريت)" }
    ],
    "techniques": [
      { "id": "filtration", "name": "Filtration (الترشيح)" },
      { "id": "evaporation", "name": "Evaporation (التبخير)" },
      { "id": "funnel", "name": "Separating Funnel (القمع الفاصل)" },
      { "id": "magnet", "name": "Magnetic Separation (الفصل المغناطيسي)" }
    ]
  },
  "questionType": "DRAG_MATCH"
}
```

### 2.4 Green Hydrogen (الهيدروجين الأخضر)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Build electrolysis setup | **NEW: `LAB_SIMULATION`** | `DRAG_CONNECT` | `CIRCUIT_MATCH` |
| Compare hydrogen types (colors) | `BAR_CHART` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Trace hydrogen production pathway | **NEW: `FLOWCHART_BUILDER`** | `DRAG_CONNECT` | `FLOW_MATCH` |

### 2.5 Biotechnology (التكنولوجيا الحيوية)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Order genetic engineering steps | **NEW: `SEQUENCE_ORDER`** | `DRAG_ORDER` | `SEQUENCE_MATCH` |
| Match enzyme to function | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |
| Build DNA sequence (simplified) | **NEW: `DNA_BUILDER`** | `SEQUENCE_BUILD` | `SEQUENCE_MATCH` |

### 2.6 Nanotechnology (النانوتكنولوجي)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Scale comparison (drag to size order) | **NEW: `SCALE_COMPARISON`** | `DRAG_ORDER` | `SEQUENCE_MATCH` |
| Match nano-application to field | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |
| Calculate surface area to volume ratio | `MCQ` | `DISPLAY_SELECT` | `NUMERIC_RANGE` |

### 2.7 Chemistry Components (from Integrated Science)

#### 2.7.1 Molecular Building (Already Implemented!)

The existing `CHEMISTRY_MOLECULE_BUILDER` can be used for:

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Build water molecule (H₂O) | `CHEMISTRY_MOLECULE_BUILDER` | `MOLECULE_BUILD` | `MOLECULE_STRUCTURE_MATCH` |
| Build methane (CH₄) | `CHEMISTRY_MOLECULE_BUILDER` | `MOLECULE_BUILD` | `MOLECULE_STRUCTURE_MATCH` |
| Build carbon dioxide (CO₂) | `CHEMISTRY_MOLECULE_BUILDER` | `MOLECULE_BUILD` | `MOLECULE_STRUCTURE_MATCH` |
| Build ethanol (C₂H₅OH) | `CHEMISTRY_MOLECULE_BUILDER` | `MOLECULE_BUILD` | `MOLECULE_STRUCTURE_MATCH` |
| Build glucose (simplified) | `CHEMISTRY_MOLECULE_BUILDER` | `MOLECULE_BUILD` | `MOLECULE_STRUCTURE_MATCH` |

---

## 3. Arabic Language (اللغة العربية)

### 3.1 Grammar (النحو)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Parse sentence (إعراب) - select word roles | **NEW: `SENTENCE_PARSER`** | `WORD_TAG` | `TAG_MATCH` |
| Identify subject/predicate (مبتدأ/خبر) | **NEW: `SENTENCE_PARSER`** | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Fill correct diacritics (تشكيل) | **NEW: `DIACRITICS_EDITOR`** | `CHARACTER_INPUT` | `TEXT_MATCH` |
| Match verb form to pattern | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |

**Example Question:**
```json
{
  "questionId": "arabic-grammar-1",
  "questionHead": "حدد الفاعل في الجملة التالية: كتب الطالبُ الدرسَ",
  "questionBody": {
    "interactionMode": "WORD_TAG",
    "sentence": "كتب الطالبُ الدرسَ",
    "words": [
      { "id": "w1", "text": "كتب", "options": ["فعل", "فاعل", "مفعول به"] },
      { "id": "w2", "text": "الطالبُ", "options": ["فعل", "فاعل", "مفعول به"] },
      { "id": "w3", "text": "الدرسَ", "options": ["فعل", "فاعل", "مفعول به"] }
    ]
  },
  "questionType": "SENTENCE_PARSER"
}
```

### 3.2 Literature (الأدب)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Match poet to era | **NEW: `TIMELINE`** | `DRAG_MATCH` | `PAIR_MATCH` |
| Identify rhetorical devices (البلاغة) | **NEW: `TEXT_HIGHLIGHT`** | `TEXT_SELECT` | `TEXT_MATCH` |
| Order events in story | **NEW: `SEQUENCE_ORDER`** | `DRAG_ORDER` | `SEQUENCE_MATCH` |

### 3.3 Reading Comprehension (القراءة)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Highlight main idea in paragraph | **NEW: `TEXT_HIGHLIGHT`** | `TEXT_SELECT` | `TEXT_MATCH` |
| Match vocabulary to definitions | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |

---

## 4. History (التاريخ)

### 4.1 Timeline and Chronology

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Place events on timeline | **NEW: `TIMELINE`** | `DRAG_PLACE` | `SEQUENCE_MATCH` |
| Order historical events | **NEW: `SEQUENCE_ORDER`** | `DRAG_ORDER` | `SEQUENCE_MATCH` |
| Match date to event | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |

**Example Question:**
```json
{
  "questionId": "history-timeline-1",
  "questionHead": "Place these events on the timeline",
  "questionHead_ar": "ضع هذه الأحداث على خط الزمن",
  "questionBody": {
    "interactionMode": "DRAG_PLACE",
    "timeline": { "start": 1800, "end": 2000 },
    "events": [
      { "id": "e1", "name": "Muhammad Ali becomes ruler (محمد علي يتولى الحكم)", "year": 1805 },
      { "id": "e2", "name": "Suez Canal opens (افتتاح قناة السويس)", "year": 1869 },
      { "id": "e3", "name": "British Occupation (الاحتلال البريطاني)", "year": 1882 },
      { "id": "e4", "name": "1919 Revolution (ثورة 1919)", "year": 1919 },
      { "id": "e5", "name": "July Revolution (ثورة يوليو)", "year": 1952 }
    ]
  },
  "questionType": "TIMELINE"
}
```

### 4.2 Geography and Maps

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Identify locations on map | **NEW: `MAP_INTERACTIVE`** | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Trace historical routes | **NEW: `MAP_INTERACTIVE`** | `PATH_DRAW` | `PATH_MATCH` |
| Label map regions | **NEW: `MAP_INTERACTIVE`** | `LABEL_PLACE` | `LABEL_MATCH` |

### 4.3 Cause and Effect

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Match causes to effects | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |
| Build cause-effect flowchart | **NEW: `FLOWCHART_BUILDER`** | `DRAG_CONNECT` | `FLOW_MATCH` |

---

## 5. Philosophy and Logic (الفلسفة والمنطق)

### 5.1 Logic (المنطق)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Complete syllogism | **NEW: `LOGIC_BUILDER`** | `FILL_BLANK` | `TEXT_MATCH` |
| Identify logical fallacy | `MCQ` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Build truth table | **NEW: `TRUTH_TABLE`** | `TABLE_FILL` | `TABLE_MATCH` |
| Evaluate logical expression | **NEW: `LOGIC_BUILDER`** | `STEP_SELECT` | `LOGIC_MATCH` |

**Example Question:**
```json
{
  "questionId": "logic-syllogism-1",
  "questionHead": "Complete the syllogism: All mammals are warm-blooded. Dogs are mammals. Therefore...",
  "questionHead_ar": "أكمل القياس: كل الثدييات حيوانات ذات دم حار. الكلاب ثدييات. إذن...",
  "questionBody": {
    "interactionMode": "FILL_BLANK",
    "premises": [
      "All mammals are warm-blooded (كل الثدييات ذات دم حار)",
      "Dogs are mammals (الكلاب ثدييات)"
    ],
    "conclusionTemplate": "Dogs are _____"
  },
  "questionType": "LOGIC_BUILDER"
}
```

### 5.2 Venn Diagrams

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Place items in Venn diagram | **NEW: `VENN_DIAGRAM`** | `DRAG_PLACE` | `SET_MATCH` |
| Identify set relationships | **NEW: `VENN_DIAGRAM`** | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |
| Shade correct region | **NEW: `VENN_DIAGRAM`** | `REGION_SELECT` | `REGION_MATCH` |

### 5.3 Philosophy

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Match philosopher to school of thought | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |
| Identify philosophical argument type | `MCQ` | `DISPLAY_SELECT` | `EXACT_MATCH_LABEL` |

---

## 6. Foreign Languages

### 6.1 English Language

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Sentence reordering | **NEW: `SEQUENCE_ORDER`** | `DRAG_ORDER` | `SEQUENCE_MATCH` |
| Fill in the blank (grammar) | **NEW: `FILL_BLANK`** | `TEXT_INPUT` | `TEXT_MATCH` |
| Match vocabulary to images | **NEW: `IMAGE_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |
| Identify parts of speech | **NEW: `SENTENCE_PARSER`** | `WORD_TAG` | `TAG_MATCH` |

### 6.2 Second Foreign Language (French/German)

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Conjugation tables | **NEW: `TABLE_FILL`** | `TABLE_FILL` | `TABLE_MATCH` |
| Gender matching (articles) | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |

---

## 7. Programming and AI

### 7.1 Programming Basics

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Arrange code blocks | **NEW: `CODE_BLOCKS`** | `DRAG_ORDER` | `SEQUENCE_MATCH` |
| Trace code output | **NEW: `CODE_TRACE`** | `STEP_SELECT` | `TRACE_MATCH` |
| Fix syntax errors | **NEW: `CODE_EDITOR`** | `TEXT_EDIT` | `CODE_MATCH` |
| Build flowchart | **NEW: `FLOWCHART_BUILDER`** | `DRAG_CONNECT` | `FLOW_MATCH` |

**Example Question:**
```json
{
  "questionId": "prog-blocks-1",
  "questionHead": "Arrange these blocks to print numbers 1 to 5",
  "questionHead_ar": "رتب هذه الأوامر لطباعة الأرقام من 1 إلى 5",
  "questionBody": {
    "interactionMode": "DRAG_ORDER",
    "blocks": [
      { "id": "b1", "code": "for i in range(1, 6):" },
      { "id": "b2", "code": "    print(i)" }
    ],
    "shuffled": true,
    "language": "python"
  },
  "questionType": "CODE_BLOCKS"
}
```

### 7.2 AI Concepts

| Question Idea | Question Type | Interaction Mode | Validator |
|---------------|---------------|------------------|-----------|
| Classify AI applications | **NEW: `CATEGORY_SORT`** | `DRAG_SORT` | `CATEGORY_MATCH` |
| Match ML algorithm to use case | **NEW: `DRAG_MATCH`** | `DRAG_MATCH` | `PAIR_MATCH` |
| Decision tree building | **NEW: `TREE_BUILDER`** | `DRAG_CONNECT` | `TREE_MATCH` |

---

## 8. New Question Types Needed

Based on the analysis above, here are the **new question types and interaction modes** that should be implemented:

### 8.1 High Priority (Core Subjects)

| Question Type | Description | Subjects |
|---------------|-------------|----------|
| `UNIT_CIRCLE` | Interactive unit circle for trigonometry | Mathematics |
| `GEOMETRY` | Triangle, polygon, and circle constructions | Mathematics |
| `NUMBER_LINE` | Interactive number line for inequalities | Mathematics |
| `TIMELINE` | Draggable timeline for events | History |
| `DRAG_MATCH` | Match items by dragging | All subjects |
| `SEQUENCE_ORDER` | Order items in correct sequence | All subjects |
| `CATEGORY_SORT` | Sort items into categories | Sciences, Languages |
| `SENTENCE_PARSER` | Parse and tag words in sentences | Arabic, English |

### 8.2 Medium Priority

| Question Type | Description | Subjects |
|---------------|-------------|----------|
| `ECOSYSTEM_BUILDER` | Build food chains/webs | Integrated Sciences |
| `LAB_SIMULATION` | Virtual lab experiments | Integrated Sciences |
| `FLOWCHART_BUILDER` | Build process flowcharts | Sciences, Programming |
| `VENN_DIAGRAM` | Interactive Venn diagrams | Logic, Math |
| `CODE_BLOCKS` | Arrange code blocks | Programming |
| `MAP_INTERACTIVE` | Interactive maps | History |

### 8.3 Lower Priority (Enhancement)

| Question Type | Description | Subjects |
|---------------|-------------|----------|
| `TRUTH_TABLE` | Logic truth tables | Philosophy/Logic |
| `PROOF_BUILDER` | Step-by-step proof construction | Mathematics |
| `DNA_BUILDER` | Build DNA sequences | Biology (future) |
| `CIRCUIT_BUILDER` | Build electrical circuits | Physics (future) |
| `TEXT_HIGHLIGHT` | Highlight text selections | Literature |

### 8.4 New Interaction Modes Needed

| Mode | Description | Used By |
|------|-------------|---------|
| `DRAG_ORDER` | Reorder items by dragging | `SEQUENCE_ORDER`, `CODE_BLOCKS` |
| `DRAG_MATCH` | Match pairs by dragging | `DRAG_MATCH` |
| `DRAG_SORT` | Sort into categories | `CATEGORY_SORT` |
| `DRAG_PLACE` | Place on canvas/timeline | `TIMELINE`, `MAP_INTERACTIVE` |
| `DRAG_CONNECT` | Connect items with lines | `ECOSYSTEM_BUILDER`, `FLOWCHART_BUILDER` |
| `WORD_TAG` | Tag words in text | `SENTENCE_PARSER` |
| `TEXT_SELECT` | Select text portions | `TEXT_HIGHLIGHT` |
| `TABLE_FILL` | Fill table cells | `TRUTH_TABLE`, conjugation |
| `ANGLE_INPUT` | Input angle on circle | `UNIT_CIRCLE` |
| `INTERVAL_SELECT` | Select intervals | `NUMBER_LINE` |
| `REGION_SELECT` | Select/shade regions | `VENN_DIAGRAM`, graphs |
| `PATH_DRAW` | Draw path on map | `MAP_INTERACTIVE` |

### 8.5 New Validators Needed

| Validator | Description | Input Type |
|-----------|-------------|------------|
| `SEQUENCE_MATCH` | Check ordered sequence | Array of IDs |
| `PAIR_MATCH` | Check matched pairs | Object of pairs |
| `CATEGORY_MATCH` | Check category assignments | Object of categories |
| `TEXT_MATCH` | Check text with options | String |
| `TAG_MATCH` | Check word tags | Object of word-tag pairs |
| `FLOW_MATCH` | Check flowchart connections | Graph edges |
| `TABLE_MATCH` | Check table cell values | 2D array |
| `INTERVAL_MATCH` | Check selected intervals | Array of intervals |
| `SET_MATCH` | Check set membership | Object of sets |

---

## 9. Implementation Recommendations

### 9.1 Phase 1: Core Reusable Components

Start with the most reusable question types:

1. **`DRAG_MATCH`** - Used across all subjects
2. **`SEQUENCE_ORDER`** - Used for ordering in all subjects
3. **`CATEGORY_SORT`** - Used for classification in sciences and languages

### 9.2 Phase 2: Mathematics Focus

4. **`UNIT_CIRCLE`** - Critical for trigonometry
5. **`GEOMETRY`** - For similarity and proportions
6. **`NUMBER_LINE`** - For inequalities and intervals

### 9.3 Phase 3: Subject-Specific

7. **`TIMELINE`** - For history
8. **`SENTENCE_PARSER`** - For Arabic and English
9. **`ECOSYSTEM_BUILDER`** - For integrated sciences
10. **`CODE_BLOCKS`** - For programming

### 9.4 Localization

All questions should support:
- Bilingual text (Arabic + English)
- RTL layout for Arabic
- Arabic numeral support (٠١٢٣٤٥٦٧٨٩)

---

## 10. Sample Implementation: DRAG_MATCH

Here's a suggested implementation structure for the high-priority `DRAG_MATCH` question type:

```jsx
// types.js additions
export const QuestionType = Object.freeze({
  // ... existing
  DRAG_MATCH: 'DRAG_MATCH',
});

export const InteractionMode = Object.freeze({
  // ... existing
  DRAG_MATCH: 'DRAG_MATCH',
});

export const AnswerValidationType = Object.freeze({
  // ... existing
  PAIR_MATCH: 'PAIR_MATCH',
});
```

```jsx
// DragMatchQuestionRenderer.jsx (structure)
const DragMatchQuestionRenderer = ({ questionBody, value, onChange, disabled }) => {
  // questionBody: { leftItems: [], rightItems: [], matched: {} }
  // value: { matches: { leftId: rightId, ... } }
  
  return (
    <div className="drag-match-container">
      <div className="drag-match-left">
        {questionBody.leftItems.map(item => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </div>
      <div className="drag-match-right">
        {questionBody.rightItems.map(item => (
          <DropTarget key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
```

---

## Conclusion

This document outlines 100+ interactive question ideas covering all subjects in the Egyptian Grade 10 curriculum. The existing Eureka exercise system provides a solid foundation with:

- ✅ `MATH_GRAPH` with parameter adjustment (great for quadratics, trig)
- ✅ `BAR_CHART` for data analysis
- ✅ `CHEMISTRY_MOLECULE_BUILDER` for chemistry
- ✅ `MCQ` for basic questions

The recommended additions prioritize reusable components that serve multiple subjects, with mathematics and integrated sciences being the primary focus given their weight in the curriculum.
