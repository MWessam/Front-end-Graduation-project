import { describe, it, expect } from 'vitest';
import exactMatchLabel from './exactMatchLabel';

describe('exactMatchLabel validator', () => {
  it('should return correct: true for exact match (case insensitive)', () => {
    const result = exactMatchLabel({ selectedLabel: 'Paris' }, 'paris');
    expect(result.correct).toBe(true);
  });

  it('should return correct: true for exact match with whitespace', () => {
    const result = exactMatchLabel({ selectedLabel: ' Paris ' }, 'paris');
    expect(result.correct).toBe(true);
  });

  it('should return correct: false for mismatch', () => {
    const result = exactMatchLabel({ selectedLabel: 'London' }, 'paris');
    expect(result.correct).toBe(false);
    expect(result.feedback).toBe('Expected "paris".');
  });

  it('should handle object as expectedAnswerBody', () => {
    const result = exactMatchLabel({ selectedLabel: 'Paris' }, { label: 'Paris' });
    expect(result.correct).toBe(true);
  });

  it('should handle selectedId if selectedLabel is missing', () => {
    const result = exactMatchLabel({ selectedId: 'Paris' }, 'paris');
    expect(result.correct).toBe(true);
  });
});
