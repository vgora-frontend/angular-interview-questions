import { Question } from '../../models/content.model';

// The component API: lifecycle, inputs and outputs, queries, projection, host and animation.
export const COMPONENTS_QUESTIONS: Question[] = [
  {
    id: 'q-component-vs-directive',
    category: 'components',
    q: {
      en: 'What is the difference between a component and a directive?',
      uk: 'Яка різниця між компонентом і директивою?',
    },
  },
  {
    id: 'q-lifecycle-hooks',
    category: 'components',
    q: {
      en: 'Which lifecycle hooks does a component have, and in what order do they run?',
      uk: 'Які хуки життєвого циклу має компонент і в якому порядку вони виконуються?',
    },
  },
  {
    id: 'q-ngonchanges-vs-ngdocheck',
    category: 'components',
    q: {
      en: 'When does ngOnChanges run, and how does it differ from ngDoCheck?',
      uk: 'Коли виконується ngOnChanges і чим він відрізняється від ngDoCheck?',
    },
  },
  {
    id: 'q-aftercontent-vs-afterview',
    category: 'components',
    q: {
      en: 'What is the difference between ngAfterContentInit and ngAfterViewInit?',
      uk: 'Яка різниця між ngAfterContentInit і ngAfterViewInit?',
    },
  },
  {
    id: 'q-ngondestroy-cleanup',
    category: 'components',
    q: {
      en: 'What must be cleaned up in ngOnDestroy, and what does DestroyRef change about that?',
      uk: "Що обов'язково прибирати в ngOnDestroy і що в цьому змінює DestroyRef?",
    },
  },
  {
    id: 'q-after-render-hooks',
    category: 'components',
    q: {
      en: 'What are afterNextRender and afterRenderEffect for, and why not use ngAfterViewInit?',
      uk: 'Для чого потрібні afterNextRender і afterRenderEffect і чому не обійтися ngAfterViewInit?',
    },
  },
  {
    id: 'q-inputs-and-outputs',
    category: 'components',
    q: {
      en: 'How does a component receive data from its parent and report events back?',
      uk: 'Як компонент отримує дані від батька і повідомляє його про події?',
    },
  },
  {
    id: 'q-input-output-aliasing',
    category: 'components',
    q: {
      en: 'Can inputs and outputs be aliased, and when is that justified?',
      uk: 'Чи можна давати псевдоніми інпутам та аутпутам і коли це виправдано?',
    },
  },
  {
    id: 'q-input-transform',
    category: 'components',
    q: {
      en: 'What does an input transform do, and what is a typical use for it?',
      uk: 'Що робить трансформація інпуту і який у неї типовий сценарій використання?',
    },
  },
  {
    id: 'q-viewchild-static-flag',
    category: 'components',
    q: {
      en: 'What do ViewChild and ViewChildren query, and what does the static flag mean?',
      uk: 'Що саме шукають ViewChild і ViewChildren і що означає прапорець static?',
    },
  },
  {
    id: 'q-contentchild-vs-viewchild',
    category: 'components',
    q: {
      en: 'What is the difference between ContentChild and ViewChild?',
      uk: 'Яка різниця між ContentChild і ViewChild?',
    },
  },
  {
    id: 'q-select-element-in-template',
    category: 'components',
    q: {
      en: 'How do you get a reference to a DOM element inside a component template?',
      uk: 'Як отримати посилання на DOM-елемент усередині шаблону компонента?',
    },
  },
  {
    id: 'q-elementref-risks',
    category: 'components',
    q: {
      en: 'What are the risks of reaching for ElementRef and nativeElement directly?',
      uk: 'Які ризики прямого звернення до ElementRef і nativeElement?',
    },
  },
  {
    id: 'q-content-projection',
    category: 'components',
    q: {
      en: 'What is content projection, and which problem does it solve?',
      uk: 'Що таке проєкція контенту і яку проблему вона вирішує?',
    },
  },
  {
    id: 'q-ng-content-slots',
    category: 'components',
    q: {
      en: 'What is ng-content, and how does multi-slot projection with select work?',
      uk: 'Що таке ng-content і як працює багатослотова проєкція через select?',
    },
  },
  {
    id: 'q-ngprojectas',
    category: 'components',
    q: {
      en: 'What is ngProjectAs for?',
      uk: 'Для чого потрібен ngProjectAs?',
    },
  },
  {
    id: 'q-view-encapsulation',
    category: 'components',
    q: {
      en: 'Which view encapsulation modes exist, and what does each one do to your CSS?',
      uk: 'Які режими інкапсуляції стилів існують і що кожен з них робить з твоїм CSS?',
    },
  },
  {
    id: 'q-host-bindings-object',
    category: 'components',
    q: {
      en: 'How do you bind properties and events on the host element, and why is the host object preferred over @HostBinding and @HostListener?',
      uk: "Як прив'язувати властивості та події до хост-елемента і чому об'єкт host кращий за @HostBinding і @HostListener?",
    },
  },
  {
    id: 'q-host-css-selectors',
    category: 'components',
    q: {
      en: 'What do the :host and :host-context selectors match?',
      uk: 'Що добирають селектори :host і :host-context?',
    },
  },
  {
    id: 'q-display-block-components',
    category: 'components',
    q: {
      en: 'Why does a component host render inline by default, and how do you make it a block?',
      uk: 'Чому хост компонента за замовчуванням рендериться як inline і як зробити його блоковим?',
    },
  },
  {
    id: 'q-dynamic-components',
    category: 'components',
    q: {
      en: 'How do you create a component dynamically at runtime?',
      uk: 'Як створити компонент динамічно під час виконання?',
    },
  },
  {
    id: 'q-ngcomponentoutlet',
    category: 'components',
    q: {
      en: 'When is NgComponentOutlet a better fit than createComponent?',
      uk: 'Коли NgComponentOutlet підходить краще за createComponent?',
    },
  },
  {
    id: 'q-smart-dumb-components',
    category: 'components',
    q: {
      en: 'How do you split container and presentational components, and what does that gain you?',
      uk: 'Як розділяти контейнерні та презентаційні компоненти і що це дає?',
    },
  },
  {
    id: 'q-component-communication-patterns',
    category: 'components',
    q: {
      en: 'How can two sibling components exchange data?',
      uk: 'Як два сусідніх компоненти можуть обмінюватися даними?',
    },
  },
  {
    id: 'q-angular-elements',
    category: 'components',
    q: {
      en: 'What are Angular Elements, and when would you ship a component as a custom element?',
      uk: 'Що таке Angular Elements і коли варто віддавати компонент як custom element?',
    },
  },
  {
    id: 'q-custom-element-mapping',
    category: 'components',
    q: {
      en: "How do a component's inputs and outputs map onto a custom element's API?",
      uk: 'Як інпути та аутпути компонента відображаються на API custom element?',
    },
  },
  {
    id: 'q-component-animations',
    category: 'components',
    q: {
      en: 'How do you animate a component in modern Angular?',
      uk: 'Як анімувати компонент у сучасному Angular?',
    },
  },
  {
    id: 'q-animation-dsl-functions',
    category: 'components',
    q: {
      en: "What do trigger, state, style, animate and transition do in Angular's animation DSL?",
      uk: 'Що роблять trigger, state, style, animate і transition в анімаційному DSL Angular?',
    },
  },
  {
    id: 'q-css-vs-angular-animations',
    category: 'components',
    q: {
      en: "When would you prefer plain CSS animations over Angular's animations package?",
      uk: 'Коли краще обрати звичайні CSS-анімації замість пакета анімацій Angular?',
    },
  },
  {
    id: 'q-reduced-motion',
    category: 'components',
    q: {
      en: 'How do you respect prefers-reduced-motion in an animated component?',
      uk: 'Як враховувати prefers-reduced-motion в анімованому компоненті?',
    },
  },
];
