/**
 * Fails the build when a stylesheet references a CSS custom property (var(--x))
 * that is never defined. CSS variables resolve at runtime, so a typo like
 * `var(--content-max-width0)` compiles cleanly and silently breaks in the
 * browser. This catches that at build time instead.
 *
 * Definitions are collected from every `src/**\/*.scss` file; any `var(--name)`
 * that does not match a defined `--name:` declaration is reported as an error.
 * References inside comments are ignored, so documentation may show examples.
 *
 * The parsing lives in ./lib (and is tested by `npm run test:scripts`);
 * this file only reads the project and prints.
 */
import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { definedTokens, tokenReferences } from './lib/css.mjs';
import { filesWithin } from './lib/files.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'src');

const sheets = filesWithin(SRC, ['.scss']).map((file) => ({
  file: relative(ROOT, file),
  text: readFileSync(file, 'utf8'),
}));

const defined = new Set();
for (const { text } of sheets) {
  for (const token of definedTokens(text)) {
    defined.add(token);
  }
}

const errors = [];
for (const { file, text } of sheets) {
  for (const { token, line } of tokenReferences(text)) {
    if (!defined.has(token)) {
      errors.push({ file, line, token });
    }
  }
}

if (errors.length > 0) {
  console.error('\nCSS token check failed - unknown custom properties:\n');
  for (const { file, line, token } of errors) {
    console.error(`  ${file}:${line}  ${token}`);
  }
  console.error(
    `\n${errors.length} unknown token reference(s). ` +
      'Fix the typo or define the token in src/styles.scss.\n',
  );
  process.exit(1);
}

console.log(
  `CSS token check passed - ${defined.size} tokens defined, all var() references resolve.`,
);
