import { VersionEntry } from '../../models/content.model';

export const V21: VersionEntry = {
  id: 'v21',
  label: 'v21',
  year: 2025,
  title: {
    en: 'Zoneless by default, and forms built on signals',
    uk: 'Zoneless за замовчуванням і форми на сигналах',
  },
  points: [
    {
      id: 'v21-zoneless-default',
      head: { en: 'Zoneless by default', uk: 'Zoneless за замовчуванням' },
      body: {
        en: 'New applications are generated without zone.js, and an existing app that wants it back has to ask with provideZoneChangeDetection. Nine years after v2, the library that defined Angular change detection is opt-in.',
        uk: "Нові застосунки генеруються без zone.js, а наявний застосунок, який хоче його повернути, мусить попросити через provideZoneChangeDetection. Через дев'ять років після v2 бібліотека, що визначала change detection в Angular, стала опційною.",
      },
      code: '// polyfills: []  - zone.js is simply not there\n\n// and in tests, this is why detectChanges() gave way to:\nawait fixture.whenStable();',
    },
    {
      id: 'v21-signal-forms',
      head: { en: 'Signal Forms, experimentally', uk: 'Signal Forms, експериментально' },
      body: {
        en: 'A third forms API in @angular/forms/signals: the model is a signal, and validation is declared as a schema over its shape rather than a control tree kept in step with the data by hand. Experimental here, stable in v22.',
        uk: 'Третій API форм у @angular/forms/signals: модель є сигналом, а валідація оголошується схемою над її структурою замість дерева контролів, яке доводиться вручну тримати в синхроні з даними. Тут експериментальний, у v22 - стабільний.',
      },
      code: 'const model = signal({ name: "", email: "" });\n\nconst userForm = form(model, (path) => {\n  required(path.name);\n  email(path.email);\n});',
    },
    {
      id: 'v21-aria',
      head: { en: 'Angular Aria', uk: 'Angular Aria' },
      body: {
        en: 'A developer preview of @angular/aria: headless directives implementing the common ARIA patterns - Accordion, Combobox, Grid, Listbox, Menu, Select, Tabs, Toolbar, Tree - with keyboard interaction and focus management done, and no styling attached.',
        uk: 'Developer preview пакета @angular/aria: безголові директиви, що реалізують поширені ARIA-патерни - Accordion, Combobox, Grid, Listbox, Menu, Select, Tabs, Toolbar, Tree - з готовою клавіатурною взаємодією і керуванням фокусом, але без жодних стилів.',
      },
    },
    {
      id: 'v21-vitest',
      head: { en: 'Vitest as the default test runner', uk: 'Vitest як типовий тест-раннер' },
      body: {
        en: 'New projects are generated on Vitest through the @angular/build:unit-test builder, with Karma still reachable by flag. A refactor-jasmine-vitest schematic converts an existing suite - though fakeAsync tests need rewriting by hand.',
        uk: 'Нові проєкти генеруються з Vitest через збірник @angular/build:unit-test, а Karma лишається доступною за прапорцем. Схематика refactor-jasmine-vitest конвертує наявний набір тестів, - хоча тести на fakeAsync доводиться переписувати вручну.',
      },
      code: 'ng generate refactor-jasmine-vitest',
    },
    {
      id: 'v21-http-in-root',
      head: {
        en: 'HttpClient is provided by default',
        uk: 'HttpClient надається за замовчуванням',
      },
      body: {
        en: 'It lives in the root injector without being asked for, so provideHttpClient is only needed when you want to configure it - interceptors, XSRF, fetch options. One less line that every app had and nobody thought about.',
        uk: 'Він живе в кореневому інжекторі без окремого прохання, тож provideHttpClient потрібен лише для налаштування - інтерсептори, XSRF, опції fetch. На один рядок менше з тих, що були в кожному застосунку і про які ніхто не думав.',
      },
    },
    {
      id: 'v21-template-migrations',
      head: { en: 'ngClass and ngStyle migrations', uk: 'Міграції для ngClass і ngStyle' },
      body: {
        en: 'Schematics rewrite NgClass to class bindings, NgStyle to style bindings, and CommonModule to the individual standalone imports - the three cleanups every codebase had on a list somewhere.',
        uk: "Схематики переписують NgClass на class-прив\'язки, NgStyle на style-прив\'язки, а CommonModule на окремі standalone-імпорти, - три прибирання, які були в кожної кодової бази десь у списку.",
      },
      code: 'ng generate @angular/core:ngclass-to-class-migration\nng generate @angular/core:ngstyle-to-style-migration\nng generate @angular/core:common-to-standalone',
    },
    {
      id: 'v21-compiler-diagnostics',
      head: { en: 'New compile-time diagnostics', uk: 'Нові діагностики під час компіляції' },
      body: {
        en: 'The compiler now catches a required input or model that is never initialised, and a @defer with an unreachable, duplicated or pointless trigger. typeCheckHostBindings became the default too.',
        uk: "Компілятор тепер ловить обов\'язковий input чи model, який ніколи не ініціалізують, і @defer із недосяжним, дубльованим чи безглуздим тригером. typeCheckHostBindings теж став типовим.",
      },
    },
    {
      id: 'v21-simplechanges-generic',
      head: { en: 'SimpleChanges got a type', uk: 'SimpleChanges отримав тип' },
      body: {
        en: 'ngOnChanges can be typed against its own component, so a key that does not exist and a wrong value type both fail to compile. It defaults to the old any, so nothing breaks until you opt in.',
        uk: 'ngOnChanges можна типізувати за власним компонентом, тож і неіснуючий ключ, і хибний тип значення не компілюються. За замовчуванням лишається старий any, тож нічого не ламається, доки ти не вибереш це сам.',
      },
      code: 'ngOnChanges(changes: SimpleChanges<UserComponent>): void {\n  changes.user?.currentValue;   // typed as User\n  changes.nope;                 // compile error\n}',
    },
    {
      id: 'v21-mcp-server',
      head: { en: 'The CLI as an MCP server', uk: 'CLI як MCP-сервер' },
      body: {
        en: 'ng mcp exposes the CLI, version-matched documentation search, code examples and migrations to an AI assistant - so a tool works against your actual Angular version instead of whatever was in its training data.',
        uk: 'ng mcp відкриває AI-асистенту CLI, пошук документації під потрібну версію, приклади коду і міграції, - тож інструмент працює з твоєю справжньою версією Angular, а не з тим, що було в його тренувальних даних.',
      },
    },
    {
      id: 'v21-tailwind-schematic',
      head: { en: 'Tailwind in one flag', uk: 'Tailwind одним прапорцем' },
      body: {
        en: 'ng new --style tailwind sets up Tailwind and PostCSS with the minimal configuration, which is the first time the CLI has shipped first-class support for a styling approach other than plain CSS and Sass.',
        uk: 'ng new --style tailwind налаштовує Tailwind і PostCSS з мінімальною конфігурацією - і це вперше, коли CLI дає повноцінну підтримку підходу до стилів, відмінного від звичайного CSS і Sass.',
      },
      code: 'ng new my-app --style tailwind',
    },
  ],
};
