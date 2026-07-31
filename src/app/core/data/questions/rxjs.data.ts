import { Question } from '../../models/content.model';

// RxJS operators and the signal interop.
export const RXJS_QUESTIONS: Question[] = [
  {
    id: 'q-switchmap-vs-mergemap',
    category: 'rxjs',
    q: {
      en: 'switchMap, mergeMap, concatMap, exhaustMap - how do you choose?',
      uk: 'switchMap, mergeMap, concatMap, exhaustMap - як вибрати?',
    },
    a: {
      en: 'Ask what should happen to the previous inner subscription. switchMap cancels it - right for typeahead search or route-driven loads, where only the latest matters. mergeMap runs everything in parallel with no ordering guarantee - right for independent writes. concatMap queues them in order - right when each request depends on the previous finishing. exhaustMap ignores new values while one is in flight - right for a submit button you do not want double-firing.',
      uk: 'Запитайте, що має статися з попередньою внутрішньою підпискою. switchMap скасовує її - підходить для пошуку під час набору чи завантаження за маршрутом, де важливий лише останній результат. mergeMap виконує все паралельно без гарантії порядку - підходить для незалежних записів. concatMap ставить у чергу по порядку - підходить, коли кожен запит залежить від завершення попереднього. exhaustMap ігнорує нові значення, поки триває поточне - підходить для кнопки надсилання, яку не варто натискати двічі.',
    },
    code: '// cancel the in-flight search on every keystroke\nthis.results$ = this.term.valueChanges.pipe(\n  debounceTime(300),\n  distinctUntilChanged(),\n  switchMap((term) => this.api.search(term)),\n);',
  },
  {
    id: 'q-unsubscribe',
    category: 'rxjs',
    q: {
      en: 'What are the options for unsubscribing, and which should you prefer?',
      uk: 'Які є способи відписки і який обрати?',
    },
    a: {
      en: 'Prefer not subscribing at all: the async pipe, toSignal(), or takeUntilDestroyed() all tie the subscription to a lifecycle Angular already manages. A manual Subscription plus ngOnDestroy works but has to be maintained by hand for every stream. The takeUntil-with-a-Subject pattern is legacy - takeUntilDestroyed() replaces it and needs no field, no Subject, and no ngOnDestroy.',
      uk: "Найкраще не підписуватися вручну взагалі: async pipe, toSignal() або takeUntilDestroyed() прив'язують підписку до життєвого циклу, яким Angular уже керує. Ручна Subscription плюс ngOnDestroy працює, але її потрібно підтримувати вручну для кожного потоку. Патерн takeUntil із Subject - спадок минулого: takeUntilDestroyed() замінює його і не потребує ні поля, ні Subject, ні ngOnDestroy.",
    },
    code: 'private readonly api = inject(Api);\n\nreadonly data = toSignal(this.api.load(), { initialValue: [] });\n// or, for a side effect:\nthis.api.events().pipe(takeUntilDestroyed()).subscribe(handle);',
  },
  {
    id: 'q-tosignal',
    category: 'rxjs',
    q: {
      en: 'What does toSignal() do about the first value and about errors?',
      uk: 'Що toSignal() робить із першим значенням і з помилками?',
    },
    a: {
      en: 'toSignal() subscribes immediately and exposes the latest emission as a signal, unsubscribing when the injection context is destroyed. Because a signal must always have a value, you pass initialValue, or accept undefined in the type, or use requireSync: true when the source is guaranteed synchronous (a BehaviorSubject). If the source errors, the error is re-thrown on the next read of the signal, so it surfaces where you read it, not where you subscribed.',
      uk: "toSignal() підписується одразу і віддає останню емісію як signal, відписуючись при знищенні контексту ін'єкції. Оскільки signal завжди має мати значення, ви передаєте initialValue, або допускаєте undefined у типі, або використовуєте requireSync: true, коли джерело гарантовано синхронне (BehaviorSubject). Якщо джерело завершується помилкою, помилка перекидається при наступному читанні signal - тобто з'являється там, де ви читаєте, а не там, де підписалися.",
    },
  },
];
