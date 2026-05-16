import { describe, expect, it } from 'vitest';
import { evaluateExpression, tokenize } from './safeGraphEval';

describe('safeGraphEval', () => {
  it('evaluates unary and sin', () => {
    expect(evaluateExpression('sin(x)', { x: 0 })).toBeCloseTo(0, 10);
    expect(evaluateExpression('sin(x)', { x: Math.PI / 2 })).toBeCloseTo(1, 10);
  });

  it('respects precedence and exponentiation', () => {
    expect(evaluateExpression('2^3+4', {})).toBeCloseTo(12, 10);
    expect(evaluateExpression('x^2-1', { x: 2 })).toBeCloseTo(3, 10);
  });

  it('tokenizes identifiers', () => {
    expect(tokenize('sin(x)').some((t) => t.type === 'IDENT')).toBe(true);
  });
});
