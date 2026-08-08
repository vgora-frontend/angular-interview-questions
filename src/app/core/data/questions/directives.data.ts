import { Question } from '../../models/content.model';

// Directive kinds, custom directives, host directives and the built-in ones.
export const DIRECTIVES_QUESTIONS: Question[] = [
  {
    id: 'q-directive-kinds',
    category: 'directives',
    q: {
      en: 'What kinds of directives does Angular have?',
      uk: 'Які види директив існують в Angular?',
    },
    a: {
      en: 'Three, and the third is a technicality: components, which are directives with a template; attribute directives, which change the appearance or behaviour of an existing element; and structural directives, which add or remove elements by manipulating a view container. With built-in control flow, structural directives are now something you write occasionally rather than something you use every day.',
      uk: 'Три, і третій - формальність: компоненти, тобто директиви з шаблоном; атрибутивні директиви, що змінюють вигляд або поведінку наявного елемента; і структурні директиви, які додають чи прибирають елементи, керуючи контейнером виглядів. З вбудованим control flow структурні директиви тепер радше щось, що ти інколи пишеш, ніж щось, чим користуєшся щодня.',
    },
    code: '@Component({ selector: "app-card", templateUrl: "./card.html" })   // 1\nexport class CardComponent {}\n\n@Directive({ selector: "[appHighlight]" })                         // 2\nexport class HighlightDirective {}\n\n@Directive({ selector: "[appRepeat]" })                            // 3\nexport class RepeatDirective {\n  private readonly container = inject(ViewContainerRef);\n}',
  },
  {
    id: 'q-attribute-directive-example',
    category: 'directives',
    q: {
      en: 'Can you give an example of an attribute directive and what it is good for?',
      uk: 'Наведи приклад атрибутивної директиви і поясни, для чого вона корисна.',
    },
    a: {
      en: 'Anything that adds cross-cutting behaviour to elements you did not write: autofocus, a click-outside handler, an analytics tag, an accessibility fix applied to every button. The value is that it attaches to existing markup, so one directive can cover a hundred call sites without any of them changing shape. Keep it to behaviour - a directive that renders its own content wanted to be a component.',
      uk: 'Будь-що, що додає наскрізну поведінку елементам, яких ти не писав: автофокус, обробник кліка поза елементом, аналітичний тег, виправлення доступності для всіх кнопок. Цінність у тому, що директива чіпляється до наявної розмітки, тож одна директива покриває сотню місць використання, і жодне з них не змінює форму. Тримайся поведінки: директива, що рендерить власний вміст, хотіла бути компонентом.',
    },
    code: '@Directive({\n  selector: "[appClickOutside]",\n  host: { "(document:click)": "onDocumentClick($event)" },\n})\nexport class ClickOutsideDirective {\n  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);\n  readonly clickedOutside = output<void>();\n\n  protected onDocumentClick(event: MouseEvent): void {\n    if (!this.element.nativeElement.contains(event.target as Node)) {\n      this.clickedOutside.emit();\n    }\n  }\n}',
  },
  {
    id: 'q-structural-directive-desugar',
    category: 'directives',
    q: {
      en: 'What does the asterisk in a structural directive desugar to?',
      uk: 'На що розгортається зірочка у структурній директиві?',
    },
    a: {
      en: 'An ng-template wrapping the element, with the directive and its inputs moved onto that template. This is why the element does not exist until the directive renders it, why two structural directives cannot share an element - they would both want to own the same wrapper - and why the directive receives a TemplateRef rather than an element.',
      uk: 'На ng-template, що обгортає елемент, з директивою та її інпутами, перенесеними на цей шаблон. Саме тому елемент не існує, доки директива його не відрендерить, тому дві структурні директиви не можуть бути на одному елементі - обидві захотіли б володіти тією самою обгорткою - і тому директива отримує TemplateRef, а не елемент.',
    },
    code: '<div *appUnless="isReady">Loading</div>\n\n<!-- is exactly this: -->\n<ng-template [appUnless]="isReady">\n  <div>Loading</div>\n</ng-template>',
  },
  {
    id: 'q-custom-structural-directive',
    category: 'directives',
    q: {
      en: 'How do you write a custom structural directive with TemplateRef and ViewContainerRef?',
      uk: 'Як написати власну структурну директиву за допомогою TemplateRef і ViewContainerRef?',
    },
    a: {
      en: 'Inject both: TemplateRef is the markup you were handed, ViewContainerRef is the slot where you may render it. Create the view when the condition says to, clear the container when it does not. The rule that catches people is that createEmbeddedView appends every time it is called, so you must clear first or check whether a view already exists - otherwise the block multiplies on each update.',
      uk: 'Інжектуй обидва: TemplateRef - це передана тобі розмітка, ViewContainerRef - місце, куди її можна відрендерити. Створюй вигляд, коли умова цього вимагає, і очищай контейнер, коли ні. Правило, на якому спотикаються: createEmbeddedView додає вигляд щоразу, коли його викликано, тож треба спершу очистити або перевірити, чи вигляд уже є, - інакше блок множиться на кожному оновленні.',
    },
    code: '@Directive({ selector: "[appUnless]" })\nexport class UnlessDirective {\n  private readonly template = inject(TemplateRef<unknown>);\n  private readonly container = inject(ViewContainerRef);\n\n  readonly appUnless = input.required<boolean>();\n\n  constructor() {\n    effect(() => {\n      this.container.clear();               // without this it appends forever\n      if (!this.appUnless()) {\n        this.container.createEmbeddedView(this.template);\n      }\n    });\n  }\n}',
  },
  {
    id: 'q-structural-directive-input-naming',
    category: 'directives',
    q: {
      en: "Why must a structural directive's inputs be named after its selector?",
      uk: 'Чому інпути структурної директиви мають називатися за її селектором?',
    },
    a: {
      en: 'Because the microsyntax builds input names by concatenation. In *appIf="cond; else other", the part before the semicolon binds to an input called appIf, and else becomes appIfElse. Get the prefix wrong and the binding silently goes nowhere - the directive runs with an undefined input, which usually looks like a block that never renders.',
      uk: 'Бо мікросинтаксис будує імена інпутів конкатенацією. У *appIf="cond; else other" частина до крапки з комою прив\'язується до інпуту з іменем appIf, а else стає appIfElse. Помилися з префіксом - і прив\'язка тихо піде в нікуди: директива працюватиме з невизначеним інпутом, що зазвичай має вигляд блоку, який ніколи не рендериться.',
    },
    code: '@Directive({ selector: "[appIf]" })\nexport class IfDirective {\n  readonly appIf = input.required<boolean>();              // the value itself\n  readonly appIfElse = input<TemplateRef<unknown>>();      // the "else" key\n}\n\n<div *appIf="ready; else spinner">...</div>\n<ng-template #spinner>...</ng-template>',
  },
  {
    id: 'q-directive-selectors',
    category: 'directives',
    q: {
      en: 'What selector forms can a directive use, and how do you scope one to a single element type?',
      uk: 'Які форми селекторів може мати директива і як обмежити її одним типом елемента?',
    },
    a: {
      en: 'The usual CSS forms: attribute, class, element, and combinations of them, plus :not(). Combine an element with an attribute to scope a directive to one tag - button[appConfirm] applies only to buttons, so it cannot be attached to a div where its keyboard behaviour would be wrong. That is worth doing deliberately: the selector is the only place you can enforce where a directive may be used.',
      uk: "Звичайні CSS-форми: атрибут, клас, елемент і їхні комбінації, плюс :not(). Поєднай елемент з атрибутом, щоб обмежити директиву одним тегом: button[appConfirm] застосується лише до кнопок, тож його не почепиш на div, де його клавіатурна поведінка була б неправильною. Робити це варто свідомо: селектор - єдине місце, де можна нав'язати, де саме директиву дозволено вживати.",
    },
    code: '@Directive({ selector: "button[appConfirm]" })   // buttons only\n@Directive({ selector: "[appTip]:not([disabled])" })\n@Directive({ selector: "img[ngSrc]" })          // how NgOptimizedImage does it\n@Directive({ selector: ".tracked" })            // by class, rarely a good idea',
  },
  {
    id: 'q-create-directive-cli',
    category: 'directives',
    q: {
      en: 'How do you generate a directive with the CLI, and what does it scaffold?',
      uk: 'Як згенерувати директиву через CLI і що саме буде створено?',
    },
    a: {
      en: 'ng generate directive with a path. You get the class with a selector already prefixed from the project config, and a spec file next to it. Generating rather than hand-writing matters mainly for the selector prefix: a directive selector without one can collide with a library or, worse, with a future HTML attribute.',
      uk: 'ng generate directive зі шляхом. Ти отримаєш клас із селектором, уже префіксованим за конфігом проєкту, і спек-файл поруч. Генерувати, а не писати руками, важливо передусім через префікс селектора: селектор директиви без нього може зіткнутися з бібліотекою або, що гірше, з майбутнім HTML-атрибутом.',
    },
    code: 'ng generate directive shared/autofocus\n\n# CREATE src/app/shared/autofocus.ts\n# CREATE src/app/shared/autofocus.spec.ts\n\n# The prefix comes from angular.json:\n#   "schematics": { "@schematics/angular:directive": { "prefix": "app" } }',
  },
  {
    id: 'q-host-directives',
    category: 'directives',
    q: {
      en: 'What are host directives, and what problem do they solve that inheritance does not?',
      uk: 'Що таке host-директиви і яку проблему вони вирішують краще за успадкування?',
    },
    a: {
      en: 'They let a component or directive apply other directives to its own host element, declaratively, without the consumer knowing. Inheritance gives you one base class and drags its whole surface along; host directives compose several small behaviours and let you choose which of their inputs to expose. It is the difference between "is a" and "has the behaviour of", and the second composes.',
      uk: 'Вони дозволяють компоненту чи директиві застосувати інші директиви до власного хост-елемента - декларативно і непомітно для споживача. Успадкування дає один базовий клас і тягне за собою всю його поверхню; host-директиви компонують кілька маленьких поведінок і дозволяють обрати, які з їхніх інпутів відкрити. Це різниця між "є" і "має поведінку", і компонується саме друге.',
    },
    code: '@Component({\n  selector: "app-menu",\n  templateUrl: "./menu.html",\n  hostDirectives: [CdkTrapFocus, ClickOutsideDirective],\n})\nexport class MenuComponent {}\n\n// The consumer writes <app-menu /> and gets focus trapping\n// plus outside-click handling, without knowing either exists.',
  },
  {
    id: 'q-directive-composition-api',
    category: 'directives',
    q: {
      en: "How does the directive composition API let you expose a host directive's inputs?",
      uk: 'Як API композиції директив дозволяє відкрити назовні інпути host-директиви?',
    },
    a: {
      en: 'By listing them explicitly, optionally renaming as you go. Nothing is exposed by default, which is the important part: the host directive is an implementation detail until you decide otherwise, so you can swap it later without breaking anyone. Outputs work the same way. Only inputs and outputs are re-exported - the directive instance itself stays private.',
      uk: 'Через явний перелік, за бажання з перейменуванням. За замовчуванням не відкривається нічого, і це головне: host-директива лишається деталлю реалізації, доки ти не вирішиш інакше, тож потім її можна замінити, нікого не зламавши. Аутпути працюють так само. Реекспортуються лише інпути та аутпути - сам екземпляр директиви лишається приватним.',
    },
    code: '@Component({\n  selector: "app-menu",\n  templateUrl: "./menu.html",\n  hostDirectives: [\n    {\n      directive: ClickOutsideDirective,\n      inputs: ["enabled: closeOnOutsideClick"],   // renamed on the way out\n      outputs: ["clickedOutside: dismissed"],\n    },\n  ],\n})\nexport class MenuComponent {}\n\n<app-menu [closeOnOutsideClick]="true" (dismissed)="close()" />',
  },
  {
    id: 'q-ngclass-vs-class-binding',
    category: 'directives',
    q: {
      en: 'What is the difference between ngClass and a class binding?',
      uk: "Яка різниця між ngClass і прив'язкою class?",
    },
    a: {
      en: 'ngClass is a directive that takes a string, array or object and diffs it against what is on the element; a class binding compiles to a direct instruction that toggles one named class. The binding is faster, needs no import, and states each class name on its own line where you can search for it. The one thing ngClass still does more neatly is a set of classes computed elsewhere - and [class] takes that too.',
      uk: "ngClass - це директива, яка приймає рядок, масив чи об'єкт і діфає його з тим, що вже є на елементі; прив'язка class компілюється у пряму інструкцію, що перемикає один названий клас. Прив'язка швидша, не потребує імпорту і називає кожен клас в окремому рядку, де його можна знайти пошуком. Єдине, що ngClass досі робить охайніше, - набір класів, обчислений деінде, але [class] приймає і це.",
    },
    code: '<!-- Preferred -->\n<div [class.active]="isActive()" [class.pinned]="isPinned()"></div>\n\n<!-- Same result, extra directive, new object on every check -->\n<div [ngClass]="{ active: isActive(), pinned: isPinned() }"></div>\n\n<!-- A computed set is fine as a plain class binding -->\n<div [class]="stateClasses()"></div>',
  },
  {
    id: 'q-ngstyle-vs-style-binding',
    category: 'directives',
    q: {
      en: 'What is the difference between ngStyle and a style binding?',
      uk: "Яка різниця між ngStyle і прив'язкою style?",
    },
    a: {
      en: 'The same story as ngClass: a directive diffing an object versus a compiled instruction. The style binding also carries units in the syntax - style.width.px takes a plain number - which removes the string concatenation that ngStyle otherwise invites. Both are a last resort anyway: a class that a stylesheet defines survives a design change better than a value hard-coded in a template.',
      uk: "Історія та сама, що з ngClass: директива, яка діфає об'єкт, проти скомпільованої інструкції. До того ж прив'язка style несе одиниці прямо в синтаксисі - style.width.px приймає просто число, - що прибирає конкатенацію рядків, до якої інакше схиляє ngStyle. Утім обидва варіанти - крайній засіб: клас, визначений у таблиці стилів, переживає зміну дизайну краще, ніж значення, зашите в шаблон.",
    },
    code: '<div [style.width.px]="width()" [style.--accent]="color()"></div>\n\n<!-- Same, with an object rebuilt on every check -->\n<div [ngStyle]="{ width: width() + \'px\' }"></div>\n\n<!-- Usually better than either: let CSS own the values -->\n<div class="panel" [class.panel-wide]="isWide()"></div>',
  },
  {
    id: 'q-ngmodel-directive',
    category: 'directives',
    q: {
      en: 'What does the ngModel directive do, and which module has to be imported for it?',
      uk: 'Що робить директива ngModel і який модуль треба імпортувати для неї?',
    },
    a: {
      en: 'It creates a FormControl for the element it sits on and binds it two ways to a property, which is the whole of template-driven forms. It needs FormsModule. In a reactive form it has no place - mixing ngModel with formControlName means two owners for one value, which is why that combination was deprecated and then removed.',
      uk: "Вона створює FormControl для елемента, на якому стоїть, і двосторонньо прив'язує його до властивості - у цьому й полягають шаблонні форми. Потрібен FormsModule. У реактивній формі їй не місце: змішування ngModel із formControlName означає двох власників одного значення, тому цю комбінацію спочатку оголосили застарілою, а потім прибрали.",
    },
    code: '@Component({ selector: "app-login", templateUrl: "./login.html", imports: [FormsModule] })\nexport class LoginComponent {\n  protected email = "";\n}\n\n<input name="email" [(ngModel)]="email" />\n\n<!-- Removed: two owners for one value -->\n<input formControlName="email" [(ngModel)]="email" />',
  },
  {
    id: 'q-two-structural-directives',
    category: 'directives',
    q: {
      en: 'Why can two structural directives not sit on the same element, and how do you work around it?',
      uk: 'Чому дві структурні директиви не можуть бути на одному елементі і як це обійти?',
    },
    a: {
      en: 'Each one desugars into an ng-template wrapping the element, and two of them would need to own the same wrapper - there is no defined order, so Angular rejects it. Historically the fix was ng-container. With built-in control flow the question mostly evaporates: @if and @for are blocks, so nesting them is just nesting.',
      uk: 'Кожна з них розгортається в ng-template, що обгортає елемент, і дві директиви претендували б на ту саму обгортку - визначеного порядку немає, тож Angular це відхиляє. Історично рішенням був ng-container. З вбудованим control flow питання здебільшого зникає: @if і @for - це блоки, тож вкладати їх означає просто вкладати.',
    },
    code: '<!-- Error: two structural directives, one element -->\n<li *ngIf="user.active" *ngFor="let user of users">...</li>\n\n<!-- Then: a container to host one of them -->\n<ng-container *ngFor="let user of users">\n  <li *ngIf="user.active">...</li>\n</ng-container>\n\n<!-- Now: blocks nest, and nothing extra is needed -->\n@for (user of users(); track user.id) {\n  @if (user.active) {\n    <li>...</li>\n  }\n}',
  },
  {
    id: 'q-directive-inject-host',
    category: 'directives',
    q: {
      en: 'How can a directive inject the component it is applied to?',
      uk: 'Як директива може інжектувати компонент, до якого її застосовано?',
    },
    a: {
      en: 'By asking for its type: both live on the same element injector, so a plain inject() of the component class resolves it. Add optional: true if the directive may also sit on elements that are not that component. It couples the two, so keep it for the case where the directive genuinely exists to extend one component - for anything looser, take an input instead.',
      uk: "Просто попросивши його тип: обидва живуть в одному інжекторі елемента, тож звичайний inject() класу компонента його розв'яже. Додай optional: true, якщо директива може стояти й на елементах, які не є цим компонентом. Це зв'язує їх, тож лишай такий підхід для випадку, коли директива справді існує заради розширення одного компонента; для чогось вільнішого бери інпут.",
    },
    code: '@Directive({ selector: "app-chart[appAutoResize]" })\nexport class AutoResizeDirective {\n  private readonly chart = inject(ChartComponent);   // same element injector\n\n  constructor() {\n    afterNextRender(() => this.chart.resize());\n  }\n}',
  },
  {
    id: 'q-renderer2-vs-native',
    category: 'directives',
    q: {
      en: 'Why would a directive use Renderer2 instead of touching nativeElement?',
      uk: 'Чому директиві варто використовувати Renderer2 замість прямої роботи з nativeElement?',
    },
    a: {
      en: 'Because Renderer2 is an abstraction over the rendering target, so the same code works during server-side rendering where there is no DOM. It also routes through the platform rather than around it, which keeps sanitization and event handling in play. In practice, prefer a host binding to either: the framework then owns the update, and there is nothing to keep in sync by hand.',
      uk: "Бо Renderer2 є абстракцією над ціллю рендерингу, тож той самий код працює і під час рендерингу на сервері, де DOM немає. До того ж він іде через платформу, а не повз неї, і санітизація та обробка подій лишаються в силі. На практиці ж обом варто віддати перевагу хост-прив'язці: тоді оновленням володіє фреймворк, і синхронізувати вручну нічого не треба.",
    },
    code: '// Works on the server too\nthis.renderer.setAttribute(this.element.nativeElement, "aria-busy", "true");\n\n// Better still: let the framework own it\n@Directive({\n  selector: "[appBusy]",\n  host: { "[attr.aria-busy]": "busy()" },\n})\nexport class BusyDirective {\n  readonly busy = input(false);\n}',
  },
];
