import { BaseData, FieldType } from '../BaseData';

export class GraphMcqInteraction extends BaseData {
  constructor(data = {}) {
    super(data);
    this.options =
      data.options?.length >= 2
        ? data.options
        : [
            { id: 'opt_a', label: 'Option A' },
            { id: 'opt_b', label: 'Option B' },
          ];
  }

  static schema = [
    {
      key: 'options',
      type: FieldType.ARRAY,
      label: 'MCQ Options',
      itemSchema: [
        { key: 'id', type: FieldType.TEXT, label: 'ID', default: '' },
        { key: 'label', type: FieldType.TEXT, label: 'Label', default: '' },
      ],
    },
  ];
}
