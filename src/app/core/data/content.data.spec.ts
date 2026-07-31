import { ALL_CATEGORIES, CATEGORY_KEYS, Question } from '../models/content.model';
import { LANGS } from '../models/language.model';
import { CATEGORIES, CATEGORY_TAGS, QUESTIONS, QUESTIONS_BY_CATEGORY } from './content.data';

// Invariants the type system cannot express, checked against the data itself.
// At a few hundred questions a duplicate id or an untranslated answer is
// invisible in review, and every one of these fails silently in the browser.

// Punctuation the project charset rule bans: dashes, curly quotes, ellipsis,
// middle dot, arrow. Ukrainian letters are fine, these are not.
// Escaped, so this file stays ASCII like the rule it enforces.
const TYPOGRAPHIC = /[\u2013\u2014\u2018\u2019\u201c\u201d\u2026\u00b7\u2192]/;

// Printable ASCII plus newline - what a code snippet may contain.
const ASCII_ONLY = /^[\x20-\x7e\n]*$/;

const localizedStrings = (question: Question): string[] =>
  LANGS.flatMap((lang) => [question.q[lang], question.a[lang]]);

const everyString = (): string[] => [
  ...CATEGORIES.flatMap((category) => LANGS.map((lang) => category.label[lang])),
  ...Object.values(CATEGORY_TAGS),
  ...QUESTIONS.flatMap((question) => [...localizedStrings(question), question.code ?? '']),
];

describe('content data', () => {
  it('gives every question a unique, well-formed id', () => {
    const ids = QUESTIONS.map((question) => question.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^q-[a-z0-9-]+$/);
    }
  });

  it('files every question under the category it declares', () => {
    for (const key of CATEGORY_KEYS) {
      for (const question of QUESTIONS_BY_CATEGORY[key]) {
        expect(question.category, question.id).toBe(key);
      }
    }
  });

  it('leaves no category tab empty', () => {
    for (const key of CATEGORY_KEYS) {
      expect(QUESTIONS_BY_CATEGORY[key].length, key).toBeGreaterThan(0);
    }
  });

  it('shows the reset tab first, then every category in key order', () => {
    expect(CATEGORIES.map((category) => category.key)).toEqual([ALL_CATEGORIES, ...CATEGORY_KEYS]);
  });

  it('translates every string into every language', () => {
    for (const category of CATEGORIES) {
      for (const lang of LANGS) {
        expect(category.label[lang].trim(), `${category.key} label ${lang}`).not.toBe('');
      }
    }
    for (const question of QUESTIONS) {
      for (const text of localizedStrings(question)) {
        expect(text.trim(), question.id).not.toBe('');
      }
    }
  });

  it('keeps typographic punctuation out of the content', () => {
    for (const text of everyString()) {
      expect(text).not.toMatch(TYPOGRAPHIC);
    }
  });

  it('keeps code snippets ASCII-only', () => {
    for (const question of QUESTIONS) {
      if (question.code !== undefined) {
        expect(question.code, question.id).toMatch(ASCII_ONLY);
      }
    }
  });
});
