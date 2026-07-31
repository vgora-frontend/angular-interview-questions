import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { after, before, describe, it } from 'node:test';
import { filesWithin } from './files.mjs';

describe('filesWithin()', () => {
  let root;
  const found = (...args) =>
    filesWithin(root, ...args)
      .map((p) => relative(root, p).split(sep).join('/'))
      .sort();

  before(() => {
    root = mkdtempSync(join(tmpdir(), 'files-test-'));
    mkdirSync(join(root, 'nested', 'deeper'), { recursive: true });
    writeFileSync(join(root, 'a.ts'), '');
    writeFileSync(join(root, 'a.html'), '');
    writeFileSync(join(root, 'a.scss'), '');
    writeFileSync(join(root, 'a.spec.ts'), '');
    writeFileSync(join(root, 'nested', 'b.ts'), '');
    writeFileSync(join(root, 'nested', 'deeper', 'c.html'), '');
  });

  after(() => rmSync(root, { recursive: true, force: true }));

  it('walks nested directories', () => {
    assert.deepEqual(found(['.html']), ['a.html', 'nested/deeper/c.html']);
  });

  it('keeps only the requested extensions', () => {
    assert.deepEqual(found(['.scss']), ['a.scss']);
  });

  it('accepts several extensions at once', () => {
    assert.deepEqual(found(['.html', '.scss']), ['a.html', 'a.scss', 'nested/deeper/c.html']);
  });

  it('returns nothing when no file matches', () => {
    assert.deepEqual(found(['.md']), []);
  });

  it('returns every match, leaving exclusions to the caller', () => {
    assert.deepEqual(found(['.ts']), ['a.spec.ts', 'a.ts', 'nested/b.ts']);
  });
});
