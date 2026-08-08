import { Question } from '../../models/content.model';

// The component API: lifecycle, inputs and outputs, queries, projection, host and animation.
export const COMPONENTS_QUESTIONS: Question[] = [
  {
    id: 'q-component-vs-directive',
    category: 'components',
    q: {
      en: 'What is the difference between a component and a directive?',
      uk: 'Яка різниця між компонентом і директивою?',
    },
    a: {
      en: 'A component is a directive with a template. That is the whole difference in the framework - Component extends Directive, which is why a class can carry only one of the two. In practice it decides ownership: a component renders its own piece of the DOM, a directive changes an element that already exists and belongs to someone else. If you find yourself writing a directive that creates most of its own markup, you wanted a component.',
      uk: 'Компонент - це директива з шаблоном. У самому фреймворку різниця вичерпується цим: Component розширює Directive, тому клас може мати лише один із двох декораторів. На практиці це питання власності: компонент рендерить власний шматок DOM, директива змінює елемент, який уже існує і належить комусь іншому. Якщо ти пишеш директиву, що створює здебільшого власну розмітку, тобі був потрібен компонент.',
    },
    code: '// Owns markup -> component\n@Component({ selector: "app-tooltip", templateUrl: "./tooltip.html" })\nexport class TooltipComponent {}\n\n// Changes an element that already exists -> directive\n@Directive({ selector: "[appAutofocus]" })\nexport class AutofocusDirective {\n  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);\n\n  constructor() {\n    afterNextRender(() => this.element.nativeElement.focus());\n  }\n}',
  },
  {
    id: 'q-lifecycle-hooks',
    category: 'components',
    q: {
      en: 'Which lifecycle hooks does a component have, and in what order do they run?',
      uk: 'Які хуки життєвого циклу має компонент і в якому порядку вони виконуються?',
    },
    a: {
      en: "ngOnChanges (before the first render and on every input change), ngOnInit, ngDoCheck, ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked, ngOnDestroy. The Init hooks fire once, the Checked hooks on every change detection run - which is why putting work in ngAfterViewChecked is a reliable way to make an application slow. Content hooks precede view hooks because projected content is resolved before the component's own view.",
      uk: "ngOnChanges (перед першим рендерингом і на кожну зміну інпутів), ngOnInit, ngDoCheck, ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked, ngOnDestroy. Хуки Init спрацьовують один раз, хуки Checked - на кожен прохід change detection, тому робота в ngAfterViewChecked є надійним способом сповільнити застосунок. Хуки контенту йдуть перед хуками вигляду, бо спроєктований контент розв'язується раніше за власний вигляд компонента.",
    },
    code: 'export class PanelComponent implements OnInit, AfterViewInit, OnDestroy {\n  ngOnChanges(changes: SimpleChanges): void {}   // 1, and on every input change\n  ngOnInit(): void {}                            // 2, once, inputs are set\n  ngDoCheck(): void {}                           // 3, every cycle\n  ngAfterContentInit(): void {}                  // 4, projected content ready\n  ngAfterContentChecked(): void {}               // 5, every cycle\n  ngAfterViewInit(): void {}                     // 6, own view ready\n  ngAfterViewChecked(): void {}                  // 7, every cycle\n  ngOnDestroy(): void {}                         // 8, once\n}',
  },
  {
    id: 'q-ngonchanges-vs-ngdocheck',
    category: 'components',
    q: {
      en: 'When does ngOnChanges run, and how does it differ from ngDoCheck?',
      uk: 'Коли виконується ngOnChanges і чим він відрізняється від ngDoCheck?',
    },
    a: {
      en: 'ngOnChanges runs only when a bound input reference changes, and it hands you a SimpleChanges map with previous and current values. ngDoCheck runs on every change detection pass regardless, and gets nothing - it exists so you can detect the changes Angular cannot see, such as a mutated array whose reference stayed the same. It is a performance trap: it fires constantly, so anything expensive inside it runs constantly.',
      uk: "ngOnChanges спрацьовує лише тоді, коли змінюється посилання прив'язаного інпуту, і передає мапу SimpleChanges з попереднім та поточним значеннями. ngDoCheck виконується на кожному проході change detection незалежно ні від чого і не отримує нічого - він існує, щоб ти міг помітити зміни, невидимі для Angular, наприклад мутацію масиву, посилання на який лишилося тим самим. Це пастка продуктивності: він спрацьовує постійно, тож усе дороге всередині нього виконується постійно.",
    },
    code: 'ngOnChanges(changes: SimpleChanges): void {\n  if (changes["userId"]) {\n    console.log(changes["userId"].previousValue, changes["userId"].currentValue);\n  }\n}\n\n// items.push(item) keeps the same reference, so ngOnChanges stays silent\n// and only ngDoCheck can notice - which is the argument for not mutating at all.\nngDoCheck(): void {\n  if (this.items().length !== this.knownLength) { /* ... */ }\n}',
  },
  {
    id: 'q-aftercontent-vs-afterview',
    category: 'components',
    q: {
      en: 'What is the difference between ngAfterContentInit and ngAfterViewInit?',
      uk: 'Яка різниця між ngAfterContentInit і ngAfterViewInit?',
    },
    a: {
      en: 'Content is what the parent projected into you through ng-content; the view is what your own template rendered. ngAfterContentInit fires when ContentChild queries are resolved, ngAfterViewInit when ViewChild queries are. Content comes first because it is created by the parent, before your view exists. The practical consequence: writing to a bound property in ngAfterViewInit changes a value after it was checked, which is exactly the ExpressionChangedAfterItHasBeenChecked error.',
      uk: "Контент - це те, що батько спроєктував у тебе через ng-content; вигляд - те, що відрендерив твій власний шаблон. ngAfterContentInit спрацьовує, коли розв'язано запити ContentChild, а ngAfterViewInit - коли ViewChild. Контент іде першим, бо його створює батько ще до того, як існує твій вигляд. Практичний наслідок: запис у прив'язану властивість в ngAfterViewInit змінює значення вже після перевірки - і це рівно помилка ExpressionChangedAfterItHasBeenChecked.",
    },
    code: '<!-- parent.html: everything inside the tags is content -->\n<app-panel>\n  <h2>Projected by the parent</h2>   <!-- content -->\n</app-panel>\n\n<!-- panel.html: everything here is the view -->\n<section><ng-content /><p #note>Rendered by the panel itself</p></section>\n\nexport class PanelComponent {\n  readonly heading = contentChild<ElementRef>("h2");   // ready first\n  readonly note = viewChild<ElementRef>("note");       // ready second\n}',
  },
  {
    id: 'q-ngondestroy-cleanup',
    category: 'components',
    q: {
      en: 'What must be cleaned up in ngOnDestroy, and what does DestroyRef change about that?',
      uk: "Що обов'язково прибирати в ngOnDestroy і що в цьому змінює DestroyRef?",
    },
    a: {
      en: 'Anything holding a reference to the component after it is gone: subscriptions to streams that never complete, timers, listeners added outside Angular, observers, open sockets. DestroyRef lets you register that cleanup where the resource is created rather than in a hook far below, and takeUntilDestroyed uses it to unsubscribe automatically. The result is that the teardown sits next to the setup, so deleting one deletes the other.',
      uk: 'Усе, що тримає посилання на компонент після його зникнення: підписки на потоки, які ніколи не завершуються, таймери, слухачі, додані поза Angular, спостерігачі, відкриті сокети. DestroyRef дозволяє зареєструвати прибирання там, де ресурс створено, а не в хуку далеко внизу, а takeUntilDestroyed використовує його для автоматичної відписки. У підсумку демонтаж лежить поруч із налаштуванням, тож видалення одного видаляє й інше.',
    },
    code: 'export class TickerComponent {\n  private readonly destroyRef = inject(DestroyRef);\n\n  constructor() {\n    const id = setInterval(() => this.tick(), 1000);\n    this.destroyRef.onDestroy(() => clearInterval(id));   // next to its setup\n\n    inject(SocketService)\n      .messages$.pipe(takeUntilDestroyed())               // no hook needed\n      .subscribe((message) => this.handle(message));\n  }\n}',
  },
  {
    id: 'q-after-render-hooks',
    category: 'components',
    q: {
      en: 'What are afterNextRender and afterRenderEffect for, and why not use ngAfterViewInit?',
      uk: 'Для чого потрібні afterNextRender і afterRenderEffect і чому не обійтися ngAfterViewInit?',
    },
    a: {
      en: 'They run only in the browser, after the DOM has actually been laid out, which is what you need for measuring an element or handing it to a third-party library. ngAfterViewInit runs on the server too, where there is no layout, and it runs inside change detection, so writing to the DOM there can force a second pass. afterNextRender fires once; afterRenderEffect re-runs when the signals it reads change.',
      uk: 'Вони виконуються лише в браузері й після того, як DOM справді розкладено, а саме це потрібно для вимірювання елемента чи передавання його сторонній бібліотеці. ngAfterViewInit виконується й на сервері, де жодного розкладення немає, і працює всередині change detection, тож запис у DOM там може спричинити другий прохід. afterNextRender спрацьовує один раз, afterRenderEffect перезапускається при зміні сигналів, які він читає.',
    },
    code: 'export class ChartComponent {\n  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>("canvas");\n\n  constructor() {\n    // Browser only, after layout: safe to measure and to hand to a chart library.\n    afterNextRender(() => {\n      const { width } = this.canvas().nativeElement.getBoundingClientRect();\n      this.draw(width);\n    });\n  }\n}',
  },
  {
    id: 'q-inputs-and-outputs',
    category: 'components',
    q: {
      en: 'How does a component receive data from its parent and report events back?',
      uk: 'Як компонент отримує дані від батька і повідомляє його про події?',
    },
    a: {
      en: 'Through input() for data coming down and output() for events going up. The parent binds with square brackets and listens with parentheses. Keep the direction strict: a child never writes to the object it was given, it emits and lets the owner decide. That is what makes the data flow traceable - to find out who changed a value you look at its owner, not at every component that ever displayed it.',
      uk: "Через input() для даних, що йдуть униз, і output() для подій, що йдуть угору. Батько прив'язується квадратними дужками і слухає круглими. Тримай напрямок суворо: дитина ніколи не пише в отриманий об'єкт, вона емітить, а власник вирішує. Саме це робить потік даних простежуваним - щоб дізнатися, хто змінив значення, ти дивишся на власника, а не на кожен компонент, який його колись показував.",
    },
    code: 'export class TodoItemComponent {\n  readonly todo = input.required<Todo>();\n  readonly toggled = output<string>();          // emits the id, not a mutation\n\n  protected toggle(): void {\n    this.toggled.emit(this.todo().id);\n  }\n}\n\n<!-- parent.html -->\n<app-todo-item [todo]="todo" (toggled)="onToggled($event)" />',
  },
  {
    id: 'q-input-output-aliasing',
    category: 'components',
    q: {
      en: 'Can inputs and outputs be aliased, and when is that justified?',
      uk: 'Чи можна давати псевдоніми інпутам та аутпутам і коли це виправдано?',
    },
    a: {
      en: 'Yes, with the alias option, and the honest answer is: almost never for a component. An alias means the property in the class and the attribute in the template have different names, so a search for one does not find the other. The legitimate case is a directive whose selector is also its main input - there the alias is what lets the attribute do both jobs at once.',
      uk: 'Так, через опцію alias, і чесна відповідь така: для компонента - майже ніколи. Псевдонім означає, що властивість у класі й атрибут у шаблоні звуться по-різному, тож пошук за одним не знайде інше. Виправданий випадок - директива, чий селектор водночас є її головним інпутом: саме псевдонім дозволяє атрибуту виконувати обидві ролі одночасно.',
    },
    code: '// Justified: the selector and the input are deliberately the same attribute.\n@Directive({ selector: "[appDelay]" })\nexport class DelayDirective {\n  readonly delay = input.required<number>({ alias: "appDelay" });\n}\n\n<div [appDelay]="300"></div>\n\n// Not justified: now "label" and "text" are the same thing with two names.\nreadonly text = input<string>("", { alias: "label" });',
  },
  {
    id: 'q-input-transform',
    category: 'components',
    q: {
      en: 'What does an input transform do, and what is a typical use for it?',
      uk: 'Що робить трансформація інпуту і який у неї типовий сценарій використання?',
    },
    a: {
      en: 'It converts the bound value before it reaches the signal, so the class always sees the type it wants regardless of what the template passed. The two built-ins cover the common cases: booleanAttribute makes a bare attribute mean true, numberAttribute turns a string attribute into a number. Keep transforms pure and cheap - they run on every change, and they must be a stand-alone function so the compiler can reference them.',
      uk: "Вона перетворює прив'язане значення до того, як воно потрапить у сигнал, тож клас завжди бачить потрібний тип незалежно від того, що передав шаблон. Дві вбудовані покривають типові випадки: booleanAttribute робить голий атрибут значенням true, numberAttribute перетворює рядковий атрибут на число. Тримай трансформації чистими й дешевими - вони виконуються на кожну зміну і мають бути окремою функцією, щоб компілятор міг на них послатися.",
    },
    code: 'export class ToggleComponent {\n  readonly disabled = input(false, { transform: booleanAttribute });\n  readonly tabIndex = input(0, { transform: numberAttribute });\n}\n\n<app-toggle disabled />          <!-- bare attribute becomes true -->\n<app-toggle tabIndex="3" />      <!-- string "3" becomes the number 3 -->',
  },
  {
    id: 'q-viewchild-static-flag',
    category: 'components',
    q: {
      en: 'What do ViewChild and ViewChildren query, and what does the static flag mean?',
      uk: 'Що саме шукають ViewChild і ViewChildren і що означає прапорець static?',
    },
    a: {
      en: "They find an element, directive or component inside the component's own template, by template reference variable or by type. static: true resolves the query before the first change detection run, which only works if the target is not inside any conditional block; static: false resolves it after, and is the default. Signal queries removed the flag entirely: a viewChild() is a signal that is simply undefined until the element exists.",
      uk: "Вони знаходять елемент, директиву чи компонент усередині власного шаблону компонента - за шаблонною змінною-посиланням або за типом. static: true розв'язує запит до першого проходу change detection, що працює лише якщо ціль не всередині умовного блоку; static: false розв'язує після і є типовим. Сигнальні запити прибрали цей прапорець узагалі: viewChild() - це сигнал, який просто дорівнює undefined, доки елемент не існує.",
    },
    code: '// Then: the flag existed because the timing was not expressible any other way\n@ViewChild("input", { static: true }) input!: ElementRef<HTMLInputElement>;\n\n// Now: a signal, so the timing is in the type - undefined until it is there\nreadonly input = viewChild<ElementRef<HTMLInputElement>>("input");\nreadonly rows = viewChildren(RowComponent);\n\nprotected readonly rowCount = computed(() => this.rows().length);',
  },
  {
    id: 'q-contentchild-vs-viewchild',
    category: 'components',
    q: {
      en: 'What is the difference between ContentChild and ViewChild?',
      uk: 'Яка різниця між ContentChild і ViewChild?',
    },
    a: {
      en: 'ViewChild searches your own template; ContentChild searches what the parent projected into you. A tab group finds its tabs with contentChildren, because the consumer wrote them; it finds its own scroll container with viewChild, because it wrote that itself. Getting this wrong is a common cause of an empty query result - the element is there on screen, but it belongs to the other tree.',
      uk: 'ViewChild шукає у твоєму власному шаблоні, ContentChild - у тому, що батько спроєктував у тебе. Група вкладок знаходить свої вкладки через contentChildren, бо їх написав споживач; власний контейнер прокрутки вона знаходить через viewChild, бо його написала сама. Плутанина тут - типова причина порожнього результату запиту: елемент є на екрані, але належить іншому дереву.',
    },
    code: 'export class TabGroupComponent {\n  // Written by whoever uses <app-tab-group> -> content\n  readonly tabs = contentChildren(TabComponent);\n\n  // Written in tab-group.html -> view\n  readonly viewport = viewChild.required<ElementRef>("viewport");\n}\n\n<app-tab-group>\n  <app-tab title="One" />   <!-- found by contentChildren -->\n</app-tab-group>',
  },
  {
    id: 'q-select-element-in-template',
    category: 'components',
    q: {
      en: 'How do you get a reference to a DOM element inside a component template?',
      uk: 'Як отримати посилання на DOM-елемент усередині шаблону компонента?',
    },
    a: {
      en: "Put a template reference variable on it and query it with viewChild, which gives you an ElementRef. Never reach for document.querySelector: it searches the whole page, so it can return an element from a different instance of the same component, and it returns nothing at all during server-side rendering. The query is scoped to this component's view, which is exactly the guarantee you want.",
      uk: 'Постав на нього шаблонну змінну-посилання і знайди її через viewChild, який поверне ElementRef. Ніколи не бери document.querySelector: він шукає по всій сторінці, тож може повернути елемент з іншого екземпляра того самого компонента, а під час рендерингу на сервері не поверне нічого. Запит же обмежений виглядом цього компонента - саме та гарантія, яка тобі потрібна.',
    },
    code: '<!-- search.html -->\n<input #field type="search" />\n\nexport class SearchComponent {\n  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>("field");\n\n  focus(): void {\n    this.field().nativeElement.focus();   // this instance, not the first on the page\n  }\n}',
  },
  {
    id: 'q-elementref-risks',
    category: 'components',
    q: {
      en: 'What are the risks of reaching for ElementRef and nativeElement directly?',
      uk: 'Які ризики прямого звернення до ElementRef і nativeElement?',
    },
    a: {
      en: "Three. It breaks server-side rendering, where nativeElement is not a browser element. It bypasses sanitization if you assign markup, which is why the API is documented as a security risk. And it puts DOM state outside Angular's knowledge, so change detection cannot keep it consistent. Reading measurements is usually fine; writing structure or HTML is where it goes wrong. Prefer a binding, and use Renderer2 when you genuinely must write.",
      uk: "Три. Він ламає рендеринг на сервері, де nativeElement не є елементом браузера. Він обходить санітизацію, якщо ти присвоюєш розмітку - саме тому це API задокументоване як ризик безпеки. І він виносить стан DOM за межі знань Angular, тож change detection не може тримати його узгодженим. Читати виміри зазвичай нормально; писати структуру чи HTML - саме там усе ламається. Надавай перевагу прив'язці, а коли писати таки треба - Renderer2.",
    },
    code: '// Risky: unsanitized, and it silently does nothing on the server\nthis.element.nativeElement.innerHTML = this.userSuppliedHtml;\n\n// Fine: a binding, checked and sanitized by the framework\n<div [innerHTML]="userSuppliedHtml"></div>\n\n// Acceptable: reading a measurement, in a browser-only hook\nafterNextRender(() => {\n  this.height.set(this.element.nativeElement.offsetHeight);\n});',
  },
  {
    id: 'q-content-projection',
    category: 'components',
    q: {
      en: 'What is content projection, and which problem does it solve?',
      uk: 'Що таке проєкція контенту і яку проблему вона вирішує?',
    },
    a: {
      en: 'It lets a component render markup it did not write, passed in by whoever used it. The problem it solves is the alternative: a wrapper component that tries to describe every possible body through inputs, growing a config object until it is a template in disguise. With projection the component owns the frame - the border, the padding, the accessibility wiring - and the caller owns the contents.',
      uk: "Вона дозволяє компоненту відрендерити розмітку, якої він не писав, - передану тим, хто його використав. Проблема, яку це вирішує, видно з альтернативи: компонент-обгортка намагається описати будь-який можливий вміст через інпути, і об'єкт конфігурації розростається, доки не стає прихованим шаблоном. З проєкцією компонент володіє рамкою - межею, відступами, зв'язками доступності - а викликач володіє вмістом.",
    },
    code: '<!-- card.html: the component owns the frame -->\n<article class="card">\n  <ng-content />\n</article>\n\n<!-- page.html: the caller owns the contents -->\n<app-card>\n  <h2>Anything at all</h2>\n  <app-chart [data]="data()" />\n</app-card>',
  },
  {
    id: 'q-ng-content-slots',
    category: 'components',
    q: {
      en: 'What is ng-content, and how does multi-slot projection with select work?',
      uk: 'Що таке ng-content і як працює багатослотова проєкція через select?',
    },
    a: {
      en: 'ng-content marks where projected content lands. With a select attribute taking a CSS selector, you get several slots and each projected node goes to the first one that matches it; an ng-content without select catches everything left over, so it must come last to be useful. Note that projected content is created by the parent whether or not a slot renders it - ng-content is a placement instruction, not a conditional.',
      uk: 'ng-content позначає місце, куди потрапляє спроєктований контент. З атрибутом select, який приймає CSS-селектор, ти отримуєш кілька слотів, і кожен спроєктований вузол іде в перший, що йому відповідає; ng-content без select ловить усе, що лишилося, тож має стояти останнім, щоб бути корисним. Зверни увагу: спроєктований контент створює батько незалежно від того, чи рендерить його слот, - ng-content є вказівкою про розміщення, а не умовою.',
    },
    code: '<!-- dialog.html -->\n<header><ng-content select="[dialogTitle]" /></header>\n<div class="body"><ng-content /></div>            <!-- everything else, last -->\n<footer><ng-content select="[dialogActions]" /></footer>\n\n<!-- usage -->\n<app-dialog>\n  <h2 dialogTitle>Delete file</h2>\n  <p>This cannot be undone.</p>\n  <button dialogActions>Delete</button>\n</app-dialog>',
  },
  {
    id: 'q-ngprojectas',
    category: 'components',
    q: {
      en: 'What is ngProjectAs for?',
      uk: 'Для чого потрібен ngProjectAs?',
    },
    a: {
      en: 'It makes a node match a slot selector it would not otherwise match. The case that forces it is ng-container: you wrap several elements in one so a structural directive can control them, but now the wrapper is what the projection sees, and it matches nothing. ngProjectAs tells the projection to treat the container as if it were the element you meant.',
      uk: 'Він змушує вузол відповідати селектору слота, якому інакше не відповідав би. Випадок, що це вимагає, - ng-container: ти загортаєш кілька елементів в один, щоб структурна директива могла ними керувати, але тепер проєкція бачить саме обгортку, а вона не відповідає нічому. ngProjectAs каже проєкції поводитися з контейнером так, ніби це той елемент, який ти мав на увазі.',
    },
    code: '<app-dialog>\n  <!-- Without ngProjectAs this lands in the default slot, not the actions one -->\n  <ng-container ngProjectAs="[dialogActions]">\n    @if (canDelete()) {\n      <button>Delete</button>\n    }\n    <button>Cancel</button>\n  </ng-container>\n</app-dialog>',
  },
  {
    id: 'q-view-encapsulation',
    category: 'components',
    q: {
      en: 'Which view encapsulation modes exist, and what does each one do to your CSS?',
      uk: 'Які режими інкапсуляції стилів існують і що кожен з них робить з твоїм CSS?',
    },
    a: {
      en: "Emulated, the default, rewrites your selectors with a generated attribute so they only match this component's elements - scoping without the shadow DOM. ShadowDom uses the real thing, which is stricter: outside styles do not reach in either, and that includes your design tokens unless they are custom properties. None disables scoping entirely and makes every rule global. Emulated is right almost always; None is how a stylesheet leaks into the rest of the application.",
      uk: 'Emulated, типовий режим, переписує твої селектори з генерованим атрибутом, тож вони добирають лише елементи цього компонента - обмеження області без shadow DOM. ShadowDom використовує справжній shadow DOM, і він суворіший: зовнішні стилі теж не проникають усередину, включно з твоїми токенами дизайну, якщо вони не є кастомними властивостями. None вимикає обмеження зовсім і робить кожне правило глобальним. Emulated правильний майже завжди; саме через None стилі протікають у решту застосунку.',
    },
    code: '@Component({\n  selector: "app-card",\n  templateUrl: "./card.html",\n  styleUrl: "./card.scss",\n  encapsulation: ViewEncapsulation.Emulated,   // the default\n})\n\n/* .title in card.scss is compiled to roughly this: */\n.title[_ngcontent-abc] { font-weight: 700; }\n\n/* With ViewEncapsulation.None it stays .title - and hits every title on the page. */',
  },
  {
    id: 'q-host-bindings-object',
    category: 'components',
    q: {
      en: 'How do you bind properties and events on the host element, and why is the host object preferred over @HostBinding and @HostListener?',
      uk: "Як прив'язувати властивості та події до хост-елемента і чому об'єкт host кращий за @HostBinding і @HostListener?",
    },
    a: {
      en: 'Through the host object in the decorator, using the same syntax as a template: square brackets for properties, parentheses for events, bare keys for static attributes. It is preferred because every host binding is then in one place at the top of the file, instead of scattered across fields and methods where you have to read the whole class to know what the element does. It also keeps the class free of decorators that exist only for the template.',
      uk: "Через об'єкт host у декораторі, тим самим синтаксисом, що й у шаблоні: квадратні дужки для властивостей, круглі для подій, голі ключі для статичних атрибутів. Він кращий тим, що всі хост-прив'язки опиняються в одному місці вгорі файлу, а не розкидані по полях і методах, через що доводиться читати весь клас, аби зрозуміти, що робить елемент. До того ж клас лишається без декораторів, які існують лише заради шаблону.",
    },
    code: '@Component({\n  selector: "app-alert",\n  templateUrl: "./alert.html",\n  host: {\n    role: "alert",                        // static attribute\n    "[class.is-error]": "severity() === \'error\'",\n    "[attr.aria-live]": "polite() ? \'polite\' : \'assertive\'",\n    "(keydown.escape)": "dismiss()",\n  },\n})\nexport class AlertComponent {}',
  },
  {
    id: 'q-host-css-selectors',
    category: 'components',
    q: {
      en: 'What do the :host and :host-context selectors match?',
      uk: 'Що добирають селектори :host і :host-context?',
    },
    a: {
      en: ":host matches the component's own element, which its stylesheet otherwise cannot reach - the rules inside are scoped to what the template rendered, and the host is above that. It takes a parameter to match conditionally, as in :host(.compact). :host-context looks upward for an ancestor matching a selector, which is how a component reacts to a theme class set far above it without an input threaded down the tree.",
      uk: ':host добирає власний елемент компонента, до якого його таблиця стилів інакше не дістає: правила всередині обмежені тим, що відрендерив шаблон, а хост стоїть вище. Він приймає параметр для умовного добору, як :host(.compact). :host-context шукає вгору предка, що відповідає селектору, - саме так компонент реагує на клас теми, заданий далеко вище, без інпуту, протягнутого крізь усе дерево.',
    },
    code: ':host {\n  display: block;            /* the host is inline until you say otherwise */\n  border: 1px solid var(--border);\n}\n\n:host(.compact) {\n  padding: 4px;              /* only when the host itself carries .compact */\n}\n\n:host-context(.theme-dark) .title {\n  color: white;              /* reacts to an ancestor, without an input */\n}',
  },
  {
    id: 'q-display-block-components',
    category: 'components',
    q: {
      en: 'Why does a component host render inline by default, and how do you make it a block?',
      uk: 'Чому хост компонента за замовчуванням рендериться як inline і як зробити його блоковим?',
    },
    a: {
      en: "Because the browser has never heard of app-card. An unknown element gets the initial value of display, which is inline, so width, height and vertical margins quietly do nothing. Fix it once in the component's own stylesheet with :host { display: block }. Doing it from the parent instead is the usual mistake: the layout of a component then depends on whoever placed it, and it breaks the moment it is used somewhere else.",
      uk: 'Бо браузер ніколи не чув про app-card. Невідомий елемент отримує початкове значення display, тобто inline, тож width, height і вертикальні відступи тихо не працюють. Виправляється один раз у власній таблиці стилів компонента через :host { display: block }. Робити це з батька - типова помилка: тоді розкладка компонента залежить від того, хто його розмістив, і ламається щойно його використають деінде.',
    },
    code: '/* card.scss - the component states its own layout box */\n:host {\n  display: block;\n}\n\n/* Without it, this quietly does nothing at all: */\napp-card { width: 300px; margin-block: 24px; }',
  },
  {
    id: 'q-dynamic-components',
    category: 'components',
    q: {
      en: 'How do you create a component dynamically at runtime?',
      uk: 'Як створити компонент динамічно під час виконання?',
    },
    a: {
      en: 'With ViewContainerRef.createComponent, which returns a ComponentRef you can set inputs on and must destroy yourself. Factories and entryComponents are long gone - Ivy resolves the component type directly. This is the right tool when the component type is genuinely decided at runtime, as in a modal service or a renderer driven by server-supplied data. When the set of possibilities is known at compile time, a @switch in the template is simpler and type-checked.',
      uk: "Через ViewContainerRef.createComponent, який повертає ComponentRef: на ньому можна задавати інпути і його треба самому знищити. Фабрики й entryComponents давно зникли - Ivy розв'язує тип компонента напряму. Це правильний інструмент, коли тип справді визначається під час виконання: сервіс модальних вікон чи рендерер, керований даними з сервера. Коли ж набір варіантів відомий на етапі компіляції, @switch у шаблоні простіший і перевіряється типами.",
    },
    code: '@Injectable({ providedIn: "root" })\nexport class ModalService {\n  private readonly container = inject(ViewContainerRef);\n\n  open<T>(component: Type<T>, inputs: Record<string, unknown>): ComponentRef<T> {\n    const ref = this.container.createComponent(component);\n    for (const [key, value] of Object.entries(inputs)) {\n      ref.setInput(key, value);\n    }\n    return ref;   // the caller owns it, and must call ref.destroy()\n  }\n}',
  },
  {
    id: 'q-ngcomponentoutlet',
    category: 'components',
    q: {
      en: 'When is NgComponentOutlet a better fit than createComponent?',
      uk: 'Коли NgComponentOutlet підходить краще за createComponent?',
    },
    a: {
      en: 'When the dynamic component belongs inside a template rather than being spawned by a service. The directive handles creation, input binding and destruction for you, tied to where it sits in the template, so there is no lifecycle to manage by hand. Reach for createComponent when there is no template position to attach to - an overlay appended to the body, for instance.',
      uk: "Коли динамічний компонент належить шаблону, а не породжується сервісом. Директива бере на себе створення, прив'язку інпутів і знищення, прив'язуючи їх до свого місця в шаблоні, тож життєвим циклом не треба керувати вручну. createComponent потрібен тоді, коли позиції в шаблоні немає взагалі - скажімо, для оверлея, доданого в body.",
    },
    code: '<!-- The set of widgets is data-driven, but the position is not -->\n@for (widget of widgets(); track widget.id) {\n  <ng-container\n    *ngComponentOutlet="widget.component; inputs: { config: widget.config }"\n  />\n}\n\n<!-- Created, bound and destroyed with the block it lives in. -->',
  },
  {
    id: 'q-smart-dumb-components',
    category: 'components',
    q: {
      en: 'How do you split container and presentational components, and what does that gain you?',
      uk: 'Як розділяти контейнерні та презентаційні компоненти і що це дає?',
    },
    a: {
      en: 'A container injects services, decides what to load and holds the state; a presentational component takes inputs, emits outputs and injects nothing. The gain is testability and reuse: the presentational half can be rendered in a test with a plain object and no HTTP, and it can appear on a second screen with different data behind it. The cost is more files, so it earns its keep on components used more than once or worth testing in isolation.',
      uk: "Контейнер інжектує сервіси, вирішує, що завантажувати, і тримає стан; презентаційний компонент приймає інпути, емітить аутпути й не інжектує нічого. Виграш - у тестованості та повторному використанні: презентаційну половину можна відрендерити в тесті зі звичайним об'єктом і без HTTP, а також показати на іншому екрані з іншими даними позаду. Ціна - більше файлів, тож підхід окупається на компонентах, які використовують більш ніж раз або варто тестувати окремо.",
    },
    code: '// Container: knows the service, owns the state\n@Component({ selector: "app-users-page", templateUrl: "./users-page.html", imports: [UserListComponent] })\nexport class UsersPageComponent {\n  private readonly users = inject(UserService);\n  protected readonly list = this.users.all;\n}\n\n// Presentational: injects nothing, so a test needs no TestBed providers\n@Component({ selector: "app-user-list", templateUrl: "./user-list.html" })\nexport class UserListComponent {\n  readonly users = input.required<User[]>();\n  readonly picked = output<User>();\n}',
  },
  {
    id: 'q-component-communication-patterns',
    category: 'components',
    q: {
      en: 'How can two sibling components exchange data?',
      uk: 'Як два сусідніх компоненти можуть обмінюватися даними?',
    },
    a: {
      en: 'Not directly - through something they share. Usually that is the common parent: one emits, the parent holds the state, the other receives it as an input. When the two are far apart, or the state outlives both, put it in a service provided high enough to cover them and expose it as a signal. The pattern to avoid is a component reaching for a sibling through a query or the DOM, which couples them to a layout that will change.',
      uk: "Не напряму - через щось спільне. Зазвичай це спільний батько: один емітить, батько тримає стан, другий отримує його як інпут. Коли ж вони далеко одне від одного або стан переживає обидва, винеси його в сервіс, наданий достатньо високо, щоб покрити їх, і віддай як сигнал. Уникати варто шаблону, коли компонент дістає сусіда через запит чи DOM: це прив'язує їх до розкладки, яка зміниться.",
    },
    code: '// Shared through a service when a common parent is too far away\n@Injectable({ providedIn: "root" })\nexport class SelectionStore {\n  private readonly selected = signal<string | null>(null);\n  readonly selectedId = this.selected.asReadonly();\n  select(id: string): void {\n    this.selected.set(id);\n  }\n}\n\n// One sibling calls select(); the other reads selectedId(). Neither knows the other exists.',
  },
  {
    id: 'q-angular-elements',
    category: 'components',
    q: {
      en: 'What are Angular Elements, and when would you ship a component as a custom element?',
      uk: 'Що таке Angular Elements і коли варто віддавати компонент як custom element?',
    },
    a: {
      en: 'createCustomElement wraps an Angular component in a standards-compliant custom element, so it can be used as a plain HTML tag by a page that knows nothing about Angular. The reason to do it is embedding: a widget dropped into a WordPress site, a legacy application, or another framework. The cost is that each bundle carries its own copy of the framework, so it is a poor way to build an application out of parts.',
      uk: 'createCustomElement загортає компонент Angular у стандартний custom element, тож його можна використовувати як звичайний HTML-тег на сторінці, яка про Angular нічого не знає. Причина так робити - вбудовування: віджет, який кладуть у сайт на WordPress, у застарілий застосунок або в інший фреймворк. Ціна в тому, що кожен бандл несе власну копію фреймворка, тож будувати з таких частин цілий застосунок - погана ідея.',
    },
    code: 'const app = await createApplication({ providers: [provideHttpClient()] });\nconst element = createCustomElement(RatingComponent, { injector: app.injector });\n\ncustomElements.define("stars-rating", element);\n\n<!-- Any page at all, no Angular required: -->\n<stars-rating value="4" max="5"></stars-rating>',
  },
  {
    id: 'q-custom-element-mapping',
    category: 'components',
    q: {
      en: "How do a component's inputs and outputs map onto a custom element's API?",
      uk: 'Як інпути та аутпути компонента відображаються на API custom element?',
    },
    a: {
      en: 'Inputs become element properties, and their dash-case form works as an attribute; attributes arrive as strings, so a number or an object needs a transform or a property assignment in JavaScript. Outputs become DOM CustomEvents named after the output, listened to with addEventListener, and the emitted value arrives in event.detail. That mapping is the whole point: consumers use the platform, not an Angular API.',
      uk: "Інпути стають властивостями елемента, а їхня форма через дефіс працює як атрибут; атрибути надходять рядками, тож для числа чи об'єкта потрібна трансформація або присвоєння властивості з JavaScript. Аутпути стають DOM-подіями CustomEvent, названими за аутпутом, слухаються через addEventListener, а надіслане значення приходить у event.detail. Це відображення і є суттю: споживач працює з платформою, а не з API Angular.",
    },
    code: '// readonly maxValue = input(5);  ->  attribute max-value, property maxValue\n// readonly rated = output<number>();  ->  CustomEvent "rated"\n\nconst el = document.querySelector("stars-rating");\nel.maxValue = 10;                       // property: keeps the real type\nel.addEventListener("rated", (event) => console.log(event.detail));',
  },
  {
    id: 'q-component-animations',
    category: 'components',
    q: {
      en: 'How do you animate a component in modern Angular?',
      uk: 'Як анімувати компонент у сучасному Angular?',
    },
    a: {
      en: 'With CSS, and with the animate.enter and animate.leave directives when an element is entering or leaving the DOM - they add a class for the duration of the animation and, crucially, hold the element in the DOM until a leave animation finishes. The old @angular/animations DSL still works but is now the legacy path: it costs a runtime dependency to describe what CSS already expresses.',
      uk: "За допомогою CSS, а для елементів, що з'являються або зникають з DOM, - директивами animate.enter і animate.leave: вони додають клас на час анімації і, що найважливіше, утримують елемент у DOM, доки анімація виходу не завершиться. Старий DSL з @angular/animations усе ще працює, але тепер це застарілий шлях: він коштує рантайм-залежності заради опису того, що CSS і так виражає.",
    },
    code: '<div animate.enter="fade-in" animate.leave="fade-out">...</div>\n\n/* Plain CSS, no runtime involved */\n.fade-in { animation: fade 200ms ease-out; }\n.fade-out { animation: fade 200ms ease-in reverse; }\n\n@keyframes fade {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}',
  },
  {
    id: 'q-animation-dsl-functions',
    category: 'components',
    q: {
      en: "What do trigger, state, style, animate and transition do in Angular's animation DSL?",
      uk: 'Що роблять trigger, state, style, animate і transition в анімаційному DSL Angular?',
    },
    a: {
      en: 'trigger names the animation and is what the template binds to. state describes a named end state, style the CSS properties held in it, transition the move between two states, and animate the timing of that move - duration, delay and easing. The special state names are the useful part: void means not in the DOM, so void => * is entering and * => void is leaving.',
      uk: "trigger дає анімації ім'я, і саме до нього прив'язується шаблон. state описує іменований кінцевий стан, style - CSS-властивості, які в ньому тримаються, transition - перехід між двома станами, а animate - тайминг цього переходу: тривалість, затримку і згладжування. Найкорисніша частина - спеціальні імена станів: void означає відсутність у DOM, тож void => * - це поява, а * => void - зникнення.",
    },
    code: 'trigger("slide", [\n  state("open", style({ height: "*" })),\n  state("closed", style({ height: 0 })),\n  transition("open <=> closed", animate("200ms ease")),\n  transition(":enter", [style({ opacity: 0 }), animate("150ms")]),  // void => *\n]);\n\n<div [@slide]="open() ? \'open\' : \'closed\'">...</div>\n\n<!-- Legacy: animate.enter and CSS express the same thing without the package. -->',
  },
  {
    id: 'q-css-vs-angular-animations',
    category: 'components',
    q: {
      en: "When would you prefer plain CSS animations over Angular's animations package?",
      uk: 'Коли краще обрати звичайні CSS-анімації замість пакета анімацій Angular?',
    },
    a: {
      en: 'By default. CSS animations run on the compositor, cost no JavaScript at runtime and no bytes in the bundle, and every developer can read them. The package earned its place when leaving elements and staged sequences were hard to do otherwise - and animate.leave now covers the first of those. Keep the DSL only for genuinely orchestrated sequences, such as a staggered list where each item follows the one before it.',
      uk: 'За замовчуванням. CSS-анімації виконуються на композиторі, не коштують JavaScript під час виконання і байтів у бандлі, і їх може прочитати будь-який розробник. Пакет заслужив своє місце тоді, коли елементи, що зникають, і поетапні послідовності інакше було важко зробити, - а animate.leave тепер закриває перше з цього. Лишай DSL лише для справді оркестрованих послідовностей, як-от список зі зсувом, де кожен елемент іде за попереднім.',
    },
    code: '/* Default choice: no runtime, no bundle cost, compositor-friendly */\n.panel {\n  transition: transform 200ms var(--ease);\n}\n.panel.open {\n  transform: translateY(0);\n}\n\n// Worth the DSL: a sequence CSS cannot express on its own\ntransition("* => *", [query(":enter", stagger(60, [animate("200ms", style({ opacity: 1 }))]))]);',
  },
  {
    id: 'q-reduced-motion',
    category: 'components',
    q: {
      en: 'How do you respect prefers-reduced-motion in an animated component?',
      uk: 'Як враховувати prefers-reduced-motion в анімованому компоненті?',
    },
    a: {
      en: 'Wrap the motion in a media query and leave the end state intact - reduced motion means less movement, not a missing feature, so the panel must still open, just without sliding. In CSS that is a query around the transition. When JavaScript drives the animation, ask matchMedia and skip the timing. Test it: this is a WCAG obligation, and for some users large motion is a genuine trigger, not a preference.',
      uk: 'Загорни рух у медіазапит і лиши кінцевий стан недоторканим: reduced motion означає менше руху, а не відсутню функцію, тож панель усе одно має відкриватися - просто без ковзання. У CSS це запит навколо transition. Коли анімацією керує JavaScript, запитай matchMedia і пропусти тайминг. Це треба перевіряти: вимога WCAG, а для частини людей великий рух є справжнім тригером, а не питанням смаку.',
    },
    code: '.panel {\n  transition: transform 200ms var(--ease);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .panel {\n    transition: none;   /* the panel still opens - it just does not slide */\n  }\n}\n\n// When JS drives it:\nconst reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;\nelement.animate(frames, { duration: reduce ? 0 : 200 });',
  },
];
