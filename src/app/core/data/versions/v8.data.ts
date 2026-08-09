import { VersionEntry } from '../../models/content.model';

export const V8: VersionEntry = {
  id: 'v8',
  label: 'v8',
  year: 2019,
  title: {
    en: 'Differential loading, dynamic imports, and a first look at Ivy',
    uk: 'Диференційоване завантаження, динамічні імпорти і перший погляд на Ivy',
  },
  points: [
    {
      id: 'v8-differential-loading',
      head: { en: 'Differential loading', uk: 'Диференційоване завантаження' },
      body: {
        en: 'The build emitted two bundles - a modern one and a transpiled legacy one - and the browser chose between them with type=module and nomodule. Modern browsers stopped downloading the polyfills and downlevelled syntax they had no use for.',
        uk: 'Збірка почала видавати два бандли - сучасний і транспільований застарілий, - а браузер обирав між ними через type=module і nomodule. Сучасні браузери перестали завантажувати поліфіли й занижений синтаксис, які їм не потрібні.',
      },
      code: '<script src="main-es2015.js" type="module"></script>\n<script src="main-es5.js" nomodule defer></script>\n\n<!-- a modern browser ignores the second line; an old one ignores the first -->',
    },
    {
      id: 'v8-dynamic-import',
      head: {
        en: 'Lazy routes became real imports',
        uk: 'Ліниві маршрути стали справжніми імпортами',
      },
      body: {
        en: 'loadChildren took a function returning import() instead of a magic string with a hash in it. The path is now checked by the compiler, understood by every editor, and refactorable like any other import.',
        uk: 'loadChildren почав приймати функцію з import() замість магічного рядка з решіткою всередині. Шлях тепер перевіряє компілятор, його розуміє будь-який редактор, і його можна рефакторити, як будь-який інший імпорт.',
      },
      code: '// before: a string nothing could check\nloadChildren: "./admin/admin.module#AdminModule"\n\n// after: an import the compiler follows\nloadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule)',
    },
    {
      id: 'v8-viewchild-static',
      head: {
        en: 'ViewChild had to declare its timing',
        uk: 'ViewChild мусив оголосити свій момент',
      },
      body: {
        en: 'Queries were made to say whether they resolve before change detection runs or after it. A one-time annoyance across every codebase, and the point at which query timing stopped being something you inferred from where the element sat in the template.',
        uk: 'Запити змусили вказувати, чи вони резолвляться до першого проходу change detection, чи після нього. Одноразова морока для кожної кодової бази - і момент, коли час резолву перестав бути тим, що вгадують за розташуванням елемента в шаблоні.',
      },
      code: '// resolved in ngOnInit - the element is not inside a conditional\n@ViewChild("input", { static: true }) input: ElementRef;\n\n// resolved in ngAfterViewInit - it is\n@ViewChild("row", { static: false }) row: ElementRef;',
    },
    {
      id: 'v8-ivy-preview',
      head: { en: 'Ivy behind a flag', uk: 'Ivy за прапорцем' },
      body: {
        en: 'enableIvy in the compiler options turned on the new renderer a release early, for anyone willing to find the bugs. It became the default in v9.',
        uk: 'enableIvy в опціях компілятора вмикав новий рендерер на реліз раніше - для тих, хто готовий був знаходити баги. Типовим він став у v9.',
      },
      code: '// tsconfig.app.json\n"angularCompilerOptions": {\n  "enableIvy": true\n}',
    },
    {
      id: 'v8-builders',
      head: { en: 'The Builders API', uk: 'API збірників' },
      body: {
        en: 'ng build, ng test and ng serve became replaceable implementations behind a named target. Every alternative toolchain since - the esbuild builder, the Vitest runner - is a builder swapped in at this seam.',
        uk: 'ng build, ng test і ng serve стали замінними реалізаціями за іменованою ціллю. Кожен альтернативний інструментарій відтоді - esbuild-збірник, раннер Vitest - це builder, підставлений у цей самий шов.',
      },
      code: '"build": {\n  "builder": "@angular-devkit/build-angular:browser",\n  "options": { ... }\n}',
    },
    {
      id: 'v8-web-workers',
      head: { en: 'Web workers from the CLI', uk: 'Web worker-и з CLI' },
      body: {
        en: 'ng generate web-worker created a worker and taught the build to bundle it, so moving expensive work off the main thread stopped requiring a custom webpack config.',
        uk: 'ng generate web-worker створював воркер і навчав збірку його пакувати, тож винесення важкої роботи з головного потоку перестало вимагати власного конфігу webpack.',
      },
      code: 'ng generate web-worker parser',
    },
    {
      id: 'v8-location-upgrade',
      head: {
        en: 'A better path for AngularJS upgrades',
        uk: 'Кращий шлях для міграції з AngularJS',
      },
      body: {
        en: 'The location service was unified so a hybrid application could let both frameworks share one URL, which is the hard part of running AngularJS and Angular side by side during a migration.',
        uk: 'Сервіс location уніфікували, щоб гібридний застосунок міг дати обом фреймворкам спільний URL, - а це найважча частина одночасної роботи AngularJS і Angular під час міграції.',
      },
    },
    {
      id: 'v8-bazel-preview',
      head: { en: 'Bazel, in preview', uk: 'Bazel у preview' },
      body: {
        en: 'An opt-in preview of incremental builds for very large workspaces. It never became the default and was dropped later - worth knowing as the release where the CLI began treating build speed as the problem to solve.',
        uk: 'Опційний preview інкрементальних збірок для дуже великих воркспейсів. Він так і не став типовим і згодом його прибрали - варто знати як реліз, де CLI почав вважати швидкість збірки головною проблемою.',
      },
    },
  ],
};
