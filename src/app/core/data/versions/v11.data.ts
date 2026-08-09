import { VersionEntry } from '../../models/content.model';

export const V11: VersionEntry = {
  id: 'v11',
  label: 'v11',
  year: 2020,
  title: {
    en: 'Fonts inlined, HMR without setup, TSLint on the way out',
    uk: 'Вбудовані шрифти, HMR без налаштувань і TSLint на вихід',
  },
  points: [
    {
      id: 'v11-font-inlining',
      head: { en: 'Automatic font inlining', uk: 'Автоматичне вбудовування шрифтів' },
      body: {
        en: 'Google Fonts and Icons referenced from the index page are downloaded at build time and inlined, so the first paint no longer waits on a round trip to another origin. Nothing to configure - it happens in the production build.',
        uk: 'Google Fonts та Icons, на які посилається index-сторінка, завантажуються під час збірки і вбудовуються, тож перший рендер більше не чекає на запит до іншого домену. Налаштовувати нічого - це відбувається в продакшен-збірці.',
      },
    },
    {
      id: 'v11-hmr',
      head: {
        en: 'Hot module replacement in one flag',
        uk: 'Hot module replacement одним прапорцем',
      },
      body: {
        en: 'ng serve --hmr replaced the multi-step wiring HMR used to need: an environment flag, a bootstrap branch and a module to import. State survives a save again.',
        uk: 'ng serve --hmr замінив багатокрокове налаштування, якого HMR вимагав раніше: прапорець у environment, гілка в bootstrap і окремий модуль. Стан знову переживає збереження файлу.',
      },
      code: 'ng serve --hmr',
    },
    {
      id: 'v11-tslint-deprecated',
      head: { en: 'TSLint deprecated', uk: 'TSLint застарів' },
      body: {
        en: 'Linting moved to ESLint through angular-eslint; TSLint and Codelyzer were deprecated here and removed from the CLI in the releases after. A project that still runs ng lint on TSLint has not been updated since 2020.',
        uk: 'Лінтинг переїхав на ESLint через angular-eslint; TSLint і Codelyzer оголосили застарілими тут, а прибрали з CLI в наступних релізах. Проєкт, у якому ng lint досі працює на TSLint, не оновлювали з 2020 року.',
      },
    },
    {
      id: 'v11-webpack5-opt-in',
      head: { en: 'Webpack 5 behind a flag', uk: 'Webpack 5 за прапорцем' },
      body: {
        en: 'Available for anyone who wanted to try module federation and the persistent disk cache before either became the default.',
        uk: 'Доступний для тих, хто хотів спробувати module federation і постійний кеш на диску до того, як вони стали типовими.',
      },
    },
    {
      id: 'v11-build-logs',
      head: { en: 'Readable build output', uk: 'Читабельний вивід збірки' },
      body: {
        en: 'The CLI stopped printing a wall of webpack noise and started reporting what it built, in what order and how long it took - a change to nothing but the developer experience, and a very visible one.',
        uk: 'CLI перестав друкувати стіну webpack-шуму і почав повідомляти, що він зібрав, у якому порядку і скільки це зайняло, - зміна виключно в досвіді розробника, і дуже помітна.',
      },
    },
    {
      id: 'v11-language-service-ivy',
      head: { en: 'An Ivy-based language service', uk: 'Language service на Ivy' },
      body: {
        en: 'In preview: the editor started reading the same compiled output as the build, so autocomplete and go-to-definition inside templates finally matched what the compiler actually knew.',
        uk: 'У preview: редактор почав читати той самий скомпільований результат, що й збірка, тож автодоповнення і перехід до визначення в шаблонах нарешті збіглися з тим, що насправді знає компілятор.',
      },
    },
    {
      id: 'v11-ie9-ie10-dropped',
      head: { en: 'IE9, IE10 and IE Mobile dropped', uk: 'IE9, IE10 і IE Mobile прибрали' },
      body: {
        en: 'IE11 survived one more year. Each browser removed is a set of polyfills and CSS fallbacks that leaves the bundle with it.',
        uk: 'IE11 протримався ще рік. Кожен прибраний браузер - це набір поліфілів і CSS-запасних варіантів, які йдуть разом із ним.',
      },
    },
    {
      id: 'v11-typescript-40',
      head: { en: 'TypeScript 4.0', uk: 'TypeScript 4.0' },
      body: {
        en: 'Variadic tuple types and labelled tuples arrived, which is what lets a library type a function like pipe() honestly instead of writing twenty overloads.',
        uk: 'Зявилися варіативні кортежі та іменовані елементи кортежів, - саме це дає бібліотеці змогу чесно затипізувати функцію на кшталт pipe() замість двадцяти перевантажень.',
      },
    },
  ],
};
