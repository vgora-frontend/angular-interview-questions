import { VersionEntry } from '../../models/content.model';

export const V17: VersionEntry = {
  id: 'v17',
  label: 'v17',
  year: 2023,
  title: {
    en: 'Built-in control flow and deferrable views',
    uk: 'Вбудований control flow і deferrable views',
  },
  points: [
    {
      id: 'v17-control-flow',
      head: { en: 'New control flow', uk: 'Новий control flow' },
      body: {
        en: '@if, @for and @switch replace the structural directives: nothing to import, and the compiler narrows types through them. @for takes a mandatory track, and gained the @empty block that used to need a second *ngIf beside the loop.',
        uk: "@if, @for і @switch замінюють структурні директиви: нічого не потрібно імпортувати, і компілятор звужує типи через них. @for вимагає обов'язкового track і має блок @empty, для якого раніше потрібен був другий *ngIf поруч із циклом.",
      },
      code: '@if (user(); as u) {\n  <p>{{ u.name }}</p>          <!-- u is narrowed, not User | null -->\n} @else {\n  <p>Signed out</p>\n}\n\n@for (item of items(); track item.id) {\n  <li>{{ item.name }}</li>\n} @empty {\n  <li>Nothing here yet</li>   <!-- no *ngIf beside the *ngFor -->\n}',
    },
    {
      id: 'v17-deferrable-views',
      head: { en: 'Deferrable views', uk: 'Deferrable views' },
      body: {
        en: '@defer moves a template and its dependencies into a lazy chunk, with triggers that decide when to fetch it - viewport, interaction, hover, timer or a condition of your own - and blocks for the placeholder, the loading state and the error.',
        uk: '@defer переносить шаблон і його залежності в лінивий чанк, а тригери вирішують, коли його завантажити - viewport, interaction, hover, таймер чи власна умова, - і має блоки для плейсхолдера, стану завантаження та помилки.',
      },
      code: '@defer (on viewport) {\n  <app-comments />            <!-- its own chunk, fetched when scrolled to -->\n} @placeholder {\n  <p>Comments</p>\n} @loading (after 100ms; minimum 500ms) {\n  <app-spinner />\n} @error {\n  <p>Could not load comments</p>\n}',
    },
    {
      id: 'v17-signals-stable',
      head: { en: 'The signals API went stable', uk: 'API сигналів стало стабільним' },
      body: {
        en: 'signal and computed left developer preview; effect, toSignal and toObservable stayed behind a little longer. mutate() was removed in the same release, because mutating in place leaves the reference unchanged and nothing downstream recomputes.',
        uk: 'signal і computed вийшли з developer preview; effect, toSignal і toObservable лишилися там ще на трохи. У тому ж релізі прибрали mutate(), бо мутація на місці не змінює посилання, і нижче по графу нічого не перераховується.',
      },
      code: '// removed in v17\nusers.mutate((list) => list.push(user));\n\n// the replacement, and the contract: replace, do not edit\nusers.update((list) => [...list, user]);',
    },
    {
      id: 'v17-signal-change-detection',
      head: { en: 'Signals narrowed change detection', uk: 'Сигнали звузили change detection' },
      body: {
        en: 'A signal write now marks only the components that actually read it, instead of marking that component and every ancestor up to the root. This is the mechanism that makes zoneless possible two releases later.',
        uk: 'Запис у сигнал тепер позначає лише ті компоненти, які його справді читали, замість позначення компонента і всіх його предків до кореня. Саме цей механізм робить zoneless можливим через два релізи.',
      },
    },
    {
      id: 'v17-esbuild-vite',
      head: { en: 'esbuild and Vite by default', uk: 'esbuild і Vite за замовчуванням' },
      body: {
        en: 'The application builder became the default for new projects, cutting cold build and dev-server start times. The webpack builder stayed available, and was finally deprecated in v22.',
        uk: 'Application builder став типовим для нових проєктів, скоротивши час холодної збірки та старту dev-сервера. Webpack-збірник лишався доступним, а застарілим його оголосили аж у v22.',
      },
    },
    {
      id: 'v17-ssr-in-the-box',
      head: { en: 'Server rendering in the box', uk: 'Серверний рендеринг з коробки' },
      body: {
        en: 'ng new asks about SSR instead of leaving it to a separate setup, and @angular/ssr replaced the Universal packages. Together with the hydration of v16, this is where server rendering became something you turn on rather than a project.',
        uk: 'ng new почав питати про SSR замість того, щоб лишати це на окреме налаштування, а @angular/ssr замінив пакети Universal. Разом із гідратацією з v16 саме тут серверний рендеринг став тим, що просто вмикають, а не окремим проєктом.',
      },
      code: 'ng new my-app --ssr',
    },
    {
      id: 'v17-view-transitions',
      head: { en: 'View transitions in the router', uk: 'View transitions у роутері' },
      body: {
        en: 'withViewTransitions hands navigation to the browser View Transitions API, so a route change can animate between two states without a library and without animating anything by hand.',
        uk: 'withViewTransitions передає навігацію браузерному View Transitions API, тож зміна маршруту може анімуватися між двома станами без бібліотеки і без ручної анімації.',
      },
      code: 'provideRouter(routes, withViewTransitions());',
    },
    {
      id: 'v17-styleurl',
      head: { en: 'styleUrl, and lazy animations', uk: 'styleUrl і ліниві анімації' },
      body: {
        en: 'styleUrl takes a single string instead of an array of one, and provideAnimationsAsync loads the animation engine in a lazy chunk - so an app that animates little stops paying for it up front.',
        uk: 'styleUrl приймає один рядок замість масиву з одного елемента, а provideAnimationsAsync завантажує рушій анімацій лінивим чанком, - тож застосунок, який мало анімує, перестає платити за це наперед.',
      },
      code: '@Component({\n  templateUrl: "./user.html",\n  styleUrl: "./user.scss",       // not styleUrls: ["..."]\n})',
    },
    {
      id: 'v17-angular-dev',
      head: { en: 'angular.dev, and a new logo', uk: 'angular.dev і новий логотип' },
      body: {
        en: 'New documentation with an interactive tutorial and an in-browser playground, and the rebrand that went with it. Worth noting because the old docs are still in search results and still describe a framework that no longer exists.',
        uk: 'Нова документація з інтерактивним туторіалом і плейграундом у браузері та ребрендинг разом із нею. Варто згадати, бо стара документація досі трапляється в пошуку і досі описує фреймворк, якого вже немає.',
      },
    },
  ],
};
