import { Question } from '../../models/content.model';

// Built-in pipes, custom pipes and the purity rules behind them.
export const PIPES_QUESTIONS: Question[] = [
  {
    id: 'q-what-are-pipes',
    category: 'pipes',
    q: {
      en: 'What is a pipe, and what belongs in one?',
      uk: 'Що таке пайп і що доречно в нього виносити?',
    },
  },
  {
    id: 'q-parameterized-pipe',
    category: 'pipes',
    q: {
      en: 'How do you pass parameters to a pipe?',
      uk: 'Як передати параметри в пайп?',
    },
  },
  {
    id: 'q-chaining-pipes',
    category: 'pipes',
    q: {
      en: 'How do you chain pipes, and in what order do they apply?',
      uk: "Як з'єднувати пайпи в ланцюжок і в якому порядку вони застосовуються?",
    },
  },
  {
    id: 'q-pure-vs-impure-pipe',
    category: 'pipes',
    q: {
      en: 'What is the difference between a pure and an impure pipe?',
      uk: 'Яка різниця між чистим і нечистим пайпом?',
    },
  },
  {
    id: 'q-impure-pipe-cost',
    category: 'pipes',
    q: {
      en: 'Why is an impure pipe a performance risk, and when is it still the right call?',
      uk: 'Чому нечистий пайп є ризиком для продуктивності і коли він усе ж доречний?',
    },
  },
  {
    id: 'q-custom-pipe',
    category: 'pipes',
    q: {
      en: 'How do you write a custom pipe, and what does PipeTransform require?',
      uk: 'Як написати власний пайп і чого вимагає інтерфейс PipeTransform?',
    },
  },
  {
    id: 'q-pipe-dependency-injection',
    category: 'pipes',
    q: {
      en: 'Can a pipe inject dependencies, and what does that imply for its lifecycle?',
      uk: 'Чи може пайп інжектувати залежності і що це означає для його життєвого циклу?',
    },
  },
  {
    id: 'q-async-pipe',
    category: 'pipes',
    q: {
      en: 'What does the async pipe do, and what does it handle for you on destroy?',
      uk: 'Що робить async pipe і що саме він бере на себе при знищенні компонента?',
    },
  },
  {
    id: 'q-async-pipe-vs-subscribe',
    category: 'pipes',
    q: {
      en: 'Why is the async pipe usually better than subscribing in the component class?',
      uk: 'Чому async pipe зазвичай кращий за підписку в класі компонента?',
    },
  },
  {
    id: 'q-async-pipe-multiple-subscriptions',
    category: 'pipes',
    q: {
      en: 'What goes wrong when the same observable runs through the async pipe several times in one template?',
      uk: 'Що піде не так, якщо один і той самий observable кілька разів пройде через async pipe в одному шаблоні?',
    },
  },
  {
    id: 'q-date-pipe-locale',
    category: 'pipes',
    q: {
      en: 'How does the date pipe pick a format, and how do you make it follow the active locale?',
      uk: 'Як date pipe обирає формат і як змусити його враховувати активну локаль?',
    },
  },
  {
    id: 'q-currency-number-pipes',
    category: 'pipes',
    q: {
      en: 'How do the currency, decimal and percent pipes format numbers?',
      uk: 'Як пайпи currency, decimal і percent форматують числа?',
    },
  },
  {
    id: 'q-slice-pipe',
    category: 'pipes',
    q: {
      en: 'What does the slice pipe do, and why is it impure?',
      uk: 'Що робить slice pipe і чому він нечистий?',
    },
  },
  {
    id: 'q-keyvalue-pipe',
    category: 'pipes',
    q: {
      en: 'What does the keyvalue pipe do, and how does it order its output?',
      uk: 'Що робить keyvalue pipe і за яким порядком він видає результат?',
    },
  },
  {
    id: 'q-json-pipe-debug',
    category: 'pipes',
    q: {
      en: 'What is the json pipe good for, and why should it not ship to production?',
      uk: 'Для чого корисний json pipe і чому йому не місце в продакшені?',
    },
  },
  {
    id: 'q-pipe-vs-computed',
    category: 'pipes',
    q: {
      en: 'When would you reach for a computed signal instead of a pipe?',
      uk: 'Коли варто взяти computed-сигнал замість пайпа?',
    },
  },
];
