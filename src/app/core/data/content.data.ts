import {
  ALL_CATEGORIES,
  CATEGORY_KEYS,
  Category,
  CategoryKey,
  Question,
} from '../models/content.model';
import { BASICS_QUESTIONS } from './questions/basics.data';
import { CD_QUESTIONS } from './questions/cd.data';
import { COMPONENTS_QUESTIONS } from './questions/components.data';
import { DI_QUESTIONS } from './questions/di.data';
import { DIRECTIVES_QUESTIONS } from './questions/directives.data';
import { FORMS_QUESTIONS } from './questions/forms.data';
import { HTTP_QUESTIONS } from './questions/http.data';
import { PERFORMANCE_QUESTIONS } from './questions/performance.data';
import { PIPES_QUESTIONS } from './questions/pipes.data';
import { ROUTING_QUESTIONS } from './questions/routing.data';
import { RXJS_QUESTIONS } from './questions/rxjs.data';
import { SECURITY_QUESTIONS } from './questions/security.data';
import { SIGNALS_QUESTIONS } from './questions/signals.data';
import { TEMPLATES_QUESTIONS } from './questions/templates.data';
import { TESTING_QUESTIONS } from './questions/testing.data';
import { TOOLING_QUESTIONS } from './questions/tooling.data';

// Tab order as it appears in the feed.
// 'all' is the reset tab and matches every question;
// the rest match Question.category one-to-one.
//
// groupStart splits the tabs into four runs - the framework itself, then data
// and async, then reactivity, then everything around the app. The split is
// cosmetic, drawn as a wider gap: a tab belongs to a run by position, not by any
// field on the category.
export const CATEGORIES: Category[] = [
  { key: ALL_CATEGORIES, label: { en: 'All', uk: 'Усі' } },
  { key: 'basics', label: { en: 'Basics', uk: 'Основи' }, groupStart: true },
  { key: 'components', label: { en: 'Components', uk: 'Компоненти' } },
  { key: 'templates', label: { en: 'Templates', uk: 'Шаблони' } },
  { key: 'directives', label: { en: 'Directives', uk: 'Директиви' } },
  { key: 'pipes', label: { en: 'Pipes', uk: 'Пайпи' } },
  { key: 'di', label: { en: 'DI', uk: 'DI' } },
  { key: 'routing', label: { en: 'Routing', uk: 'Роутинг' } },
  { key: 'forms', label: { en: 'Forms', uk: 'Форми' } },
  { key: 'rxjs', label: { en: 'RxJS', uk: 'RxJS' }, groupStart: true },
  { key: 'http', label: { en: 'HTTP', uk: 'HTTP' } },
  { key: 'signals', label: { en: 'Signals', uk: 'Сигнали' }, groupStart: true },
  { key: 'cd', label: { en: 'Change detection', uk: 'Change detection' } },
  { key: 'performance', label: { en: 'Performance', uk: 'Продуктивність' }, groupStart: true },
  { key: 'testing', label: { en: 'Testing', uk: 'Тестування' } },
  { key: 'security', label: { en: 'Security', uk: 'Безпека' } },
  { key: 'tooling', label: { en: 'Tooling', uk: 'Інструменти' } },
];

// The mono label every row of a category shows. Stored once per category instead
// of once per question, so a tag can never contradict the category beside it.
// A Record, so a new category will not compile until its tag exists.
export const CATEGORY_TAGS: Record<CategoryKey, string> = {
  basics: 'BASICS',
  components: 'COMPONENTS',
  templates: 'TEMPLATES',
  directives: 'DIRECTIVES',
  pipes: 'PIPES',
  di: 'DI',
  routing: 'ROUTING',
  forms: 'FORMS',
  rxjs: 'RXJS',
  http: 'HTTP',
  signals: 'SIGNALS',
  cd: 'CHANGE DETECTION',
  performance: 'PERFORMANCE',
  testing: 'TESTING',
  security: 'SECURITY',
  tooling: 'TOOLING',
};

// One file per category: a single list would grow to thousands of lines and turn
// every added question into a merge conflict. A Record, so a new category will
// not compile until its file is registered here.
export const QUESTIONS_BY_CATEGORY: Record<CategoryKey, Question[]> = {
  basics: BASICS_QUESTIONS,
  components: COMPONENTS_QUESTIONS,
  templates: TEMPLATES_QUESTIONS,
  directives: DIRECTIVES_QUESTIONS,
  pipes: PIPES_QUESTIONS,
  di: DI_QUESTIONS,
  routing: ROUTING_QUESTIONS,
  forms: FORMS_QUESTIONS,
  rxjs: RXJS_QUESTIONS,
  http: HTTP_QUESTIONS,
  signals: SIGNALS_QUESTIONS,
  cd: CD_QUESTIONS,
  performance: PERFORMANCE_QUESTIONS,
  testing: TESTING_QUESTIONS,
  security: SECURITY_QUESTIONS,
  tooling: TOOLING_QUESTIONS,
};

// The flat feed, ordered by CATEGORY_KEYS so it matches the tab order above.
export const QUESTIONS: Question[] = CATEGORY_KEYS.flatMap((key) => QUESTIONS_BY_CATEGORY[key]);
