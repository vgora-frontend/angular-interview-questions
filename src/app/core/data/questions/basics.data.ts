import { Question } from '../../models/content.model';

// What Angular is, how an application is put together, and the ecosystem around it.
export const BASICS_QUESTIONS: Question[] = [
  {
    id: 'q-what-is-angular',
    category: 'basics',
    q: {
      en: 'What is Angular, and which problems does it set out to solve?',
      uk: 'Що таке Angular і які задачі він покликаний вирішувати?',
    },
  },
  {
    id: 'q-angularjs-vs-angular',
    category: 'basics',
    q: {
      en: 'How does Angular differ from AngularJS?',
      uk: 'Чим Angular відрізняється від AngularJS?',
    },
  },
  {
    id: 'q-angular-vs-react',
    category: 'basics',
    q: {
      en: 'How would you position Angular against React or Vue when picking a stack?',
      uk: 'Як би ти порівняв Angular з React чи Vue під час вибору стека?',
    },
  },
  {
    id: 'q-why-typescript',
    category: 'basics',
    q: {
      en: 'Why is Angular built on TypeScript, and what does that buy a team?',
      uk: 'Чому Angular побудований на TypeScript і що це дає команді?',
    },
  },
  {
    id: 'q-angular-building-blocks',
    category: 'basics',
    q: {
      en: 'What are the main building blocks of an Angular application?',
      uk: 'З яких основних будівельних блоків складається застосунок на Angular?',
    },
  },
  {
    id: 'q-component-basics',
    category: 'basics',
    q: {
      en: 'What is a component, and what does the @Component decorator configure?',
      uk: 'Що таке компонент і що саме налаштовує декоратор @Component?',
    },
  },
  {
    id: 'q-template-basics',
    category: 'basics',
    q: {
      en: 'What is a template, and how does it relate to the component class?',
      uk: "Що таке шаблон і як він пов'язаний з класом компонента?",
    },
  },
  {
    id: 'q-metadata-decorators',
    category: 'basics',
    q: {
      en: 'What is metadata in Angular, and how do decorators supply it?',
      uk: 'Що таке метадані в Angular і як декоратори їх надають?',
    },
  },
  {
    id: 'q-service-basics',
    category: 'basics',
    q: {
      en: 'What is a service, and how do you decide that logic belongs in one?',
      uk: 'Що таке сервіс і як зрозуміти, що логіка має жити саме в ньому?',
    },
  },
  {
    id: 'q-standalone-component-intro',
    category: 'basics',
    q: {
      en: 'What is a standalone component, and why did it replace NgModules as the default?',
      uk: 'Що таке standalone-компонент і чому він став типовим замість NgModules?',
    },
  },
  {
    id: 'q-ngmodule-legacy',
    category: 'basics',
    q: {
      en: 'What is an NgModule, and where would you still run into one today?',
      uk: 'Що таке NgModule і де його ще можна зустріти сьогодні?',
    },
  },
  {
    id: 'q-migrate-ngmodule-standalone',
    category: 'basics',
    q: {
      en: 'How would you migrate an NgModule-based application to standalone components?',
      uk: 'Як мігрувати застосунок на NgModule до standalone-компонентів?',
    },
  },
  {
    id: 'q-bootstrapping-app',
    category: 'basics',
    q: {
      en: 'How does an Angular application bootstrap, and what does bootstrapApplication do?',
      uk: 'Як відбувається запуск застосунку Angular і що робить bootstrapApplication?',
    },
  },
  {
    id: 'q-application-config',
    category: 'basics',
    q: {
      en: 'What lives in ApplicationConfig, and how do you add a feature to it?',
      uk: 'Що зберігається в ApplicationConfig і як додати туди нову можливість?',
    },
  },
  {
    id: 'q-data-binding-types',
    category: 'basics',
    q: {
      en: 'How do you categorise the data binding types Angular offers?',
      uk: "Як класифікувати види прив'язки даних, що їх пропонує Angular?",
    },
  },
  {
    id: 'q-constructor-vs-ngoninit',
    category: 'basics',
    q: {
      en: 'What is the difference between the constructor and ngOnInit?',
      uk: 'Яка різниця між конструктором і ngOnInit?',
    },
  },
  {
    id: 'q-angular-cli-basics',
    category: 'basics',
    q: {
      en: 'What is the Angular CLI, and which of its commands do you use daily?',
      uk: 'Що таке Angular CLI і якими його командами ти користуєшся щодня?',
    },
  },
  {
    id: 'q-angular-project-structure',
    category: 'basics',
    q: {
      en: 'How would you structure folders in a large Angular codebase?',
      uk: 'Як би ти організував структуру тек у великій кодовій базі Angular?',
    },
  },
  {
    id: 'q-angular-release-cadence',
    category: 'basics',
    q: {
      en: "How does Angular's release and long-term support cadence work?",
      uk: 'Як влаштований цикл релізів і підтримки версій Angular?',
    },
  },
  {
    id: 'q-angular-browser-support',
    category: 'basics',
    q: {
      en: 'Which browsers does a current Angular version support, and how is that decided?',
      uk: 'Які браузери підтримує актуальна версія Angular і чим це визначається?',
    },
  },
  {
    id: 'q-angular-material-cdk',
    category: 'basics',
    q: {
      en: 'What are Angular Material and the CDK, and when is the CDK alone enough?',
      uk: 'Що таке Angular Material і CDK, і коли достатньо самого лише CDK?',
    },
  },
  {
    id: 'q-ngrx-when',
    category: 'basics',
    q: {
      en: 'What is NgRx, and when is a global store worth its overhead?',
      uk: 'Що таке NgRx і коли глобальний стор виправдовує свої накладні витрати?',
    },
  },
  {
    id: 'q-state-management-options',
    category: 'basics',
    q: {
      en: 'What state management options does an Angular application realistically have?',
      uk: 'Які варіанти керування станом реально доступні застосунку на Angular?',
    },
  },
  {
    id: 'q-angular-library',
    category: 'basics',
    q: {
      en: 'What is an Angular library, and how does building one differ from building an app?',
      uk: 'Що таке бібліотека Angular і чим її збірка відрізняється від збірки застосунку?',
    },
  },
  {
    id: 'q-naming-conventions',
    category: 'basics',
    q: {
      en: 'What naming and file conventions does the Angular style guide expect?',
      uk: 'Яких конвенцій іменування та файлів очікує style guide Angular?',
    },
  },
  {
    id: 'q-class-decorators',
    category: 'basics',
    q: {
      en: 'Which class decorators does Angular provide, and what does each mark?',
      uk: 'Які декоратори класів надає Angular і що саме кожен з них позначає?',
    },
  },
  {
    id: 'q-field-decorators',
    category: 'basics',
    q: {
      en: 'Which class field decorators exist, and which of them now have signal-based replacements?',
      uk: 'Які декоратори полів класу існують і які з них уже мають заміни на сигналах?',
    },
  },
];
