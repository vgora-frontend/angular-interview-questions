import { Question } from '../../models/content.model';

// HttpClient, interceptors and talking to a backend.
export const HTTP_QUESTIONS: Question[] = [
  {
    id: 'q-httpclient-benefits',
    category: 'http',
    q: {
      en: 'What is HttpClient, and what does it give you over fetch?',
      uk: 'Що таке HttpClient і що він дає порівняно з fetch?',
    },
    a: {
      en: 'It returns observables rather than promises, which brings cancellation, retries and operator composition for free. On top of that: typed response bodies, JSON parsing without a second await, an interceptor chain, progress events, XSRF handling, and a testing backend that lets you assert on requests. fetch does the same job, but everything in that list becomes yours to write.',
      uk: 'Він повертає observable, а не promise, і це безкоштовно дає скасування, повтори й композицію операторів. Додатково: типізовані тіла відповідей, розбір JSON без другого await, ланцюжок інтерсепторів, події прогресу, обробка XSRF і тестовий бекенд, який дозволяє перевіряти запити. fetch робить ту саму роботу, але все з цього списку доведеться писати самому.',
    },
    code: '// One await less, typed, and cancellable\nthis.http.get<User[]>("/api/users");\n\n// The fetch equivalent, before you add retries or cancellation\nconst response = await fetch("/api/users");\nif (!response.ok) throw new Error(response.statusText);\nconst users = (await response.json()) as User[];',
  },
  {
    id: 'q-provide-http-client',
    category: 'http',
    q: {
      en: 'How do you set up HttpClient in a standalone application, and what do its with* features add?',
      uk: 'Як налаштувати HttpClient у standalone-застосунку і що додають його можливості with*?',
    },
    a: {
      en: 'provideHttpClient in the application providers. The with* functions opt into features one at a time: withInterceptors for the functional chain, withFetch to use the fetch API underneath, withXsrfConfiguration to change the cookie and header names, withJsonpSupport for JSONP. Anything you do not call contributes no code to the bundle - which is the reason this is a function and not the old HttpClientModule.',
      uk: 'provideHttpClient у провайдерах застосунку. Функції with* по одній вмикають можливості: withInterceptors для функціонального ланцюжка, withFetch щоб працювати через fetch API, withXsrfConfiguration для зміни імен куки й заголовка, withJsonpSupport для JSONP. Усе, чого ти не викликав, не додає коду в бандл - саме тому це функція, а не старий HttpClientModule.',
    },
    code: 'providers: [\n  provideHttpClient(\n    withFetch(),\n    withInterceptors([authInterceptor, retryInterceptor]),\n    withXsrfConfiguration({ cookieName: "XSRF-TOKEN", headerName: "X-XSRF-TOKEN" }),\n  ),\n];\n\n// withFetch is required for SSR, and for request streaming.',
  },
  {
    id: 'q-no-provider-for-httpclient',
    category: 'http',
    q: {
      en: 'What causes a "No provider for HttpClient" error?',
      uk: 'Через що виникає помилка "No provider for HttpClient"?',
    },
    a: {
      en: 'Nobody called provideHttpClient in the injector chain the requesting class can see. In an application that is a missing line in the config; in a test it is a TestBed that did not provide the testing backend. In a library it usually means the library provided HttpClient itself, which it must not - a library injects HttpClient and lets the application supply it, or two instances end up with different interceptors.',
      uk: 'Ніхто не викликав provideHttpClient у ланцюжку інжекторів, доступному класу, що просить. У застосунку це забутий рядок у конфігу, у тесті - TestBed без тестового бекенда. У бібліотеці це зазвичай означає, що вона сама надала HttpClient, а цього робити не можна: бібліотека інжектує HttpClient і дозволяє застосунку його постачити, інакше два екземпляри отримають різні інтерсептори.',
    },
    code: '// app.config.ts\nproviders: [provideHttpClient()];\n\n// In a test, provide the testing backend instead of the real one\nTestBed.configureTestingModule({\n  providers: [provideHttpClient(), provideHttpClientTesting()],\n});',
  },
  {
    id: 'q-httpclient-typed-request',
    category: 'http',
    q: {
      en: 'How do you type a request, and what does that type actually guarantee at runtime?',
      uk: 'Як типізувати запит і що цей тип насправді гарантує під час виконання?',
    },
    a: {
      en: 'You pass the type as a generic and HttpClient casts the parsed body to it. It guarantees nothing at runtime - it is an assertion, not a validation, so a server that renames a field produces an object whose type says one thing and whose contents say another, and the failure surfaces somewhere else entirely. Where the contract is not under your control, validate the shape on arrival.',
      uk: "Ти передаєш тип як дженерик, і HttpClient приводить розібране тіло до нього. Під час виконання це не гарантує нічого: це ствердження, а не валідація, тож сервер, який перейменував поле, дає об'єкт, чий тип каже одне, а вміст інше, і збій виявиться зовсім в іншому місці. Там, де контракт не під твоїм контролем, перевіряй структуру в момент отримання.",
    },
    code: '// An assertion: nothing checks this at runtime\nthis.http.get<User[]>("/api/users");\n\n// A validation, where the contract is not yours to control\nthis.http.get<unknown>("/api/users").pipe(\n  map((body) => parseUsers(body)),   // throws here, not three screens later\n);',
  },
  {
    id: 'q-http-headers-and-params',
    category: 'http',
    q: {
      en: 'How do you attach headers and query parameters, and why are HttpHeaders immutable?',
      uk: 'Як додати заголовки і query-параметри і чому HttpHeaders є незмінними?',
    },
    a: {
      en: 'Through the options object, as an HttpHeaders or HttpParams instance or as a plain object. Both classes are immutable: set and append return a new instance rather than modifying the old one, so a request already in flight cannot have its headers changed underneath it. The mistake this design catches is calling set without using the result, which silently does nothing.',
      uk: "Через об'єкт опцій - як екземпляр HttpHeaders чи HttpParams або як звичайний об'єкт. Обидва класи незмінні: set і append повертають новий екземпляр, а не змінюють старий, тож запиту, який уже в польоті, не можна підмінити заголовки. Помилка, яку ловить цей дизайн, - виклик set без використання результату: він тихо не робить нічого.",
    },
    code: 'this.http.get<User[]>("/api/users", {\n  headers: new HttpHeaders({ "X-Trace": traceId }),\n  params: new HttpParams().set("page", page).set("size", 20),\n});\n\n// Immutable: this line does nothing at all\nheaders.set("X-Trace", traceId);\n\n// This is what you meant:\nheaders = headers.set("X-Trace", traceId);',
  },
  {
    id: 'q-http-full-response',
    category: 'http',
    q: {
      en: 'How do you read the full response instead of just the body?',
      uk: 'Як прочитати повну відповідь, а не лише тіло?',
    },
    a: {
      en: 'Pass observe: "response", and the stream emits an HttpResponse with the status, the headers and the body instead of the body alone. You need it whenever the metadata carries meaning: a pagination total in a header, an ETag, a Location after a create. There is also observe: "events" for the whole lifecycle, which is how progress reporting works.',
      uk: 'Передай observe: "response" - і потік емітне HttpResponse зі статусом, заголовками й тілом замість самого лише тіла. Це потрібно щоразу, коли метадані щось означають: загальна кількість для пагінації в заголовку, ETag, Location після створення. Є ще observe: "events" для всього життєвого циклу - саме так працює звітування про прогрес.',
    },
    code: 'this.http\n  .get<User[]>("/api/users", { observe: "response" })\n  .pipe(\n    map((response) => ({\n      users: response.body ?? [],\n      total: Number(response.headers.get("X-Total-Count") ?? 0),\n    })),\n  );',
  },
  {
    id: 'q-http-error-handling',
    category: 'http',
    q: {
      en: 'How do you handle HTTP errors, and what does HttpErrorResponse tell you?',
      uk: 'Як обробляти HTTP-помилки і що повідомляє HttpErrorResponse?',
    },
    a: {
      en: 'Any non-2xx response arrives on the error channel as an HttpErrorResponse, which you catch with catchError. Its status distinguishes the two very different cases: status 0 means the request never reached the server - offline, CORS, blocked - while any other status means the server answered and refused. The error field holds the parsed error body for a server response, and a browser ProgressEvent for a network failure.',
      uk: 'Будь-яка відповідь не з 2xx надходить каналом помилки як HttpErrorResponse, і ловиться через catchError. Її status розрізняє два дуже різні випадки: status 0 означає, що запит не дійшов до сервера - офлайн, CORS, блокування, - тоді як будь-який інший статус означає, що сервер відповів і відмовив. Поле error містить розібране тіло помилки для відповіді сервера і браузерний ProgressEvent для мережевого збою.',
    },
    code: 'this.http.get<User>("/api/me").pipe(\n  catchError((error: HttpErrorResponse) => {\n    if (error.status === 0) {\n      return throwError(() => new Error("You appear to be offline."));\n    }\n    if (error.status === 404) {\n      return of(null);            // an expected absence, not a failure\n    }\n    return throwError(() => error);\n  }),\n);',
  },
  {
    id: 'q-http-cancel-request',
    category: 'http',
    q: {
      en: 'How does unsubscribing cancel an in-flight request, and when does that matter?',
      uk: 'Як відписка скасовує запит, що вже в польоті, і коли це важливо?',
    },
    a: {
      en: 'The backend aborts the underlying request when the last subscriber leaves - so the async pipe on a destroyed view, or switchMap superseding a value, actually cancels the network call. It matters for search, for anything triggered by fast navigation, and for uploads. Note that a cancelled request may still have been processed by the server: for a GET that is harmless, for a POST it is not, which is why exhaustMap rather than switchMap belongs on a save.',
      uk: 'Бекенд перериває запит під ним, коли зникає останній підписник, - тож async pipe у знищеному вигляді або switchMap, що витіснив значення, справді скасовують мережевий виклик. Це важливо для пошуку, для всього, що запускається швидкою навігацією, і для завантажень. Врахуй, що скасований запит сервер міг усе одно обробити: для GET це безпечно, для POST - ні, тому на збереженні має стояти exhaustMap, а не switchMap.',
    },
    code: '// Cancelled on every new term, and on destroy\nterm$.pipe(switchMap((term) => this.http.get<Result[]>(`/api/search?q=${term}`)));\n\n// Do not do this to a POST: the server may have processed the cancelled one\nsave$.pipe(exhaustMap(() => this.http.post("/api/orders", order)));',
  },
  {
    id: 'q-http-interceptors',
    category: 'http',
    q: {
      en: 'What is an HTTP interceptor, and where does it sit in the request pipeline?',
      uk: 'Що таке HTTP-інтерсептор і де він стоїть у конвеєрі запиту?',
    },
    a: {
      en: 'A function wrapped around every request that HttpClient sends: it receives the request and a handler, may modify or replace the request, and returns the stream of events so it can also observe or transform the response. It sits between the client and the backend, so it is the one place where a concern like authentication is applied to every call without any call site knowing.',
      uk: 'Це функція, обгорнута навколо кожного запиту, який надсилає HttpClient: вона отримує запит і обробник, може змінити або замінити запит і повертає потік подій, тож може також спостерігати чи перетворювати відповідь. Вона стоїть між клієнтом і бекендом, а отже це єдине місце, де така наскрізна річ, як автентифікація, застосовується до кожного виклику, і жодне місце виклику про це не знає.',
    },
    code: 'export const authInterceptor: HttpInterceptorFn = (request, next) => {\n  const token = inject(AuthService).token();\n  if (!token) {\n    return next(request);\n  }\n  // Requests are immutable - clone with the change\n  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));\n};',
  },
  {
    id: 'q-functional-interceptors',
    category: 'http',
    q: {
      en: 'How does a functional interceptor differ from the class-based one it replaced?',
      uk: 'Чим функціональний інтерсептор відрізняється від класового, який він замінив?',
    },
    a: {
      en: 'It is a plain function using inject() instead of a class implementing HttpInterceptor and registered as a multi provider. That removes the boilerplate and the ordering trap of the old array, makes the interceptor tree-shakable, and lets it be composed or parameterised by a factory. Class interceptors still work through withInterceptorsFromDi, which exists for libraries that have not migrated.',
      uk: 'Це звичайна функція, що використовує inject(), замість класу, який реалізує HttpInterceptor і реєструється як multi-провайдер. Це прибирає шаблонний код і пастку з порядком у старому масиві, робить інтерсептор придатним для tree-shaking і дозволяє компонувати чи параметризувати його фабрикою. Класові інтерсептори досі працюють через withInterceptorsFromDi - він існує для бібліотек, які не мігрували.',
    },
    code: '// Then\n@Injectable()\nexport class AuthInterceptor implements HttpInterceptor {\n  intercept(request: HttpRequest<unknown>, next: HttpHandler) { ... }\n}\nproviders: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];\n\n// Now\nprovideHttpClient(withInterceptors([authInterceptor]));\n\n// For a library still on the old API:\nprovideHttpClient(withInterceptorsFromDi());',
  },
  {
    id: 'q-interceptor-order',
    category: 'http',
    q: {
      en: 'In what order do multiple interceptors run for a request and for its response?',
      uk: 'У якому порядку виконуються кілька інтерсепторів для запиту і для відповіді?',
    },
    a: {
      en: 'Requests pass through them in array order, responses come back in reverse - it is a nest of wrappers, not a queue. So the first interceptor sees the request first and the response last. That decides where things belong: logging goes first, so it wraps everything; a caching interceptor goes before the auth one only if you are happy caching without regard to who asked.',
      uk: 'Запити проходять через них у порядку масиву, відповіді повертаються у зворотному: це вкладені обгортки, а не черга. Тож перший інтерсептор бачить запит першим, а відповідь останнім. Це визначає, де що має стояти: логування йде першим, щоб обгортати все; кешувальний інтерсептор стоїть перед автентифікаційним лише якщо тебе влаштовує кеш без огляду на те, хто питав.',
    },
    code: 'withInterceptors([loggingInterceptor, authInterceptor, retryInterceptor]);\n\n// request:  logging -> auth -> retry -> backend\n// response: backend -> retry -> auth -> logging\n//\n// So logging measures the whole thing, retries included.',
  },
  {
    id: 'q-interceptor-use-cases',
    category: 'http',
    q: {
      en: 'What are the classic jobs for an interceptor?',
      uk: 'Які класичні задачі вирішує інтерсептор?',
    },
    a: {
      en: 'Attaching an auth token, prefixing a base URL, adding correlation or locale headers, retrying idempotent failures, mapping errors into a domain type, showing a global loading indicator, caching GETs, and logging timings. What does not belong there is anything specific to one endpoint - an interceptor runs for every request, so a condition on a URL inside one is a sign the logic belonged in the service that owns that call.',
      uk: 'Додавання токена автентифікації, префікс базового URL, кореляційні або локальні заголовки, повтори ідемпотентних збоїв, перетворення помилок у доменний тип, глобальний індикатор завантаження, кешування GET-ів і логування таймінгів. Не належить туди все, що специфічне для одного ендпоінта: інтерсептор виконується для кожного запиту, тож умова за URL усередині нього - ознака того, що логіці місце в сервісі, який володіє цим викликом.',
    },
    code: 'export const baseUrlInterceptor: HttpInterceptorFn = (request, next) =>\n  next(\n    request.url.startsWith("http")\n      ? request\n      : request.clone({ url: `${inject(API_URL)}${request.url}` }),\n  );\n\n// A smell: this belongs in the service that makes that one call\nif (request.url.includes("/api/orders")) { ... }',
  },
  {
    id: 'q-interceptor-token-refresh',
    category: 'http',
    q: {
      en: 'How would you implement token refresh in an interceptor without firing it several times at once?',
      uk: 'Як реалізувати оновлення токена в інтерсепторі, не запускаючи його кілька разів одночасно?',
    },
    a: {
      en: 'Catch the 401, and share one refresh call across every request that hit it - three parallel calls failing at the same moment must produce one refresh, not three. Keep the in-flight refresh in the service as a shared observable, so the second caller subscribes to the same one. Guard against recursion: a 401 from the refresh endpoint itself must sign the user out rather than trigger another refresh.',
      uk: 'Перехопи 401 і поділи один виклик оновлення між усіма запитами, що на нього наткнулися: три паралельні виклики, які впали в один момент, мають дати одне оновлення, а не три. Тримай оновлення, що в польоті, у сервісі як спільний observable, щоб другий викликач підписався на той самий. Захистися від рекурсії: 401 від самого ендпоінта оновлення має виводити користувача з системи, а не запускати ще одне оновлення.',
    },
    code: 'export const refreshInterceptor: HttpInterceptorFn = (request, next) => {\n  const auth = inject(AuthService);\n\n  return next(request).pipe(\n    catchError((error: HttpErrorResponse) => {\n      if (error.status !== 401 || request.url.includes("/auth/refresh")) {\n        return throwError(() => error);       // no recursion\n      }\n      return auth.refreshOnce().pipe(          // shared: one call for all of them\n        switchMap(() => next(request.clone())),\n      );\n    }),\n  );\n};',
  },
  {
    id: 'q-http-progress-events',
    category: 'http',
    q: {
      en: 'How do you track upload or download progress?',
      uk: 'Як відстежувати прогрес завантаження на сервер або з нього?',
    },
    a: {
      en: 'Pass reportProgress: true and observe: "events", then filter the event stream by type. The stream now emits Sent, UploadProgress or DownloadProgress events and finally the Response, so your handler must switch on the event rather than assume a body. Note that progress events are frequent, so updating a signal from each of them is fine but doing real work per event is not.',
      uk: 'Передай reportProgress: true і observe: "events", а далі фільтруй потік подій за типом. Тепер потік емітить події Sent, UploadProgress або DownloadProgress і нарешті Response, тож твій обробник має розрізняти події, а не припускати наявність тіла. Врахуй, що події прогресу часті: оновлювати з них сигнал нормально, а виконувати справжню роботу на кожну - ні.',
    },
    code: 'this.http\n  .post("/api/files", formData, { reportProgress: true, observe: "events" })\n  .subscribe((event) => {\n    if (event.type === HttpEventType.UploadProgress && event.total) {\n      this.progress.set(Math.round((100 * event.loaded) / event.total));\n    }\n    if (event.type === HttpEventType.Response) {\n      this.done.set(true);\n    }\n  });',
  },
  {
    id: 'q-http-caching',
    category: 'http',
    q: {
      en: 'How would you cache GET responses on the client, and how do you invalidate that cache?',
      uk: 'Як кешувати GET-відповіді на клієнті і як інвалідувати цей кеш?',
    },
    a: {
      en: 'Two levels. HTTP caching belongs to the server through Cache-Control and ETag, and costs you nothing. An in-memory cache is for the same data requested repeatedly within a session: a Map of URL to shared observable, keyed by the full URL including params. Invalidation is the hard half - clear the affected keys after any mutating call, or you will show a stale list after a successful create.',
      uk: "Два рівні. HTTP-кешування належить серверу через Cache-Control та ETag і не коштує тобі нічого. Кеш у пам'яті потрібен для тих самих даних, які просять повторно протягом сеансу: Map з URL на спільний observable, з ключем за повним URL разом з параметрами. Складніша половина - інвалідація: очищай зачеплені ключі після будь-якого змінюючого виклику, інакше після успішного створення покажеш застарілий список.",
    },
    code: '@Injectable({ providedIn: "root" })\nexport class UserApi {\n  private readonly cache = new Map<string, Observable<User[]>>();\n\n  list(query: string): Observable<User[]> {\n    const key = `/api/users?${query}`;\n    if (!this.cache.has(key)) {\n      this.cache.set(key, this.http.get<User[]>(key).pipe(shareReplay({ bufferSize: 1, refCount: false })));\n    }\n    return this.cache.get(key)!;\n  }\n\n  create(user: NewUser): Observable<User> {\n    return this.http.post<User>("/api/users", user).pipe(tap(() => this.cache.clear()));\n  }\n}',
  },
  {
    id: 'q-http-resource',
    category: 'http',
    q: {
      en: 'What is httpResource, and how does it change the way a component loads data?',
      uk: 'Що таке httpResource і як він змінює спосіб завантаження даних у компоненті?',
    },
    a: {
      en: 'It is a resource whose loader is an HTTP request: you give it a reactive URL and it re-fetches when the signals it reads change, exposing value, status, error and isLoading as signals. The component stops subscribing, stops holding a loading flag and stops cancelling by hand. It is read-oriented - mutations stay ordinary HttpClient calls - and it is still marked experimental, so pin your expectations accordingly.',
      uk: 'Це resource, чиїм завантажувачем є HTTP-запит: ти даєш йому реактивний URL, і він перезавантажується при зміні сигналів, які прочитав, віддаючи value, status, error та isLoading як сигнали. Компонент перестає підписуватися, тримати прапорець завантаження і скасовувати вручну. Він орієнтований на читання - мутації лишаються звичайними викликами HttpClient - і досі позначений як експериментальний, тож будуй очікування відповідно.',
    },
    code: 'export class UserComponent {\n  readonly id = input.required<string>();\n\n  // Re-fetches whenever id() changes, and cancels the previous request\n  protected readonly user = httpResource<User>(() => `/api/users/${this.id()}`);\n}\n\n@if (user.isLoading()) { <app-spinner /> }\n@else if (user.error()) { <app-error /> }\n@else if (user.value(); as value) { <p>{{ value.name }}</p> }',
  },
  {
    id: 'q-http-testing-controller',
    category: 'http',
    q: {
      en: 'How do you test code that calls HttpClient without hitting the network?',
      uk: 'Як тестувати код, що викликає HttpClient, не звертаючись до мережі?',
    },
    a: {
      en: 'Provide provideHttpClientTesting, which swaps in a backend that records requests instead of sending them. You then expectOne to assert the URL and method, flush a response to drive the code under test, and call verify in afterEach so an unexpected request fails the test. That last step is what makes these tests worth writing - it catches the request you did not mean to send.',
      uk: 'Додай provideHttpClientTesting - він підставляє бекенд, який записує запити замість надсилання. Далі через expectOne перевіряєш URL і метод, через flush віддаєш відповідь, щоб просунути код під тестом, і викликаєш verify в afterEach, щоб неочікуваний запит валив тест. Саме останній крок і робить ці тести вартими написання: він ловить запит, якого ти надсилати не збирався.',
    },
    code: 'let http: HttpTestingController;\n\nbeforeEach(() => {\n  TestBed.configureTestingModule({\n    providers: [provideHttpClient(), provideHttpClientTesting()],\n  });\n  http = TestBed.inject(HttpTestingController);\n});\n\nafterEach(() => http.verify());   // fails on any request you did not expect\n\nit("loads users", () => {\n  service.list().subscribe();\n  const request = http.expectOne("/api/users");\n  expect(request.request.method).toBe("GET");\n  request.flush([{ id: 1, name: "Ada" }]);\n});',
  },
];
