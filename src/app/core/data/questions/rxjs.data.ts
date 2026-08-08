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
  },
  {
    id: 'q-what-is-observable',
    category: 'rxjs',
    q: {
      en: 'What is an observable, and why does nothing happen until you subscribe?',
      uk: 'Що таке observable і чому нічого не відбувається, доки ти не підписався?',
    },
  },
  {
    id: 'q-observer-and-subscription',
    category: 'rxjs',
    q: {
      en: 'What is an observer, and what does subscribe() hand back?',
      uk: 'Що таке observer і що повертає subscribe()?',
    },
  },
  {
    id: 'q-missing-error-handler',
    category: 'rxjs',
    q: {
      en: 'What happens if you subscribe without supplying an error handler?',
      uk: 'Що станеться, якщо підписатися без обробника помилок?',
    },
  },
  {
    id: 'q-promise-vs-observable',
    category: 'rxjs',
    q: {
      en: 'What is the difference between a promise and an observable?',
      uk: 'Яка різниця між promise і observable?',
    },
  },
  {
    id: 'q-cold-vs-hot-observable',
    category: 'rxjs',
    q: {
      en: 'What is the difference between a cold and a hot observable?',
      uk: 'Яка різниця між холодним і гарячим observable?',
    },
  },
  {
    id: 'q-multicasting',
    category: 'rxjs',
    q: {
      en: 'What is multicasting, and how do you turn a unicast source into a shared one?',
      uk: 'Що таке мультикастинг і як перетворити unicast-джерело на спільне?',
    },
  },
  {
    id: 'q-subject-types',
    category: 'rxjs',
    q: {
      en: 'How do Subject, BehaviorSubject, ReplaySubject and AsyncSubject differ?',
      uk: 'Чим відрізняються Subject, BehaviorSubject, ReplaySubject і AsyncSubject?',
    },
  },
  {
    id: 'q-subject-as-api',
    category: 'rxjs',
    q: {
      en: 'Why should a service expose an observable rather than the subject behind it?',
      uk: 'Чому сервіс має віддавати observable, а не сам subject за ним?',
    },
  },
  {
    id: 'q-observable-creation-functions',
    category: 'rxjs',
    q: {
      en: 'Which creation functions do you use most, and what does each produce?',
      uk: 'Якими функціями створення ти користуєшся найчастіше і що кожна з них дає?',
    },
  },
  {
    id: 'q-pipeable-operators',
    category: 'rxjs',
    q: {
      en: 'What is a pipeable operator, and why did RxJS move away from prototype methods?',
      uk: 'Що таке pipeable-оператор і чому RxJS відійшов від методів прототипу?',
    },
  },
  {
    id: 'q-flattening-operators',
    category: 'rxjs',
    q: {
      en: 'What is the difference between switchMap, mergeMap, concatMap and exhaustMap?',
      uk: 'Яка різниця між switchMap, mergeMap, concatMap і exhaustMap?',
    },
  },
  {
    id: 'q-choose-flattening-operator',
    category: 'rxjs',
    q: {
      en: 'Which flattening operator fits a type-ahead search, and which fits a save button?',
      uk: 'Який оператор сплощення пасує пошуку з підказками, а який - кнопці збереження?',
    },
  },
  {
    id: 'q-combination-operators',
    category: 'rxjs',
    q: {
      en: 'How do combineLatest, forkJoin, zip and withLatestFrom differ?',
      uk: 'Чим відрізняються combineLatest, forkJoin, zip і withLatestFrom?',
    },
  },
  {
    id: 'q-error-handling-observables',
    category: 'rxjs',
    q: {
      en: 'How do you handle errors in a stream, and why does an error end the subscription?',
      uk: 'Як обробляти помилки в потоці і чому помилка завершує підписку?',
    },
  },
  {
    id: 'q-retry-strategies',
    category: 'rxjs',
    q: {
      en: 'How do you implement a retry with backoff?',
      uk: 'Як реалізувати повторну спробу з відкладенням?',
    },
  },
  {
    id: 'q-catch-error-placement',
    category: 'rxjs',
    q: {
      en: 'Why does the position of catchError in the pipe change the behaviour?',
      uk: 'Чому позиція catchError у pipe змінює поведінку?',
    },
  },
  {
    id: 'q-unsubscribe-strategies',
    category: 'rxjs',
    q: {
      en: 'What are the ways to unsubscribe, and which do you reach for first?',
      uk: 'Які є способи відписатися і який з них ти обираєш першим?',
    },
  },
  {
    id: 'q-take-until-destroyed',
    category: 'rxjs',
    q: {
      en: 'What does takeUntilDestroyed do, and where can it be called?',
      uk: 'Що робить takeUntilDestroyed і де його можна викликати?',
    },
  },
  {
    id: 'q-memory-leak-subscriptions',
    category: 'rxjs',
    q: {
      en: 'Which subscriptions actually leak, and which complete on their own?',
      uk: 'Які підписки справді течуть, а які завершуються самі?',
    },
  },
  {
    id: 'q-share-replay-pitfalls',
    category: 'rxjs',
    q: {
      en: 'What does shareReplay do, and what does refCount protect you from?',
      uk: 'Що робить shareReplay і від чого захищає refCount?',
    },
  },
  {
    id: 'q-debounce-distinct-search',
    category: 'rxjs',
    q: {
      en: 'How would you build a search input that does not fire a request per keystroke?',
      uk: 'Як побудувати поле пошуку, яке не шле запит на кожне натискання клавіші?',
    },
  },
  {
    id: 'q-rxjs-interop-signals',
    category: 'rxjs',
    q: {
      en: 'What do toSignal and toObservable do, and what are the gotchas of each?',
      uk: 'Що роблять toSignal і toObservable і які підводні камені в кожного?',
    },
  },
  {
    id: 'q-rxjs-vs-signals-choice',
    category: 'rxjs',
    q: {
      en: 'When do you still reach for RxJS rather than signals?',
      uk: 'Коли все ще варто брати RxJS, а не сигнали?',
    },
  },
  {
    id: 'q-tap-side-effects',
    category: 'rxjs',
    q: {
      en: 'What is tap for, and what should never go inside it?',
      uk: 'Для чого потрібен tap і чого в ньому не має бути ніколи?',
    },
  },
];
