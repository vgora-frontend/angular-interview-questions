import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { allKeys, flatten, localeDrift, unresolvedUsages, unusedKeys } from './locales.mjs';

const locale = (name, translations) => ({ name, ...flatten(translations) });

const EN = locale('en.json', {
  header: { about: 'About', theme: { light: 'Light', dark: 'Dark' } },
  count: { one: '1', other: 'n' },
});
const UK = locale('uk.json', {
  header: { about: 'Pro', theme: { light: 'Svitla', dark: 'Temna' } },
  count: { one: '1', other: 'n' },
});

describe('flatten()', () => {
  it('collects dot-paths of strings as leaves', () => {
    const { leaves } = flatten({ a: '1', b: { c: '2', d: { e: '3' } } });
    assert.deepEqual([...leaves].sort(), ['a', 'b.c', 'b.d.e']);
  });

  it('collects paths of objects as branches, which dynamic prefixes target', () => {
    const { branches } = flatten({ a: '1', b: { c: '2', d: { e: '3' } } });
    assert.deepEqual([...branches].sort(), ['b', 'b.d']);
  });

  it('treats an array as a leaf, not a group', () => {
    const { leaves, branches } = flatten({ a: ['x', 'y'] });
    assert.deepEqual([...leaves], ['a']);
    assert.deepEqual([...branches], []);
  });

  it('treats null as a leaf rather than recursing into it', () => {
    const { leaves } = flatten({ a: null });
    assert.deepEqual([...leaves], ['a']);
  });

  it('handles an empty object', () => {
    const { leaves, branches } = flatten({});
    assert.equal(leaves.size, 0);
    assert.equal(branches.size, 0);
  });
});

describe('unresolvedUsages()', () => {
  const usage = (kind, key) => ({ kind, key, file: 'x.html', line: 3 });

  it('passes a key that every locale defines', () => {
    assert.deepEqual(unresolvedUsages([usage('key', 'header.about')], [EN, UK]), []);
  });

  it('reports a key no locale defines, once per locale', () => {
    const problems = unresolvedUsages([usage('key', 'header.about2')], [EN, UK]);
    assert.equal(problems.length, 2);
    assert.match(problems[0].problem, /'header\.about2' is missing from en\.json/);
    assert.equal(problems[0].line, 3);
  });

  it('reports a key missing from only one locale', () => {
    const partial = locale('de.json', { header: { theme: { light: 'Hell', dark: 'Dunkel' } } });
    const problems = unresolvedUsages([usage('key', 'header.about')], [EN, partial]);
    assert.equal(problems.length, 1);
    assert.match(problems[0].problem, /missing from de\.json/);
  });

  it('reports a key that points at a group instead of a string', () => {
    const problems = unresolvedUsages([usage('key', 'header.theme')], [EN]);
    assert.match(problems[0].problem, /is a group, not a translation/);
  });

  it('passes a dynamic prefix that is a group', () => {
    assert.deepEqual(unresolvedUsages([usage('prefix', 'header.theme')], [EN, UK]), []);
  });

  it('reports a dynamic prefix that is not a group', () => {
    const problems = unresolvedUsages([usage('prefix', 'header.themes')], [EN]);
    assert.match(problems[0].problem, /'header\.themes\.\*' has no entries in en\.json/);
  });

  it('reports a dynamic prefix that lands on a string', () => {
    const problems = unresolvedUsages([usage('prefix', 'header.about')], [EN]);
    assert.match(problems[0].problem, /has no entries/);
  });
});

describe('localeDrift()', () => {
  it('finds nothing when the locales agree', () => {
    assert.deepEqual(localeDrift([EN, UK]), []);
  });

  it('reports a key one locale is missing, naming both sides', () => {
    const partial = locale('de.json', { header: { about: 'Uber' } });
    const drift = localeDrift([EN, partial]);
    assert.deepEqual(
      drift.map((d) => d.key),
      ['count.one', 'count.other', 'header.theme.dark', 'header.theme.light'],
    );
    assert.equal(drift[0].present, 'en.json');
    assert.deepEqual(drift[0].absent, ['de.json']);
  });

  it('stays quiet for a single locale, which cannot drift', () => {
    assert.deepEqual(localeDrift([EN]), []);
  });
});

describe('unusedKeys()', () => {
  it('lists keys nothing references', () => {
    const usages = [{ kind: 'key', key: 'header.about' }];
    assert.deepEqual(unusedKeys(usages, [EN]), [
      'count.one',
      'count.other',
      'header.theme.dark',
      'header.theme.light',
    ]);
  });

  it('counts keys under a referenced dynamic prefix as used', () => {
    const usages = [
      { kind: 'key', key: 'header.about' },
      { kind: 'prefix', key: 'header.theme' },
      { kind: 'prefix', key: 'count' },
    ];
    assert.deepEqual(unusedKeys(usages, [EN]), []);
  });
});

describe('allKeys()', () => {
  it('unions the leaves of every locale', () => {
    const partial = locale('de.json', { extra: 'x' });
    assert.ok(allKeys([EN, partial]).has('extra'));
    assert.ok(allKeys([EN, partial]).has('header.about'));
  });
});
