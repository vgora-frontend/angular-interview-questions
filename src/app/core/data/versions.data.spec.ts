import { LANGS } from '../models/language.model';
import { VERSIONS } from './versions.data';

// Invariants the type system cannot express. The rail renders this list verbatim,
// so a duplicate id or a half-translated release is a defect visible to readers.

// Punctuation the project charset rule bans: dashes, curly quotes, ellipsis,
// middle dot, arrow. Ukrainian letters are fine, these are not.
const TYPOGRAPHIC = /[\u2013\u2014\u2018\u2019\u201c\u201d\u2026\u00b7\u2192]/;

describe('version data', () => {
  it('gives every release a unique id and a label', () => {
    const ids = VERSIONS.map((version) => version.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const version of VERSIONS) {
      expect(version.label.trim(), version.id).not.toBe('');
    }
  });

  it('runs oldest first, so the rail reads left to right', () => {
    const years = VERSIONS.map((version) => version.year);

    expect([...years].sort((a, b) => a - b)).toEqual(years);
  });

  it('covers the whole line, and skips the version that never shipped', () => {
    const ids = VERSIONS.map((version) => version.id);

    expect(ids[0]).toBe('angularjs');
    // No v3: the router had run ahead to 3.x, so the number was skipped.
    expect(ids).not.toContain('v3');
    for (const major of [2, 4, 22]) {
      expect(ids, `v${major}`).toContain(`v${major}`);
    }
  });

  it('translates a release fully, or leaves it entirely unwritten', () => {
    for (const version of VERSIONS) {
      // Points without a title (or the reverse) would render a half-built panel.
      expect(version.points === undefined, version.id).toBe(version.title === undefined);

      for (const lang of LANGS) {
        if (version.title) {
          expect(version.title[lang].trim(), `${version.id} title ${lang}`).not.toBe('');
        }
        for (const point of version.points ?? []) {
          expect(point.head[lang].trim(), `${version.id} head ${lang}`).not.toBe('');
          expect(point.body[lang].trim(), `${version.id} body ${lang}`).not.toBe('');
        }
      }
    }
  });

  it('keeps typographic punctuation out of the copy', () => {
    for (const version of VERSIONS) {
      for (const lang of LANGS) {
        const strings = [
          version.title?.[lang] ?? '',
          ...(version.points ?? []).flatMap((point) => [point.head[lang], point.body[lang]]),
        ];
        for (const text of strings) {
          expect(text).not.toMatch(TYPOGRAPHIC);
        }
      }
    }
  });
});
