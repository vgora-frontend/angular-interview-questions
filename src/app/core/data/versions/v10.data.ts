import { VersionEntry } from '../../models/content.model';

export const V10: VersionEntry = {
  id: 'v10',
  label: 'v10',
  year: 2020,
  title: {
    en: 'A stricter default project',
    uk: 'Суворіший проєкт за замовчуванням',
  },
  points: [
    {
      id: 'v10-strict-mode',
      head: { en: 'ng new --strict', uk: 'ng new --strict' },
      body: {
        en: 'One flag turning on TypeScript strict mode, strict templates and tighter bundle budgets together. Opt-in here, and the default from v12 - which is why a project started before 2021 usually has to be tightened by hand.',
        uk: 'Один прапорець, що вмикає разом строгий режим TypeScript, строгі шаблони і жорсткіші бюджети бандла. Тут це вибір, а з v12 - типова поведінка; тому проєкт, започаткований до 2021 року, зазвичай доводиться підтягувати вручну.',
      },
      code: 'ng new my-app --strict\n\n// tsconfig.json\n"strict": true,\n"noImplicitReturns": true,\n"angularCompilerOptions": { "strictTemplates": true }',
    },
    {
      id: 'v10-commonjs-warnings',
      head: { en: 'CommonJS dependency warnings', uk: 'Попередження про CommonJS-залежності' },
      body: {
        en: 'The build started warning when a dependency arrives as CommonJS, because those cannot be tree-shaken. A bundle-size problem that used to be silent became a line in the build output.',
        uk: 'Збірка почала попереджати, коли залежність приходить у форматі CommonJS, бо такі не піддаються tree-shaking. Проблема розміру бандла, яка раніше була мовчазною, стала рядком у виводі збірки.',
      },
      code: 'Warning: moment depends on CommonJS, which can cause optimization bailouts.',
    },
    {
      id: 'v10-browser-support',
      head: { en: 'Old browsers left the default', uk: 'Старі браузери пішли з дефолту' },
      body: {
        en: 'The generated browserslist dropped browsers nobody was targeting any more, so the differential build stopped emitting workarounds for them. A small change with a measurable effect on what shipped.',
        uk: 'Згенерований browserslist позбувся браузерів, на які вже ніхто не орієнтувався, тож диференційована збірка перестала видавати обхідні шляхи для них. Мала зміна з вимірюваним ефектом на те, що потрапляє в реліз.',
      },
    },
    {
      id: 'v10-date-range-picker',
      head: { en: 'Material date range picker', uk: 'Material date range picker' },
      body: {
        en: 'The component every product eventually needs and nobody wants to build twice, with the keyboard and screen-reader behaviour already handled.',
        uk: 'Компонент, який рано чи пізно потрібен кожному продукту і який ніхто не хоче писати двічі, - із уже реалізованою поведінкою для клавіатури й скрінрідера.',
      },
      code: '<mat-date-range-input [rangePicker]="picker">\n  <input matStartDate formControlName="start">\n  <input matEndDate formControlName="end">\n</mat-date-range-input>',
    },
    {
      id: 'v10-optional-strictness-flags',
      head: { en: 'New compiler diagnostics', uk: 'Нові діагностики компілятора' },
      body: {
        en: 'The compiler started flagging patterns it had previously accepted in silence - unresolved metadata, wrong generic bounds - which is a small tax now and a caught bug later.',
        uk: 'Компілятор почав позначати те, що раніше приймав мовчки, - невирішені метадані, хибні межі дженериків, - і це невеликий податок зараз в обмін на впійманий баг потім.',
      },
    },
    {
      id: 'v10-typescript-39',
      head: { en: 'TypeScript 3.9 and TSLib 2.0', uk: 'TypeScript 3.9 і TSLib 2.0' },
      body: {
        en: 'Faster type checking and smaller emitted helpers. Unglamorous, and the kind of thing that decides whether a large codebase is pleasant to work in.',
        uk: 'Швидша перевірка типів і менші допоміжні функції у виводі. Непоказно - і саме такі речі вирішують, чи приємно працювати у великій кодовій базі.',
      },
    },
    {
      id: 'v10-ngcc-performance',
      head: { en: 'ngcc got faster, and less frequent', uk: 'ngcc став швидшим і рідшим' },
      body: {
        en: 'The compatibility compiler that translated View Engine libraries for Ivy started running in parallel and caching its work. It was a stopgap by design and was finally removed in v13.',
        uk: 'Компілятор сумісності, який перекладав View Engine-бібліотеки для Ivy, почав працювати паралельно і кешувати результат. За задумом це був тимчасовий милиця-крок, і в v13 його зрештою прибрали.',
      },
    },
  ],
};
