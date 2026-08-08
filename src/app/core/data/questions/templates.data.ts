import { Question } from '../../models/content.model';

// Template syntax: bindings, control flow, template refs and the type checker.
export const TEMPLATES_QUESTIONS: Question[] = [
  {
    id: 'q-interpolation',
    category: 'templates',
    q: {
      en: 'What is interpolation, and what may appear inside the braces?',
      uk: 'Що таке інтерполяція і що дозволено писати всередині фігурних дужок?',
    },
  },
  {
    id: 'q-template-expressions',
    category: 'templates',
    q: {
      en: 'What is a template expression, and which JavaScript features are banned in one?',
      uk: 'Що таке шаблонний вираз і які можливості JavaScript у ньому заборонені?',
    },
  },
  {
    id: 'q-template-statements',
    category: 'templates',
    q: {
      en: 'What is a template statement, and how does it differ from a template expression?',
      uk: 'Що таке шаблонна інструкція і чим вона відрізняється від шаблонного виразу?',
    },
  },
  {
    id: 'q-property-vs-attribute-binding',
    category: 'templates',
    q: {
      en: 'What is the difference between property binding and attribute binding?',
      uk: "Яка різниця між прив'язкою до властивості та прив'язкою до атрибута?",
    },
  },
  {
    id: 'q-class-and-style-bindings',
    category: 'templates',
    q: {
      en: 'How do class and style bindings work, and why prefer them over ngClass and ngStyle?',
      uk: "Як працюють прив'язки class і style і чому вони кращі за ngClass та ngStyle?",
    },
  },
  {
    id: 'q-two-way-binding',
    category: 'templates',
    q: {
      en: 'How does two-way binding work, and what does the banana-in-a-box syntax expand to?',
      uk: 'Як працює двостороння прив\'язка і на що розгортається синтаксис "банан у коробці"?',
    },
  },
  {
    id: 'q-control-flow-if',
    category: 'templates',
    q: {
      en: 'How does @if work, and what does it improve over *ngIf?',
      uk: 'Як працює @if і що він покращує порівняно з *ngIf?',
    },
  },
  {
    id: 'q-control-flow-if-else',
    category: 'templates',
    q: {
      en: 'How do you render an alternative branch with @else and @else if?',
      uk: 'Як відрендерити альтернативну гілку через @else і @else if?',
    },
  },
  {
    id: 'q-control-flow-for',
    category: 'templates',
    q: {
      en: 'How does @for work, and what does its @empty block do?',
      uk: 'Як працює @for і для чого потрібен його блок @empty?',
    },
  },
  {
    id: 'q-for-track-required',
    category: 'templates',
    q: {
      en: 'Why is track mandatory in @for, and what breaks when you track by the wrong key?',
      uk: "Чому track є обов'язковим у @for і що ламається, коли ключ обрано неправильно?",
    },
  },
  {
    id: 'q-for-context-variables',
    category: 'templates',
    q: {
      en: 'Which contextual variables does @for expose, and how do you alias them?',
      uk: 'Які контекстні змінні надає @for і як задати їм псевдоніми?',
    },
  },
  {
    id: 'q-control-flow-switch',
    category: 'templates',
    q: {
      en: 'When is @switch a better fit than a chain of @if blocks?',
      uk: 'Коли @switch підходить краще за ланцюжок блоків @if?',
    },
  },
  {
    id: 'q-let-declaration',
    category: 'templates',
    q: {
      en: 'What does the @let declaration do, and where does its value stay live?',
      uk: 'Що робить оголошення @let і де його значення лишається актуальним?',
    },
  },
  {
    id: 'q-ng-container',
    category: 'templates',
    q: {
      en: 'What is ng-container, and when do you need it?',
      uk: 'Що таке ng-container і коли він потрібен?',
    },
  },
  {
    id: 'q-ng-template',
    category: 'templates',
    q: {
      en: 'What is ng-template, and why does nothing render until something instantiates it?',
      uk: 'Що таке ng-template і чому нічого не рендериться, доки його хтось не інстанціює?',
    },
  },
  {
    id: 'q-ng-template-outlet',
    category: 'templates',
    q: {
      en: 'What is ngTemplateOutlet, and how do you pass context into it?',
      uk: 'Що таке ngTemplateOutlet і як передати в нього контекст?',
    },
  },
  {
    id: 'q-template-reference-variables',
    category: 'templates',
    q: {
      en: 'What is a template reference variable, and what does it hold on a component versus a plain element?',
      uk: 'Що таке шаблонна змінна-посилання і що вона містить для компонента, а що для звичайного елемента?',
    },
  },
  {
    id: 'q-safe-navigation-operator',
    category: 'templates',
    q: {
      en: 'What does the safe navigation operator do in a template?',
      uk: 'Що робить оператор безпечної навігації в шаблоні?',
    },
  },
  {
    id: 'q-non-null-assertion-template',
    category: 'templates',
    q: {
      en: 'What is the non-null assertion operator in templates, and why is it a smell?',
      uk: 'Що таке оператор ствердження non-null у шаблонах і чому він є ознакою проблеми?',
    },
  },
  {
    id: 'q-any-cast-function',
    category: 'templates',
    q: {
      en: 'What is the $any() cast function, and when is it the wrong answer?',
      uk: 'Що таке функція приведення $any() і коли вона є хибним рішенням?',
    },
  },
  {
    id: 'q-template-operator-precedence',
    category: 'templates',
    q: {
      en: 'What is the precedence between the pipe operator and the ternary operator?',
      uk: 'Який пріоритет має оператор пайпа порівняно з тернарним оператором?',
    },
  },
  {
    id: 'q-strict-templates',
    category: 'templates',
    q: {
      en: 'What does strictTemplates turn on, and which errors does it catch?',
      uk: 'Що вмикає strictTemplates і які помилки він виявляє?',
    },
  },
  {
    id: 'q-hidden-vs-if',
    category: 'templates',
    q: {
      en: 'What is the difference between @if and the hidden property?',
      uk: 'Яка різниця між @if і властивістю hidden?',
    },
  },
  {
    id: 'q-script-tag-in-template',
    category: 'templates',
    q: {
      en: 'What happens if you put a script tag inside a template?',
      uk: 'Що станеться, якщо помістити тег script усередину шаблону?',
    },
  },
  {
    id: 'q-inline-vs-external-template',
    category: 'templates',
    q: {
      en: 'When would you choose an inline template over an external template file?',
      uk: 'Коли варто обрати вбудований шаблон замість окремого файлу шаблону?',
    },
  },
  {
    id: 'q-logic-in-templates',
    category: 'templates',
    q: {
      en: 'Why is calling a method from a template a problem, and what do you do instead?',
      uk: 'Чому виклик методу з шаблону є проблемою і що робити натомість?',
    },
  },
];
