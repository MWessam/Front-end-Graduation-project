import { QuestionType } from '../types';
import BarChartQuestionRenderer from './BarChartQuestionRenderer';
import MathGraphQuestionRenderer from './MathGraphQuestionRenderer';
import ChemistryMoleculeBuilderQuestionRenderer from './ChemistryMoleculeBuilderQuestionRenderer';
import ChemistryReactionRenderer from './ChemistryReactionRenderer';
import MathMatrixMultiplicationRenderer from './MathMatrixMultiplicationRenderer';
import MathComplexNumberRenderer from './MathComplexNumberRenderer';
import PhysicsProjectileRenderer from './PhysicsProjectileRenderer';
import VectorInteractionRenderer from './VectorInteractionRenderer';

/**
 * One renderer per QuestionType.
 * Each renderer has a list of strategies (per InteractionMode) that define
 * how to use questionBody to render sub-properties and state.
 */
const REGISTRY = {
  [QuestionType.BAR_CHART]: BarChartQuestionRenderer,
  [QuestionType.MATH_GRAPH]: MathGraphQuestionRenderer,
  [QuestionType.CHEMISTRY_MOLECULE_BUILDER]: ChemistryMoleculeBuilderQuestionRenderer,
  [QuestionType.CHEMISTRY_REACTION]: ChemistryReactionRenderer,
  [QuestionType.MATH_MATRIX_MULTIPLICATION]: MathMatrixMultiplicationRenderer,
  [QuestionType.MATH_COMPLEX_NUMBER]: MathComplexNumberRenderer,
  [QuestionType.PHYSICS_PROJECTILE]: PhysicsProjectileRenderer,
  [QuestionType.MATH_VECTOR_OPERATION]: VectorInteractionRenderer,
  // [QuestionType.MCQ]: McqQuestionRenderer,
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
