import { BaseData, FieldType } from '../BaseData';

export class MathGraphDomain extends BaseData {
  constructor(data = {}) {
    super(data);
    this.canvas = data.canvas || { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
    this.referenceCurve = data.referenceCurve || { a: 1, b: 0, c: 0 };
  }

  static schema = [
    {
      key: 'canvas',
      type: FieldType.GROUP,
      label: 'Canvas Settings',
      fields: [
        { key: 'xMin', type: FieldType.NUMBER, label: 'X Min', default: -5 },
        { key: 'xMax', type: FieldType.NUMBER, label: 'X Max', default: 5 },
        { key: 'yMin', type: FieldType.NUMBER, label: 'Y Min', default: -5 },
        { key: 'yMax', type: FieldType.NUMBER, label: 'Y Max', default: 5 },
      ]
    },
    {
      key: 'referenceCurve',
      type: FieldType.GROUP,
      label: 'Target Curve (ax² + bx + c)',
      fields: [
        { key: 'a', type: FieldType.NUMBER, label: 'a (Quadratic)', default: 1 },
        { key: 'b', type: FieldType.NUMBER, label: 'b (Linear)', default: 0 },
        { key: 'c', type: FieldType.NUMBER, label: 'c (Constant)', default: 0 },
      ]
    }
  ];
}
