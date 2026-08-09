import { VersionEntry } from '../../models/content.model';

export const V5: VersionEntry = {
  id: 'v5',
  label: 'v5',
  year: 2017,
  title: {
    en: 'HttpClient, and ahead-of-time builds for production',
    uk: 'HttpClient і AOT-збірка для продакшену',
  },
  points: [
    {
      id: 'v5-httpclient',
      head: { en: 'HttpClient replaced Http', uk: 'HttpClient замінив Http' },
      body: {
        en: 'The new client parses JSON by default and takes the response type as a parameter, so .map(r => r.json()) disappeared from every service in every codebase at once.',
        uk: 'Новий клієнт за замовчуванням парсить JSON і приймає тип відповіді параметром, тож .map(r => r.json()) одномоментно зник з кожного сервісу в кожній кодовій базі.',
      },
      code: '// before\nthis.http.get("/api/users").map((r) => r.json());\n\n// after: parsed, and typed\nthis.http.get<User[]>("/api/users");',
    },
    {
      id: 'v5-interceptors',
      head: { en: 'HTTP interceptors', uk: 'HTTP-інтерсептори' },
      body: {
        en: 'One place to attach a token, retry a failure or log a request, applied to every call that goes through the client. Before this, the same job needed a wrapper service that everyone had to remember to use.',
        uk: "Одне місце, щоб додати токен, повторити невдалий запит чи залогувати виклик, - і воно застосовується до кожного запиту через клієнт. До цього ту саму роботу робив сервіс-обгортка, про який усі мали пам\'ятати.",
      },
      code: 'class AuthInterceptor implements HttpInterceptor {\n  intercept(req: HttpRequest<unknown>, next: HttpHandler) {\n    return next.handle(req.clone({ setHeaders: { Authorization: token } }));\n  }\n}',
    },
    {
      id: 'v5-aot-default',
      head: { en: 'AOT on for production builds', uk: 'AOT увімкнено для продакшен-збірок' },
      body: {
        en: 'ng build --prod started compiling templates ahead of time. Template errors moved from runtime to build time, and the compiler itself stopped being shipped to the browser.',
        uk: 'ng build --prod почав компілювати шаблони заздалегідь. Помилки в шаблонах переїхали з рантайму в час збірки, а сам компілятор перестав потрапляти в браузер.',
      },
    },
    {
      id: 'v5-build-optimizer',
      head: { en: 'The build optimizer', uk: 'Build optimizer' },
      body: {
        en: 'Also part of --prod: it strips the decorators the runtime no longer needs after AOT, and marks calls as pure so the bundler is allowed to drop them.',
        uk: 'Теж частина --prod: він прибирає декоратори, які після AOT більше не потрібні в рантаймі, і позначає виклики як чисті, щоб бандлер мав право їх викинути.',
      },
    },
    {
      id: 'v5-router-events',
      head: { en: 'Router lifecycle events', uk: 'Події життєвого циклу роутера' },
      body: {
        en: 'Guards and resolvers got events of their own - GuardsCheckStart, ResolveEnd and the rest - which is what makes an honest loading indicator possible: one that covers the resolve, not just the navigation.',
        uk: 'Guard-и та resolver-и отримали власні події - GuardsCheckStart, ResolveEnd та інші, - і саме це дає змогу зробити чесний індикатор завантаження: такий, що покриває resolve, а не лише навігацію.',
      },
      code: 'router.events\n  .pipe(filter((e) => e instanceof ResolveStart || e instanceof ResolveEnd))\n  .subscribe((e) => this.busy.set(e instanceof ResolveStart));',
    },
    {
      id: 'v5-router-scroll',
      head: { en: 'Scroll position restoration', uk: 'Відновлення позиції прокрутки' },
      body: {
        en: 'The router learned to restore the scroll position on a back navigation and to jump to an anchor - behaviour the browser gives a normal site for free and a single-page app has to be told to do.',
        uk: 'Роутер навчився відновлювати позицію прокрутки при навігації назад і переходити до якоря, - те, що браузер дає звичайному сайту безкоштовно, а SPA доводиться просити явно.',
      },
      code: 'RouterModule.forRoot(routes, {\n  scrollPositionRestoration: "enabled",\n  anchorScrolling: "enabled",\n});',
    },
    {
      id: 'v5-i18n-pipes',
      head: { en: 'Pipes stopped depending on Intl', uk: 'Пайпи перестали залежати від Intl' },
      body: {
        en: 'The date, number and currency pipes were reimplemented on Angular locale data instead of the browser Intl API, so the same input formats identically in every browser.',
        uk: 'Пайпи date, number і currency переписали на локальні дані Angular замість браузерного Intl API, тож той самий ввід форматується однаково в кожному браузері.',
      },
    },
    {
      id: 'v5-updateon-blur',
      head: { en: 'Forms updateOn', uk: 'updateOn у формах' },
      body: {
        en: 'A control or a whole form could be told to update on blur or on submit rather than on every keystroke - the fix for validation that shouts at you while you are still typing.',
        uk: 'Контролу або цілій формі можна було сказати оновлюватися на blur чи на submit замість кожного натискання клавіші, - це виправлення для валідації, яка кричить на тебе, поки ти ще друкуєш.',
      },
      code: 'new FormControl("", { updateOn: "blur" });\nnew FormGroup({ ... }, { updateOn: "submit" });',
    },
  ],
};
