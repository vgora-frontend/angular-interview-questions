import { Question } from '../../models/content.model';

// What Angular is, how an application is put together, and the ecosystem around it.
export const BASICS_QUESTIONS: Question[] = [
  {
    id: 'q-what-is-angular',
    category: 'basics',
    q: {
      en: 'What is Angular, and which problems does it set out to solve?',
      uk: 'Що таке Angular і які задачі він покликаний вирішувати?',
    },
    a: {
      en: 'Angular is a full framework rather than a view library: components, dependency injection, a router, forms, an HTTP client, a test setup and a build pipeline ship together and are versioned as one. That is the whole point. A team does not assemble a stack out of a dozen packages and then own the integration for the next five years - upgrades are one command, and the framework rewrites your code through migration schematics. The cost is a larger API surface to learn up front.',
      uk: 'Angular - це повноцінний фреймворк, а не бібліотека для представлення: компоненти, впровадження залежностей, роутер, форми, HTTP-клієнт, налаштування тестів і конвеєр збірки постачаються разом і версіонуються як одне ціле. У цьому й суть. Команді не треба збирати стек з десятка пакетів, а потім роками підтримувати їхню сумісність - оновлення виконується однією командою, а фреймворк сам переписує твій код через схематики міграції. Ціна - більший обсяг API, який треба вивчити на старті.',
    },
    code: 'ng new my-app          # router, tests, TypeScript, build pipeline: all in\nng generate component user-card\nng serve\n\n# a year later, the same one command moves you a major version forward\nng update @angular/core @angular/cli',
  },
  {
    id: 'q-angularjs-vs-angular',
    category: 'basics',
    q: {
      en: 'How does Angular differ from AngularJS?',
      uk: 'Чим Angular відрізняється від AngularJS?',
    },
    a: {
      en: 'They share a name and nothing else. AngularJS (1.x) was built on $scope, a digest cycle that dirty-checked every watcher until the model settled, controllers, and two-way binding by default. Angular (2 and up) is a rewrite in TypeScript: a component tree with one-way data flow, dependency injection keyed by class type, ahead-of-time compilation, and now signals. There is no upgrade path in the ordinary sense - you migrate, you do not update. AngularJS reached end of life at the start of 2022.',
      uk: "У них спільна лише назва. AngularJS (1.x) стояв на $scope, циклі digest, який брудною перевіркою обходив усі watcher-и, доки модель не стабілізується, на контролерах і двосторонній прив'язці за замовчуванням. Angular (2 і далі) - це переписування на TypeScript: дерево компонентів з одностороннім потоком даних, впровадження залежностей за типом класу, компіляція ahead-of-time, а тепер ще й сигнали. Шляху оновлення у звичному сенсі немає - тут мігрують, а не оновлюються. Підтримка AngularJS завершилася на початку 2022 року.",
    },
    code: '// AngularJS: the model hangs off a scope, and a digest loop finds the change\napp.controller("UserCtrl", function ($scope) {\n  $scope.name = "Ada";\n});\n\n// Angular: state is a signal on the class, and only its readers re-render\n@Component({ selector: "app-user", templateUrl: "./user.html" })\nexport class UserComponent {\n  readonly name = signal("Ada");\n}',
  },
  {
    id: 'q-angular-vs-react',
    category: 'basics',
    q: {
      en: 'How would you position Angular against React or Vue when picking a stack?',
      uk: 'Як би ти порівняв Angular з React чи Vue під час вибору стека?',
    },
    a: {
      en: 'Angular hands you decisions already made - routing, forms, HTTP, DI, testing - so code written by four teams still looks like one codebase, and the framework owns the upgrade path. React and Vue give you a small core and let you choose the router, the data layer and the build yourself, which is faster to start and cheaper to shape, but those choices become yours to maintain. Rule of thumb: Angular suits long-lived products with several teams and high turnover; React suits a stack you want to design yourself.',
      uk: 'Angular віддає тобі вже ухвалені рішення - роутинг, форми, HTTP, DI, тестування - тож код, написаний чотирма командами, усе одно виглядає як одна кодова база, а фреймворк бере на себе шлях оновлення. React і Vue дають невелике ядро і дозволяють самому обрати роутер, шар даних і збірку: почати швидше й гнучкіше, але ці рішення стають твоїми на підтримку. Емпіричне правило: Angular пасує довгограючим продуктам з кількома командами і плинністю людей; React - стеку, який ти хочеш спроєктувати сам.',
    },
    code: "// Angular: the router, the form layer and the client are the framework's\nbootstrapApplication(App, {\n  providers: [provideRouter(routes), provideHttpClient()],\n});\n\n// React: the same three decisions are yours, and so are their upgrades\n// npm i react-router-dom @tanstack/react-query react-hook-form",
  },
  {
    id: 'q-why-typescript',
    category: 'basics',
    q: {
      en: 'Why is Angular built on TypeScript, and what does that buy a team?',
      uk: 'Чому Angular побудований на TypeScript і що це дає команді?',
    },
    a: {
      en: 'Angular does not merely tolerate TypeScript, it depends on it: the injector resolves a dependency by its class type, and the compiler type-checks templates against the component class. With strictTemplates on, binding a string where a number is expected, or calling a method that no longer exists, fails the build instead of the browser. You also get autocomplete and rename-refactoring inside the HTML, which is the part most frameworks leave untyped.',
      uk: "Angular не просто терпить TypeScript - він на ньому тримається: інжектор розв'язує залежність за типом класу, а компілятор перевіряє типи в шаблонах щодо класу компонента. З увімкненим strictTemplates прив'язка рядка там, де очікується число, або виклик методу, якого вже немає, ламає збірку, а не браузер. На додачу ти отримуєш автодоповнення і безпечне перейменування прямо в HTML - тобто саме там, де більшість фреймворків лишає код без типів.",
    },
    code: '@Component({ selector: "app-badge", templateUrl: "./badge.html" })\nexport class BadgeComponent {\n  readonly count = input.required<number>();\n}\n\n<!-- badge.html is checked against the class above -->\n<app-badge [count]="7" />        <!-- ok -->\n<app-badge [count]="\'seven\'" />  <!-- NG9: type string is not assignable to number -->',
  },
  {
    id: 'q-angular-building-blocks',
    category: 'basics',
    q: {
      en: 'What are the main building blocks of an Angular application?',
      uk: 'З яких основних будівельних блоків складається застосунок на Angular?',
    },
    a: {
      en: 'Components, each pairing a class with a template and owning a piece of the screen; directives, which add behaviour to an existing element; pipes, which format a value for display; services, which hold logic and state that outlive any one component; dependency injection, which wires services into whoever asks for them; and the router, which maps a URL onto a component tree. Everything else - forms, HTTP, animations - is a library built on those six.',
      uk: 'Компоненти, кожен з яких поєднує клас із шаблоном і володіє частиною екрана; директиви, що додають поведінку до наявного елемента; пайпи, що форматують значення для показу; сервіси, які тримають логіку і стан, що переживають окремий компонент; впровадження залежностей, яке підставляє сервіси тим, хто їх просить; і роутер, що зіставляє URL з деревом компонентів. Усе решта - форми, HTTP, анімації - це бібліотеки, побудовані на цих шести.',
    },
    code: '@Injectable({ providedIn: "root" })   // service, wired by DI\nexport class CartService {\n  readonly items = signal<Item[]>([]);\n}\n\n@Component({ selector: "app-cart", templateUrl: "./cart.html" })\nexport class CartComponent {           // component: class plus template\n  private readonly cart = inject(CartService);\n  protected readonly items = this.cart.items;\n}\n\nexport const routes: Routes = [        // router: URL to component\n  { path: "cart", component: CartComponent },\n];',
  },
  {
    id: 'q-component-basics',
    category: 'basics',
    q: {
      en: 'What is a component, and what does the @Component decorator configure?',
      uk: 'Що таке компонент і що саме налаштовує декоратор @Component?',
    },
    a: {
      en: 'A component is a class that owns a template and the state that template renders. The decorator tells the compiler how to build it: selector is the tag it answers to, templateUrl and styleUrl point at its markup and styles, imports lists the other components, directives and pipes its template may use, host declares bindings on its own element, and changeDetection picks how aggressively Angular re-checks it. The class itself stays a plain class - the decorator is only metadata.',
      uk: "Компонент - це клас, який володіє шаблоном і станом, що цей шаблон рендерить. Декоратор каже компілятору, як його зібрати: selector - тег, на який компонент відгукується, templateUrl і styleUrl вказують на розмітку та стилі, imports перелічує інші компоненти, директиви й пайпи, доступні шаблону, host оголошує прив'язки на власному елементі, а changeDetection обирає, наскільки наполегливо Angular його перевірятиме. Сам клас лишається звичайним класом - декоратор це лише метадані.",
    },
    code: '@Component({\n  selector: "app-user-card",\n  templateUrl: "./user-card.html",\n  styleUrl: "./user-card.scss",\n  imports: [DatePipe],\n  host: { class: "card", "[class.compact]": "compact()" },\n  changeDetection: ChangeDetectionStrategy.OnPush,\n})\nexport class UserCardComponent {\n  readonly user = input.required<User>();\n  readonly compact = input(false);\n}',
  },
  {
    id: 'q-template-basics',
    category: 'basics',
    q: {
      en: 'What is a template, and how does it relate to the component class?',
      uk: "Що таке шаблон і як він пов'язаний з класом компонента?",
    },
    a: {
      en: 'A template is HTML plus Angular syntax, and it is compiled - not interpreted at runtime - into instructions that create and update DOM. Its scope is the component instance: an expression in the template can read anything on the class, and nothing else. That is why the compiler can type-check it, and why a template cannot reach for globals like window or new Date() unless the class exposes them.',
      uk: 'Шаблон - це HTML плюс синтаксис Angular, і він компілюється, а не інтерпретується під час виконання, у набір інструкцій, що створюють і оновлюють DOM. Його область видимості - екземпляр компонента: вираз у шаблоні може читати що завгодно з класу і нічого поза ним. Саме тому компілятор може перевіряти його типи, і саме тому шаблон не дістане глобальних значень на кшталт window чи new Date(), якщо клас їх не надасть.',
    },
    code: '// clock.ts - the template can only see what lives here\nexport class ClockComponent {\n  protected readonly now = signal(new Date());\n}\n\n<!-- clock.html -->\n<p>{{ now() | date: "HH:mm" }}</p>\n<p>{{ new Date() }}</p>   <!-- error: "new" is not valid template syntax -->',
  },
  {
    id: 'q-metadata-decorators',
    category: 'basics',
    q: {
      en: 'What is metadata in Angular, and how do decorators supply it?',
      uk: 'Що таке метадані в Angular і як декоратори їх надають?',
    },
    a: {
      en: 'Metadata is the description Angular needs about a class that the class itself cannot express: which tag renders it, which template belongs to it, which dependencies it takes. Decorators are the syntax for attaching it. They are not runtime behaviour - the Angular compiler reads them at build time and emits static definitions, which is why an AOT build can drop the decorator altogether and why metadata has to be statically analysable rather than computed.',
      uk: 'Метадані - це опис класу, потрібний Angular, але який сам клас висловити не може: який тег його рендерить, який шаблон йому належить, які залежності він приймає. Декоратори - це синтаксис, щоб цей опис прикріпити. Вони не є поведінкою під час виконання: компілятор Angular читає їх під час збірки і генерує статичні визначення - саме тому AOT-збірка може взагалі прибрати декоратор, і саме тому метадані мають бути статично аналізованими, а не обчисленими.',
    },
    code: '@Component({ selector: "app-ok", templateUrl: "./ok.html" })\nexport class OkComponent {}\n\n// Not allowed: the compiler has to read this at build time,\n// and it cannot run your function to find out what the selector is.\nconst tag = makeSelector();\n@Component({ selector: tag, templateUrl: "./bad.html" })\nexport class BadComponent {}',
  },
  {
    id: 'q-service-basics',
    category: 'basics',
    q: {
      en: 'What is a service, and how do you decide that logic belongs in one?',
      uk: 'Що таке сервіс і як зрозуміти, що логіка має жити саме в ньому?',
    },
    a: {
      en: 'A service is an ordinary class, registered with the injector, that holds work not tied to one screen: talking to a backend, caching, business rules, state shared between components. The test is lifetime and ownership. If two components need the same answer, or the logic should survive a route change, or you want to unit-test it without rendering anything, it is a service. If it only exists to arrange one template, leave it in the component.',
      uk: "Сервіс - це звичайний клас, зареєстрований в інжекторі, який тримає роботу, не прив'язану до одного екрана: спілкування з бекендом, кешування, бізнес-правила, стан, спільний для кількох компонентів. Критерій - час життя і власність. Якщо двом компонентам потрібна та сама відповідь, або логіка має пережити зміну маршруту, або ти хочеш тестувати її без рендерингу - це сервіс. Якщо ж вона існує лише щоб облаштувати один шаблон, лиши її в компоненті.",
    },
    code: '@Injectable({ providedIn: "root" })\nexport class AuthService {\n  private readonly http = inject(HttpClient);\n  private readonly currentUser = signal<User | null>(null);\n\n  readonly user = this.currentUser.asReadonly();   // shared, outlives any screen\n\n  signIn(credentials: Credentials): Observable<User> {\n    return this.http\n      .post<User>("/api/login", credentials)\n      .pipe(tap((user) => this.currentUser.set(user)));\n  }\n}',
  },
  {
    id: 'q-standalone-component-intro',
    category: 'basics',
    q: {
      en: 'What is a standalone component, and why did it replace NgModules as the default?',
      uk: 'Що таке standalone-компонент і чому він став типовим замість NgModules?',
    },
    a: {
      en: 'A standalone component declares its own dependencies in imports instead of being declared by an NgModule. That removes a whole indirection: what a template can use is written on the component, so it is obvious from the file you are reading and the bundler can see it too. NgModules also made it easy to over-import - one module pulled in another and everything it re-exported. Since v19 standalone is the default, and you should not write standalone: true any more.',
      uk: 'Standalone-компонент оголошує власні залежності в imports замість того, щоб бути оголошеним в NgModule. Це прибирає цілий рівень непрямості: те, що доступне шаблону, записано на самому компоненті, тож видно з файлу, який ти читаєш, і бандлер це теж бачить. NgModule до того ж легко провокував зайві імпорти - один модуль тягнув інший з усім, що той реекспортував. Починаючи з v19 standalone є типовим, і писати standalone: true більше не треба.',
    },
    code: '@Component({\n  selector: "app-invoice",\n  templateUrl: "./invoice.html",\n  imports: [CurrencyPipe, RouterLink],   // exactly what the template uses\n})\nexport class InvoiceComponent {}\n\n// standalone: true is the default since v19 - setting it is noise, not config.',
  },
  {
    id: 'q-ngmodule-legacy',
    category: 'basics',
    q: {
      en: 'What is an NgModule, and where would you still run into one today?',
      uk: 'Що таке NgModule і де його ще можна зустріти сьогодні?',
    },
    a: {
      en: 'An NgModule is a container that declares components, directives and pipes, imports other modules, exports part of that surface, and can register providers. It was the unit of compilation before standalone. You still meet one in an application older than v14, in third-party libraries that have not migrated, and in the odd module a library ships purely to group providers. A standalone component can import an NgModule, so the two coexist during a migration.',
      uk: 'NgModule - це контейнер, який оголошує компоненти, директиви й пайпи, імпортує інші модулі, експортує частину цієї поверхні та може реєструвати провайдери. До появи standalone саме він був одиницею компіляції. Його ще можна зустріти в застосунку, старшому за v14, у сторонніх бібліотеках, які не мігрували, і в поодиноких модулях, що їх бібліотека постачає суто для групування провайдерів. Standalone-компонент може імпортувати NgModule, тож під час міграції вони співіснують.',
    },
    code: '@NgModule({\n  declarations: [LegacyWidgetComponent],   // owned by this module\n  imports: [CommonModule],\n  exports: [LegacyWidgetComponent],        // visible to whoever imports it\n})\nexport class LegacyWidgetModule {}\n\n// A standalone component can still pull it in during a migration:\n@Component({ selector: "app-page", templateUrl: "./page.html", imports: [LegacyWidgetModule] })\nexport class PageComponent {}',
  },
  {
    id: 'q-migrate-ngmodule-standalone',
    category: 'basics',
    q: {
      en: 'How would you migrate an NgModule-based application to standalone components?',
      uk: 'Як мігрувати застосунок на NgModule до standalone-компонентів?',
    },
    a: {
      en: 'Run the official schematic, which does it in three passes you apply in order: convert declarations to standalone, then remove the now-empty NgModules, then switch bootstrapping to bootstrapApplication. Commit between passes and let the test suite run each time. What the tool cannot decide for you is provider placement - providers that lived in a module for scoping reasons need a deliberate home, usually the application config or the component that actually needs a private instance.',
      uk: 'Запусти офіційний схематик - він працює трьома проходами, які застосовують по черзі: перетворити оголошені класи на standalone, потім прибрати спорожнілі NgModule, потім перевести запуск на bootstrapApplication. Комить між проходами і щоразу ганяй тести. Чого інструмент не вирішить за тебе - це розміщення провайдерів: ті, що жили в модулі заради обмеження області видимості, потребують свідомого нового дому, зазвичай це конфіг застосунку або компонент, якому справді потрібен приватний екземпляр.',
    },
    code: 'ng generate @angular/core:standalone\n\n# The prompt offers the three modes, and they must be run in this order:\n#   1. Convert all components, directives and pipes to standalone\n#   2. Remove unnecessary NgModule classes\n#   3. Bootstrap the application using standalone APIs',
  },
  {
    id: 'q-bootstrapping-app',
    category: 'basics',
    q: {
      en: 'How does an Angular application bootstrap, and what does bootstrapApplication do?',
      uk: 'Як відбувається запуск застосунку Angular і що робить bootstrapApplication?',
    },
    a: {
      en: 'main.ts calls bootstrapApplication with a root component and a config. Angular creates the root environment injector from the providers in that config, instantiates the root component, and renders it into the element matching its selector in index.html. It returns a promise that resolves with the ApplicationRef once the first render is done - which is where you catch a bootstrap failure rather than letting it disappear into the console.',
      uk: "main.ts викликає bootstrapApplication з кореневим компонентом і конфігом. Angular створює кореневий environment-інжектор з провайдерів цього конфіга, створює екземпляр кореневого компонента і рендерить його в елемент, що збігається з його селектором в index.html. Функція повертає проміс, який розв'язується з ApplicationRef після першого рендерингу - саме там варто ловити помилку запуску, а не дати їй загубитися в консолі.",
    },
    code: '// main.ts\nbootstrapApplication(AppComponent, appConfig).catch((error) => console.error(error));\n\n<!-- index.html: the selector is the mounting point -->\n<body>\n  <app-root></app-root>\n</body>',
  },
  {
    id: 'q-application-config',
    category: 'basics',
    q: {
      en: 'What lives in ApplicationConfig, and how do you add a feature to it?',
      uk: 'Що зберігається в ApplicationConfig і як додати туди нову можливість?',
    },
    a: {
      en: 'ApplicationConfig is a plain object with one meaningful field, providers, which seeds the root injector. Framework features are added through provide* functions rather than by importing modules: provideRouter, provideHttpClient, provideAnimationsAsync, provideZonelessChangeDetection. Each takes its own with* options, so a feature you do not configure contributes no code to the bundle - that is the tree-shaking win over the old forRoot modules.',
      uk: "ApplicationConfig - це звичайний об'єкт з одним змістовним полем providers, яке наповнює кореневий інжектор. Можливості фреймворка додаються функціями provide*, а не імпортом модулів: provideRouter, provideHttpClient, provideAnimationsAsync, provideZonelessChangeDetection. Кожна приймає власні опції with*, тож можливість, яку ти не налаштував, не додає коду в бандл - у цьому й виграш tree-shaking порівняно зі старими forRoot-модулями.",
    },
    code: '// app.config.ts\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    provideZonelessChangeDetection(),\n    provideRouter(routes, withComponentInputBinding()),\n    provideHttpClient(withInterceptors([authInterceptor])),\n    { provide: API_URL, useValue: "/api" },   // your own tokens go here too\n  ],\n};',
  },
  {
    id: 'q-data-binding-types',
    category: 'basics',
    q: {
      en: 'How do you categorise the data binding types Angular offers?',
      uk: "Як класифікувати види прив'язки даних, що їх пропонує Angular?",
    },
    a: {
      en: 'By direction. Class to DOM: interpolation, property, attribute, class and style bindings. DOM to class: event binding. Both at once: the two-way form, which is not a separate mechanism but a property binding and an event binding written as one. Everything flows one way underneath, which is what makes a render pass predictable - a value never changes as a side effect of being displayed.',
      uk: "За напрямком. Від класу до DOM: інтерполяція, прив'язки до властивості, атрибута, класу і стилю. Від DOM до класу: прив'язка події. Обидва напрямки одразу: двостороння форма, яка не є окремим механізмом, а лише прив'язкою до властивості та прив'язкою події, записаними разом. Під капотом усе тече в один бік - саме це робить прохід рендерингу передбачуваним: значення ніколи не змінюється як побічний ефект свого ж показу.",
    },
    code: '<p>{{ title() }}</p>                <!-- interpolation:    class -> DOM -->\n<img [src]="avatar()" />            <!-- property:         class -> DOM -->\n<div [attr.aria-busy]="loading()">  <!-- attribute:        class -> DOM -->\n<button (click)="save()">           <!-- event:            DOM   -> class -->\n<app-field [(value)]="name" />      <!-- two-way, and exactly the same as: -->\n<app-field [value]="name()" (valueChange)="name.set($event)" />',
  },
  {
    id: 'q-constructor-vs-ngoninit',
    category: 'basics',
    q: {
      en: 'What is the difference between the constructor and ngOnInit?',
      uk: 'Яка різниця між конструктором і ngOnInit?',
    },
    a: {
      en: 'The constructor runs when the class is instantiated, before Angular has set any input. ngOnInit runs once after the first ngOnChanges, so inputs are populated. Put dependency injection and field initialisation in the constructor, and anything that reads an input in ngOnInit. With signal inputs the distinction matters much less: a computed or an effect reads the input whenever it settles, so there is often no init hook left to write.',
      uk: 'Конструктор виконується під час створення екземпляра класу, ще до того, як Angular задав хоч один інпут. ngOnInit виконується один раз після першого ngOnChanges, тобто коли інпути вже заповнені. Впровадження залежностей та ініціалізацію полів лиши в конструкторі, а все, що читає інпут, - в ngOnInit. Із сигнальними інпутами ця різниця майже зникає: computed чи ефект прочитають інпут тоді, коли той усталиться, тож писати init-хук здебільшого вже не треба.',
    },
    code: 'export class ReportComponent implements OnInit {\n  readonly reportId = input.required<string>();\n  private readonly reports = inject(ReportService);   // constructor time: fine\n\n  ngOnInit(): void {\n    this.reports.load(this.reportId());   // the input exists only by now\n  }\n}\n\n// With signals there is nothing left for ngOnInit to do:\nprotected readonly report = computed(() => this.reports.byId(this.reportId()));',
  },
  {
    id: 'q-angular-cli-basics',
    category: 'basics',
    q: {
      en: 'What is the Angular CLI, and which of its commands do you use daily?',
      uk: 'Що таке Angular CLI і якими його командами ти користуєшся щодня?',
    },
    a: {
      en: "The CLI is the project's build tool, code generator and upgrade path in one binary. Day to day it is serve, generate, test and build; less often update, which runs the version migrations, and add, which installs a package and runs its setup schematic. Generating through the CLI rather than by hand matters more than it looks: the files land in the conventional place, with the conventional names, and the spec file is created with them.",
      uk: 'CLI - це водночас інструмент збірки, генератор коду і шлях оновлення проєкту в одному виконуваному файлі. Щодня це serve, generate, test і build; рідше - update, який запускає міграції версій, і add, що встановлює пакет і виконує його схематик налаштування. Генерувати через CLI, а не руками, важливіше, ніж здається: файли лягають у звичне місце, зі звичними назвами, і спек-файл створюється разом з ними.',
    },
    code: 'ng serve                        # dev server with rebuild on save\nng generate component user/card # component, template, styles and spec\nng test                         # unit tests\nng build                        # production bundle by default\nng update @angular/core         # migrations, not just a version bump\nng add @angular/material        # install plus its setup schematic',
  },
  {
    id: 'q-angular-project-structure',
    category: 'basics',
    q: {
      en: 'How would you structure folders in a large Angular codebase?',
      uk: 'Як би ти організував структуру тек у великій кодовій базі Angular?',
    },
    a: {
      en: 'By feature, not by kind. A folder per feature holds its components, its services and its routes together, so a change stays in one place and a feature can be lazy loaded as a unit. Keep a core folder for things instantiated once - app-wide services, interceptors, guards - and a shared folder for genuinely reusable pieces. The old core/shared/features split by file type (all services here, all components there) scales badly: every change touches four directories.',
      uk: 'За фічами, а не за типами файлів. Тека фічі тримає її компоненти, сервіси й маршрути разом, тож зміна лишається в одному місці, а сама фіча може ліниво завантажуватись як ціле. Тримай теку core для того, що створюється один раз - загальні сервіси, інтерсептори, гварди - і теку shared для справді повторно використовуваних частин. Старий поділ за типом файлу (усі сервіси сюди, усі компоненти туди) погано масштабується: кожна зміна зачіпає чотири каталоги.',
    },
    code: 'src/app/\n  core/            # once per app: services, interceptors, guards, models\n  shared/          # reused by more than one feature\n  features/\n    checkout/      # everything checkout needs, lazy loaded as a unit\n      checkout.routes.ts\n      checkout.service.ts\n      cart/\n      payment/\n  app.config.ts\n  app.routes.ts',
  },
  {
    id: 'q-angular-release-cadence',
    category: 'basics',
    q: {
      en: "How does Angular's release and long-term support cadence work?",
      uk: 'Як влаштований цикл релізів і підтримки версій Angular?',
    },
    a: {
      en: 'A major release every six months, a minor roughly monthly, patches weekly. Each major gets six months of active support, where it still receives fixes, then twelve months of long-term support with critical and security fixes only - eighteen months in total. Practically that means skipping more than two majors puts you on an unsupported version, and majors must be applied one at a time, because each ships its own migrations.',
      uk: 'Мажорний реліз кожні пів року, мінорний приблизно щомісяця, патчі щотижня. Кожен мажор має пів року активної підтримки, коли він ще отримує виправлення, а далі рік довгострокової підтримки лише з критичними та безпековими виправленнями - разом вісімнадцять місяців. На практиці це означає, що пропустивши більш ніж два мажори, ти опиняєшся на версії без підтримки, а мажори треба застосовувати по одному, бо кожен несе власні міграції.',
    },
    code: '# Majors are applied one at a time - each carries its own migrations.\nng update @angular/core@20 @angular/cli@20\nng update @angular/core@21 @angular/cli@21\nng update @angular/core@22 @angular/cli@22\n\nng version   # what you are actually on, framework and CLI both',
  },
  {
    id: 'q-angular-browser-support',
    category: 'basics',
    q: {
      en: 'Which browsers does a current Angular version support, and how is that decided?',
      uk: 'Які браузери підтримує актуальна версія Angular і чим це визначається?',
    },
    a: {
      en: 'The two most recent versions of Chrome, Edge, Firefox and Safari, plus current Firefox ESR. Internet Explorer has not been supported since v13. The list is not just documentation: the CLI reads a browserslist query and compiles output down to the oldest browser it names, so widening that query silently produces larger, slower code. Angular ships a sensible default, and the usual mistake is copying a stricter one from an old project.',
      uk: 'Дві останні версії Chrome, Edge, Firefox і Safari, а також актуальний Firefox ESR. Internet Explorer не підтримується з v13. Цей перелік не просто документація: CLI читає запит browserslist і компілює вивід під найстаріший названий браузер, тож розширення запиту тихо дає більший і повільніший код. Angular постачає розумний типовий набір, і типова помилка - скопіювати суворіший зі старого проєкту.',
    },
    code: '# .browserslistrc - what the build actually targets\nlast 2 Chrome versions\nlast 2 Firefox versions\nlast 2 Edge major versions\nlast 2 Safari major versions\nFirefox ESR\n\n# See the resolved list before you widen it:\nnpx browserslist',
  },
  {
    id: 'q-angular-material-cdk',
    category: 'basics',
    q: {
      en: 'What are Angular Material and the CDK, and when is the CDK alone enough?',
      uk: 'Що таке Angular Material і CDK, і коли достатньо самого лише CDK?',
    },
    a: {
      en: "Material is a component library implementing Google's Material Design; the CDK is the unstyled machinery underneath it - overlays, focus trapping, drag and drop, virtual scrolling, accessibility helpers, a table with no opinions about how it looks. If your product has its own design language, take the CDK and skip Material: you get the hard, easy-to-get-wrong parts (focus management, positioning, keyboard support) without fighting a theme you do not want.",
      uk: 'Material - це бібліотека компонентів, що реалізує Material Design від Google; CDK - це нестилізована механіка під нею: оверлеї, утримання фокуса, drag and drop, віртуальний скрол, помічники для доступності, таблиця без жодних припущень про вигляд. Якщо у продукту власна дизайн-мова, бери CDK і оминай Material: ти отримаєш складні частини, у яких легко помилитися (керування фокусом, позиціювання, підтримка клавіатури), не воюючи з темою, яка тобі не потрібна.',
    },
    code: 'ng add @angular/cdk    # no theme, no visual opinions\n\n@Component({\n  selector: "app-people",\n  templateUrl: "./people.html",\n  imports: [ScrollingModule],   // CDK virtual scroll, styled by you\n})\nexport class PeopleComponent {}\n\n<!-- people.html -->\n<cdk-virtual-scroll-viewport itemSize="48" class="viewport">\n  <div *cdkVirtualFor="let person of people()" class="row">{{ person.name }}</div>\n</cdk-virtual-scroll-viewport>',
  },
  {
    id: 'q-ngrx-when',
    category: 'basics',
    q: {
      en: 'What is NgRx, and when is a global store worth its overhead?',
      uk: 'Що таке NgRx і коли глобальний стор виправдовує свої накладні витрати?',
    },
    a: {
      en: 'NgRx is a Redux-style store: state lives in one immutable tree, changes are described as actions, reducers apply them purely, and side effects live in a separate effects layer. It buys traceability - every change has a name and a devtools entry - and it costs a lot of ceremony per feature. It earns that on large applications with many writers to shared state or complex optimistic flows. For a handful of screens, a service holding signals does the same job in a tenth of the code.',
      uk: "NgRx - це стор у стилі Redux: стан живе в одному незмінному дереві, зміни описуються як дії, редюсери застосовують їх чисто, а побічні ефекти виносяться в окремий шар effects. Це дає простежуваність - кожна зміна має ім'я і запис у devtools - і коштує чималої церемонії на кожну фічу. Виправдано на великих застосунках з багатьма джерелами запису у спільний стан або зі складними оптимістичними сценаріями. Для кількох екранів сервіс із сигналами робить те саме вдесятеро меншим кодом.",
    },
    code: '// NgRx: three moving parts before anything appears on screen\nconst load = createAction("[Cart] Load");\nconst reducer = createReducer(initial, on(loadSuccess, (s, { items }) => ({ ...s, items })));\n\n// The same shared state, when the app does not need the ceremony:\n@Injectable({ providedIn: "root" })\nexport class CartStore {\n  private readonly state = signal<Item[]>([]);\n  readonly items = this.state.asReadonly();\n  readonly total = computed(() => this.state().reduce((sum, i) => sum + i.price, 0));\n}',
  },
  {
    id: 'q-state-management-options',
    category: 'basics',
    q: {
      en: 'What state management options does an Angular application realistically have?',
      uk: 'Які варіанти керування станом реально доступні застосунку на Angular?',
    },
    a: {
      en: 'Four, in increasing order of ceremony: signals local to a component; a root-provided service exposing signals, which covers most shared state; a signal store such as NgRx SignalStore when you want structure without the full action pipeline; and a full Redux-style store for large applications that need a traceable audit trail. Start at the smallest that works. Moving up later is a refactor inside a service, whereas starting at the top taxes every feature you write.',
      uk: 'Чотири, у порядку зростання церемонії: сигнали, локальні для компонента; сервіс, наданий у корені, який віддає сигнали - цього вистачає для більшості спільного стану; сигнальний стор на кшталт NgRx SignalStore, коли потрібна структура без повного конвеєра дій; і повноцінний стор у стилі Redux для великих застосунків, яким потрібен простежуваний журнал змін. Починай з найменшого, що працює. Піднятися вище потім - це рефакторинг усередині сервісу, а почати згори означає обкласти податком кожну написану фічу.',
    },
    code: '// 1. Local to a component\nprotected readonly open = signal(false);\n\n// 2. Shared through a root service - where most state should live\n@Injectable({ providedIn: "root" })\nexport class FiltersStore {\n  private readonly state = signal<Filters>(EMPTY);\n  readonly filters = this.state.asReadonly();\n  readonly isEmpty = computed(() => this.state().tags.length === 0);\n  setTags(tags: string[]): void {\n    this.state.update((current) => ({ ...current, tags }));\n  }\n}',
  },
  {
    id: 'q-angular-library',
    category: 'basics',
    q: {
      en: 'What is an Angular library, and how does building one differ from building an app?',
      uk: 'Що таке бібліотека Angular і чим її збірка відрізняється від збірки застосунку?',
    },
    a: {
      en: 'A library is a package of components, directives, pipes and services meant to be consumed by applications rather than run on its own. It is built with ng-packagr into the Angular Package Format, has a public_api that defines its surface, and must not be bundled or minified - the consuming application does that, after tree-shaking away what it did not import. It also cannot depend on the app: peer dependencies, no environment files, no assumptions about the injector above it.',
      uk: 'Бібліотека - це пакет компонентів, директив, пайпів і сервісів, призначений для споживання застосунками, а не для самостійного запуску. Вона збирається через ng-packagr у формат Angular Package Format, має public_api, який визначає її поверхню, і не має бути забандлена чи мініфікована - це робить застосунок-споживач, попередньо відкинувши tree-shaking-ом усе, чого не імпортував. Вона також не може залежати від застосунку: peer-залежності, жодних environment-файлів і припущень про інжектор над нею.',
    },
    code: 'ng generate library ui-kit\nng build ui-kit          # ng-packagr output, not an app bundle\n\n// projects/ui-kit/src/public-api.ts - the entire public surface\nexport * from "./lib/button/button";\nexport * from "./lib/tokens";\n// anything not exported here is private, however public the class looks',
  },
  {
    id: 'q-naming-conventions',
    category: 'basics',
    q: {
      en: 'What naming and file conventions does the Angular style guide expect?',
      uk: 'Яких конвенцій іменування та файлів очікує style guide Angular?',
    },
    a: {
      en: 'Files are kebab-case and named after the thing plus its role: user-card.ts, auth.service.ts, is-admin.guard.ts. Classes are PascalCase, members camelCase, and a component selector is kebab-case with a project prefix so it cannot collide with a library or a real HTML tag. Template and style files sit next to the class and are referenced relatively. The value is not aesthetic - it is that anyone can guess a file name from a symbol and find it without searching.',
      uk: "Файли іменуються в kebab-case за суттю плюс роль: user-card.ts, auth.service.ts, is-admin.guard.ts. Класи - PascalCase, члени - camelCase, а селектор компонента - kebab-case з префіксом проєкту, щоб не зіткнутися з бібліотекою чи справжнім HTML-тегом. Файли шаблону і стилів лежать поруч із класом і підключаються відносними шляхами. Сенс не в естетиці, а в тому, що будь-хто може вгадати ім'я файлу за символом і знайти його без пошуку.",
    },
    code: 'user-card/\n  user-card.ts       // export class UserCardComponent\n  user-card.html\n  user-card.scss\n  user-card.spec.ts\n\n@Component({\n  selector: "app-user-card",     // project prefix, kebab-case\n  templateUrl: "./user-card.html",\n  styleUrl: "./user-card.scss",  // relative to the TS file\n})',
  },
  {
    id: 'q-class-decorators',
    category: 'basics',
    q: {
      en: 'Which class decorators does Angular provide, and what does each mark?',
      uk: 'Які декоратори класів надає Angular і що саме кожен з них позначає?',
    },
    a: {
      en: 'Component marks a class that owns a template; Directive marks one that adds behaviour to an existing element; Pipe marks a value transformer usable in a template; Injectable marks a class the injector may create and whose own dependencies must be resolved; NgModule marks the legacy container. Only one of these may sit on a class - Component is itself a Directive with a template, so the two are mutually exclusive.',
      uk: "Component позначає клас, що володіє шаблоном; Directive - клас, що додає поведінку до наявного елемента; Pipe - перетворювач значення, доступний у шаблоні; Injectable - клас, який інжектор може створювати і чиї власні залежності треба розв'язати; NgModule - застарілий контейнер. На класі може бути лише один з них: Component сам по собі є Directive з шаблоном, тож ці два взаємно виключні.",
    },
    code: '@Component({ selector: "app-card", templateUrl: "./card.html" })\nexport class CardComponent {}\n\n@Directive({ selector: "[appAutofocus]" })\nexport class AutofocusDirective {}\n\n@Pipe({ name: "initials" })\nexport class InitialsPipe implements PipeTransform {\n  transform(name: string): string {\n    return name.split(" ").map((part) => part[0]).join("");\n  }\n}\n\n@Injectable({ providedIn: "root" })\nexport class CardService {}',
  },
  {
    id: 'q-field-decorators',
    category: 'basics',
    q: {
      en: 'Which class field decorators exist, and which of them now have signal-based replacements?',
      uk: 'Які декоратори полів класу існують і які з них уже мають заміни на сигналах?',
    },
    a: {
      en: 'Input, Output, ViewChild, ViewChildren, ContentChild, ContentChildren, HostBinding and HostListener. All of them have replacements: input() and output(), the viewChild/contentChild query functions, and the host object in the decorator. The functions win because their results are signals, so they compose with computed and effect and are typed without a definite-assignment assertion; the host object wins because it keeps every host binding in one visible place. The CLI ships migrations for each.',
      uk: "Input, Output, ViewChild, ViewChildren, ContentChild, ContentChildren, HostBinding і HostListener. У всіх є заміни: input() та output(), функції-запити viewChild/contentChild і об'єкт host у декораторі. Функції кращі, бо їхні результати - сигнали, тож вони поєднуються з computed та ефектами і типізуються без ствердження певного присвоєння; об'єкт host кращий тим, що тримає всі хост-прив'язки в одному видимому місці. Для кожного випадку CLI має міграцію.",
    },
    code: '// Then\n@Input({ required: true }) user!: User;\n@Output() saved = new EventEmitter<User>();\n@ViewChild("input") input!: ElementRef<HTMLInputElement>;\n@HostBinding("class.active") isActive = false;\n\n// Now\nreadonly user = input.required<User>();\nreadonly saved = output<User>();\nreadonly input = viewChild<ElementRef<HTMLInputElement>>("input");\n// host: { "[class.active]": "isActive()" } in the decorator\n\n// ng generate @angular/core:signal-input-migration',
  },
];
