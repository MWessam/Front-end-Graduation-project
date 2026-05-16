import { BaseData, FieldType } from '../BaseData';

export class MathGraphDomain extends BaseData {
  constructor(data = {}) {
    super(data);
    this.canvas = data.canvas || { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
    this.coordinateMode = data.coordinateMode || 'CARTESIAN';
    this.referenceCurve = data.referenceCurve || { a: 1, b: 0, c: 0 };
    this.curves = Array.isArray(data.curves) ? data.curves : [];
    this.vectors = Array.isArray(data.vectors) ? data.vectors : [];
    this.points = Array.isArray(data.points) ? data.points : [];
    this.angles = Array.isArray(data.angles) ? data.angles : [];
    this.parameters = Array.isArray(data.parameters) ? data.parameters : [];
  }

  static schema = [
    {
      key: 'canvas',
      type: FieldType.GROUP,
      label: 'Canvas',
      fields: [
        { key: 'xMin', type: FieldType.NUMBER, label: 'X / Re min', default: -5 },
        { key: 'xMax', type: FieldType.NUMBER, label: 'X / Re max', default: 5 },
        { key: 'yMin', type: FieldType.NUMBER, label: 'Y / Im min', default: -5 },
        { key: 'yMax', type: FieldType.NUMBER, label: 'Y / Im max', default: 5 },
      ],
    },
    {
      key: 'coordinateMode',
      type: FieldType.SELECT,
      label: 'Plane',
      options: ['CARTESIAN', 'COMPLEX_PLANE', 'NUMBER_LINE'],
      default: 'CARTESIAN',
    },
    {
      key: 'referenceCurve',
      type: FieldType.GROUP,
      label: 'Legacy quadratic target (a x² + b x + c)',
      fields: [
        { key: 'a', type: FieldType.NUMBER, label: 'a', default: 1 },
        { key: 'b', type: FieldType.NUMBER, label: 'b', default: 0 },
        { key: 'c', type: FieldType.NUMBER, label: 'c', default: 0 },
      ],
    },
    {
      key: 'parameters',
      type: FieldType.ARRAY,
      label: 'Graph parameters (sliders)',
      itemSchema: [
        { key: 'name', type: FieldType.TEXT, label: 'Name', default: 'a' },
        { key: 'min', type: FieldType.NUMBER, label: 'Min', default: -3 },
        { key: 'max', type: FieldType.NUMBER, label: 'Max', default: 3 },
        { key: 'step', type: FieldType.NUMBER, label: 'Step', default: 0.05 },
        { key: 'default', type: FieldType.NUMBER, label: 'Default', default: 1 },
      ],
    },
    {
      key: 'curves',
      type: FieldType.ARRAY,
      label: 'Curves',
      itemSchema: [
        {
          key: 'curveKind',
          type: FieldType.SELECT,
          label: 'Kind',
          options: ['explicit_y', 'parametric', 'quad'],
          default: 'explicit_y',
        },
        {
          key: 'expr',
          type: FieldType.TEXTAREA,
          label: 'Explicit y = f(x) (use x, params by name)',
          default: 'sin(x)',
        },
        { key: 'xExpr', type: FieldType.TEXT, label: 'Parametric x(t)', default: 'cos(t)' },
        { key: 'yExpr', type: FieldType.TEXT, label: 'Parametric y(t)', default: 'sin(t)' },
        { key: 'tMin', type: FieldType.NUMBER, label: 't min', default: 0 },
        { key: 'tMax', type: FieldType.NUMBER, label: 't max', default: 6.28318 },
        { key: 'qa', type: FieldType.NUMBER, label: 'Quad a', default: 1 },
        { key: 'qb', type: FieldType.NUMBER, label: 'Quad b', default: 0 },
        { key: 'qc', type: FieldType.NUMBER, label: 'Quad c', default: 0 },
        { key: 'color', type: FieldType.COLOR, label: 'Color', default: '#3b82f6' },
        {
          key: 'role',
          type: FieldType.SELECT,
          label: 'Role',
          options: ['reference', 'overlay'],
          default: 'reference',
        },
        { key: 'strokeDash', type: FieldType.TEXT, label: 'stroke-dasharray', default: '' },
      ],
    },
    {
      key: 'vectors',
      type: FieldType.ARRAY,
      label: 'Vectors',
      itemSchema: [
        { key: 'id', type: FieldType.TEXT, label: 'Id', default: 'v1' },
        { key: 'ox', type: FieldType.NUMBER, label: 'Origin x', default: 0 },
        { key: 'oy', type: FieldType.NUMBER, label: 'Origin y', default: 0 },
        { key: 'hx', type: FieldType.NUMBER, label: 'Head x', default: 1 },
        { key: 'hy', type: FieldType.NUMBER, label: 'Head y', default: 0 },
        { key: 'dragHead', type: FieldType.CHECKBOX, label: 'Drag head', default: true },
        { key: 'dragOrigin', type: FieldType.CHECKBOX, label: 'Drag origin', default: false },
      ],
    },
    {
      key: 'points',
      type: FieldType.ARRAY,
      label: 'Points',
      itemSchema: [
        { key: 'id', type: FieldType.TEXT, label: 'Id', default: 'p1' },
        { key: 'x', type: FieldType.NUMBER, label: 'x', default: 0 },
        { key: 'y', type: FieldType.NUMBER, label: 'y', default: 0 },
        { key: 'drag', type: FieldType.CHECKBOX, label: 'Draggable', default: true },
      ],
    },
    {
      key: 'angles',
      type: FieldType.ARRAY,
      label: 'Angle overlays (two vectors)',
      itemSchema: [
        { key: 'vectorIdA', type: FieldType.TEXT, label: 'Vector A id', default: 'v1' },
        { key: 'vectorIdB', type: FieldType.TEXT, label: 'Vector B id', default: 'v2' },
        { key: 'showArc', type: FieldType.CHECKBOX, label: 'Show arc', default: true },
        {
          key: 'allowDifferentOrigins',
          type: FieldType.CHECKBOX,
          label: 'Allow different tails (direction-only angle)',
          default: false,
        },
      ],
    },
  ];
}
