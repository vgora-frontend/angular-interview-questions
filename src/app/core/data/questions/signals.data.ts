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
  },
  {
    id: 'q-signal-vs-behaviorsubject',
    category: 'signals',
    q: {
      en: 'How does a signal differ from a BehaviorSubject?',
      uk: 'Чим signal відрізняється від BehaviorSubject?',
    },
  },
  {
    id: 'q-signal-set-vs-update',
    category: 'signals',
    q: {
      en: 'What is the difference between set() and update(), and why is there no mutate()?',
      uk: 'Яка різниця між set() і update() і чому немає mutate()?',
    },
  },
  {
    id: 'q-signal-equality-function',
    category: 'signals',
    q: {
      en: 'How does a signal decide that its value changed, and when do you pass a custom equality function?',
      uk: 'Як signal вирішує, що його значення змінилося, і коли передавати власну функцію рівності?',
    },
  },
  {
    id: 'q-computed-lazy-memoized',
    category: 'signals',
    q: {
      en: 'Why is computed() lazy and memoized, and what follows from that for its body?',
      uk: 'Чому computed() є лінивим і кешованим і що з цього випливає для його тіла?',
    },
  },
  {
    id: 'q-computed-dynamic-dependencies',
    category: 'signals',
    q: {
      en: 'How does a computed track dependencies that only some branches of its body read?',
      uk: 'Як computed відстежує залежності, які читаються лише в деяких гілках його тіла?',
    },
  },
  {
    id: 'q-signals-glitch-free',
    category: 'signals',
    q: {
      en: 'What does it mean that the signal graph is glitch-free?',
      uk: 'Що означає, що граф сигналів є glitch-free?',
    },
  },
  {
    id: 'q-effect-when-to-use',
    category: 'signals',
    q: {
      en: 'What is effect() for, and why is it the wrong tool for deriving state?',
      uk: 'Для чого потрібен effect() і чому він неправильний інструмент для похідного стану?',
    },
  },
  {
    id: 'q-effect-cleanup',
    category: 'signals',
    q: {
      en: 'How does an effect clean up after itself, and when is it destroyed?',
      uk: 'Як ефект прибирає за собою і коли він знищується?',
    },
  },
  {
    id: 'q-untracked',
    category: 'signals',
    q: {
      en: 'What does untracked() do, and what breaks without it?',
      uk: 'Що робить untracked() і що ламається без нього?',
    },
  },
  {
    id: 'q-linked-signal',
    category: 'signals',
    q: {
      en: 'When would you reach for linkedSignal() instead of computed()?',
      uk: 'Коли варто взяти linkedSignal() замість computed()?',
    },
  },
  {
    id: 'q-resource-api',
    category: 'signals',
    q: {
      en: 'What does resource() do, and what state does it expose while loading?',
      uk: 'Що робить resource() і який стан він надає під час завантаження?',
    },
  },
  {
    id: 'q-signal-input',
    category: 'signals',
    q: {
      en: 'How does input() differ from @Input, and what does input.required() enforce?',
      uk: 'Чим input() відрізняється від @Input і що гарантує input.required()?',
    },
  },
  {
    id: 'q-model-signal',
    category: 'signals',
    q: {
      en: 'What is model(), and how does it implement two-way binding?',
      uk: "Що таке model() і як він реалізує двосторонню прив'язку?",
    },
  },
  {
    id: 'q-output-function',
    category: 'signals',
    q: {
      en: 'How does the output() function differ from @Output with an EventEmitter?',
      uk: 'Чим функція output() відрізняється від @Output з EventEmitter?',
    },
  },
  {
    id: 'q-signal-queries',
    category: 'signals',
    q: {
      en: 'What do the signal-based viewChild and contentChild queries change compared with the decorators?',
      uk: 'Що змінюють сигнальні запити viewChild і contentChild порівняно з декораторами?',
    },
  },
  {
    id: 'q-signals-in-services',
    category: 'signals',
    q: {
      en: 'How do you expose signal state from a service without letting callers write to it?',
      uk: 'Як віддати сигнальний стан із сервісу, не дозволяючи викликачам його змінювати?',
    },
  },
  {
    id: 'q-signals-and-immutability',
    category: 'signals',
    q: {
      en: 'Why must the value inside a signal be treated as immutable?',
      uk: 'Чому значення всередині сигналу слід вважати незмінним?',
    },
  },
  {
    id: 'q-signal-testing',
    category: 'signals',
    q: {
      en: 'How do you test a computed signal and an effect?',
      uk: 'Як тестувати computed-сигнал і ефект?',
    },
  },
  {
    id: 'q-migrate-to-signals',
    category: 'signals',
    q: {
      en: 'How would you migrate a component from RxJS state to signals?',
      uk: 'Як мігрувати компонент зі стану на RxJS до сигналів?',
    },
  },
];
