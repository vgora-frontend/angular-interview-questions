import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Every file under `dir` whose name ends in one of `extensions`, recursively.
 * Filter the result if a caller needs to exclude some of them.
 *
 * @param {string} dir directory to walk
 * @param {string[]} extensions suffixes to keep, e.g. ['.html', '.ts']
 * @returns {string[]} absolute paths, in readdir order
 */
export function filesWithin(dir, extensions) {
  const found = [];

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found.push(...filesWithin(full, extensions));
    } else if (extensions.some((extension) => full.endsWith(extension))) {
      found.push(full);
    }
  }

  return found;
}
