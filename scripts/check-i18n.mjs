/**
 * Fails the build when a translation key used in the app is missing from a
 * locale file, or when the locale files have drifted apart.
 *
 * Translation keys are plain strings resolved at runtime, so a typo like
 * 'header.controls2' compiles cleanly and only shows up as a red console
 * warning in the browser. This catches it before the app even starts.
 *
 * Recognized usages:
 *   'a.b'          | transloco     - static key, must be a string leaf
 *   'a.b.' + expr  | transloco     - dynamic key, 'a.b' must be an object
 *   t('a.b')                       - *transloco="let t" template form
 *   translate('a.b'), selectTranslate('a.b'), translateObject('a.b'), ...
 *
 * Reported as errors:
 *   - a key that no locale defines, or that is missing from some locales
 *   - a static key that resolves to an object instead of a string
 *   - a dynamic prefix that is not an object
 * Reported as warnings (non-fatal): defined keys nothing references.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'src');
const I18N = join(ROOT, 'public', 'i18n');

function filesWithin(dir, extensions) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found.push(...filesWithin(full, extensions));
    } else if (full.endsWith('.spec.ts')) {
      // Specs supply their own translations via TranslocoTestingModule, so
      // their keys must not be matched against public/i18n.
      continue;
    } else if (extensions.some((ext) => full.endsWith(ext))) {
      found.push(full);
    }
  }
  return found;
}

// 1. Flatten each locale into leaf paths (translatable strings) and branch
//    paths (objects, the only valid targets of a dynamic key prefix).
function flatten(node, prefix, leaves, branches) {
  for (const [key, value] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      branches.add(path);
      flatten(value, path, leaves, branches);
    } else {
      leaves.add(path);
    }
  }
}

const locales = readdirSync(I18N)
  .filter((name) => name.endsWith('.json'))
  .map((name) => {
    const leaves = new Set();
    const branches = new Set();
    flatten(JSON.parse(readFileSync(join(I18N, name), 'utf8')), '', leaves, branches);
    return { name, leaves, branches };
  });

if (locales.length === 0) {
  console.error(`\ni18n check failed - no locale files found in ${relative(ROOT, I18N)}.\n`);
  process.exit(1);
}

// 2. Collect every key referenced from the source.
const stripComments = (text) =>
  text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^[ \t]*\/\/.*$/gm, '');

const KEY = '[A-Za-z0-9_.-]+';
const PATTERNS = [
  // 'a.b.' + expr | transloco  ->  dynamic, keep the prefix without its dot
  { re: new RegExp(`(['"])(${KEY})\\.\\1\\s*\\+[^|]*\\|\\s*transloco\\b`, 'g'), kind: 'prefix' },
  // 'a.b' | transloco
  { re: new RegExp(`(['"])(${KEY})\\1\\s*\\|\\s*transloco\\b`, 'g'), kind: 'key' },
  // t('a.b') / translate('a.b') / selectTranslate('a.b') / *Object variants
  {
    re: new RegExp(`\\b(?:t|(?:select)?[tT]ranslate(?:Object)?)\\(\\s*(['"])(${KEY})\\1`, 'g'),
    kind: 'key',
  },
];

const lineOf = (content, index) => content.slice(0, index).split('\n').length;

const usages = [];
for (const file of filesWithin(SRC, ['.html', '.ts'])) {
  const content = stripComments(readFileSync(file, 'utf8'));
  for (const { re, kind } of PATTERNS) {
    for (const match of content.matchAll(re)) {
      usages.push({
        kind,
        key: match[2],
        file: relative(ROOT, file),
        line: lineOf(content, match.index),
      });
    }
  }
}

// 3. Check every usage against every locale.
const errors = [];
for (const { kind, key, file, line } of usages) {
  for (const locale of locales) {
    if (kind === 'prefix') {
      if (!locale.branches.has(key)) {
        errors.push({ file, line, problem: `'${key}.*' has no entries in ${locale.name}` });
      }
    } else if (!locale.leaves.has(key)) {
      const reason = locale.branches.has(key)
        ? `is a group, not a translation, in ${locale.name}`
        : `is missing from ${locale.name}`;
      errors.push({ file, line, problem: `'${key}' ${reason}` });
    }
  }
}

// 4. Check the locale files against each other, so adding a key to one language
//    without the other is caught even before a template uses it.
const allLeaves = new Set(locales.flatMap((locale) => [...locale.leaves]));
for (const key of [...allLeaves].sort()) {
  const absent = locales.filter((locale) => !locale.leaves.has(key));
  if (absent.length > 0 && absent.length < locales.length) {
    const present = locales.find((locale) => locale.leaves.has(key));
    errors.push({
      file: relative(ROOT, join(I18N, present.name)),
      problem: `'${key}' is missing from ${absent.map((l) => l.name).join(', ')}`,
    });
  }
}

if (errors.length > 0) {
  console.error('\ni18n check failed - unresolved translation keys:\n');
  for (const { file, line, problem } of errors) {
    console.error(`  ${file}${line ? `:${line}` : ''}  ${problem}`);
  }
  console.error(
    `\n${errors.length} problem(s). Fix the key in the source or add it to ` +
      'every file in public/i18n/.\n',
  );
  process.exit(1);
}

// 5. Unused keys are a smell, not a failure - a key can be referenced from
//    code this scanner does not understand.
const referenced = usages.filter((usage) => usage.kind === 'key').map((usage) => usage.key);
const prefixes = usages.filter((usage) => usage.kind === 'prefix').map((usage) => `${usage.key}.`);
const unused = [...allLeaves]
  .filter((key) => !referenced.includes(key))
  .filter((key) => !prefixes.some((prefix) => key.startsWith(prefix)))
  .sort();

if (unused.length > 0) {
  console.warn(`i18n check warning - ${unused.length} key(s) never referenced:`);
  for (const key of unused) {
    console.warn(`  ${key}`);
  }
}

console.log(
  `i18n check passed - ${allLeaves.size} keys x ${locales.length} locale(s), ` +
    `${usages.length} usage(s) resolve.`,
);
