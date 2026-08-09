import { VersionEntry } from '../../models/content.model';

export const V6: VersionEntry = {
  id: 'v6',
  label: 'v6',
  year: 2018,
  title: {
    en: 'One version line, tree-shakable providers, ng update',
    uk: 'Одна лінія версій, tree-shakable провайдери, ng update',
  },
  points: [
    {
      id: 'v6-synchronized-versions',
      head: { en: 'Every package on one number', uk: 'Усі пакети на одному номері' },
      body: {
        en: 'Core, the CLI and Material all jumped to 6 together. From here a major ships roughly every six months with the whole toolchain in step, which is what makes "we are on 16" a meaningful sentence.',
        uk: 'Core, CLI і Material разом стрибнули на 6. Відтоді мажорна версія виходить приблизно кожні пів року, і весь інструментарій рухається синхронно, - саме тому фраза "ми на 16" узагалі щось означає.',
      },
    },
    {
      id: 'v6-providedin-root',
      head: { en: 'providedIn: root', uk: 'providedIn: root' },
      body: {
        en: 'A service says where it lives instead of being listed in some module. The consequence is not tidiness: a service nobody injects is now unreachable code the bundler is free to drop, which a providers array never allowed.',
        uk: 'Сервіс сам каже, де він живе, замість того щоб бути перерахованим у якомусь модулі. Наслідок тут не в охайності: сервіс, який ніхто не інжектить, стає недосяжним кодом, який бандлер має право викинути, - масив providers такого ніколи не дозволяв.',
      },
      code: '@Injectable({ providedIn: "root" })\nexport class UserService {}\n\n// no providers array, no module to import - and unused, it is dropped',
    },
    {
      id: 'v6-ng-update-add',
      head: { en: 'ng update and ng add', uk: 'ng update і ng add' },
      body: {
        en: 'Schematics that change code, not just the lockfile. ng update runs the migrations a major needs against your source, and ng add installs a library and wires it in - which is why upgrading Angular is a command rather than a weekend.',
        uk: 'Схематики, які змінюють код, а не лише lock-файл. ng update виконує міграції, потрібні мажорній версії, прямо у твоєму коді, а ng add встановлює бібліотеку і підключає її, - через це оновлення Angular є командою, а не вихідними.',
      },
      code: 'ng update @angular/core @angular/cli   # rewrites your code, not just deps\nng add @angular/material               # installs and configures in one step',
    },
    {
      id: 'v6-angular-json',
      head: { en: 'angular.json replaced the CLI config', uk: 'angular.json замінив конфіг CLI' },
      body: {
        en: '.angular-cli.json became angular.json, restructured around projects, targets and configurations. That shape is what makes multiple apps and libraries in one workspace, and per-environment builds, ordinary.',
        uk: '.angular-cli.json став angular.json, перебудованим навколо projects, targets і configurations. Саме ця структура робить звичайною справою кілька застосунків і бібліотек в одному воркспейсі та збірки під різні середовища.',
      },
    },
    {
      id: 'v6-elements',
      head: { en: 'Angular Elements', uk: 'Angular Elements' },
      body: {
        en: 'createCustomElement wraps a component as a standard custom element, so an Angular widget can be dropped into a page that knows nothing about Angular - the usual way of putting new code into an old app.',
        uk: 'createCustomElement загортає компонент у стандартний custom element, тож віджет на Angular можна вставити в сторінку, яка про Angular нічого не знає, - звичний спосіб додати новий код у старий застосунок.',
      },
      code: 'const element = createCustomElement(RatingComponent, { injector });\ncustomElements.define("app-rating", element);\n\n// and now, in any page at all:\n// <app-rating value="4"></app-rating>',
    },
    {
      id: 'v6-rxjs-6',
      head: { en: 'RxJS 6 and pipeable operators', uk: 'RxJS 6 і pipeable-оператори' },
      body: {
        en: 'Operators moved out of the Observable prototype and into pipe(), so importing one no longer patched a shared object and the bundler could finally drop the ones you never called.',
        uk: "Оператори переїхали з прототипу Observable у pipe(), тож імпорт одного з них перестав патчити спільний об'єкт, а бандлер нарешті зміг викидати ті, які ти ніколи не викликав.",
      },
      code: '// before: the import patched Observable.prototype for the whole app\nimport "rxjs/add/operator/map";\nsource.map(fn).filter(pred);\n\n// after: ordinary functions, tree-shakable\nsource.pipe(map(fn), filter(pred));',
    },
    {
      id: 'v6-cdk-libraries',
      head: { en: 'The CDK as a library of its own', uk: 'CDK як окрема бібліотека' },
      body: {
        en: 'The behaviour under Material - overlays, portals, a11y, layout - was published separately, so you could build your own design system on the hard parts without adopting Material Design.',
        uk: 'Поведінка під Material - overlay, portal, a11y, layout - вийшла окремо, тож можна було будувати власну дизайн-систему на складних частинах, не приймаючи Material Design.',
      },
    },
    {
      id: 'v6-ivy-announced',
      head: { en: 'Ivy was announced', uk: 'Оголосили Ivy' },
      body: {
        en: 'The next renderer was described publicly here, a release before it could be tried and three before it shipped. Everything from v9 onwards - smaller bundles, better errors, and eventually signals - depends on it.',
        uk: 'Наступний рендерер публічно описали саме тут - за реліз до того, як його можна було спробувати, і за три до випуску. Усе, що почалося з v9, - менші бандли, кращі помилки і зрештою сигнали - спирається на нього.',
      },
    },
  ],
};
