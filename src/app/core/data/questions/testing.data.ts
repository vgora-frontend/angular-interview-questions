import { Question } from '../../models/content.model';

// Unit tests, TestBed, harnesses and what is worth testing at all.
export const TESTING_QUESTIONS: Question[] = [
  {
    id: 'q-testbed',
    category: 'testing',
    q: {
      en: 'What is TestBed, and what does configureTestingModule set up?',
      uk: 'Що таке TestBed і що налаштовує configureTestingModule?',
    },
  },
  {
    id: 'q-component-fixture',
    category: 'testing',
    q: {
      en: 'What does ComponentFixture give you, and why must you call detectChanges?',
      uk: 'Що дає ComponentFixture і чому треба викликати detectChanges?',
    },
  },
  {
    id: 'q-testing-standalone-components',
    category: 'testing',
    q: {
      en: 'How do you test a standalone component, and how do you replace one of its imports?',
      uk: 'Як тестувати standalone-компонент і як підмінити один з його імпортів?',
    },
  },
  {
    id: 'q-override-providers-in-tests',
    category: 'testing',
    q: {
      en: 'How do you swap a real service for a fake in a test?',
      uk: 'Як підмінити справжній сервіс на фейковий у тесті?',
    },
  },
  {
    id: 'q-shallow-vs-deep-tests',
    category: 'testing',
    q: {
      en: 'What is the difference between a shallow and a deep component test, and which do you default to?',
      uk: 'Яка різниця між поверхневим і глибоким тестом компонента і який ти обираєш за замовчуванням?',
    },
  },
  {
    id: 'q-testing-inputs-outputs',
    category: 'testing',
    q: {
      en: 'How do you set an input and assert on an output in a test?',
      uk: 'Як задати інпут і перевірити аутпут у тесті?',
    },
  },
  {
    id: 'q-fakeasync-tick',
    category: 'testing',
    q: {
      en: 'What do fakeAsync and tick do, and which timers do they control?',
      uk: 'Що роблять fakeAsync і tick і якими таймерами вони керують?',
    },
  },
  {
    id: 'q-waitforasync-vs-fakeasync',
    category: 'testing',
    q: {
      en: 'When do you need waitForAsync instead of fakeAsync?',
      uk: 'Коли потрібен waitForAsync замість fakeAsync?',
    },
  },
  {
    id: 'q-fixture-when-stable',
    category: 'testing',
    q: {
      en: 'What does fixture.whenStable() wait for?',
      uk: 'На що чекає fixture.whenStable()?',
    },
  },
  {
    id: 'q-testing-http',
    category: 'testing',
    q: {
      en: 'How does HttpTestingController let you assert on outgoing requests?',
      uk: 'Як HttpTestingController дозволяє перевіряти вихідні запити?',
    },
  },
  {
    id: 'q-marble-testing',
    category: 'testing',
    q: {
      en: 'What is marble testing, and when is it worth the syntax?',
      uk: 'Що таке marble-тестування і коли його синтаксис виправданий?',
    },
  },
  {
    id: 'q-testing-signals-and-effects',
    category: 'testing',
    q: {
      en: 'How do you test signal state and effects without a component?',
      uk: 'Як тестувати сигнальний стан і ефекти без компонента?',
    },
  },
  {
    id: 'q-component-harnesses',
    category: 'testing',
    q: {
      en: 'What is a component test harness, and what does it protect your tests from?',
      uk: 'Що таке component test harness і від чого він захищає твої тести?',
    },
  },
  {
    id: 'q-testing-routing',
    category: 'testing',
    q: {
      en: 'How do you test a component that depends on the router?',
      uk: 'Як тестувати компонент, що залежить від роутера?',
    },
  },
  {
    id: 'q-e2e-options',
    category: 'testing',
    q: {
      en: 'What are the e2e options for an Angular project now that Protractor is gone?',
      uk: 'Які варіанти e2e є в проєкті на Angular після того, як Protractor пішов у минуле?',
    },
  },
  {
    id: 'q-accessibility-testing',
    category: 'testing',
    q: {
      en: 'How do you get accessibility checks into an automated test suite?',
      uk: 'Як вбудувати перевірки доступності в автоматизований набір тестів?',
    },
  },
  {
    id: 'q-what-not-to-test',
    category: 'testing',
    q: {
      en: 'What is not worth writing a test for in an Angular application?',
      uk: 'Для чого в застосунку на Angular не варто писати тест?',
    },
  },
];
