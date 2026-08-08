import { Question } from '../../models/content.model';

// Observables, operators, subjects and subscription hygiene.
export const RXJS_QUESTIONS: Question[] = [
  {
    id: 'q-what-is-rxjs',
    category: 'rxjs',
    q: {
      en: 'What is RxJS, and why does Angular lean on it?',
      uk: 'Що таке RxJS і чому Angular на нього спирається?',
    },
    a: {
      en: 'A library for composing asynchronous and event-based programs as streams of values over time. Angular leans on it because so much of a framework is exactly that: HTTP responses, router events, form changes, DOM events. One vocabulary covers all of them, and the operators express coordination - cancel the previous request, wait for both, retry twice - that would otherwise be hand-written state.',
      uk: 'Це бібліотека для складання асинхронних і подієвих програм у вигляді потоків значень у часі. Angular на неї спирається тому, що велика частина фреймворка саме такою і є: відповіді HTTP, події роутера, зміни форм, події DOM. Один словник покриває їх усі, а оператори виражають координацію - скасувати попередній запит, дочекатися обох, повторити двічі, - яка інакше була б написаним вручну станом.',
    },
    code: '// The same vocabulary over four different sources\ninject(HttpClient).get<User[]>("/api/users");\ninject(Router).events;\nthis.form.valueChanges;\nfromEvent(window, "resize");',
  },
  {
    id: 'q-what-is-observable',
    category: 'rxjs',
    q: {
      en: 'What is an observable, and why does nothing happen until you subscribe?',
      uk: 'Що таке observable і чому нічого не відбувається, доки ти не підписався?',
    },
    a: {
      en: 'An observable is a description of work, not the work itself - the function you passed runs when someone subscribes, once per subscriber. That laziness is the useful part: nothing is wasted if the result is never needed, and the same observable can be run again on retry or reused elsewhere. It is also the most common surprise: an HttpClient call that nobody subscribes to never sends a request.',
      uk: 'Observable - це опис роботи, а не сама робота: передана функція виконується, коли хтось підписався, по разу на кожного підписника. Ця лінивість і є корисною: нічого не витрачається, якщо результат не знадобився, а той самий observable можна запустити знову при повторі чи перевикористати деінде. Це ж і найчастіша несподіванка: виклик HttpClient, на який ніхто не підписався, не надсилає запиту.',
    },
    code: 'const request$ = this.http.post("/api/orders", order);\n// Nothing has been sent yet.\n\nrequest$.subscribe();   // now it is sent\nrequest$.subscribe();   // and now a second time\n\n// The classic bug: a save that never happens\nsave(): void {\n  this.http.post("/api/orders", order);   // no subscribe, no request\n}',
  },
  {
    id: 'q-observer-and-subscription',
    category: 'rxjs',
    q: {
      en: 'What is an observer, and what does subscribe() hand back?',
      uk: 'Що таке observer і що повертає subscribe()?',
    },
    a: {
      en: 'An observer is the set of callbacks a stream talks to: next for each value, error once and terminally, complete once and terminally. Error and complete are mutually exclusive - a stream ends one way or the other, never both. subscribe returns a Subscription, whose unsubscribe stops the work and releases whatever the producer set up.',
      uk: 'Observer - це набір колбеків, до яких звертається потік: next на кожне значення, error один раз і остаточно, complete один раз і остаточно. Error і complete взаємно виключні: потік завершується або так, або так, але не обома способами. subscribe повертає Subscription, чий unsubscribe зупиняє роботу і звільняє те, що налаштував продюсер.',
    },
    code: 'const subscription = source$.subscribe({\n  next: (value) => console.log(value),\n  error: (error) => console.error(error),   // terminal\n  complete: () => console.log("done"),      // terminal, and never after error\n});\n\nsubscription.unsubscribe();',
  },
  {
    id: 'q-missing-error-handler',
    category: 'rxjs',
    q: {
      en: 'What happens if you subscribe without supplying an error handler?',
      uk: 'Що станеться, якщо підписатися без обробника помилок?',
    },
    a: {
      en: 'The error is rethrown as an uncaught exception on a new call stack, so it reaches the global error handler with no useful context and, more importantly, the subscription is already dead - the stream never emits again. That is why a failed HTTP call in a poller silently stops the polling. Always handle the error, either in subscribe or with catchError in the pipe.',
      uk: 'Помилка перекидається як неперехоплений виняток на новому стеку викликів, тож потрапляє до глобального обробника без корисного контексту і - що важливіше - підписка вже мертва: потік більше не емітить нічого. Саме тому невдалий HTTP-запит у поллері тихо зупиняє опитування. Обробляй помилку завжди: або в subscribe, або через catchError у pipe.',
    },
    code: '// The first failure kills the polling for good\ninterval(5000)\n  .pipe(switchMap(() => this.http.get("/api/status")))\n  .subscribe((status) => this.status.set(status));\n\n// Handled inside, so the outer stream survives\n.pipe(\n  switchMap(() => this.http.get("/api/status").pipe(catchError(() => of(null)))),\n)',
  },
  {
    id: 'q-promise-vs-observable',
    category: 'rxjs',
    q: {
      en: 'What is the difference between a promise and an observable?',
      uk: 'Яка різниця між promise і observable?',
    },
    a: {
      en: 'A promise is eager, produces one value and cannot be cancelled. An observable is lazy, can produce many values over time, and unsubscribing cancels the underlying work. That last point is the one that matters in practice: a request tied to a component that was destroyed, or superseded by a newer one, can actually be aborted. Use a promise where there is exactly one result and no cancellation to think about.',
      uk: "Promise є жадібним, дає одне значення і не скасовується. Observable є лінивим, може давати багато значень у часі, а відписка скасовує роботу під ним. Саме останнє й важить на практиці: запит, прив'язаний до знищеного компонента або витіснений новішим, справді можна перервати. Бери promise там, де результат рівно один і скасування не стоїть на порядку денному.",
    },
    code: '// Promise: already running, and it will finish whatever happens\nconst p = fetch("/api/users");\n\n// Observable: starts on subscribe, and stops on unsubscribe\nconst subscription = this.http.get("/api/users").subscribe();\nsubscription.unsubscribe();   // the request is actually aborted',
  },
  {
    id: 'q-cold-vs-hot-observable',
    category: 'rxjs',
    q: {
      en: 'What is the difference between a cold and a hot observable?',
      uk: 'Яка різниця між холодним і гарячим observable?',
    },
    a: {
      en: 'A cold observable creates its producer per subscriber, so each subscriber gets its own run from the beginning - an HTTP call subscribed to three times sends three requests. A hot observable shares one producer, so subscribers see whatever is emitted from the moment they arrive and miss what came before. Most Angular sources are cold; Subjects and anything shared are hot.',
      uk: 'Холодний observable створює свого продюсера на кожного підписника, тож кожен отримує власний запуск з початку: HTTP-виклик, на який підписалися тричі, надсилає три запити. Гарячий має одного спільного продюсера, тож підписники бачать те, що емітиться з моменту їхньої появи, і не бачать попереднього. Більшість джерел в Angular холодні; Subject і все спільне - гарячі.',
    },
    code: '// Cold: three subscribers, three requests\nconst users$ = this.http.get<User[]>("/api/users");\n\n// Hot: one producer, shared - late subscribers miss earlier values\nconst clicks$ = fromEvent(document, "click");\n\n// Making a cold source hot:\nconst shared$ = users$.pipe(shareReplay({ bufferSize: 1, refCount: true }));',
  },
  {
    id: 'q-multicasting',
    category: 'rxjs',
    q: {
      en: 'What is multicasting, and how do you turn a unicast source into a shared one?',
      uk: 'Що таке мультикастинг і як перетворити unicast-джерело на спільне?',
    },
    a: {
      en: 'Multicasting means one execution of the producer feeding many subscribers, instead of one execution each. You get it with share or shareReplay, which put a Subject in the middle. The choice between them is whether a late subscriber should receive the last value: share gives them nothing until the next emission, shareReplay replays what it buffered.',
      uk: 'Мультикастинг означає одне виконання продюсера, що живить багатьох підписників, замість окремого виконання для кожного. Його дають share і shareReplay, які ставять посередині Subject. Вибір між ними зводиться до того, чи має пізній підписник отримати останнє значення: share не дасть нічого до наступної емісії, shareReplay програє те, що забуферизував.',
    },
    code: '// One request, both subscribers, and the second one gets the cached value\nreadonly users$ = this.http\n  .get<User[]>("/api/users")\n  .pipe(shareReplay({ bufferSize: 1, refCount: true }));\n\n// share(): one execution too, but a late subscriber waits for the next value\nconst live$ = source$.pipe(share());',
  },
  {
    id: 'q-subject-types',
    category: 'rxjs',
    q: {
      en: 'How do Subject, BehaviorSubject, ReplaySubject and AsyncSubject differ?',
      uk: 'Чим відрізняються Subject, BehaviorSubject, ReplaySubject і AsyncSubject?',
    },
    a: {
      en: 'By what a new subscriber receives. Subject: nothing, only future values. BehaviorSubject: the current value immediately, which is why it needs an initial one and can be read synchronously. ReplaySubject: the last n values, or all of them. AsyncSubject: only the final value, and only once the stream completes. For state, BehaviorSubject was the standard answer - and a signal is now the better one.',
      uk: 'Тим, що отримає новий підписник. Subject: нічого, лише майбутні значення. BehaviorSubject: поточне значення одразу, тому йому потрібне початкове і його можна читати синхронно. ReplaySubject: останні n значень або всі. AsyncSubject: лише фінальне значення і лише після завершення потоку. Для стану стандартною відповіддю був BehaviorSubject - а тепер кращою є сигнал.',
    },
    code: 'const plain = new Subject<number>();            // future values only\nconst behavior = new BehaviorSubject(0);        // current value, readable now\nconst replay = new ReplaySubject<number>(3);    // last three\nconst async = new AsyncSubject<number>();       // final value, on complete\n\nbehavior.value;   // 0 - the only one of the four you can read synchronously',
  },
  {
    id: 'q-subject-as-api',
    category: 'rxjs',
    q: {
      en: 'Why should a service expose an observable rather than the subject behind it?',
      uk: 'Чому сервіс має віддавати observable, а не сам subject за ним?',
    },
    a: {
      en: 'Because a Subject is both readable and writable: hand one out and any consumer can call next on it, so the service is no longer the only writer and you can no longer tell where a value came from. asObservable narrows the type to the read half, which turns an accidental write into a compile error. The signal equivalent is asReadonly, and the reasoning is identical.',
      uk: 'Бо Subject доступний і для читання, і для запису: віддай його - і будь-який споживач зможе викликати на ньому next, а отже сервіс уже не єдиний, хто пише, і незрозуміло, звідки взялося значення. asObservable звужує тип до половини для читання, і випадковий запис стає помилкою компіляції. Сигнальний відповідник - asReadonly, і міркування ті самі.',
    },
    code: '@Injectable({ providedIn: "root" })\nexport class CartService {\n  private readonly items = new BehaviorSubject<Item[]>([]);\n  readonly items$ = this.items.asObservable();   // read-only outside\n\n  add(item: Item): void {\n    this.items.next([...this.items.value, item]);\n  }\n}\n\n// The signal version of the same idea:\nprivate readonly state = signal<Item[]>([]);\nreadonly value = this.state.asReadonly();',
  },
  {
    id: 'q-observable-creation-functions',
    category: 'rxjs',
    q: {
      en: 'Which creation functions do you use most, and what does each produce?',
      uk: 'Якими функціями створення ти користуєшся найчастіше і що кожна з них дає?',
    },
    a: {
      en: 'of emits its arguments and completes; from turns an array, promise or iterable into a stream; fromEvent wraps a DOM event; interval and timer emit on a schedule; EMPTY completes immediately; throwError fails immediately; defer builds the observable at subscribe time, which is how you keep a side effect lazy instead of running it when the pipe is constructed.',
      uk: 'of емітить свої аргументи і завершується; from перетворює масив, promise чи ітеровану структуру на потік; fromEvent загортає подію DOM; interval і timer емітять за розкладом; EMPTY завершується одразу; throwError одразу падає; defer будує observable у момент підписки - саме так побічний ефект лишається лінивим, а не виконується під час конструювання pipe.',
    },
    code: 'of(1, 2, 3);                       // 1, 2, 3, complete\nfrom(fetch("/api"));               // a promise as a stream\nfromEvent(window, "resize");\ntimer(1000, 5000);                 // after 1s, then every 5s\nEMPTY;                             // completes with nothing\nthrowError(() => new Error("no"));\n\n// defer: read the token at subscribe time, not at pipe-construction time\ndefer(() => this.http.get("/api/me", { headers: this.authHeaders() }));',
  },
  {
    id: 'q-pipeable-operators',
    category: 'rxjs',
    q: {
      en: 'What is a pipeable operator, and why did RxJS move away from prototype methods?',
      uk: 'Що таке pipeable-оператор і чому RxJS відійшов від методів прототипу?',
    },
    a: {
      en: 'A pipeable operator is a function returning a function from observable to observable, composed with pipe. The move away from prototype patching was for tree-shaking above all: an imported function that nobody uses is dropped from the bundle, whereas patching the prototype made every operator reachable from every observable. It also makes custom operators ordinary functions rather than a framework extension.',
      uk: 'Pipeable-оператор - це функція, що повертає функцію з observable в observable і компонується через pipe. Відхід від патчингу прототипу був передусім заради tree-shaking: імпортована функція, якою ніхто не користується, викидається з бандла, тоді як патчинг прототипу робив кожен оператор досяжним з кожного observable. Це також перетворює власні оператори на звичайні функції, а не на розширення фреймворка.',
    },
    code: 'source$.pipe(\n  filter((value) => value > 0),\n  map((value) => value * 2),\n);\n\n// A custom operator is just a function - nothing framework-specific about it\nexport function logEach<T>(label: string): MonoTypeOperatorFunction<T> {\n  return (source) => source.pipe(tap((value) => console.log(label, value)));\n}',
  },
  {
    id: 'q-flattening-operators',
    category: 'rxjs',
    q: {
      en: 'What is the difference between switchMap, mergeMap, concatMap and exhaustMap?',
      uk: 'Яка різниця між switchMap, mergeMap, concatMap і exhaustMap?',
    },
    a: {
      en: 'All four map a value to an inner observable and flatten the result; they differ in what happens when a new value arrives while an inner stream is still running. switchMap cancels the previous one. mergeMap runs them all at once, so order is not guaranteed. concatMap queues them and preserves order. exhaustMap ignores the new value until the current one finishes. Choosing wrongly here is one of the most common sources of subtle bugs.',
      uk: 'Усі чотири відображають значення в внутрішній observable і сплощують результат; різняться вони тим, що відбувається, коли надходить нове значення, а внутрішній потік ще працює. switchMap скасовує попередній. mergeMap запускає всі одночасно, тож порядок не гарантований. concatMap ставить їх у чергу і зберігає порядок. exhaustMap ігнорує нове значення, доки не завершиться поточне. Неправильний вибір тут - одне з найчастіших джерел тонких багів.',
    },
    code: 'clicks$.pipe(switchMap(() => request$));   // keeps the newest, cancels the rest\nclicks$.pipe(mergeMap(() => request$));    // all in parallel, any order\nclicks$.pipe(concatMap(() => request$));   // one after another, in order\nclicks$.pipe(exhaustMap(() => request$));  // ignores clicks while one is running',
  },
  {
    id: 'q-choose-flattening-operator',
    category: 'rxjs',
    q: {
      en: 'Which flattening operator fits a type-ahead search, and which fits a save button?',
      uk: 'Який оператор сплощення пасує пошуку з підказками, а який - кнопці збереження?',
    },
    a: {
      en: 'Search wants switchMap: only the newest query matters, and cancelling the previous request also prevents a slow early response from overwriting a fast later one. A save button wants exhaustMap: a double click should send one request, not two, and further clicks are ignored while the first is in flight. Getting these two backwards produces duplicate orders and flickering search results respectively.',
      uk: 'Пошуку потрібен switchMap: важливий лише найновіший запит, а скасування попереднього ще й не дає повільній ранній відповіді перезаписати швидку пізнішу. Кнопці збереження потрібен exhaustMap: подвійний клік має надіслати один запит, а не два, і наступні кліки ігноруються, доки перший у польоті. Переплутати ці два - це відповідно дублікати замовлень і мерехтіння результатів пошуку.',
    },
    code: '// Search: newest wins\nsearchTerm$.pipe(\n  debounceTime(300),\n  distinctUntilChanged(),\n  switchMap((term) => this.api.search(term)),\n);\n\n// Save: first wins, the double click is swallowed\nsaveClicks$.pipe(exhaustMap(() => this.api.save(this.form.getRawValue())));',
  },
  {
    id: 'q-combination-operators',
    category: 'rxjs',
    q: {
      en: 'How do combineLatest, forkJoin, zip and withLatestFrom differ?',
      uk: 'Чим відрізняються combineLatest, forkJoin, zip і withLatestFrom?',
    },
    a: {
      en: 'combineLatest emits the latest of each whenever any of them emits, and waits for every source to emit at least once - so one silent source blocks it entirely. forkJoin waits for all of them to complete and emits their final values once, which makes it the parallel-requests operator and useless on a stream that never completes. zip pairs values by index. withLatestFrom emits only when the primary source does, sampling the others.',
      uk: "combineLatest емітить останні значення кожного джерела щоразу, коли емітить будь-яке з них, і чекає, доки кожне емітне хоча б раз, - тож одне мовчазне джерело блокує все. forkJoin чекає на завершення всіх і один раз емітить фінальні значення: це оператор для паралельних запитів, і на потоці, який ніколи не завершується, він марний. zip з'єднує значення за індексом. withLatestFrom емітить лише коли емітить головне джерело, зчитуючи решту.",
    },
    code: 'combineLatest([filter$, page$]).pipe(switchMap(([f, p]) => this.api.list(f, p)));\n\nforkJoin({ user: this.api.user(id), orders: this.api.orders(id) });   // both, once\n\nsave$.pipe(withLatestFrom(this.form.valueChanges));   // fires on save only\n\n// forkJoin over a stream that never completes emits nothing, ever.',
  },
  {
    id: 'q-error-handling-observables',
    category: 'rxjs',
    q: {
      en: 'How do you handle errors in a stream, and why does an error end the subscription?',
      uk: 'Як обробляти помилки в потоці і чому помилка завершує підписку?',
    },
    a: {
      en: 'catchError intercepts the error and returns a replacement observable, which becomes the rest of the stream. An error is terminal by contract - it is one of the two ways a stream ends - so once it reaches the subscriber, that subscription is over and no later value can arrive. Recovering therefore means catching before the error escapes the inner stream, not after.',
      uk: 'catchError перехоплює помилку і повертає замінний observable, який стає рештою потоку. Помилка є термінальною за контрактом - це один із двох способів завершення потоку, - тож щойно вона дійшла до підписника, підписку завершено і жодне пізніше значення вже не надійде. Тому відновлення означає перехопити помилку до того, як вона вийшла з внутрішнього потоку, а не після.',
    },
    code: '// The outer stream survives, because the error is caught inside\nsearch$.pipe(\n  switchMap((term) =>\n    this.api.search(term).pipe(catchError(() => of([]))),   // inner catch\n  ),\n);\n\n// Caught outside: the whole stream is over after the first failure\nsearch$.pipe(\n  switchMap((term) => this.api.search(term)),\n  catchError(() => of([])),\n);',
  },
  {
    id: 'q-retry-strategies',
    category: 'rxjs',
    q: {
      en: 'How do you implement a retry with backoff?',
      uk: 'Як реалізувати повторну спробу з відкладенням?',
    },
    a: {
      en: 'retry with a delay function, which receives the error and the attempt number and returns an observable to wait on - so exponential backoff is a timer whose duration grows with the count. Always cap the attempts, and only retry what is worth retrying: a 500 or a network failure, never a 400 or a 401, where repeating the same request just repeats the same answer.',
      uk: 'Через retry з функцією delay, яка отримує помилку та номер спроби і повертає observable, на який чекати, - тож експоненційне відкладення це таймер, тривалість якого росте з номером. Завжди обмежуй кількість спроб і повторюй лише те, що варто: 500 або мережевий збій, але ніколи 400 чи 401, де повторення того самого запиту просто повторює ту саму відповідь.',
    },
    code: 'this.http.get<Data>("/api/data").pipe(\n  retry({\n    count: 3,\n    delay: (error: HttpErrorResponse, attempt) => {\n      if (error.status < 500) {\n        throw error;            // a 4xx will not fix itself\n      }\n      return timer(2 ** attempt * 500);   // 1s, 2s, 4s\n    },\n  }),\n);',
  },
  {
    id: 'q-catch-error-placement',
    category: 'rxjs',
    q: {
      en: 'Why does the position of catchError in the pipe change the behaviour?',
      uk: 'Чому позиція catchError у pipe змінює поведінку?',
    },
    a: {
      en: 'Because it catches only what reaches it, and what happens after it is a different stream. Placed inside a switchMap it replaces the failed inner stream and the outer one carries on; placed at the end of the outer pipe it replaces the whole thing, so the source is finished and no further user input will ever be processed. This one placement decision is why a search box stops working after a single failed request.',
      uk: 'Бо він ловить лише те, що до нього дійшло, а те, що після нього, - це вже інший потік. Всередині switchMap він замінює невдалий внутрішній потік, і зовнішній працює далі; в кінці зовнішнього pipe він замінює все, тож джерело завершено і жодне подальше введення користувача оброблено не буде. Саме це рішення про розміщення і є причиною того, що поле пошуку перестає працювати після одного невдалого запиту.',
    },
    code: 'term$.pipe(\n  switchMap((term) => this.api.search(term).pipe(catchError(() => of([])))),\n);\n// One failure -> empty results, and typing still works.\n\nterm$.pipe(\n  switchMap((term) => this.api.search(term)),\n  catchError(() => of([])),\n);\n// One failure -> the search box is dead for the rest of the session.',
  },
  {
    id: 'q-unsubscribe-strategies',
    category: 'rxjs',
    q: {
      en: 'What are the ways to unsubscribe, and which do you reach for first?',
      uk: 'Які є способи відписатися і який з них ти обираєш першим?',
    },
    a: {
      en: 'The async pipe, which ties the subscription to the view; takeUntilDestroyed, which ties it to the injection context; take or first, when you genuinely want one value; and a manual Subscription you unsubscribe in ngOnDestroy. Reach for the async pipe first, takeUntilDestroyed second. The manual approach is last because it is the only one where forgetting a line leaks silently.',
      uk: "Async pipe, який прив'язує підписку до вигляду; takeUntilDestroyed, який прив'язує її до контексту інжекції; take чи first, коли значення справді потрібне одне; і ручний Subscription, від якого ти відписуєшся в ngOnDestroy. Першим бери async pipe, другим - takeUntilDestroyed. Ручний спосіб останній, бо лише в ньому забутий рядок призводить до тихого витоку.",
    },
    code: '<!-- 1. Best: the view owns it -->\n@if (user$ | async; as user) { ... }\n\n// 2. The injection context owns it\nsource$.pipe(takeUntilDestroyed()).subscribe();\n\n// 3. One value and done\nsource$.pipe(first()).subscribe();\n\n// 4. Manual - and one forgotten line leaks in silence\nprivate readonly subscriptions = new Subscription();',
  },
  {
    id: 'q-take-until-destroyed',
    category: 'rxjs',
    q: {
      en: 'What does takeUntilDestroyed do, and where can it be called?',
      uk: 'Що робить takeUntilDestroyed і де його можна викликати?',
    },
    a: {
      en: 'It completes the stream when the surrounding context is destroyed, using DestroyRef. Called in an injection context - a field initialiser or a constructor - it needs no arguments. Anywhere else, pass a DestroyRef you injected earlier, which is what you do in ngOnInit. It replaces the takeUntil-plus-Subject pattern entirely, and unlike it, cannot be defeated by putting the operator in the wrong position.',
      uk: 'Він завершує потік, коли знищується навколишній контекст, використовуючи DestroyRef. Викликаний у контексті інжекції - в ініціалізаторі поля чи в конструкторі - він не потребує аргументів. Будь-де інде передай DestroyRef, інжектований раніше, - саме так роблять у ngOnInit. Він повністю замінює патерн takeUntil із Subject і, на відміну від нього, не ламається від того, що оператор поставили не на те місце.',
    },
    code: 'export class TickerComponent {\n  private readonly destroyRef = inject(DestroyRef);\n\n  constructor() {\n    interval(1000).pipe(takeUntilDestroyed()).subscribe();      // in context\n  }\n\n  ngOnInit(): void {\n    interval(1000)\n      .pipe(takeUntilDestroyed(this.destroyRef))                 // outside it\n      .subscribe();\n  }\n}',
  },
  {
    id: 'q-memory-leak-subscriptions',
    category: 'rxjs',
    q: {
      en: 'Which subscriptions actually leak, and which complete on their own?',
      uk: 'Які підписки справді течуть, а які завершуються самі?',
    },
    a: {
      en: 'A subscription leaks when its source never completes: interval and timer loops, fromEvent, Subjects, valueChanges, router events, anything from a long-lived service. HttpClient completes after one response, so a forgotten subscription to it does not leak memory - though it can still call back into a destroyed component. The honest rule is to unsubscribe from everything, because reasoning about which is which is exactly where the mistakes come from.',
      uk: 'Підписка тече тоді, коли її джерело ніколи не завершується: цикли interval і timer, fromEvent, Subject-и, valueChanges, події роутера, будь-що з довгоживучого сервісу. HttpClient завершується після однієї відповіді, тож забута підписка на нього памʼяті не тримає, хоча все одно може викликати колбек у знищеному компоненті. Чесне правило - відписуватися від усього, бо саме на міркуваннях про те, що є чим, і виникають помилки.',
    },
    code: '// Leaks: never completes\ninterval(1000).subscribe();\nthis.form.valueChanges.subscribe();\nthis.router.events.subscribe();\n\n// Does not leak memory, but can still touch a dead component\nthis.http.get("/api/users").subscribe((users) => this.users.set(users));',
  },
  {
    id: 'q-share-replay-pitfalls',
    category: 'rxjs',
    q: {
      en: 'What does shareReplay do, and what does refCount protect you from?',
      uk: 'Що робить shareReplay і від чого захищає refCount?',
    },
    a: {
      en: 'It multicasts a source and replays the buffered values to late subscribers, which is how one HTTP call serves several consumers. Without refCount: true it keeps the subscription to the source alive after the last subscriber leaves, so an interval or a socket keeps running forever - a real leak, and the classic misuse of the operator. Always pass an explicit bufferSize and refCount.',
      uk: 'Він мультикастить джерело і програє забуферизовані значення пізнім підписникам - саме так один HTTP-виклик обслуговує кількох споживачів. Без refCount: true він тримає підписку на джерело живою після виходу останнього підписника, тож interval чи сокет працюють вічно: це справжній витік і класичне неправильне вживання оператора. Завжди передавай явні bufferSize і refCount.',
    },
    code: '// Leaks: the source keeps running with nobody listening\nsource$.pipe(shareReplay(1));\n\n// Unsubscribes from the source when the last subscriber leaves\nsource$.pipe(shareReplay({ bufferSize: 1, refCount: true }));',
  },
  {
    id: 'q-debounce-distinct-search',
    category: 'rxjs',
    q: {
      en: 'How would you build a search input that does not fire a request per keystroke?',
      uk: 'Як побудувати поле пошуку, яке не шле запит на кожне натискання клавіші?',
    },
    a: {
      en: 'Four operators, and each removes a specific waste. debounceTime waits for the typing to pause. distinctUntilChanged drops a repeat of the same term, which happens whenever someone types a character and deletes it. filter skips terms too short to be useful. switchMap cancels the request that is already in flight when a newer term arrives. Omit switchMap and results will occasionally arrive out of order.',
      uk: 'Чотири оператори, і кожен прибирає своє марнування. debounceTime чекає на паузу в наборі. distinctUntilChanged відкидає повтор того самого терміна - а він трапляється щоразу, коли символ набрали і стерли. filter пропускає надто короткі терміни. switchMap скасовує запит, що вже в польоті, коли надходить новіший термін. Прибери switchMap - і результати час від часу приходитимуть не в тому порядку.',
    },
    code: 'protected readonly results = toSignal(\n  this.search.valueChanges.pipe(\n    debounceTime(300),\n    distinctUntilChanged(),\n    filter((term) => term.length >= 2),\n    switchMap((term) => this.api.search(term)),\n  ),\n  { initialValue: [] },\n);',
  },
  {
    id: 'q-rxjs-interop-signals',
    category: 'rxjs',
    q: {
      en: 'What do toSignal and toObservable do, and what are the gotchas of each?',
      uk: 'Що роблять toSignal і toObservable і які підводні камені в кожного?',
    },
    a: {
      en: 'toSignal subscribes to a stream and exposes the latest value as a signal, unsubscribing on destroy. The gotcha is the initial value: without one, the signal is undefined until the first emission, and the type says so. toObservable emits whenever a signal changes - but it reads the signal in an effect, so it does not emit synchronously on subscribe and it can skip intermediate values set in the same tick.',
      uk: 'toSignal підписується на потік і віддає останнє значення як сигнал, відписуючись при знищенні. Підводний камінь - початкове значення: без нього сигнал дорівнює undefined до першої емісії, і тип це показує. toObservable емітить при зміні сигналу, але читає сигнал у ефекті, тож не емітить синхронно при підписці й може пропустити проміжні значення, задані в тому самому такті.',
    },
    code: 'readonly user = toSignal(this.user$);                    // User | undefined\nreadonly user2 = toSignal(this.user$, { initialValue: GUEST });   // User\n\nreadonly term$ = toObservable(this.term);\n\n// Skipped: only the last value of the tick reaches the stream\nthis.term.set("a");\nthis.term.set("ab");',
  },
  {
    id: 'q-rxjs-vs-signals-choice',
    category: 'rxjs',
    q: {
      en: 'When do you still reach for RxJS rather than signals?',
      uk: 'Коли все ще варто брати RxJS, а не сигнали?',
    },
    a: {
      en: 'Whenever time is part of the problem. Signals model state - what the value is now - and have no vocabulary for debouncing, retrying, cancelling, racing or ordering. Events over time, coordination between requests, anything with a schedule: that is RxJS. State a template renders: that is a signal. Most components need both, with RxJS handling the flow and toSignal handing the result to the view.',
      uk: 'Щоразу, коли частиною задачі є час. Сигнали моделюють стан - яке значення зараз - і не мають словника для debounce, повторів, скасування, перегонів чи впорядкування. Події в часі, координація між запитами, будь-що з розкладом - це RxJS. Стан, який рендерить шаблон, - це сигнал. Більшості компонентів потрібні обидва: RxJS керує потоком, а toSignal віддає результат у вигляд.',
    },
    code: '// RxJS owns the flow: debounce, cancel, order\nprivate readonly results$ = this.term$.pipe(\n  debounceTime(300),\n  switchMap((term) => this.api.search(term)),\n);\n\n// A signal owns what the template renders\nprotected readonly results = toSignal(this.results$, { initialValue: [] });',
  },
  {
    id: 'q-tap-side-effects',
    category: 'rxjs',
    q: {
      en: 'What is tap for, and what should never go inside it?',
      uk: 'Для чого потрібен tap і чого в ньому не має бути ніколи?',
    },
    a: {
      en: 'For a side effect that does not change the stream: logging, updating state, a metric. What should never go inside it is anything the stream depends on - modifying the value in place, or starting async work whose result you then need, because tap ignores what you return and the pipe carries on without waiting. If the result matters, it belongs in a map or a flattening operator.',
      uk: 'Для побічного ефекту, який не змінює потік: логування, оновлення стану, метрика. Ніколи не має бути всередині того, від чого потік залежить: зміни значення на місці або запуску асинхронної роботи, результат якої потім потрібен, - бо tap ігнорує те, що ти повернув, і pipe іде далі, не чекаючи. Якщо результат важливий, йому місце в map або в операторі сплощення.',
    },
    code: '// Fine: a side effect that changes nothing in the stream\nthis.api.save(order).pipe(tap(() => this.toast.show("Saved")));\n\n// Broken: the return value is discarded, and nothing waits for it\n.pipe(tap((id) => this.api.loadDetails(id)))\n\n// What you meant:\n.pipe(switchMap((id) => this.api.loadDetails(id)))',
  },
];
