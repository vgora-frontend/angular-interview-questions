import { Question } from '../../models/content.model';

// Signals, derived state and the signal-based component API.
export const SIGNALS_QUESTIONS: Question[] = [
  {
    id: 'q-what-is-signal',
    category: 'signals',
    q: {
      en: 'What is a signal, and what does automatic dependency tracking mean?',
      uk: 'Що таке signal і що означає автоматичне відстеження залежностей?',
    },
    a: {
      en: 'A signal is a value with a wrapper that knows who read it. Reading it inside a computed, an effect or a template registers that consumer as a dependency, so when the value changes Angular knows exactly what has to be recomputed - nothing has to be declared or wired up. It is always synchronous and always holds a value, which is what makes it safe to read directly in a template.',
      uk: "Signal - це значення в обгортці, яка знає, хто його прочитав. Читання всередині computed, ефекту або шаблону реєструє цього споживача як залежність, тож при зміні значення Angular точно знає, що треба перерахувати, - нічого не потрібно оголошувати чи зв'язувати вручну. Він завжди синхронний і завжди має значення, і саме це робить безпечним його читання прямо в шаблоні.",
    },
    code: 'const count = signal(0);\nconst double = computed(() => count() * 2);   // reading count() creates the edge\n\ncount.set(5);\ndouble();   // 10 - and Angular knew to recompute it without being told',
  },
  {
    id: 'q-signal-vs-behaviorsubject',
    category: 'signals',
    q: {
      en: 'How does a signal differ from a BehaviorSubject?',
      uk: 'Чим signal відрізняється від BehaviorSubject?',
    },
    a: {
      en: 'A BehaviorSubject pushes to whoever subscribed manually: it has no idea who read it, no coordinated batching, and it needs explicit unsubscription. A signal is pulled, and it knows its readers - so derived values recompute exactly once per change and there is nothing to unsubscribe from. What a BehaviorSubject still has is a place in time: operators for debouncing, cancelling and ordering, which signals have no vocabulary for.',
      uk: 'BehaviorSubject надсилає значення тим, хто підписався вручну: він не знає, хто його прочитав, не має узгодженого батчингу і потребує явного відписування. Signal читають, і він знає своїх читачів, тож похідні значення перераховуються рівно раз на зміну і відписуватися ні від чого. Що лишається за BehaviorSubject - це місце в часі: оператори для debounce, скасування та впорядкування, для яких у сигналів словника немає.',
    },
    code: '// BehaviorSubject: manual wiring, manual teardown\nprivate readonly count$ = new BehaviorSubject(0);\nreadonly double$ = this.count$.pipe(map((n) => n * 2));\n\n// Signal: the graph wires itself, and there is nothing to unsubscribe\nreadonly count = signal(0);\nreadonly double = computed(() => this.count() * 2);',
  },
  {
    id: 'q-signal-set-vs-update',
    category: 'signals',
    q: {
      en: 'What is the difference between set() and update(), and why is there no mutate()?',
      uk: 'Яка різниця між set() і update() і чому немає mutate()?',
    },
    a: {
      en: 'set replaces the value; update computes the new value from the current one, which is what you want whenever the next state depends on the last. mutate was removed because in-place mutation defeats the change check: the reference stays the same, so equality sees no change and nothing downstream recomputes. Replacing the object rather than editing it is the contract, not a style preference.',
      uk: "set замінює значення; update обчислює нове з поточного - і саме це потрібно, коли наступний стан залежить від попереднього. mutate прибрали, бо мутація на місці ламає перевірку зміни: посилання лишається тим самим, тож рівність не бачить різниці і нічого нижче не перераховується. Заміна об'єкта замість його редагування - це контракт, а не питання стилю.",
    },
    code: 'items.set([]);                                     // replace\nitems.update((list) => [...list, item]);           // derive from current\n\n// Why mutate() had to go: the reference never changes, so nothing recomputes\nitems().push(item);',
  },
  {
    id: 'q-signal-equality-function',
    category: 'signals',
    q: {
      en: 'How does a signal decide that its value changed, and when do you pass a custom equality function?',
      uk: 'Як signal вирішує, що його значення змінилося, і коли передавати власну функцію рівності?',
    },
    a: {
      en: 'By Object.is against the previous value, so a new object is always a change even if its contents are identical. Pass a custom equal when that costs you real work: an array rebuilt on every response, or an object whose meaningful identity is one field. Keep the comparison cheap - it runs on every write - and never make it lie, or a genuine change will be dropped silently.',
      uk: "Через Object.is щодо попереднього значення, тож новий об'єкт завжди є зміною, навіть коли його вміст ідентичний. Передавай власний equal, коли це коштує реальної роботи: масив, перебудований на кожну відповідь, або об'єкт, чия змістовна ідентичність - одне поле. Тримай порівняння дешевим - воно виконується на кожен запис - і ніколи не роби його брехливим, інакше справжня зміна тихо пропаде.",
    },
    code: '// Every response is a new array, so every response looks like a change\nconst rows = signal<Row[]>([], {\n  equal: (a, b) => a.length === b.length && a.every((row, i) => row.id === b[i].id),\n});\n\n// Cheap and honest: compare the identity that actually matters\nconst user = signal<User | null>(null, { equal: (a, b) => a?.id === b?.id });',
  },
  {
    id: 'q-computed-lazy-memoized',
    category: 'signals',
    q: {
      en: 'Why is computed() lazy and memoized, and what follows from that for its body?',
      uk: 'Чому computed() є лінивим і кешованим і що з цього випливає для його тіла?',
    },
    a: {
      en: 'A computed does not run when a dependency changes - it marks itself stale. The body runs on the next read and the result is cached until a dependency changes again. So a computed nobody reads costs nothing, and one read ten times in a template runs once. What follows is that the body must be pure: a side effect in it would fire at unpredictable moments, or never.',
      uk: 'Computed не виконується при зміні залежності - він лише позначає себе застарілим. Тіло виконується при наступному читанні, а результат кешується, доки якась залежність не зміниться знову. Тому computed, якого ніхто не читає, не коштує нічого, а прочитаний десять разів у шаблоні виконається один раз. З цього випливає, що тіло має бути чистим: побічний ефект спрацьовував би в непередбачувані моменти або не спрацював би зовсім.',
    },
    code: 'const total = computed(() => {\n  console.log("computing");      // once per change, not once per read\n  return items().reduce((sum, item) => sum + item.price, 0);\n});\n\n<p>{{ total() }}</p>\n<p>{{ total() }}</p>   <!-- "computing" is logged once -->',
  },
  {
    id: 'q-computed-dynamic-dependencies',
    category: 'signals',
    q: {
      en: 'How does a computed track dependencies that only some branches of its body read?',
      uk: 'Як computed відстежує залежності, які читаються лише в деяких гілках його тіла?',
    },
    a: {
      en: 'Dependencies are recorded per run, not declared once - so the set is whatever the body actually read this time. A branch not taken contributes no dependency, and the computed will not recompute when that signal changes. It is precise and it is also a trap when a condition short-circuits: an early return means the signals below it are untracked until the condition changes.',
      uk: 'Залежності записуються на кожен запуск, а не оголошуються один раз, тож набір - це те, що тіло справді прочитало цього разу. Гілка, яку не взяли, не додає залежності, і computed не перерахується при зміні того сигналу. Це точно - і це ж пастка, коли умова коротко замикає: ранній return означає, що сигнали під ним не відстежуються, доки умова не зміниться.',
    },
    code: 'const label = computed(() => {\n  if (!enabled()) {\n    return "off";        // total() was not read, so it is not a dependency\n  }\n  return `Total: ${total()}`;\n});\n\n// While enabled() is false, changing total() recomputes nothing - correctly.',
  },
  {
    id: 'q-signals-glitch-free',
    category: 'signals',
    q: {
      en: 'What does it mean that the signal graph is glitch-free?',
      uk: 'Що означає, що граф сигналів є glitch-free?',
    },
    a: {
      en: 'A consumer never sees an inconsistent intermediate state. If two computeds derive from the same source and a third derives from both, that third one recomputes once, after both have settled - it cannot observe one updated and the other stale. With observables the same graph gives you the diamond problem: combineLatest emits twice, and the first emission is a combination that never truly existed.',
      uk: 'Споживач ніколи не бачить неузгодженого проміжного стану. Якщо два computed походять від одного джерела, а третій - від обох, то третій перерахується один раз, після того як обидва усталилися: він не може побачити один оновленим, а другий застарілим. З observable той самий граф дає проблему ромба: combineLatest емітить двічі, і перша емісія - це комбінація, якої насправді ніколи не існувало.',
    },
    code: 'const width = signal(2);\nconst doubled = computed(() => width() * 2);\nconst tripled = computed(() => width() * 3);\nconst sum = computed(() => doubled() + tripled());   // recomputes once\n\nwidth.set(4);\nsum();   // 20 - never briefly 16, which combineLatest would have emitted',
  },
  {
    id: 'q-effect-when-to-use',
    category: 'signals',
    q: {
      en: 'What is effect() for, and why is it the wrong tool for deriving state?',
      uk: 'Для чого потрібен effect() і чому він неправильний інструмент для похідного стану?',
    },
    a: {
      en: 'For synchronising signal state with something outside the graph: logging, localStorage, a canvas, a third-party widget. It is the wrong tool for derived state because it runs eagerly and writes rather than returns - so the value exists in two places, can be read before the effect has run, and the reason it holds what it holds is a side effect somewhere else. A computed states the relationship instead.',
      uk: 'Для синхронізації сигнального стану з чимось поза графом: логування, localStorage, canvas, сторонній віджет. Для похідного стану він неправильний, бо виконується жадібно і пише, а не повертає: значення існує у двох місцях, його можна прочитати до того, як ефект спрацював, а причина його вмісту - побічний ефект десь інде. Computed натомість просто описує залежність.',
    },
    code: '// Right: talking to something outside the graph\neffect(() => localStorage.setItem("theme", this.theme()));\n\n// Wrong: derived state written by a side effect\neffect(() => this.total.set(this.items().reduce((s, i) => s + i.price, 0)));\n\n// Right: the relationship, stated once\nreadonly total = computed(() => this.items().reduce((s, i) => s + i.price, 0));',
  },
  {
    id: 'q-effect-cleanup',
    category: 'signals',
    q: {
      en: 'How does an effect clean up after itself, and when is it destroyed?',
      uk: 'Як ефект прибирає за собою і коли він знищується?',
    },
    a: {
      en: 'The callback receives an onCleanup function, which runs before the next execution and once more on destroy - so a timer or a listener created in the effect is torn down in the same place it was created. The effect itself is destroyed with the injection context that created it, which is usually the component, and it can be stopped early with the EffectRef it returns.',
      uk: 'Колбек отримує функцію onCleanup, яка виконується перед наступним запуском і ще раз при знищенні, - тож таймер чи слухач, створений в ефекті, демонтується там само, де його створили. Сам ефект знищується разом з контекстом інжекції, який його створив, - зазвичай це компонент, - а зупинити його раніше можна через EffectRef, який він повертає.',
    },
    code: 'effect((onCleanup) => {\n  const socket = new WebSocket(this.url());   // re-runs when url() changes\n  socket.addEventListener("message", this.handle);\n\n  onCleanup(() => socket.close());           // before the next run, and on destroy\n});\n\nconst ref = effect(() => { ... });\nref.destroy();                                // stop it early',
  },
  {
    id: 'q-untracked',
    category: 'signals',
    q: {
      en: 'What does untracked() do, and what breaks without it?',
      uk: 'Що робить untracked() і що ламається без нього?',
    },
    a: {
      en: 'It reads a signal without registering a dependency. Without it, an effect that reads five signals re-runs when any of the five changes, even the four it only needed as context. The typical case is an effect that should react to one thing and merely consult others: wrap the consulted reads in untracked and the effect fires when it should rather than constantly.',
      uk: "Він читає сигнал, не реєструючи залежності. Без нього ефект, який читає п'ять сигналів, перезапускається при зміні будь-якого з п'яти - навіть тих чотирьох, що були потрібні лише як контекст. Типовий випадок - ефект, який має реагувати на одне і лише поглядати на решту: загорни ці читання в untracked, і ефект спрацьовуватиме тоді, коли треба, а не постійно.",
    },
    code: '// Re-runs when the filter changes too - almost certainly not intended\neffect(() => this.analytics.track(this.page(), this.filter()));\n\n// Reacts to the page, merely consults the filter\neffect(() => {\n  const page = this.page();\n  untracked(() => this.analytics.track(page, this.filter()));\n});',
  },
  {
    id: 'q-linked-signal',
    category: 'signals',
    q: {
      en: 'When would you reach for linkedSignal() instead of computed()?',
      uk: 'Коли варто взяти linkedSignal() замість computed()?',
    },
    a: {
      en: 'When a value derives from other state but the user must still be able to override it. A computed is read-only, so a selected row or a draft value that should reset when the source list changes cannot be one. linkedSignal gives you a writable signal that recomputes from its source and forgets local writes whenever that source changes - which is exactly the behaviour you would otherwise write with an effect and a flag.',
      uk: 'Коли значення походить з іншого стану, але користувач має змогу його перевизначити. Computed доступний лише для читання, тож вибраний рядок чи чернетка значення, яка має скидатися при зміні джерела, ним бути не може. linkedSignal дає записуваний сигнал, який перераховується з джерела і забуває локальні записи щоразу, коли джерело змінюється, - саме та поведінка, яку інакше пишуть ефектом і прапорцем.',
    },
    code: 'const options = signal<string[]>(["a", "b", "c"]);\nconst chosen = linkedSignal(() => options()[0]);\n\nchosen.set("c");            // the user picks another one\noptions.set(["x", "y"]);    // the source changed - chosen is "x" again',
  },
  {
    id: 'q-resource-api',
    category: 'signals',
    q: {
      en: 'What does resource() do, and what state does it expose while loading?',
      uk: 'Що робить resource() і який стан він надає під час завантаження?',
    },
    a: {
      en: 'It ties an async loader to a reactive request: when the signals the request reads change, the loader runs again and the previous call is abandoned. It exposes value, error, isLoading and a status - idle, loading, reloading, resolved, error, local - plus reload and a writable value for optimistic updates. The point is that the loading flag and the cancellation are no longer yours to maintain.',
      uk: "Він зв'язує асинхронний завантажувач з реактивним запитом: коли сигнали, які читає запит, змінюються, завантажувач запускається знову, а попередній виклик покидають. Він надає value, error, isLoading і status - idle, loading, reloading, resolved, error, local - плюс reload і записуване value для оптимістичних оновлень. Суть у тому, що прапорець завантаження і скасування більше не на тобі.",
    },
    code: 'protected readonly user = resource({\n  params: () => ({ id: this.userId() }),               // re-runs when this changes\n  loader: ({ params, abortSignal }) =>\n    fetch(`/api/users/${params.id}`, { signal: abortSignal }).then((r) => r.json()),\n});\n\n@if (user.isLoading()) { <app-spinner /> }\n@else if (user.value(); as value) { <p>{{ value.name }}</p> }',
  },
  {
    id: 'q-signal-input',
    category: 'signals',
    q: {
      en: 'How does input() differ from @Input, and what does input.required() enforce?',
      uk: 'Чим input() відрізняється від @Input і що гарантує input.required()?',
    },
    a: {
      en: 'input() returns a read-only signal, so an input composes with computed and effect and there is no ngOnChanges to write. It is also read-only by design, which enforces the one-way flow a decorator merely suggested. input.required() has no default and no undefined in its type: the compiler rejects a template that omits the binding, so the class can read it without a null check - though reading it before it is set still throws.',
      uk: "input() повертає сигнал лише для читання, тож інпут поєднується з computed та ефектами, і писати ngOnChanges не треба. Він також незмінний за задумом, що нав'язує односторонній потік, який декоратор лише пропонував. input.required() не має ні значення за замовчуванням, ні undefined у типі: компілятор відхилить шаблон без цієї прив'язки, тож клас читає його без перевірки на null, - хоча читання до присвоєння все одно кине помилку.",
    },
    code: 'readonly user = input.required<User>();       // User, never undefined\nreadonly compact = input(false);              // boolean, with a default\n\n// Composes, which a decorator field could not:\nprotected readonly initials = computed(() => toInitials(this.user().name));\n\n<app-card />   <!-- compile error: required input "user" is missing -->',
  },
  {
    id: 'q-model-signal',
    category: 'signals',
    q: {
      en: 'What is model(), and how does it implement two-way binding?',
      uk: "Що таке model() і як він реалізує двосторонню прив'язку?",
    },
    a: {
      en: 'model() creates a writable signal that is both an input and an output: writing to it emits on a matching Change output, which is exactly the pair the banana-in-a-box syntax expands to. It is the right tool for a component that genuinely owns an editable value - a form control, a toggle - and the wrong one everywhere else, since it reintroduces a second writer for the same state.',
      uk: 'model() створює записуваний сигнал, який є водночас інпутом і аутпутом: запис у нього емітить у відповідний аутпут Change - саме та пара, на яку розгортається синтаксис "банан у коробці". Це правильний інструмент для компонента, який справді володіє редагованим значенням - контрол форми, перемикач, - і неправильний в усіх інших випадках, бо повертає другого автора того самого стану.',
    },
    code: 'export class ToggleComponent {\n  readonly checked = model(false);\n\n  protected flip(): void {\n    this.checked.update((value) => !value);   // emits checkedChange\n  }\n}\n\n<app-toggle [(checked)]="isEnabled" />\n<!-- same as [checked]="isEnabled()" (checkedChange)="isEnabled.set($event)" -->',
  },
  {
    id: 'q-output-function',
    category: 'signals',
    q: {
      en: 'How does the output() function differ from @Output with an EventEmitter?',
      uk: 'Чим функція output() відрізняється від @Output з EventEmitter?',
    },
    a: {
      en: 'It gives you an emit-only API instead of a full Subject, so a consumer cannot subscribe to it, complete it or push values into it from outside. It also cleans up with the component automatically, and outputFromObservable bridges a stream into an output when the event genuinely comes from one. EventEmitter always was a Subject wearing a different name, and that was more surface than an output ever needed.',
      uk: 'Він дає API лише для емісії замість повноцінного Subject, тож споживач не може на нього підписатися, завершити його чи заштовхати значення знадвору. Він також прибирається разом з компонентом автоматично, а outputFromObservable перекидає потік в аутпут, коли подія справді походить з потоку. EventEmitter завжди був тим самим Subject під іншою назвою, і це була зайва поверхня для аутпуту.',
    },
    code: 'readonly saved = output<Order>();          // emit only\nreadonly closed = output<void>();\n\nthis.saved.emit(order);\n\n// When the event really does come from a stream:\nreadonly resized = outputFromObservable(fromEvent(window, "resize"));',
  },
  {
    id: 'q-signal-queries',
    category: 'signals',
    q: {
      en: 'What do the signal-based viewChild and contentChild queries change compared with the decorators?',
      uk: 'Що змінюють сигнальні запити viewChild і contentChild порівняно з декораторами?',
    },
    a: {
      en: 'The result is a signal, so it can be read in a computed and it updates when the view changes - no static flag to reason about and no definite-assignment assertion. The type tells the truth: viewChild returns T | undefined because the element may not be rendered, and viewChild.required narrows that at the cost of throwing if it is genuinely absent. The plural forms return a readonly array signal.',
      uk: 'Результат є сигналом, тож його можна читати в computed, і він оновлюється при зміні вигляду - жодного прапорця static і жодного ствердження певного присвоєння. Тип каже правду: viewChild повертає T | undefined, бо елемент може бути не відрендерений, а viewChild.required звужує це ціною винятку, якщо елемента справді немає. Множинні форми повертають сигнал з незмінним масивом.',
    },
    code: 'readonly input = viewChild<ElementRef<HTMLInputElement>>("field");   // may be undefined\nreadonly list = viewChild.required(ListComponent);                   // throws if absent\nreadonly rows = viewChildren(RowComponent);\n\nprotected readonly rowCount = computed(() => this.rows().length);   // reactive',
  },
  {
    id: 'q-signals-in-services',
    category: 'signals',
    q: {
      en: 'How do you expose signal state from a service without letting callers write to it?',
      uk: 'Як віддати сигнальний стан із сервісу, не дозволяючи викликачам його змінювати?',
    },
    a: {
      en: 'Keep the writable signal private and expose asReadonly, or a computed over it. Methods on the service become the only way state changes, which is what makes a change traceable - you can find every writer by searching the class. A computed is also fine as a public surface, since it has no set. Handing out the writable signal is the signal equivalent of returning a Subject.',
      uk: 'Тримай записуваний сигнал приватним і віддавай asReadonly або computed над ним. Методи сервісу стають єдиним способом змінити стан - саме це робить зміну простежуваною: усіх авторів запису можна знайти пошуком по класу. Computed теж підходить як публічна поверхня, бо в нього немає set. Віддавати записуваний сигнал - це сигнальний відповідник повертання Subject.',
    },
    code: '@Injectable({ providedIn: "root" })\nexport class CartStore {\n  private readonly state = signal<Item[]>([]);\n\n  readonly items = this.state.asReadonly();\n  readonly total = computed(() => this.state().reduce((sum, i) => sum + i.price, 0));\n\n  add(item: Item): void {\n    this.state.update((list) => [...list, item]);   // the only writer\n  }\n}',
  },
  {
    id: 'q-signals-and-immutability',
    category: 'signals',
    q: {
      en: 'Why must the value inside a signal be treated as immutable?',
      uk: 'Чому значення всередині сигналу слід вважати незмінним?',
    },
    a: {
      en: 'Because change is detected by comparing references. Edit the object in place and the reference is unchanged, so the signal reports no change and every computed, effect and template that depends on it keeps the old rendering while holding the new data. The symptom is a value that is provably correct in the console and stale on screen - and there is no error to lead you there.',
      uk: "Бо зміна виявляється порівнянням посилань. Відредагуй об'єкт на місці - посилання не змінилося, тож сигнал не повідомляє про зміну, і кожен computed, ефект і шаблон, що від нього залежать, лишаються зі старим рендерингом, тримаючи нові дані. Симптом - значення, яке в консолі очевидно правильне, а на екрані застаріле, і жодної помилки, яка привела б тебе до причини.",
    },
    code: '// The screen does not change, and nothing warns you\nthis.user().name = "Ada";\nthis.items().push(item);\n\n// Replace instead\nthis.user.update((user) => ({ ...user, name: "Ada" }));\nthis.items.update((items) => [...items, item]);',
  },
  {
    id: 'q-signal-testing',
    category: 'signals',
    q: {
      en: 'How do you test a computed signal and an effect?',
      uk: 'Як тестувати computed-сигнал і ефект?',
    },
    a: {
      en: 'A computed needs no framework at all: set the sources, read the computed, assert. An effect does, because effects run as part of change detection - create it inside TestBed.runInInjectionContext and flush with TestBed.tick() before asserting, or it will not have run yet. That asymmetry is a good argument for keeping logic in computeds: they are testable as plain functions.',
      uk: 'Computed не потребує жодного фреймворка: задай джерела, прочитай computed, перевір. Ефекту фреймворк потрібен, бо ефекти виконуються як частина change detection - створюй його всередині TestBed.runInInjectionContext і проштовхуй через TestBed.tick() перед перевіркою, інакше він ще не спрацював. Ця асиметрія - добрий аргумент тримати логіку в computed: вони тестуються як звичайні функції.',
    },
    code: 'it("totals the items", () => {\n  const items = signal([{ price: 2 }, { price: 3 }]);\n  const total = computed(() => items().reduce((s, i) => s + i.price, 0));\n\n  expect(total()).toBe(5);      // no TestBed involved\n});\n\nit("writes the theme to storage", () => {\n  TestBed.runInInjectionContext(() => effect(() => save(theme())));\n  theme.set("dark");\n  TestBed.tick();               // without this, the effect has not run\n\n  expect(saved).toBe("dark");\n});',
  },
  {
    id: 'q-migrate-to-signals',
    category: 'signals',
    q: {
      en: 'How would you migrate a component from RxJS state to signals?',
      uk: 'Як мігрувати компонент зі стану на RxJS до сигналів?',
    },
    a: {
      en: 'Work from the edges in. Replace BehaviorSubjects holding state with signals and their derived pipes with computeds; keep RxJS wherever time is involved, and end those pipes with toSignal so the template reads a signal. Then delete the async pipes and the subscriptions they replaced. The CLI has migrations for inputs, outputs and queries, which covers the mechanical part - the state itself is a judgement call, one component at a time.',
      uk: 'Іди від краю до середини. Заміни BehaviorSubject-и зі станом на сигнали, а їхні похідні pipe - на computed; лиши RxJS усюди, де йдеться про час, і завершуй ці pipe через toSignal, щоб шаблон читав сигнал. Далі видали async pipe і підписки, які вони замінили. У CLI є міграції для інпутів, аутпутів і запитів - вони покривають механічну частину, а сам стан є питанням рішення, по одному компоненту за раз.',
    },
    code: '// Before\nprivate readonly filter$ = new BehaviorSubject("");\nreadonly results$ = this.filter$.pipe(switchMap((f) => this.api.search(f)));\n\n// After: state is a signal, time stays in RxJS, the template reads a signal\nreadonly filter = signal("");\nreadonly results = toSignal(\n  toObservable(this.filter).pipe(debounceTime(300), switchMap((f) => this.api.search(f))),\n  { initialValue: [] },\n);\n\n// ng generate @angular/core:signal-input-migration',
  },
];
