import { BaseData, FieldType } from '../BaseData';

export class DisplaySelectInteraction extends BaseData {
  constructor(data = {}) {
    super(data);
    this.multiSelect = data.multiSelect || false;
  }

  static schema = [
    {
      key: 'multiSelect',
      type: FieldType.CHECKBOX,
      label: 'Allow Multiple Selection',
      default: false
    }
  ];
}
