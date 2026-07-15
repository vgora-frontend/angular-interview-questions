/**
 * Fails the build when a stylesheet references a CSS custom property (var(--x))
 * that is never defined. CSS variables resolve at runtime, so a typo like
 * `var(--content-max-width0)` compiles cleanly and silently breaks in the
 * browser. This catches that at build time instead.
 *
 * Definitions are collected from every `src/**\/*.scss` file; any `var(--name)`
 * that does not match a defined `--name:` declaration is reported as an error.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'src');

function scssFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found.push(...scssFiles(full));
    } else if (full.endsWith('.scss')) {
      found.push(full);
    }
  }
  return found;
}

const stripBlockComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '');
const stripInlineComments = (line) =>
  line.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, '');

const files = scssFiles(SRC);

// 1. Every defined custom property (a `--name:` declaration, not a var() use).
const defined = new Set();
for (const file of files) {
  const content = stripBlockComments(readFileSync(file, 'utf8'));
  for (const match of content.matchAll(/(--[\w-]+)\s*:/g)) {
    defined.add(match[1]);
  }
}

// 2. Every var(--name) reference; flag any name that was never defined.
const usageRe = /var\(\s*(--[\w-]+)/g;
const errors = [];
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    for (const match of stripInlineComments(line).matchAll(usageRe)) {
      if (!defined.has(match[1])) {
        errors.push({ file: relative(ROOT, file), line: index + 1, token: match[1] });
      }
    }
  });
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
