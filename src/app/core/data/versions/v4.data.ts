import { VersionEntry } from '../../models/content.model';

export const V4: VersionEntry = {
  id: 'v4',
  label: 'v4',
  year: 2017,
  title: {
    en: 'View Engine, and the version number nobody shipped',
    uk: 'View Engine і номер версії, який ніхто не випустив',
  },
  points: [
    {
      id: 'v4-no-v3',
      head: { en: 'Why there is no v3', uk: 'Чому немає v3' },
      body: {
        en: 'The router package had already reached 3.x while core sat at 2.x. Rather than ship a 2.x framework with a 3.x router indefinitely, the team skipped 3 and put every package on one number - which is why the timeline jumps from 2 to 4.',
        uk: 'Пакет роутера вже дійшов до 3.x, поки core лишався на 2.x. Замість того щоб безкінечно випускати фреймворк 2.x із роутером 3.x, команда пропустила 3 і поставила всі пакети на один номер, - через це хронологія стрибає з 2 одразу на 4.',
      },
    },
    {
      id: 'v4-view-engine',
      head: { en: 'View Engine', uk: 'View Engine' },
      body: {
        en: 'The code generated for a template was rewritten to be far smaller - roughly a third of what it had been - which cut both bundle size and compile time. It stayed the renderer until Ivy replaced it in v9.',
        uk: 'Код, який генерувався для шаблону, переписали так, щоб він був значно меншим - приблизно третина від попереднього, - що скоротило і розмір бандла, і час компіляції. Він лишався рендерером, доки в v9 його не замінив Ivy.',
      },
    },
    {
      id: 'v4-ngif-else',
      head: { en: '*ngIf gained an else branch', uk: '*ngIf отримав гілку else' },
      body: {
        en: 'ngIf took an else template and an as clause, so an async value could be unwrapped once and reused instead of being piped twice - the pattern every codebase used until @if replaced it in v17.',
        uk: 'ngIf почав приймати else-шаблон і вираз as, тож асинхронне значення можна було розгорнути один раз і перевикористати замість двох викликів пайпа, - патерн, який був у кожній кодовій базі, доки в v17 його не замінив @if.',
      },
      code: '<div *ngIf="user$ | async as user; else loading">\n  {{ user.name }}\n</div>\n<ng-template #loading>Loading...</ng-template>',
    },
    {
      id: 'v4-animations-package',
      head: { en: 'Animations left core', uk: 'Анімації вийшли з core' },
      body: {
        en: '@angular/animations became a package of its own, so an app that animates nothing stopped paying for the code that would have done it.',
        uk: '@angular/animations став окремим пакетом, тож застосунок, який нічого не анімує, перестав платити за код, що це робив би.',
      },
      code: '// before: it came with the platform, whether you used it or not\nimport { BrowserAnimationsModule } from "@angular/platform-browser/animations";',
    },
    {
      id: 'v4-strict-null-checks',
      head: { en: 'TypeScript 2.1 and strictNullChecks', uk: 'TypeScript 2.1 і strictNullChecks' },
      body: {
        en: 'The framework updated to a TypeScript new enough to be compiled with strictNullChecks, so null and undefined became things the type system talks about rather than things you find at runtime.',
        uk: 'Фреймворк оновився до TypeScript, достатньо нового, щоб компілюватися зі strictNullChecks, тож null і undefined стали тим, про що говорить система типів, а не тим, що знаходять у рантаймі.',
      },
    },
    {
      id: 'v4-titlecase-pipe',
      head: { en: 'The titlecase pipe', uk: 'Пайп titlecase' },
      body: {
        en: 'A small addition worth noting because of what it stands for: the common package started shipping the formatting people were otherwise writing by hand in every project.',
        uk: 'Невелике доповнення, варте згадки через те, що воно означає: пакет common почав постачати те форматування, яке інакше писали вручну в кожному проєкті.',
      },
      code: '{{ "ada lovelace" | titlecase }}   <!-- Ada Lovelace -->',
    },
    {
      id: 'v4-universal-in-core',
      head: { en: 'Universal moved into the repository', uk: 'Universal переїхав у репозиторій' },
      body: {
        en: 'Server-side rendering stopped being a community project and became @angular/platform-server, maintained alongside the framework. The full story took until v16 hydration to be worth turning on.',
        uk: 'Серверний рендеринг перестав бути спільнотним проєктом і став пакетом @angular/platform-server, який підтримують разом із фреймворком. Але вмикати його стало по-справжньому варто лише після гідратації у v16.',
      },
    },
  ],
};
