/**
 * Stylesheet parsing for the CSS custom-property check.
 */

/**
 * Replaces every comment with equivalent blank space, keeping newlines.
 * Line and column numbers therefore survive, so a `var(--x)` written inside
 * a multi-line comment is ignored without shifting the numbers reported for real code.
 *
 * @param {string} text stylesheet source
 * @returns {string}
 */
export const blankComments = (text) =>
  text
    .replace(/\/\*[\s\S]*?\*\//g, blankOut)
    .replace(
      /(^|[^:])\/\/[^\n]*/g,
      (match, prefix) => prefix + blankOut(match.slice(prefix.length)),
    );

const blankOut = (text) => text.replace(/[^\n]/g, ' ');

/**
 * Custom properties a stylesheet defines: `--name:` declarations, not var() uses.
 *
 * @param {string} text stylesheet source
 * @returns {Set<string>}
 */
export function definedTokens(text) {
  const defined = new Set();
  for (const match of blankComments(text).matchAll(/(--[\w-]+)\s*:/g)) {
    defined.add(match[1]);
  }
  return defined;
}

/**
 * Every `var(--name)` reference, with the 1-based line it sits on.
 *
 * @param {string} text stylesheet source
 * @returns {{token: string, line: number}[]}
 */
export function tokenReferences(text) {
  const references = [];

  blankComments(text)
    .split('\n')
    .forEach((line, index) => {
      for (const match of line.matchAll(/var\(\s*(--[\w-]+)/g)) {
        references.push({ token: match[1], line: index + 1 });
      }
    });

  return references;
}
