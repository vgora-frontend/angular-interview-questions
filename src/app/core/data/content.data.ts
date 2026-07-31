import {
  ALL_CATEGORIES,
  CATEGORY_KEYS,
  Category,
  CategoryKey,
  Question,
} from '../models/content.model';
import { CD_QUESTIONS } from './questions/cd.data';
import { FORMS_QUESTIONS } from './questions/forms.data';
import { RXJS_QUESTIONS } from './questions/rxjs.data';
import { SIGNALS_QUESTIONS } from './questions/signals.data';

// Tab order as it appears in the feed.
// 'all' is the reset tab and matches every question;
// the rest match Question.category one-to-one.
export const CATEGORIES: Category[] = [
  { key: ALL_CATEGORIES, label: { en: 'All', uk: 'Усі' } },
  { key: 'signals', label: { en: 'Signals', uk: 'Сигнали' }, divider: true },
  { key: 'cd', label: { en: 'Change detection', uk: 'Change detection' } },
  { key: 'rxjs', label: { en: 'RxJS', uk: 'RxJS' } },
  { key: 'forms', label: { en: 'Forms', uk: 'Форми' } },
];

// The mono label every row of a category shows. Stored once per category instead
// of once per question, so a tag can never contradict the category beside it.
// A Record, so a new category will not compile until its tag exists.
export const CATEGORY_TAGS: Record<CategoryKey, string> = {
  signals: 'SIGNALS',
  cd: 'CHANGE DETECTION',
  rxjs: 'RXJS',
  forms: 'FORMS',
};

// One file per category: a single list would grow to thousands of lines and turn
// every added question into a merge conflict. A Record, so a new category will
// not compile until its file is registered here.
export const QUESTIONS_BY_CATEGORY: Record<CategoryKey, Question[]> = {
  signals: SIGNALS_QUESTIONS,
  cd: CD_QUESTIONS,
  rxjs: RXJS_QUESTIONS,
  forms: FORMS_QUESTIONS,
};

// The flat feed, ordered by CATEGORY_KEYS so it matches the tab order above.
export const QUESTIONS: Question[] = CATEGORY_KEYS.flatMap((key) => QUESTIONS_BY_CATEGORY[key]);
