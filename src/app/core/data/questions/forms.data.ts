import { Question } from '../../models/content.model';

// Reactive forms.
export const FORMS_QUESTIONS: Question[] = [
  {
    id: 'q-reactive-vs-template',
    category: 'forms',
    q: {
      en: 'Why prefer reactive forms over template-driven ones?',
      uk: 'Чому реактивні форми кращі за template-driven?',
    },
    a: {
      en: 'The form model is an explicit, typed object in the component, so validation, cross-field rules, and dynamic controls are ordinary code you can unit-test without rendering anything. Template-driven forms build the model implicitly from directives, which makes types weaker, testing harder, and asynchronous setup racy. Reactive forms also expose valueChanges and statusChanges as streams, which composes with everything else.',
      uk: "Модель форми - це явний типізований об'єкт у компоненті, тому валідація, правила між полями і динамічні контроли стають звичайним кодом, який можна тестувати без рендерингу. Template-driven форми будують модель неявно з директив, через що типи слабші, тестувати важче, а асинхронна ініціалізація стає непередбачуваною. Реактивні форми також дають valueChanges і statusChanges як потоки, що добре поєднується з усім іншим.",
    },
    code: "readonly form = new FormGroup({\n  email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),\n});",
  },
  {
    id: 'q-nonnullable-control',
    category: 'forms',
    q: {
      en: 'What does nonNullable do on a FormControl?',
      uk: 'Що робить nonNullable у FormControl?',
    },
    a: {
      en: 'By default reset() sets a control back to null, so the value type is T | null and every read needs a guard. With nonNullable: true the control resets to the initial value instead and the type stays T. It changes runtime behaviour, not just typing - useful whenever a control genuinely always holds a value, such as a search box or a select with a default.',
      uk: 'Типово reset() повертає контрол до null, тому тип значення - T | null, і кожне читання потребує перевірки. З nonNullable: true контрол скидається до початкового значення, а тип залишається T. Це змінює поведінку під час виконання, а не лише типізацію - корисно, коли контрол справді завжди має значення, наприклад поле пошуку або select зі значенням за замовчуванням.',
    },
  },
];
