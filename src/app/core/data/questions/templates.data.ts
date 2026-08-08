import { Question } from '../../models/content.model';

// Template syntax: bindings, control flow, template refs and the type checker.
export const TEMPLATES_QUESTIONS: Question[] = [
  {
    id: 'q-interpolation',
    category: 'templates',
    q: {
      en: 'What is interpolation, and what may appear inside the braces?',
      uk: 'Що таке інтерполяція і що дозволено писати всередині фігурних дужок?',
    },
    a: {
      en: 'Interpolation renders an expression as text. What goes inside is a template expression evaluated against the component instance, and the result is converted with toString and inserted as text - never as markup, which is why interpolation cannot introduce an XSS hole. Keep it to a read: a call that does real work runs on every change detection pass, and there can be a lot of those.',
      uk: 'Інтерполяція рендерить вираз як текст. Усередині стоїть шаблонний вираз, обчислений щодо екземпляра компонента, а результат перетворюється через toString і вставляється саме як текст, а не як розмітка - тому інтерполяція не може відкрити діру для XSS. Обмежуйся читанням: виклик, що виконує справжню роботу, спрацьовуватиме на кожному проході change detection, а їх буває чимало.',
    },
    code: '<p>{{ user().name }}</p>\n<p>{{ count() > 0 ? "some" : "none" }}</p>\n\n<!-- Inserted as text, so this shows the tag rather than running it -->\n<p>{{ "<script>alert(1)</script>" }}</p>\n\n<!-- Avoid: runs on every change detection pass -->\n<p>{{ expensiveTotal() }}</p>',
  },
  {
    id: 'q-template-expressions',
    category: 'templates',
    q: {
      en: 'What is a template expression, and which JavaScript features are banned in one?',
      uk: 'Що таке шаблонний вираз і які можливості JavaScript у ньому заборонені?',
    },
    a: {
      en: 'It is the expression inside interpolation or a property binding, evaluated against the component only. Assignment, new, increment and decrement, bitwise operators and chaining with a semicolon or comma are all rejected, and globals are simply not in scope. The reason is that an expression is evaluated on every check, so it must be free of side effects - the restrictions make that hard to violate by accident.',
      uk: "Це вираз усередині інтерполяції або прив'язки до властивості, обчислений лише щодо компонента. Присвоєння, new, інкремент і декремент, побітові оператори та об'єднання через крапку з комою чи кому - усе це відхиляється, а глобальні значення просто не входять в область видимості. Причина в тому, що вираз обчислюється на кожній перевірці, тож має бути без побічних ефектів, а обмеження роблять порушення цього правила важким випадково.",
    },
    code: '<p>{{ items().length }}</p>          <!-- ok -->\n<p>{{ total() | currency }}</p>      <!-- ok -->\n\n<p>{{ count = 5 }}</p>               <!-- error: assignment not allowed -->\n<p>{{ new Date() }}</p>              <!-- error: new not allowed -->\n<p>{{ i++ }}</p>                     <!-- error: side effect -->\n<p>{{ window.location.href }}</p>    <!-- error: not on the component -->',
  },
  {
    id: 'q-template-statements',
    category: 'templates',
    q: {
      en: 'What is a template statement, and how does it differ from a template expression?',
      uk: 'Що таке шаблонна інструкція і чим вона відрізняється від шаблонного виразу?',
    },
    a: {
      en: 'A statement is the right side of an event binding, and it is meant to change something - so assignment and chaining with a semicolon are allowed there, exactly where they are banned in an expression. The asymmetry is deliberate: expressions are evaluated constantly and must be pure, statements run once per user action and exist to cause an effect. $event is in scope only inside a statement.',
      uk: "Інструкція - це права частина прив'язки події, і вона призначена щось змінювати, тому присвоєння та об'єднання через крапку з комою тут дозволені - саме там, де у виразі вони заборонені. Асиметрія навмисна: вирази обчислюються постійно і мають бути чистими, а інструкції виконуються раз на дію користувача й існують заради ефекту. $event доступний лише всередині інструкції.",
    },
    code: '<button (click)="count.set(0)">Reset</button>\n<button (click)="save(); close()">Save and close</button>\n\n<input (input)="term.set($any($event.target).value)" />\n<app-picker (picked)="onPicked($event)" />\n\n<!-- Long statements belong in the class, not here -->\n<button (click)="submit()">Submit</button>',
  },
  {
    id: 'q-property-vs-attribute-binding',
    category: 'templates',
    q: {
      en: 'What is the difference between property binding and attribute binding?',
      uk: "Яка різниця між прив'язкою до властивості та прив'язкою до атрибута?",
    },
    a: {
      en: 'A property binding sets a property on the DOM object; an attribute binding sets an HTML attribute. Most of the time you want the property, because the attribute only holds the initial value while the property holds the live one. Use attr. when no matching property exists - which is the case for every ARIA attribute, for colspan, and for SVG - otherwise Angular throws, because binding to a property that is not there is nearly always a typo.',
      uk: "Прив'язка до властивості задає властивість DOM-об'єкта, прив'язка до атрибута - HTML-атрибут. Здебільшого потрібна саме властивість, бо атрибут містить лише початкове значення, а властивість - актуальне. Використовуй attr., коли відповідної властивості немає: це стосується всіх ARIA-атрибутів, colspan і SVG. Інакше Angular кине помилку, бо прив'язка до неіснуючої властивості майже завжди є друкарською помилкою.",
    },
    code: '<input [value]="name()" />              <!-- property: the live value -->\n<div [attr.aria-expanded]="open()">     <!-- no such property, so attr. -->\n<td [attr.colspan]="span()">            <!-- same -->\n\n<!-- Binding attr.value would set the initial value only, and\n     typing in the field would then stop matching it. -->\n\n<!-- null on an attribute binding removes the attribute entirely -->\n<div [attr.aria-current]="isActive() ? \'page\' : null">',
  },
  {
    id: 'q-class-and-style-bindings',
    category: 'templates',
    q: {
      en: 'How do class and style bindings work, and why prefer them over ngClass and ngStyle?',
      uk: "Як працюють прив'язки class і style і чому вони кращі за ngClass та ngStyle?",
    },
    a: {
      en: 'class.name takes a boolean and toggles that one class; style.prop takes a value and can carry a unit suffix. They are compiled into direct instructions, whereas ngClass and ngStyle are directives that diff an object you rebuild on every check - which also means a fresh object literal in the template allocates on every pass. The bindings are also clearer to read, because each line names exactly one class.',
      uk: "class.name приймає булеве значення і перемикає один клас; style.prop приймає значення і може нести суфікс одиниці виміру. Вони компілюються у прямі інструкції, тоді як ngClass і ngStyle є директивами, що діфають об'єкт, який ти перебудовуєш на кожній перевірці, - а літерал об'єкта прямо в шаблоні до того ж виділяє пам'ять на кожному проході. Прив'язки ще й читабельніші, бо кожен рядок називає рівно один клас.",
    },
    code: '<div [class.active]="isActive()" [class.disabled]="isDisabled()"></div>\n<div [style.width.px]="width()" [style.color]="color()"></div>\n\n<!-- Avoid: a new object every check, and the class names are buried -->\n<div [ngClass]="{ active: isActive(), disabled: isDisabled() }"></div>\n\n<!-- A whole computed string is fine when the set is dynamic -->\n<div [class]="classes()"></div>',
  },
  {
    id: 'q-two-way-binding',
    category: 'templates',
    q: {
      en: 'How does two-way binding work, and what does the banana-in-a-box syntax expand to?',
      uk: 'Як працює двостороння прив\'язка і на що розгортається синтаксис "банан у коробці"?',
    },
    a: {
      en: 'It is not a mechanism of its own. [(value)] expands to a property binding on value plus an event binding on valueChange, so any component exposing that pair supports it - which is exactly what model() creates. Knowing the expansion matters when it breaks: if the name of the output does not end in Change, the sugar simply does not apply and the compiler will say so.',
      uk: "Це не окремий механізм. [(value)] розгортається у прив'язку до властивості value плюс прив'язку події valueChange, тож будь-який компонент, що надає цю пару, її підтримує - а саме таку пару створює model(). Знати розгортання варто тоді, коли воно ламається: якщо ім'я аутпуту не закінчується на Change, синтаксичний цукор просто не застосується, і компілятор про це скаже.",
    },
    code: '// model() creates both halves at once\nexport class FieldComponent {\n  readonly value = model("");\n}\n\n<app-field [(value)]="name" />\n\n<!-- ...is exactly the same as: -->\n<app-field [value]="name()" (valueChange)="name.set($event)" />',
  },
  {
    id: 'q-control-flow-if',
    category: 'templates',
    q: {
      en: 'How does @if work, and what does it improve over *ngIf?',
      uk: 'Як працює @if і що він покращує порівняно з *ngIf?',
    },
    a: {
      en: 'It creates and destroys the block when the condition changes - the same semantics as *ngIf. What it improves is everything around that: no import needed, since it is compiler syntax rather than a directive; a real else-if chain instead of nested templates; and an as clause that narrows the type, so the block below it knows the value is not null. It also produces less code in the bundle.',
      uk: 'Він створює і знищує блок, коли змінюється умова, - семантика та сама, що й у *ngIf. Покращується все навколо: імпорт не потрібен, бо це синтаксис компілятора, а не директива; справжній ланцюжок else-if замість вкладених шаблонів; і клауза as, яка звужує тип, тож блок нижче знає, що значення не null. До того ж коду в бандлі виходить менше.',
    },
    code: '@if (user(); as u) {\n  <p>{{ u.name }}</p>        <!-- u is User, not User | null -->\n} @else {\n  <p>Not signed in</p>\n}\n\n<!-- Before: an import, a nested template, and no narrowing -->\n<p *ngIf="user() as u; else empty">{{ u.name }}</p>\n<ng-template #empty><p>Not signed in</p></ng-template>',
  },
  {
    id: 'q-control-flow-if-else',
    category: 'templates',
    q: {
      en: 'How do you render an alternative branch with @else and @else if?',
      uk: 'Як відрендерити альтернативну гілку через @else і @else if?',
    },
    a: {
      en: 'They chain directly, like the JavaScript they are named after: conditions are evaluated in order and the first match wins, so exactly one branch is ever in the DOM. This is the case that was genuinely awkward with *ngIf, where each alternative needed its own ng-template and a reference variable, and reading the chain meant jumping between them.',
      uk: "Вони з'єднуються напряму, як і JavaScript, за яким названі: умови обчислюються по порядку, перемагає перша, що збіглася, тож у DOM завжди рівно одна гілка. Саме цей випадок був справді незручним з *ngIf, де кожна альтернатива потребувала власного ng-template і змінної-посилання, а щоб прочитати ланцюжок, доводилося стрибати між ними.",
    },
    code: '@if (state() === "loading") {\n  <app-spinner />\n} @else if (state() === "error") {\n  <app-error [message]="error()" />\n} @else if (items().length === 0) {\n  <p>Nothing here yet.</p>\n} @else {\n  <app-list [items]="items()" />\n}',
  },
  {
    id: 'q-control-flow-for',
    category: 'templates',
    q: {
      en: 'How does @for work, and what does its @empty block do?',
      uk: 'Як працює @for і для чого потрібен його блок @empty?',
    },
    a: {
      en: 'It repeats its block once per item and requires a track expression identifying each one. @empty renders instead when the collection is empty - which used to need a separate @if on length, duplicating the condition and letting the two drift apart. The block is part of the same construct, so it cannot go out of sync with the loop it belongs to.',
      uk: 'Він повторює свій блок раз на елемент і вимагає виразу track, який ідентифікує кожен з них. @empty рендериться натомість, коли колекція порожня, - раніше для цього потрібен був окремий @if на length, що дублював умову й дозволяв їм розійтися. Тепер цей блок є частиною тієї самої конструкції, тож розсинхронізуватися з циклом, якому належить, він не може.',
    },
    code: '@for (item of items(); track item.id) {\n  <app-row [item]="item" />\n} @empty {\n  <p>No results.</p>\n}\n\n<!-- Before: the condition lived twice, and could disagree with itself -->\n<app-row *ngFor="let item of items(); trackBy: byId" [item]="item" />\n<p *ngIf="items().length === 0">No results.</p>',
  },
  {
    id: 'q-for-track-required',
    category: 'templates',
    q: {
      en: 'Why is track mandatory in @for, and what breaks when you track by the wrong key?',
      uk: "Чому track є обов'язковим у @for і що ламається, коли ключ обрано неправильно?",
    },
    a: {
      en: 'Track tells Angular which rendered node corresponds to which item, so a changed list is patched instead of rebuilt. It is mandatory because the default without it is the worst case, and it used to be silently opt-in. Track by an unstable key - the index of a reordered list, or the object identity when the server sends fresh objects - and every row is destroyed and recreated: focus is lost, inputs reset, animations restart.',
      uk: "track каже Angular, який відрендерений вузол відповідає якому елементу, тож змінений список патчиться, а не перебудовується. Він обов'язковий, бо поведінка без нього - найгірший випадок, а раніше це було тихою опцією. Візьми нестабільний ключ - індекс у списку, що переставляється, чи ідентичність об'єкта, коли сервер шле нові об'єкти, - і кожен рядок знищується та створюється заново: фокус втрачено, поля скинуто, анімації перезапущено.",
    },
    code: '@for (user of users(); track user.id) { ... }      <!-- stable identity -->\n\n@for (user of users(); track $index) { ... }       <!-- only if never reordered -->\n\n<!-- Wrong: a refetch produces new objects, so every row is recreated -->\n@for (user of users(); track user) { ... }',
  },
  {
    id: 'q-for-context-variables',
    category: 'templates',
    q: {
      en: 'Which contextual variables does @for expose, and how do you alias them?',
      uk: 'Які контекстні змінні надає @for і як задати їм псевдоніми?',
    },
    a: {
      en: '$index, $first, $last, $even, $odd and $count. Alias them with a let clause when loops are nested and the inner one would otherwise shadow the outer, which is the usual reason to bother. Note that $count forces the collection to be counted, so it is not free on a large list.',
      uk: '$index, $first, $last, $even, $odd і $count. Задавай їм псевдоніми через клаузу let, коли цикли вкладені й внутрішній інакше перекрив би зовнішній, - це і є звична причина цим займатися. Врахуй, що $count змушує порахувати колекцію, тож на великому списку він не безкоштовний.',
    },
    code: '@for (row of rows(); track row.id; let rowIndex = $index, isLast = $last) {\n  @for (cell of row.cells; track cell.id; let cellIndex = $index) {\n    <td [class.last-row]="isLast">{{ rowIndex }}.{{ cellIndex }}</td>\n  }\n}',
  },
  {
    id: 'q-control-flow-switch',
    category: 'templates',
    q: {
      en: 'When is @switch a better fit than a chain of @if blocks?',
      uk: 'Коли @switch підходить краще за ланцюжок блоків @if?',
    },
    a: {
      en: 'When every branch tests the same value against a different constant. The expression is then written once instead of repeated in each condition, which is one fewer place to make a mistake. It compares with strict equality and takes an optional @default. If the branches test different things, keep @if - a switch on a boolean expression is a chain of @if in disguise.',
      uk: "Коли кожна гілка перевіряє те саме значення на різні константи. Тоді вираз пишеться один раз замість повторення в кожній умові - на одне місце для помилки менше. Порівняння суворе, є необов'язковий @default. Якщо ж гілки перевіряють різні речі, лишай @if: switch по булевому виразу - це переодягнений ланцюжок @if.",
    },
    code: '@switch (status()) {\n  @case ("draft") { <app-draft-badge /> }\n  @case ("published") { <app-live-badge /> }\n  @case ("archived") { <app-archive-badge /> }\n  @default { <app-unknown-badge /> }\n}\n\n<!-- Strict equality: "1" never matches the number 1 -->',
  },
  {
    id: 'q-let-declaration',
    category: 'templates',
    q: {
      en: 'What does the @let declaration do, and where does its value stay live?',
      uk: 'Що робить оголошення @let і де його значення лишається актуальним?',
    },
    a: {
      en: 'It names an expression so the template can reuse it without repeating the chain, and the name stays live: read it anywhere below in the same scope and you get the current value, not a snapshot. It is read-only - you cannot assign to it from an event handler - which is what keeps it a naming device rather than template-local state.',
      uk: 'Воно дає імʼя виразу, щоб шаблон міг перевикористати його, не повторюючи ланцюжок, і це імʼя лишається живим: прочитай його будь-де нижче в тій самій області - отримаєш поточне значення, а не знімок. Воно доступне лише для читання: присвоїти з обробника події не можна, і саме це тримає його засобом іменування, а не станом усередині шаблону.',
    },
    code: '@let profile = user().profile;\n@let fullName = profile.firstName + " " + profile.lastName;\n\n<h1>{{ fullName }}</h1>\n<img [src]="profile.avatarUrl" [alt]="fullName" />\n\n<!-- Read-only: this is a compile error -->\n<button (click)="fullName = \'x\'">Rename</button>',
  },
  {
    id: 'q-ng-container',
    category: 'templates',
    q: {
      en: 'What is ng-container, and when do you need it?',
      uk: 'Що таке ng-container і коли він потрібен?',
    },
    a: {
      en: 'A grouping element that leaves no trace in the DOM. You need it when markup requires a wrapper but the layout or the HTML rules forbid one: applying a directive to several siblings, or repeating rows inside a table or a grid where an extra div would break the display model. With built-in control flow the old reason to use it - hosting a structural directive - is largely gone.',
      uk: 'Це елемент для групування, який не лишає сліду в DOM. Він потрібен, коли розмітці потрібна обгортка, а розкладка чи правила HTML її забороняють: застосувати директиву до кількох сусідів або повторити рядки всередині таблиці чи ґрида, де зайвий div зламав би модель відображення. З вбудованим control flow стара причина його вживати - тримати структурну директиву - здебільшого відпала.',
    },
    code: '<!-- A div here would break the table layout -->\n<tbody>\n  @for (row of rows(); track row.id) {\n    <ng-container>\n      <tr class="main">...</tr>\n      <tr class="details">...</tr>\n    </ng-container>\n  }\n</tbody>',
  },
  {
    id: 'q-ng-template',
    category: 'templates',
    q: {
      en: 'What is ng-template, and why does nothing render until something instantiates it?',
      uk: 'Що таке ng-template і чому нічого не рендериться, доки його хтось не інстанціює?',
    },
    a: {
      en: 'It defines a block of markup without rendering it - the compiler turns it into a TemplateRef, a recipe someone has to execute. That is exactly what @if and @for do internally with their blocks. On its own you use it to hand a piece of markup to a component: a custom row template for a table, an empty state supplied by the caller.',
      uk: 'Він визначає блок розмітки, не рендерячи його: компілятор перетворює його на TemplateRef, тобто рецепт, який хтось має виконати. Саме це роблять усередині @if і @for зі своїми блоками. Самостійно ж ним користуються, щоб передати шматок розмітки компоненту: власний шаблон рядка для таблиці, порожній стан, наданий викликачем.',
    },
    code: '<!-- Defined here, rendered by the table when it needs a row -->\n<ng-template #rowTemplate let-user>\n  <td>{{ user.name }}</td>\n  <td>{{ user.email }}</td>\n</ng-template>\n\n<app-table [rows]="users()" [rowTemplate]="rowTemplate" />\n\nexport class TableComponent {\n  readonly rowTemplate = input.required<TemplateRef<{ $implicit: User }>>();\n}',
  },
  {
    id: 'q-ng-template-outlet',
    category: 'templates',
    q: {
      en: 'What is ngTemplateOutlet, and how do you pass context into it?',
      uk: 'Що таке ngTemplateOutlet і як передати в нього контекст?',
    },
    a: {
      en: 'It renders a TemplateRef at that position, with an optional context object. Keys of the context become template variables through let-, and the $implicit key is the one bound when let- is written without a name. It is the lightweight alternative to a dynamic component: no class, no injector, no lifecycle - just markup the caller supplied.',
      uk: "Він рендерить TemplateRef у цій позиції з необовʼязковим обʼєктом контексту. Ключі контексту стають шаблонними змінними через let-, а ключ $implicit прив'язується тоді, коли let- написано без імені. Це легка альтернатива динамічному компоненту: без класу, без інжектора, без життєвого циклу - лише розмітка, яку надав викликач.",
    },
    code: '<ng-container\n  *ngTemplateOutlet="rowTemplate(); context: { $implicit: user, index: i }"\n/>\n\n<!-- Consumed as: -->\n<ng-template #rowTemplate let-user let-i="index">\n  <td>{{ i }}. {{ user.name }}</td>\n</ng-template>',
  },
  {
    id: 'q-template-reference-variables',
    category: 'templates',
    q: {
      en: 'What is a template reference variable, and what does it hold on a component versus a plain element?',
      uk: 'Що таке шаблонна змінна-посилання і що вона містить для компонента, а що для звичайного елемента?',
    },
    a: {
      en: 'A name declared with # that other parts of the same template can use. On a plain element it is the DOM element; on a component it is the component instance, so you can call its methods from the template. Assigning a value - #form="ngForm" - asks for a directive that exported itself under that name instead. It is scoped to the template it is declared in, and blocks such as @if create their own scope.',
      uk: 'Це імʼя, оголошене через #, яким можуть користуватися інші частини того самого шаблону. На звичайному елементі воно містить DOM-елемент, на компоненті - екземпляр компонента, тож із шаблону можна викликати його методи. Присвоєння значення - #form="ngForm" - натомість просить директиву, яка експортувала себе під цим імʼям. Змінна обмежена шаблоном, у якому оголошена, а блоки на кшталт @if створюють власну область.',
    },
    code: '<input #field />                     <!-- HTMLInputElement -->\n<app-player #player />               <!-- the PlayerComponent instance -->\n<form #form="ngForm">                <!-- the exported NgForm directive -->\n\n<button (click)="player.play()">Play</button>\n<button [disabled]="form.invalid">Save</button>\n<p>{{ field.value }}</p>',
  },
  {
    id: 'q-safe-navigation-operator',
    category: 'templates',
    q: {
      en: 'What does the safe navigation operator do in a template?',
      uk: 'Що робить оператор безпечної навігації в шаблоні?',
    },
    a: {
      en: 'It stops evaluation and yields nothing when the left side is null or undefined, instead of throwing. It exists because a template renders before its data arrives, and a single error in one binding aborts the whole view. With @if narrowing the value once around the block, you usually need it far less than templates from a few years ago suggest.',
      uk: "Він припиняє обчислення і не дає нічого, коли ліва частина є null або undefined, замість того щоб кинути помилку. Він існує тому, що шаблон рендериться до приходу даних, а одна помилка в одній прив'язці зриває весь вигляд. Якщо ж @if один раз звужує значення навколо блоку, потреба в ньому значно менша, ніж підказують шаблони кількарічної давнини.",
    },
    code: '<p>{{ user()?.address?.city }}</p>\n\n<!-- Usually better: narrow once, then read plainly -->\n@if (user(); as u) {\n  <p>{{ u.address.city }}</p>\n}',
  },
  {
    id: 'q-non-null-assertion-template',
    category: 'templates',
    q: {
      en: 'What is the non-null assertion operator in templates, and why is it a smell?',
      uk: 'Що таке оператор ствердження non-null у шаблонах і чому він є ознакою проблеми?',
    },
    a: {
      en: 'It silences the template type checker for one expression by asserting the value is not null. Nothing is checked at runtime, so if you are wrong the template throws exactly where the compiler warned you. It is a smell because the alternative is usually an @if that both proves the claim and gives the block a narrowed type - the assertion is a promise, the condition is a guarantee.',
      uk: 'Він глушить перевірку типів у шаблоні для одного виразу, стверджуючи, що значення не null. Під час виконання нічого не перевіряється, тож якщо ти помилився, шаблон впаде рівно там, де компілятор попереджав. Це ознака проблеми, бо альтернативою зазвичай є @if, який і доводить твердження, і дає блоку звужений тип: ствердження - це обіцянка, умова - гарантія.',
    },
    code: '<p>{{ user()!.name }}</p>            <!-- a promise to the compiler -->\n\n@if (user(); as u) {\n  <p>{{ u.name }}</p>                <!-- a guarantee at runtime -->\n}',
  },
  {
    id: 'q-any-cast-function',
    category: 'templates',
    q: {
      en: 'What is the $any() cast function, and when is it the wrong answer?',
      uk: 'Що таке функція приведення $any() і коли вона є хибним рішенням?',
    },
    a: {
      en: 'It casts an expression to any, turning off type checking for it. The one defensible use is reading a property the DOM types do not model precisely, such as the value off an event target. It is the wrong answer when the type error is telling you something true - that an input has the wrong type, or a property no longer exists - and $any() will happily let that ship.',
      uk: 'Вона приводить вираз до any, вимикаючи для нього перевірку типів. Єдине виправдане застосування - читання властивості, яку типи DOM моделюють неточно, як-от value з цілі події. Хибним рішенням вона є тоді, коли помилка типу говорить правду: що інпут має неправильний тип або що властивості вже немає, - і $any() спокійно пропустить це в продакшен.',
    },
    code: '<!-- Defensible: EventTarget has no value in the DOM types -->\n<input (input)="term.set($any($event.target).value)" />\n\n<!-- Better still, no cast at all: -->\n<input #box (input)="term.set(box.value)" />\n\n<!-- Wrong: this hides a real mismatch until runtime -->\n<app-badge [count]="$any(label())" />',
  },
  {
    id: 'q-template-operator-precedence',
    category: 'templates',
    q: {
      en: 'What is the precedence between the pipe operator and the ternary operator?',
      uk: 'Який пріоритет має оператор пайпа порівняно з тернарним оператором?',
    },
    a: {
      en: 'The pipe binds more tightly than the ternary, so a | b ? c : d parses as (a | b) ? c : d. That surprises people who expect the conditional to be resolved first, and it silently produces the wrong output rather than an error. Parenthesise whenever the two appear together - the parentheses cost nothing and remove the question.',
      uk: 'Пайп звʼязується сильніше за тернарний оператор, тож a | b ? c : d розбирається як (a | b) ? c : d. Це дивує тих, хто очікує, що спершу обчислиться умова, і дає мовчки неправильний результат замість помилки. Став дужки завжди, коли ці два оператори стоять поруч: дужки нічого не коштують і знімають питання.',
    },
    code: '{{ value | uppercase ? "yes" : "no" }}\n<!-- parses as: (value | uppercase) ? "yes" : "no" -->\n\n{{ (isActive() ? activeLabel() : idleLabel()) | uppercase }}\n<!-- what you almost certainly meant -->',
  },
  {
    id: 'q-strict-templates',
    category: 'templates',
    q: {
      en: 'What does strictTemplates turn on, and which errors does it catch?',
      uk: 'Що вмикає strictTemplates і які помилки він виявляє?',
    },
    a: {
      en: 'Full type checking of bindings against the classes they target: input types must match, $event is typed by the event rather than any, template reference variables get their real type, and pipe arguments and return types are checked. It catches the errors that used to reach production as a blank screen - a string bound where a number was expected, or a property renamed in the class but not in the HTML.',
      uk: "Повну перевірку типів прив'язок щодо класів, на які вони спрямовані: типи інпутів мають збігатися, $event типізується подією, а не як any, шаблонні змінні-посилання отримують свій справжній тип, а аргументи й типи повернення пайпів перевіряються. Він ловить саме ті помилки, які раніше доїжджали до продакшену у вигляді порожнього екрана: рядок там, де очікувалося число, або властивість, перейменована в класі, але не в HTML.",
    },
    code: '// tsconfig.json\n{\n  "angularCompilerOptions": {\n    "strictTemplates": true,\n    "strictNullInputTypes": true\n  }\n}\n\n<app-badge [count]="\'seven\'" />\n<!-- NG2322: Type string is not assignable to type number -->',
  },
  {
    id: 'q-hidden-vs-if',
    category: 'templates',
    q: {
      en: 'What is the difference between @if and the hidden property?',
      uk: 'Яка різниця між @if і властивістю hidden?',
    },
    a: {
      en: '@if removes the element from the DOM, destroying the component and its subscriptions; hidden leaves it there and hides it with CSS, so it keeps running and keeps its state. Use hidden for something toggled constantly and cheap to keep alive, and @if for anything expensive or that should reset. Note that any display value in your CSS overrides hidden, which is a classic reason for a "hidden" element that is plainly visible.',
      uk: '@if прибирає елемент з DOM, знищуючи компонент і його підписки; hidden лишає його на місці й ховає засобами CSS, тож він продовжує працювати і зберігає стан. Бери hidden для того, що перемикається постійно і дешеве в утриманні, і @if для всього дорогого або того, що має скидатися. Врахуй, що будь-яке значення display у твоєму CSS перекриває hidden - класична причина "прихованого" елемента, який чудово видно.',
    },
    code: '<!-- Destroyed and rebuilt: state and subscriptions go with it -->\n@if (showChart()) { <app-chart [data]="data()" /> }\n\n<!-- Stays alive, keeps its scroll position, keeps polling -->\n<app-chart [hidden]="!showChart()" [data]="data()" />\n\n/* This defeats hidden entirely: */\napp-chart { display: block; }\n/* Fix: */\napp-chart:not([hidden]) { display: block; }',
  },
  {
    id: 'q-script-tag-in-template',
    category: 'templates',
    q: {
      en: 'What happens if you put a script tag inside a template?',
      uk: 'Що станеться, якщо помістити тег script усередину шаблону?',
    },
    a: {
      en: 'Angular strips it and logs a warning; the code never runs. This is deliberate policy rather than an oversight - a template is data as far as the security model is concerned, so nothing in it may become executable code. The same applies to markup arriving through innerHTML, where the sanitizer removes script tags and event handler attributes.',
      uk: 'Angular вирізає його і пише попередження; код не виконується ніколи. Це свідома політика, а не недогляд: з точки зору моделі безпеки шаблон є даними, тож ніщо в ньому не може стати виконуваним кодом. Те саме стосується розмітки, що надходить через innerHTML, де санітизатор прибирає теги script і атрибути-обробники подій.',
    },
    code: '<!-- Removed at compile time, with a warning -->\n<script>alert(1)</script>\n\n<!-- Also sanitized: the script is stripped, the text survives -->\n<div [innerHTML]="\'<script>alert(1)</script><b>hi</b>\'"></div>\n<!-- renders: <b>hi</b> -->',
  },
  {
    id: 'q-inline-vs-external-template',
    category: 'templates',
    q: {
      en: 'When would you choose an inline template over an external template file?',
      uk: 'Коли варто обрати вбудований шаблон замість окремого файлу шаблону?',
    },
    a: {
      en: 'Inline reads well only for a few lines, and it costs editor support: many setups give weaker highlighting and formatting inside a template string. An external file keeps markup out of the class, is diffed independently, and gives every component the same shape whatever its size. Pick one convention per codebase - the inconsistency costs more than either choice.',
      uk: 'Вбудований варіант добре читається лише на кілька рядків, і він коштує підтримки редактора: у багатьох налаштуваннях підсвічування і форматування всередині шаблонного рядка слабші. Окремий файл тримає розмітку поза класом, діфиться незалежно і дає кожному компоненту однакову форму незалежно від розміру. Обери одну конвенцію на кодову базу: непослідовність коштує дорожче за будь-який із варіантів.',
    },
    code: '@Component({\n  selector: "app-user-card",\n  templateUrl: "./user-card.html",   // relative to this TS file\n  styleUrl: "./user-card.scss",\n})\nexport class UserCardComponent {}',
  },
  {
    id: 'q-logic-in-templates',
    category: 'templates',
    q: {
      en: 'Why is calling a method from a template a problem, and what do you do instead?',
      uk: 'Чому виклик методу з шаблону є проблемою і що робити натомість?',
    },
    a: {
      en: 'Because the template has no way to know whether the result changed, so the method runs on every change detection pass - many times a second under default change detection, for a value that rarely moves. Replace it with a computed signal: it caches, recomputes only when a dependency changes, and reads in the template exactly the same way.',
      uk: 'Бо шаблон не може знати, чи змінився результат, тож метод виконується на кожному проході change detection - багато разів на секунду при типовій стратегії, заради значення, яке майже не рухається. Заміни його на computed-сигнал: він кешує, перераховується лише при зміні залежності й читається в шаблоні точно так само.',
    },
    code: '<!-- Runs on every check -->\n<p>{{ getTotal() }}</p>\n\n// Runs when items() changes, and not otherwise\nprotected readonly total = computed(() =>\n  this.items().reduce((sum, item) => sum + item.price, 0),\n);\n\n<p>{{ total() }}</p>',
  },
];
