import { Question } from '../../models/content.model';

// HttpClient, interceptors and talking to a backend.
export const HTTP_QUESTIONS: Question[] = [
  {
    id: 'q-httpclient-benefits',
    category: 'http',
    q: {
      en: 'What is HttpClient, and what does it give you over fetch?',
      uk: 'Що таке HttpClient і що він дає порівняно з fetch?',
    },
  },
  {
    id: 'q-provide-http-client',
    category: 'http',
    q: {
      en: 'How do you set up HttpClient in a standalone application, and what do its with* features add?',
      uk: 'Як налаштувати HttpClient у standalone-застосунку і що додають його можливості with*?',
    },
  },
  {
    id: 'q-no-provider-for-httpclient',
    category: 'http',
    q: {
      en: 'What causes a "No provider for HttpClient" error?',
      uk: 'Через що виникає помилка "No provider for HttpClient"?',
    },
  },
  {
    id: 'q-httpclient-typed-request',
    category: 'http',
    q: {
      en: 'How do you type a request, and what does that type actually guarantee at runtime?',
      uk: 'Як типізувати запит і що цей тип насправді гарантує під час виконання?',
    },
  },
  {
    id: 'q-http-headers-and-params',
    category: 'http',
    q: {
      en: 'How do you attach headers and query parameters, and why are HttpHeaders immutable?',
      uk: 'Як додати заголовки і query-параметри і чому HttpHeaders є незмінними?',
    },
  },
  {
    id: 'q-http-full-response',
    category: 'http',
    q: {
      en: 'How do you read the full response instead of just the body?',
      uk: 'Як прочитати повну відповідь, а не лише тіло?',
    },
  },
  {
    id: 'q-http-error-handling',
    category: 'http',
    q: {
      en: 'How do you handle HTTP errors, and what does HttpErrorResponse tell you?',
      uk: 'Як обробляти HTTP-помилки і що повідомляє HttpErrorResponse?',
    },
  },
  {
    id: 'q-http-cancel-request',
    category: 'http',
    q: {
      en: 'How does unsubscribing cancel an in-flight request, and when does that matter?',
      uk: 'Як відписка скасовує запит, що вже в польоті, і коли це важливо?',
    },
  },
  {
    id: 'q-http-interceptors',
    category: 'http',
    q: {
      en: 'What is an HTTP interceptor, and where does it sit in the request pipeline?',
      uk: 'Що таке HTTP-інтерсептор і де він стоїть у конвеєрі запиту?',
    },
  },
  {
    id: 'q-functional-interceptors',
    category: 'http',
    q: {
      en: 'How does a functional interceptor differ from the class-based one it replaced?',
      uk: 'Чим функціональний інтерсептор відрізняється від класового, який він замінив?',
    },
  },
  {
    id: 'q-interceptor-order',
    category: 'http',
    q: {
      en: 'In what order do multiple interceptors run for a request and for its response?',
      uk: 'У якому порядку виконуються кілька інтерсепторів для запиту і для відповіді?',
    },
  },
  {
    id: 'q-interceptor-use-cases',
    category: 'http',
    q: {
      en: 'What are the classic jobs for an interceptor?',
      uk: 'Які класичні задачі вирішує інтерсептор?',
    },
  },
  {
    id: 'q-interceptor-token-refresh',
    category: 'http',
    q: {
      en: 'How would you implement token refresh in an interceptor without firing it several times at once?',
      uk: 'Як реалізувати оновлення токена в інтерсепторі, не запускаючи його кілька разів одночасно?',
    },
  },
  {
    id: 'q-http-progress-events',
    category: 'http',
    q: {
      en: 'How do you track upload or download progress?',
      uk: 'Як відстежувати прогрес завантаження на сервер або з нього?',
    },
  },
  {
    id: 'q-http-caching',
    category: 'http',
    q: {
      en: 'How would you cache GET responses on the client, and how do you invalidate that cache?',
      uk: 'Як кешувати GET-відповіді на клієнті і як інвалідувати цей кеш?',
    },
  },
  {
    id: 'q-http-resource',
    category: 'http',
    q: {
      en: 'What is httpResource, and how does it change the way a component loads data?',
      uk: 'Що таке httpResource і як він змінює спосіб завантаження даних у компоненті?',
    },
  },
  {
    id: 'q-http-testing-controller',
    category: 'http',
    q: {
      en: 'How do you test code that calls HttpClient without hitting the network?',
      uk: 'Як тестувати код, що викликає HttpClient, не звертаючись до мережі?',
    },
  },
];
