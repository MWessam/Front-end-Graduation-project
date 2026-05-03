import { QuestionType, InteractionMode, AnswerValidationType } from './types';

/** Question payload serialized into BlockNote `question` props (jsonContent) or lesson legacy blocks */
export function createDefaultEmbeddedQuestion() {
  return {
    questionHead: 'Embedded question',
    questionType: QuestionType.MCQ,
    questionBody: {
      interactionMode: InteractionMode.DISPLAY_SELECT,
      context: '',
      domainData: {
        options: [
          { id: 'opt1', label: 'Option 1' },
          { id: 'opt2', label: 'Option 2' },
        ],
      },
      interactionData: {},
    },
    answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
    expectedAnswer: { label: 'Option 1' },
  };
}

export function stringifyEmbeddedQuestion(obj) {
  return JSON.stringify(obj ?? createDefaultEmbeddedQuestion());
}

/** @param {string} raw */
export function parseEmbeddedQuestion(raw) {
  if (raw == null || raw === '') return createDefaultEmbeddedQuestion();
  let data;
  try {
    data = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    return createDefaultEmbeddedQuestion();
  }
  if (!data || typeof data !== 'object') return createDefaultEmbeddedQuestion();

  if (typeof data.question === 'string' && Array.isArray(data.options)) {
    return {
      questionHead: data.question,
      questionType: QuestionType.MCQ,
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        context: '',
        domainData: {
          options: data.options.map((label, i) => ({
            id: `opt${i + 1}`,
            label: String(label),
          })),
        },
        interactionData: {},
      },
      answerValidationType: AnswerValidationType.EXACT_MATCH_LABEL,
      expectedAnswer: { label: data.options[0] != null ? String(data.options[0]) : '' },
    };
  }

  if (data.questionType && data.questionBody) {
    const d = createDefaultEmbeddedQuestion();
    return {
      questionHead: data.questionHead ?? d.questionHead,
      questionType: data.questionType,
      questionBody: {
        interactionMode:
          data.questionBody.interactionMode ?? d.questionBody.interactionMode,
        context: data.questionBody.context ?? '',
        domainData: data.questionBody.domainData ?? {},
        interactionData: data.questionBody.interactionData ?? {},
      },
      answerValidationType: data.answerValidationType ?? d.answerValidationType,
      expectedAnswer:
        data.expectedAnswer !== undefined ? data.expectedAnswer : d.expectedAnswer,
    };
  }

  const qt = data.type ?? data.questionType;
  if (qt === QuestionType.BAR_CHART || qt === 'BAR_CHART') {
    const chartData = Array.isArray(data.data) ? data.data : [];
    return {
      questionHead: data.question ?? data.questionHead ?? 'Bar chart question',
      questionType: QuestionType.BAR_CHART,
      questionBody: {
        interactionMode: InteractionMode.DISPLAY_SELECT,
        context: '',
        domainData: data.domainData ?? {
          context: data.context ?? '',
          chart: { data: chartData },
        },
        interactionData: data.interactionData ?? {},
      },
      answerValidationType:
        data.answerValidationType ?? AnswerValidationType.EXACT_MATCH_LABEL,
      expectedAnswer: data.expectedAnswer ?? { label: data.correctLabel ?? '' },
    };
  }

  if (qt === QuestionType.MATH_GRAPH || qt === 'MATH_GRAPH') {
    return {
      questionHead: data.questionHead ?? data.question ?? 'Graph question',
      questionType: QuestionType.MATH_GRAPH,
      questionBody: {
        interactionMode:
          data.questionBody?.interactionMode ?? InteractionMode.PARAMETER_ADJUST,
        context: data.questionBody?.context ?? data.context ?? '',
        domainData: data.questionBody?.domainData ?? data.domainData ?? {},
        interactionData: data.questionBody?.interactionData ?? data.interactionData ?? {},
      },
      answerValidationType:
        data.answerValidationType ?? AnswerValidationType.NUMERIC_RANGE,
      expectedAnswer: data.expectedAnswer ?? {},
    };
  }

  if (qt === QuestionType.CHEMISTRY_MOLECULE_BUILDER || qt === 'CHEMISTRY_MOLECULE_BUILDER') {
    return {
      questionHead: data.questionHead ?? data.question ?? 'Build the molecule',
      questionType: QuestionType.CHEMISTRY_MOLECULE_BUILDER,
      questionBody: {
        interactionMode:
          data.questionBody?.interactionMode ?? InteractionMode.MOLECULE_BUILD,
        context: data.questionBody?.context ?? data.context ?? '',
        domainData: data.questionBody?.domainData ?? data.domainData ?? {},
        interactionData: data.questionBody?.interactionData ?? data.interactionData ?? {},
      },
      answerValidationType:
        data.answerValidationType ?? AnswerValidationType.MOLECULE_STRUCTURE_MATCH,
      expectedAnswer: data.expectedAnswer ?? {},
    };
  }

  return createDefaultEmbeddedQuestion();
}
