/**
 * Fails the build when a translation key used in the app is missing from a
 * locale file, or when the locale files have drifted apart.
 *
 * Translation keys are plain strings resolved at runtime, so a typo like
 * 'header.controls2' compiles cleanly and only shows up as a red console
 * warning in the browser. This catches it before the app even starts.
 *
 * Reported as errors:
 *   - a key that no locale defines, or that is missing from some locales
 *   - a static key that resolves to an object instead of a string
 *   - a dynamic prefix that is not an object
 * Reported as warnings (non-fatal): defined keys nothing references.
 *
 * The logic lives in ./lib (and is tested by `npm run test:scripts`);
 * this file only reads the project and prints.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { filesWithin } from './lib/files.mjs';
import { keysIn } from './lib/keys.mjs';
import { allKeys, flatten, localeDrift, unresolvedUsages, unusedKeys } from './lib/locales.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'src');
const I18N = join(ROOT, 'public', 'i18n');

const locales = readdirSync(I18N)
  .filter((name) => name.endsWith('.json'))
  .map((name) => ({
    name,
    ...flatten(JSON.parse(readFileSync(join(I18N, name), 'utf8'))),
  }));

if (locales.length === 0) {
  console.error(`\ni18n check failed - no locale files found in ${relative(ROOT, I18N)}.\n`);
  process.exit(1);
}

// Specs supply their own translations via TranslocoTestingModule,
// so their keys must not be matched against public/i18n.
const sources = filesWithin(SRC, ['.html', '.ts']).filter((file) => !file.endsWith('.spec.ts'));

const usages = sources.flatMap((file) => keysIn(readFileSync(file, 'utf8'), relative(ROOT, file)));

const errors = unresolvedUsages(usages, locales);

for (const { key, present, absent } of localeDrift(locales)) {
  errors.push({
    file: relative(ROOT, join(I18N, present)),
    problem: `'${key}' is missing from ${absent.join(', ')}`,
  });
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

// Unused keys are a smell, not a failure.
// A key can be referenced from code this scanner does not understand.
const unused = unusedKeys(usages, locales);
if (unused.length > 0) {
  console.warn(`i18n check warning - ${unused.length} key(s) never referenced:`);
  for (const key of unused) {
    console.warn(`  ${key}`);
  }
}

console.log(
  `i18n check passed - ${allKeys(locales).size} keys x ${locales.length} locale(s), ` +
    `${usages.length} usage(s) resolve.`,
);
