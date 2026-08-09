import { VersionEntry } from '../../models/content.model';

export const V13: VersionEntry = {
  id: 'v13',
  label: 'v13',
  year: 2021,
  title: {
    en: 'View Engine removed, and IE11 with it',
    uk: 'View Engine прибрано, а разом із ним і IE11',
  },
  points: [
    {
      id: 'v13-view-engine-removed',
      head: { en: 'One renderer, and no more ngcc', uk: 'Один рендерер і кінець ngcc' },
      body: {
        en: 'With View Engine gone, libraries publish Ivy output directly, so ngcc - the step that translated every View Engine library on install - could be dropped. Installs and cold builds got noticeably shorter.',
        uk: 'Після зникнення View Engine бібліотеки публікують Ivy-збірку напряму, тож ngcc - крок, який перекладав кожну View Engine-бібліотеку під час встановлення - вдалося прибрати. Встановлення і холодні збірки помітно скоротилися.',
      },
    },
    {
      id: 'v13-dynamic-components',
      head: { en: 'Dynamic components without a factory', uk: 'Динамічні компоненти без фабрики' },
      body: {
        en: 'ViewContainerRef.createComponent takes the component class directly. ComponentFactoryResolver, and the entryComponents list that existed to feed it, both stopped being necessary.',
        uk: 'ViewContainerRef.createComponent приймає клас компонента напряму. І ComponentFactoryResolver, і список entryComponents, який існував заради нього, стали непотрібними.',
      },
      code: '// before\nconst factory = resolver.resolveComponentFactory(DialogComponent);\ncontainer.createComponent(factory);\n\n// after\ncontainer.createComponent(DialogComponent);',
    },
    {
      id: 'v13-persistent-cache',
      head: { en: 'Persistent build cache', uk: 'Постійний кеш збірки' },
      body: {
        en: 'On by default: build output is kept on disk between runs, so the second build of the day is not the first one over again. It is also why a confusing build sometimes clears up after deleting .angular/cache.',
        uk: 'Увімкнено за замовчуванням: результати збірки зберігаються на диску між запусками, тож друга збірка за день - це не перша заново. Через це ж заплутана збірка іноді "лікується" видаленням .angular/cache.',
      },
    },
    {
      id: 'v13-ie11-dropped',
      head: { en: 'IE11 support removed', uk: 'Підтримку IE11 прибрано' },
      body: {
        en: 'The polyfills, the differential loading and the CSS fallbacks that existed only for it went with it - a straight cut to what every user downloads.',
        uk: 'Разом із ним пішли поліфіли, диференційоване завантаження і CSS-запасні варіанти, що існували лише заради нього, - пряме скорочення того, що завантажує кожен користувач.',
      },
    },
    {
      id: 'v13-testbed-teardown',
      head: { en: 'TestBed tears itself down', uk: 'TestBed прибирає за собою' },
      body: {
        en: 'The testing module now destroys its fixtures and clears the DOM after every test by default. Suites got faster and, more importantly, stopped passing because of state one test left behind for the next.',
        uk: 'Тестовий модуль тепер за замовчуванням знищує свої fixture і чистить DOM після кожного тесту. Набори стали швидшими і, що важливіше, перестали проходити завдяки стану, який один тест лишав наступному.',
      },
    },
    {
      id: 'v13-rxjs-7',
      head: { en: 'RxJS 7 for new projects', uk: 'RxJS 7 для нових проєктів' },
      body: {
        en: 'Smaller, faster, and stricter about types - and with toPromise() deprecated in favour of firstValueFrom and lastValueFrom, which is the change most codebases actually had to make.',
        uk: 'Менший, швидший і суворіший до типів - а ще з застарілим toPromise() на користь firstValueFrom і lastValueFrom, і саме цю зміну більшості кодових баз довелося зробити насправді.',
      },
      code: '// deprecated: resolves on completion, or undefined if it never emits\nawait source.toPromise();\n\n// explicit about which value you want, and rejects when there is none\nawait firstValueFrom(source);',
    },
    {
      id: 'v13-esbuild-css',
      head: { en: 'esbuild for styles and scripts', uk: 'esbuild для стилів і скриптів' },
      body: {
        en: 'CSS minification and modern JavaScript output moved to esbuild inside the webpack build. The first appearance of the tool that would replace the whole pipeline four releases later.',
        uk: 'Мініфікація CSS і вивід сучасного JavaScript переїхали на esbuild усередині webpack-збірки. Перша поява інструмента, який через чотири релізи замінить увесь конвеєр.',
      },
    },
    {
      id: 'v13-inline-critical-css',
      head: {
        en: 'Critical CSS inlined by default',
        uk: 'Критичний CSS вбудовано за замовчуванням',
      },
      body: {
        en: 'The styles needed for the first paint are inlined into the HTML and the rest loads asynchronously, so a stylesheet stops being a render-blocking request.',
        uk: 'Стилі, потрібні для першого рендеру, вбудовуються в HTML, а решта завантажується асинхронно, тож таблиця стилів перестає бути запитом, що блокує рендер.',
      },
    },
  ],
};
