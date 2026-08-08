import { Question } from '../../models/content.model';

// CLI, build pipeline, compilation and localization.
export const TOOLING_QUESTIONS: Question[] = [
  {
    id: 'q-cli-daily-commands',
    category: 'tooling',
    q: {
      en: 'Which CLI commands cover a normal working day, and what does each generate?',
      uk: 'Які команди CLI покривають звичайний робочий день і що кожна з них генерує?',
    },
  },
  {
    id: 'q-angular-json',
    category: 'tooling',
    q: {
      en: 'What is configured in angular.json, and what is a build configuration?',
      uk: 'Що налаштовується в angular.json і що таке конфігурація збірки?',
    },
  },
  {
    id: 'q-build-environments',
    category: 'tooling',
    q: {
      en: 'How do you feed environment-specific values into a build?',
      uk: 'Як передати у збірку значення, специфічні для середовища?',
    },
  },
  {
    id: 'q-esbuild-builder',
    category: 'tooling',
    q: {
      en: 'What changed when the CLI moved to the esbuild-based application builder?',
      uk: 'Що змінилося, коли CLI перейшов на application builder на базі esbuild?',
    },
  },
  {
    id: 'q-jit-vs-aot',
    category: 'tooling',
    q: {
      en: 'What is the difference between JIT and AOT compilation, and where is each used?',
      uk: 'Яка різниця між компіляцією JIT і AOT і де застосовується кожна?',
    },
  },
  {
    id: 'q-aot-advantages',
    category: 'tooling',
    q: {
      en: 'What do you gain from AOT compilation?',
      uk: 'Що дає компіляція AOT?',
    },
  },
  {
    id: 'q-ivy',
    category: 'tooling',
    q: {
      en: 'What is Ivy, and what did it change compared with View Engine?',
      uk: 'Що таке Ivy і що він змінив порівняно з View Engine?',
    },
  },
  {
    id: 'q-tsconfig-strictness',
    category: 'tooling',
    q: {
      en: 'Which TypeScript and Angular compiler options do you turn on in a new project?',
      uk: 'Які опції компілятора TypeScript і Angular ти вмикаєш у новому проєкті?',
    },
  },
  {
    id: 'q-ng-update',
    category: 'tooling',
    q: {
      en: 'How does ng update work, and how do you upgrade an application several versions behind?',
      uk: 'Як працює ng update і як оновити застосунок, що відстав на кілька версій?',
    },
  },
  {
    id: 'q-schematics',
    category: 'tooling',
    q: {
      en: 'What is a schematic, and what is a rule inside one?',
      uk: 'Що таке схематик і що таке правило всередині нього?',
    },
  },
  {
    id: 'q-migration-schematics',
    category: 'tooling',
    q: {
      en: 'How do the built-in migration schematics rewrite your code during an upgrade?',
      uk: 'Як вбудовані схематики міграції переписують твій код під час оновлення?',
    },
  },
  {
    id: 'q-cli-builders',
    category: 'tooling',
    q: {
      en: 'What is a CLI builder, and when would you write your own?',
      uk: 'Що таке білдер CLI і коли варто писати власний?',
    },
  },
  {
    id: 'q-angular-language-service',
    category: 'tooling',
    q: {
      en: 'What does the Angular Language Service do for you in an editor?',
      uk: 'Що дає Angular Language Service у редакторі?',
    },
  },
  {
    id: 'q-angular-devtools',
    category: 'tooling',
    q: {
      en: 'What can you inspect with Angular DevTools?',
      uk: 'Що можна дослідити за допомогою Angular DevTools?',
    },
  },
  {
    id: 'q-monorepo-tooling',
    category: 'tooling',
    q: {
      en: 'When does an Angular workspace need monorepo tooling on top of the CLI?',
      uk: 'Коли робочому простору Angular потрібен інструментарій монорепозиторію поверх CLI?',
    },
  },
  {
    id: 'q-i18n-approach',
    category: 'tooling',
    q: {
      en: "How does Angular's built-in i18n work, and how does it differ from a runtime library?",
      uk: 'Як працює вбудована i18n в Angular і чим вона відрізняється від рантайм-бібліотеки?',
    },
  },
  {
    id: 'q-i18n-attribute',
    category: 'tooling',
    q: {
      en: 'What does the i18n attribute mark, and how do you translate an attribute rather than an element?',
      uk: 'Що позначає атрибут i18n і як перекласти атрибут, а не елемент?',
    },
  },
  {
    id: 'q-i18n-custom-id',
    category: 'tooling',
    q: {
      en: 'Why would you set a custom translation id, and what happens if two are the same?',
      uk: 'Навіщо задавати власний ідентифікатор перекладу і що буде, якщо два збігатимуться?',
    },
  },
  {
    id: 'q-icu-expressions',
    category: 'tooling',
    q: {
      en: 'What are the plural and select ICU expressions for?',
      uk: 'Для чого потрібні ICU-вирази plural і select?',
    },
  },
  {
    id: 'q-plural-categories',
    category: 'tooling',
    q: {
      en: 'Which plural categories exist, and why does the set differ between languages?',
      uk: 'Які існують категорії множини і чому їх набір відрізняється між мовами?',
    },
  },
  {
    id: 'q-locale-data-and-direction',
    category: 'tooling',
    q: {
      en: 'How do you register locale data, and how do you get the writing direction for a locale?',
      uk: 'Як зареєструвати дані локалі і як дізнатися напрямок письма для неї?',
    },
  },
  {
    id: 'q-build-multiple-locales',
    category: 'tooling',
    q: {
      en: 'How do you produce and deploy a build per locale?',
      uk: 'Як зібрати і задеплоїти окрему збірку для кожної локалі?',
    },
  },
  {
    id: 'q-missing-translations',
    category: 'tooling',
    q: {
      en: 'How do you make a missing translation fail loudly instead of silently?',
      uk: 'Як зробити так, щоб відсутній переклад падав гучно, а не тихо?',
    },
  },
];
