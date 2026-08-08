import { Question } from '../../models/content.model';

// Loading strategy, rendering on the server, and keeping the bundle honest.
export const PERFORMANCE_QUESTIONS: Question[] = [
  {
    id: 'q-lazy-loading',
    category: 'performance',
    q: {
      en: 'What is lazy loading, and what does it actually save the user?',
      uk: 'Що таке ліниве завантаження і що воно насправді заощаджує користувачу?',
    },
  },
  {
    id: 'q-dynamic-imports',
    category: 'performance',
    q: {
      en: 'How does a dynamic import become a separate chunk, and what breaks that split?',
      uk: 'Як динамічний імпорт стає окремим чанком і що руйнує цей поділ?',
    },
  },
  {
    id: 'q-defer-blocks',
    category: 'performance',
    q: {
      en: 'What does a @defer block do, and which triggers can start the load?',
      uk: 'Що робить блок @defer і які тригери можуть почати завантаження?',
    },
  },
  {
    id: 'q-defer-placeholder-loading-error',
    category: 'performance',
    q: {
      en: 'What are the @placeholder, @loading and @error blocks for, and why do they have minimum durations?',
      uk: 'Для чого потрібні блоки @placeholder, @loading і @error і чому в них є мінімальні тривалості?',
    },
  },
  {
    id: 'q-ssr-what-and-why',
    category: 'performance',
    q: {
      en: 'What is server-side rendering, and which problems does it solve that a SPA cannot?',
      uk: 'Що таке рендеринг на сервері і які проблеми він вирішує там, де SPA безсилий?',
    },
  },
  {
    id: 'q-ssr-code-pitfalls',
    category: 'performance',
    q: {
      en: 'Which code breaks under SSR, and how do you guard against it?',
      uk: 'Який код ламається під SSR і як від цього захиститися?',
    },
  },
  {
    id: 'q-hydration',
    category: 'performance',
    q: {
      en: 'What is hydration, and what did non-destructive hydration fix?',
      uk: 'Що таке гідратація і що виправила неруйнівна гідратація?',
    },
  },
  {
    id: 'q-incremental-hydration',
    category: 'performance',
    q: {
      en: 'What is incremental hydration, and how does it relate to @defer?',
      uk: "Що таке інкрементальна гідратація і як вона пов'язана з @defer?",
    },
  },
  {
    id: 'q-hydration-mismatch',
    category: 'performance',
    q: {
      en: 'What causes a hydration mismatch, and how do you debug one?',
      uk: 'Через що виникає розбіжність гідратації і як її налагоджувати?',
    },
  },
  {
    id: 'q-prerendering-ssg',
    category: 'performance',
    q: {
      en: 'When is prerendering a better fit than server-side rendering?',
      uk: 'Коли попередній рендеринг підходить краще за рендеринг на сервері?',
    },
  },
  {
    id: 'q-transfer-state',
    category: 'performance',
    q: {
      en: 'What does TransferState solve, and what does provideClientHydration do about duplicate requests?',
      uk: 'Яку проблему вирішує TransferState і що робить provideClientHydration з дубльованими запитами?',
    },
  },
  {
    id: 'q-track-performance',
    category: 'performance',
    q: {
      en: 'How does a good track expression in @for change list rendering cost?',
      uk: 'Як вдалий вираз track у @for змінює вартість рендерингу списку?',
    },
  },
  {
    id: 'q-virtual-scrolling',
    category: 'performance',
    q: {
      en: 'When do you need virtual scrolling, and what does the CDK give you for it?',
      uk: 'Коли потрібен віртуальний скрол і що для цього дає CDK?',
    },
  },
  {
    id: 'q-ngoptimizedimage',
    category: 'performance',
    q: {
      en: 'What does NgOptimizedImage do, and where does it not apply?',
      uk: 'Що робить NgOptimizedImage і де він не застосовний?',
    },
  },
  {
    id: 'q-font-inlining',
    category: 'performance',
    q: {
      en: 'What does automatic font inlining do at build time?',
      uk: 'Що робить автоматичне вбудовування шрифтів під час збірки?',
    },
  },
  {
    id: 'q-bundle-size-analysis',
    category: 'performance',
    q: {
      en: 'How do you find out what is making a bundle big?',
      uk: "Як з'ясувати, через що бандл став великим?",
    },
  },
  {
    id: 'q-budgets',
    category: 'performance',
    q: {
      en: 'What are build budgets, and how do you use them to stop regressions?',
      uk: 'Що таке бюджети збірки і як з їх допомогою зупиняти регресії?',
    },
  },
  {
    id: 'q-service-worker-role',
    category: 'performance',
    q: {
      en: 'What role does a service worker play in an Angular application?',
      uk: 'Яку роль відіграє service worker у застосунку на Angular?',
    },
  },
  {
    id: 'q-service-worker-update-flow',
    category: 'performance',
    q: {
      en: 'How does SwUpdate let you tell a user that a new version is available?',
      uk: 'Як SwUpdate дозволяє повідомити користувача про доступну нову версію?',
    },
  },
  {
    id: 'q-app-shell',
    category: 'performance',
    q: {
      en: 'What is an app shell, and which metric does it improve?',
      uk: 'Що таке app shell і яку метрику він покращує?',
    },
  },
  {
    id: 'q-web-workers',
    category: 'performance',
    q: {
      en: 'When would you move work into a web worker, and what cannot go there?',
      uk: 'Коли варто винести роботу у web worker і що туди винести не можна?',
    },
  },
  {
    id: 'q-core-web-vitals-angular',
    category: 'performance',
    q: {
      en: 'Which Core Web Vitals does an Angular application typically struggle with, and why?',
      uk: 'З якими Core Web Vitals зазвичай має проблеми застосунок на Angular і чому?',
    },
  },
];
