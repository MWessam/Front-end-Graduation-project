import { BaseData, FieldType } from '../BaseData';

export class MoleculeBuildInteraction extends BaseData {
  constructor(data = {}) {
    super(data);
    this.allowedElements = data.allowedElements || ['C', 'H', 'O', 'N'];
    this.allowedBonds = data.allowedBonds || ['single', 'double', 'triple'];
  }

  static schema = [
    {
      key: 'allowedElements',
      type: FieldType.ARRAY,
      label: 'Allowed Elements',
      itemSchema: [
          { key: 'value', type: FieldType.TEXT, label: 'Symbol (e.g. C)' }
      ]
    },
    {
        key: 'allowedBonds',
        type: FieldType.ARRAY,
        label: 'Allowed Bond Types',
        itemSchema: [
             { key: 'value', type: FieldType.SELECT, options: ['single', 'double', 'triple'] }
        ]
    }
  ];
}
