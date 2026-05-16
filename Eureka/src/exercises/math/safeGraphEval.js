/**
 * Safe math evaluator for graphing (no Function(), no eval).
 * Variables come from an explicit scope object (e.g. { x: 1, a: 2 }).
 */

const FUNCS = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sqrt: Math.sqrt,
  abs: Math.abs,
  exp: Math.exp,
  ln: Math.log,
  log: Math.log,
};

function isIdentStart(c) {
  return /[a-zA-Z_]/.test(c);
}

function isIdentRest(c) {
  return /[a-zA-Z0-9_]/.test(c);
}

export function tokenize(raw) {
  const s = String(raw).trim();
  const out = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === ' ' || c === '\t' || c === '\n') {
      i++;
      continue;
    }
    if (c === '(') {
      out.push({ type: 'LPAREN' });
      i++;
      continue;
    }
    if (c === ')') {
      out.push({ type: 'RPAREN' });
      i++;
      continue;
    }
    if (c === ',') {
      out.push({ type: 'COMMA' });
      i++;
      continue;
    }
    if (c === '+') {
      out.push({ type: 'PLUS' });
      i++;
      continue;
    }
    if (c === '-') {
      out.push({ type: 'MINUS' });
      i++;
      continue;
    }
    if (c === '*') {
      out.push({ type: 'STAR' });
      i++;
      continue;
    }
    if (c === '/') {
      out.push({ type: 'SLASH' });
      i++;
      continue;
    }
    if (c === '^') {
      out.push({ type: 'POW' });
      i++;
      continue;
    }
    if (/\d/.test(c) || (c === '.' && /\d/.test(s[i + 1] || ''))) {
      let j = i;
      while (j < s.length && /\d/.test(s[j])) j++;
      if (s[j] === '.') {
        j++;
        while (j < s.length && /\d/.test(s[j])) j++;
      }
      const num = Number(s.slice(i, j));
      if (Number.isNaN(num)) throw new Error('Invalid number');
      out.push({ type: 'NUMBER', value: num });
      i = j;
      continue;
    }
    if (isIdentStart(c)) {
      let j = i + 1;
      while (j < s.length && isIdentRest(s[j])) j++;
      out.push({ type: 'IDENT', value: s.slice(i, j) });
      i = j;
      continue;
    }
    throw new Error(`Unexpected character '${c}' in expression`);
  }
  out.push({ type: 'EOF' });
  return out;
}

class Parser {
  constructor(tokens, scope) {
    this.tokens = tokens;
    this.i = 0;
    this.scope = scope;
  }

  peek() {
    return this.tokens[this.i];
  }

  eat(type) {
    const t = this.peek();
    if (t.type !== type) throw new Error(`Expected ${type}, got ${t.type}`);
    this.i++;
    return t;
  }

  parseExpr() {
    return this.parseAdd();
  }

  parseAdd() {
    let n = this.parseMul();
    while (this.peek().type === 'PLUS' || this.peek().type === 'MINUS') {
      const op = this.peek().type;
      this.i++;
      const r = this.parseMul();
      n = op === 'PLUS' ? n + r : n - r;
    }
    return n;
  }

  parseMul() {
    let n = this.parsePow();
    while (this.peek().type === 'STAR' || this.peek().type === 'SLASH') {
      const op = this.peek().type;
      this.i++;
      const r = this.parsePow();
      n = op === 'STAR' ? n * r : n / r;
    }
    return n;
  }

  parsePow() {
    let n = this.parseUnary();
    while (this.peek().type === 'POW') {
      this.i++;
      const r = this.parseUnary();
      n = n ** r;
    }
    return n;
  }

  parseUnary() {
    if (this.peek().type === 'MINUS') {
      this.i++;
      return -this.parseUnary();
    }
    return this.parsePrimary();
  }

  parsePrimary() {
    const t = this.peek();
    if (t.type === 'NUMBER') {
      this.i++;
      return t.value;
    }
    if (t.type === 'LPAREN') {
      this.i++;
      const v = this.parseExpr();
      this.eat('RPAREN');
      return v;
    }
    if (t.type === 'IDENT') {
      const name = t.value;
      this.i++;
      const lower = name.toLowerCase();
      if (lower === 'pi') return Math.PI;
      if (lower === 'e') return Math.E;

      if (this.peek().type === 'LPAREN') {
        const fn = FUNCS[lower];
        if (!fn) throw new Error(`Unknown function '${name}'`);
        this.i++;
        const arg = this.parseExpr();
        this.eat('RPAREN');
        return fn(arg);
      }

      if (!Object.prototype.hasOwnProperty.call(this.scope, name)) {
        throw new Error(`Unknown variable '${name}'`);
      }
      return Number(this.scope[name]);
    }
    throw new Error(`Unexpected token ${t.type}`);
  }
}

export function evaluateExpression(expression, scope) {
  const tokens = tokenize(expression);
  const p = new Parser(tokens, scope);
  const v = p.parseExpr();
  if (p.peek().type !== 'EOF') throw new Error('Trailing input in expression');
  if (!Number.isFinite(v)) throw new Error('Non-finite value');
  return v;
}

export function sampleYs(expr, varName, xs, scopeBase) {
  return xs.map((xv) =>
    evaluateExpression(expr, { ...scopeBase, [varName]: Number(xv) })
  );
}

export function sampleParametric(xExpr, yExpr, ts, scopeBase) {
  return ts.map((tv) => {
    const scope = { ...scopeBase, t: Number(tv) };
    return [evaluateExpression(xExpr, scope), evaluateExpression(yExpr, scope)];
  });
}
