import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { blankComments, definedTokens, tokenReferences } from './css.mjs';

describe('definedTokens()', () => {
  it('collects --name: declarations', () => {
    const sheet = ':root {\n  --bg: #fff;\n  --ink: #000;\n}';
    assert.deepEqual([...definedTokens(sheet)].sort(), ['--bg', '--ink']);
  });

  it('does not mistake a var() use for a declaration', () => {
    assert.deepEqual([...definedTokens('body { color: var(--ink); }')], []);
  });

  it('ignores declarations inside comments', () => {
    assert.deepEqual(
      [...definedTokens('/* --ghost: red; */\n:root { --real: blue; }')],
      ['--real'],
    );
  });
});

describe('tokenReferences()', () => {
  it('finds a reference and its line', () => {
    const sheet = 'a {\n  color: var(--accent);\n}';
    assert.deepEqual(tokenReferences(sheet), [{ token: '--accent', line: 2 }]);
  });

  it('finds several references on one line', () => {
    const sheet = 'a { border: 1px solid var(--border); color: var(--ink); }';
    assert.deepEqual(tokenReferences(sheet), [
      { token: '--border', line: 1 },
      { token: '--ink', line: 1 },
    ]);
  });

  it('tolerates whitespace after var(', () => {
    assert.deepEqual(tokenReferences('a { color: var( --ink ); }'), [{ token: '--ink', line: 1 }]);
  });

  it('ignores a reference in a single-line block comment', () => {
    assert.deepEqual(tokenReferences('a { /* var(--ghost) */ color: red; }'), []);
  });

  it('ignores a reference inside a MULTI-line comment', () => {
    // Regression: the scanner used to strip comments line by line, so a
    // documented `var()` example spanning lines was reported as an unknown token.
    const sheet = ['/**', ' * Paint it with mask: var(--icon-x).', ' */', 'a { color: red; }'].join(
      '\n',
    );
    assert.deepEqual(tokenReferences(sheet), []);
  });

  it('ignores a reference in a // comment', () => {
    assert.deepEqual(tokenReferences('a {\n  // color: var(--ghost);\n  color: red;\n}'), []);
  });

  it('keeps line numbers correct after a multi-line comment', () => {
    const sheet = ['/*', ' * two', ' * lines', ' */', 'a { color: var(--ink); }'].join('\n');
    assert.deepEqual(tokenReferences(sheet), [{ token: '--ink', line: 5 }]);
  });

  it('does not treat a url() protocol slash as a comment', () => {
    const sheet = "a { mask: url('data:image/svg+xml,%3Csvg/%3E'); color: var(--ink); }";
    assert.deepEqual(tokenReferences(sheet), [{ token: '--ink', line: 1 }]);
  });
});

describe('blankComments()', () => {
  it('preserves the line count so numbers stay aligned', () => {
    const sheet = 'a\n/* x\n   y */\nb';
    assert.equal(blankComments(sheet).split('\n').length, sheet.split('\n').length);
  });

  it('leaves code untouched', () => {
    assert.equal(blankComments('a { color: red; }'), 'a { color: red; }');
  });
});
