import { VersionEntry } from '../../models/content.model';

export const V15: VersionEntry = {
  id: 'v15',
  label: 'v15',
  year: 2022,
  title: {
    en: 'Standalone APIs stable, and composition over inheritance',
    uk: 'Standalone API стабільні, і композиція замість успадкування',
  },
  points: [
    {
      id: 'v15-standalone-stable',
      head: { en: 'An app with no NgModule', uk: 'Застосунок без жодного NgModule' },
      body: {
        en: 'bootstrapApplication, provideRouter, provideHttpClient: the standalone APIs left developer preview and covered the whole surface, so an app can be built end to end without declaring a module anywhere.',
        uk: 'bootstrapApplication, provideRouter, provideHttpClient: standalone-API вийшли з developer preview і покрили всю поверхню, тож застосунок можна побудувати від початку до кінця, не оголосивши жодного модуля.',
      },
      code: 'bootstrapApplication(AppComponent, {\n  providers: [\n    provideRouter(routes),\n    provideHttpClient(withInterceptors([authInterceptor])),\n  ],\n});',
    },
    {
      id: 'v15-functional-guards',
      head: { en: 'Functional guards and resolvers', uk: 'Функціональні guard-и та resolver-и' },
      body: {
        en: 'A guard is now a function that injects what it needs, so the class, its @Injectable and its provider all disappear. Composing two guards became composing two functions.',
        uk: 'Guard тепер є функцією, яка інжектить те, що їй потрібно, тож клас, його @Injectable і провайдер зникають. Скомпонувати два guard-и стало те саме, що скомпонувати дві функції.',
      },
      code: 'export const authGuard: CanActivateFn = () => {\n  const auth = inject(AuthService);\n  return auth.isLoggedIn() || inject(Router).createUrlTree(["/login"]);\n};\n\n{ path: "admin", canActivate: [authGuard], component: AdminComponent }',
    },
    {
      id: 'v15-functional-interceptors',
      head: { en: 'Functional HTTP interceptors', uk: 'Функціональні HTTP-інтерсептори' },
      body: {
        en: 'The same treatment for interceptors: a function passed to withInterceptors, instead of a class plus an HTTP_INTERCEPTORS multi-provider nobody remembered the shape of.',
        uk: "Те саме для інтерсепторів: функція, передана у withInterceptors, замість класу плюс multi-провайдера HTTP_INTERCEPTORS, форму якого ніхто не пам'ятав.",
      },
      code: 'export const authInterceptor: HttpInterceptorFn = (req, next) =>\n  next(req.clone({ setHeaders: { Authorization: inject(Auth).token() } }));\n\nprovideHttpClient(withInterceptors([authInterceptor]));',
    },
    {
      id: 'v15-host-directives',
      head: { en: 'Directive composition', uk: 'Композиція директив' },
      body: {
        en: 'hostDirectives applies a directive from inside a component, so shared behaviour is composed onto it rather than repeated in every template that uses it - and inherited from a base class even less often.',
        uk: 'hostDirectives застосовує директиву зсередини компонента, тож спільна поведінка компонується в нього, а не повторюється в кожному шаблоні, що його використовує, - і тим паче не успадковується від базового класу.',
      },
      code: '@Component({\n  selector: "app-menu",\n  hostDirectives: [CdkTrapFocus, { directive: HasColor, inputs: ["color"] }],\n  templateUrl: "./menu.html",\n})\nexport class MenuComponent {}   // focus trapping without a line in the template',
    },
    {
      id: 'v15-ngoptimizedimage',
      head: { en: 'NgOptimizedImage stable', uk: 'NgOptimizedImage стабільний' },
      body: {
        en: 'A drop-in image directive that makes width and height mandatory, generates srcset from sizes, lazy-loads by default and warns in development about the mistakes that cost you LCP.',
        uk: "Директива-заміна для зображень, яка робить width і height обов'язковими, генерує srcset із sizes, за замовчуванням лінива і в режимі розробки попереджає про помилки, що коштують тобі LCP.",
      },
      code: '<img ngSrc="hero.jpg" width="1200" height="630" priority alt="">\n<img ngSrc="row.jpg" width="80" height="80" alt="">   <!-- lazy by default -->',
    },
    {
      id: 'v15-default-export-routes',
      head: {
        en: 'Lazy routes unwrap a default export',
        uk: 'Ліниві маршрути розгортають default-експорт',
      },
      body: {
        en: 'If the lazy-loaded file has a default export, the .then() disappears. A small syntactic win that makes route files read like a list rather than a list of promises.',
        uk: 'Якщо ліниво завантажений файл має default-експорт, .then() зникає. Невелика синтаксична перемога, після якої файл маршрутів читається як список, а не як список промісів.',
      },
      code: '// admin.component.ts -> export default class AdminComponent {}\n\nloadComponent: () => import("./admin/admin.component")   // no .then()',
    },
    {
      id: 'v15-stack-traces',
      head: { en: 'Readable stack traces', uk: 'Читабельні стектрейси' },
      body: {
        en: 'Zone.js and framework frames were folded away, so an error in your code shows your code. The change is small in engineering and enormous in the time it takes to read a production error.',
        uk: 'Кадри zone.js і фреймворку прибрали, тож помилка у твоєму коді показує твій код. Інженерно зміна невелика і величезна за часом, який займає читання продакшен-помилки.',
      },
    },
    {
      id: 'v15-mdc-material',
      head: { en: 'Material on MDC Web', uk: 'Material на MDC Web' },
      body: {
        en: 'The component library was rebuilt on Material Design Components for the web. It was the release that broke a lot of custom styling, because the DOM and class names underneath every component changed.',
        uk: 'Бібліотеку компонентів перебудували на Material Design Components for the web. Саме цей реліз зламав багато кастомних стилів, бо DOM і назви класів під кожним компонентом змінилися.',
      },
    },
    {
      id: 'v15-esbuild-preview',
      head: { en: 'The esbuild builder, in preview', uk: 'Збірник на esbuild у preview' },
      body: {
        en: 'An opt-in browser-esbuild builder appeared, reporting large drops in build time. It became the default two releases later.',
        uk: 'Зявився опційний збірник browser-esbuild, який показував великі скорочення часу збірки. Через два релізи він став типовим.',
      },
    },
  ],
};
