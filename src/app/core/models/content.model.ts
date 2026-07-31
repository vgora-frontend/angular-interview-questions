import { Localized } from './language.model';

// Every question belongs to exactly one of these.
// Written `as const` so the keys double as a type:
// a typo in a data file then fails to compile instead of
// producing a question that shows up under 'all' and in no tab.
export const CATEGORY_KEYS = ['signals', 'cd', 'rxjs', 'forms'] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

// The reset tab.
// It is a Category.key and a filter value, but never a Question.category:
// it matches every question rather than one group.
export const ALL_CATEGORIES = 'all';

export type CategoryFilter = CategoryKey | typeof ALL_CATEGORIES;

export interface Category {
  key: CategoryFilter;
  label: Localized;
  divider?: boolean; // render a separator before this tab
}

export interface Question {
  id: string;
  category: CategoryKey;
  q: Localized;
  a: Localized;
  code?: string; // optional snippet, shown under the answer
}

// One bullet under a release: a bolded head and the sentence that follows it.
export interface VersionPoint {
  head: Localized;
  body: Localized;
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
