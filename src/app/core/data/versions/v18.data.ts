import { VersionEntry } from '../../models/content.model';

export const V18: VersionEntry = {
  id: 'v18',
  label: 'v18',
  year: 2024,
  title: {
    en: 'The first release you could run without zone.js',
    uk: 'Перший реліз, який можна було запустити без zone.js',
  },
  points: [
    {
      id: 'v18-zoneless-experimental',
      head: {
        en: 'Experimental zoneless change detection',
        uk: 'Експериментальний zoneless change detection',
      },
      body: {
        en: 'An app could run with no zone.js at all: signals, the async pipe and markForCheck schedule the check instead of a patched setTimeout noticing that something might have happened. It works out of the box if your components are OnPush or signal-based.',
        uk: 'Застосунок міг працювати взагалі без zone.js: сигнали, async-пайп і markForCheck планують перевірку замість пропатченого setTimeout, який здогадується, що щось могло статися. Працює з коробки, якщо твої компоненти на OnPush або на сигналах.',
      },
      code: 'bootstrapApplication(AppComponent, {\n  providers: [provideExperimentalZonelessChangeDetection()],\n});\n\n// and zone.js comes out of the polyfills in angular.json',
    },
    {
      id: 'v18-hybrid-scheduler',
      head: { en: 'A scheduler even with zone.js', uk: 'Планувальник навіть із zone.js' },
      body: {
        en: 'The new change detection scheduler was switched on for everyone, zone or not, so a check is also triggered by a signal write, a markForCheck or an async pipe emission - not only by the zone noticing an async task.',
        uk: 'Новий планувальник change detection увімкнули для всіх - із зоною чи без, - тож перевірку запускає також запис у сигнал, markForCheck чи емісія async-пайпа, а не лише зона, що помітила асинхронну задачу.',
      },
    },
    {
      id: 'v18-control-flow-stable',
      head: { en: 'Control flow and @defer stable', uk: 'Control flow і @defer стабільні' },
      body: {
        en: 'They left developer preview, with a migration that rewrites the structural directives in place. @for also gained development-mode warnings for a duplicated track key, and for a track that forces the whole list to be rebuilt.',
        uk: 'Вони вийшли з developer preview разом із міграцією, яка переписує структурні директиви на місці. @for також отримав попередження в режимі розробки про дубльований ключ track і про track, що змушує перебудовувати весь список.',
      },
      code: 'ng generate @angular/core:control-flow',
    },
    {
      id: 'v18-event-replay',
      head: { en: 'Event replay for SSR', uk: 'Повтор подій для SSR' },
      body: {
        en: 'withEventReplay records the clicks that land before hydration finishes and replays them once it has. Without it, the first tap on a server-rendered page is simply swallowed - and the fastest users are the ones it fails.',
        uk: 'withEventReplay записує кліки, що трапилися до завершення гідратації, і повторює їх після неї. Без цього перший дотик до відрендереної на сервері сторінки просто зникає, - і страждають саме найшвидші користувачі.',
      },
      code: 'provideClientHydration(withEventReplay())',
    },
    {
      id: 'v18-form-events',
      head: { en: 'One stream for form state', uk: 'Один потік для стану форми' },
      body: {
        en: 'A control exposes an events observable carrying value, status, touched, pristine, reset and submit as typed events with a source, instead of three separate streams that had to be combined by hand.',
        uk: 'Контрол надає observable events, який несе value, status, touched, pristine, reset і submit як типізовані події із джерелом, замість трьох окремих потоків, які доводилося зводити вручну.',
      },
      code: 'form.events.subscribe((event) => {\n  if (event instanceof TouchedChangeEvent) { ... }\n  if (event instanceof FormSubmitEvent) { ... }\n});',
    },
    {
      id: 'v18-ng-content-fallback',
      head: { en: 'Fallback content for ng-content', uk: 'Запасний вміст для ng-content' },
      body: {
        en: 'A projection slot can carry default content shown when the caller projects nothing - the wrapper component pattern that previously needed an @if and a duplicated template.',
        uk: 'Слот проєкції може мати вміст за замовчуванням, що показується, коли викликач нічого не спроєктував, - патерн компонента-обгортки, який раніше вимагав @if і дубльованого шаблону.',
      },
      code: '<ng-content select="[title]">Untitled</ng-content>',
    },
    {
      id: 'v18-redirect-functions',
      head: { en: 'Redirects as functions', uk: 'Редиректи як функції' },
      body: {
        en: 'redirectTo takes a function with access to the snapshot and the injector, and guards can return a RedirectCommand carrying navigation options. A redirect that depends on state stopped needing a guard that pretends to be one.',
        uk: 'redirectTo приймає функцію з доступом до знімка і до інжектора, а guard-и можуть повертати RedirectCommand з опціями навігації. Редирект, що залежить від стану, перестав потребувати guard-а, який ним прикидається.',
      },
      code: '{\n  path: "old",\n  redirectTo: ({ queryParams }) =>\n    inject(Auth).isAdmin() ? "/admin" : "/home",\n}',
    },
    {
      id: 'v18-httpclientmodule-deprecated',
      head: { en: 'The HTTP modules deprecated', uk: 'HTTP-модулі застаріли' },
      body: {
        en: 'HttpClientModule and its siblings were deprecated in favour of provideHttpClient with feature functions, and a schematic rewrites them. Anything left in a codebase after this is a signal that ng update has not been run in a while.',
        uk: 'HttpClientModule і його родичі оголосили застарілими на користь provideHttpClient з функціями-фічами, а схематика їх переписує. Усе, що лишилося після цього в кодовій базі, - знак, що ng update давно не запускали.',
      },
      code: 'provideHttpClient(withXsrfConfiguration({ ... }), withJsonpSupport())',
    },
    {
      id: 'v18-zone-maintenance',
      head: { en: 'zone.js entered maintenance', uk: 'zone.js перейшов у режим підтримки' },
      body: {
        en: 'Officially: bug fixes and security patches only, no new features. The library that defined Angular change detection for eight years was declared finished, three releases before it stopped being installed at all.',
        uk: 'Офіційно: лише виправлення багів і безпекові патчі, жодних нових можливостей. Бібліотеку, що вісім років визначала change detection в Angular, оголосили завершеною - за три релізи до того, як її перестали встановлювати взагалі.',
      },
    },
  ],
};
