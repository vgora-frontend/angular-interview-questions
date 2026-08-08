import { Question } from '../../models/content.model';

// Built-in pipes, custom pipes and the purity rules behind them.
export const PIPES_QUESTIONS: Question[] = [
  {
    id: 'q-what-are-pipes',
    category: 'pipes',
    q: {
      en: 'What is a pipe, and what belongs in one?',
      uk: 'Що таке пайп і що доречно в нього виносити?',
    },
    a: {
      en: 'A pipe transforms a value for display, at the point of display. Formatting belongs in one - dates, currency, truncation, a domain-specific label - because the underlying value stays untouched and only its presentation changes. What does not belong is anything that fetches, mutates or decides: a pipe runs during rendering, so a side effect in one happens at a moment you do not control.',
      uk: 'Пайп перетворює значення для показу, саме в місці показу. Форматування йому пасує - дати, валюта, обрізання, доменна мітка, - бо саме значення лишається недоторканим і змінюється тільки його подання. Не пасує все, що завантажує, змінює чи ухвалює рішення: пайп виконується під час рендерингу, тож побічний ефект у ньому стається в момент, який ти не контролюєш.',
    },
    code: '<p>{{ order().createdAt | date: "d MMM y" }}</p>\n<p>{{ order().total | currency: "EUR" }}</p>\n<p>{{ order().status | orderStatus }}</p>   <!-- your own label pipe -->\n\n<!-- Not a pipe\'s job: this fires during rendering -->\n<p>{{ userId() | loadUserFromServer }}</p>',
  },
  {
    id: 'q-parameterized-pipe',
    category: 'pipes',
    q: {
      en: 'How do you pass parameters to a pipe?',
      uk: 'Як передати параметри в пайп?',
    },
    a: {
      en: 'After the pipe name, separated by colons, in the order the transform method declares them after its first argument. They are template expressions, so they can be signals or properties rather than literals. Give optional parameters defaults in the signature - a pipe that throws because a caller omitted an argument fails at render time, where the stack trace tells you very little.',
      uk: "Після імені пайпа, через двокрапки, у тому порядку, у якому метод transform оголошує їх після першого аргументу. Це шаблонні вирази, тож вони можуть бути сигналами чи властивостями, а не лише літералами. Давай необов'язковим параметрам значення за замовчуванням у сигнатурі: пайп, що падає через пропущений аргумент, ламається під час рендерингу, а стек там мало що пояснює.",
    },
    code: '@Pipe({ name: "truncate" })\nexport class TruncatePipe implements PipeTransform {\n  transform(value: string, limit = 40, suffix = "..."): string {\n    return value.length > limit ? value.slice(0, limit) + suffix : value;\n  }\n}\n\n<p>{{ bio() | truncate }}</p>\n<p>{{ bio() | truncate: 20 }}</p>\n<p>{{ bio() | truncate: maxLength() : " [more]" }}</p>',
  },
  {
    id: 'q-chaining-pipes',
    category: 'pipes',
    q: {
      en: 'How do you chain pipes, and in what order do they apply?',
      uk: "Як з'єднувати пайпи в ланцюжок і в якому порядку вони застосовуються?",
    },
    a: {
      en: 'Write them one after another with vertical bars; each receives the output of the one before, left to right. Order therefore changes the result, and it is easy to get backwards - formatting a date and then uppercasing it is not the same as the reverse, which would try to uppercase a Date object. Two links are usually the limit before a computed signal reads better.',
      uk: "Пиши їх один за одним через вертикальні риски: кожен отримує результат попереднього, зліва направо. Тому порядок змінює результат, і його легко переставити навпаки: відформатувати дату, а потім перевести у верхній регістр - це не те саме, що навпаки, бо тоді у верхній регістр намагалися б перевести об'єкт Date. Два елементи - зазвичай межа, після якої computed-сигнал читається краще.",
    },
    code: '<p>{{ createdAt() | date: "fullDate" | uppercase }}</p>   <!-- format, then case -->\n\n<!-- Reversed, this passes a Date to uppercase and breaks -->\n<p>{{ createdAt() | uppercase | date: "fullDate" }}</p>\n\n// Past two links, this is clearer in the class:\nprotected readonly heading = computed(() => formatHeading(this.createdAt()));',
  },
  {
    id: 'q-pure-vs-impure-pipe',
    category: 'pipes',
    q: {
      en: 'What is the difference between a pure and an impure pipe?',
      uk: 'Яка різниця між чистим і нечистим пайпом?',
    },
    a: {
      en: 'A pure pipe - the default - re-runs only when its input reference or a parameter changes, and caches otherwise. An impure pipe runs on every change detection pass, no matter what. The distinction matters because a pure pipe cannot see a mutation: push into an array and the reference is unchanged, so the pipe never re-runs. The fix is nearly always to replace the array rather than to mark the pipe impure.',
      uk: 'Чистий пайп - типовий - перезапускається лише коли змінюється посилання на його вхід або параметр, а інакше кешує. Нечистий виконується на кожному проході change detection, хай там що. Різниця важлива тим, що чистий пайп не бачить мутації: додай елемент у масив - посилання не змінилося, тож пайп не перезапуститься. Виправлення майже завжди в тому, щоб замінити масив, а не позначати пайп нечистим.',
    },
    code: '@Pipe({ name: "activeOnly" })                  // pure by default\n@Pipe({ name: "activeOnly", pure: false })     // runs on every check\n\n// Pure pipe blind to this:\nthis.users().push(newUser);            // same reference, no re-run\n\n// Sees this:\nthis.users.update((list) => [...list, newUser]);',
  },
  {
    id: 'q-impure-pipe-cost',
    category: 'pipes',
    q: {
      en: 'Why is an impure pipe a performance risk, and when is it still the right call?',
      uk: 'Чому нечистий пайп є ризиком для продуктивності і коли він усе ж доречний?',
    },
    a: {
      en: 'Because it runs on every change detection pass, for every place it appears - put one in a list of two hundred rows and it runs two hundred times per pass, several times a second. It is justified when the pipe genuinely tracks something outside the value, which is exactly what the async pipe does with a subscription. For filtering and sorting it is the wrong tool: derive the list in a computed instead.',
      uk: 'Бо він виконується на кожному проході change detection і в кожному місці, де стоїть: постав його в список із двохсот рядків - і він виконається двісті разів за прохід, кілька разів на секунду. Виправданий він тоді, коли справді відстежує щось поза значенням, - саме це робить async pipe із підпискою. Для фільтрації і сортування це неправильний інструмент: виведи список у computed.',
    },
    code: '<!-- 200 rows: this pipe runs 200 times per change detection pass -->\n@for (user of users() | activeOnly; track user.id) { ... }\n\n// Computed once per change of users(), and cached in between\nprotected readonly activeUsers = computed(() =>\n  this.users().filter((user) => user.active),\n);\n\n@for (user of activeUsers(); track user.id) { ... }',
  },
  {
    id: 'q-custom-pipe',
    category: 'pipes',
    q: {
      en: 'How do you write a custom pipe, and what does PipeTransform require?',
      uk: 'Як написати власний пайп і чого вимагає інтерфейс PipeTransform?',
    },
    a: {
      en: 'A class with @Pipe giving it a name, implementing PipeTransform, which requires one method: transform, taking the piped value first and any parameters after. Type both the input and the return - with strictTemplates the compiler checks the call site against that signature, which is where a pipe applied to the wrong type gets caught. Import the class where the template uses it.',
      uk: "Клас із @Pipe, що дає йому ім'я, і реалізацією PipeTransform, яка вимагає одного методу: transform, що приймає передане значення першим, а параметри після. Типізуй і вхід, і результат: зі strictTemplates компілятор перевіряє місце виклику щодо цієї сигнатури - саме там ловиться пайп, застосований до неправильного типу. Імпортуй клас туди, де його вживає шаблон.",
    },
    code: '@Pipe({ name: "initials" })\nexport class InitialsPipe implements PipeTransform {\n  transform(fullName: string): string {\n    return fullName\n      .split(" ")\n      .map((part) => part[0]?.toUpperCase() ?? "")\n      .join("");\n  }\n}\n\n@Component({ selector: "app-avatar", templateUrl: "./avatar.html", imports: [InitialsPipe] })\nexport class AvatarComponent {}',
  },
  {
    id: 'q-pipe-dependency-injection',
    category: 'pipes',
    q: {
      en: 'Can a pipe inject dependencies, and what does that imply for its lifecycle?',
      uk: 'Чи може пайп інжектувати залежності і що це означає для його життєвого циклу?',
    },
    a: {
      en: 'Yes - a pipe is an injectable class, which is how the date pipe reads LOCALE_ID. It is instantiated per use site in a template and destroyed with the view, so it can implement ngOnDestroy; the async pipe relies on that to unsubscribe. Injecting something stateful makes the pipe stateful too, and a pure pipe that depends on hidden state will not re-run when that state changes.',
      uk: 'Так - пайп є інжектованим класом, саме так date pipe читає LOCALE_ID. Він створюється на кожне місце використання в шаблоні і знищується разом із виглядом, тож може реалізувати ngOnDestroy; async pipe саме на це спирається, щоб відписатися. Інжекція чогось зі станом робить зі станом і сам пайп, а чистий пайп, залежний від прихованого стану, не перезапуститься при його зміні.',
    },
    code: '@Pipe({ name: "money" })\nexport class MoneyPipe implements PipeTransform {\n  private readonly locale = inject(LOCALE_ID);\n\n  transform(value: number, currency = "EUR"): string {\n    return new Intl.NumberFormat(this.locale, { style: "currency", currency }).format(value);\n  }\n}',
  },
  {
    id: 'q-async-pipe',
    category: 'pipes',
    q: {
      en: 'What does the async pipe do, and what does it handle for you on destroy?',
      uk: 'Що робить async pipe і що саме він бере на себе при знищенні компонента?',
    },
    a: {
      en: 'It subscribes to an observable or awaits a promise, returns the latest value, and unsubscribes when the view is destroyed. It also calls markForCheck on each emission, which is what makes it work under OnPush. That last part is the real value: it removes both of the things people forget - the unsubscribe and the change detection nudge.',
      uk: 'Він підписується на observable або чекає на promise, повертає останнє значення і відписується, коли вигляд знищується. Він також викликає markForCheck на кожну емісію - саме тому він працює з OnPush. Остання частина і є справжньою цінністю: вона знімає обидві речі, про які забувають, - відписку і поштовх для change detection.',
    },
    code: '@Component({ selector: "app-users", templateUrl: "./users.html", imports: [AsyncPipe] })\nexport class UsersComponent {\n  protected readonly users$ = inject(UserService).all$;\n}\n\n@if (users$ | async; as users) {\n  @for (user of users; track user.id) { <app-row [user]="user" /> }\n}',
  },
  {
    id: 'q-async-pipe-vs-subscribe',
    category: 'pipes',
    q: {
      en: 'Why is the async pipe usually better than subscribing in the component class?',
      uk: 'Чому async pipe зазвичай кращий за підписку в класі компонента?',
    },
    a: {
      en: 'Because the subscription is tied to the view that uses the value, so it cannot outlive it and there is no teardown to remember. A manual subscribe also needs markForCheck under OnPush, which is silently missing in a lot of code that appears to work only because change detection was triggered by something else. Subscribe manually when you need the value for logic rather than display, and then use takeUntilDestroyed.',
      uk: "Бо підписка прив'язана до вигляду, який використовує значення, тож не може його пережити, і про демонтаж не треба пам'ятати. Ручна підписка до того ж потребує markForCheck при OnPush, і в багатьох місцях цього тихо немає, а працює воно лише тому, що change detection запустило щось інше. Підписуйся вручну, коли значення потрібне для логіки, а не для показу, і тоді бери takeUntilDestroyed.",
    },
    code: '// Manual: two things to get right, and one of them is invisible when wrong\nngOnInit(): void {\n  this.users$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((users) => {\n    this.users = users;\n    this.cdr.markForCheck();      // required under OnPush\n  });\n}\n\n<!-- The pipe does both -->\n@for (user of users$ | async; track user.id) { ... }',
  },
  {
    id: 'q-async-pipe-multiple-subscriptions',
    category: 'pipes',
    q: {
      en: 'What goes wrong when the same observable runs through the async pipe several times in one template?',
      uk: 'Що піде не так, якщо один і той самий observable кілька разів пройде через async pipe в одному шаблоні?',
    },
    a: {
      en: 'Each async pipe subscribes independently, so a cold observable runs its producer once per pipe - three uses means three HTTP requests. Fix it by subscribing once and reusing the value with the as syntax, or by making the source shared with shareReplay. The as form is better: it makes the single subscription visible in the template rather than depending on an operator far away.',
      uk: 'Кожен async pipe підписується окремо, тож холодний observable запускає свого продюсера на кожен пайп: три використання означають три HTTP-запити. Виправляється підпискою один раз із перевикористанням значення через синтаксис as або спільним джерелом через shareReplay. Форма as краща: вона робить єдину підписку видимою прямо в шаблоні, а не залежною від оператора десь далеко.',
    },
    code: '<!-- Three subscriptions, three requests -->\n<p>{{ (user$ | async)?.name }}</p>\n<p>{{ (user$ | async)?.email }}</p>\n<img [src]="(user$ | async)?.avatar" />\n\n<!-- One subscription, visible where it happens -->\n@if (user$ | async; as user) {\n  <p>{{ user.name }}</p>\n  <p>{{ user.email }}</p>\n  <img [src]="user.avatar" />\n}',
  },
  {
    id: 'q-date-pipe-locale',
    category: 'pipes',
    q: {
      en: 'How does the date pipe pick a format, and how do you make it follow the active locale?',
      uk: 'Як date pipe обирає формат і як змусити його враховувати активну локаль?',
    },
    a: {
      en: 'It takes a named format such as short or fullDate, or a pattern, plus an optional timezone and locale. Named formats are the ones that adapt: they resolve through the locale data, so the same binding renders differently per language, while a hard-coded pattern renders identically everywhere. The locale comes from LOCALE_ID, which defaults to en-US - so a multilingual app must provide it, or every date silently stays American.',
      uk: "Він приймає іменований формат на кшталт short чи fullDate або власний шаблон, плюс необов'язкові часовий пояс і локаль. Адаптуються саме іменовані формати: вони розв'язуються через дані локалі, тож та сама прив'язка рендериться по-різному для різних мов, тоді як зашитий шаблон скрізь однаковий. Локаль береться з LOCALE_ID, типово en-US, тож багатомовний застосунок має її надати, інакше кожна дата тихо лишиться американською.",
    },
    code: '<p>{{ createdAt() | date: "shortDate" }}</p>   <!-- follows the locale -->\n<p>{{ createdAt() | date: "MM/dd/yyyy" }}</p>  <!-- the same everywhere -->\n\n// Without this, LOCALE_ID is en-US whatever language the UI is in\nregisterLocaleData(localeUk);\nproviders: [{ provide: LOCALE_ID, useValue: "uk" }];',
  },
  {
    id: 'q-currency-number-pipes',
    category: 'pipes',
    q: {
      en: 'How do the currency, decimal and percent pipes format numbers?',
      uk: 'Як пайпи currency, decimal і percent форматують числа?',
    },
    a: {
      en: 'All three go through the locale data for separators and grouping, and take a digitsInfo string - minIntegerDigits.minFractionDigits-maxFractionDigits - to control precision. currency additionally takes an ISO code and how to show it. The trap is percent: it multiplies by a hundred, so pass 0.25 to get 25%, and passing 25 gives you 2,500%.',
      uk: 'Усі три беруть роздільники й групування з даних локалі та приймають рядок digitsInfo - minIntegerDigits.minFractionDigits-maxFractionDigits - для керування точністю. currency додатково приймає ISO-код і спосіб його показу. Пастка в percent: він множить на сто, тож передавай 0.25, щоб отримати 25%, а передане 25 дасть 2500%.',
    },
    code: '<p>{{ 1234.5 | number: "1.2-2" }}</p>          <!-- 1,234.50 -->\n<p>{{ 1234.5 | currency: "EUR" }}</p>          <!-- EUR1,234.50 -->\n<p>{{ 1234.5 | currency: "EUR" : "code" }}</p> <!-- EUR 1,234.50 -->\n<p>{{ 0.25 | percent }}</p>                    <!-- 25% -->\n<p>{{ 25 | percent }}</p>                      <!-- 2,500% - almost never meant -->',
  },
  {
    id: 'q-slice-pipe',
    category: 'pipes',
    q: {
      en: 'What does the slice pipe do, and why is it impure?',
      uk: 'Що робить slice pipe і чому він нечистий?',
    },
    a: {
      en: 'It returns a subset of an array or string, with the same arguments as Array.prototype.slice, negative indices included. It is impure because it returns a new array every run: a pure pipe would compare that new reference against the previous one, find them different, and force a re-render forever. Being impure, it runs on every check instead - so it is fine for a fixed preview, and a poor idea in a large loop.',
      uk: "Він повертає підмножину масиву чи рядка з тими самими аргументами, що й Array.prototype.slice, включно з від'ємними індексами. Нечистий він тому, що щоразу повертає новий масив: чистий пайп порівняв би це нове посилання з попереднім, побачив би різницю і назавжди змушував би перерендер. Будучи нечистим, він натомість виконується на кожній перевірці - тож нормальний для фіксованого прев'ю і поганий у великому циклі.",
    },
    code: '<!-- Fine: a short preview -->\n@for (item of items() | slice: 0 : 3; track item.id) { ... }\n\n<p>{{ description() | slice: 0 : 100 }}...</p>\n\n// For a list that matters, compute it and keep the reference stable:\nprotected readonly preview = computed(() => this.items().slice(0, 3));',
  },
  {
    id: 'q-keyvalue-pipe',
    category: 'pipes',
    q: {
      en: 'What does the keyvalue pipe do, and how does it order its output?',
      uk: 'Що робить keyvalue pipe і за яким порядком він видає результат?',
    },
    a: {
      en: 'It turns an object or a Map into an array of key-value pairs so you can iterate it, since @for needs something iterable. By default it sorts by key, which surprises people expecting insertion order - pass a comparator, or null to keep the original order. It is impure, for the same reason as slice: it builds a new array each time.',
      uk: "Він перетворює об'єкт або Map на масив пар ключ-значення, щоб їх можна було перебрати, бо @for потребує чогось ітерованого. За замовчуванням він сортує за ключем, що дивує тих, хто очікує порядок вставляння: передай компаратор або null, щоб зберегти вихідний порядок. Він нечистий з тієї ж причини, що й slice: щоразу будує новий масив.",
    },
    code: '@for (entry of settings() | keyvalue; track entry.key) {\n  <dt>{{ entry.key }}</dt>\n  <dd>{{ entry.value }}</dd>\n}\n\n<!-- Sorted by key by default. To keep insertion order: -->\n@for (entry of settings() | keyvalue: null; track entry.key) { ... }',
  },
  {
    id: 'q-json-pipe-debug',
    category: 'pipes',
    q: {
      en: 'What is the json pipe good for, and why should it not ship to production?',
      uk: 'Для чого корисний json pipe і чому йому не місце в продакшені?',
    },
    a: {
      en: 'It stringifies a value with indentation, which makes it the fastest way to see what a binding actually holds. It should not ship because it serialises the whole object on every check, and because whatever it prints is now on screen - internal ids, tokens, fields the API returned but the design never intended to show.',
      uk: "Він серіалізує значення з відступами, і це найшвидший спосіб побачити, що насправді містить прив'язка. У продакшен йому не можна, бо він серіалізує весь об'єкт на кожній перевірці і бо все, що він виводить, тепер на екрані: внутрішні ідентифікатори, токени, поля, які повернуло API, але дизайн ніколи не планував показувати.",
    },
    code: '<!-- Debugging only -->\n<pre>{{ user() | json }}</pre>\n\n<!-- What that just put on screen:\n{ "id": 7, "name": "Ada", "internalScore": 0.82, "sessionToken": "eyJ..." }\n-->',
  },
  {
    id: 'q-pipe-vs-computed',
    category: 'pipes',
    q: {
      en: 'When would you reach for a computed signal instead of a pipe?',
      uk: 'Коли варто взяти computed-сигнал замість пайпа?',
    },
    a: {
      en: 'Whenever the derived value belongs to the component rather than to the presentation. A computed is memoised by dependency rather than by argument reference, it is testable without rendering anything, and it is written once instead of at every use site. Keep a pipe when the transform is genuinely reusable across components - a date format, a domain label - and reach for computed for filtering, sorting and totals.',
      uk: 'Щоразу, коли похідне значення належить компоненту, а не поданню. Computed кешується за залежностями, а не за посиланням на аргумент, тестується без жодного рендерингу і пишеться один раз замість кожного місця використання. Лишай пайп тоді, коли перетворення справді повторно використовується різними компонентами - формат дати, доменна мітка, - а для фільтрації, сортування і підсумків бери computed.',
    },
    code: '<!-- A pipe: reused across components, no component state involved -->\n<p>{{ order().createdAt | date: "shortDate" }}</p>\n\n// A computed: belongs to this component, and is testable on its own\nprotected readonly visible = computed(() =>\n  this.items()\n    .filter((item) => item.status === this.filter())\n    .sort((a, b) => a.name.localeCompare(b.name)),\n);',
  },
];
