import { Question } from '../../models/content.model';

// The router: route configuration, params, guards, resolvers and navigation.
export const ROUTING_QUESTIONS: Question[] = [
  {
    id: 'q-router-purpose',
    category: 'routing',
    q: {
      en: 'What does the Angular Router do, and how do you add it to a standalone application?',
      uk: 'Що робить Angular Router і як додати його до standalone-застосунку?',
    },
  },
  {
    id: 'q-defining-routes',
    category: 'routing',
    q: {
      en: 'How do you define routes, and how does the router match a URL against them?',
      uk: 'Як оголошуються маршрути і як роутер зіставляє URL з ними?',
    },
  },
  {
    id: 'q-router-outlet',
    category: 'routing',
    q: {
      en: 'What is router-outlet, and what happens when a route has no outlet to render into?',
      uk: 'Що таке router-outlet і що буде, якщо маршруту немає куди рендеритись?',
    },
  },
  {
    id: 'q-named-outlets',
    category: 'routing',
    q: {
      en: 'What are named outlets, and what is a typical use for one?',
      uk: 'Що таке іменовані аутлети і який у них типовий сценарій використання?',
    },
  },
  {
    id: 'q-child-routes',
    category: 'routing',
    q: {
      en: 'How do child routes work, and what does a componentless route with children give you?',
      uk: 'Як працюють дочірні маршрути і що дає маршрут без компонента з children?',
    },
  },
  {
    id: 'q-router-link-active',
    category: 'routing',
    q: {
      en: 'What do routerLink and routerLinkActive do, and why is routerLink better than href?',
      uk: 'Що роблять routerLink і routerLinkActive і чому routerLink кращий за href?',
    },
  },
  {
    id: 'q-route-parameter-types',
    category: 'routing',
    q: {
      en: 'What kinds of route parameters exist, and how does each one appear in the URL?',
      uk: 'Які види параметрів маршруту існують і як кожен з них виглядає в URL?',
    },
  },
  {
    id: 'q-activated-route',
    category: 'routing',
    q: {
      en: 'What does ActivatedRoute expose, and how do you read parameters from it?',
      uk: 'Що надає ActivatedRoute і як зчитувати з нього параметри?',
    },
  },
  {
    id: 'q-snapshot-vs-observable-params',
    category: 'routing',
    q: {
      en: 'When does reading route params from the snapshot break, and what do you use instead?',
      uk: 'Коли зчитування параметрів зі snapshot ламається і що використовувати натомість?',
    },
  },
  {
    id: 'q-with-component-input-binding',
    category: 'routing',
    q: {
      en: 'What does withComponentInputBinding do to route parameters?',
      uk: 'Що робить withComponentInputBinding з параметрами маршруту?',
    },
  },
  {
    id: 'q-router-state',
    category: 'routing',
    q: {
      en: 'What is router state, and how does it relate to the tree of activated routes?',
      uk: "Що таке стан роутера і як він пов'язаний з деревом активованих маршрутів?",
    },
  },
  {
    id: 'q-router-events',
    category: 'routing',
    q: {
      en: 'Which router events fire during a navigation, and what would you use them for?',
      uk: 'Які події роутера відбуваються під час навігації і для чого їх використовують?',
    },
  },
  {
    id: 'q-detect-route-change',
    category: 'routing',
    q: {
      en: 'How do you react to a route change inside a component that stays mounted?',
      uk: 'Як реагувати на зміну маршруту всередині компонента, який лишається змонтованим?',
    },
  },
  {
    id: 'q-current-route',
    category: 'routing',
    q: {
      en: 'How do you get the current URL, and how does that differ from the current route?',
      uk: 'Як отримати поточний URL і чим це відрізняється від поточного маршруту?',
    },
  },
  {
    id: 'q-wildcard-and-redirect-routes',
    category: 'routing',
    q: {
      en: 'What do the wildcard route and redirectTo do, and why does order matter?',
      uk: 'Що роблять wildcard-маршрут і redirectTo і чому важливий їхній порядок?',
    },
  },
  {
    id: 'q-route-guards',
    category: 'routing',
    q: {
      en: 'Which guards can a route declare, and when does each one run?',
      uk: 'Які гварди може оголосити маршрут і коли кожен з них виконується?',
    },
  },
  {
    id: 'q-functional-guards',
    category: 'routing',
    q: {
      en: 'Why did class-based guards give way to functional guards?',
      uk: 'Чому класові гварди поступилися місцем функціональним?',
    },
  },
  {
    id: 'q-can-deactivate-unsaved-changes',
    category: 'routing',
    q: {
      en: 'How would you stop a user from leaving a form with unsaved changes?',
      uk: 'Як не дати користувачу піти з форми, у якій є незбережені зміни?',
    },
  },
  {
    id: 'q-resolvers',
    category: 'routing',
    q: {
      en: 'What is a resolver, and what is the trade-off of loading data before navigation completes?',
      uk: 'Що таке resolver і в чому компроміс завантаження даних до завершення навігації?',
    },
  },
  {
    id: 'q-lazy-loading-routes',
    category: 'routing',
    q: {
      en: 'How do you lazy load a route with loadComponent and loadChildren?',
      uk: 'Як зробити маршрут лінивим за допомогою loadComponent і loadChildren?',
    },
  },
  {
    id: 'q-preloading-strategies',
    category: 'routing',
    q: {
      en: 'What preloading strategies does the router offer, and when is a custom one worth it?',
      uk: 'Які стратегії передзавантаження пропонує роутер і коли варта зусиль власна?',
    },
  },
  {
    id: 'q-base-href',
    category: 'routing',
    q: {
      en: 'What is the base href tag for, and what breaks when it is wrong?',
      uk: 'Для чого потрібен тег base href і що ламається, коли він неправильний?',
    },
  },
  {
    id: 'q-hash-vs-path-location',
    category: 'routing',
    q: {
      en: 'What is the difference between the path and hash location strategies, and what does each demand from the server?',
      uk: 'Яка різниця між path- і hash-стратегіями розташування і чого кожна вимагає від сервера?',
    },
  },
  {
    id: 'q-router-scroll-and-focus',
    category: 'routing',
    q: {
      en: 'How do you restore scroll position and move focus correctly after a navigation?',
      uk: 'Як відновити позицію прокрутки і коректно перемістити фокус після навігації?',
    },
  },
];
