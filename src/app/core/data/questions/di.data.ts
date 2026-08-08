import { Question } from '../../models/content.model';

// Dependency injection: providers, tokens, injector hierarchies and inject().
export const DI_QUESTIONS: Question[] = [
  {
    id: 'q-what-is-di',
    category: 'di',
    q: {
      en: 'What is dependency injection, and what does Angular gain from having it built in?',
      uk: 'Що таке впровадження залежностей і що Angular виграє від того, що воно вбудоване?',
    },
  },
  {
    id: 'q-di-vs-import',
    category: 'di',
    q: {
      en: 'Why inject a service instead of importing a shared instance directly?',
      uk: 'Чому краще інжектувати сервіс, ніж імпортувати спільний екземпляр напряму?',
    },
  },
  {
    id: 'q-inject-function',
    category: 'di',
    q: {
      en: 'What does the inject() function do, and why is it preferred over constructor injection?',
      uk: 'Що робить функція inject() і чому вона краща за інжекцію через конструктор?',
    },
  },
  {
    id: 'q-injection-context',
    category: 'di',
    q: {
      en: 'What is an injection context, and why does inject() throw outside of one?',
      uk: 'Що таке контекст інжекції і чому inject() кидає помилку поза ним?',
    },
  },
  {
    id: 'q-run-in-injection-context',
    category: 'di',
    q: {
      en: 'When would you use runInInjectionContext?',
      uk: 'Коли варто застосовувати runInInjectionContext?',
    },
  },
  {
    id: 'q-injectable-decorator',
    category: 'di',
    q: {
      en: 'Is @Injectable mandatory on every service class?',
      uk: "Чи обов'язковий @Injectable на кожному класі сервісу?",
    },
  },
  {
    id: 'q-provided-in-root',
    category: 'di',
    q: {
      en: 'What does providedIn: "root" do, and how does it make a service tree-shakable?',
      uk: 'Що робить providedIn: "root" і як він робить сервіс придатним для tree-shaking?',
    },
  },
  {
    id: 'q-provider-kinds',
    category: 'di',
    q: {
      en: 'What is the difference between useClass, useValue, useFactory and useExisting?',
      uk: 'Яка різниця між useClass, useValue, useFactory і useExisting?',
    },
  },
  {
    id: 'q-injection-token',
    category: 'di',
    q: {
      en: 'What is an InjectionToken, and why can an interface not be used as a token?',
      uk: 'Що таке InjectionToken і чому інтерфейс не може бути токеном?',
    },
  },
  {
    id: 'q-abstract-class-token',
    category: 'di',
    q: {
      en: 'How can an abstract class serve as both a token and a contract?',
      uk: 'Як абстрактний клас може бути одночасно токеном і контрактом?',
    },
  },
  {
    id: 'q-injector-hierarchies',
    category: 'di',
    q: {
      en: 'What injector hierarchies does Angular have, and how does a lookup traverse them?',
      uk: 'Які ієрархії інжекторів має Angular і як відбувається пошук залежності по них?',
    },
  },
  {
    id: 'q-component-level-providers',
    category: 'di',
    q: {
      en: 'What changes when you list a provider on a component instead of at the root?',
      uk: 'Що змінюється, коли провайдер оголошено на компоненті, а не в корені?',
    },
  },
  {
    id: 'q-singleton-service',
    category: 'di',
    q: {
      en: 'How do you guarantee a service is a true singleton?',
      uk: 'Як гарантувати, що сервіс справді є синглтоном?',
    },
  },
  {
    id: 'q-duplicate-service-instances',
    category: 'di',
    q: {
      en: 'What causes a service to be instantiated twice, and how do you find that out?',
      uk: 'Через що сервіс може створитися двічі і як це виявити?',
    },
  },
  {
    id: 'q-optional-dependency',
    category: 'di',
    q: {
      en: 'What is an optional dependency, and what does the injector return when it is missing?',
      uk: "Що таке необов'язкова залежність і що поверне інжектор, якщо її немає?",
    },
  },
  {
    id: 'q-self-skipself-host',
    category: 'di',
    q: {
      en: 'What do the Self, SkipSelf and Host resolution modifiers do?',
      uk: "Що роблять модифікатори розв'язання Self, SkipSelf і Host?",
    },
  },
  {
    id: 'q-multi-providers',
    category: 'di',
    q: {
      en: 'What is a multi provider, and where does Angular use that pattern itself?',
      uk: 'Що таке multi-провайдер і де сам Angular використовує цей патерн?',
    },
  },
  {
    id: 'q-environment-injector',
    category: 'di',
    q: {
      en: 'What is an EnvironmentInjector, and how does it differ from an element injector?',
      uk: 'Що таке EnvironmentInjector і чим він відрізняється від інжектора елемента?',
    },
  },
  {
    id: 'q-provider-functions',
    category: 'di',
    q: {
      en: 'Why do modern Angular APIs ship provider functions such as provideHttpClient and provideRouter?',
      uk: 'Чому сучасні API Angular постачають функції-провайдери на кшталт provideHttpClient і provideRouter?',
    },
  },
  {
    id: 'q-forroot-pattern',
    category: 'di',
    q: {
      en: 'What problem did the forRoot pattern solve, and what replaced it?',
      uk: 'Яку проблему вирішував патерн forRoot і що прийшло йому на зміну?',
    },
  },
  {
    id: 'q-di-circular-dependency',
    category: 'di',
    q: {
      en: 'How do you diagnose and break a circular dependency between two services?',
      uk: 'Як діагностувати і розірвати циклічну залежність між двома сервісами?',
    },
  },
  {
    id: 'q-nullinjectorerror',
    category: 'di',
    q: {
      en: 'What does NullInjectorError mean, and how do you read its message?',
      uk: 'Що означає NullInjectorError і як читати його повідомлення?',
    },
  },
];
