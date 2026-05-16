import { BaseData, FieldType } from '../BaseData';

/** Toggles secondary interactions when mode is GRAPH_COMPOSITE */
export class GraphCompositeInteraction extends BaseData {
  constructor(data = {}) {
    super(data);
    this.enableParameterAdjust =
      data.enableParameterAdjust !== undefined ? !!data.enableParameterAdjust : false;
    this.enableVectorDrag = !!data.enableVectorDrag;
    this.enablePointDrag = !!data.enablePointDrag;
    this.enableMcq = !!data.enableMcq;
    this.sliders = data.sliders || [];
    this.options = data.options?.length >= 2
      ? data.options
      : [
          { id: 'opt_a', label: 'Option A' },
          { id: 'opt_b', label: 'Option B' },
        ];
  }

  static schema = [
    { key: 'enableParameterAdjust', type: FieldType.CHECKBOX, label: 'Parameter sliders', default: false },
    { key: 'enableVectorDrag', type: FieldType.CHECKBOX, label: 'Vector drag', default: false },
    { key: 'enablePointDrag', type: FieldType.CHECKBOX, label: 'Point drag', default: false },
    { key: 'enableMcq', type: FieldType.CHECKBOX, label: 'MCQ panel', default: false },
    {
      key: 'sliders',
      type: FieldType.ARRAY,
      label: 'Sliders (when parameters enabled)',
      itemSchema: [
        { key: 'param', type: FieldType.TEXT, label: 'Parameter name' },
        { key: 'min', type: FieldType.NUMBER, label: 'Min' },
        { key: 'max', type: FieldType.NUMBER, label: 'Max' },
        { key: 'step', type: FieldType.NUMBER, label: 'Step' },
      ],
    },
    {
      key: 'options',
      type: FieldType.ARRAY,
      label: 'MCQ options (when MCQ enabled)',
      itemSchema: [
        { key: 'id', type: FieldType.TEXT, label: 'ID', default: '' },
        { key: 'label', type: FieldType.TEXT, label: 'Label', default: '' },
      ],
    },
  ];
}
