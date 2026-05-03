import { BaseData, FieldType } from '../BaseData';

export class McqDomain extends BaseData {
  constructor(data = {}) {
    super(data);
    this.options = data.options || [
      { id: 'opt1', label: 'Option 1' },
      { id: 'opt2', label: 'Option 2' },
    ];
  }

  static schema = [
    {
      key: 'options',
      type: FieldType.ARRAY,
      label: 'Options',
      itemSchema: [
        { key: 'id', type: FieldType.TEXT, label: 'ID (unique)', default: '' },
        { key: 'label', type: FieldType.TEXT, label: 'Label', default: '' },
      ]
    }
  ];
}
