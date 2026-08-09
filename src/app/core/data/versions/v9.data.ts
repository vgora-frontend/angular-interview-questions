import { VersionEntry } from '../../models/content.model';

export const V9: VersionEntry = {
  id: 'v9',
  label: 'v9',
  year: 2020,
  title: {
    en: 'Ivy by default',
    uk: 'Ivy за замовчуванням',
  },
  points: [
    {
      id: 'v9-ivy-default',
      head: { en: 'Ivy became the renderer', uk: 'Ivy став рендерером' },
      body: {
        en: 'A template now compiles into instructions stored on the component itself rather than into a central factory, so framework code a template never uses can be tree-shaken away. Smaller bundles, faster rebuilds, and stack traces that point at your template instead of at generated code.',
        uk: 'Шаблон тепер компілюється в інструкції, що зберігаються на самому компоненті, а не в центральну фабрику, тож код фреймворку, якого шаблон не використовує, можна витрусити при збірці. Менші бандли, швидші перезбірки і стектрейси, які вказують на твій шаблон, а не на згенерований код.',
      },
    },
    {
      id: 'v9-aot-everywhere',
      head: { en: 'AOT in development too', uk: 'AOT і в розробці' },
      body: {
        en: 'Ivy compiled fast enough that ng serve could compile ahead of time as well. Template errors moved to where you write them, and the production build stopped being the first place a template was checked properly.',
        uk: 'Ivy компілював достатньо швидко, щоб ng serve теж міг робити це заздалегідь. Помилки шаблонів переїхали туди, де їх пишуть, і продакшен-збірка перестала бути першим місцем, де шаблон перевіряли по-справжньому.',
      },
    },
    {
      id: 'v9-strict-templates',
      head: { en: 'strictTemplates', uk: 'strictTemplates' },
      body: {
        en: 'Real type checking inside templates: an input bound to the wrong type, a wrong member on a nullable value, a wrong $event - all compile errors, like anywhere else in the codebase.',
        uk: "Справжня перевірка типів усередині шаблонів: input, прив'язаний до неправильного типу, звернення до неіснуючого поля можливого null, хибний $event - усе це помилки компіляції, як і будь-де в коді.",
      },
      code: '// tsconfig.json\n"angularCompilerOptions": {\n  "strictTemplates": true\n}\n\n<!-- now an error at build time, not a blank line in the browser -->\n<user-card [user]="maybeUser"></user-card>',
    },
    {
      id: 'v9-test-harnesses',
      head: { en: 'Component test harnesses', uk: 'Test harness для компонентів' },
      body: {
        en: 'The CDK gave components a testing API: ask the harness for a button and click it, instead of querying a class name the library is free to rename in the next patch.',
        uk: 'CDK дав компонентам API для тестів: попроси в harness кнопку і клацни її замість пошуку за іменем класу, яке бібліотека має право перейменувати в наступному патчі.',
      },
      code: 'const button = await loader.getHarness(MatButtonHarness.with({ text: "Save" }));\nawait button.click();\n\n// no fixture.debugElement.query(By.css(".mat-mdc-button-touch-target"))',
    },
    {
      id: 'v9-providedin-any-platform',
      head: { en: "providedIn: 'any' and 'platform'", uk: "providedIn: 'any' і 'platform'" },
      body: {
        en: 'Two more scopes: any gives every lazy-loaded module its own instance, platform shares one across several Angular apps on the same page. Both exist for cases the root singleton gets wrong.',
        uk: 'Ще дві області: any дає кожному лінивому модулю власний екземпляр, а platform ділить один між кількома Angular-застосунками на одній сторінці. Обидві існують для випадків, де кореневий singleton помиляється.',
      },
      code: '@Injectable({ providedIn: "platform" })   // shared across apps on the page\nexport class BusService {}',
    },
    {
      id: 'v9-debugging-api',
      head: { en: 'Debugging from the console', uk: 'Налагодження з консолі' },
      body: {
        en: 'Ivy exposed a debug API on the global ng object: take an element, get its component, change a field, apply it. It is what makes Angular DevTools possible, and it works in any dev build without a plugin.',
        uk: "Ivy відкрив налагоджувальний API на глобальному об\'єкті ng: береш елемент, отримуєш його компонент, змінюєш поле, застосовуєш. Саме це уможливлює Angular DevTools і працює в будь-якій dev-збірці без розширення.",
      },
      code: '// in the browser console, on any element selected in the inspector\nconst cmp = ng.getComponent($0);\ncmp.title = "Changed";\nng.applyChanges(cmp);',
    },
    {
      id: 'v9-i18n-build-time',
      head: { en: 'i18n moved to build time', uk: 'i18n переїхав у час збірки' },
      body: {
        en: 'Translations are applied to the compiled output rather than during compilation, so a build produces one bundle per locale from a single compile instead of recompiling the whole app for each language.',
        uk: 'Переклади застосовуються до скомпільованого результату, а не під час компіляції, тож збірка робить один бандл на локаль з однієї компіляції замість повторної компіляції всього застосунку для кожної мови.',
      },
    },
    {
      id: 'v9-smaller-bundles',
      head: { en: 'Bundles got smaller by doing nothing', uk: 'Бандли зменшилися самі собою' },
      body: {
        en: 'Because Ivy generates less code and tree-shakes what a template does not touch, most applications shrank on the upgrade alone. Small apps gained the most in percentage terms; large ones gained most in build time.',
        uk: 'Оскільки Ivy генерує менше коду і витрушує те, чого шаблон не торкається, більшість застосунків зменшилися вже від самого оновлення. Малі виграли найбільше у відсотках, великі - у часі збірки.',
      },
    },
  ],
};
