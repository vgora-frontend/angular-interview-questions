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
    a: {
      en: "Treat all values as untrusted by default and sanitize on the way into the DOM; never build a template from user input; keep the framework and its dependencies current, because fixes ship in patches; and rely on the platform for the rest - CSP, HTTPS, secure cookies. The important framing is the boundary: Angular protects the rendering path, and everything about authorisation, sessions and data access is the server's job.",
      uk: 'Вважати всі значення недовіреними за замовчуванням і санітизувати їх на шляху в DOM; ніколи не будувати шаблон з даних користувача; тримати фреймворк і залежності свіжими, бо виправлення виходять у патчах; і покладатися на платформу в решті - CSP, HTTPS, захищені куки. Важлива саме межа: Angular захищає шлях рендерингу, а все про авторизацію, сесії та доступ до даних - робота сервера.',
    },
    code: '// Angular protects this: the value is sanitized on the way into the DOM\n<div [innerHTML]="comment()"></div>\n\n// Angular cannot protect this: the server decides who may read it\nthis.http.get<Invoice>(`/api/invoices/${id}`);\n\n# And the cheapest protection of all:\nng update @angular/core @angular/cli',
  },
  {
    id: 'q-xss-model',
    category: 'security',
    q: {
      en: "How does Angular's model for preventing XSS work?",
      uk: 'Як влаштована модель захисту від XSS в Angular?',
    },
    a: {
      en: 'Every value crossing into the DOM is treated as untrusted and sanitized for the context it is going into. Interpolation inserts text, never markup, so it cannot execute anything at all. A binding to innerHTML or to a URL attribute is sanitized: dangerous constructs are stripped rather than escaped. And a template is compiled, so it cannot be assembled at runtime from a string - which removes the largest class of injection outright.',
      uk: "Кожне значення, що переходить у DOM, вважається недовіреним і санітизується під контекст, у який іде. Інтерполяція вставляє текст, а не розмітку, тож виконати нічого не може взагалі. Прив'язка до innerHTML чи до URL-атрибута санітизується: небезпечні конструкції вирізаються, а не екрануються. А шаблон компілюється, тож його не можна зібрати з рядка під час виконання - і це прибирає найбільший клас інʼєкцій одразу.",
    },
    code: 'const value = "<img src=x onerror=alert(1)><b>hi</b>";\n\n<p>{{ value }}</p>\n<!-- renders the tags as visible text - nothing executes -->\n\n<div [innerHTML]="value"></div>\n<!-- renders <b>hi</b>: the img and its handler are stripped -->',
  },
  {
    id: 'q-security-contexts',
    category: 'security',
    q: {
      en: 'What security contexts does Angular recognise, and why does the context change the treatment?',
      uk: 'Які контексти безпеки розрізняє Angular і чому контекст змінює обробку значення?',
    },
    a: {
      en: 'HTML, style, URL, resource URL and script. The context decides the treatment because the same string is harmless in one place and executable in another: javascript: is a fine piece of text, a dangerous href and a catastrophe as a script src. Resource URL is the strictest - it cannot be sanitized at all, because the browser will execute whatever it points at, so it has to be trusted explicitly or rejected.',
      uk: 'HTML, style, URL, resource URL і script. Контекст визначає обробку, бо той самий рядок безневинний в одному місці й виконуваний в іншому: javascript: - нормальний текст, небезпечний href і катастрофа як src скрипта. Найсуворіший - resource URL: його не можна санітизувати взагалі, бо браузер виконає те, на що він указує, тож його треба або явно позначити довіреним, або відхилити.',
    },
    code: '<a [href]="url()">link</a>              <!-- SecurityContext.URL - sanitized -->\n<div [innerHTML]="html()"></div>        <!-- HTML - sanitized -->\n<div [style.width]="width()"></div>     <!-- STYLE - sanitized -->\n<iframe [src]="frameUrl()"></iframe>    <!-- RESOURCE_URL - refused outright -->\n\n<!-- The iframe throws: a resource URL cannot be made safe by inspection. -->',
  },
  {
    id: 'q-sanitization',
    category: 'security',
    q: {
      en: 'What is sanitization, and what does Angular strip out of untrusted HTML?',
      uk: 'Що таке санітизація і що саме Angular вирізає з недовіреного HTML?',
    },
    a: {
      en: 'Sanitization inspects a value and removes what is unsafe in its context, keeping the rest. For HTML that means script elements, every on* handler attribute, javascript: URLs, and style content that could load a resource - while formatting tags and plain attributes survive. It is a removal, not an escape: the output is still markup, just markup that cannot execute.',
      uk: 'Санітизація перевіряє значення і прибирає те, що небезпечне в його контексті, лишаючи решту. Для HTML це елементи script, усі атрибути-обробники on*, URL з javascript: і вміст style, який міг би завантажити ресурс, - тоді як теги форматування і звичайні атрибути виживають. Це вирізання, а не екранування: на виході досі розмітка, просто така, що не може виконатися.',
    },
    code: 'const dirty = \'<a href="javascript:alert(1)" onclick="steal()">click</a><em>ok</em>\';\n\n<div [innerHTML]="dirty"></div>\n<!-- becomes: <a>click</a><em>ok</em>\n     the href and the onclick are gone, the elements remain -->',
  },
  {
    id: 'q-interpolation-vs-innerhtml',
    category: 'security',
    q: {
      en: 'What is the difference between interpolated content and a binding to innerHTML?',
      uk: "Яка різниця між інтерпольованим вмістом і прив'язкою до innerHTML?",
    },
    a: {
      en: 'Interpolation inserts a text node, so markup shows up as visible characters and nothing can execute - it is safe by construction, not by inspection. innerHTML parses the value as markup and relies on the sanitizer to remove what is dangerous. So interpolation needs no trust at all, while innerHTML needs a sanitizer that is correct. Prefer interpolation whenever the value is not genuinely meant to be markup.',
      uk: 'Інтерполяція вставляє текстовий вузол, тож розмітка показується видимими символами і виконатися не може нічого - вона безпечна за побудовою, а не за перевіркою. innerHTML розбирає значення як розмітку і покладається на санітизатор, який приберає небезпечне. Тож інтерполяції довіра не потрібна взагалі, а innerHTML потребує коректного санітизатора. Надавай перевагу інтерполяції щоразу, коли значення не має бути саме розміткою.',
    },
    code: '<p>{{ userBio() }}</p>\n<!-- "<b>Ada</b>" shows as the characters <b>Ada</b> -->\n\n<div [innerHTML]="userBio()"></div>\n<!-- "<b>Ada</b>" shows as bold Ada, and the sanitizer is now load-bearing -->',
  },
  {
    id: 'q-template-compiler-xss',
    category: 'security',
    q: {
      en: 'What role does the template compiler play in preventing XSS?',
      uk: 'Яку роль у захисті від XSS відіграє компілятор шаблонів?',
    },
    a: {
      en: 'It turns templates into code at build time, so the set of templates that can ever run is fixed before the application ships. That removes template injection as a category: there is no runtime path that takes a string and evaluates it as a template. It also inserts the sanitization calls in the right places, choosing the context from the binding target, which is why the protection is not something you can forget to apply.',
      uk: "Він перетворює шаблони на код під час збірки, тож набір шаблонів, які взагалі можуть виконатися, зафіксовано до випуску застосунку. Це прибирає інʼєкцію шаблонів як категорію: немає рантаймового шляху, який брав би рядок і виконував його як шаблон. Він також вставляє виклики санітизації в потрібні місця, обираючи контекст за ціллю прив'язки, - саме тому цей захист не можна забути застосувати.",
    },
    code: '// There is no API that does this, and that is the point:\n// compileTemplate(`<div>${userInput}</div>`)\n\n// The compiler also chose the context for you here,\n// which is why you cannot accidentally skip the sanitizer:\n<a [href]="link()">go</a>',
  },
  {
    id: 'q-bypass-sanitization',
    category: 'security',
    q: {
      en: 'How do you bypass sanitization, and what do you take responsibility for when you do?',
      uk: 'Як обійти санітизацію і за що ти береш відповідальність, коли це робиш?',
    },
    a: {
      en: 'Through the DomSanitizer bypassSecurityTrust methods, which wrap a value as trusted for one context. You take on exactly what the sanitizer was doing: proving the value is safe. That is defensible for a constant you wrote, or for markup you sanitized server-side with a real library. It is not defensible for anything derived from user input, and every one of these calls deserves a comment saying why it is safe.',
      uk: 'Через методи bypassSecurityTrust у DomSanitizer, які позначають значення довіреним для одного контексту. Ти берешся рівно за те, що робив санітизатор: довести, що значення безпечне. Це виправдано для константи, яку написав ти сам, або для розмітки, санітизованої на сервері справжньою бібліотекою. Це не виправдано для будь-чого, похідного від введення користувача, і кожен такий виклик вартий коментаря, чому він безпечний.',
    },
    code: '// Defensible: a constant, and the reason is written down\nprotected readonly logo = this.sanitizer.bypassSecurityTrustHtml(INLINE_SVG_LOGO);\n\n// Indefensible: this is precisely the hole the sanitizer existed to close\nprotected readonly bio = computed(() =>\n  this.sanitizer.bypassSecurityTrustHtml(this.user().bio),\n);',
  },
  {
    id: 'q-dom-sanitizer',
    category: 'security',
    q: {
      en: 'What does DomSanitizer expose, and which of its methods are dangerous by name?',
      uk: 'Що надає DomSanitizer і які його методи небезпечні вже за назвою?',
    },
    a: {
      en: 'sanitize, which cleans a value for a context, and five bypassSecurityTrust methods - Html, Style, Script, Url and ResourceUrl. The names are a deliberate warning: every one of them says security and trust out loud so it stands out in review. ResourceUrl is the worst to get wrong, because it covers iframe and script sources, where the browser executes whatever arrives.',
      uk: "sanitize, який очищає значення під контекст, і п'ять методів bypassSecurityTrust - Html, Style, Script, Url і ResourceUrl. Назви є навмисним попередженням: кожна вголос вимовляє security і trust, щоб її було видно на код-ревʼю. Найгірше помилитися з ResourceUrl, бо він покриває джерела iframe і script, де браузер виконує все, що приїхало.",
    },
    code: 'private readonly sanitizer = inject(DomSanitizer);\n\n// Clean a value yourself\nconst safe = this.sanitizer.sanitize(SecurityContext.HTML, dirty);\n\n// Named to be visible in a diff:\nbypassSecurityTrustHtml, bypassSecurityTrustStyle, bypassSecurityTrustScript,\nbypassSecurityTrustUrl, bypassSecurityTrustResourceUrl',
  },
  {
    id: 'q-direct-dom-api-risk',
    category: 'security',
    q: {
      en: 'Why is calling DOM APIs directly a security risk in an Angular application?',
      uk: 'Чому прямі виклики DOM API є ризиком безпеки в застосунку на Angular?',
    },
    a: {
      en: 'Because the sanitization lives in the binding, not in the DOM. Assign to nativeElement.innerHTML, or call document.write, or set an attribute with setAttribute, and nothing inspects the value - you have stepped around the one place the protection exists. The framework documents this explicitly as a security risk, which is why the fix is a binding, and Renderer2 only when a binding genuinely cannot express it.',
      uk: "Бо санітизація живе у прив'язці, а не в DOM. Присвой nativeElement.innerHTML, виклич document.write або задай атрибут через setAttribute - і значення ніхто не перевірить: ти обійшов єдине місце, де існує захист. Фреймворк прямо документує це як ризик безпеки, тому виправленням є прив'язка, а Renderer2 - лише коли прив'язка справді не може цього виразити.",
    },
    code: '// No sanitizer runs on any of these\nthis.element.nativeElement.innerHTML = comment;\nthis.element.nativeElement.setAttribute("href", url);\ndocument.write(markup);\n\n// The protected path\n<div [innerHTML]="comment()"></div>\n<a [href]="url()">link</a>',
  },
  {
    id: 'q-dynamic-template-injection',
    category: 'security',
    q: {
      en: 'Why is building a template out of user input the most dangerous thing you can do?',
      uk: 'Чому побудова шаблону з даних користувача є найнебезпечнішим, що можна зробити?',
    },
    a: {
      en: 'Because a template is code, not data. Sanitization protects values flowing into a template; concatenating input into the template itself hands the attacker the compiler, and every binding, expression and event handler in that string becomes theirs. It is a strictly worse hole than innerHTML, and it is why the framework has no runtime template-from-string API at all in an AOT build.',
      uk: "Бо шаблон - це код, а не дані. Санітизація захищає значення, що течуть у шаблон; конкатенація введення в сам шаблон віддає атакувальнику компілятор, і кожна прив'язка, вираз і обробник події в цьому рядку стають його. Це строго гірша діра, ніж innerHTML, і саме тому в AOT-збірці у фреймворку немає жодного рантаймового API для шаблону з рядка.",
    },
    code: '// Never, in any framework, in any language\nconst template = `<div (click)="${userInput}">...</div>`;\n\n// Values into a fixed template: this is the supported shape\n<div [innerHTML]="userInput()"></div>',
  },
  {
    id: 'q-server-side-xss',
    category: 'security',
    q: {
      en: 'How do you protect against server-side XSS when the page is rendered on the server?',
      uk: 'Як захиститися від серверного XSS, коли сторінка рендериться на сервері?',
    },
    a: {
      en: 'Escape anything you interpolate into the HTML template outside Angular - the index.html shell, an injected config object, a meta tag. Angular sanitizes what it renders, but it does not touch markup the server assembled around it, and a config blob written into a script tag is a script you wrote from data. Serialise it as JSON in a data attribute or through TransferState rather than into executable position.',
      uk: "Екрануй усе, що підставляєш у HTML-шаблон поза Angular: оболонку index.html, вставлений об'єкт конфігурації, meta-тег. Angular санітизує те, що рендерить сам, але не торкається розмітки, яку сервер зібрав навколо, а блок конфігурації, записаний у тег script, - це скрипт, який ти написав з даних. Серіалізуй його як JSON у data-атрибут або через TransferState, а не у виконувану позицію.",
    },
    code: '<!-- Server-side XSS: the value lands in executable position -->\n<script>window.config = { user: "<%= userName %>" };</script>\n\n<!-- Data, not code -->\n<div id="config" data-user="<%= escapeHtml(userName) %>"></div>\n\n// Or let Angular carry it across:\nprivate readonly state = inject(TransferState);',
  },
  {
    id: 'q-content-security-policy',
    category: 'security',
    q: {
      en: 'What does a Content Security Policy add, and what does Angular need from it?',
      uk: 'Що додає Content Security Policy і що Angular від неї потребує?',
    },
    a: {
      en: 'It is the second line of defence: even if a value slips through, the browser refuses to load or execute what the policy does not allow. Angular needs style-src to permit its component styles, which it can do with a nonce through the CSP_NONCE token instead of unsafe-inline. Do not grant unsafe-eval to a production build - an AOT build never needs it, so if something demands it, that is worth investigating.',
      uk: 'Це друга лінія захисту: навіть якщо значення просочилося, браузер відмовиться завантажувати чи виконувати те, чого політика не дозволяє. Angular потребує, щоб style-src допускав його стилі компонентів, - і це можна зробити через nonce з токеном CSP_NONCE замість unsafe-inline. Не давай unsafe-eval продакшен-збірці: AOT-збірці він не потрібен ніколи, тож якщо щось його вимагає, це варто дослідити.',
    },
    code: '<!-- Server sets the nonce on both the header and the tag -->\n<!-- Content-Security-Policy: style-src \'nonce-r4nd0m\' -->\n<app-root ngCspNonce="r4nd0m"></app-root>\n\n// Or provide it directly\nproviders: [{ provide: CSP_NONCE, useValue: nonceFromServer }];\n\n// A production build should never need unsafe-eval.',
  },
  {
    id: 'q-xsrf-protection',
    category: 'security',
    q: {
      en: "How does Angular's XSRF protection work, and what must the backend do for it?",
      uk: 'Як працює захист від XSRF в Angular і що для цього має робити бекенд?',
    },
    a: {
      en: 'HttpClient reads a token from a cookie and copies it into a header on every mutating same-origin request. The backend has to do both halves: set that cookie, and reject a request whose header does not match it. The mechanism works because a cross-site attacker can cause a request with your cookies but cannot read the cookie to set the header. Note it applies only to same-origin requests, so a separate API domain needs its own arrangement.',
      uk: 'HttpClient читає токен з куки і копіює його в заголовок кожного змінюючого запиту в межах того самого походження. Бекенд має зробити обидві половини: поставити цю куку і відхиляти запит, чий заголовок їй не відповідає. Механізм працює тому, що атакувальник з іншого сайту може спричинити запит з твоїми куками, але не може прочитати куку, щоб виставити заголовок. Врахуй, що це стосується лише same-origin, тож окремий домен API потребує власного рішення.',
    },
    code: 'provideHttpClient(\n  withXsrfConfiguration({ cookieName: "XSRF-TOKEN", headerName: "X-XSRF-TOKEN" }),\n);\n\n// The cookie must not be HttpOnly, or the client cannot read it.\n// The server must compare the header against the cookie and refuse on mismatch.\n// Cross-origin requests are not covered - that needs SameSite plus CORS.',
  },
  {
    id: 'q-http-level-vulnerabilities',
    category: 'security',
    q: {
      en: 'Which HTTP-level vulnerabilities does Angular not protect you from?',
      uk: 'Від яких вразливостей рівня HTTP Angular тебе не захищає?',
    },
    a: {
      en: 'Most of them. It offers the XSRF token mechanism and nothing else: CORS, clickjacking, session fixation, open redirects, rate limiting, mass assignment and every authorisation decision are outside its reach, because they are decided before or after the browser renders anything. The framework secures the rendering path; the server secures the request. Treating a client-side check as protection is the mistake this question exists to catch.',
      uk: 'Від більшості. Він пропонує механізм XSRF-токена і більше нічого: CORS, clickjacking, фіксація сесії, відкриті перенаправлення, обмеження частоти, mass assignment і кожне рішення про авторизацію - поза його досяжністю, бо вирішуються до або після того, як браузер щось відрендерив. Фреймворк захищає шлях рендерингу; сервер захищає запит. Помилка, яку ловить це питання, - вважати клієнтську перевірку захистом.',
    },
    code: '// A client-side check is a user-experience feature\n@if (user().role === "admin") {\n  <button (click)="deleteEverything()">Delete</button>\n}\n\n// Anyone can call this from a console, so the server decides:\n// DELETE /api/everything -> 403 unless the session is an admin',
  },
  {
    id: 'q-auth-token-storage',
    category: 'security',
    q: {
      en: 'Where should an auth token live in the browser, and what does each option cost you?',
      uk: 'Де в браузері має жити токен автентифікації і чого коштує кожен з варіантів?',
    },
    a: {
      en: 'A HttpOnly, Secure, SameSite cookie is the strongest option: JavaScript cannot read it, so an XSS hole cannot exfiltrate it - at the cost of needing XSRF protection, since the browser sends it automatically. localStorage is readable by any script on the origin, so one XSS is a stolen session that survives a reload. In-memory is safest against theft and is lost on refresh, which pushes you to a refresh token in a cookie anyway.',
      uk: "Найсильніший варіант - кука з HttpOnly, Secure і SameSite: JavaScript не може її прочитати, тож XSS-діра не зможе її викрасти, - ціною потреби в захисті від XSRF, бо браузер надсилає її автоматично. localStorage читає будь-який скрипт цього походження, тож один XSS означає вкрадену сесію, що переживає перезавантаження. Пам'ять найбезпечніша від викрадення і втрачається при оновленні сторінки, що все одно веде до refresh-токена в куці.",
    },
    code: '// Best: the client never touches the token\n// Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax\nprovideHttpClient(withXsrfConfiguration({ ... }));\n\n// One XSS and this is gone, along with the session\nlocalStorage.setItem("token", token);\n\n// In memory: safest against theft, lost on refresh\nprivate readonly token = signal<string | null>(null);',
  },
  {
    id: 'q-guards-are-not-security',
    category: 'security',
    q: {
      en: 'Why is a route guard not a security boundary?',
      uk: 'Чому гвард маршруту не є межею безпеки?',
    },
    a: {
      en: 'Because it runs in the browser, on code the user already has. A guard decides whether to render a screen; it cannot decide whether the API answers. Anyone can call the endpoint directly, edit the state in devtools, or read the lazy chunk the guard was hiding. A guard is a user-experience feature - it keeps people out of screens that would not work for them - and every check it makes has to exist on the server too.',
      uk: 'Бо він виконується в браузері, на коді, який користувач уже має. Гвард вирішує, чи рендерити екран; він не вирішує, чи відповість API. Будь-хто може звернутися до ендпоінта напряму, змінити стан у devtools або прочитати лінивий чанк, який гвард ховав. Гвард - це зручність для користувача: він не пускає людей на екрани, які для них не працювали б, - і кожна його перевірка мусить існувати ще й на сервері.',
    },
    code: '// Keeps a viewer out of a screen that would fail anyway\nexport const adminGuard: CanActivateFn = () =>\n  inject(AuthService).role() === "admin" || inject(Router).parseUrl("/denied");\n\n// The lazy chunk is still downloadable, and this is still open:\n// GET /api/admin/users\n//\n// So the server checks the role too, or nothing was protected.',
  },
  {
    id: 'q-dependency-audit',
    category: 'security',
    q: {
      en: 'How do you keep third-party dependencies from becoming your security problem?',
      uk: 'Як не дати стороннім залежностям стати твоєю проблемою безпеки?',
    },
    a: {
      en: 'Audit regularly and act on what you find rather than accumulating it; keep a lockfile committed so builds are reproducible; pin exact versions for anything sensitive; and review what a new dependency drags in before adding it, because the transitive tree is where the surprises live. Staying current on Angular itself matters for the same reason - security fixes arrive as patch releases, and skipping majors eventually means skipping those too.',
      uk: 'Регулярно проводь аудит і реагуй на знайдене, а не накопичуй його; тримай lockfile у репозиторії, щоб збірки були відтворюваними; фіксуй точні версії для всього чутливого; і дивись, що тягне за собою нова залежність, перш ніж її додавати, бо несподіванки живуть саме в транзитивному дереві. Тримати свіжим сам Angular важливо з тієї ж причини: виправлення безпеки виходять патч-релізами, а пропущені мажори врешті означають пропущені й патчі.',
    },
    code: 'npm audit --omit=dev        # what is actually shipped to a browser\nnpm audit fix                # and then read the diff\nnpm ls some-package          # what pulled it in, and how many copies\n\n# Reproducible builds, and the reason package-lock.json is committed:\nnpm ci',
  },
];
