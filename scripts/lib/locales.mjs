/**
 * Locale-file analysis for the i18n check: flattening a translation object,
 * and comparing what the source references against what the locales define.
 */

/**
 * Splits a translation object into the dot-paths that hold a string
 * ("leaves", the only valid target of a key) and the paths that hold an object
 * ("branches", the only valid target of a dynamic key prefix).
 *
 * @param {object} node parsed locale JSON
 * @returns {{ leaves: Set<string>, branches: Set<string> }}
 */
export function flatten(node) {
  const leaves = new Set();
  const branches = new Set();

  const walk = (current, prefix) => {
    for (const [key, value] of Object.entries(current)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (isGroup(value)) {
        branches.add(path);
        walk(value, path);
      } else {
        leaves.add(path);
      }
    }
  };

  walk(node, '');
  return { leaves, branches };
}

const isGroup = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Checks every referenced key against every locale.
 *
 * @param {{kind: 'key' | 'prefix', key: string, file: string, line?: number}[]} usages
 * @param {{name: string, leaves: Set<string>, branches: Set<string>}[]} locales
 * @returns {{file: string, line?: number, problem: string}[]}
 */
export function unresolvedUsages(usages, locales) {
  const problems = [];

  for (const { kind, key, file, line } of usages) {
    for (const locale of locales) {
      const problem = describeMiss(kind, key, locale);
      if (problem) {
        problems.push({ file, line, problem });
      }
    }
  }

  return problems;
}

const describeMiss = (kind, key, locale) =>
  kind === 'prefix' ? missingPrefix(key, locale) : missingKey(key, locale);

// A dynamic prefix must land on a group, because the runtime appends to it.
const missingPrefix = (key, locale) =>
  locale.branches.has(key) ? null : `'${key}.*' has no entries in ${locale.name}`;

const missingKey = (key, locale) => {
  if (locale.leaves.has(key)) {
    return null;
  }
  return locale.branches.has(key)
    ? `'${key}' is a group, not a translation, in ${locale.name}`
    : `'${key}' is missing from ${locale.name}`;
};

/**
 * Keys that some locales define and others do not,
 * so drift is caught even before a template uses the key.
 *
 * @param {{name: string, leaves: Set<string>}[]} locales
 * @returns {{key: string, present: string, absent: string[]}[]}
 */
export function localeDrift(locales) {
  const drift = [];

  for (const key of [...allKeys(locales)].sort()) {
    const absent = locales.filter((locale) => !locale.leaves.has(key));
    if (absent.length > 0 && absent.length < locales.length) {
      drift.push({
        key,
        present: locales.find((locale) => locale.leaves.has(key)).name,
        absent: absent.map((locale) => locale.name),
      });
    }
  }

  return drift;
}

/**
 * Defined keys that nothing references.
 * A key under a referenced dynamic prefix counts as used.
 *
 * @param {{kind: 'key' | 'prefix', key: string}[]} usages
 * @param {{leaves: Set<string>}[]} locales
 * @returns {string[]} sorted
 */
export function unusedKeys(usages, locales) {
  const referenced = new Set(
    usages.filter((usage) => usage.kind === 'key').map((usage) => usage.key),
  );
  const prefixes = usages
    .filter((usage) => usage.kind === 'prefix')
    .map((usage) => `${usage.key}.`);

  return [...allKeys(locales)]
    .filter((key) => !referenced.has(key))
    .filter((key) => !prefixes.some((prefix) => key.startsWith(prefix)))
    .sort();
}

export const allKeys = (locales) => new Set(locales.flatMap((locale) => [...locale.leaves]));
