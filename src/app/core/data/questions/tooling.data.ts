import { Question } from '../../models/content.model';

// CLI, build pipeline, compilation and localization.
export const TOOLING_QUESTIONS: Question[] = [
  {
    id: 'q-cli-daily-commands',
    category: 'tooling',
    q: {
      en: 'Which CLI commands cover a normal working day, and what does each generate?',
      uk: 'Які команди CLI покривають звичайний робочий день і що кожна з них генерує?',
    },
    a: {
      en: 'serve for the dev server, generate for scaffolding, test and build. generate is the one worth using rather than writing files by hand: the class, template, styles and spec land in the conventional place with the conventional names and the configured selector prefix. Add --dry-run when you are unsure what a schematic will do - it prints the file list without touching anything.',
      uk: 'serve для dev-сервера, generate для генерації, test і build. Саме generate варто використовувати замість написання файлів руками: клас, шаблон, стилі й спек лягають у звичне місце зі звичними іменами і налаштованим префіксом селектора. Додавай --dry-run, коли не впевнений, що зробить схематик: він виведе список файлів, нічого не змінюючи.',
    },
    code: 'ng serve\nng generate component features/checkout/cart\nng generate service core/orders\nng generate directive shared/autofocus --dry-run   # prints, changes nothing\nng test\nng build',
  },
  {
    id: 'q-angular-json',
    category: 'tooling',
    q: {
      en: 'What is configured in angular.json, and what is a build configuration?',
      uk: 'Що налаштовується в angular.json і що таке конфігурація збірки?',
    },
    a: {
      en: "It describes the workspace: the projects in it, the builder each target uses, and that builder's options. A configuration is a named set of overrides on top of those options - production and development exist by default, and you add your own for a staging or QA build. Whatever the configuration is called, the important part is which options it changes, since that is what decides whether you are measuring a realistic bundle.",
      uk: 'Він описує робочий простір: проєкти в ньому, білдер, який використовує кожна ціль, і опції цього білдера. Конфігурація - це іменований набір перевизначень поверх цих опцій: production і development існують за замовчуванням, а власну ти додаєш для staging чи QA. Як би конфігурація не звалася, важливо, які опції вона змінює, - саме це визначає, чи міряєш ти реалістичний бандл.',
    },
    code: '// angular.json\n"configurations": {\n  "production": {\n    "budgets": [{ "type": "initial", "maximumError": "600kb" }],\n    "outputHashing": "all"\n  },\n  "staging": {\n    "sourceMap": true,\n    "fileReplacements": [{ "replace": "src/env.ts", "with": "src/env.staging.ts" }]\n  }\n}\n\n# ng build --configuration staging',
  },
  {
    id: 'q-build-environments',
    category: 'tooling',
    q: {
      en: 'How do you feed environment-specific values into a build?',
      uk: 'Як передати у збірку значення, специфічні для середовища?',
    },
    a: {
      en: 'Either fileReplacements, swapping an environment file per configuration, or - better for anything that changes without a rebuild - fetch the configuration at startup and provide it through a token. Two rules regardless of method: nothing secret goes in, because every value ends up in a file the user can read, and the values must be injected rather than imported, or they cannot be replaced in a test.',
      uk: 'Або fileReplacements з підміною environment-файлу під конфігурацію, або - і це краще для всього, що змінюється без перезбірки - завантаження конфігурації на старті й передача її через токен. Два правила незалежно від способу: нічого секретного туди не потрапляє, бо кожне значення опиниться у файлі, який користувач може прочитати, і значення треба інжектувати, а не імпортувати, інакше їх не підміниш у тесті.',
    },
    code: '// Injected, so a test can replace it\nexport const API_URL = new InjectionToken<string>("API_URL");\nproviders: [{ provide: API_URL, useValue: environment.apiUrl }];\n\n// Never: this ships to the browser in readable form\nexport const environment = { stripeSecretKey: "sk_live_..." };',
  },
  {
    id: 'q-esbuild-builder',
    category: 'tooling',
    q: {
      en: 'What changed when the CLI moved to the esbuild-based application builder?',
      uk: 'Що змінилося, коли CLI перейшов на application builder на базі esbuild?',
    },
    a: {
      en: 'Builds and rebuilds got several times faster, and the dev server moved to Vite for its serving layer, so a change is reflected almost immediately. The application builder also unified browser and server output into one target, which is what makes SSR and prerendering configuration a matter of one builder rather than two. Webpack-specific customisation is the thing that does not carry over - a custom webpack config has no equivalent here.',
      uk: "Збірки й перезбірки стали в кілька разів швидшими, а dev-сервер перейшов на Vite для шару віддачі, тож зміна відображається майже одразу. Application builder до того ж об'єднав браузерний і серверний вивід в одну ціль - саме тому налаштування SSR і попереднього рендерингу тепер справа одного білдера, а не двох. Не переноситься саме кастомізація під webpack: власного webpack-конфігу тут відповідника немає.",
    },
    code: '// angular.json\n"builder": "@angular/build:application",\n"options": {\n  "browser": "src/main.ts",\n  "server": "src/main.server.ts",   // one target covers both\n  "ssr": { "entry": "src/server.ts" }\n}\n\n# A custom webpack config has no equivalent - that was the migration cost.',
  },
  {
    id: 'q-jit-vs-aot',
    category: 'tooling',
    q: {
      en: 'What is the difference between JIT and AOT compilation, and where is each used?',
      uk: 'Яка різниця між компіляцією JIT і AOT і де застосовується кожна?',
    },
    a: {
      en: 'AOT compiles templates at build time and ships the result; JIT ships the compiler and compiles in the browser at startup. AOT is used everywhere now - development included since v9 - because it means a smaller bundle, no compile step before the first render, and template errors caught at build time rather than at runtime. JIT survives only in some test setups and anywhere a template genuinely has to be created at runtime.',
      uk: 'AOT компілює шаблони під час збірки і віддає результат; JIT віддає компілятор і компілює в браузері на старті. Зараз AOT використовується всюди, включно з розробкою починаючи з v9, бо це менший бандл, відсутність кроку компіляції до першого рендерингу і помилки шаблонів, зловлені під час збірки, а не виконання. JIT лишився лише в деяких налаштуваннях тестів і там, де шаблон справді треба створити під час виконання.',
    },
    code: '// AOT: this fails the build\n<p>{{ user.nmae }}</p>\n// error NG9: Property "nmae" does not exist on type "User"\n\n// JIT: the same template compiles, and fails in the browser instead,\n// having shipped the compiler alongside it.',
  },
  {
    id: 'q-aot-advantages',
    category: 'tooling',
    q: {
      en: 'What do you gain from AOT compilation?',
      uk: 'Що дає компіляція AOT?',
    },
    a: {
      en: 'Four things. A faster first render, because there is nothing to compile on arrival. A smaller bundle, because the compiler is not in it. Template errors at build time, which is the difference between a failed pipeline and a blank screen in production. And no need for unsafe-eval in your Content Security Policy, since nothing is compiled at runtime.',
      uk: 'Чотири речі. Швидший перший рендеринг, бо після приїзду нічого компілювати не треба. Менший бандл, бо компілятора в ньому немає. Помилки шаблонів під час збірки - а це різниця між проваленим пайплайном і білим екраном у продакшені. І відсутність потреби в unsafe-eval у Content Security Policy, бо під час виконання нічого не компілюється.',
    },
    code: "# The compiler is not shipped, so this is enough:\n# Content-Security-Policy: script-src 'self'\n\n# And a template mistake stops here, not in front of a user:\nng build --configuration production",
  },
  {
    id: 'q-ivy',
    category: 'tooling',
    q: {
      en: 'What is Ivy, and what did it change compared with View Engine?',
      uk: 'Що таке Ivy і що він змінив порівняно з View Engine?',
    },
    a: {
      en: 'Ivy is the compiler and runtime that replaced View Engine in v9. It compiles each component into instructions on the component itself rather than into a central factory, which makes the output tree-shakable, removes the need for entryComponents and metadata.json files, and lets a component be created without knowing its module. Locality is the underlying idea: a component compiles from its own source, which is also what made standalone components possible.',
      uk: 'Ivy - це компілятор і рантайм, що замінили View Engine у v9. Він компілює кожен компонент в інструкції на самому компоненті, а не в центральну фабрику, і це робить вивід придатним для tree-shaking, прибирає потребу в entryComponents і файлах metadata.json та дозволяє створити компонент, не знаючи його модуля. Основна ідея - локальність: компонент компілюється зі власного джерела, і саме це зробило можливими standalone-компоненти.',
    },
    code: '// Compiled into a static definition on the class itself,\n// rather than into a central module factory.\n//\n// Which is why all of this could go away:\n//   entryComponents, ComponentFactoryResolver, metadata.json\n// and why this works with no module involved:\nthis.container.createComponent(UserCardComponent);',
  },
  {
    id: 'q-tsconfig-strictness',
    category: 'tooling',
    q: {
      en: 'Which TypeScript and Angular compiler options do you turn on in a new project?',
      uk: 'Які опції компілятора TypeScript і Angular ти вмикаєш у новому проєкті?',
    },
    a: {
      en: 'All of the strict family, and on the Angular side strictTemplates, strictInjectionParameters and strictInputAccessModifiers. A new project gets these by default, so the real question is what to do with an old one: turn them on file by file rather than all at once, because the first build of a large codebase produces hundreds of errors and a wholesale fix is unreviewable. Never turn them back off to make a build pass.',
      uk: 'Усю родину strict, а з боку Angular - strictTemplates, strictInjectionParameters і strictInputAccessModifiers. Новий проєкт отримує їх за замовчуванням, тож справжнє питання - що робити зі старим: вмикати файл за файлом, а не все одразу, бо перша збірка великої кодової бази дає сотні помилок, а масове виправлення неможливо перевірити на ревʼю. І ніколи не вимикай їх назад, щоб збірка пройшла.',
    },
    code: '// tsconfig.json\n{\n  "compilerOptions": {\n    "strict": true,\n    "noImplicitOverride": true,\n    "noPropertyAccessFromIndexSignature": true,\n    "noImplicitReturns": true\n  },\n  "angularCompilerOptions": {\n    "strictTemplates": true,\n    "strictInjectionParameters": true\n  }\n}',
  },
  {
    id: 'q-ng-update',
    category: 'tooling',
    q: {
      en: 'How does ng update work, and how do you upgrade an application several versions behind?',
      uk: 'Як працює ng update і як оновити застосунок, що відстав на кілька версій?',
    },
    a: {
      en: 'It bumps the packages and then runs the migration schematics each version ships, which rewrite your code for the breaking changes. Upgrade one major at a time, in order, committing between each: skipping a version skips its migrations, and they are not cumulative. Start from a clean tree so the diff is reviewable, and check the update guide first for the changes no schematic can make for you.',
      uk: 'Він піднімає версії пакетів, а потім запускає схематики міграції, які постачає кожна версія і які переписують твій код під ламкі зміни. Оновлюйся по одному мажору, за порядком, комітячи між кожним: пропущена версія означає пропущені міграції, а вони не накопичуються. Починай з чистого дерева, щоб diff можна було прочитати, і спершу подивись гайд оновлення на предмет змін, які жоден схематик не зробить за тебе.',
    },
    code: 'git status                       # clean, or the diff is unreadable\nng update @angular/core@20 @angular/cli@20 && npm test && git commit\nng update @angular/core@21 @angular/cli@21 && npm test && git commit\nng update @angular/core@22 @angular/cli@22 && npm test && git commit\n\n# https://angular.dev/update-guide for what the schematics cannot do',
  },
  {
    id: 'q-schematics',
    category: 'tooling',
    q: {
      en: 'What is a schematic, and what is a rule inside one?',
      uk: 'Що таке схематик і що таке правило всередині нього?',
    },
    a: {
      en: 'A schematic is a code generator or transformer the CLI runs. A rule is a function from a tree to a tree - the tree being a virtual filesystem, so nothing touches disk until every rule has succeeded. That staging is the point: a schematic either applies completely or leaves the project untouched, which is what makes it safe to run a migration over a whole repository.',
      uk: 'Схематик - це генератор або перетворювач коду, який запускає CLI. Правило - це функція з дерева в дерево, де дерево є віртуальною файловою системою, тож до диска нічого не торкається, доки всі правила не завершилися успішно. Саме в цьому проміжному стані й суть: схематик або застосовується повністю, або лишає проєкт недоторканим, - і саме тому міграцію безпечно запускати по всьому репозиторію.',
    },
    code: 'export function addFeature(options: Options): Rule {\n  return chain([\n    mergeWith(apply(url("./files"), [applyTemplates(options), move(options.path)])),\n    (tree: Tree) => {\n      // still virtual: nothing is on disk until every rule succeeds\n      tree.overwrite("src/app/app.routes.ts", withNewRoute(tree));\n      return tree;\n    },\n  ]);\n}',
  },
  {
    id: 'q-migration-schematics',
    category: 'tooling',
    q: {
      en: 'How do the built-in migration schematics rewrite your code during an upgrade?',
      uk: 'Як вбудовані схематики міграції переписують твій код під час оновлення?',
    },
    a: {
      en: 'They parse the source into an AST, find the pattern - a decorator, a constructor parameter, a structural directive - and emit the replacement, preserving the rest of the file. Some run automatically with ng update, others you invoke by name when you are ready: control flow, inject, signal inputs, standalone. Review the diff every time. The mechanical part is reliable; whether the result reads well is still a judgement call.',
      uk: 'Вони розбирають код у AST, знаходять патерн - декоратор, параметр конструктора, структурну директиву - і генерують заміну, зберігаючи решту файлу. Деякі виконуються автоматично разом з ng update, інші ти запускаєш за іменем, коли готовий: control flow, inject, сигнальні інпути, standalone. Читай diff щоразу. Механічна частина надійна, а от чи добре читається результат - усе ще питання рішення.',
    },
    code: 'ng generate @angular/core:control-flow          # *ngIf -> @if\nng generate @angular/core:inject                # constructor params -> inject()\nng generate @angular/core:signal-input-migration\nng generate @angular/core:signal-queries-migration\nng generate @angular/core:standalone\n\n# Then read the diff. Always.',
  },
  {
    id: 'q-cli-builders',
    category: 'tooling',
    q: {
      en: 'What is a CLI builder, and when would you write your own?',
      uk: 'Що таке білдер CLI і коли варто писати власний?',
    },
    a: {
      en: 'A builder is what a target actually runs - build, serve and test are all builders with options from angular.json. Writing one is rarely the answer: an npm script covers most needs, and a builder only pays off when the step has to be a first-class target, with its own configurations, and reachable through ng run across a workspace of many projects. Otherwise you have added indirection for nothing.',
      uk: 'Білдер - це те, що насправді виконує ціль: build, serve і test усі є білдерами з опціями з angular.json. Писати власний рідко є відповіддю: npm-скрипт покриває більшість потреб, а білдер виправдовує себе лише коли крок має бути повноцінною ціллю з власними конфігураціями і доступною через ng run у робочому просторі з багатьма проєктами. Інакше ти додав рівень непрямості ні за що.',
    },
    code: 'export default createBuilder(async (options: Options, context) => {\n  context.logger.info(`Checking ${options.path}`);\n  return { success: true };\n});\n\n// angular.json\n"targets": { "validate": { "builder": "./tools:validate", "options": { "path": "src" } } }\n\n# ng run my-app:validate',
  },
  {
    id: 'q-angular-language-service',
    category: 'tooling',
    q: {
      en: 'What does the Angular Language Service do for you in an editor?',
      uk: 'Що дає Angular Language Service у редакторі?',
    },
    a: {
      en: 'It makes templates first-class in the editor: completion for properties, pipes and component selectors, type errors underlined as you type, go-to-definition from a binding to the class member, and rename that updates both sides. Without it a template is just text, so a renamed property is only discovered by the compiler. It ships with the framework, and the editor extension is what turns it on.',
      uk: "Він робить шаблони повноправними в редакторі: автодоповнення властивостей, пайпів і селекторів компонентів, підкреслені помилки типів під час набору, переходи від прив'язки до члена класу і перейменування, яке оновлює обидві сторони. Без нього шаблон - просто текст, тож перейменовану властивість виявить лише компілятор. Він постачається з фреймворком, а вмикає його розширення редактора.",
    },
    code: '// The language service knows this template is checked against this class,\n// so renaming "name" here updates the template too:\nexport class UserCardComponent {\n  readonly user = input.required<User>();\n}\n\n<p>{{ user().name }}</p>   <!-- completion, type errors, go to definition -->',
  },
  {
    id: 'q-angular-devtools',
    category: 'tooling',
    q: {
      en: 'What can you inspect with Angular DevTools?',
      uk: 'Що можна дослідити за допомогою Angular DevTools?',
    },
    a: {
      en: "The component tree with each component's inputs, outputs and state, editable live; the injector tree, showing which injector actually resolved a dependency; the signal graph and its dependencies; and the profiler, which records change detection cycles and names what triggered each one. That last part is usually the whole answer to a performance question, because it tells you the cause rather than the cost.",
      uk: "Дерево компонентів з інпутами, аутпутами і станом кожного, які можна редагувати наживо; дерево інжекторів, що показує, який інжектор насправді розв'язав залежність; граф сигналів з його залежностями; і профайлер, який записує цикли change detection і називає те, що запустило кожен з них. Остання частина зазвичай і є повною відповіддю на питання про продуктивність, бо називає причину, а не вартість.",
    },
    code: '// The profiler answers "what triggered this cycle", which is the useful half.\n//\n// Typical findings:\n//   a setTimeout in a third-party library causing a full-tree check\n//   an @Input receiving a new object literal on every pass\n//   a component checked hundreds of times per interaction',
  },
  {
    id: 'q-monorepo-tooling',
    category: 'tooling',
    q: {
      en: 'When does an Angular workspace need monorepo tooling on top of the CLI?',
      uk: 'Коли робочому простору Angular потрібен інструментарій монорепозиторію поверх CLI?',
    },
    a: {
      en: 'When the CLI workspace stops being enough: many applications and libraries where you need to know what a change affects, so CI builds and tests only that, plus computation caching so the same work is not repeated. Nx is the usual answer, and it adds dependency graph analysis and enforceable module boundaries. For one application with a couple of libraries it is overhead - the CLI workspace already handles that.',
      uk: "Коли робочого простору CLI перестає бути досить: багато застосунків і бібліотек, де треба знати, що зачепила зміна, щоб CI збирав і тестував лише це, плюс кешування обчислень, щоб та сама робота не повторювалася. Звична відповідь - Nx, який додає аналіз графу залежностей і межі модулів, які можна нав'язати. Для одного застосунку з парою бібліотек це надмір: робочий простір CLI з цим і так справляється.",
    },
    code: '# What the CLI workspace already does\nng generate library ui-kit\nng build ui-kit\n\n# What it does not: only build what a change affected\nnpx nx affected --target=test --base=main',
  },
  {
    id: 'q-i18n-approach',
    category: 'tooling',
    q: {
      en: "How does Angular's built-in i18n work, and how does it differ from a runtime library?",
      uk: 'Як працює вбудована i18n в Angular і чим вона відрізняється від рантайм-бібліотеки?',
    },
    a: {
      en: 'You mark text in templates with i18n, extract it into a translation file, and the build produces one bundle per locale with the strings already substituted. Nothing is translated at runtime, so there is no lookup cost and no missing-key flash - at the cost of a build and a deploy per language, and no way to switch language without a page load. A runtime library like Transloco trades that around: one bundle, instant switching, a lookup per string.',
      uk: 'Ти позначаєш текст у шаблонах через i18n, витягуєш його у файл перекладу, і збірка дає по бандлу на локаль з уже підставленими рядками. Під час виконання не перекладається нічого, тож немає ні вартості пошуку, ні блимання відсутнього ключа - ціною збірки й деплою на кожну мову і неможливості змінити мову без перезавантаження сторінки. Рантайм-бібліотека на кшталт Transloco обмінює це навпаки: один бандл, миттєве переключення, пошук на кожен рядок.',
    },
    code: '<h1 i18n="@@home.title">Angular interview questions</h1>\n\nng extract-i18n --output-path src/locale\n# -> messages.xlf, translated into messages.uk.xlf\n\n# One bundle per locale, strings already baked in:\nng build --localize',
  },
  {
    id: 'q-i18n-attribute',
    category: 'tooling',
    q: {
      en: 'What does the i18n attribute mark, and how do you translate an attribute rather than an element?',
      uk: 'Що позначає атрибут i18n і як перекласти атрибут, а не елемент?',
    },
    a: {
      en: 'i18n on an element marks its text content for extraction, and takes an optional meaning, description and custom id. For an attribute you use i18n- followed by the attribute name, which is how a placeholder, a title or an aria-label gets translated. Text with no element of its own goes in an ng-container, since the marker has to sit on something.',
      uk: "i18n на елементі позначає його текстовий вміст для витягування і приймає необов'язкові значення, опис і власний ідентифікатор. Для атрибута використовується i18n- з іменем атрибута - саме так перекладаються placeholder, title чи aria-label. Текст без власного елемента загортається в ng-container, бо маркер має на чомусь стояти.",
    },
    code: '<h1 i18n="page heading|The title of the home page">Questions</h1>\n\n<input i18n-placeholder placeholder="Search questions..." />\n<button i18n-aria-label aria-label="Close dialog">x</button>\n\n<!-- Text with no element of its own -->\n<ng-container i18n>Signed in as</ng-container> {{ user().name }}',
  },
  {
    id: 'q-i18n-custom-id',
    category: 'tooling',
    q: {
      en: 'Why would you set a custom translation id, and what happens if two are the same?',
      uk: 'Навіщо задавати власний ідентифікатор перекладу і що буде, якщо два збігатимуться?',
    },
    a: {
      en: 'Because the generated id is a hash of the source text and its meaning, so fixing a typo in English silently invalidates every translation of that string. A custom id survives an edit to the source. Two identical ids collide: the first translation wins and is used for both, so the second string is quietly translated wrong - which is why an id should describe the place, not the words.',
      uk: 'Бо згенерований ідентифікатор є хешем від початкового тексту і його значення, тож виправлення друкарської помилки в англійському тексті тихо інвалідує всі переклади цього рядка. Власний ідентифікатор переживає редагування джерела. Два однакові ідентифікатори конфліктують: перемагає перший переклад і використовується для обох, тож другий рядок тихо перекладається неправильно, - саме тому ідентифікатор має описувати місце, а не слова.',
    },
    code: '<!-- The id survives a change to the English text -->\n<h1 i18n="@@home.hero.title">Sharp answers</h1>\n\n<!-- A collision: both render the first translation -->\n<button i18n="@@action">Save</button>\n<button i18n="@@action">Cancel</button>\n\n<!-- Name the place, not the words: @@checkout.submit, not @@save -->',
  },
  {
    id: 'q-icu-expressions',
    category: 'tooling',
    q: {
      en: 'What are the plural and select ICU expressions for?',
      uk: 'Для чого потрібні ICU-вирази plural і select?',
    },
    a: {
      en: 'plural picks a form by a number, select by an arbitrary value such as a gender or a status. They exist because the alternative - concatenating fragments - is untranslatable: word order, agreement and the number of plural forms all differ by language, so a sentence assembled from pieces in English cannot be reassembled correctly elsewhere. The whole sentence has to be the translatable unit.',
      uk: 'plural обирає форму за числом, select - за довільним значенням, як-от рід чи статус. Вони існують тому, що альтернатива - конкатенація фрагментів - неперекладна: порядок слів, узгодження і кількість форм множини різні в різних мовах, тож речення, зібране з частин англійською, не збереться правильно деінде. Одиницею перекладу має бути ціле речення.',
    },
    code: '<p i18n>\n  {count, plural, =0 {No questions} =1 {One question} other {{{count}} questions}}\n</p>\n\n<p i18n>{role, select, admin {Full access} viewer {Read only} other {No access}}</p>\n\n<!-- Untranslatable, because word order and agreement differ per language: -->\n<p>{{ count }} <span i18n>questions</span></p>',
  },
  {
    id: 'q-plural-categories',
    category: 'tooling',
    q: {
      en: 'Which plural categories exist, and why does the set differ between languages?',
      uk: 'Які існують категорії множини і чому їх набір відрізняється між мовами?',
    },
    a: {
      en: 'zero, one, two, few, many and other, from CLDR - and a language uses only the subset it needs. English needs one and other; Ukrainian needs one, few and many, because the form changes at 1, at 2 to 4, and at 5 and above. So a translation file cannot simply mirror the English forms: hard-coding a singular and a plural is a bug in every language with three, which is why Intl.PluralRules should choose the key.',
      uk: 'zero, one, two, few, many і other - з CLDR, і кожна мова використовує лише потрібну їй підмножину. Англійській потрібні one і other; українській - one, few і many, бо форма змінюється на 1, на 2-4 і на 5 та більше. Тож файл перекладу не може просто дзеркалити англійські форми: зашита однина з множиною є багом у кожній мові з трьома формами, і саме тому ключ має обирати Intl.PluralRules.',
    },
    code: '// Let the locale decide which key to use\nconst form = new Intl.PluralRules("uk").select(count);\n// 1 -> "one", 3 -> "few", 7 -> "many"\n\n// So both locale files define every form the language needs:\n// en.json  { "one": "{{count}} question", "other": "{{count}} questions" }\n// uk.json  { "one": "...", "few": "...", "many": "..." }',
  },
  {
    id: 'q-locale-data-and-direction',
    category: 'tooling',
    q: {
      en: 'How do you register locale data, and how do you get the writing direction for a locale?',
      uk: 'Як зареєструвати дані локалі і як дізнатися напрямок письма для неї?',
    },
    a: {
      en: 'Import the locale from @angular/common/locales and pass it to registerLocaleData, then provide LOCALE_ID so pipes use it - without that, every date and number stays en-US whatever language the interface is in. For direction, getLocaleDirection returns ltr or rtl, which is what you set on the html element so the whole layout mirrors rather than each component guessing.',
      uk: 'Імпортуй локаль з @angular/common/locales і передай її в registerLocaleData, а потім задай LOCALE_ID, щоб пайпи його використовували: без цього кожна дата й число лишаться en-US, якою б мовою не був інтерфейс. Для напрямку getLocaleDirection повертає ltr або rtl - саме це ставлять на елемент html, щоб уся розкладка дзеркалилася, а не кожен компонент вгадував.',
    },
    code: 'import localeUk from "@angular/common/locales/uk";\nregisterLocaleData(localeUk);\n\nproviders: [{ provide: LOCALE_ID, useValue: "uk" }];\n\n// Direction on <html>, so the layout mirrors as a whole\nthis.doc.documentElement.dir = getLocaleDirection(this.lang());\nthis.doc.documentElement.lang = this.lang();',
  },
  {
    id: 'q-build-multiple-locales',
    category: 'tooling',
    q: {
      en: 'How do you produce and deploy a build per locale?',
      uk: 'Як зібрати і задеплоїти окрему збірку для кожної локалі?',
    },
    a: {
      en: 'Declare the locales and their translation files in angular.json, then build with localize - the CLI emits one directory per locale. Deploy them under a path or a subdomain per language, and set baseHref per locale so links resolve inside the right one. The server then picks a locale from the URL, falling back to Accept-Language, and the choice has to be a real URL so a shared link keeps its language.',
      uk: "Оголоси локалі та їхні файли перекладу в angular.json, а потім збери з localize - CLI віддасть по каталогу на локаль. Деплой їх під окремим шляхом або субдоменом на мову і задай baseHref для кожної локалі, щоб посилання розв'язувалися всередині правильної. Далі сервер обирає локаль з URL, з відкатом на Accept-Language, і цей вибір має бути справжнім URL, щоб надіслане посилання зберігало свою мову.",
    },
    code: '// angular.json\n"i18n": {\n  "sourceLocale": "en",\n  "locales": {\n    "uk": { "translation": "src/locale/messages.uk.xlf", "baseHref": "/uk/" }\n  }\n}\n\nng build --localize\n# dist/my-app/en/  dist/my-app/uk/',
  },
  {
    id: 'q-missing-translations',
    category: 'tooling',
    q: {
      en: 'How do you make a missing translation fail loudly instead of silently?',
      uk: 'Як зробити так, щоб відсутній переклад падав гучно, а не тихо?',
    },
    a: {
      en: 'With the built-in i18n, set i18nMissingTranslation to error so the build fails rather than falling back to the source text - a silent fallback ships an English string into a Ukrainian interface, and nobody notices until a user does. With a runtime library, provide a missing-handler that throws in development and reports in production. Either way the default is the dangerous one, because the default is to look almost right.',
      uk: 'З вбудованою i18n постав i18nMissingTranslation у error, щоб збірка падала, а не відкочувалася до початкового тексту: тихий відкат везе англійський рядок в український інтерфейс, і ніхто не помічає, доки не помітить користувач. З рантайм-бібліотекою дай обробник відсутнього ключа, який кидає помилку в розробці й звітує в продакшені. У будь-якому разі небезпечний саме типовий варіант, бо типово все виглядає майже правильно.',
    },
    code: '// angular.json - the build fails instead of shipping English\n"i18nMissingTranslation": "error"\n\n// Or, with a runtime library:\nexport class StrictMissingHandler implements TranslocoMissingHandler {\n  handle(key: string): string {\n    if (isDevMode()) {\n      throw new Error(`Missing translation: ${key}`);\n    }\n    return key;\n  }\n}',
  },
];
