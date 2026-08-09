import { Localized } from './language.model';

// Every question belongs to exactly one of these.
// Written `as const` so the keys double as a type:
// a typo in a data file then fails to compile instead of
// producing a question that shows up under 'all' and in no tab.
export const CATEGORY_KEYS = [
  'basics',
  'components',
  'templates',
  'directives',
  'pipes',
  'di',
  'routing',
  'forms',
  'rxjs',
  'http',
  'signals',
  'cd',
  'performance',
  'testing',
  'security',
  'tooling',
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

// The reset tab.
// It is a Category.key and a filter value, but never a Question.category:
// it matches every question rather than one group.
export const ALL_CATEGORIES = 'all';

export type CategoryFilter = CategoryKey | typeof ALL_CATEGORIES;

export interface Category {
  key: CategoryFilter;
  label: Localized;
  groupStart?: boolean; // opens a new run of related tabs, set apart by a wider gap
}

export interface Question {
  id: string;
  category: CategoryKey;
  q: Localized;
  // Optional on purpose: the question bank is written first and answered one
  // question at a time. A row without an answer renders as a plain, unexpandable
  // line marked "soon" rather than an accordion that opens on nothing.
  a?: Localized;
  code?: string; // optional snippet, shown under the answer
}

// One change under a release. The panel lists the heads; opening one reveals its
// body and, where the change is easier shown than described, a snippet.
export interface VersionPoint {
  // Unique across every release, not just within one: it becomes a DOM id.
  id: string;
  head: Localized; // the line in the list
  body: Localized; // what opens under it
  code?: string; // optional snippet, shown under the body
}

// A release on the timeline.
// `title` and `points` are optional on purpose: every version is listed from the
// start, and their highlights are written one release at a time. A version with
// nothing written yet renders the "on the way" note instead of an empty panel.
export interface VersionEntry {
  id: string; // 'angularjs', 'v2' ... 'v22'
  label: string; // rail label - a version number reads the same in both languages
  year: number; // release year; a numeral, so it needs no translation
  title?: Localized;
  points?: VersionPoint[];
}
