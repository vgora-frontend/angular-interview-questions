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
