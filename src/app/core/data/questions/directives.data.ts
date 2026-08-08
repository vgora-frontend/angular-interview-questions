import { Question } from '../../models/content.model';

// Directive kinds, custom directives, host directives and the built-in ones.
export const DIRECTIVES_QUESTIONS: Question[] = [
  {
    id: 'q-directive-kinds',
    category: 'directives',
    q: {
      en: 'What kinds of directives does Angular have?',
      uk: 'Які види директив існують в Angular?',
    },
  },
  {
    id: 'q-attribute-directive-example',
    category: 'directives',
    q: {
      en: 'Can you give an example of an attribute directive and what it is good for?',
      uk: 'Наведи приклад атрибутивної директиви і поясни, для чого вона корисна.',
    },
  },
  {
    id: 'q-structural-directive-desugar',
    category: 'directives',
    q: {
      en: 'What does the asterisk in a structural directive desugar to?',
      uk: 'На що розгортається зірочка у структурній директиві?',
    },
  },
  {
    id: 'q-custom-structural-directive',
    category: 'directives',
    q: {
      en: 'How do you write a custom structural directive with TemplateRef and ViewContainerRef?',
      uk: 'Як написати власну структурну директиву за допомогою TemplateRef і ViewContainerRef?',
    },
  },
  {
    id: 'q-structural-directive-input-naming',
    category: 'directives',
    q: {
      en: "Why must a structural directive's inputs be named after its selector?",
      uk: 'Чому інпути структурної директиви мають називатися за її селектором?',
    },
  },
  {
    id: 'q-directive-selectors',
    category: 'directives',
    q: {
      en: 'What selector forms can a directive use, and how do you scope one to a single element type?',
      uk: 'Які форми селекторів може мати директива і як обмежити її одним типом елемента?',
    },
  },
  {
    id: 'q-create-directive-cli',
    category: 'directives',
    q: {
      en: 'How do you generate a directive with the CLI, and what does it scaffold?',
      uk: 'Як згенерувати директиву через CLI і що саме буде створено?',
    },
  },
  {
    id: 'q-host-directives',
    category: 'directives',
    q: {
      en: 'What are host directives, and what problem do they solve that inheritance does not?',
      uk: 'Що таке host-директиви і яку проблему вони вирішують краще за успадкування?',
    },
  },
  {
    id: 'q-directive-composition-api',
    category: 'directives',
    q: {
      en: "How does the directive composition API let you expose a host directive's inputs?",
      uk: 'Як API композиції директив дозволяє відкрити назовні інпути host-директиви?',
    },
  },
  {
    id: 'q-ngclass-vs-class-binding',
    category: 'directives',
    q: {
      en: 'What is the difference between ngClass and a class binding?',
      uk: "Яка різниця між ngClass і прив'язкою class?",
    },
  },
  {
    id: 'q-ngstyle-vs-style-binding',
    category: 'directives',
    q: {
      en: 'What is the difference between ngStyle and a style binding?',
      uk: "Яка різниця між ngStyle і прив'язкою style?",
    },
  },
  {
    id: 'q-ngmodel-directive',
    category: 'directives',
    q: {
      en: 'What does the ngModel directive do, and which module has to be imported for it?',
      uk: 'Що робить директива ngModel і який модуль треба імпортувати для неї?',
    },
  },
  {
    id: 'q-two-structural-directives',
    category: 'directives',
    q: {
      en: 'Why can two structural directives not sit on the same element, and how do you work around it?',
      uk: 'Чому дві структурні директиви не можуть бути на одному елементі і як це обійти?',
    },
  },
  {
    id: 'q-directive-inject-host',
    category: 'directives',
    q: {
      en: 'How can a directive inject the component it is applied to?',
      uk: 'Як директива може інжектувати компонент, до якого її застосовано?',
    },
  },
  {
    id: 'q-renderer2-vs-native',
    category: 'directives',
    q: {
      en: 'Why would a directive use Renderer2 instead of touching nativeElement?',
      uk: 'Чому директиві варто використовувати Renderer2 замість прямої роботи з nativeElement?',
    },
  },
];
