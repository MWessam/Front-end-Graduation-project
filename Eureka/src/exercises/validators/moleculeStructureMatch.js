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
export default function moleculeStructureMatch(userAnswer, expectedAnswerBody) {
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
  const expCounts = exp.elementCounts ?? {};
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

  const expBondCount = exp.bondCount ?? (exp.bonds?.length ?? 0);
  if (edges.length !== expBondCount) {
    return {
      correct: false,
      feedback: `Expected ${expBondCount} bond(s), got ${edges.length}.`,
    };
  }

  const expTypeCounts = exp.bondTypeCounts ?? {};
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
