import { QuestionType } from '../types';
import BarChartQuestionRenderer from './BarChartQuestionRenderer';
import MathGraphQuestionRenderer from './MathGraphQuestionRenderer';
import ChemistryMoleculeBuilderQuestionRenderer from './ChemistryMoleculeBuilderQuestionRenderer';
// Phase 7: New math question renderers
import UnitCircleQuestionRenderer from './UnitCircleQuestionRenderer';
import NumberLineQuestionRenderer from './NumberLineQuestionRenderer';
import DragMatchQuestionRenderer from './DragMatchQuestionRenderer';
import GeometryQuestionRenderer from './GeometryQuestionRenderer';

/**
 * One renderer per QuestionType.
 * Each renderer has a list of strategies (per InteractionMode) that define
 * how to use questionBody to render sub-properties and state.
 */
const REGISTRY = {
  // Existing renderers
  [QuestionType.BAR_CHART]: BarChartQuestionRenderer,
  [QuestionType.MATH_GRAPH]: MathGraphQuestionRenderer,
  [QuestionType.CHEMISTRY_MOLECULE_BUILDER]: ChemistryMoleculeBuilderQuestionRenderer,
  
  // Phase 7: Math renderers
  [QuestionType.UNIT_CIRCLE]: UnitCircleQuestionRenderer,
  [QuestionType.NUMBER_LINE]: NumberLineQuestionRenderer,
  [QuestionType.DRAG_MATCH]: DragMatchQuestionRenderer,
  [QuestionType.GEOMETRY]: GeometryQuestionRenderer,
};

/**
 * @param {string} questionType - QuestionType enum value
 * @returns {React.ComponentType|null} Renderer component or null if unknown
 */
export function getQuestionRenderer(questionType) {
  return REGISTRY[questionType] ?? null;
}

/**
 * Register a renderer for a question type.
 * @param {string} questionType
 * @param {React.ComponentType} component
 */
export function registerQuestionRenderer(questionType, component) {
  REGISTRY[questionType] = component;
}
