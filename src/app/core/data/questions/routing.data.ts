import { Question } from '../../models/content.model';

// The router: route configuration, params, guards, resolvers and navigation.
export const ROUTING_QUESTIONS: Question[] = [
  {
    id: 'q-router-purpose',
    category: 'routing',
    q: {
      en: 'What does the Angular Router do, and how do you add it to a standalone application?',
      uk: 'Що робить Angular Router і як додати його до standalone-застосунку?',
    },
    a: {
      en: 'It maps the URL onto a tree of components, and makes that mapping the source of truth: the address bar, the back button and a shared link all describe the same state. It also owns navigation as a process - guards, data loading, lazy chunks - so a screen can refuse to appear or wait for what it needs. Add it with provideRouter in the application config.',
      uk: 'Він зіставляє URL з деревом компонентів і робить це зіставлення джерелом істини: адресний рядок, кнопка "назад" і надіслане посилання описують той самий стан. Він також володіє навігацією як процесом - гварди, завантаження даних, ліниві чанки, - тож екран може відмовитися з\'явитися або дочекатися потрібного. Додається через provideRouter у конфігу застосунку.',
    },
    code: 'export const appConfig: ApplicationConfig = {\n  providers: [provideRouter(routes, withComponentInputBinding())],\n};\n\n<!-- app.html: where the matched component is rendered -->\n<router-outlet />',
  },
  {
    id: 'q-defining-routes',
    category: 'routing',
    q: {
      en: 'How do you define routes, and how does the router match a URL against them?',
      uk: 'Як оголошуються маршрути і як роутер зіставляє URL з ними?',
    },
    a: {
      en: 'A route is an object with a path and something to render. Matching is first-match-wins, top to bottom, prefix by default - so a route for an empty path with the prefix strategy matches everything and must carry pathMatch: "full". Order is therefore part of the configuration, not a detail: the wildcard belongs last, and a static segment must come before the parameterised one it would otherwise be swallowed by.',
      uk: 'Маршрут - це об\'єкт зі шляхом і тим, що рендерити. Зіставлення йде згори вниз, перемагає перший збіг, за замовчуванням за префіксом, - тож маршрут з порожнім шляхом при префіксній стратегії збігається з усім і має нести pathMatch: "full". Тому порядок є частиною конфігурації, а не дрібницею: wildcard стоїть останнім, а статичний сегмент має йти перед параметризованим, який інакше його проковтне.',
    },
    code: 'export const routes: Routes = [\n  { path: "", redirectTo: "users", pathMatch: "full" },   // without full: matches all\n  { path: "users/new", component: NewUserComponent },     // before :id, or never hit\n  { path: "users/:id", component: UserComponent },\n  { path: "**", component: NotFoundComponent },           // last, always\n];',
  },
  {
    id: 'q-router-outlet',
    category: 'routing',
    q: {
      en: 'What is router-outlet, and what happens when a route has no outlet to render into?',
      uk: 'Що таке router-outlet і що буде, якщо маршруту немає куди рендеритись?',
    },
    a: {
      en: 'It is the placeholder where the router puts the matched component - as a sibling after the outlet element, not inside it, which is why styling the outlet itself does nothing. A route whose parent has no outlet simply renders nothing: the navigation succeeds, the URL changes, and the screen does not. That is the usual explanation for a blank page after adding child routes without an outlet in the parent template.',
      uk: 'Це місце-заповнювач, куди роутер ставить знайдений компонент - як сусіда після елемента outlet, а не всередину нього, тому стилізувати сам outlet марно. Маршрут, у батька якого немає аутлета, просто не рендерить нічого: навігація вдається, URL змінюється, а екран - ні. Це і є звичне пояснення порожньої сторінки після додавання дочірніх маршрутів без аутлета в батьківському шаблоні.',
    },
    code: '<!-- The matched component becomes a sibling, here: -->\n<router-outlet />\n\n<!-- Child routes need an outlet in the parent template too -->\n<!-- users.html -->\n<h1>Users</h1>\n<router-outlet />   <!-- without this, users/:id renders nothing -->',
  },
  {
    id: 'q-named-outlets',
    category: 'routing',
    q: {
      en: 'What are named outlets, and what is a typical use for one?',
      uk: 'Що таке іменовані аутлети і який у них типовий сценарій використання?',
    },
    a: {
      en: 'Secondary outlets that render alongside the primary one, addressed by name in the URL with a parenthesised segment. The classic use is a panel whose state should be shareable and survive a reload - a details drawer, a modal deep-linked from a notification. The cost is URL complexity, so it is worth it only when that panel genuinely needs its own address.',
      uk: 'Це другорядні аутлети, які рендеряться поруч із головним і адресуються в URL за іменем через сегмент у дужках. Класичне застосування - панель, стан якої має бути придатним для надсилання і переживати перезавантаження: висувна панель деталей, модальне вікно, на яке веде посилання зі сповіщення. Ціна - складність URL, тож воно виправдане лише тоді, коли цій панелі справді потрібна власна адреса.',
    },
    code: '{ path: "preview/:id", component: PreviewComponent, outlet: "aside" }\n\n<router-outlet />\n<router-outlet name="aside" />\n\n<a [routerLink]="[{ outlets: { aside: [\'preview\', id] } }]">Preview</a>\n<!-- URL becomes /users(aside:preview/7) -->',
  },
  {
    id: 'q-child-routes',
    category: 'routing',
    q: {
      en: 'How do child routes work, and what does a componentless route with children give you?',
      uk: 'Як працюють дочірні маршрути і що дає маршрут без компонента з children?',
    },
    a: {
      en: "Children are matched against the remainder of the URL and rendered into the parent's outlet, which is how a layout with a persistent shell works. A route with children but no component adds no markup at all - it exists to group routes so they can share a path prefix, a guard, or a set of providers. That is the cleanest way to protect or scope a whole feature without wrapping it in a component that does nothing.",
      uk: 'Дочірні маршрути зіставляються з рештою URL і рендеряться в аутлет батька - саме так працює розкладка зі сталою оболонкою. Маршрут із children, але без компонента, не додає жодної розмітки: він існує, щоб згрупувати маршрути заради спільного префікса шляху, гварда чи набору провайдерів. Це найчистіший спосіб захистити чи обмежити цілу фічу, не загортаючи її в компонент, який нічого не робить.',
    },
    code: '{\n  path: "admin",\n  canActivate: [adminGuard],      // covers everything below\n  providers: [AdminState],        // scoped to this subtree\n  children: [                     // no component: no extra markup\n    { path: "users", component: AdminUsersComponent },\n    { path: "audit", component: AuditComponent },\n  ],\n}',
  },
  {
    id: 'q-router-link-active',
    category: 'routing',
    q: {
      en: 'What do routerLink and routerLinkActive do, and why is routerLink better than href?',
      uk: 'Що роблять routerLink і routerLinkActive і чому routerLink кращий за href?',
    },
    a: {
      en: 'routerLink navigates within the application, so nothing reloads and the state survives; a plain href asks the browser for a new document and discards everything. It still renders a real href, so middle-click and open-in-new-tab work. routerLinkActive adds a class while the link matches the current URL, with exact matching optional - which is what you need on a parent link that would otherwise stay highlighted for every child route.',
      uk: "routerLink навігує всередині застосунку, тож нічого не перезавантажується і стан зберігається; звичайний href просить у браузера новий документ і викидає все. При цьому справжній href усе одно рендериться, тож клік середньою кнопкою і відкриття в новій вкладці працюють. routerLinkActive додає клас, доки посилання відповідає поточному URL, з необов'язковим точним збігом - а він і потрібен на батьківському посиланні, яке інакше лишалося б підсвіченим для кожного дочірнього маршруту.",
    },
    code: '<a\n  routerLink="/users"\n  routerLinkActive="active"\n  [routerLinkActiveOptions]="{ exact: true }"\n  ariaCurrentWhenActive="page"\n>\n  Users\n</a>\n\n<a [routerLink]="[\'/users\', user.id]" [queryParams]="{ tab: \'orders\' }">Orders</a>',
  },
  {
    id: 'q-route-parameter-types',
    category: 'routing',
    q: {
      en: 'What kinds of route parameters exist, and how does each one appear in the URL?',
      uk: 'Які види параметрів маршруту існують і як кожен з них виглядає в URL?',
    },
    a: {
      en: 'Path parameters are part of the path and identify the resource. Query parameters follow a question mark, are shared across the whole navigation, and suit optional state such as filters or a page number. Matrix parameters attach to one segment and scope to it. The fragment follows a hash. There is also static data and resolved data, which are not in the URL at all - they come from the route configuration.',
      uk: "Параметри шляху є частиною шляху і ідентифікують ресурс. Query-параметри йдуть після знака питання, спільні для всієї навігації й пасують необов'язковому стану на кшталт фільтрів чи номера сторінки. Матричні параметри чіпляються до одного сегмента і обмежені ним. Фрагмент іде після решітки. Є ще статичні data і розв'язані resolve, яких у URL немає взагалі - вони походять з конфігурації маршруту.",
    },
    code: '// /users/7;view=compact?tab=orders#billing\n{ path: "users/:id", component: UserComponent, data: { title: "User" } }\n\nroute.paramMap        // id  -> "7"        path parameter\nroute.queryParamMap   // tab -> "orders"   query parameter\nroute.params          // view -> "compact"  matrix parameter\nroute.fragment        // "billing"\nroute.data            // { title: "User" } plus anything resolved',
  },
  {
    id: 'q-activated-route',
    category: 'routing',
    q: {
      en: 'What does ActivatedRoute expose, and how do you read parameters from it?',
      uk: 'Що надає ActivatedRoute і як зчитувати з нього параметри?',
    },
    a: {
      en: 'Everything the router knows about the route this component was rendered for: parameters, query parameters, the fragment, static and resolved data, and the position in the route tree through parent and children. Each is available both as an observable, which keeps emitting, and as a snapshot, which is one reading taken at activation. Which you take is the whole subtlety of the API.',
      uk: "Усе, що роутер знає про маршрут, для якого відрендерено цей компонент: параметри, query-параметри, фрагмент, статичні й розв'язані дані та позицію в дереві маршрутів через parent і children. Кожне доступне і як observable, який продовжує емітити, і як snapshot - одне зчитування на момент активації. Вибір між ними і є головною тонкістю цього API.",
    },
    code: 'export class UserComponent {\n  private readonly route = inject(ActivatedRoute);\n\n  // Keeps up with navigations within the same route\n  protected readonly userId = toSignal(this.route.paramMap.pipe(map((p) => p.get("id"))));\n\n  // Read once, at activation\n  protected readonly title = this.route.snapshot.data["title"];\n}',
  },
  {
    id: 'q-snapshot-vs-observable-params',
    category: 'routing',
    q: {
      en: 'When does reading route params from the snapshot break, and what do you use instead?',
      uk: 'Коли зчитування параметрів зі snapshot ламається і що використовувати натомість?',
    },
    a: {
      en: 'When you navigate from one instance of a route to another with different parameters - /users/7 to /users/8. The router reuses the component instead of recreating it, so no constructor and no ngOnInit run again, and the snapshot still holds the old id. Subscribe to paramMap, or bind the parameter as an input, and the component follows. The snapshot is safe only where the component can never be reused.',
      uk: "Коли ти навігуєш з одного екземпляра маршруту до іншого з іншими параметрами - з /users/7 до /users/8. Роутер перевикористовує компонент замість того, щоб створити його заново, тож ні конструктор, ні ngOnInit не виконуються вдруге, і snapshot усе ще містить старий id. Підпишися на paramMap або прив'яжи параметр як інпут - і компонент слідуватиме за URL. Snapshot безпечний лише там, де компонент не може бути перевикористаний.",
    },
    code: '// Breaks on /users/7 -> /users/8: the component is reused, this never re-runs\nngOnInit(): void {\n  this.load(this.route.snapshot.paramMap.get("id"));\n}\n\n// Follows every navigation\nprotected readonly user = toSignal(\n  this.route.paramMap.pipe(switchMap((params) => this.users.byId(params.get("id")!))),\n);',
  },
  {
    id: 'q-with-component-input-binding',
    category: 'routing',
    q: {
      en: 'What does withComponentInputBinding do to route parameters?',
      uk: 'Що робить withComponentInputBinding з параметрами маршруту?',
    },
    a: {
      en: 'It binds path parameters, query parameters, the fragment and resolved data straight to component inputs with matching names. The component stops injecting ActivatedRoute entirely, which makes it testable with setInput and reusable outside a route. Because the input is a signal, it also updates when the same component is reused for a different parameter - so the snapshot trap disappears.',
      uk: "Він прив'язує параметри шляху, query-параметри, фрагмент і розв'язані дані просто до інпутів компонента з відповідними іменами. Компонент перестає інжектувати ActivatedRoute узагалі, що робить його тестованим через setInput і придатним до використання поза маршрутом. Оскільки інпут є сигналом, він також оновлюється, коли той самий компонент перевикористано для іншого параметра, - тож пастка зі snapshot зникає.",
    },
    code: 'provideRouter(routes, withComponentInputBinding());\n\n{ path: "users/:id", component: UserComponent }\n\nexport class UserComponent {\n  readonly id = input.required<string>();          // from the path\n  readonly tab = input("details");                  // from ?tab=\n\n  protected readonly user = computed(() => this.users.byId(this.id()));\n}',
  },
  {
    id: 'q-router-state',
    category: 'routing',
    q: {
      en: 'What is router state, and how does it relate to the tree of activated routes?',
      uk: "Що таке стан роутера і як він пов'язаний з деревом активованих маршрутів?",
    },
    a: {
      en: "Router state is the tree of ActivatedRoutes for the current URL - one node per matched segment, from the root down to the leaf. It exists because a URL activates a path through the configuration, not a single route: a layout, a section and a detail view are all active at once, each with its own parameters and data. Walking it is how you collect something from every level, such as a page title assembled from each route's data.",
      uk: 'Стан роутера - це дерево ActivatedRoute для поточного URL: по вузлу на кожен збіглий сегмент, від кореня до листка. Воно існує тому, що URL активує шлях крізь конфігурацію, а не один маршрут: розкладка, розділ і сторінка деталей активні одночасно, кожен зі своїми параметрами й даними. Обхід цього дерева - спосіб зібрати щось з усіх рівнів, наприклад заголовок сторінки з data кожного маршруту.',
    },
    code: 'const state = inject(Router).routerState;\n\nlet route = state.root;\nconst crumbs: string[] = [];\nwhile (route.firstChild) {\n  route = route.firstChild;\n  const label = route.snapshot.data["breadcrumb"];\n  if (label) {\n    crumbs.push(label);\n  }\n}',
  },
  {
    id: 'q-router-events',
    category: 'routing',
    q: {
      en: 'Which router events fire during a navigation, and what would you use them for?',
      uk: 'Які події роутера відбуваються під час навігації і для чого їх використовують?',
    },
    a: {
      en: 'NavigationStart, then guard and resolve phases, then NavigationEnd, or NavigationCancel when a guard rejects and NavigationError when something throws. Filter the stream by event type - a global loading bar keys off Start and End, analytics off End, and NavigationCancel is where you find out why a guard sent someone away. The events also include the lazy-loading milestones, which is useful when a chunk is slow.',
      uk: 'NavigationStart, далі фази гвардів і резолверів, потім NavigationEnd або NavigationCancel, коли гвард відхиляє, і NavigationError, коли щось кидає помилку. Фільтруй потік за типом події: глобальний індикатор завантаження працює від Start і End, аналітика - від End, а NavigationCancel показує, чому гвард когось відвернув. Серед подій є й віхи лінивого завантаження - корисно, коли чанк повільний.',
    },
    code: 'inject(Router)\n  .events.pipe(\n    filter((event) => event instanceof NavigationEnd),\n    takeUntilDestroyed(),\n  )\n  .subscribe((event) => this.analytics.pageView(event.urlAfterRedirects));\n\n// NavigationCancel carries the reason a guard turned the navigation away.',
  },
  {
    id: 'q-detect-route-change',
    category: 'routing',
    q: {
      en: 'How do you react to a route change inside a component that stays mounted?',
      uk: 'Як реагувати на зміну маршруту всередині компонента, який лишається змонтованим?',
    },
    a: {
      en: "Through the observables on ActivatedRoute, or by taking the parameter as a bound input - both keep emitting while the component lives. Lifecycle hooks will not help, because the component is not recreated. If you genuinely want a fresh instance per parameter, set the route's runGuardsAndResolvers or provide a custom RouteReuseStrategy, but reacting is nearly always cheaper than recreating.",
      uk: "Через observable-и на ActivatedRoute або взявши параметр як прив'язаний інпут - обидва продовжують емітити, доки компонент живий. Хуки життєвого циклу не допоможуть, бо компонент не створюється заново. Якщо ж тобі справді потрібен новий екземпляр на кожен параметр, налаштуй runGuardsAndResolvers маршруту або дай власну RouteReuseStrategy, але реагувати майже завжди дешевше, ніж перестворювати.",
    },
    code: 'export class UserComponent {\n  readonly id = input.required<string>();   // rebinds on every navigation\n\n  constructor() {\n    effect(() => {\n      const id = this.id();\n      untracked(() => this.load(id));       // reacts without recreating anything\n    });\n  }\n}',
  },
  {
    id: 'q-current-route',
    category: 'routing',
    q: {
      en: 'How do you get the current URL, and how does that differ from the current route?',
      uk: 'Як отримати поточний URL і чим це відрізняється від поточного маршруту?',
    },
    a: {
      en: 'Router.url is the URL as a string, after redirects. The current route is the ActivatedRoute tree, which is the structured version: which configuration matched, with which parameters and data. Compare strings only for display or logging - branching on a URL substring reimplements the matcher badly, and breaks the first time a path changes.',
      uk: 'Router.url - це URL рядком, уже після редиректів. Поточний маршрут - це дерево ActivatedRoute, тобто структурована версія: яка саме конфігурація збіглася, з якими параметрами й даними. Порівнюй рядки лише для показу чи логування: розгалуження за підрядком URL - це погана самописна реалізація матчера, яка ламається при першій же зміні шляху.',
    },
    code: 'const router = inject(Router);\n\nrouter.url;                              // "/users/7?tab=orders" - a string\nrouter.routerState.snapshot.root;        // the structured tree\n\n// Fragile: reimplements matching, and breaks when the path changes\nif (router.url.includes("/admin")) { }\n\n// Robust: ask the route\nif (route.snapshot.data["requiresAdmin"]) { }',
  },
  {
    id: 'q-wildcard-and-redirect-routes',
    category: 'routing',
    q: {
      en: 'What do the wildcard route and redirectTo do, and why does order matter?',
      uk: 'Що роблять wildcard-маршрут і redirectTo і чому важливий їхній порядок?',
    },
    a: {
      en: 'The wildcard path matches anything, so it is the not-found page and must be last - placed earlier it swallows every route below it. redirectTo rewrites the URL and starts matching again, and an empty path with the default prefix strategy matches every URL, so it needs pathMatch: "full". Those two rules account for most of the router configurations that mysteriously always land on the same page.',
      uk: 'Шлях wildcard збігається з будь-чим, тож він є сторінкою "не знайдено" і має стояти останнім: розміщений раніше, він проковтне всі маршрути під собою. redirectTo переписує URL і починає зіставлення заново, а порожній шлях при типовій префіксній стратегії збігається з кожним URL, тож потребує pathMatch: "full". Ці два правила пояснюють більшість конфігурацій роутера, які загадковим чином завжди опиняються на одній сторінці.',
    },
    code: 'export const routes: Routes = [\n  { path: "", redirectTo: "dashboard", pathMatch: "full" },\n  { path: "dashboard", component: DashboardComponent },\n  { path: "**", component: NotFoundComponent },   // last\n];\n\n// Without pathMatch: "full", the empty path matches "/dashboard" too,\n// and the redirect loops.',
  },
  {
    id: 'q-route-guards',
    category: 'routing',
    q: {
      en: 'Which guards can a route declare, and when does each one run?',
      uk: 'Які гварди може оголосити маршрут і коли кожен з них виконується?',
    },
    a: {
      en: 'canActivate before entering a route, canActivateChild before any of its children, canDeactivate before leaving, canMatch before the route is even considered, and canLoad in its deprecated form. canMatch is the interesting one: it runs during matching, so a rejected route is skipped and the router keeps looking, which lets two routes share a path and differ by role. Any of them may return true, false, or a UrlTree to redirect.',
      uk: 'canActivate перед входом у маршрут, canActivateChild перед будь-яким з його дітей, canDeactivate перед виходом, canMatch ще до того, як маршрут узагалі розглянуто, і canLoad у застарілій формі. Найцікавіший - canMatch: він виконується під час зіставлення, тож відхилений маршрут пропускається і роутер шукає далі, а отже два маршрути можуть мати спільний шлях і різнитися за роллю. Будь-який з них може повернути true, false або UrlTree для редиректу.',
    },
    code: '// canMatch lets two routes share one path\n{ path: "reports", canMatch: [isAdmin], component: AdminReportsComponent },\n{ path: "reports", component: BasicReportsComponent },   // reached if not admin\n\nexport const isAdmin: CanMatchFn = () => inject(AuthService).role() === "admin";\n\nexport const authGuard: CanActivateFn = () =>\n  inject(AuthService).isSignedIn() || inject(Router).parseUrl("/login");',
  },
  {
    id: 'q-functional-guards',
    category: 'routing',
    q: {
      en: 'Why did class-based guards give way to functional guards?',
      uk: 'Чому класові гварди поступилися місцем функціональним?',
    },
    a: {
      en: 'Because a guard is a function - wrapping it in a class with one method added an injectable, a provider and a file for nothing. A function uses inject() for what it needs, composes with other functions, and can be produced by a factory so one implementation covers many parameterised cases. Class guards were deprecated in v15 and removed later.',
      uk: 'Бо гвард - це функція: загортання її в клас з одним методом додавало інжектований сервіс, провайдер і файл ні за що. Функція бере потрібне через inject(), компонується з іншими функціями і може створюватися фабрикою, тож одна реалізація покриває багато параметризованих випадків. Класові гварди оголосили застарілими у v15 і згодом прибрали.',
    },
    code: '// Then: a class, a provider, an interface\n@Injectable({ providedIn: "root" })\nexport class AuthGuard implements CanActivate {\n  canActivate(): boolean { return this.auth.isSignedIn(); }\n}\n\n// Now: a function, and a factory for the parameterised case\nexport const requireRole =\n  (role: Role): CanActivateFn =>\n  () =>\n    inject(AuthService).hasRole(role) || inject(Router).parseUrl("/denied");\n\n{ path: "admin", canActivate: [requireRole("admin")], component: AdminComponent }',
  },
  {
    id: 'q-can-deactivate-unsaved-changes',
    category: 'routing',
    q: {
      en: 'How would you stop a user from leaving a form with unsaved changes?',
      uk: 'Як не дати користувачу піти з форми, у якій є незбережені зміни?',
    },
    a: {
      en: "A canDeactivate guard, which receives the component instance and can ask it whether it is dirty. Keep the decision in the component and the prompt in the guard - a guard that reaches into a form's internals only works for that one form. This covers in-app navigation only; a page reload or a closed tab needs the browser beforeunload event as well.",
      uk: 'Гвардом canDeactivate, який отримує екземпляр компонента і може спитати в нього, чи є незбережені зміни. Тримай рішення в компоненті, а запит користувачу - у гварді: гвард, що лізе у нутрощі конкретної форми, працюватиме лише для неї. Це покриває навігацію всередині застосунку; перезавантаження сторінки чи закриття вкладки потребує ще й браузерної події beforeunload.',
    },
    code: 'export interface CanLeave {\n  hasUnsavedChanges(): boolean;\n}\n\nexport const confirmLeave: CanDeactivateFn<CanLeave> = (component) =>\n  !component.hasUnsavedChanges() || confirm("Discard your changes?");\n\n{ path: "edit", component: EditComponent, canDeactivate: [confirmLeave] }\n\n// A closed tab is the browser\'s business, not the router\'s:\n// host: { "(window:beforeunload)": "onUnload($event)" }',
  },
  {
    id: 'q-resolvers',
    category: 'routing',
    q: {
      en: 'What is a resolver, and what is the trade-off of loading data before navigation completes?',
      uk: 'Що таке resolver і в чому компроміс завантаження даних до завершення навігації?',
    },
    a: {
      en: 'A function that fetches data during navigation and hands it to the component through route data, so the component renders with everything already present and needs no loading state. The trade-off is that nothing happens on screen until it finishes - the user stays on the old page, seemingly on an unresponsive click. It suits fast, essential data; for anything slow, navigate immediately and load inside the component.',
      uk: 'Це функція, яка завантажує дані під час навігації і передає їх компоненту через route data, тож компонент рендериться, коли все вже на місці, і стан завантаження йому не потрібен. Компроміс у тому, що до завершення на екрані не відбувається нічого: користувач лишається на старій сторінці, ніби клік не спрацював. Це пасує швидким і необхідним даним; для повільних - навігуй одразу і завантажуй усередині компонента.',
    },
    code: 'export const userResolver: ResolveFn<User> = (route) =>\n  inject(UserService).byId(route.paramMap.get("id")!);\n\n{ path: "users/:id", component: UserComponent, resolve: { user: userResolver } }\n\n// With withComponentInputBinding the resolved key arrives as an input:\nreadonly user = input.required<User>();',
  },
  {
    id: 'q-lazy-loading-routes',
    category: 'routing',
    q: {
      en: 'How do you lazy load a route with loadComponent and loadChildren?',
      uk: 'Як зробити маршрут лінивим за допомогою loadComponent і loadChildren?',
    },
    a: {
      en: 'Both take a function returning a dynamic import, which is what makes the bundler emit a separate chunk. loadComponent defers one standalone component; loadChildren defers a whole route file with its children. The rule that decides whether it works: the import must be inside the function. A static import of the same symbol anywhere in the file pulls the code back into the main bundle, silently.',
      uk: 'Обидва приймають функцію, що повертає динамічний імпорт, - саме це змушує бандлер створити окремий чанк. loadComponent відкладає один standalone-компонент, loadChildren - цілий файл маршрутів з його дітьми. Правило, від якого залежить, чи спрацює це: імпорт має бути всередині функції. Статичний імпорт того самого символу будь-де у файлі тихо повертає код у головний бандл.',
    },
    code: '{\n  path: "reports",\n  loadComponent: () => import("./reports/reports").then((m) => m.ReportsComponent),\n},\n{\n  path: "admin",\n  loadChildren: () => import("./admin/admin.routes").then((m) => m.ADMIN_ROUTES),\n}\n\n// This one line puts ReportsComponent back in the main bundle:\n// import { ReportsComponent } from "./reports/reports";',
  },
  {
    id: 'q-preloading-strategies',
    category: 'routing',
    q: {
      en: 'What preloading strategies does the router offer, and when is a custom one worth it?',
      uk: 'Які стратегії передзавантаження пропонує роутер і коли варта зусиль власна?',
    },
    a: {
      en: 'None by default, or PreloadAllModules, which fetches every lazy chunk once the application is idle - fast navigation afterwards, at the cost of bandwidth the user may never need. A custom strategy is worth writing when the application is large and only some routes are likely: mark them in route data and preload those. On a slow connection, preloading everything is worse than not preloading at all.',
      uk: "За замовчуванням жодної, або PreloadAllModules, яка тягне всі ліниві чанки, щойно застосунок простоює: далі навігація швидка, ціною трафіку, який користувачу може й не знадобитися. Власну стратегію варто писати, коли застосунок великий і ймовірні лише деякі маршрути: познач їх у route data і передзавантажуй саме їх. На повільному з'єднанні передзавантаження всього гірше, ніж жодного.",
    },
    code: 'provideRouter(routes, withPreloading(PreloadAllModules));\n\n@Injectable({ providedIn: "root" })\nexport class LikelyRoutesPreloader implements PreloadingStrategy {\n  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {\n    return route.data?.["preload"] ? load() : of(null);\n  }\n}\n\n{ path: "reports", data: { preload: true }, loadComponent: () => ... }',
  },
  {
    id: 'q-base-href',
    category: 'routing',
    q: {
      en: 'What is the base href tag for, and what breaks when it is wrong?',
      uk: 'Для чого потрібен тег base href і що ламається, коли він неправильний?',
    },
    a: {
      en: 'It tells the router and the browser what the application root is, so relative URLs and generated links resolve correctly. Deploy to a subdirectory with base href still "/" and the first navigation works while a reload returns a 404, because the server is asked for a path that does not exist. Set it at build time with --base-href rather than editing index.html by hand.',
      uk: 'Він каже роутеру і браузеру, що є коренем застосунку, щоб відносні URL і згенеровані посилання розв\'язувалися правильно. Задеплой у підкаталог з base href, який лишився "/", - і перша навігація спрацює, а перезавантаження поверне 404, бо в сервера просять шлях, якого немає. Задавай його під час збірки через --base-href, а не редагуванням index.html руками.',
    },
    code: '<!-- index.html, when the app lives at example.com/app/ -->\n<base href="/app/" />\n\n# Set it per environment instead of editing the file:\nng build --base-href=/app/\n\n# Or provide it directly:\nproviders: [{ provide: APP_BASE_HREF, useValue: "/app/" }]',
  },
  {
    id: 'q-hash-vs-path-location',
    category: 'routing',
    q: {
      en: 'What is the difference between the path and hash location strategies, and what does each demand from the server?',
      uk: 'Яка різниця між path- і hash-стратегіями розташування і чого кожна вимагає від сервера?',
    },
    a: {
      en: 'Path style produces clean URLs and requires the server to return index.html for any unknown path, because a reload asks it for a route that has no file. Hash style puts everything after a hash, which the browser never sends to the server, so it works on static hosting with no configuration - at the cost of uglier URLs and a fragment you can no longer use for anchors. Default to path style and configure the fallback.',
      uk: 'Path-стиль дає чисті URL і вимагає, щоб сервер повертав index.html на будь-який невідомий шлях, бо перезавантаження просить у нього маршрут, якому не відповідає жоден файл. Hash-стиль кладе все після решітки, яку браузер серверу не надсилає, тож він працює на статичному хостингу без налаштувань - ціною негарних URL і фрагмента, який більше не використаєш для якорів. Типово бери path-стиль і налаштуй фолбек.',
    },
    code: '// Hash style: /#/users/7 - no server configuration at all\nprovideRouter(routes, withHashLocation());\n\n# Path style: /users/7 - the server must fall back to index.html\n# nginx:\nlocation / {\n  try_files $uri $uri/ /index.html;\n}',
  },
  {
    id: 'q-router-scroll-and-focus',
    category: 'routing',
    q: {
      en: 'How do you restore scroll position and move focus correctly after a navigation?',
      uk: 'Як відновити позицію прокрутки і коректно перемістити фокус після навігації?',
    },
    a: {
      en: 'Scrolling is configuration: withInMemoryScrolling restores the position on a back navigation and scrolls to the top otherwise, and handles fragment anchors. Focus is not handled for you, and this is the accessibility bug most applications ship - after a route change, focus stays on the link that was clicked, so a screen reader announces nothing and keyboard tabbing resumes in the wrong place. Move focus to the new page heading yourself.',
      uk: 'Прокрутка - це налаштування: withInMemoryScrolling відновлює позицію при навігації назад, інакше прокручує вгору, і обробляє якорі-фрагменти. Фокус же не обробляється автоматично, і це саме той баг доступності, який везуть у продакшен більшість застосунків: після зміни маршруту фокус лишається на натиснутому посиланні, тож екранний читач не оголошує нічого, а обхід табом продовжується не там. Переміщуй фокус на заголовок нової сторінки сам.',
    },
    code: 'provideRouter(\n  routes,\n  withInMemoryScrolling({ scrollPositionRestoration: "enabled", anchorScrolling: "enabled" }),\n);\n\n<!-- On the new page: a focusable heading, focused after render -->\n<h1 #heading tabindex="-1">{{ title() }}</h1>\n\nconstructor() {\n  afterNextRender(() => this.heading().nativeElement.focus());\n}',
  },
];
