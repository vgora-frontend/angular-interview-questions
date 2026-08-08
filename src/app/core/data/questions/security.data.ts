import { Question } from '../../models/content.model';

// XSS, sanitization and the guarantees Angular does and does not give you.
export const SECURITY_QUESTIONS: Question[] = [
  {
    id: 'q-security-principles',
    category: 'security',
    q: {
      en: "What are Angular's core security principles?",
      uk: 'Які основні принципи безпеки закладені в Angular?',
    },
  },
  {
    id: 'q-xss-model',
    category: 'security',
    q: {
      en: "How does Angular's model for preventing XSS work?",
      uk: 'Як влаштована модель захисту від XSS в Angular?',
    },
  },
  {
    id: 'q-security-contexts',
    category: 'security',
    q: {
      en: 'What security contexts does Angular recognise, and why does the context change the treatment?',
      uk: 'Які контексти безпеки розрізняє Angular і чому контекст змінює обробку значення?',
    },
  },
  {
    id: 'q-sanitization',
    category: 'security',
    q: {
      en: 'What is sanitization, and what does Angular strip out of untrusted HTML?',
      uk: 'Що таке санітизація і що саме Angular вирізає з недовіреного HTML?',
    },
  },
  {
    id: 'q-interpolation-vs-innerhtml',
    category: 'security',
    q: {
      en: 'What is the difference between interpolated content and a binding to innerHTML?',
      uk: "Яка різниця між інтерпольованим вмістом і прив'язкою до innerHTML?",
    },
  },
  {
    id: 'q-template-compiler-xss',
    category: 'security',
    q: {
      en: 'What role does the template compiler play in preventing XSS?',
      uk: 'Яку роль у захисті від XSS відіграє компілятор шаблонів?',
    },
  },
  {
    id: 'q-bypass-sanitization',
    category: 'security',
    q: {
      en: 'How do you bypass sanitization, and what do you take responsibility for when you do?',
      uk: 'Як обійти санітизацію і за що ти береш відповідальність, коли це робиш?',
    },
  },
  {
    id: 'q-dom-sanitizer',
    category: 'security',
    q: {
      en: 'What does DomSanitizer expose, and which of its methods are dangerous by name?',
      uk: 'Що надає DomSanitizer і які його методи небезпечні вже за назвою?',
    },
  },
  {
    id: 'q-direct-dom-api-risk',
    category: 'security',
    q: {
      en: 'Why is calling DOM APIs directly a security risk in an Angular application?',
      uk: 'Чому прямі виклики DOM API є ризиком безпеки в застосунку на Angular?',
    },
  },
  {
    id: 'q-dynamic-template-injection',
    category: 'security',
    q: {
      en: 'Why is building a template out of user input the most dangerous thing you can do?',
      uk: 'Чому побудова шаблону з даних користувача є найнебезпечнішим, що можна зробити?',
    },
  },
  {
    id: 'q-server-side-xss',
    category: 'security',
    q: {
      en: 'How do you protect against server-side XSS when the page is rendered on the server?',
      uk: 'Як захиститися від серверного XSS, коли сторінка рендериться на сервері?',
    },
  },
  {
    id: 'q-content-security-policy',
    category: 'security',
    q: {
      en: 'What does a Content Security Policy add, and what does Angular need from it?',
      uk: 'Що додає Content Security Policy і що Angular від неї потребує?',
    },
  },
  {
    id: 'q-xsrf-protection',
    category: 'security',
    q: {
      en: "How does Angular's XSRF protection work, and what must the backend do for it?",
      uk: 'Як працює захист від XSRF в Angular і що для цього має робити бекенд?',
    },
  },
  {
    id: 'q-http-level-vulnerabilities',
    category: 'security',
    q: {
      en: 'Which HTTP-level vulnerabilities does Angular not protect you from?',
      uk: 'Від яких вразливостей рівня HTTP Angular тебе не захищає?',
    },
  },
  {
    id: 'q-auth-token-storage',
    category: 'security',
    q: {
      en: 'Where should an auth token live in the browser, and what does each option cost you?',
      uk: 'Де в браузері має жити токен автентифікації і чого коштує кожен з варіантів?',
    },
  },
  {
    id: 'q-guards-are-not-security',
    category: 'security',
    q: {
      en: 'Why is a route guard not a security boundary?',
      uk: 'Чому гвард маршруту не є межею безпеки?',
    },
  },
  {
    id: 'q-dependency-audit',
    category: 'security',
    q: {
      en: 'How do you keep third-party dependencies from becoming your security problem?',
      uk: 'Як не дати стороннім залежностям стати твоєю проблемою безпеки?',
    },
  },
];
