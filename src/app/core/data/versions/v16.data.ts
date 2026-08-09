import { VersionEntry } from '../../models/content.model';

export const V16: VersionEntry = {
  id: 'v16',
  label: 'v16',
  year: 2023,
  title: {
    en: 'Signals arrive, and hydration stops throwing the DOM away',
    uk: 'Приходять сигнали, а гідратація перестає викидати DOM',
  },
  points: [
    {
      id: 'v16-signals-preview',
      head: { en: 'Signals in developer preview', uk: 'Сигнали в developer preview' },
      body: {
        en: 'signal, computed and effect landed: values that know who read them, so a change tells the framework exactly what has to be recomputed. This is the foundation everything since has been built on, zoneless change detection included.',
        uk: "З'явилися signal, computed і effect: значення, які знають, хто їх прочитав, тож зміна повідомляє фреймворку точно, що треба перерахувати. Це фундамент, на якому будується все відтоді, включно зі zoneless change detection.",
      },
      code: 'const count = signal(0);\nconst double = computed(() => count() * 2);   // reading count() creates the edge\n\ncount.set(5);\ndouble();   // 10, recomputed without anything being wired up',
    },
    {
      id: 'v16-hydration',
      head: { en: 'Non-destructive hydration', uk: 'Неруйнівна гідратація' },
      body: {
        en: 'provideClientHydration reuses the server-rendered DOM instead of deleting it and rendering again. That re-render was the flicker that made SSR a hard sell, and removing it is what turned server rendering into a default worth choosing.',
        uk: 'provideClientHydration перевикористовує DOM, відрендерений на сервері, замість того щоб видалити його і відрендерити заново. Саме той повторний рендер спричиняв мерехтіння, через яке SSR було важко продати, і його усунення зробило серверний рендеринг вибором за замовчуванням.',
      },
      code: 'bootstrapApplication(AppComponent, {\n  providers: [provideClientHydration()],\n});\n\n<!-- and on a node the server and client legitimately disagree about: -->\n<div ngSkipHydration>...</div>',
    },
    {
      id: 'v16-http-transfer-cache',
      head: { en: 'The HTTP transfer cache', uk: 'Transfer-кеш для HTTP' },
      body: {
        en: 'Requests made while rendering on the server are serialised into the page and replayed on the client, so the browser does not immediately re-fetch everything the server already had. On by default with hydration.',
        uk: 'Запити, зроблені під час рендерингу на сервері, серіалізуються в сторінку і відтворюються на клієнті, тож браузер не перезапитує одразу все, що сервер уже мав. Увімкнено за замовчуванням разом із гідратацією.',
      },
    },
    {
      id: 'v16-required-inputs',
      head: { en: 'Required inputs', uk: "Обов'язкові inputs" },
      body: {
        en: 'Marking an input required makes a missing binding a compile error instead of an undefined discovered at runtime, in a component that had no honest way to handle it.',
        uk: "Позначення input як обов'язкового робить відсутню прив'язку помилкою компіляції, а не undefined, знайденим у рантаймі всередині компонента, який не мав чесного способу це обробити.",
      },
      code: '@Input({ required: true }) user!: User;\n\n<!-- now an error at build time -->\n<user-card></user-card>',
    },
    {
      id: 'v16-destroyref',
      head: { en: 'DestroyRef and takeUntilDestroyed', uk: 'DestroyRef і takeUntilDestroyed' },
      body: {
        en: 'Teardown without a destroy subject in every component: takeUntilDestroyed reads the current DestroyRef from the injection context and completes the stream with it. DestroyRef also makes cleanup possible in a service or a function, where there is no ngOnDestroy to write.',
        uk: "Прибирання без destroy-subject у кожному компоненті: takeUntilDestroyed бере поточний DestroyRef з контексту ін'єкції і завершує потік разом із ним. DestroyRef також уможливлює прибирання в сервісі чи функції, де ngOnDestroy просто немає де написати.",
      },
      code: '// before: a Subject, an ngOnDestroy and a takeUntil in every subscribe\nthis.service.items$\n  .pipe(takeUntilDestroyed())\n  .subscribe((items) => this.items.set(items));\n\ninject(DestroyRef).onDestroy(() => socket.close());',
    },
    {
      id: 'v16-route-inputs',
      head: { en: 'Route params as inputs', uk: 'Параметри маршруту як inputs' },
      body: {
        en: 'withComponentInputBinding binds path params, query params and resolved data straight to component inputs, so a routed component stops injecting ActivatedRoute and subscribing to read its own arguments.',
        uk: "withComponentInputBinding прив'язує параметри шляху, query-параметри й розв'язані дані прямо до inputs компонента, тож маршрутизований компонент перестає інжектити ActivatedRoute і підписуватися, щоб прочитати власні аргументи.",
      },
      code: 'provideRouter(routes, withComponentInputBinding());\n\n// route: "users/:id"\nexport class UserComponent {\n  @Input({ required: true }) id!: string;   // filled from the URL\n}',
    },
    {
      id: 'v16-self-closing-tags',
      head: { en: 'Self-closing tags', uk: 'Самозакривні теги' },
      body: {
        en: 'A component with no content can be written as <app-user />, which removes a real class of bug: a stray closing tag that silently reparents everything under it.',
        uk: 'Компонент без вмісту можна писати як <app-user />, і це прибирає цілий клас помилок: забутий закривний тег, який тихо перевішує все під ним.',
      },
      code: '<app-user-card [user]="user()" />',
    },
    {
      id: 'v16-esbuild-dev-preview',
      head: {
        en: 'esbuild and Vite in developer preview',
        uk: 'esbuild і Vite у developer preview',
      },
      body: {
        en: 'The application builder combined esbuild for building with Vite for the dev server, and reported build times cut by more than half. It became the default in v17.',
        uk: 'Application builder поєднав esbuild для збірки з Vite для dev-сервера і показував скорочення часу збірки більш ніж удвічі. Типовим він став у v17.',
      },
    },
    {
      id: 'v16-jest-preview',
      head: { en: 'Experimental Jest support', uk: 'Експериментальна підтримка Jest' },
      body: {
        en: 'The first official move away from Karma, which had been unmaintained for years. Jest was eventually passed over in favour of Vitest, which became the default in v21.',
        uk: 'Перший офіційний крок геть від Karma, яку роками ніхто не підтримував. Зрештою обрали не Jest, а Vitest, що став типовим у v21.',
      },
    },
  ],
};
