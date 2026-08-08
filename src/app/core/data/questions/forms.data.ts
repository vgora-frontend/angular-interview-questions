import { Question } from '../../models/content.model';

// Reactive and template-driven forms, validation and custom controls.
export const FORMS_QUESTIONS: Question[] = [
  {
    id: 'q-reactive-vs-template-driven',
    category: 'forms',
    q: {
      en: 'What is the difference between reactive and template-driven forms?',
      uk: 'Яка різниця між реактивними і шаблонними формами?',
    },
  },
  {
    id: 'q-reactive-forms-basics',
    category: 'forms',
    q: {
      en: 'How do you build a reactive form, and where does its source of truth live?',
      uk: 'Як побудувати реактивну форму і де живе її джерело істини?',
    },
  },
  {
    id: 'q-template-driven-basics',
    category: 'forms',
    q: {
      en: 'How does a template-driven form work, and why is its model built asynchronously?',
      uk: 'Як працює шаблонна форма і чому її модель будується асинхронно?',
    },
  },
  {
    id: 'q-form-control-group-array',
    category: 'forms',
    q: {
      en: 'What are FormControl, FormGroup, FormRecord and FormArray, and when do you pick each?',
      uk: 'Що таке FormControl, FormGroup, FormRecord і FormArray і коли обирати кожен з них?',
    },
  },
  {
    id: 'q-form-builder',
    category: 'forms',
    q: {
      en: 'What is FormBuilder for, and what does its nonNullable variant change?',
      uk: 'Для чого потрібен FormBuilder і що змінює його nonNullable-варіант?',
    },
  },
  {
    id: 'q-typed-forms',
    category: 'forms',
    q: {
      en: 'What do typed reactive forms give you, and where does the type come from?',
      uk: 'Що дають типізовані реактивні форми і звідки береться тип?',
    },
  },
  {
    id: 'q-nullable-form-controls',
    category: 'forms',
    q: {
      en: 'Why is a FormControl value nullable by default, and how do you avoid that?',
      uk: 'Чому значення FormControl за замовчуванням може бути null і як цього уникнути?',
    },
  },
  {
    id: 'q-setvalue-vs-patchvalue',
    category: 'forms',
    q: {
      en: 'What is the difference between setValue and patchValue?',
      uk: 'Яка різниця між setValue і patchValue?',
    },
  },
  {
    id: 'q-form-state-flags',
    category: 'forms',
    q: {
      en: 'What do touched, dirty, pristine and untouched mean, and which do you use to show an error?',
      uk: 'Що означають touched, dirty, pristine і untouched і який з них використовувати для показу помилки?',
    },
  },
  {
    id: 'q-ngmodel-css-classes',
    category: 'forms',
    q: {
      en: 'Which state CSS classes does Angular put on a form control?',
      uk: 'Які CSS-класи стану Angular додає до елемента керування формою?',
    },
  },
  {
    id: 'q-form-reset',
    category: 'forms',
    q: {
      en: 'What does reset() actually reset, and how do you reset to specific values?',
      uk: 'Що насправді скидає reset() і як скинути до конкретних значень?',
    },
  },
  {
    id: 'q-validator-types',
    category: 'forms',
    q: {
      en: 'What is the difference between a synchronous and an asynchronous validator?',
      uk: 'Яка різниця між синхронним і асинхронним валідатором?',
    },
  },
  {
    id: 'q-builtin-validators',
    category: 'forms',
    q: {
      en: 'Which built-in validators ship with Angular, and what are their limits?',
      uk: 'Які вбудовані валідатори постачає Angular і які в них обмеження?',
    },
  },
  {
    id: 'q-custom-validator',
    category: 'forms',
    q: {
      en: 'How do you write a custom validator, and what shape must it return?',
      uk: 'Як написати власний валідатор і яку структуру він має повертати?',
    },
  },
  {
    id: 'q-cross-field-validator',
    category: 'forms',
    q: {
      en: 'How do you validate two fields against each other, such as password confirmation?',
      uk: 'Як валідувати два поля одне проти одного, наприклад підтвердження пароля?',
    },
  },
  {
    id: 'q-async-validator-performance',
    category: 'forms',
    q: {
      en: 'How do you keep an async validator from hammering the server on every keystroke?',
      uk: 'Як не дати асинхронному валідатору бити по серверу на кожне натискання клавіші?',
    },
  },
  {
    id: 'q-update-on-strategy',
    category: 'forms',
    q: {
      en: 'What does the updateOn option do, and when would you set it to blur or submit?',
      uk: 'Що робить опція updateOn і коли варто ставити її в blur або submit?',
    },
  },
  {
    id: 'q-valuechanges-statuschanges',
    category: 'forms',
    q: {
      en: 'What do valueChanges and statusChanges emit, and what has to be cleaned up?',
      uk: 'Що емітять valueChanges і statusChanges і що потрібно за ними прибирати?',
    },
  },
  {
    id: 'q-emitevent-option',
    category: 'forms',
    q: {
      en: 'What does emitEvent: false do, and which bug does it usually prevent?',
      uk: 'Що робить emitEvent: false і який баг він зазвичай запобігає?',
    },
  },
  {
    id: 'q-disabled-control-pitfall',
    category: 'forms',
    q: {
      en: 'Why does binding the disabled attribute on a reactive control warn, and what is the correct way?',
      uk: "Чому прив'язка атрибута disabled на реактивному контролі викликає попередження і як робити правильно?",
    },
  },
  {
    id: 'q-disabled-value-excluded',
    category: 'forms',
    q: {
      en: 'Why is a disabled control missing from form.value, and how do you get it back?',
      uk: 'Чому вимкнений контрол відсутній у form.value і як його повернути?',
    },
  },
  {
    id: 'q-control-value-accessor',
    category: 'forms',
    q: {
      en: 'What is ControlValueAccessor, and what does implementing it let you do?',
      uk: 'Що таке ControlValueAccessor і що дає його реалізація?',
    },
  },
  {
    id: 'q-dynamic-forms',
    category: 'forms',
    q: {
      en: 'How do you build a form whose fields are described by data rather than markup?',
      uk: 'Як побудувати форму, поля якої описані даними, а не розміткою?',
    },
  },
  {
    id: 'q-form-accessibility',
    category: 'forms',
    q: {
      en: 'How do you make form errors accessible to a screen reader?',
      uk: 'Як зробити помилки форми доступними для екранного читача?',
    },
  },
  {
    id: 'q-forms-with-signals',
    category: 'forms',
    q: {
      en: 'How do reactive forms fit together with signals today?',
      uk: 'Як реактивні форми поєднуються з сигналами на сьогодні?',
    },
  },
];
