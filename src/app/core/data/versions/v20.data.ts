import { VersionEntry } from '../../models/content.model';

export const V20: VersionEntry = {
  id: 'v20',
  label: 'v20',
  year: 2025,
  title: {
    en: 'The signal APIs settle, and the style guide is rewritten',
    uk: 'Сигнальні API усталюються, а style guide переписано',
  },
  points: [
    {
      id: 'v20-signals-stable',
      head: { en: 'Signal APIs stable', uk: 'Сигнальні API стабільні' },
      body: {
        en: 'effect, linkedSignal, toSignal, toObservable and afterNextRender left developer preview with their timing fixed. afterRender was renamed afterEveryRender in the same pass, with no alias - the name had been misleading about how often it ran.',
        uk: 'effect, linkedSignal, toSignal, toObservable і afterNextRender вийшли з developer preview із зафіксованим моментом виконання. Тоді ж afterRender перейменували на afterEveryRender без псевдоніма - стара назва вводила в оману щодо частоти виконання.',
      },
    },
    {
      id: 'v20-httpresource',
      head: { en: 'httpResource', uk: 'httpResource' },
      body: {
        en: 'A resource whose loader is HttpClient: give it a URL built from signals and it refetches when they change, cancelling the request in flight and going through your interceptors on the way. The request must be reactive - a plain string is not accepted.',
        uk: 'Resource, завантажувачем якого є HttpClient: дай йому URL, побудований із сигналів, і він перезапитує дані при їхній зміні, скасовуючи запит у польоті і проходячи дорогою через твої інтерсептори. Запит має бути реактивним - звичайний рядок не приймається.',
      },
      code: 'readonly user = httpResource<User>(() => `/api/users/${this.userId()}`);\n\n// userId changes -> the old request is cancelled, a new one goes out\nuser.value();\nuser.isLoading();',
    },
    {
      id: 'v20-zoneless-preview',
      head: { en: 'Zoneless in developer preview', uk: 'Zoneless у developer preview' },
      body: {
        en: 'provideZonelessChangeDetection dropped the experimental prefix, and ng new gained a --zoneless flag and a prompt. The API had settled; what remained was the ecosystem catching up.',
        uk: 'provideZonelessChangeDetection позбувся префікса experimental, а ng new отримав прапорець --zoneless і запитання під час створення. API усталився; лишалося дочекатися екосистеми.',
      },
      code: 'bootstrapApplication(AppComponent, {\n  providers: [provideZonelessChangeDetection()],\n});',
    },
    {
      id: 'v20-style-guide',
      head: { en: 'A rewritten style guide', uk: 'Переписаний style guide' },
      body: {
        en: 'File naming changed: user.ts and class User rather than user.component.ts and UserComponent. The CLI generates the new way, existing projects are not required to follow, and angular.json can ask for the old convention back.',
        uk: "Змінилося іменування файлів: user.ts і клас User замість user.component.ts і UserComponent. CLI генерує по-новому, наявні проєкти переходити не зобов'язані, а angular.json може повернути стару домовленість.",
      },
      code: '// v20 and later\nng g c user     ->  user.ts, user.html      (class User)\n\n// before\nng g c user     ->  user.component.ts       (class UserComponent)',
    },
    {
      id: 'v20-structural-directives-deprecated',
      head: {
        en: '*ngIf, *ngFor and *ngSwitch deprecated',
        uk: '*ngIf, *ngFor і *ngSwitch застаріли',
      },
      body: {
        en: 'Deprecated in favour of the built-in blocks, with the migration available during ng update. A new extended diagnostic also catches a structural directive used without importing it - previously a silently empty element.',
        uk: 'Оголошені застарілими на користь вбудованих блоків, а міграція доступна під час ng update. Нова розширена діагностика також ловить структурну директиву, використану без імпорту, - раніше це був тихо порожній елемент.',
      },
    },
    {
      id: 'v20-extended-diagnostics',
      head: { en: 'Three diagnostics worth knowing', uk: 'Три діагностики, варті знання' },
      body: {
        en: 'uninvokedTrackFunction catches track getId without the call; unparenthesizedNullishCoalescing demands parentheses when ?? meets && or ||; missingStructuralDirective catches the unimported directive. All three describe bugs that used to be invisible.',
        uk: 'uninvokedTrackFunction ловить track getId без виклику; unparenthesizedNullishCoalescing вимагає дужок, коли ?? зустрічається з && чи ||; missingStructuralDirective ловить неімпортовану директиву. Усі три описують баги, які раніше були невидимі.',
      },
      code: '@for (u of users(); track getId) { }      <!-- NG8115: not invoked -->\n{{ a ?? b && c }}                        <!-- NG8114: add parentheses -->',
    },
    {
      id: 'v20-host-binding-type-check',
      head: { en: 'Host bindings are type-checked', uk: "Host-прив'язки перевіряються за типами" },
      body: {
        en: 'typeCheckHostBindings validates both sides of a host binding: that the property exists on the element and that the expression exists on the class. Typos in the host object stopped being silent.',
        uk: "typeCheckHostBindings перевіряє обидві сторони host-прив'язки: що властивість існує на елементі і що вираз існує в класі. Помилки в об'єкті host перестали бути мовчазними.",
      },
      code: '@Component({\n  host: { "[value]": "text()" },   // error on a <label> host: no such property\n})',
    },
    {
      id: 'v20-create-component-bindings',
      head: { en: 'Bindings for dynamic components', uk: "Прив'язки для динамічних компонентів" },
      body: {
        en: 'createComponent takes inputBinding, outputBinding and twoWayBinding, and can apply directives to the created component. Creating a component in code stopped meaning setting instance fields and calling detectChanges by hand.',
        uk: 'createComponent приймає inputBinding, outputBinding і twoWayBinding, а також може застосовувати директиви до створеного компонента. Створення компонента в коді перестало означати ручне присвоєння полів і виклик detectChanges.',
      },
      code: 'createComponent(UserCard, {\n  bindings: [\n    inputBinding("user", () => this.user()),\n    outputBinding<User>("picked", (u) => this.pick(u)),\n  ],\n});',
    },
    {
      id: 'v20-profiling',
      head: { en: 'enableProfiling()', uk: 'enableProfiling()' },
      body: {
        en: 'Angular tags its own work - change detection, template execution, outputs, defer - with the browser performance API, so a Chrome DevTools trace shows which component actually costs the frame.',
        uk: 'Angular позначає власну роботу - change detection, виконання шаблонів, outputs, defer - через браузерний performance API, тож трасування в Chrome DevTools показує, який саме компонент коштує кадру.',
      },
    },
    {
      id: 'v20-build-slimming',
      head: { en: 'A lighter default project', uk: 'Легший проєкт за замовчуванням' },
      body: {
        en: 'New projects depend on @angular/build directly instead of @angular-devkit/build-angular, dropping roughly 200MB of webpack transitive dependencies, and the browserslist moved to a "widely available" baseline.',
        uk: 'Нові проєкти залежать від @angular/build напряму замість @angular-devkit/build-angular, скидаючи близько 200 МБ транзитивних залежностей webpack, а browserslist перейшов на базу "широко доступних" браузерів.',
      },
    },
  ],
};
