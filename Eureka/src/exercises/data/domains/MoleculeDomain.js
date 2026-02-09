import { BaseData, FieldType } from '../BaseData';

export class MoleculeDomain extends BaseData {
  constructor(data = {}) {
    super(data);
    this.initialStructure = data.initialStructure || { nodes: [], edges: [] };
  }

  static schema = [
    {
      key: 'initialStructure',
      type: FieldType.GROUP,
      label: 'Initial Structure (Optional)',
      fields: [
         // We can expand this later if we want to preload atoms
         // For now, it's mostly empty or minimal
      ]
    }
  ];
}
