import { VersionEntry } from '../../models/content.model';

export const V14: VersionEntry = {
  id: 'v14',
  label: 'v14',
  year: 2022,
  title: {
    en: 'Standalone components and typed forms',
    uk: 'Standalone-компоненти і типізовані форми',
  },
  points: [
    {
      id: 'v14-standalone-preview',
      head: { en: 'Standalone components', uk: 'Standalone-компоненти' },
      body: {
        en: 'A component can declare its own imports and be used without belonging to an NgModule. In developer preview here, and the beginning of the end for the declarations-and-exports boilerplate that had been there since v2.',
        uk: 'Компонент може оголошувати власні імпорти і використовуватися, не належачи до жодного NgModule. Тут це developer preview - і початок кінця для шаблонного коду з declarations та exports, який тягнувся ще з v2.',
      },
      code: '@Component({\n  standalone: true,\n  imports: [NgIf, RouterLink],   // what this template needs, on the component\n  selector: "user-card",\n  templateUrl: "./user-card.component.html",\n})\nexport class UserCardComponent {}',
    },
    {
      id: 'v14-typed-forms',
      head: { en: 'Typed reactive forms', uk: 'Типізовані реактивні форми' },
      body: {
        en: 'A control carries the type of its value, so value stops being any and a wrong key in a group fails to compile. It closed the most upvoted issue in the repository, and needed a migration because every existing form changed shape.',
        uk: 'Контрол несе тип свого значення, тож value перестає бути any, а хибний ключ у групі не компілюється. Це закрило issue з найбільшою кількістю голосів у репозиторії - і потребувало міграції, бо кожна наявна форма змінила форму типів.',
      },
      code: 'const form = new FormGroup({\n  email: new FormControl("", { nonNullable: true }),\n  age: new FormControl<number | null>(null),\n});\n\nform.value.email;    // string | undefined, not any\nform.value.nope;     // compile error',
    },
    {
      id: 'v14-nonnullable-reset',
      head: { en: 'nonNullable, and what reset does', uk: 'nonNullable і що робить reset' },
      body: {
        en: 'The flag worth knowing from typed forms: without it, reset() puts null back into the control and the type says so. NonNullableFormBuilder applies it to a whole form at once.',
        uk: 'Той прапорець із типізованих форм, який варто знати: без нього reset() повертає в контрол null, і тип чесно про це каже. NonNullableFormBuilder застосовує його до всієї форми одразу.',
      },
      code: 'const fb = inject(NonNullableFormBuilder);\nconst form = fb.group({ email: "", age: 0 });\n\nform.reset();          // back to "" and 0, not to null\nform.value.email;      // string',
    },
    {
      id: 'v14-inject-function',
      head: { en: 'inject() outside the constructor', uk: 'inject() поза конструктором' },
      body: {
        en: 'inject() became usable in a field initialiser and in factory functions. That one change is what made functional guards, functional interceptors and reusable injection helpers possible in the releases that followed.',
        uk: 'inject() став придатним для використання в ініціалізаторі поля та у фабричних функціях. Саме ця зміна уможливила функціональні guard-и, функціональні інтерсептори та перевикористовувані інжект-хелпери в наступних релізах.',
      },
      code: 'export class UserComponent {\n  private readonly http = inject(HttpClient);   // no constructor at all\n}\n\n// and, because it is just a function call, this now works too:\nexport function injectUser() {\n  return inject(UserService).current;\n}',
    },
    {
      id: 'v14-route-title',
      head: { en: 'Page title on the route', uk: 'Заголовок сторінки на маршруті' },
      body: {
        en: 'A route declares its title and the router sets document.title on navigation. It reads like a convenience and is really an accessibility fix: a screen reader announces the title on every route change, and single-page apps used to leave it at whatever the index said.',
        uk: 'Маршрут оголошує свій title, а роутер встановлює document.title під час навігації. Виглядає як зручність, а насправді це виправлення доступності: скрінрідер озвучує заголовок на кожній зміні маршруту, а SPA раніше лишали його таким, як в index.',
      },
      code: 'const routes: Routes = [\n  { path: "users", title: "Users", component: UsersComponent },\n  { path: "users/:id", title: userTitleResolver, component: UserComponent },\n];\n\n// or one TitleStrategy for the whole app, to append " | My App"',
    },
    {
      id: 'v14-loadcomponent',
      head: { en: 'Lazy loading a single component', uk: 'Ліниве завантаження одного компонента' },
      body: {
        en: 'With standalone components, a route can lazy-load a component instead of a module, and declare providers scoped to that route. Lazy loading stopped requiring an NgModule wrapper that existed for no other reason.',
        uk: 'Зі standalone-компонентами маршрут може ліниво завантажити компонент замість модуля і оголосити провайдери в межах цього маршруту. Ліниве завантаження перестало вимагати обгортки-NgModule, що існувала лише заради нього.',
      },
      code: '{\n  path: "admin",\n  providers: [AdminStore],                             // scoped to this route\n  loadComponent: () => import("./admin/admin.component")\n    .then((m) => m.AdminComponent),\n}',
    },
    {
      id: 'v14-protected-in-templates',
      head: { en: 'protected members in templates', uk: 'protected-члени в шаблонах' },
      body: {
        en: 'A template can read a protected field, so a component can expose to its own template exactly what the template needs and no more. It is now the style guide default for anything a template touches.',
        uk: 'Шаблон може читати protected-поле, тож компонент відкриває власному шаблону рівно те, що йому потрібно, і не більше. Сьогодні це типова рекомендація style guide для всього, чого торкається шаблон.',
      },
      code: 'export class UserComponent {\n  protected readonly user = signal<User | null>(null);   // template: yes\n  private readonly http = inject(HttpClient);            // template: no\n}',
    },
    {
      id: 'v14-testbed-unknown-elements',
      head: {
        en: 'Tests can fail on unknown elements',
        uk: 'Тести можуть падати на невідомих елементах',
      },
      body: {
        en: 'errorOnUnknownElements and errorOnUnknownProperties turn the NG0303 and NG0304 warnings into failures, so a test stops quietly passing against a component that was never imported.',
        uk: 'errorOnUnknownElements і errorOnUnknownProperties перетворюють попередження NG0303 і NG0304 на помилки, тож тест перестає тихо проходити проти компонента, який ніколи не був імпортований.',
      },
      code: 'TestBed.configureTestingModule({\n  errorOnUnknownElements: true,\n  errorOnUnknownProperties: true,\n});',
    },
    {
      id: 'v14-cli-autocomplete',
      head: { en: 'CLI autocompletion', uk: 'Автодоповнення в CLI' },
      body: {
        en: 'ng completion wires up shell completion for commands, options and schematic names - the CLI is large enough that this stopped being a nicety.',
        uk: 'ng completion налаштовує доповнення в оболонці для команд, опцій і назв схематик, - CLI досить великий, щоб це перестало бути дрібною приємністю.',
      },
      code: 'ng completion',
    },
  ],
};
