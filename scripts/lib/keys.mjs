/**
 * Finding translation keys in Angular source.
 *
 * Recognized usages:
 *   'a.b'          | transloco     - static key, must be a string leaf
 *   'a.b.' + expr  | transloco     - dynamic key, 'a.b' must be a group
 *   t('a.b')                       - *transloco="let t" template form
 *   translate('a.b'), selectTranslate('a.b'), translateObject('a.b'), ...
 */

const KEY = '[A-Za-z0-9_.-]+';

const PATTERNS = [
  // 'a.b.' + expr | transloco  ->  dynamic, keep the prefix without its dot
  { source: `(['"])(${KEY})\\.\\1\\s*\\+[^|]*\\|\\s*transloco\\b`, kind: 'prefix' },
  // 'a.b' | transloco
  { source: `(['"])(${KEY})\\1\\s*\\|\\s*transloco\\b`, kind: 'key' },
  // t('a.b') / translate('a.b') / selectTranslate('a.b') / *Object variants
  { source: `\\b(?:t|(?:select)?[tT]ranslate(?:Object)?)\\(\\s*(['"])(${KEY})\\1`, kind: 'key' },
];

/** Strips HTML and JS/TS comments, so a commented-out key is not reported. */
export const stripComments = (text) =>
  text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^[ \t]*\/\/.*$/gm, '');

const lineOf = (content, index) => content.slice(0, index).split('\n').length;

/**
 * Every key referenced in one file's contents.
 *
 * @param {string} content raw file text; comments are stripped here
 * @param {string} file label used in reports
 * @returns {{kind: 'key' | 'prefix', key: string, file: string, line: number}[]}
 */
export function keysIn(content, file) {
  const text = stripComments(content);
  const usages = [];

  for (const { source, kind } of PATTERNS) {
    for (const match of text.matchAll(new RegExp(source, 'g'))) {
      usages.push({ kind, key: match[2], file, line: lineOf(text, match.index) });
    }
  }

  return usages;
}
