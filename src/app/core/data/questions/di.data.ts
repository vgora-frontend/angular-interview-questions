import { Question } from '../../models/content.model';

// Dependency injection: providers, tokens, injector hierarchies and inject().
export const DI_QUESTIONS: Question[] = [
  {
    id: 'q-what-is-di',
    category: 'di',
    q: {
      en: 'What is dependency injection, and what does Angular gain from having it built in?',
      uk: 'Що таке впровадження залежностей і що Angular виграє від того, що воно вбудоване?',
    },
    a: {
      en: 'A class declares what it needs and something else decides which instance it gets. Angular gains substitutability: the same component takes a real service in production and a fake in a test without changing a line, and a library can ship an abstract contract that the application fills in. It also gains lifetime management - the injector decides whether a dependency is shared or created per component, and the class never knows.',
      uk: 'Клас оголошує, що йому потрібно, а хтось інший вирішує, який екземпляр він отримає. Angular виграє замінність: той самий компонент бере справжній сервіс у продакшені й фейковий у тесті, не змінивши жодного рядка, а бібліотека може постачати абстрактний контракт, який заповнює застосунок. Виграє він і керування часом життя: інжектор вирішує, чи залежність спільна, чи створюється на кожен компонент, а клас про це не знає.',
    },
    code: 'export class CheckoutComponent {\n  private readonly payments = inject(PaymentService);   // asks, does not construct\n}\n\n// Production: the real one, from providedIn: "root"\n// Test: a fake, with the component untouched\nTestBed.configureTestingModule({\n  providers: [{ provide: PaymentService, useClass: FakePaymentService }],\n});',
  },
  {
    id: 'q-di-vs-import',
    category: 'di',
    q: {
      en: 'Why inject a service instead of importing a shared instance directly?',
      uk: 'Чому краще інжектувати сервіс, ніж імпортувати спільний екземпляр напряму?',
    },
    a: {
      en: 'An imported singleton is welded in: you cannot replace it in a test, cannot give one subtree a different instance, and cannot let a library defer the choice to the application. It is also constructed at module load, before the app decides anything, so it cannot depend on configuration. Injection defers all of that to the injector, which is the point - the dependency becomes a decision rather than a fact.',
      uk: 'Імпортований синглтон вварений намертво: його не заміниш у тесті, не даси одному піддереву інший екземпляр і не дозволиш бібліотеці віддати вибір застосунку. Він до того ж створюється під час завантаження модуля, ще до будь-яких рішень застосунку, тож не може залежати від конфігурації. Інжекція відкладає все це до інжектора - і залежність стає рішенням, а не фактом.',
    },
    code: '// Welded: every consumer gets this one object, forever\nexport const analytics = new Analytics("prod-key");\n\n// A decision: the token says what, the provider says which\n@Injectable({ providedIn: "root" })\nexport class Analytics {\n  private readonly key = inject(ANALYTICS_KEY);   // configurable at bootstrap\n}',
  },
  {
    id: 'q-inject-function',
    category: 'di',
    q: {
      en: 'What does the inject() function do, and why is it preferred over constructor injection?',
      uk: 'Що робить функція inject() і чому вона краща за інжекцію через конструктор?',
    },
    a: {
      en: 'It resolves a dependency from the current injector at field initialisation. It is preferred because it composes: a plain function can call inject(), which is what makes functional guards, interceptors and reusable helpers possible - a constructor parameter cannot be shared that way. It also drops the constructor boilerplate, types inference better with generics, and avoids the super() argument chain in a subclass.',
      uk: "Вона розв'язує залежність з поточного інжектора під час ініціалізації поля. Краща вона тим, що компонується: звичайна функція може викликати inject(), і саме це робить можливими функціональні гварди, інтерсептори й повторно використовувані хелпери - параметр конструктора так не поділиш. Вона також прибирає шаблонний код конструктора, краще виводить типи з дженериками й уникає ланцюжка аргументів super() у підкласі.",
    },
    code: 'export class UsersComponent {\n  private readonly http = inject(HttpClient);\n  private readonly route = inject(ActivatedRoute);\n}\n\n// The composability that a constructor parameter cannot give you:\nexport function requireRole(role: Role): CanActivateFn {\n  return () => inject(AuthService).hasRole(role) || inject(Router).parseUrl("/denied");\n}',
  },
  {
    id: 'q-injection-context',
    category: 'di',
    q: {
      en: 'What is an injection context, and why does inject() throw outside of one?',
      uk: 'Що таке контекст інжекції і чому inject() кидає помилку поза ним?',
    },
    a: {
      en: 'It is the window during which Angular knows which injector is current: while constructing a class it manages, in a field initialiser, in a factory, and inside functions Angular calls for you such as guards and resolvers. Outside it there is no current injector, so inject() has nothing to ask - which is why calling it in ngOnInit, in a callback or after an await fails at runtime.',
      uk: 'Це проміжок, протягом якого Angular знає, який інжектор є поточним: під час створення класу, яким він керує, в ініціалізаторі поля, у фабриці й усередині функцій, які Angular викликає сам, - гвардів, резолверів. Поза ним поточного інжектора немає, тож inject() ні в кого питати - саме тому виклик у ngOnInit, у колбеку або після await падає під час виконання.',
    },
    code: 'export class ReportComponent {\n  private readonly http = inject(HttpClient);   // field initialiser: in context\n\n  ngOnInit(): void {\n    const router = inject(Router);              // NG0203: outside injection context\n  }\n\n  async load(): Promise<void> {\n    await this.ready();\n    const store = inject(Store);                // also too late: the await ended it\n  }\n}',
  },
  {
    id: 'q-run-in-injection-context',
    category: 'di',
    q: {
      en: 'When would you use runInInjectionContext?',
      uk: 'Коли варто застосовувати runInInjectionContext?',
    },
    a: {
      en: 'When you have to call code that uses inject() from somewhere that is not an injection context - inside a callback, after an await, or in a factory you invoke yourself. You pass an injector you captured earlier and Angular makes it current for the duration of the call. Treat it as a last resort: capturing the dependency in a field is usually simpler, and reaching for this often means the code ran at the wrong time.',
      uk: 'Коли треба викликати код, що використовує inject(), звідти, де контексту інжекції немає: з колбеку, після await або у фабриці, яку ти запускаєш сам. Ти передаєш інжектор, захоплений раніше, і Angular робить його поточним на час виклику. Сприймай це як крайній засіб: захопити залежність у поле зазвичай простіше, а потреба в цій функції часто означає, що код виконався не в той момент.',
    },
    code: 'export class ImportService {\n  private readonly injector = inject(EnvironmentInjector);   // captured in context\n\n  async loadPlugin(): Promise<void> {\n    const { createPlugin } = await import("./plugin");   // context is gone here\n\n    runInInjectionContext(this.injector, () => createPlugin());\n  }\n}',
  },
  {
    id: 'q-injectable-decorator',
    category: 'di',
    q: {
      en: 'Is @Injectable mandatory on every service class?',
      uk: "Чи обов'язковий @Injectable на кожному класі сервісу?",
    },
    a: {
      en: 'It is needed whenever the injector has to construct the class, because the decorator is what makes the compiler emit a factory describing its own dependencies. A class with no dependencies, provided with useValue or useFactory, technically does not need it. Put it on every service anyway: the day someone adds a dependency, the failure is a runtime error rather than a compile one.',
      uk: 'Він потрібен щоразу, коли інжектор має конструювати клас, бо саме декоратор змушує компілятор згенерувати фабрику з описом його власних залежностей. Клас без залежностей, наданий через useValue чи useFactory, формально може без нього обійтися. Але став його на кожен сервіс: того дня, коли хтось додасть залежність, помилка буде рантаймовою, а не компіляційною.',
    },
    code: '@Injectable({ providedIn: "root" })\nexport class OrdersService {\n  private readonly http = inject(HttpClient);   // needs the emitted factory\n}\n\n// Technically fine without the decorator, because nothing is constructed:\nprovide: CONFIG, useValue: new Config({ apiUrl: "/api" });',
  },
  {
    id: 'q-provided-in-root',
    category: 'di',
    q: {
      en: 'What does providedIn: "root" do, and how does it make a service tree-shakable?',
      uk: 'Що робить providedIn: "root" і як він робить сервіс придатним для tree-shaking?',
    },
    a: {
      en: 'It registers the service with the root injector from the service file itself, so nothing has to list it in a providers array. That inversion is what enables tree-shaking: the dependency points from the service to the injector rather than from a module to the service, so if no code injects it, the bundler sees no reference and drops it. A provider listed in a providers array is referenced by that array and therefore always shipped.',
      uk: 'Він реєструє сервіс у кореневому інжекторі з самого файлу сервісу, тож нікому не треба перелічувати його в масиві providers. Саме ця інверсія вмикає tree-shaking: залежність спрямована від сервісу до інжектора, а не від модуля до сервісу, тож якщо ніхто його не інжектує, бандлер не бачить посилання і викидає його. Провайдер, перелічений у масиві providers, згаданий цим масивом, а отже потрапляє в бандл завжди.',
    },
    code: '@Injectable({ providedIn: "root" })\nexport class RarelyUsedService {}\n// Nobody injects it -> no reference -> not in the bundle\n\n// Listed explicitly -> referenced by the array -> always bundled\nproviders: [RarelyUsedService];',
  },
  {
    id: 'q-provider-kinds',
    category: 'di',
    q: {
      en: 'What is the difference between useClass, useValue, useFactory and useExisting?',
      uk: 'Яка різниця між useClass, useValue, useFactory і useExisting?',
    },
    a: {
      en: 'useClass constructs the given class for the token. useValue hands back an object you already made. useFactory calls a function, so the instance can depend on runtime information. useExisting aliases one token to another and returns the same instance - which is the difference from useClass, where a second provider would construct a second object.',
      uk: "useClass конструює для токена вказаний клас. useValue віддає вже готовий об'єкт. useFactory викликає функцію, тож екземпляр може залежати від інформації, відомої під час виконання. useExisting робить один токен псевдонімом іншого і повертає той самий екземпляр - у цьому й різниця з useClass, де другий провайдер сконструював би другий об'єкт.",
    },
    code: 'providers: [\n  { provide: Logger, useClass: ConsoleLogger },\n  { provide: API_URL, useValue: "/api/v2" },\n  { provide: Clock, useFactory: () => (isTest() ? new FixedClock() : new SystemClock()) },\n\n  // Same instance under both tokens - not a second one\n  { provide: LoggerContract, useExisting: Logger },\n];',
  },
  {
    id: 'q-injection-token',
    category: 'di',
    q: {
      en: 'What is an InjectionToken, and why can an interface not be used as a token?',
      uk: 'Що таке InjectionToken і чому інтерфейс не може бути токеном?',
    },
    a: {
      en: 'A token is a runtime key the injector looks things up by, and an interface does not exist at runtime - TypeScript erases it, so there is nothing left to key on. InjectionToken is a real object created for that purpose, carrying the type as a generic so the lookup stays typed. Give it a factory and it becomes tree-shakable and self-defaulting, with no provider needed unless you want to override it.',
      uk: "Токен - це рантаймовий ключ, за яким інжектор шукає значення, а інтерфейс під час виконання не існує: TypeScript його стирає, і ключа не лишається. InjectionToken - це справжній об'єкт, створений саме для цього, який несе тип як дженерик, тож пошук лишається типізованим. Дай йому фабрику - і він стане придатним для tree-shaking і самозабезпеченим: провайдер потрібен лише тоді, коли ти хочеш його перевизначити.",
    },
    code: 'export const API_URL = new InjectionToken<string>("API_URL", {\n  providedIn: "root",\n  factory: () => "/api",      // a default, so no provider is required\n});\n\nconst url = inject(API_URL);  // typed as string\n\n// This cannot work - the interface is gone by runtime:\n// inject(AppConfig)',
  },
  {
    id: 'q-abstract-class-token',
    category: 'di',
    q: {
      en: 'How can an abstract class serve as both a token and a contract?',
      uk: 'Як абстрактний клас може бути одночасно токеном і контрактом?',
    },
    a: {
      en: 'An abstract class survives compilation as a value, so it works as a token, while its abstract members act as the interface. That gives you what an interface cannot: a library defines the contract and injects it, and the application provides an implementation with useClass or useExisting. Type checking is enforced by extends, so a wrong implementation fails to compile rather than at the first call.',
      uk: 'Абстрактний клас переживає компіляцію як значення, тож працює токеном, а його абстрактні члени грають роль інтерфейсу. Це дає те, чого інтерфейс дати не може: бібліотека визначає контракт і інжектує його, а застосунок надає реалізацію через useClass чи useExisting. Перевірку типів забезпечує extends, тож неправильна реалізація не скомпілюється, а не впаде на першому виклику.',
    },
    code: '// In the library: the contract and the token in one\nexport abstract class StorageAdapter {\n  abstract read(key: string): string | null;\n  abstract write(key: string, value: string): void;\n}\n\n// In the application: the choice\nproviders: [{ provide: StorageAdapter, useClass: LocalStorageAdapter }];\n\n// Anywhere: typed against the contract, not the implementation\nprivate readonly storage = inject(StorageAdapter);',
  },
  {
    id: 'q-injector-hierarchies',
    category: 'di',
    q: {
      en: 'What injector hierarchies does Angular have, and how does a lookup traverse them?',
      uk: 'Які ієрархії інжекторів має Angular і як відбувається пошук залежності по них?',
    },
    a: {
      en: 'Two, and they are searched in order. The element injector tree follows the DOM: a lookup starts at the requesting element and walks up through its ancestors. If nothing matches, the search moves to the environment injector tree - the route injectors and then the root. Only after both fail does it throw. Knowing the order explains why a provider on a parent component is visible to a child but not to a sibling.',
      uk: 'Дві, і шукають у них по черзі. Дерево інжекторів елементів повторює DOM: пошук стартує з елемента, який просить, і йде вгору по його предках. Якщо нічого не збіглося, пошук переходить у дерево environment-інжекторів - інжектори маршрутів, а потім кореневий. І лише коли обидва не дали результату, кидається помилка. Знання цього порядку пояснює, чому провайдер на батьківському компоненті видно дитині, але не сусіду.',
    },
    code: '// Element injector: visible to this component and everything inside it\n@Component({\n  selector: "app-wizard",\n  templateUrl: "./wizard.html",\n  providers: [WizardState],\n})\nexport class WizardComponent {}\n\n// Environment injector: visible to this route subtree\n{ path: "checkout", providers: [CheckoutState], loadChildren: () => ... }\n\n// Root: visible everywhere\n@Injectable({ providedIn: "root" })',
  },
  {
    id: 'q-component-level-providers',
    category: 'di',
    q: {
      en: 'What changes when you list a provider on a component instead of at the root?',
      uk: 'Що змінюється, коли провайдер оголошено на компоненті, а не в корені?',
    },
    a: {
      en: "Every instance of that component gets its own instance of the service, destroyed with it, and only that component and its descendants can see it. That is exactly what you want for per-instance state - a wizard's progress, a form's draft - because two of the components on one page then do not fight over one object. It is exactly what you do not want for a cache, which would silently stop being shared.",
      uk: "Кожен екземпляр цього компонента отримує власний екземпляр сервісу, який знищується разом із ним, і бачать його лише цей компонент та його нащадки. Саме це потрібно для стану на екземпляр - прогрес майстра, чернетка форми, - бо тоді два таких компоненти на одній сторінці не б'ються за один об'єкт. І саме цього не потрібно для кешу, який тихо перестане бути спільним.",
    },
    code: '@Component({\n  selector: "app-wizard",\n  templateUrl: "./wizard.html",\n  providers: [WizardState],   // one per <app-wizard>, destroyed with it\n})\nexport class WizardComponent {}\n\n<!-- Two wizards on a page, two independent states -->\n<app-wizard />\n<app-wizard />',
  },
  {
    id: 'q-singleton-service',
    category: 'di',
    q: {
      en: 'How do you guarantee a service is a true singleton?',
      uk: 'Як гарантувати, що сервіс справді є синглтоном?',
    },
    a: {
      en: 'Declare it with providedIn: "root" and provide it nowhere else. The guarantee breaks the moment the class also appears in some providers array, because that creates a second instance for that subtree - and nothing warns you, since both are valid. One instance per application means exactly one registration, in the service file itself.',
      uk: 'Оголоси його з providedIn: "root" і не надавай більше ніде. Гарантія ламається тієї миті, коли клас з\'являється ще й у якомусь масиві providers, бо це створює другий екземпляр для того піддерева - і ніхто не попередить, адже обидва варіанти легальні. Один екземпляр на застосунок означає рівно одну реєстрацію - у самому файлі сервісу.',
    },
    code: '@Injectable({ providedIn: "root" })\nexport class SessionService {}\n\n// This quietly creates a second SessionService for this component subtree\n@Component({\n  selector: "app-header",\n  templateUrl: "./header.html",\n  providers: [SessionService],   // remove it\n})',
  },
  {
    id: 'q-duplicate-service-instances',
    category: 'di',
    q: {
      en: 'What causes a service to be instantiated twice, and how do you find that out?',
      uk: 'Через що сервіс може створитися двічі і як це виявити?',
    },
    a: {
      en: 'Providing it in more than one place: providedIn plus a providers array, a lazy route that lists it again, or two copies of the same package in node_modules, which makes two different classes with the same name. Find it by logging in the constructor with a unique id - two lines means two instances - and check the dependency tree when the cause is a duplicated package.',
      uk: 'Надання його більш ніж в одному місці: providedIn плюс масив providers, лінивий маршрут, який перелічує його ще раз, або дві копії того самого пакета в node_modules, що дає два різні класи з однаковою назвою. Знайти це можна логом у конструкторі з унікальним ідентифікатором - два рядки означають два екземпляри, - а коли причина в дубльованому пакеті, варто перевірити дерево залежностей.',
    },
    code: '@Injectable({ providedIn: "root" })\nexport class CacheService {\n  constructor() {\n    console.log("CacheService created", Math.random());   // two lines = two instances\n  }\n}\n\n# When the cause is two copies of one package:\nnpm ls @my-org/core',
  },
  {
    id: 'q-optional-dependency',
    category: 'di',
    q: {
      en: 'What is an optional dependency, and what does the injector return when it is missing?',
      uk: "Що таке необов'язкова залежність і що поверне інжектор, якщо її немає?",
    },
    a: {
      en: 'One you ask for with optional: true, so a missing provider yields null instead of throwing. It is how a directive handles being used both inside and outside a host that provides context, and how a library degrades gracefully when the application did not configure something. The type includes null, so the compiler forces you to handle the absent case rather than discovering it in production.',
      uk: "Це залежність, яку ти просиш з optional: true, тож відсутній провайдер дає null замість помилки. Саме так директива витримує використання і всередині хоста, що надає контекст, і поза ним, і саме так бібліотека м'яко деградує, коли застосунок чогось не налаштував. Тип включає null, тож компілятор змушує обробити випадок відсутності, а не виявляти його в продакшені.",
    },
    code: '@Directive({ selector: "[appField]" })\nexport class FieldDirective {\n  // Works inside a <form>, and also on a standalone input\n  private readonly form = inject(NgForm, { optional: true });\n\n  protected get isSubmitted(): boolean {\n    return this.form?.submitted ?? false;\n  }\n}',
  },
  {
    id: 'q-self-skipself-host',
    category: 'di',
    q: {
      en: 'What do the Self, SkipSelf and Host resolution modifiers do?',
      uk: "Що роблять модифікатори розв'язання Self, SkipSelf і Host?",
    },
    a: {
      en: "They change where the search starts and stops. self: true looks only at this element's own injector. skipSelf: true starts at the parent, which is how a service can inject the version of itself defined above it. host: true stops at the host component, so a directive cannot accidentally reach past its own component into the application. They combine with optional, and that combination is what makes a directive safely reusable.",
      uk: 'Вони змінюють, звідки пошук починається і де зупиняється. self: true дивиться лише у власний інжектор цього елемента. skipSelf: true стартує з батька - саме так сервіс може інжектувати версію самого себе, визначену вище. host: true зупиняється на хост-компоненті, тож директива випадково не дотягнеться повз власний компонент до застосунку. Вони поєднуються з optional, і саме ця комбінація робить директиву безпечно перевикористовуваною.',
    },
    code: '// Only what this element provides\nprivate readonly local = inject(PanelState, { self: true });\n\n// Deliberately the parent instance, not our own - the nested-provider pattern\nprivate readonly parent = inject(PanelState, { skipSelf: true, optional: true });\n\n// Stop at the host component: never reach into the wider application\nprivate readonly control = inject(NgControl, { host: true, optional: true });',
  },
  {
    id: 'q-multi-providers',
    category: 'di',
    q: {
      en: 'What is a multi provider, and where does Angular use that pattern itself?',
      uk: 'Що таке multi-провайдер і де сам Angular використовує цей патерн?',
    },
    a: {
      en: 'A provider registered with multi: true, so the token resolves to an array of every contribution rather than the last one winning. Angular uses it for HTTP_INTERCEPTORS, APP_INITIALIZER and validators - anywhere several independent parts of the application each want to add one item to a list. Without multi, the second registration would silently replace the first, which is a genuinely hard bug to see.',
      uk: "Це провайдер, зареєстрований з multi: true, тож токен розв'язується в масив усіх внесків, а не перемагає останній. Angular використовує це для HTTP_INTERCEPTORS, APP_INITIALIZER і валідаторів - усюди, де кілька незалежних частин застосунку хочуть додати по одному елементу в список. Без multi друга реєстрація тихо замінила б першу, і цей баг справді важко побачити.",
    },
    code: 'providers: [\n  { provide: VALIDATORS, useValue: emailValidator, multi: true },\n  { provide: VALIDATORS, useValue: lengthValidator, multi: true },\n];\n\n// Resolves to both, in registration order:\nconst validators = inject(VALIDATORS);   // [emailValidator, lengthValidator]\n\n// Without multi, the second provider would simply win.',
  },
  {
    id: 'q-environment-injector',
    category: 'di',
    q: {
      en: 'What is an EnvironmentInjector, and how does it differ from an element injector?',
      uk: 'Що таке EnvironmentInjector і чим він відрізняється від інжектора елемента?',
    },
    a: {
      en: 'The environment injector holds providers not tied to any element: the root injector built from ApplicationConfig, and one per lazy route that declares providers. An element injector is created per component or directive instance and follows the DOM. The environment one lives as long as the application or the route, which is why route-level providers are the right home for state shared by a feature and disposed with it.',
      uk: "Environment-інжектор тримає провайдери, не прив'язані до жодного елемента: кореневий, побудований з ApplicationConfig, і по одному на кожен лінивий маршрут, що оголошує провайдери. Інжектор елемента створюється на кожен екземпляр компонента чи директиви і повторює DOM. Environment живе стільки ж, скільки застосунок або маршрут, - саме тому провайдери рівня маршруту є правильним домом для стану, спільного для фічі й знищуваного разом з нею.",
    },
    code: '// One environment injector for this route subtree, gone when you navigate away\nexport const routes: Routes = [\n  {\n    path: "checkout",\n    providers: [CheckoutState, provideCheckoutFeature()],\n    loadChildren: () => import("./checkout/checkout.routes"),\n  },\n];',
  },
  {
    id: 'q-provider-functions',
    category: 'di',
    q: {
      en: 'Why do modern Angular APIs ship provider functions such as provideHttpClient and provideRouter?',
      uk: 'Чому сучасні API Angular постачають функції-провайдери на кшталт provideHttpClient і provideRouter?',
    },
    a: {
      en: 'Because a function can return only the providers its arguments ask for, so an unused feature is never referenced and the bundler removes it. A module could not do that - importing HttpClientModule pulled in interceptor support, JSONP and the rest whether or not you used them. The with* options make the choices explicit at the call site, which also makes the configuration readable in one place.',
      uk: 'Бо функція може повернути лише ті провайдери, про які просять її аргументи, тож невикористана можливість ніде не згадана і бандлер її прибирає. Модуль так не міг: імпорт HttpClientModule тягнув підтримку інтерсепторів, JSONP і решту незалежно від того, чи ти ними користувався. Опції with* роблять вибір явним у місці виклику, і це водночас робить конфігурацію читабельною в одному місці.',
    },
    code: 'provideHttpClient(\n  withInterceptors([authInterceptor]),   // included\n  withFetch(),                            // included\n  // no withJsonpSupport() -> that code is not in the bundle\n);\n\nprovideRouter(routes, withComponentInputBinding(), withViewTransitions());',
  },
  {
    id: 'q-forroot-pattern',
    category: 'di',
    q: {
      en: 'What problem did the forRoot pattern solve, and what replaced it?',
      uk: 'Яку проблему вирішував патерн forRoot і що прийшло йому на зміну?',
    },
    a: {
      en: 'It separated "import this module for its declarations" from "import it and register its singletons", so a feature module could use a library without creating a second copy of its services - the classic symptom being two Router instances. Provider functions replaced it: a provide* call registers services and an ordinary import brings in declarations, so the two concerns cannot be confused in the first place.',
      uk: 'Він розділяв "імпортуй цей модуль заради його оголошень" і "імпортуй і зареєструй його синглтони", щоб модуль фічі міг користуватися бібліотекою, не створюючи другу копію її сервісів, - класичним симптомом були два екземпляри Router. На зміну прийшли функції-провайдери: виклик provide* реєструє сервіси, а звичайний імпорт приносить оголошення, тож переплутати ці дві речі більше неможливо.',
    },
    code: '// Then: two calls, and calling the wrong one duplicated the singletons\nRouterModule.forRoot(routes)     // once, at the application root\nRouterModule.forChild(routes)    // in every feature module\n\n// Now: registration is a function call, and imports are just imports\nprovideRouter(routes)',
  },
  {
    id: 'q-di-circular-dependency',
    category: 'di',
    q: {
      en: 'How do you diagnose and break a circular dependency between two services?',
      uk: 'Як діагностувати і розірвати циклічну залежність між двома сервісами?',
    },
    a: {
      en: 'Angular reports it as NG0200 with the cycle in the message. The real fix is almost always structural: the two services share a responsibility that belongs in a third, or one of them should be emitting an event rather than calling the other. forwardRef defers the reference and makes the error go away, but it leaves the cycle in place - reach for it only when the cycle is genuinely intended, as in a self-referencing tree structure.',
      uk: 'Angular повідомляє про це як NG0200 з описом циклу. Справжнє виправлення майже завжди структурне: два сервіси ділять відповідальність, яка належить третьому, або один з них має емітити подію, а не викликати інший. forwardRef відкладає посилання і прибирає помилку, але лишає цикл на місці - бери його лише тоді, коли цикл справді задуманий, як у самопосилальній деревоподібній структурі.',
    },
    code: '// NG0200: Circular dependency in DI detected for AuthService\n// AuthService -> ApiService -> AuthService\n\n// Structural fix: the shared piece moves down\n@Injectable({ providedIn: "root" })\nexport class TokenStore {}          // both depend on this, neither on each other\n\n// Escape hatch, when the cycle is intentional:\nprivate readonly parent = inject(forwardRef(() => TreeNodeService));',
  },
  {
    id: 'q-nullinjectorerror',
    category: 'di',
    q: {
      en: 'What does NullInjectorError mean, and how do you read its message?',
      uk: 'Що означає NullInjectorError і як читати його повідомлення?',
    },
    a: {
      en: 'It means the search reached the null injector at the top of the chain without finding a provider. The message prints the resolution path, and you read it right to left: the last name is what was missing, the ones before it are who asked. The usual causes are a forgotten provide* call in the app config, a service used in a test whose TestBed does not provide it, and an interface used where a token was needed.',
      uk: "Це означає, що пошук дійшов до null-інжектора на вершині ланцюжка, не знайшовши провайдера. У повідомленні друкується шлях розв'язання, і читати його треба справа наліво: остання назва - те, чого бракує, попередні - ті, хто просив. Звичні причини: забутий виклик provide* у конфігу застосунку, сервіс у тесті, якого TestBed не надає, та інтерфейс там, де потрібен був токен.",
    },
    code: '// NullInjectorError: No provider for HttpClient!\n//   R3InjectorError(Standalone[UsersComponent])[UserService -> HttpClient]\n//                                                              ^ missing\n//                                                ^ who asked for it\n\n// The fix, in app.config.ts:\nproviders: [provideHttpClient()];',
  },
];
