import { VersionEntry } from '../../models/content.model';

export const V19: VersionEntry = {
  id: 'v19',
  label: 'v19',
  year: 2024,
  title: {
    en: 'Standalone by default, linkedSignal and resource',
    uk: 'Standalone за замовчуванням, linkedSignal і resource',
  },
  points: [
    {
      id: 'v19-standalone-default',
      head: { en: 'Standalone is the default', uk: 'Standalone став типовим' },
      body: {
        en: 'standalone: true became implied, and standalone: false is now how you opt back into an NgModule. A migration strips the flag from existing code, and strictStandalone makes anything else a compile error.',
        uk: 'standalone: true став матися на увазі, а standalone: false тепер є способом повернутися до NgModule. Міграція прибирає прапорець зі старого коду, а strictStandalone робить усе інше помилкою компіляції.',
      },
      code: '@Component({\n  selector: "user-card",       // no standalone: true - it is the default\n  imports: [RouterLink],\n  templateUrl: "./user-card.html",\n})\nexport class UserCardComponent {}',
    },
    {
      id: 'v19-signal-apis-stable',
      head: {
        en: 'The signal component APIs went stable',
        uk: 'Сигнальні API компонента стабілізувалися',
      },
      body: {
        en: 'input(), output(), model(), viewChild(), contentChild() and their plural forms left developer preview, and a schematic migrates the decorators. An input is now a signal you read, not a field that changes under you.',
        uk: 'input(), output(), model(), viewChild(), contentChild() та їхні множинні форми вийшли з developer preview, а схематика мігрує декоратори. Input тепер є сигналом, який ти читаєш, а не полем, що змінюється в тебе за спиною.',
      },
      code: 'readonly user = input.required<User>();\nreadonly picked = output<User>();\nreadonly open = model(false);          // a two-way binding, as a signal\n\nng generate @angular/core:signals',
    },
    {
      id: 'v19-unused-imports',
      head: { en: 'Unused imports are reported', uk: 'Невикористані імпорти позначаються' },
      body: {
        en: 'The compiler flags entries in a standalone imports array that the template never uses. Small, and it stops the array from silently growing into a list of things nobody dares delete.',
        uk: 'Компілятор позначає елементи масиву imports у standalone-компоненті, яких шаблон не використовує. Дрібниця - але вона не дає масиву тихо розростатися в список того, що ніхто не наважується видалити.',
      },
    },
    {
      id: 'v19-linked-signal',
      head: { en: 'linkedSignal', uk: 'linkedSignal' },
      body: {
        en: 'Writable state that resets when its source changes: a selection that clears when the list reloads, a page number that returns to one on a new search. Before it, this needed an effect writing into a signal - the pattern the docs tell you to avoid.',
        uk: 'Записуваний стан, що скидається при зміні джерела: вибір, який очищується після перезавантаження списку, номер сторінки, що повертається до першої при новому пошуку. До нього це вимагало ефекту, який пише в сигнал, - саме того патерну, якого документація радить уникати.',
      },
      code: 'readonly page = linkedSignal({\n  source: () => ({ term: this.term(), category: this.category() }),\n  computation: () => 1,     // any new result set puts us back on page 1\n});',
    },
    {
      id: 'v19-resource',
      head: { en: 'resource() and rxResource()', uk: 'resource() і rxResource()' },
      body: {
        en: 'An async load expressed as a signal: it tracks a request signal, aborts the call in flight when that changes, and exposes value, status, error and isLoading rather than leaving you to model loading by hand.',
        uk: 'Асинхронне завантаження, виражене як сигнал: він стежить за сигналом запиту, перериває виклик у польоті, коли той змінюється, і надає value, status, error та isLoading замість того, щоб ти моделював завантаження вручну.',
      },
      code: 'readonly users = resource({\n  request: () => ({ sort: this.sort() }),\n  loader: ({ request, abortSignal }) =>\n    fetch(`/api/users?sort=${request.sort}`, { signal: abortSignal })\n      .then((r) => r.json()),\n});\n\nusers.value();   users.isLoading();   users.error();',
    },
    {
      id: 'v19-effect-timing',
      head: { en: 'Effects changed when they run', uk: 'Ефекти змінили момент виконання' },
      body: {
        en: 'Component effects moved to run during change detection rather than after it, and allowSignalWrites was dropped. Effects also stopped being the answer to derived state - linkedSignal and resource took the two cases people were using them for.',
        uk: 'Ефекти компонента почали виконуватися під час change detection, а не після нього, і allowSignalWrites прибрали. Ефекти також перестали бути відповіддю на похідний стан: linkedSignal і resource забрали ті два випадки, заради яких їх використовували.',
      },
    },
    {
      id: 'v19-incremental-hydration',
      head: { en: 'Incremental hydration', uk: 'Інкрементальна гідратація' },
      body: {
        en: 'A @defer block can be server-rendered and then hydrated on interaction or on viewport, so the page arrives complete but downloads the JavaScript for a section only when the reader reaches it. Deferring and hydrating stopped being a choice between two.',
        uk: 'Блок @defer може бути відрендерений на сервері, а потім гідратований при взаємодії чи появі у viewport, тож сторінка приходить повною, але завантажує JavaScript для секції лише тоді, коли читач до неї дістався. Відкладання і гідратація перестали бути вибором з двох.',
      },
      code: 'provideClientHydration(withIncrementalHydration())\n\n@defer (hydrate on viewport) {\n  <app-comments />   <!-- rendered on the server, JS fetched on scroll -->\n}',
    },
    {
      id: 'v19-render-mode',
      head: { en: 'Render mode per route', uk: 'Режим рендерингу для кожного маршруту' },
      body: {
        en: 'A server routes file declares whether each route is prerendered, server-rendered or client-rendered, with parameters for prerendering dynamic paths and control over status and headers. One app can be a static marketing page and a rendered dashboard at once.',
        uk: 'Файл серверних маршрутів оголошує, чи маршрут пререндериться, рендериться на сервері, чи на клієнті, з параметрами для пререндеру динамічних шляхів і контролем над статусом і заголовками. Один застосунок може бути водночас статичною лендинг-сторінкою і рендереним дашбордом.',
      },
      code: 'export const serverRoutes: ServerRoute[] = [\n  { path: "", renderMode: RenderMode.Prerender },\n  { path: "dashboard", renderMode: RenderMode.Server },\n  { path: "**", renderMode: RenderMode.Client },\n];',
    },
    {
      id: 'v19-provide-app-initializer',
      head: { en: 'provideAppInitializer', uk: 'provideAppInitializer' },
      body: {
        en: 'The APP_INITIALIZER multi-provider incantation was replaced by a function that injects what it needs. ENVIRONMENT_INITIALIZER and PLATFORM_INITIALIZER got the same treatment.',
        uk: 'Заклинання з multi-провайдером APP_INITIALIZER замінили функцією, яка інжектить те, що їй потрібно. ENVIRONMENT_INITIALIZER і PLATFORM_INITIALIZER отримали те саме.',
      },
      code: '// before\n{ provide: APP_INITIALIZER, useValue: () => inject(Config).load(), multi: true }\n\n// after\nprovideAppInitializer(() => inject(Config).load())',
    },
    {
      id: 'v19-hmr-styles',
      head: { en: 'Style hot replacement by default', uk: 'Гаряча заміна стилів за замовчуванням' },
      body: {
        en: 'Editing a component stylesheet updates the page without reloading it, so the state you set up to see the style survives the save. Template HMR followed behind a flag.',
        uk: 'Редагування стилів компонента оновлює сторінку без перезавантаження, тож стан, який ти налаштував, щоб побачити стиль, переживає збереження. HMR для шаблонів пішов слідом за прапорцем.',
      },
    },
  ],
};
