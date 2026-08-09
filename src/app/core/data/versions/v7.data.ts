import { VersionEntry } from '../../models/content.model';

export const V7: VersionEntry = {
  id: 'v7',
  label: 'v7',
  year: 2018,
  title: {
    en: 'Virtual scrolling, drag and drop, and budgets that fail the build',
    uk: 'Віртуальний скрол, drag and drop і бюджети, що ламають збірку',
  },
  points: [
    {
      id: 'v7-virtual-scroll',
      head: { en: 'CDK virtual scrolling', uk: 'Віртуальний скрол у CDK' },
      body: {
        en: 'The viewport renders only the rows on screen and recycles their DOM as you scroll. It is the difference between a ten-thousand-row list and a frozen tab, and it arrived as a directive rather than a library to choose.',
        uk: 'Viewport рендерить лише ті рядки, що на екрані, і перевикористовує їхній DOM під час прокрутки. Це різниця між списком на десять тисяч рядків і замерзлою вкладкою, - і воно прийшло як директива, а не як ще одна бібліотека на вибір.',
      },
      code: '<cdk-virtual-scroll-viewport itemSize="48" class="list">\n  <div *cdkVirtualFor="let row of rows">{{ row.name }}</div>\n</cdk-virtual-scroll-viewport>\n\n<!-- 10 000 rows in, about 20 elements in the DOM -->',
    },
    {
      id: 'v7-drag-drop',
      head: { en: 'CDK drag and drop', uk: 'Drag and drop у CDK' },
      body: {
        en: 'cdkDrag and cdkDropList, with sorting, transfer between lists and the placeholder animations already handled. What is left to you is what happens to the data when an item lands.',
        uk: 'cdkDrag і cdkDropList - із сортуванням, перенесенням між списками й анімаціями плейсхолдера з коробки. Тобі лишається тільки те, що станеться з даними, коли елемент опуститься.',
      },
      code: '<div cdkDropList (cdkDropListDropped)="drop($event)">\n  @for (task of tasks(); track task.id) {\n    <div cdkDrag>{{ task.title }}</div>\n  }\n</div>',
    },
    {
      id: 'v7-budgets',
      head: { en: 'Bundle budgets', uk: 'Бюджети розміру бандла' },
      body: {
        en: 'New projects were generated with size budgets in the build config: a warning as the bundle grows and a failed build past the ceiling. Size regressions started surfacing in CI instead of in a Lighthouse run months later.',
        uk: 'Нові проєкти почали генеруватися з бюджетами розміру в конфігурації збірки: попередження, коли бандл росте, і провалена збірка після стелі. Регресії розміру почали спливати в CI, а не в запуску Lighthouse через кілька місяців.',
      },
      code: '"budgets": [\n  { "type": "initial", "maximumWarning": "500kb", "maximumError": "1mb" }\n]',
    },
    {
      id: 'v7-cli-prompts',
      head: { en: 'The CLI started asking', uk: 'CLI почав питати' },
      body: {
        en: 'ng new and ng add prompt for the choices they used to assume - routing, stylesheet language - and a schematic of your own can declare prompts the same way.',
        uk: 'ng new і ng add почали питати про те, що раніше вгадували, - роутинг, мову стилів, - і власна схематика може оголошувати підказки так само.',
      },
    },
    {
      id: 'v7-reflect-metadata',
      head: { en: 'reflect-metadata left production', uk: 'reflect-metadata покинув продакшен' },
      body: {
        en: 'The polyfill is only needed by the JIT compiler, so the CLI stopped including it in production builds - a small, free cut to what every user downloads.',
        uk: 'Цей поліфіл потрібен лише JIT-компілятору, тож CLI перестав додавати його у продакшен-збірки, - невелике й безкоштовне скорочення того, що завантажує кожен користувач.',
      },
    },
    {
      id: 'v7-selector-warnings',
      head: {
        en: 'Warnings on native element selectors',
        uk: 'Попередження про нативні селектори',
      },
      body: {
        en: 'The compiler started warning when a component or directive selector matched a plain HTML element, because that quietly changes how every one of those elements on the page behaves.',
        uk: 'Компілятор почав попереджати, коли селектор компонента чи директиви збігався зі звичайним HTML-елементом, бо це тихо змінює поведінку кожного такого елемента на сторінці.',
      },
    },
    {
      id: 'v7-dependency-updates',
      head: { en: 'TypeScript 3.1, RxJS 6.3, Node 10', uk: 'TypeScript 3.1, RxJS 6.3, Node 10' },
      body: {
        en: 'An unglamorous but characteristic release: the interesting work was in the CDK and the CLI, and core mostly kept the toolchain current. Not every major needs a headline.',
        uk: 'Непоказний, але характерний реліз: цікаве відбувалося в CDK і CLI, а core здебільшого підтримував інструментарій свіжим. Не кожна мажорна версія потребує гучного заголовка.',
      },
    },
  ],
};
