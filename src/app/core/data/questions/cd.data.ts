import { Question } from '../../models/content.model';

// Change detection: zoneless and OnPush.
export const CD_QUESTIONS: Question[] = [
  {
    id: 'q-zoneless',
    category: 'cd',
    q: {
      en: 'What does zoneless change detection actually change?',
      uk: 'Що насправді змінює zoneless change detection?',
    },
    a: {
      en: 'Without zone.js, Angular stops monkey-patching browser APIs to guess when something might have changed. Instead it schedules change detection from explicit notifications: a signal write, markForCheck(), an async pipe emission, a template event listener, or a host binding update. The practical consequences are a smaller bundle, fewer needless checks, and one rule - state that a template reads must be a signal or must notify Angular itself.',
      uk: 'Без zone.js Angular перестає патчити браузерні API, щоб вгадати, коли щось могло змінитися. Замість цього він планує перевірку змін за явними сигналами: запис у signal, markForCheck(), емісія async pipe, обробник події в шаблоні або оновлення host binding. Практичні наслідки - менший бандл, менше зайвих перевірок і одне правило: стан, який читає шаблон, має бути signal або сам повідомляти Angular.',
    },
    code: 'bootstrapApplication(App, {\n  providers: [provideZonelessChangeDetection()],\n});',
  },
  {
    id: 'q-onpush',
    category: 'cd',
    q: {
      en: 'Which changes does an OnPush component miss, and why?',
      uk: 'Які зміни пропускає OnPush-компонент і чому?',
    },
    a: {
      en: 'OnPush only re-renders when an input reference changes, an event fires from its own template, a signal it reads changes, or something calls markForCheck(). So mutating an array or object in place, or writing to a plain field from a setTimeout or a subscription, leaves the view stale. Mutating in place is the classic trap: the reference is identical, so Angular has nothing to notice.',
      uk: "OnPush перемальовує вигляд лише тоді, коли змінюється посилання в input, спрацьовує подія з його власного шаблону, змінюється прочитаний signal або хтось викликає markForCheck(). Тому мутація масиву чи об'єкта на місці, або запис у звичайне поле з setTimeout чи підписки, залишає вигляд застарілим. Мутація на місці - класична пастка: посилання те саме, тому Angular не має що помітити.",
    },
  },
];
