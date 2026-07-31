import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { keysIn, stripComments } from './keys.mjs';

const found = (content) =>
  keysIn(content, 'x.html').map(({ kind, key, line }) => `${kind}:${key}:${line}`);

describe('keysIn()', () => {
  it('finds a static key in a transloco pipe', () => {
    assert.deepEqual(found(`{{ 'header.about' | transloco }}`), ['key:header.about:1']);
  });

  it('finds a key in an attribute binding, with either quote style', () => {
    assert.deepEqual(found(`[attr.aria-label]="'a.b' | transloco"`), ['key:a.b:1']);
  });

  it('reports the line the key sits on', () => {
    assert.deepEqual(found(`one\ntwo\n{{ 'a.b' | transloco }}`), ['key:a.b:3']);
  });

  it('treats a concatenated key as a prefix, dropping the trailing dot', () => {
    assert.deepEqual(found(`{{ 'header.theme.' + theme.next() | transloco }}`), [
      'prefix:header.theme:1',
    ]);
  });

  it('finds keys passed to translate() and its variants', () => {
    assert.deepEqual(found(`this.transloco.translate('a.b')`), ['key:a.b:1']);
    assert.deepEqual(found(`selectTranslate('a.b')`), ['key:a.b:1']);
    assert.deepEqual(found(`translateObject('a.b')`), ['key:a.b:1']);
    assert.deepEqual(found(`t('a.b')`), ['key:a.b:1']);
  });

  it('finds several keys in one file', () => {
    const content = `{{ 'a.b' | transloco }} {{ 'c.d' | transloco }}`;
    assert.deepEqual(found(content), ['key:a.b:1', 'key:c.d:1']);
  });

  it('ignores a string that is not fed to transloco', () => {
    assert.deepEqual(found(`<div class="header.about"></div>`), []);
  });

  it('ignores keys inside comments', () => {
    assert.deepEqual(found(`<!-- {{ 'a.b' | transloco }} -->`), []);
    assert.deepEqual(found(`// translate('a.b')`), []);
    assert.deepEqual(found(`/* translate('a.b') */`), []);
  });
});

describe('stripComments()', () => {
  it('removes HTML comments, block comments and whole-line // comments', () => {
    assert.equal(stripComments('a<!--x-->b'), 'ab');
    assert.equal(stripComments('a/*x*/b'), 'ab');
    assert.equal(stripComments('  // x\nkeep'), '\nkeep');
  });

  it('leaves a trailing // comment alone, so URLs in code survive', () => {
    assert.equal(stripComments(`const u = 'https://x.dev';`), `const u = 'https://x.dev';`);
  });
});
