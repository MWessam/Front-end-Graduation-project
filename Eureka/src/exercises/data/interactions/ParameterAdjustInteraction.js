import { BaseData, FieldType } from '../BaseData';

export class ParameterAdjustInteraction extends BaseData {
  constructor(data = {}) {
    super(data);
    this.sliders = data.sliders || [
      { param: 'a', min: -5, max: 5, step: 0.1 },
      { param: 'b', min: -5, max: 5, step: 0.1 },
      { param: 'c', min: -5, max: 5, step: 0.1 },
    ];
  }

  static schema = [
    {
      key: 'sliders',
      type: FieldType.ARRAY,
      label: 'Sliders',
      itemSchema: [
        { key: 'param', type: FieldType.TEXT, label: 'Parameter (e.g., a)' },
        { key: 'min', type: FieldType.NUMBER, label: 'Min' },
        { key: 'max', type: FieldType.NUMBER, label: 'Max' },
        { key: 'step', type: FieldType.NUMBER, label: 'Step' },
      ]
    }
  ];
}
