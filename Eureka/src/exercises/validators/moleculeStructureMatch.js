import { FieldType } from '../data/BaseData';

/**
 * Validator: MOLECULE_STRUCTURE_MATCH
 * Compares user's molecule (nodes + edges) to expected structure.
 * expectedAnswerBody: { elementCounts: { C: 1, H: 4 }, bonds: [{ from, to, bondType }] }
 * or simplified: { elementCounts, bondCount, bondTypeCounts: { single: 4 } }.
 * User answer: { nodes: [{ id, element }], edges: [{ from, to, bondType }] }
 * @param {object} userAnswer - { nodes?: [], edges?: [] }
 * @param {object} expectedAnswerBody - { elementCounts, bonds? } or { elementCounts, bondCount, bondTypeCounts }
 * @returns {{ correct: boolean, feedback?: string }}
 */
function moleculeStructureMatch(userAnswer, expectedAnswerBody) {
  const nodes = userAnswer?.nodes ?? [];
  const edges = userAnswer?.edges ?? [];

  const elementCounts = {};
  for (const n of nodes) {
    const e = n.element ?? n;
    elementCounts[e] = (elementCounts[e] || 0) + 1;
  }

  const bondTypeCounts = { single: 0, double: 0, triple: 0 };
  for (const b of edges) {
    const t = (b.bondType ?? 'single').toLowerCase();
    bondTypeCounts[t] = (bondTypeCounts[t] ?? 0) + 1;
  }

  const exp = expectedAnswerBody ?? {};
  
  // Handle array-to-object conversion for elementCounts if coming from schema
  let expCounts = exp.elementCounts ?? {};
  if (Array.isArray(expCounts)) {
      const map = {};
      expCounts.forEach(item => { map[item.element] = Number(item.count); });
      expCounts = map;
  }

  for (const [el, count] of Object.entries(expCounts)) {
    if ((elementCounts[el] || 0) !== count) {
      return {
        correct: false,
        feedback: `Expected ${count} ${el} atom(s), got ${elementCounts[el] || 0}.`,
      };
    }
  }
  for (const el of Object.keys(elementCounts)) {
    if (!(el in expCounts)) {
      return { correct: false, feedback: `Unexpected element: ${el}.` };
    }
  }

  const expBondCount = Number(exp.bondCount) || (exp.bonds?.length ?? 0);
  if (edges.length !== expBondCount) {
    return {
      correct: false,
      feedback: `Expected ${expBondCount} bond(s), got ${edges.length}.`,
    };
  }

  // Handle array-to-object conversion for bondTypeCounts if coming from schema
  let expTypeCounts = exp.bondTypeCounts ?? {};
  if (Array.isArray(expTypeCounts)) {
      const map = {};
      expTypeCounts.forEach(item => { map[item.type] = Number(item.count); });
      expTypeCounts = map;
  }

  for (const [t, count] of Object.entries(expTypeCounts)) {
    const c = bondTypeCounts[t] ?? 0;
    if (c !== count) {
      return {
        correct: false,
        feedback: `Expected ${count} ${t} bond(s), got ${c}.`,
      };
    }
  }

  return { correct: true };
}

moleculeStructureMatch.schema = [
    {
        key: 'elementCounts',
        type: FieldType.ARRAY,
        label: 'Expected Elements',
        itemSchema: [
            { key: 'element', type: FieldType.TEXT, label: 'Element (e.g. C)' },
            { key: 'count', type: FieldType.NUMBER, label: 'Count' }
        ]
    },
    {
        key: 'bondCount',
        type: FieldType.NUMBER,
        label: 'Total Bond Count'
    },
    {
        key: 'bondTypeCounts',
        type: FieldType.ARRAY,
        label: 'Bond Types',
        itemSchema: [
            { key: 'type', type: FieldType.SELECT, options: ['single', 'double', 'triple'] },
            { key: 'count', type: FieldType.NUMBER, label: 'Count' }
        ]
    }
];

export default moleculeStructureMatch;
