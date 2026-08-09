import { VersionEntry } from '../../models/content.model';

export const V22: VersionEntry = {
  id: 'v22',
  label: 'v22',
  year: 2026,
  title: {
    en: 'The reactive foundation goes stable',
    uk: 'Реактивний фундамент стає стабільним',
  },
  points: [
    {
      id: 'v22-signal-forms-stable',
      head: { en: 'Signal Forms stable', uk: 'Signal Forms стабільні' },
      body: {
        en: 'form() from @angular/forms/signals left experimental. The model is a signal, validation is a schema over its shape, and the whole thing is strongly typed - the third and, by design, last forms API.',
        uk: 'form() з @angular/forms/signals вийшов з експериментального статусу. Модель є сигналом, валідація - схемою над її структурою, і все це строго типізоване; це третій і, за задумом, останній API форм.',
      },
      code: 'const model = signal({ name: "", age: 0, isAdmin: false });\n\nconst userForm = form(model, (path) => {\n  required(path.name);\n  disabled(path.age, { when: ({ valueOf }) => valueOf(path.isAdmin) });\n});',
    },
    {
      id: 'v22-resources-stable',
      head: { en: 'The resource APIs stable', uk: 'API resource стабільні' },
      body: {
        en: 'resource(), rxResource() and httpResource() are production-ready. chain() expresses one resource depending on another without an intermediate signal, and an id makes a resource cacheable across the server-to-client handover.',
        uk: 'resource(), rxResource() і httpResource() готові до продакшену. chain() виражає залежність одного resource від іншого без проміжного сигналу, а id робить resource кешованим на межі передачі від сервера до клієнта.',
      },
      code: 'const posts = resource({\n  params: ({ chain }) => {\n    const user = chain(userResource);\n    return user ? { authorId: user.id } : undefined;   // waits for the user\n  },\n  loader: ({ params }) => fetchPosts(params.authorId),\n});',
    },
    {
      id: 'v22-onpush-default',
      head: { en: 'OnPush is the default', uk: 'OnPush став типовим' },
      body: {
        en: 'The default change detection strategy flipped, and what used to be Default was renamed Eager to say plainly what it does. A migration writes the explicit strategy onto existing components, so nothing changes behaviour on upgrade.',
        uk: 'Типова стратегія change detection змінилася, а те, що раніше звалося Default, перейменували на Eager, щоб назва прямо казала, що воно робить. Міграція проставляє явну стратегію наявним компонентам, тож при оновленні поведінка не змінюється.',
      },
      code: '// new components need no line at all\n@Component({ selector: "user-card" })\n\n// and the old default now says what it means\n@Component({ changeDetection: ChangeDetectionStrategy.Eager })',
    },
    {
      id: 'v22-service-decorator',
      head: { en: 'The @Service decorator', uk: 'Декоратор @Service' },
      body: {
        en: 'Shorthand for @Injectable({ providedIn: "root" }), which is what the overwhelming majority of services actually are. Dependencies come through inject(); autoProvided: false opts out of the root injector.',
        uk: 'Скорочення для @Injectable({ providedIn: "root" }) - того, чим переважна більшість сервісів і є насправді. Залежності приходять через inject(); autoProvided: false відмовляється від кореневого інжектора.',
      },
      code: '@Service()\nexport class UserStore {\n  private readonly http = inject(HttpClient);\n}',
    },
    {
      id: 'v22-inject-async',
      head: { en: 'injectAsync()', uk: 'injectAsync()' },
      body: {
        en: 'Lazy-loads a service the way loadComponent lazy-loads a component: the service and its dependencies land in their own chunk, with prefetch on idle, on hover or on intersection.',
        uk: 'Ліниво завантажує сервіс так само, як loadComponent завантажує компонент: сервіс і його залежності потрапляють у власний чанк, із передзавантаженням onIdle, onHover або onIntersection.',
      },
      code: 'private readonly reports = injectAsync(\n  () => import("./report.service").then((m) => m.ReportService),\n  { prefetch: "onIdle" },\n);',
    },
    {
      id: 'v22-template-spread-arrow',
      head: {
        en: 'Spread and arrow functions in templates',
        uk: 'Spread і стрілкові функції в шаблонах',
      },
      body: {
        en: 'Object and array spread work in template expressions, and short arrow functions are allowed in event handlers. @switch gained fall-through cases and an exhaustive @default never, and comments can sit inside an element among its bindings.',
        uk: "Spread для об\'єктів і масивів працює у виразах шаблону, а короткі стрілкові функції дозволені в обробниках подій. @switch отримав наскрізні case і вичерпний @default never, а коментарі можуть стояти всередині елемента серед його прив\'язок.",
      },
      code: '<div [class]="{ ...baseClasses, active: isActive() }"></div>\n<button (click)="item.update((p) => ({ ...p, stock: p.stock - 1 }))">Sell</button>\n\n@switch (status()) {\n  @case ("pending")\n  @case ("processing") { <p>In progress</p> }\n  @default never;              <!-- compile error if a case is unhandled -->\n}',
    },
    {
      id: 'v22-strict-templates-default',
      head: {
        en: 'strictTemplates on by default',
        uk: 'strictTemplates увімкнено за замовчуванням',
      },
      body: {
        en: 'Thirteen releases after it appeared. The migration preserves the existing behaviour of a project that had it off, so the change is a new default rather than a forced upgrade.',
        uk: 'Через тринадцять релізів після появи. Міграція зберігає наявну поведінку проєкту, у якому воно було вимкнене, тож це зміна дефолту, а не примусове оновлення.',
      },
    },
    {
      id: 'v22-optional-chaining-semantics',
      head: {
        en: 'Optional chaining matches TypeScript',
        uk: 'Optional chaining відповідає TypeScript',
      },
      body: {
        en: 'a?.b in a template returns undefined rather than null, as it does everywhere else in the language. It is a genuine behaviour change, so the migration wraps affected expressions instead of rewriting them silently.',
        uk: 'a?.b у шаблоні тепер повертає undefined, а не null - як і всюди в мові. Це справжня зміна поведінки, тож міграція загортає зачеплені вирази, а не переписує їх мовчки.',
      },
    },
    {
      id: 'v22-fetch-default',
      head: { en: 'HttpClient uses fetch by default', uk: 'HttpClient за замовчуванням на fetch' },
      body: {
        en: 'The Fetch API replaced XMLHttpRequest as the backend, so withFetch() is deprecated and withXhr() exists for anything that still needs the old one. reportProgress split into reportUploadProgress and reportDownloadProgress.',
        uk: 'Fetch API замінив XMLHttpRequest як бекенд, тож withFetch() застарів, а withXhr() існує для того, чому старий ще потрібен. reportProgress розділили на reportUploadProgress і reportDownloadProgress.',
      },
    },
    {
      id: 'v22-router-navigation-api',
      head: { en: 'Router on the Navigation API', uk: 'Роутер на Navigation API' },
      body: {
        en: 'withExperimentalPlatformNavigation puts the router on the browser Navigation API, intercepting plain anchors as well as routerLink. withExperimentalAutoCleanupInjectors destroys route-level injectors when a route goes inactive, closing a common memory leak.',
        uk: "withExperimentalPlatformNavigation переводить роутер на браузерний Navigation API, перехоплюючи звичайні посилання нарівні з routerLink. withExperimentalAutoCleanupInjectors знищує інжектори рівня маршруту, коли маршрут стає неактивним, закриваючи поширений витік пам'яті.",
      },
      code: 'provideRouter(routes,\n  withExperimentalPlatformNavigation(),\n  withExperimentalAutoCleanupInjectors(),\n);',
    },
    {
      id: 'v22-incremental-hydration-default',
      head: {
        en: 'Incremental hydration by default',
        uk: 'Інкрементальна гідратація за замовчуванням',
      },
      body: {
        en: 'What v19 introduced behind withIncrementalHydration became the default; withNoIncrementalHydration exists to go back. provideServerRendering also gained a maxResponseBodySize cap, defaulting to 1MB.',
        uk: 'Те, що v19 увів за withIncrementalHydration, стало типовим; withNoIncrementalHydration існує, щоб повернутися назад. provideServerRendering також отримав обмеження maxResponseBodySize з типовим значенням 1 МБ.',
      },
    },
    {
      id: 'v22-error-boundary',
      head: { en: '@boundary, in preview', uk: '@boundary у preview' },
      body: {
        en: 'An error boundary for templates: a failure inside the block renders the @error content instead of taking the page down with it. Developer preview - the first answer Angular has had to "one broken widget should not be a blank screen".',
        uk: 'Межа помилок для шаблонів: збій усередині блоку рендерить вміст @error замість того, щоб покласти всю сторінку. Developer preview - і перша відповідь Angular на "один зламаний віджет не має означати білий екран".',
      },
      code: '@boundary {\n  <app-promo-widget />\n} @error (let err) {\n  <app-fallback-promo />\n}',
    },
    {
      id: 'v22-webpack-deprecated',
      head: { en: 'Webpack deprecated', uk: 'Webpack оголошено застарілим' },
      body: {
        en: '@angular-devkit/build-angular and @ngtools/webpack are on the way out, five releases after esbuild became the default. v22 also requires TypeScript 6 and Node 22.',
        uk: '@angular-devkit/build-angular і @ngtools/webpack ідуть на вихід - через пять релізів після того, як esbuild став типовим. v22 також вимагає TypeScript 6 і Node 22.',
      },
    },
  ],
};
