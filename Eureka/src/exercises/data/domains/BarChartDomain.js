import { BaseData, FieldType } from '../BaseData';

export class BarChartDomain extends BaseData {
  constructor(data = {}) {
    super(data);
    this.context = data.context || '';
    this.chart = data.chart || { data: [] };
  }

  static schema = [
    {
      key: 'context',
      type: FieldType.TEXTAREA,
      label: 'Context / Description',
      default: ''
    },
    {
      key: 'chart',
      type: FieldType.GROUP,
      label: 'Chart Data',
      fields: [
        {
          key: 'data',
          type: FieldType.ARRAY,
          label: 'Bars',
          itemSchema: [
            { key: 'label', type: FieldType.TEXT, label: 'Label' },
            { key: 'value', type: FieldType.NUMBER, label: 'Value' },
            { key: 'color', type: FieldType.COLOR, label: 'Color', default: '#3b82f6' }
          ]
        }
      ]
    }
  ];
}
