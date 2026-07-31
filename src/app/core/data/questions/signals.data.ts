import { Question } from '../../models/content.model';

// Signals and derived state.
export const SIGNALS_QUESTIONS: Question[] = [
  {
    id: 'q-signal-vs-subject',
    category: 'signals',
    q: {
      en: 'What is a signal, and how does it differ from BehaviorSubject?',
      uk: 'Що таке signal і чим він відрізняється від BehaviorSubject?',
    },
    a: {
      en: 'A signal is a reactive value with automatic dependency tracking: reading it inside a computed() or an effect() subscribes that consumer, so Angular knows exactly what to recompute when the value changes. A BehaviorSubject only pushes values to whoever subscribed manually - it has no notion of who read it, no glitch-free batching, and it needs explicit unsubscription. Signals are also synchronous and always hold a value, which makes them safe to read directly in templates.',
      uk: 'Signal - це реактивне значення з автоматичним відстеженням залежностей: читання його всередині computed() або effect() підписує цього споживача, тому Angular точно знає, що перерахувати при зміні значення. BehaviorSubject лише надсилає значення тим, хто підписався вручну - він не знає, хто його прочитав, не має узгодженого батчингу і потребує явного відписування. Signal також синхронний і завжди має значення, тому його безпечно читати прямо в шаблоні.',
    },
    code: 'const count = signal(0);\nconst double = computed(() => count() * 2);\n\ncount.set(5);\ndouble(); // 10 - recomputed lazily, only when read',
  },
  {
    id: 'q-computed-lazy',
    category: 'signals',
    q: {
      en: 'Why is computed() lazy and memoized?',
      uk: 'Чому computed() є ленивим і кешованим?',
    },
    a: {
      en: 'A computed does not run when its dependencies change - it only marks itself stale. The body runs on the next read, and the result is cached until a dependency changes again. That means a computed nobody reads costs nothing, and a computed read ten times in a template runs once. It also means the body must be pure: side effects there would fire unpredictably.',
      uk: 'Computed не виконується при зміні залежностей - він лише позначає себе застарілим. Тіло виконується при наступному читанні, а результат кешується, доки якась залежність не зміниться знову. Тому computed, який ніхто не читає, не витрачає нічого, а computed, прочитаний десять разів у шаблоні, виконається один раз. Це також означає, що тіло має бути чистим: побічні ефекти тут спрацьовували б непредбачувано.',
    },
  },
  {
    id: 'q-linked-signal',
    category: 'signals',
    q: {
      en: 'When would you reach for linkedSignal() instead of computed()?',
      uk: 'Коли варто взяти linkedSignal() замість computed()?',
    },
    a: {
      en: 'When the value derives from other state but the user must still be able to override it. A computed is read-only, so a selected-row or a draft-value that resets when the source list changes cannot be a computed. linkedSignal() gives you a writable signal that recomputes from its source and forgets local writes when that source changes.',
      uk: 'Коли значення походить з іншого стану, але користувач усе одно має змогу його змінити. Computed доступний лише для читання, тому вибраний рядок чи чернетка значення, що скидається при зміні джерела, не може бути computed. linkedSignal() дає записуваний signal, який перераховується з джерела і забуває локальні зміни, коли джерело змінюється.',
    },
    code: 'const options = signal<string[]>([]);\nconst chosen = linkedSignal(() => options()[0]);\n\nchosen.set(options()[2]); // user picks another one\noptions.set([...]);       // resets back to the first',
  },
];
