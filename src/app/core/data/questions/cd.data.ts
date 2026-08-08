import { Question } from '../../models/content.model';

// Change detection, zone.js and the road to zoneless.
export const CD_QUESTIONS: Question[] = [
  {
    id: 'q-what-is-change-detection',
    category: 'cd',
    q: {
      en: 'What is change detection, and what does Angular actually compare?',
      uk: 'Що таке change detection і що саме Angular порівнює?',
    },
    a: {
      en: 'It is the process of bringing the DOM back in line with the component state. Angular does not diff the DOM: for each binding in a template it keeps the value it last wrote and compares the current expression against it with a reference check. If they differ, that one binding is updated. So the unit of work is a binding, not a component or an element - which is why the cost scales with how many bindings you have, not how much markup.',
      uk: "Це процес приведення DOM у відповідність до стану компонентів. Angular не діфає DOM: для кожної прив'язки в шаблоні він тримає значення, яке записав останнім, і порівнює поточний вираз із ним за посиланням. Якщо вони різні, оновлюється саме ця прив'язка. Тож одиницею роботи є прив'язка, а не компонент чи елемент, - тому вартість залежить від кількості прив'язок, а не від обсягу розмітки.",
    },
    code: '<!-- Three bindings, checked and compared independently -->\n<p>{{ user().name }}</p>\n<img [src]="user().avatar" />\n<div [class.active]="isActive()"></div>\n\n<!-- A reference check: this passes a new array every time,\n     so the binding is considered changed on every pass -->\n<app-list [items]="items().filter((i) => i.active)" />',
  },
  {
    id: 'q-what-is-zone-js',
    category: 'cd',
    q: {
      en: 'What is zone.js, and how does it know that something may have changed?',
      uk: 'Що таке zone.js і звідки він знає, що щось могло змінитися?',
    },
    a: {
      en: "It monkey-patches the browser's async APIs - setTimeout, promises, event listeners, XHR - so Angular is notified when any of them completes. That is the whole trick, and it is a guess: zone.js knows that something asynchronous finished, not that any state changed, so it triggers a full check every time and lets the comparison find out. It is also why the framework needed no explicit notification from your code.",
      uk: "Він патчить асинхронні API браузера - setTimeout, проміси, слухачі подій, XHR, - щоб Angular отримував повідомлення про завершення будь-якого з них. У цьому весь трюк, і це припущення: zone.js знає, що завершилося щось асинхронне, а не що щось змінилося, тож щоразу запускає повну перевірку і дає порівнянню з'ясувати решту. Саме тому фреймворку не потрібне було явне повідомлення від твого коду.",
    },
    code: '// zone.js has patched all three, so each one triggers a check\nsetTimeout(() => (this.label = "done"));\nfetch("/api").then(() => (this.label = "loaded"));\nbutton.addEventListener("click", () => (this.label = "clicked"));\n\n// It does not know whether anything changed - only that a task finished.',
  },
  {
    id: 'q-cd-trigger-scenarios',
    category: 'cd',
    q: {
      en: 'Which events trigger a change detection cycle?',
      uk: 'Які події запускають цикл change detection?',
    },
    a: {
      en: 'Under zone.js: any patched async task - a DOM event, a timer, an HTTP response, a resolved promise. Independently of the zone: markForCheck, detectChanges and ApplicationRef.tick called by hand, the async pipe on an emission, and a signal read in a template being updated. In zoneless mode only that second group remains, which is the entire behavioural difference.',
      uk: "Під zone.js - будь-яка пропатчена асинхронна задача: подія DOM, таймер, відповідь HTTP, розв'язаний проміс. Незалежно від зони - markForCheck, detectChanges і ApplicationRef.tick, викликані вручну, async pipe при емісії та оновлення сигналу, прочитаного в шаблоні. У режимі zoneless лишається тільки друга група - і в цьому вся поведінкова різниця.",
    },
    code: '// Triggers a check under zone.js, and nothing at all when zoneless\nsetTimeout(() => (this.label = "done"), 1000);\n\n// Triggers a check either way\nthis.label.set("done");            // a signal read by the template\ncdr.markForCheck();\nappRef.tick();',
  },
  {
    id: 'q-cd-traversal-order',
    category: 'cd',
    q: {
      en: 'In what order does Angular walk the component tree during a check?',
      uk: 'У якому порядку Angular обходить дерево компонентів під час перевірки?',
    },
    a: {
      en: "Top down, depth first, starting from the root - a parent is checked and its bindings updated before its children are visited. That is why a parent may change a child's input during its own check and the child sees the new value in the same pass, while a child changing a parent's state is a value modified after it was checked, which is the ExpressionChanged error. One pass, one direction: data flows down.",
      uk: "Згори вниз, у глибину, від кореня: батька перевіряють і оновлюють його прив'язки перед відвідуванням дітей. Саме тому батько може змінити інпут дитини під час власної перевірки, і дитина побачить нове значення в тому самому проході, тоді як дитина, що змінює стан батька, - це значення, змінене після перевірки, тобто помилка ExpressionChanged. Один прохід, один напрямок: дані течуть униз.",
    },
    code: '// Root -> Layout -> Sidebar -> Nav -> Content -> List -> Row\n//\n// Parent to child, during one pass: fine.\n// Child to parent, during one pass: ExpressionChangedAfterItHasBeenChecked.',
  },
  {
    id: 'q-default-vs-onpush',
    category: 'cd',
    q: {
      en: 'What is the difference between the Default and OnPush change detection strategies?',
      uk: 'Яка різниця між стратегіями change detection Default і OnPush?',
    },
    a: {
      en: 'Default checks a component on every cycle, whatever happened. OnPush skips it unless something marked it dirty - an input reference changed, an event fired inside it, a signal it reads updated, or markForCheck was called. OnPush is not an optimisation to apply when things get slow: it is a contract that the component only changes for those reasons, and applying it late tends to expose the places that broke the contract.',
      uk: 'Default перевіряє компонент на кожному циклі, хай там що. OnPush пропускає його, якщо ніщо не позначило його "брудним": не змінилося посилання інпуту, не спрацювала подія всередині, не оновився прочитаний сигнал, не викликали markForCheck. OnPush - не оптимізація на випадок, коли стало повільно: це контракт про те, що компонент змінюється лише з цих причин, і застосований пізно він зазвичай виявляє місця, які цей контракт порушували.',
    },
    code: '@Component({\n  selector: "app-row",\n  templateUrl: "./row.html",\n  changeDetection: ChangeDetectionStrategy.OnPush,\n})\nexport class RowComponent {\n  readonly item = input.required<Item>();   // a new reference marks it dirty\n}',
  },
  {
    id: 'q-onpush-triggers',
    category: 'cd',
    q: {
      en: 'What exactly marks an OnPush component for check?',
      uk: 'Що саме позначає OnPush-компонент для перевірки?',
    },
    a: {
      en: 'Four things. An input receiving a new reference. An event handler firing inside its template. A signal read in its template being updated. An explicit markForCheck, which the async pipe calls for you. Nothing else - and in particular, mutating an object the component received, or a subscription writing to a field, is not on that list, which is where the surprises come from.',
      uk: "Чотири речі. Інпут, який отримав нове посилання. Обробник події, що спрацював у його шаблоні. Оновлення сигналу, прочитаного в його шаблоні. Явний markForCheck, який async pipe викликає за тебе. Більше нічого - і зокрема мутація отриманого об'єкта чи підписка, що пише в поле, у цьому списку відсутні, і саме звідти беруться несподіванки.",
    },
    code: '// Marks it dirty\n<app-row [item]="newItemObject" />\n<button (click)="save()">Save</button>      <!-- inside its own template -->\nthis.count.set(2);                          // a signal the template reads\n\n// Does not mark it dirty\nthis.item().name = "changed";               // mutation, same reference\nthis.socket.subscribe((v) => (this.value = v));   // no markForCheck',
  },
  {
    id: 'q-onpush-object-mutation',
    category: 'cd',
    q: {
      en: 'Why does mutating an input object leave an OnPush component stale?',
      uk: "Чому мутація об'єкта-інпуту лишає OnPush-компонент застарілим?",
    },
    a: {
      en: "Because the check compares the input against its previous value by reference, and a mutation leaves the reference identical - so from Angular's point of view nothing was passed in. The component holds the new data and renders the old. Replace the object instead of editing it, which is the same rule signals enforce, and the reason immutable updates are worth the spread syntax.",
      uk: "Бо перевірка порівнює інпут з попереднім значенням за посиланням, а мутація лишає посилання тим самим - тож з точки зору Angular нічого не передавали. Компонент тримає нові дані і рендерить старі. Заміняй об'єкт, а не редагуй його: це те саме правило, яке нав'язують сигнали, і причина, чому незмінні оновлення варті синтаксису розпакування.",
    },
    code: '// The row holds the new name and renders the old one\nthis.selected.name = "Ada";\n\n// A new reference, so the input is seen as changed\nthis.selected = { ...this.selected, name: "Ada" };\nthis.items.update((list) => list.map((i) => (i.id === id ? { ...i, name: "Ada" } : i)));',
  },
  {
    id: 'q-markforcheck-vs-detectchanges',
    category: 'cd',
    q: {
      en: 'What is the difference between markForCheck, detectChanges and ApplicationRef.tick?',
      uk: 'Яка різниця між markForCheck, detectChanges і ApplicationRef.tick?',
    },
    a: {
      en: 'markForCheck marks this component and its ancestors as dirty and returns - the actual check happens on the next cycle. detectChanges runs a check of this component and its children right now, synchronously. tick runs a check of the whole application. Prefer markForCheck: detectChanges called during an existing cycle is how a re-entrant check and an ExpressionChanged error are produced.',
      uk: 'markForCheck позначає цей компонент і його предків "брудними" і повертається - сама перевірка станеться на наступному циклі. detectChanges виконує перевірку цього компонента і його дітей прямо зараз, синхронно. tick перевіряє весь застосунок. Надавай перевагу markForCheck: саме detectChanges, викликаний під час уже наявного циклу, породжує повторний вхід у перевірку і помилку ExpressionChanged.',
    },
    code: 'this.cdr.markForCheck();     // "check me next cycle" - the safe default\nthis.cdr.detectChanges();    // "check me now" - synchronous, and re-entrant\nthis.appRef.tick();          // check everything - almost never what you want\n\n// The async pipe calls markForCheck, which is why it works with OnPush.',
  },
  {
    id: 'q-detach-reattach',
    category: 'cd',
    q: {
      en: 'When would you detach a view from change detection, and what do you take on by doing it?',
      uk: 'Коли варто відчепити вигляд від change detection і яку відповідальність ти при цьому береш?',
    },
    a: {
      en: 'When a component updates far more often than a user can perceive - a live chart, a high-frequency feed - and you want to render on your own schedule. detach removes it from the tree walk entirely, and from then on nothing updates unless you call detectChanges yourself. You have taken over rendering for that subtree: every missed call is a stale screen with no error to explain it. Measure first, because OnPush plus signals usually suffices.',
      uk: 'Коли компонент оновлюється значно частіше, ніж людина здатна помітити - живий графік, потік з високою частотою, - і ти хочеш рендерити за власним розкладом. detach повністю вилучає його з обходу дерева, і далі ніщо не оновиться, доки ти сам не викличеш detectChanges. Ти взяв рендеринг цього піддерева на себе: кожен пропущений виклик - це застарілий екран без жодної помилки, яка це пояснила б. Спершу міряй: OnPush із сигналами зазвичай достатньо.',
    },
    code: 'constructor() {\n  this.cdr.detach();   // out of the tree walk entirely\n\n  // Render at 10fps instead of on every one of 500 messages a second\n  interval(100)\n    .pipe(takeUntilDestroyed())\n    .subscribe(() => this.cdr.detectChanges());\n}',
  },
  {
    id: 'q-expression-changed-error',
    category: 'cd',
    q: {
      en: 'What causes ExpressionChangedAfterItHasBeenCheckedError, and how do you fix it properly?',
      uk: 'Через що виникає ExpressionChangedAfterItHasBeenCheckedError і як виправити це правильно?',
    },
    a: {
      en: "A bound value changed after Angular checked it and before the pass finished - typically a child writing to a parent's state in ngAfterViewInit, or a getter that returns a new object each call. The proper fix is to stop the write happening mid-pass: derive the value with a computed, or move it to where the data flows down. setTimeout makes the message go away by deferring to the next cycle, which hides the problem and costs an extra render.",
      uk: "Прив'язане значення змінилося після того, як Angular його перевірив, і до завершення проходу: типово дитина пише у стан батька в ngAfterViewInit або геттер повертає новий об'єкт на кожен виклик. Правильне виправлення - не допустити запису посеред проходу: виведи значення через computed або перенеси його туди, куди дані течуть униз. setTimeout прибирає повідомлення, відкладаючи все на наступний цикл, - це ховає проблему і коштує зайвого рендерингу.",
    },
    code: '// Cause: a new object on every read, so it never equals the last one\nget style() {\n  return { width: this.width + "px" };\n}\n\n// Fix: a stable, memoized value\nprotected readonly style = computed(() => ({ width: `${this.width()}px` }));\n\n// Not a fix: this defers the write and hides the design problem\nsetTimeout(() => this.parent.title.set("Report"));',
  },
  {
    id: 'q-dev-mode-double-check',
    category: 'cd',
    q: {
      en: 'Why does development mode run change detection twice?',
      uk: 'Чому в режимі розробки change detection виконується двічі?',
    },
    a: {
      en: 'To verify that the first pass left the application stable: the second pass compares every binding again, and any value that differs must have been changed by the rendering itself. That is exactly the ExpressionChanged error, caught in development instead of becoming a subtle inconsistency in production. It also means an impure expression in a template will be reported at once, which is a feature rather than the overhead it looks like.',
      uk: "Щоб перевірити, що перший прохід лишив застосунок стабільним: другий прохід знову порівнює кожну прив'язку, і будь-яке значення, що відрізняється, було змінене самим рендерингом. Це і є помилка ExpressionChanged, зловлена в розробці, а не перетворена на тонку неузгодженість у продакшені. Це також означає, що нечистий вираз у шаблоні буде повідомлено одразу, - і це можливість, а не накладні витрати, якими воно виглядає.",
    },
    code: '// Development: check, then verify the check\n// Production: check once\n//\n// So this is reported while you are developing, not after release:\n<p>{{ Math.random() }}</p>',
  },
  {
    id: 'q-ngzone-run-outside-angular',
    category: 'cd',
    q: {
      en: 'What does runOutsideAngular do, and when is it the right optimisation?',
      uk: 'Що робить runOutsideAngular і коли це доречна оптимізація?',
    },
    a: {
      en: 'It runs a callback outside the zone, so the async work inside it does not trigger change detection. It is right for high-frequency work whose result is not on screen every time: a mousemove handler, a requestAnimationFrame loop, a canvas animation, a third-party library polling. Re-enter with run when you finally do want a render. In zoneless mode this API is unnecessary, because nothing triggered a check from a timer anyway.',
      uk: 'Він виконує колбек поза зоною, тож асинхронна робота всередині не запускає change detection. Це доречно для високочастотної роботи, результат якої не потрапляє на екран щоразу: обробник mousemove, цикл requestAnimationFrame, анімація на canvas, опитування зі сторонньої бібліотеки. Повертайся всередину через run, коли рендеринг таки потрібен. У режимі zoneless це API не потрібне, бо таймер і так не запускав перевірку.',
    },
    code: 'this.zone.runOutsideAngular(() => {\n  const loop = () => {\n    this.drawFrame();          // 60 times a second, no change detection\n    requestAnimationFrame(loop);\n  };\n  loop();\n});\n\n// Back inside when the screen genuinely has to update\nthis.zone.run(() => this.score.set(next));',
  },
  {
    id: 'q-ngzone-onstable',
    category: 'cd',
    q: {
      en: "What do NgZone's onStable, onUnstable and onMicrotaskEmpty tell you?",
      uk: 'Про що повідомляють onStable, onUnstable і onMicrotaskEmpty у NgZone?',
    },
    a: {
      en: "onUnstable fires when the zone starts processing a task, onMicrotaskEmpty when the microtask queue drains - which is when Angular runs change detection - and onStable when there is no pending work at all. Their honest use is measurement and integration: testability, telling a server-side render that the page has settled. Using them to sequence application logic couples that logic to the framework's scheduling, and it breaks entirely when the zone is gone.",
      uk: "onUnstable спрацьовує, коли зона починає обробляти задачу, onMicrotaskEmpty - коли черга мікрозадач спорожніла, і саме тоді Angular виконує change detection, а onStable - коли роботи в очікуванні немає взагалі. Їхнє чесне застосування - вимірювання й інтеграція: тестованість, повідомлення серверному рендерингу, що сторінка усталилася. Використання їх для послідовності прикладної логіки прив'язує цю логіку до планувальника фреймворка і повністю ламається, коли зони немає.",
    },
    code: '// Legitimate: measuring when the application has settled\nthis.zone.onStable.pipe(first()).subscribe(() => this.metrics.markReady());\n\n// A smell: application logic sequenced on framework internals,\n// and it stops working the day you go zoneless.\nthis.zone.onMicrotaskEmpty.subscribe(() => this.recalculateLayout());',
  },
  {
    id: 'q-noop-zone',
    category: 'cd',
    q: {
      en: 'What is a noop zone, and what breaks once you install one?',
      uk: 'Що таке noop-зона і що ламається після її встановлення?',
    },
    a: {
      en: 'A NoopNgZone satisfies the NgZone interface without patching anything, so nothing triggers change detection automatically - it was the way to opt out before zoneless mode existed. Everything relying on the implicit trigger breaks: a field written in a setTimeout never reaches the screen, and the async pipe is fine only because it calls markForCheck itself. Today provideZonelessChangeDetection is the supported route, and it is a stricter, better-defined version of the same idea.',
      uk: 'NoopNgZone задовольняє інтерфейс NgZone, нічого не патчачи, тож ніщо не запускає change detection автоматично - це був спосіб відмовитися, поки не існувало режиму zoneless. Ламається все, що спиралося на неявний запуск: поле, записане в setTimeout, ніколи не доїжджає до екрана, а async pipe працює лише тому, що сам викликає markForCheck. Сьогодні підтримуваним шляхом є provideZonelessChangeDetection - суворіша і краще визначена версія тієї самої ідеї.',
    },
    code: '// The old opt-out\nbootstrapApplication(App, { providers: [{ provide: NgZone, useClass: NoopNgZone }] });\n\n// The supported one\nbootstrapApplication(App, { providers: [provideZonelessChangeDetection()] });',
  },
  {
    id: 'q-zoneless-change-detection',
    category: 'cd',
    q: {
      en: 'What is zoneless change detection, and what has to be true of your code before you enable it?',
      uk: 'Що таке zoneless change detection і яким має бути твій код, перш ніж його вмикати?',
    },
    a: {
      en: 'It drops zone.js entirely and schedules a check only when something explicitly notifies the framework. The prerequisites are all about that notification: state the template renders has to be a signal, or arrive through the async pipe, or be followed by markForCheck. A field assigned in a setTimeout or a subscribe callback will no longer reach the screen. You gain a smaller bundle, cleaner stack traces and far fewer checks - at the cost of every implicit update becoming explicit.',
      uk: 'Він повністю відмовляється від zone.js і планує перевірку лише тоді, коли щось явно повідомляє фреймворк. Усі передумови стосуються саме цього повідомлення: стан, який рендерить шаблон, має бути сигналом, або надходити через async pipe, або супроводжуватися markForCheck. Поле, присвоєне в setTimeout чи в колбеку subscribe, більше не доїде до екрана. Виграш - менший бандл, чистіші стеки викликів і значно менше перевірок; ціна - кожне неявне оновлення стає явним.',
    },
    code: 'providers: [provideZonelessChangeDetection()];\n\n// Fine: the framework is notified\nprotected readonly label = signal("");\nsetTimeout(() => this.label.set("done"));\n\n// Silently never renders: nothing notified anyone\nprotected label = "";\nsetTimeout(() => (this.label = "done"));',
  },
  {
    id: 'q-zoneless-notification-sources',
    category: 'cd',
    q: {
      en: 'Without zone.js, what tells Angular that a re-render is needed?',
      uk: 'Без zone.js що саме повідомляє Angular про потребу перемалювання?',
    },
    a: {
      en: 'A signal read by a template being updated; markForCheck, including the calls the async pipe makes; a template event handler firing; an input reference changing; a host binding updating; a deferred block or animation completing. Everything on that list is something Angular can observe directly, which is the whole design: the framework is told rather than guessing from patched timers.',
      uk: "Оновлення сигналу, прочитаного шаблоном; markForCheck, включно з викликами, які робить async pipe; спрацювання обробника події в шаблоні; зміна посилання інпуту; оновлення хост-прив'язки; завершення відкладеного блоку чи анімації. Усе з цього списку - те, що Angular може спостерігати напряму, і в цьому весь задум: фреймворку повідомляють, а не він вгадує з пропатчених таймерів.",
    },
    code: '// Each of these notifies the scheduler\nthis.count.set(2);                    // signal in a template\nthis.cdr.markForCheck();\n<button (click)="save()">Save</button>\n<app-row [item]="next" />\n\n// This does not notify anything\nthis.plainField = 2;',
  },
  {
    id: 'q-signals-and-change-detection',
    category: 'cd',
    q: {
      en: 'How do signals change what gets re-rendered when state updates?',
      uk: 'Як сигнали змінюють те, що перемальовується при оновленні стану?',
    },
    a: {
      en: 'A signal knows which templates read it, so an update marks exactly those views dirty instead of triggering a walk from the root. In practice that turns a whole-tree check into a targeted one, which is the mechanism behind zoneless mode and the direction the framework is heading - eventually to updating the individual bindings that depend on the signal rather than whole components.',
      uk: 'Сигнал знає, які шаблони його читають, тож оновлення позначає "брудними" саме ці вигляди замість запуску обходу від кореня. На практиці це перетворює перевірку всього дерева на цільову - і саме цей механізм лежить в основі режиму zoneless та напрямку, куди рухається фреймворк: врешті до оновлення окремих прив\'язок, що залежать від сигналу, а не цілих компонентів.',
    },
    code: '// Only the views that read this signal are marked dirty\nthis.selectedId.set(7);\n\n// Compare: under zone.js this timer triggered a check of the entire tree,\n// whether or not anything a template renders had changed at all.\nsetTimeout(() => {});',
  },
  {
    id: 'q-async-pipe-and-onpush',
    category: 'cd',
    q: {
      en: 'Why does the async pipe work with OnPush while a manual subscribe does not?',
      uk: 'Чому async pipe працює з OnPush, а ручна підписка - ні?',
    },
    a: {
      en: 'Because the pipe calls markForCheck on every emission, and a manual subscribe calls nothing. Under default change detection the manual version appears to work, since something else triggers a cycle soon enough - which is why the bug only surfaces when a component is switched to OnPush, or when the zone is removed. Either use the pipe, or mark for check yourself, or hold the value in a signal.',
      uk: 'Бо пайп викликає markForCheck на кожну емісію, а ручна підписка не викликає нічого. При типовій стратегії ручний варіант ніби працює, бо цикл невдовзі запускає щось інше, - саме тому баг виявляється лише при переході компонента на OnPush або при відмові від зони. Або бери пайп, або сам роби markForCheck, або тримай значення в сигналі.',
    },
    code: '<!-- Works: the pipe marks for check -->\n@for (user of users$ | async; track user.id) { ... }\n\n// Silently stale under OnPush\nthis.users$.subscribe((users) => (this.users = users));\n\n// Fixed, two ways\nthis.users$.subscribe((users) => { this.users = users; this.cdr.markForCheck(); });\nprotected readonly users = toSignal(this.users$, { initialValue: [] });',
  },
  {
    id: 'q-cd-performance-symptoms',
    category: 'cd',
    q: {
      en: 'How do you recognise that change detection is your performance problem?',
      uk: 'Як розпізнати, що саме change detection є твоєю проблемою продуктивності?',
    },
    a: {
      en: 'The signature is cost proportional to interaction rather than to data: typing in one field is sluggish while the page renders fine, or scrolling stutters while nothing on screen is changing. In a profile you see many short, repeated calls into detectChangesInternal rather than one long task. The usual causes are method calls and impure pipes in templates, huge lists without OnPush, and new object literals in bindings.',
      uk: "Характерна ознака - вартість, пропорційна взаємодії, а не даним: набір в одному полі гальмує, хоча сторінка рендериться нормально, або прокрутка сіпається, хоча на екрані ніщо не змінюється. У профілі видно багато коротких повторюваних викликів detectChangesInternal, а не одну довгу задачу. Звичні причини - виклики методів і нечисті пайпи в шаблонах, величезні списки без OnPush і нові літерали об'єктів у прив'язках.",
    },
    code: '<!-- Each of these runs on every pass, for every row -->\n<p>{{ formatName(user) }}</p>\n<app-row [config]="{ compact: true }" />\n@for (u of users() | activeOnly; track u.id) { ... }\n\n<!-- Fixed: computed once, stable references -->\n<p>{{ displayName() }}</p>\n<app-row [config]="rowConfig" />',
  },
  {
    id: 'q-profiling-change-detection',
    category: 'cd',
    q: {
      en: 'Which tools do you use to profile change detection?',
      uk: 'Якими інструментами ти профілюєш change detection?',
    },
    a: {
      en: 'Angular DevTools first: its profiler records each cycle, shows which components were checked and how long each took, and names what triggered the cycle - which is usually the answer on its own. The browser performance panel for the surrounding picture. And enabling the debug tools gives you a quick numeric baseline in the console, which is useful for confirming that a change actually helped.',
      uk: 'Спершу Angular DevTools: його профайлер записує кожен цикл, показує, які компоненти перевірялися і скільки кожен зайняв, і називає те, що запустило цикл, - і це зазвичай уже сама відповідь. Панель продуктивності браузера - для загальної картини. А ввімкнення debug-інструментів дає швидкий числовий базовий показник у консолі, і це корисно, щоб підтвердити, що зміна справді допомогла.',
    },
    code: '// A quick numeric baseline in the console\nimport { enableDebugTools } from "@angular/platform-browser";\nenableDebugTools(await bootstrapApplication(App, appConfig));\n\n// then, in the browser console:\nng.profiler.timeChangeDetection();   // ms per cycle',
  },
];
