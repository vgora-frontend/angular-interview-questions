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
  },
  {
    id: 'q-what-is-zone-js',
    category: 'cd',
    q: {
      en: 'What is zone.js, and how does it know that something may have changed?',
      uk: 'Що таке zone.js і звідки він знає, що щось могло змінитися?',
    },
  },
  {
    id: 'q-cd-trigger-scenarios',
    category: 'cd',
    q: {
      en: 'Which events trigger a change detection cycle?',
      uk: 'Які події запускають цикл change detection?',
    },
  },
  {
    id: 'q-cd-traversal-order',
    category: 'cd',
    q: {
      en: 'In what order does Angular walk the component tree during a check?',
      uk: 'У якому порядку Angular обходить дерево компонентів під час перевірки?',
    },
  },
  {
    id: 'q-default-vs-onpush',
    category: 'cd',
    q: {
      en: 'What is the difference between the Default and OnPush change detection strategies?',
      uk: 'Яка різниця між стратегіями change detection Default і OnPush?',
    },
  },
  {
    id: 'q-onpush-triggers',
    category: 'cd',
    q: {
      en: 'What exactly marks an OnPush component for check?',
      uk: 'Що саме позначає OnPush-компонент для перевірки?',
    },
  },
  {
    id: 'q-onpush-object-mutation',
    category: 'cd',
    q: {
      en: 'Why does mutating an input object leave an OnPush component stale?',
      uk: "Чому мутація об'єкта-інпуту лишає OnPush-компонент застарілим?",
    },
  },
  {
    id: 'q-markforcheck-vs-detectchanges',
    category: 'cd',
    q: {
      en: 'What is the difference between markForCheck, detectChanges and ApplicationRef.tick?',
      uk: 'Яка різниця між markForCheck, detectChanges і ApplicationRef.tick?',
    },
  },
  {
    id: 'q-detach-reattach',
    category: 'cd',
    q: {
      en: 'When would you detach a view from change detection, and what do you take on by doing it?',
      uk: 'Коли варто відчепити вигляд від change detection і яку відповідальність ти при цьому береш?',
    },
  },
  {
    id: 'q-expression-changed-error',
    category: 'cd',
    q: {
      en: 'What causes ExpressionChangedAfterItHasBeenCheckedError, and how do you fix it properly?',
      uk: 'Через що виникає ExpressionChangedAfterItHasBeenCheckedError і як виправити це правильно?',
    },
  },
  {
    id: 'q-dev-mode-double-check',
    category: 'cd',
    q: {
      en: 'Why does development mode run change detection twice?',
      uk: 'Чому в режимі розробки change detection виконується двічі?',
    },
  },
  {
    id: 'q-ngzone-run-outside-angular',
    category: 'cd',
    q: {
      en: 'What does runOutsideAngular do, and when is it the right optimisation?',
      uk: 'Що робить runOutsideAngular і коли це доречна оптимізація?',
    },
  },
  {
    id: 'q-ngzone-onstable',
    category: 'cd',
    q: {
      en: "What do NgZone's onStable, onUnstable and onMicrotaskEmpty tell you?",
      uk: 'Про що повідомляють onStable, onUnstable і onMicrotaskEmpty у NgZone?',
    },
  },
  {
    id: 'q-noop-zone',
    category: 'cd',
    q: {
      en: 'What is a noop zone, and what breaks once you install one?',
      uk: 'Що таке noop-зона і що ламається після її встановлення?',
    },
  },
  {
    id: 'q-zoneless-change-detection',
    category: 'cd',
    q: {
      en: 'What is zoneless change detection, and what has to be true of your code before you enable it?',
      uk: 'Що таке zoneless change detection і яким має бути твій код, перш ніж його вмикати?',
    },
  },
  {
    id: 'q-zoneless-notification-sources',
    category: 'cd',
    q: {
      en: 'Without zone.js, what tells Angular that a re-render is needed?',
      uk: 'Без zone.js що саме повідомляє Angular про потребу перемалювання?',
    },
  },
  {
    id: 'q-signals-and-change-detection',
    category: 'cd',
    q: {
      en: 'How do signals change what gets re-rendered when state updates?',
      uk: 'Як сигнали змінюють те, що перемальовується при оновленні стану?',
    },
  },
  {
    id: 'q-async-pipe-and-onpush',
    category: 'cd',
    q: {
      en: 'Why does the async pipe work with OnPush while a manual subscribe does not?',
      uk: 'Чому async pipe працює з OnPush, а ручна підписка - ні?',
    },
  },
  {
    id: 'q-cd-performance-symptoms',
    category: 'cd',
    q: {
      en: 'How do you recognise that change detection is your performance problem?',
      uk: 'Як розпізнати, що саме change detection є твоєю проблемою продуктивності?',
    },
  },
  {
    id: 'q-profiling-change-detection',
    category: 'cd',
    q: {
      en: 'Which tools do you use to profile change detection?',
      uk: 'Якими інструментами ти профілюєш change detection?',
    },
  },
];
