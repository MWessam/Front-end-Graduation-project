/**
 * Exercise system enums.
 * Single source of truth for question types, interaction modes, and validation strategies.
 */

export const QuestionType = Object.freeze({
  // Existing types
  MATH_GRAPH: 'MATH_GRAPH',
  BAR_CHART: 'BAR_CHART',
  MCQ: 'MCQ',
  CHEMISTRY_MOLECULE_BUILDER: 'CHEMISTRY_MOLECULE_BUILDER',
  
  // Phase 7: Mathematics Question Types
  UNIT_CIRCLE: 'UNIT_CIRCLE',           // Trigonometry - directed angles, trig functions
  NUMBER_LINE: 'NUMBER_LINE',           // Inequalities - interval selection
  DRAG_MATCH: 'DRAG_MATCH',             // Matching pairs - used across subjects
  GEOMETRY: 'GEOMETRY',                 // Similarity - triangles, polygons
  CIRCLE_GEOMETRY: 'CIRCLE_GEOMETRY',   // Circle applications - chords, tangents
  PROOF_BUILDER: 'PROOF_BUILDER',       // Step-by-step proofs
  TABLE_FILL: 'TABLE_FILL',             // Sign tables, truth tables
});

export const InteractionMode = Object.freeze({
  // Existing modes
  DISPLAY_SELECT: 'DISPLAY_SELECT',
  FUNCTION_INPUT: 'FUNCTION_INPUT',
  PARAMETER_ADJUST: 'PARAMETER_ADJUST',
  ADD_POINTS: 'ADD_POINTS',
  MOLECULE_BUILD: 'MOLECULE_BUILD',
  
  // Phase 7: New Interaction Modes
  NUMERIC_INPUT: 'NUMERIC_INPUT',         // Enter a numeric value
  ANGLE_INPUT: 'ANGLE_INPUT',             // Click/drag to set angle on unit circle
  INTERVAL_SELECT: 'INTERVAL_SELECT',     // Select interval on number line
  REGION_SELECT: 'REGION_SELECT',         // Shade/select regions on graph
  DRAG_MATCH: 'DRAG_MATCH',               // Drag items to match pairs
  DRAG_ORDER: 'DRAG_ORDER',               // Drag items into correct order
  VERTEX_MATCH: 'VERTEX_MATCH',           // Match corresponding vertices
  POINT_DRAG: 'POINT_DRAG',               // Drag point to specific location
  MULTI_POINT_SELECT: 'MULTI_POINT_SELECT', // Select multiple points
  STEP_SELECT: 'STEP_SELECT',             // Select proof steps in order
  TABLE_FILL: 'TABLE_FILL',               // Fill table cells
});

export const AnswerValidationType = Object.freeze({
  // Existing validators
  EXACT_MATCH_LABEL: 'EXACT_MATCH_LABEL',
  FUNCTION_EQUIVALENCE: 'FUNCTION_EQUIVALENCE',
  NUMERIC_RANGE: 'NUMERIC_RANGE',
  POINTS_SET_MATCH: 'POINTS_SET_MATCH',
  MOLECULE_STRUCTURE_MATCH: 'MOLECULE_STRUCTURE_MATCH',
  
  // Phase 7: New Validators
  PAIR_MATCH: 'PAIR_MATCH',               // Check matched pairs are correct
  INTERVAL_MATCH: 'INTERVAL_MATCH',       // Check interval endpoints and open/closed
  REGION_MATCH: 'REGION_MATCH',           // Check shaded regions
  SEQUENCE_MATCH: 'SEQUENCE_MATCH',       // Check ordered sequence
  TABLE_MATCH: 'TABLE_MATCH',             // Check table cell values
  ANGLE_MATCH: 'ANGLE_MATCH',             // Check angle value within tolerance
});
