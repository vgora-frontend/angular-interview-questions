import { VersionEntry } from '../../models/content.model';

export const V2: VersionEntry = {
  id: 'v2',
  label: 'v2',
  year: 2016,
  title: {
    en: 'The rewrite: components, TypeScript, one-way flow',
    uk: 'Переписування з нуля: компоненти, TypeScript, односпрямований потік',
  },
  points: [
    {
      id: 'v2-components',
      head: { en: 'Components replaced controllers', uk: 'Компоненти замінили контролери' },
      body: {
        en: 'A class with a decorator, its own template and its own styles, arranged in a tree. Scopes were gone: a component owns its state as plain fields, and what it exchanges with the outside world is declared as inputs and outputs.',
        uk: 'Клас із декоратором, власним шаблоном і власними стилями, вибудуваний у дерево. Scope зник: компонент володіє своїм станом як звичайними полями, а те, чим він обмінюється із зовнішнім світом, оголошується як inputs і outputs.',
      },
      code: '@Component({\n  selector: "user-card",\n  templateUrl: "./user-card.component.html",\n})\nexport class UserCardComponent {\n  @Input() user: User;                            // what comes in\n  @Output() pick = new EventEmitter<User>();      // what goes out\n}',
    },
    {
      id: 'v2-typescript',
      head: { en: 'TypeScript and decorators', uk: 'TypeScript і декоратори' },
      body: {
        en: 'Metadata moved from convention into decorators the compiler can read, which is what later made ahead-of-time compilation and template type checking possible at all. TypeScript was not required, but everything about the framework was designed for it.',
        uk: "Метадані переїхали з домовленостей у декоратори, які може прочитати компілятор, - саме це згодом уможливило AOT-компіляцію і перевірку типів у шаблонах. TypeScript не був обов'язковим, але весь дизайн фреймворку був розрахований на нього.",
      },
    },
    {
      id: 'v2-one-way-flow',
      head: { en: 'One-way data flow', uk: 'Односпрямований потік даних' },
      body: {
        en: 'Data flows down through inputs, events travel up through outputs, and change detection runs once per tick from the root down. Two-way binding survived only as sugar over that pair, and writing to a value already checked in this pass throws in development instead of quietly re-running the loop.',
        uk: "Дані течуть униз через inputs, події йдуть угору через outputs, а change detection проходить раз на tick від кореня вниз. Двостороннє зв'язування лишилося тільки як цукор над цією парою, а запис у значення, вже перевірене в цьому проході, кидає помилку в режимі розробки замість тихого перезапуску циклу.",
      },
      code: '<user-card [user]="selected" (pick)="onPick($event)"></user-card>\n\n<!-- [(x)] is only sugar for the pair above -->\n<input [(ngModel)]="name">\n<input [ngModel]="name" (ngModelChange)="name = $event">',
    },
    {
      id: 'v2-template-syntax',
      head: { en: 'Brackets and parentheses', uk: 'Квадратні й круглі дужки' },
      body: {
        en: 'Binding syntax became punctuation with meaning: [] binds a property, () binds an event, # names a template reference. Nothing is a directive any more - the template compiler reads them, so a typo in a property name is a compile error.',
        uk: "Синтаксис зв\'язування став пунктуацією зі значенням: [] прив\'язує властивість, () - подію, # називає посилання в шаблоні. Це вже не директиви - їх читає компілятор шаблонів, тож помилка в назві властивості є помилкою компіляції.",
      },
      code: '<input #box [value]="name" (input)="name = box.value">\n\n<!-- and the DOM property, not the attribute: this is why -->\n<button [disabled]="busy">Save</button>       <!-- boolean, not "false" -->',
    },
    {
      id: 'v2-hierarchical-di',
      head: { en: 'Hierarchical dependency injection', uk: "Ієрархічна ін'єкція залежностей" },
      body: {
        en: 'Injectors mirror the component tree, so a provider declared on a component gives that subtree its own instance and everyone above keeps theirs. It is what makes per-feature state, and per-dialog services, possible without a global registry.',
        uk: 'Інжектори повторюють дерево компонентів, тож провайдер, оголошений на компоненті, дає цьому піддереву власний екземпляр, а всі вище лишаються зі своїм. Саме це уможливлює стан на рівні фічі й сервіси на рівні діалогу без глобального реєстру.',
      },
      code: '@Component({\n  selector: "user-editor",\n  providers: [DraftStore],   // one DraftStore per editor, not per app\n})\nexport class UserEditorComponent {\n  constructor(private draft: DraftStore) {}\n}',
    },
    {
      id: 'v2-zone-js',
      head: { en: 'zone.js drove change detection', uk: 'zone.js керував change detection' },
      body: {
        en: 'zone.js patched the async APIs - timers, events, XHR - so the framework knew when something might have changed and could run a check by itself. It is what replaced $apply, and what the zoneless work of the last few releases has been unwinding.',
        uk: 'zone.js патчив асинхронні API - таймери, події, XHR, - щоб фреймворк знав, коли щось могло змінитися, і міг сам запустити перевірку. Саме це замінило $apply, і саме це розплутує zoneless-робота останніх релізів.',
      },
    },
    {
      id: 'v2-rxjs',
      head: { en: 'RxJS came in with the framework', uk: 'RxJS прийшов разом із фреймворком' },
      body: {
        en: 'Http returned an Observable, EventEmitter was one, and the router exposed its events as streams. Learning Angular meant learning RxJS, which is the single biggest reason the framework had the reputation for a steep curve.',
        uk: 'Http повертав Observable, EventEmitter був ним, а роутер віддавав свої події потоками. Вивчити Angular означало вивчити RxJS, - і це головна причина репутації фреймворку як складного для входу.',
      },
      code: 'this.http.get("/api/users")\n  .map((response) => response.json())   // yes, this was necessary\n  .subscribe((users) => this.users = users);',
    },
    {
      id: 'v2-ngmodules',
      head: { en: 'NgModules, and the boilerplate', uk: 'NgModule і шаблонний код' },
      body: {
        en: 'Every component had to be declared in exactly one module, and used elsewhere only if that module exported it and the other imported it. It organised nothing the file system did not already organise, and took until v15 to become optional.',
        uk: "Кожен компонент мусив бути оголошений рівно в одному модулі й використовувався деінде лише тоді, коли той модуль його експортував, а інший імпортував. Це не впорядковувало нічого, чого не впорядковувала файлова система, - і стало необов'язковим аж у v15.",
      },
      code: '@NgModule({\n  declarations: [UserCardComponent],   // it belongs here, and only here\n  imports: [CommonModule],\n  exports: [UserCardComponent],        // ...and nobody else sees it without this\n})\nexport class UserModule {}',
    },
  ],
};
