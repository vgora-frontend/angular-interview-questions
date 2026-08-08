import { Question } from '../../models/content.model';

// Loading strategy, rendering on the server, and keeping the bundle honest.
export const PERFORMANCE_QUESTIONS: Question[] = [
  {
    id: 'q-lazy-loading',
    category: 'performance',
    q: {
      en: 'What is lazy loading, and what does it actually save the user?',
      uk: 'Що таке ліниве завантаження і що воно насправді заощаджує користувачу?',
    },
    a: {
      en: "Splitting the application so a route's code is fetched when it is visited rather than at startup. What it saves is the initial bundle: less to download, and much less to parse and compile, which on a mid-range phone costs more than the download. It does not make the application faster overall - the same code arrives eventually - it moves the cost to the moment the user has asked for that feature.",
      uk: 'Це поділ застосунку так, щоб код маршруту завантажувався при відвіданні, а не на старті. Заощаджує він початковий бандл: менше качати і значно менше розбирати та компілювати, а на середньому телефоні це дорожче за саме завантаження. Швидшим застосунок у цілому не стає - той самий код рано чи пізно приїде, - але вартість переноситься на момент, коли користувач сам попросив цю можливість.',
    },
    code: '// Not in the initial bundle: fetched on the first visit to /reports\n{\n  path: "reports",\n  loadComponent: () => import("./reports/reports").then((m) => m.ReportsComponent),\n}\n\n# Confirm it worked - a separate chunk should appear:\nng build --configuration production',
  },
  {
    id: 'q-dynamic-imports',
    category: 'performance',
    q: {
      en: 'How does a dynamic import become a separate chunk, and what breaks that split?',
      uk: 'Як динамічний імпорт стає окремим чанком і що руйнує цей поділ?',
    },
    a: {
      en: 'The bundler sees import() as a split point and emits the module and its private dependencies as their own chunk. What breaks it is a static import of the same module anywhere else in the graph: the code is then needed eagerly, so it goes back into the main bundle and the dynamic import merely points at it. This happens quietly - usually through a type import that was not written as a type-only import, or a barrel file that re-exports everything.',
      uk: 'Бандлер бачить import() як точку поділу і виносить модуль з його приватними залежностями в окремий чанк. Руйнує це статичний імпорт того самого модуля будь-де в графі: тоді код потрібен одразу, тож повертається в головний бандл, а динамічний імпорт лише вказує на нього. Стається це тихо - зазвичай через імпорт типу, не записаний як type-only, або через barrel-файл, що реекспортує все.',
    },
    code: '// This one line puts the whole "reports" chunk back into main.js\nimport { ReportsComponent } from "./reports/reports";\n\n// A type is erased, so this is safe - but only written this way\nimport type { Report } from "./reports/report.model";\n\n// A barrel that re-exports the component defeats the split too:\n// export * from "./reports/reports";',
  },
  {
    id: 'q-defer-blocks',
    category: 'performance',
    q: {
      en: 'What does a @defer block do, and which triggers can start the load?',
      uk: 'Що робить блок @defer і які тригери можуть почати завантаження?',
    },
    a: {
      en: 'It splits part of a template into its own chunk, loaded when a trigger fires - so lazy loading stops being a routing-only feature and becomes something you can apply to a widget. The triggers are idle, viewport, interaction, hover, timer, immediate, and a boolean expression through when. prefetch runs the same triggers for the download only, so the code is ready before the block is needed.',
      uk: 'Він виносить частину шаблону в окремий чанк, який завантажується при спрацюванні тригера, - тож ліниве завантаження перестає бути можливістю лише роутингу і стає застосовним до окремого віджета. Тригери: idle, viewport, interaction, hover, timer, immediate і булевий вираз через when. prefetch запускає ті самі тригери лише для завантаження, тож код готовий ще до того, як блок знадобиться.',
    },
    code: '@defer (on viewport; prefetch on idle) {\n  <app-comments [postId]="postId()" />\n} @placeholder {\n  <p>Comments</p>\n}\n\n@defer (on interaction; on timer(5s)) { <app-chat /> }\n@defer (when isPremium()) { <app-premium-panel /> }',
  },
  {
    id: 'q-defer-placeholder-loading-error',
    category: 'performance',
    q: {
      en: 'What are the @placeholder, @loading and @error blocks for, and why do they have minimum durations?',
      uk: 'Для чого потрібні блоки @placeholder, @loading і @error і чому в них є мінімальні тривалості?',
    },
    a: {
      en: '@placeholder shows before the trigger fires, @loading while the chunk is in flight, @error if the fetch fails. The minimum and after durations exist to stop flicker: on a fast connection a spinner would appear and vanish within a frame, which reads as a glitch rather than as progress. after delays showing the loading state at all, minimum keeps it visible once shown.',
      uk: "@placeholder показується до спрацювання тригера, @loading - поки чанк у польоті, @error - якщо завантаження не вдалося. Тривалості minimum і after існують, щоб прибрати мерехтіння: на швидкому з'єднанні спінер з'явився б і зник у межах кадру, і це читається як збій, а не як прогрес. after відкладає показ стану завантаження взагалі, minimum тримає його видимим, коли вже показали.",
    },
    code: '@defer (on viewport) {\n  <app-chart [data]="data()" />\n} @placeholder (minimum 300ms) {\n  <div class="chart-skeleton"></div>\n} @loading (after 150ms; minimum 400ms) {\n  <app-spinner />\n} @error {\n  <p>The chart could not be loaded.</p>\n}\n\n<!-- after 150ms: a fast load shows no spinner at all -->',
  },
  {
    id: 'q-ssr-what-and-why',
    category: 'performance',
    q: {
      en: 'What is server-side rendering, and which problems does it solve that a SPA cannot?',
      uk: 'Що таке рендеринг на сервері і які проблеми він вирішує там, де SPA безсилий?',
    },
    a: {
      en: 'The server runs the application and returns real HTML, so the first paint does not wait for a JavaScript bundle to download, parse and execute. That fixes three things a client-only app cannot: a slow first contentful paint on weak devices, crawlers and link previews that need markup rather than an empty div, and a blank screen while the bundle loads. The cost is a server to run, and code that must survive having no window.',
      uk: 'Сервер виконує застосунок і повертає справжній HTML, тож перше малювання не чекає, поки JavaScript-бандл завантажиться, розбереться і виконається. Це виправляє три речі, недоступні клієнтському застосунку: повільний first contentful paint на слабких пристроях, кравлери й попередній перегляд посилань, яким потрібна розмітка, а не порожній div, і білий екран поки вантажиться бандл. Ціна - сервер, який треба тримати, і код, що має витримати відсутність window.',
    },
    code: 'ng add @angular/ssr\n\n// Now the same code runs in Node, where this does not exist:\nconst width = window.innerWidth;   // ReferenceError on the server',
  },
  {
    id: 'q-ssr-code-pitfalls',
    category: 'performance',
    q: {
      en: 'Which code breaks under SSR, and how do you guard against it?',
      uk: 'Який код ламається під SSR і як від цього захиститися?',
    },
    a: {
      en: 'Anything reaching for a browser global: window, document, localStorage, navigator, matchMedia. Also setInterval, which keeps the server render from ever settling, and any code assuming a layout, since there is none. Guard by moving browser work into afterNextRender, which only runs on the client, and by checking isPlatformBrowser where the code has to exist in both places. Injecting DOCUMENT rather than using the global also helps, because that is provided on the server too.',
      uk: 'Усе, що звертається до браузерних глобалів: window, document, localStorage, navigator, matchMedia. Також setInterval, який не дає серверному рендерингу ніколи усталитися, і будь-який код, що припускає наявність розкладки, - її немає. Захист - переносити браузерну роботу в afterNextRender, який виконується лише на клієнті, і перевіряти isPlatformBrowser там, де код мусить існувати в обох місцях. Інжектувати DOCUMENT замість глобала теж допомагає, бо на сервері він теж наданий.',
    },
    code: 'private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));\nprivate readonly doc = inject(DOCUMENT);   // provided on the server too\n\nconstructor() {\n  afterNextRender(() => {\n    this.width.set(window.innerWidth);   // client only, after layout\n  });\n}\n\nreadPreference(): string | null {\n  return this.isBrowser ? localStorage.getItem("theme") : null;\n}',
  },
  {
    id: 'q-hydration',
    category: 'performance',
    q: {
      en: 'What is hydration, and what did non-destructive hydration fix?',
      uk: 'Що таке гідратація і що виправила неруйнівна гідратація?',
    },
    a: {
      en: 'Hydration is the client taking over server-rendered HTML: attaching listeners and state to the existing DOM instead of rebuilding it. Before non-destructive hydration, Angular threw the server markup away and re-rendered from scratch, which produced a visible flash, lost scroll position and made the whole exercise partly pointless. Now the DOM is reused, so the first paint survives.',
      uk: 'Гідратація - це коли клієнт перебирає на себе HTML, відрендерений сервером: приєднує слухачі та стан до наявного DOM замість того, щоб його перебудувати. До неруйнівної гідратації Angular викидав серверну розмітку і рендерив усе заново, і це давало видимий блимок, втрату позиції прокрутки і робило всю затію частково марною. Тепер DOM перевикористовується, тож перше малювання зберігається.',
    },
    code: 'providers: [provideClientHydration()];\n\n// Without it: the server HTML is discarded and re-rendered, and the user\n// sees a flash between the two.',
  },
  {
    id: 'q-incremental-hydration',
    category: 'performance',
    q: {
      en: 'What is incremental hydration, and how does it relate to @defer?',
      uk: "Що таке інкрементальна гідратація і як вона пов'язана з @defer?",
    },
    a: {
      en: 'It hydrates a @defer block only when its trigger fires, so the server-rendered markup is on screen and interactive-looking immediately while its JavaScript has not been downloaded at all. That is the difference from plain deferring: the content is present in the HTML rather than replaced by a placeholder, and the cost of interactivity is paid per block, on demand.',
      uk: 'Вона гідратує блок @defer лише при спрацюванні його тригера, тож розмітка з сервера на екрані й виглядає готовою одразу, тоді як її JavaScript не завантажено взагалі. У цьому й різниця зі звичайним відкладенням: вміст присутній у HTML, а не замінений заповнювачем, і вартість інтерактивності платиться поблочно, за потребою.',
    },
    code: 'providers: [provideClientHydration(withIncrementalHydration())];\n\n@defer (hydrate on viewport) {\n  <app-comments [postId]="postId()" />\n}\n\n<!-- Rendered by the server, visible at once,\n     and its JavaScript arrives only when it scrolls into view. -->',
  },
  {
    id: 'q-hydration-mismatch',
    category: 'performance',
    q: {
      en: 'What causes a hydration mismatch, and how do you debug one?',
      uk: 'Через що виникає розбіжність гідратації і як її налагоджувати?',
    },
    a: {
      en: "The client rendering something different from the server: a random value, a timestamp, a branch on a browser global, or invalid HTML the browser silently corrected - a div inside a p is the classic. Angular logs NG0500 with the node it disagreed on. Debug by making the render deterministic: pass the server's value through TransferState rather than recomputing it, and validate the markup, because the browser's correction is invisible in your source.",
      uk: 'Клієнт відрендерив щось інше, ніж сервер: випадкове значення, часову позначку, гілку за браузерним глобалом або невалідний HTML, який браузер тихо виправив, - класика це div усередині p. Angular пише NG0500 з вузлом, на якому не збіглося. Налагоджуй, роблячи рендеринг детермінованим: передавай значення з сервера через TransferState замість повторного обчислення і перевіряй розмітку, бо виправлення браузера у твоєму коді не видно.',
    },
    code: '// Guaranteed mismatch: two different values\nprotected readonly id = Math.random();\nprotected readonly now = new Date();\n\n// NG0500: During hydration, Angular expected <div> but found <span>\n//\n// Invalid nesting the browser silently fixes, so the trees differ:\n<p><div>text</div></p>',
  },
  {
    id: 'q-prerendering-ssg',
    category: 'performance',
    q: {
      en: 'When is prerendering a better fit than server-side rendering?',
      uk: 'Коли попередній рендеринг підходить краще за рендеринг на сервері?',
    },
    a: {
      en: 'When the page is the same for everyone and changes only when you rebuild: marketing pages, documentation, a blog. The HTML is generated at build time and served as a static file, so there is no server to run, no per-request latency and nothing to scale. SSR is for pages that depend on who is asking or on data that changes between requests.',
      uk: 'Коли сторінка однакова для всіх і змінюється лише при перезбірці: маркетингові сторінки, документація, блог. HTML генерується під час збірки і віддається як статичний файл, тож немає сервера, який треба тримати, немає затримки на запит і немає чого масштабувати. SSR потрібен сторінкам, що залежать від того, хто питає, або від даних, які змінюються між запитами.',
    },
    code: '// Prerender these paths at build time\nexport const serverRoutes: ServerRoute[] = [\n  { path: "", renderMode: RenderMode.Prerender },\n  { path: "docs/**", renderMode: RenderMode.Prerender },\n  { path: "dashboard", renderMode: RenderMode.Server },   // per-user\n  { path: "playground", renderMode: RenderMode.Client },  // no SSR at all\n];',
  },
  {
    id: 'q-transfer-state',
    category: 'performance',
    q: {
      en: 'What does TransferState solve, and what does provideClientHydration do about duplicate requests?',
      uk: 'Яку проблему вирішує TransferState і що робить provideClientHydration з дубльованими запитами?',
    },
    a: {
      en: 'It carries data the server already fetched into the client, serialised into the HTML, so the client does not request the same thing again the moment it starts. provideClientHydration turns this on for HttpClient automatically: a GET made during the server render is cached and replayed on the client. It is also the right place for any value that must be identical on both sides, which is how you avoid a hydration mismatch.',
      uk: 'Він переносить дані, які сервер уже отримав, на клієнт, серіалізуючи їх у HTML, тож клієнт не просить те саме вдруге, щойно запустився. provideClientHydration вмикає це для HttpClient автоматично: GET, зроблений під час серверного рендерингу, кешується і відтворюється на клієнті. Це ж правильне місце для будь-якого значення, яке має бути ідентичним з обох боків, - саме так уникають розбіжності гідратації.',
    },
    code: '// On by default with hydration - the client does not refetch this\nprovideClientHydration();\n\n// Opt out for a request that must always be fresh on the client\nthis.http.get<Rates>("/api/rates", { transferCache: false });\n\n// Your own value, identical on both sides\nprivate readonly state = inject(TransferState);\nprivate readonly key = makeStateKey<number>("renderedAt");',
  },
  {
    id: 'q-track-performance',
    category: 'performance',
    q: {
      en: 'How does a good track expression in @for change list rendering cost?',
      uk: 'Як вдалий вираз track у @for змінює вартість рендерингу списку?',
    },
    a: {
      en: 'It turns a rebuild into a patch. With a stable key, reordering a thousand rows moves DOM nodes; without one, every row is destroyed and recreated, which also loses focus, resets inputs and restarts animations. On a large list that is the difference between a frame and a visible freeze - and it is the single cheapest list optimisation there is, which is why track is now mandatory.',
      uk: "Він перетворює перебудову на патч. Зі стабільним ключем переставляння тисячі рядків рухає вузли DOM; без нього кожен рядок знищується і створюється заново, а разом з цим втрачається фокус, скидаються поля і перезапускаються анімації. На великому списку це різниця між кадром і видимим підвисанням - і це найдешевша оптимізація списку взагалі, тому track тепер обов'язковий.",
    },
    code: '@for (row of rows(); track row.id) { <app-row [row]="row" /> }\n\n<!-- $index is fine only if the list is append-only and never reordered -->\n@for (row of rows(); track $index) { ... }\n\n<!-- Worst case: a refetch makes new objects, so every row is recreated -->\n@for (row of rows(); track row) { ... }',
  },
  {
    id: 'q-virtual-scrolling',
    category: 'performance',
    q: {
      en: 'When do you need virtual scrolling, and what does the CDK give you for it?',
      uk: 'Коли потрібен віртуальний скрол і що для цього дає CDK?',
    },
    a: {
      en: 'When the list is long enough that the DOM itself is the problem - a few thousand rows, where even a perfect track expression cannot help because the nodes exist. The CDK renders only what fits the viewport plus a buffer, with a fixed item size or an autosize strategy. The trade-offs are real: browser find-in-page only sees rendered rows, and anchor links into the list stop working.',
      uk: 'Коли список настільки довгий, що проблемою є сам DOM: кілька тисяч рядків, де навіть ідеальний вираз track не допоможе, бо вузли існують. CDK рендерить лише те, що вміщується у вікно, плюс буфер, з фіксованим розміром елемента або стратегією autosize. Компроміси реальні: пошук по сторінці в браузері бачить лише відрендерені рядки, а посилання-якорі всередину списку перестають працювати.',
    },
    code: '<cdk-virtual-scroll-viewport itemSize="48" class="viewport">\n  <app-row *cdkVirtualFor="let row of rows(); templateCacheSize: 0" [row]="row" />\n</cdk-virtual-scroll-viewport>\n\n/* The viewport needs an explicit height, or nothing is virtualised */\n.viewport { height: 600px; }',
  },
  {
    id: 'q-ngoptimizedimage',
    category: 'performance',
    q: {
      en: 'What does NgOptimizedImage do, and where does it not apply?',
      uk: 'Що робить NgOptimizedImage і де він не застосовний?',
    },
    a: {
      en: 'It enforces the things that make images fast and are easy to forget: lazy loading by default, a preload link for the image you mark priority, required width and height so the layout does not shift, srcset generation, and warnings when an image is far larger than its rendered size. It does not work with inline base64 images, and it requires the dimensions - which is the point, since a missing size is the usual cause of layout shift.',
      uk: "Він нав'язує те, що робить зображення швидкими і про що легко забути: ліниве завантаження за замовчуванням, preload-посилання для зображення, позначеного як priority, обов'язкові width і height, щоб розкладка не стрибала, генерацію srcset і попередження, коли зображення набагато більше за свій відрендерений розмір. Він не працює з вбудованими base64-зображеннями і вимагає розмірів - і в цьому суть, бо саме відсутність розміру зазвичай і викликає стрибок розкладки.",
    },
    code: '<img ngSrc="/assets/hero.jpg" width="1200" height="600" priority alt="" />\n<img ngSrc="/assets/row.jpg" width="80" height="80" alt="Thumbnail" />\n\n<!-- Not supported: there is nothing to optimise about a data URI -->\n<img [src]="base64Avatar" />',
  },
  {
    id: 'q-font-inlining',
    category: 'performance',
    q: {
      en: 'What does automatic font inlining do at build time?',
      uk: 'Що робить автоматичне вбудовування шрифтів під час збірки?',
    },
    a: {
      en: 'The build fetches the CSS for Google Fonts and Adobe Fonts links and inlines it into index.html, removing a request to a third-party origin from the critical path. That request was blocking render and cost a DNS lookup and a TLS handshake before the first byte of CSS. It is on by default in production; a build with no network access falls back to leaving the link alone.',
      uk: 'Збірка завантажує CSS для посилань на Google Fonts і Adobe Fonts і вбудовує його в index.html, прибираючи з критичного шляху запит до сторонього походження. Цей запит блокував рендеринг і коштував пошуку DNS та TLS-рукостискання ще до першого байта CSS. У продакшені це ввімкнено за замовчуванням; збірка без доступу до мережі просто лишає посилання як є.',
    },
    code: '// angular.json - on by default in production\n"optimization": {\n  "fonts": { "inline": true }\n}\n\n<!-- This link is resolved and inlined at build time, not at runtime -->\n<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />',
  },
  {
    id: 'q-bundle-size-analysis',
    category: 'performance',
    q: {
      en: 'How do you find out what is making a bundle big?',
      uk: "Як з'ясувати, через що бандл став великим?",
    },
    a: {
      en: 'Build with statistics and open the output in a visualiser, which shows the tree by module so you can see which dependency is disproportionate. The findings are usually the same few: a date or lodash library imported whole rather than by function, an icon set pulled in entirely, a polyfill nobody needs any more, and a lazy route defeated by a static import. Measure the production build - a dev build tells you nothing about size.',
      uk: 'Збери зі статистикою і відкрий вивід у візуалізаторі: він показує дерево по модулях, тож видно, яка залежність непропорційна. Знахідки зазвичай ті самі кілька: бібліотека дат чи lodash, імпортована цілком замість окремої функції, повністю затягнутий набір іконок, полізаповнювач, який більше нікому не потрібен, і лінивий маршрут, зруйнований статичним імпортом. Міряй продакшен-збірку: dev-збірка про розмір не каже нічого.',
    },
    code: 'ng build --configuration production --stats-json\nnpx esbuild-visualizer --metadata dist/*/stats.json\n\n// The classic finding: the whole library instead of one function\nimport _ from "lodash";              // ~70kb\nimport groupBy from "lodash-es/groupBy";   // ~2kb',
  },
  {
    id: 'q-budgets',
    category: 'performance',
    q: {
      en: 'What are build budgets, and how do you use them to stop regressions?',
      uk: 'Що таке бюджети збірки і як з їх допомогою зупиняти регресії?',
    },
    a: {
      en: "Size limits declared in angular.json that make the build warn or fail when it exceeds them. They matter because bundle growth is never one bad commit - it is fifty small ones nobody measured. Set the error threshold slightly above today's size, wire the build into CI, and a regression becomes a failed pipeline with a name attached instead of a discovery six months later.",
      uk: "Це обмеження розміру, оголошені в angular.json, які змушують збірку попереджати або падати при перевищенні. Вони важливі тому, що бандл ніколи не росте від одного поганого коміту - він росте від п'ятдесяти дрібних, яких ніхто не міряв. Постав межу помилки трохи вище за поточний розмір, підключи збірку до CI - і регресія стане проваленим пайплайном з іменем автора, а не відкриттям за пів року.",
    },
    code: '// angular.json\n"budgets": [\n  { "type": "initial", "maximumWarning": "500kb", "maximumError": "600kb" },\n  { "type": "anyComponentStyle", "maximumWarning": "4kb" }\n]\n\n# Now this fails in CI rather than shipping quietly:\nng build --configuration production',
  },
  {
    id: 'q-service-worker-role',
    category: 'performance',
    q: {
      en: 'What role does a service worker play in an Angular application?',
      uk: 'Яку роль відіграє service worker у застосунку на Angular?',
    },
    a: {
      en: 'It sits between the application and the network as a programmable cache: on a repeat visit the shell is served from disk, so the application starts without waiting for anything, and it can keep working offline. Angular generates the worker from a config file rather than having you write one, splitting assets into groups fetched eagerly or lazily, with a freshness or performance strategy per data group.',
      uk: 'Він стоїть між застосунком і мережею як програмований кеш: при повторному відвіданні оболонка віддається з диска, тож застосунок стартує, нічого не чекаючи, і може працювати офлайн. Angular генерує воркер з файлу конфігурації, а не змушує писати його самому, розділяючи ресурси на групи, які завантажуються одразу чи ліниво, зі стратегією freshness або performance для кожної групи даних.',
    },
    code: 'ng add @angular/pwa\n\n// ngsw-config.json\n{\n  "assetGroups": [{ "name": "app", "installMode": "prefetch", "resources": { ... } }],\n  "dataGroups": [\n    { "name": "api", "urls": ["/api/**"], "cacheConfig": { "strategy": "freshness", "maxAge": "1h", "maxSize": 100 } }\n  ]\n}',
  },
  {
    id: 'q-service-worker-update-flow',
    category: 'performance',
    q: {
      en: 'How does SwUpdate let you tell a user that a new version is available?',
      uk: 'Як SwUpdate дозволяє повідомити користувача про доступну нову версію?',
    },
    a: {
      en: 'versionUpdates emits a VERSION_READY event once a new version has been downloaded and is waiting; you show a prompt and reload when the user accepts. This matters more than it sounds: without it, a cached application can run an old version for weeks, because the tab is never closed. Handle VERSION_INSTALLATION_FAILED too, and never reload without asking - you would discard whatever the user was in the middle of.',
      uk: 'versionUpdates емітить подію VERSION_READY, коли нову версію вже завантажено і вона чекає; ти показуєш запит і перезавантажуєш, коли користувач погодився. Це важливіше, ніж звучить: без цього закешований застосунок може тижнями працювати на старій версії, бо вкладку ніколи не закривають. Обробляй і VERSION_INSTALLATION_FAILED, і ніколи не перезавантажуй без запитання - інакше викинеш те, що користувач саме робив.',
    },
    code: 'private readonly updates = inject(SwUpdate);\n\nconstructor() {\n  this.updates.versionUpdates\n    .pipe(filter((event) => event.type === "VERSION_READY"), takeUntilDestroyed())\n    .subscribe(() => this.updateAvailable.set(true));\n}\n\nprotected async applyUpdate(): Promise<void> {\n  await this.updates.activateUpdate();\n  location.reload();   // only after the user said yes\n}',
  },
  {
    id: 'q-app-shell',
    category: 'performance',
    q: {
      en: 'What is an app shell, and which metric does it improve?',
      uk: 'Що таке app shell і яку метрику він покращує?',
    },
    a: {
      en: 'A minimal prerendered page - the header, the layout, a skeleton - inlined into index.html at build time, so something meaningful paints before any JavaScript runs. It improves first contentful paint, and the perception of speed more than the total load time. With full prerendering and hydration available it is less often the right tool, but it still fits an application whose first route genuinely cannot be prerendered.',
      uk: 'Це мінімальна попередньо відрендерена сторінка - шапка, розкладка, скелет, - вбудована в index.html під час збірки, тож щось змістовне малюється до запуску будь-якого JavaScript. Вона покращує first contentful paint і відчуття швидкості більше, ніж загальний час завантаження. З доступними повним попереднім рендерингом і гідратацією це рідше правильний інструмент, але він досі пасує застосунку, чий перший маршрут справді не можна відрендерити заздалегідь.',
    },
    code: 'ng generate app-shell\n\n# The shell route is rendered at build time and inlined into index.html,\n# so the header and skeleton appear before main.js has been parsed.',
  },
  {
    id: 'q-web-workers',
    category: 'performance',
    q: {
      en: 'When would you move work into a web worker, and what cannot go there?',
      uk: 'Коли варто винести роботу у web worker і що туди винести не можна?',
    },
    a: {
      en: 'When a computation blocks the main thread long enough to be felt - parsing a large file, image processing, a heavy calculation over thousands of rows. What cannot go there is anything touching the DOM, and therefore any Angular component or template: a worker has no document. The other cost is the message boundary, since data is copied rather than shared, so a worker can be slower than the work it replaced.',
      uk: 'Коли обчислення блокує головний потік настільно, що це відчутно: розбір великого файлу, обробка зображень, важкий розрахунок по тисячах рядків. Не можна виносити нічого, що торкається DOM, а отже жодного компонента чи шаблону Angular: у воркера немає document. Інша ціна - межа обміну повідомленнями: дані копіюються, а не поділяються, тож воркер може виявитися повільнішим за роботу, яку заміняв.',
    },
    code: 'ng generate web-worker parser\n\n// In the component - no DOM crosses this boundary\nconst worker = new Worker(new URL("./parser.worker", import.meta.url));\nworker.postMessage(rawCsv);\nworker.onmessage = ({ data }) => this.rows.set(data);\n\n// And remember to terminate it:\ninject(DestroyRef).onDestroy(() => worker.terminate());',
  },
  {
    id: 'q-core-web-vitals-angular',
    category: 'performance',
    q: {
      en: 'Which Core Web Vitals does an Angular application typically struggle with, and why?',
      uk: 'З якими Core Web Vitals зазвичай має проблеми застосунок на Angular і чому?',
    },
    a: {
      en: 'LCP, because the largest element usually waits for a bundle and then for data - which is what SSR and prerendering address. And CLS, because content arriving after the first paint pushes the layout around: images without dimensions, a spinner replaced by taller content, a banner inserted at the top. INP is rarely the problem unless change detection is doing too much work per interaction. Measure in the field, not on your machine.',
      uk: 'З LCP, бо найбільший елемент зазвичай чекає на бандл, а потім на дані - саме це вирішують SSR і попередній рендеринг. І з CLS, бо вміст, що надходить після першого малювання, штовхає розкладку: зображення без розмірів, спінер, замінений вищим вмістом, банер, вставлений згори. INP рідко є проблемою, якщо change detection не робить надто багато роботи на взаємодію. Міряй у полі, а не на своїй машині.',
    },
    code: '<!-- CLS: reserve the space before the content arrives -->\n<img ngSrc="/hero.jpg" width="1200" height="600" priority alt="" />\n\n@if (loading()) {\n  <div class="skeleton" style="height: 320px"></div>   <!-- same height as the real thing -->\n} @else {\n  <app-chart [data]="data()" />\n}',
  },
];
