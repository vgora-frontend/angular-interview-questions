import { VersionEntry } from '../../models/content.model';

export const V12: VersionEntry = {
  id: 'v12',
  label: 'v12',
  year: 2021,
  title: {
    en: '"Ivy everywhere": View Engine deprecated',
    uk: '"Ivy everywhere": View Engine оголошено застарілим',
  },
  points: [
    {
      id: 'v12-view-engine-deprecated',
      head: { en: 'View Engine deprecated', uk: 'View Engine застарів' },
      body: {
        en: 'The old renderer stopped being an option for new work, and libraries were pointed at publishing Ivy output. This is the release that set up the removal in v13, and with it the end of ngcc.',
        uk: 'Старий рендерер перестав бути варіантом для нової роботи, а бібліотекам вказали публікувати Ivy-збірку. Саме цей реліз підготував видалення у v13, а разом із ним і кінець ngcc.',
      },
    },
    {
      id: 'v12-nullish-coalescing',
      head: { en: 'Nullish coalescing in templates', uk: 'Nullish coalescing у шаблонах' },
      body: {
        en: '?? became a template expression, which matters more than it sounds: || replaces a falsy-but-valid value, so a count of zero or an empty string used to be silently swapped for the fallback.',
        uk: '?? став доступним у шаблонних виразах, і це важливіше, ніж звучить: || підміняє хибне, але цілком валідне значення, тож нуль або порожній рядок раніше тихо замінювалися запасним варіантом.',
      },
      code: '{{ count || "none" }}   <!-- 0 shows "none" - almost certainly a bug -->\n{{ count ?? "none" }}   <!-- 0 shows 0, and only null or undefined fall back -->',
    },
    {
      id: 'v12-strict-default',
      head: { en: 'Strict mode by default', uk: 'Строгий режим за замовчуванням' },
      body: {
        en: 'ng new turned on what --strict used to opt into, so every project started from here has strict templates and strict TypeScript unless someone went out of their way to disable them.',
        uk: 'ng new почав вмикати те, що раніше вибирали через --strict, тож кожен проєкт, започаткований відтоді, має строгі шаблони і строгий TypeScript, якщо їх навмисно не вимкнули.',
      },
    },
    {
      id: 'v12-ie11-deprecated',
      head: { en: 'IE11 deprecated', uk: 'IE11 оголошено застарілим' },
      body: {
        en: 'Deprecated here and dropped in v13. Removing it is what let the framework, the build and the CSS target modern syntax without keeping a second bundle alive for one browser.',
        uk: 'Оголошено застарілим тут і прибрано у v13. Саме це дало змогу фреймворку, збірці й CSS орієнтуватися на сучасний синтаксис, не тримаючи другий бандл заради одного браузера.',
      },
    },
    {
      id: 'v12-inline-sass',
      head: { en: 'Sass in inline styles', uk: 'Sass в інлайнових стилях' },
      body: {
        en: 'The styles array in a component could be written in Sass, and the CLI moved from node-sass to dart-sass with @use replacing @import. A codebase still on @import in 2026 is running on a deprecated module system.',
        uk: 'Масив styles у компоненті можна було писати на Sass, а CLI перейшов з node-sass на dart-sass, де @use замінює @import. Кодова база, що у 2026 році досі на @import, працює на застарілій системі модулів.',
      },
      code: '// no longer a plain-CSS-only field\n@Component({\n  inlineStyleLanguage: "scss",\n  styles: [".title { color: $ink; }"],\n})',
    },
    {
      id: 'v12-webpack5-default',
      head: { en: 'Webpack 5 by default', uk: 'Webpack 5 за замовчуванням' },
      body: {
        en: 'Out of preview and into every new build, bringing the persistent cache with it. This is the last bundler generation before esbuild took over in v17.',
        uk: 'Вийшов з preview і потрапив у кожну збірку разом із постійним кешем. Це останнє покоління бандлера перед тим, як у v17 усе перебрав на себе esbuild.',
      },
    },
    {
      id: 'v12-protractor-deprecated',
      head: { en: 'Protractor deprecated', uk: 'Protractor застарів' },
      body: {
        en: 'The end-to-end runner that shipped with every project was deprecated with no in-house replacement: ng e2e started asking which third-party tool to use. Cypress and Playwright are where those projects went.',
        uk: 'E2E-раннер, який ішов з кожним проєктом, оголосили застарілим без власної заміни: ng e2e почав питати, який сторонній інструмент використати. Ті проєкти пішли в Cypress і Playwright.',
      },
    },
    {
      id: 'v12-ng-i18n-message-ids',
      head: { en: 'Stable i18n message ids', uk: 'Стабільні id повідомлень i18n' },
      body: {
        en: 'Message ids stopped changing when whitespace or a template detail changed, so an existing translation stopped silently falling back to the source language after an unrelated edit.',
        uk: 'Id повідомлень перестали змінюватися від пробілів чи дрібниць у шаблоні, тож наявний переклад перестав тихо відкочуватися до мови оригіналу після сторонньої правки.',
      },
    },
  ],
};
