import { Question } from '../../models/content.model';

// Unit tests, TestBed, harnesses and what is worth testing at all.
export const TESTING_QUESTIONS: Question[] = [
  {
    id: 'q-testbed',
    category: 'testing',
    q: {
      en: 'What is TestBed, and what does configureTestingModule set up?',
      uk: 'Що таке TestBed і що налаштовує configureTestingModule?',
    },
    a: {
      en: 'TestBed builds a miniature Angular environment for a test: an injector, a place to create components, and a change detection loop. configureTestingModule declares what goes into it - which standalone components to import and which providers to register, including the fakes replacing real services. It is reset between tests, so each one starts from a clean injector and cannot be affected by the last.',
      uk: 'TestBed будує мініатюрне середовище Angular для тесту: інжектор, місце для створення компонентів і цикл change detection. configureTestingModule оголошує, що в нього входить: які standalone-компоненти імпортувати і які провайдери зареєструвати, включно з фейками замість справжніх сервісів. Він скидається між тестами, тож кожен починається з чистого інжектора і не залежить від попереднього.',
    },
    code: 'beforeEach(async () => {\n  await TestBed.configureTestingModule({\n    imports: [UserCardComponent],\n    providers: [{ provide: UserService, useValue: fakeUsers }],\n  }).compileComponents();\n});\n\nconst fixture = TestBed.createComponent(UserCardComponent);',
  },
  {
    id: 'q-component-fixture',
    category: 'testing',
    q: {
      en: 'What does ComponentFixture give you, and why must you call detectChanges?',
      uk: 'Що дає ComponentFixture і чому треба викликати detectChanges?',
    },
    a: {
      en: 'The component instance, its host element, and control over its change detection. You have to trigger a check because a test is not a running application: nothing schedules one for you, so a state change has no effect on the DOM until you ask. Prefer awaiting whenStable, which runs change detection and waits for pending async work, over calling detectChanges directly.',
      uk: 'Екземпляр компонента, його хост-елемент і контроль над його change detection. Перевірку треба запускати самому, бо тест - це не працюючий застосунок: ніхто її не планує, тож зміна стану не впливає на DOM, доки ти не попросиш. Надавай перевагу await whenStable, який виконує change detection і чекає на незавершену асинхронну роботу, а не прямому виклику detectChanges.',
    },
    code: 'const fixture = TestBed.createComponent(CounterComponent);\nconst host = fixture.nativeElement as HTMLElement;\n\nfixture.componentInstance.count.set(5);\n// The DOM still shows 0 here\n\nawait fixture.whenStable();\nexpect(host.querySelector(".count")?.textContent).toBe("5");',
  },
  {
    id: 'q-testing-standalone-components',
    category: 'testing',
    q: {
      en: 'How do you test a standalone component, and how do you replace one of its imports?',
      uk: 'Як тестувати standalone-компонент і як підмінити один з його імпортів?',
    },
    a: {
      en: 'Put it in imports rather than declarations - it brings its own dependencies with it, which is why a standalone component needs far less test setup. To swap one of those dependencies, use overrideComponent to replace an entry in its imports array; a plain provider override cannot do it, because the import is compiled into the component rather than injected.',
      uk: 'Поклади його в imports, а не в declarations: він приносить власні залежності з собою, тому standalone-компонент потребує значно меншого налаштування тесту. Щоб підмінити одну з цих залежностей, використай overrideComponent і заміни елемент у його масиві imports; звичайна підміна провайдера цього не зробить, бо імпорт вкомпільовано в компонент, а не інжектовано.',
    },
    code: 'TestBed.configureTestingModule({ imports: [DashboardComponent] });\n\n// Replace a heavy child with a stub of the same selector\nTestBed.overrideComponent(DashboardComponent, {\n  remove: { imports: [ChartComponent] },\n  add: { imports: [ChartStubComponent] },\n});',
  },
  {
    id: 'q-override-providers-in-tests',
    category: 'testing',
    q: {
      en: 'How do you swap a real service for a fake in a test?',
      uk: 'Як підмінити справжній сервіс на фейковий у тесті?',
    },
    a: {
      en: 'Register a provider for the same token in configureTestingModule, and the injector hands out yours instead. A hand-written fake object is usually better than an auto-mock: it is typed against the real interface, so it fails to compile when that interface changes, whereas a mock with arbitrary keys silently keeps passing. Use overrideProvider when the provider is declared on a component rather than at the root.',
      uk: "Зареєструй провайдер для того самого токена в configureTestingModule - і інжектор віддасть саме твій. Написаний руками фейковий об'єкт зазвичай кращий за автомок: він типізований за справжнім інтерфейсом, тож перестає компілюватися, коли інтерфейс змінився, тоді як мок з довільними ключами тихо продовжує проходити. Використовуй overrideProvider, коли провайдер оголошено на компоненті, а не в корені.",
    },
    code: '// Typed against the real thing, so an interface change breaks the test\nconst fakeUsers: Pick<UserService, "byId"> = {\n  byId: (id: string) => of({ id, name: "Ada" }),\n};\n\nTestBed.configureTestingModule({\n  providers: [{ provide: UserService, useValue: fakeUsers }],\n});\n\n// When the provider lives on the component\nTestBed.overrideProvider(WizardState, { useValue: fakeState });',
  },
  {
    id: 'q-shallow-vs-deep-tests',
    category: 'testing',
    q: {
      en: 'What is the difference between a shallow and a deep component test, and which do you default to?',
      uk: 'Яка різниця між поверхневим і глибоким тестом компонента і який ти обираєш за замовчуванням?',
    },
    a: {
      en: 'A shallow test stubs the children and asserts only on this component; a deep one renders the real tree. Default to deep for a small subtree: it tests what the user actually gets, and stubbing children means a broken integration between two working components passes. Go shallow when a child is genuinely expensive - a chart, a map, something hitting the network.',
      uk: 'Поверхневий тест підміняє дітей заглушками і перевіряє лише цей компонент; глибокий рендерить справжнє дерево. За замовчуванням бери глибокий для невеликого піддерева: він перевіряє те, що справді отримує користувач, а заглушки на дітях означають, що зламана інтеграція двох робочих компонентів проходить тест. Переходь на поверхневий, коли дитина справді дорога: графік, карта, щось із мережею.',
    },
    code: '// Deep: the real children, so a broken binding between them fails here\nimports: [DashboardComponent];\n\n// Shallow: only when a child is genuinely expensive\n@Component({ selector: "app-chart", template: "" })\nclass ChartStubComponent {\n  readonly data = input<Data[]>([]);   // keep the same input contract\n}',
  },
  {
    id: 'q-testing-inputs-outputs',
    category: 'testing',
    q: {
      en: 'How do you set an input and assert on an output in a test?',
      uk: 'Як задати інпут і перевірити аутпут у тесті?',
    },
    a: {
      en: 'setInput on the componentRef, which goes through the same path as a template binding, so transforms run and required inputs are satisfied. Assigning the field directly bypasses that and does not mark the component dirty, which is why the DOM does not update. For an output, subscribe to it before triggering the action - it is an emit-only API, so the subscription is the only way to observe it.',
      uk: 'setInput на componentRef - він іде тим самим шляхом, що й прив\'язка в шаблоні, тож трансформації виконуються, а обов\'язкові інпути задовольняються. Пряме присвоєння полю це обходить і не позначає компонент "брудним", тому DOM не оновлюється. Для аутпуту підпишися на нього до того, як запустиш дію: це API лише для емісії, тож підписка - єдиний спосіб його спостерігати.',
    },
    code: 'fixture.componentRef.setInput("user", { id: "1", name: "Ada" });\nawait fixture.whenStable();\n\nlet emitted: string | undefined;\nfixture.componentInstance.picked.subscribe((id) => (emitted = id));\n\nhost.querySelector<HTMLButtonElement>(".pick")!.click();\nexpect(emitted).toBe("1");',
  },
  {
    id: 'q-fakeasync-tick',
    category: 'testing',
    q: {
      en: 'What do fakeAsync and tick do, and which timers do they control?',
      uk: 'Що роблять fakeAsync і tick і якими таймерами вони керують?',
    },
    a: {
      en: 'fakeAsync replaces the timer queue with a virtual one, and tick advances it by however many milliseconds you name - so a debounce of 300ms is tested in no real time at all. It controls what zone.js patched: setTimeout, setInterval and promises. It does not control anything outside the zone, and it throws at the end of the test if a timer is still pending, which is a useful way to find a subscription you never cleaned up.',
      uk: 'fakeAsync замінює чергу таймерів на віртуальну, а tick просуває її на вказану кількість мілісекунд - тож debounce на 300 мс тестується взагалі без реального часу. Він керує тим, що пропатчив zone.js: setTimeout, setInterval і промісами. Він не керує нічим поза зоною і кидає помилку в кінці тесту, якщо якийсь таймер ще в очікуванні, - і це корисний спосіб знайти підписку, за якою ти не прибрав.',
    },
    code: 'it("debounces the search", fakeAsync(() => {\n  component.term.set("an");\n  tick(299);\n  expect(api.search).not.toHaveBeenCalled();\n\n  tick(1);\n  expect(api.search).toHaveBeenCalledWith("an");\n\n  discardPeriodicTasks();   // or the test fails on the pending interval\n}));',
  },
  {
    id: 'q-waitforasync-vs-fakeasync',
    category: 'testing',
    q: {
      en: 'When do you need waitForAsync instead of fakeAsync?',
      uk: 'Коли потрібен waitForAsync замість fakeAsync?',
    },
    a: {
      en: 'When the async work is not on a timer you can advance: real promises resolving against something outside the zone, or code you cannot make deterministic. waitForAsync lets the work happen and gives you whenStable to await. Prefer fakeAsync where it applies, because a virtual clock makes the test deterministic and instant - a test that waits on real time is a test that will be flaky on a loaded CI machine.',
      uk: "Коли асинхронна робота не є таймером, який можна просунути: справжні проміси, що розв'язуються проти чогось поза зоною, або код, який не зробити детермінованим. waitForAsync дає роботі відбутися і надає whenStable, на який можна чекати. Надавай перевагу fakeAsync там, де він застосовний: віртуальний годинник робить тест детермінованим і миттєвим, а тест, що чекає на реальний час, буде нестабільним на завантаженій машині CI.",
    },
    code: 'it("loads the user", waitForAsync(async () => {\n  component.load();\n  await fixture.whenStable();\n\n  expect(host.textContent).toContain("Ada");\n}));\n\n// Modern tests often need neither: await whenStable() directly in an async it.',
  },
  {
    id: 'q-fixture-when-stable',
    category: 'testing',
    q: {
      en: 'What does fixture.whenStable() wait for?',
      uk: 'На що чекає fixture.whenStable()?',
    },
    a: {
      en: 'It runs change detection and resolves once the application has no pending async work left - the microtask queue drained, no macrotasks outstanding. That makes it the one call to await after any action, instead of guessing between detectChanges and a manual flush. Note that it cannot wait for something outside the zone, which is one more reason a test should not depend on real timers.',
      uk: "Він виконує change detection і розв'язується, коли в застосунку не лишилося незавершеної асинхронної роботи: черга мікрозадач спорожніла, макрозадач в очікуванні немає. Тому саме його варто очікувати після будь-якої дії, замість вгадування між detectChanges і ручним проштовхуванням. Врахуй, що він не може дочекатися чогось поза зоною, - ще одна причина, чому тест не має залежати від реальних таймерів.",
    },
    code: 'component.filter.set("active");\nawait fixture.whenStable();      // check, then wait for pending work\n\nexpect(host.querySelectorAll(".row")).toHaveLength(3);',
  },
  {
    id: 'q-testing-http',
    category: 'testing',
    q: {
      en: 'How does HttpTestingController let you assert on outgoing requests?',
      uk: 'Як HttpTestingController дозволяє перевіряти вихідні запити?',
    },
    a: {
      en: 'It replaces the HTTP backend with one that records requests instead of sending them. expectOne asserts that exactly one matching request was made and hands it to you, so you can check the method, headers and body, then flush a response to drive the code forward. Call verify in afterEach: it fails the test on any request you did not expect, which is what catches the extra call nobody meant to make.',
      uk: 'Він замінює HTTP-бекенд на такий, що записує запити замість надсилання. expectOne перевіряє, що зроблено рівно один відповідний запит, і віддає його тобі, тож можна перевірити метод, заголовки й тіло, а потім через flush віддати відповідь і просунути код далі. Викликай verify в afterEach: він валить тест на будь-якому неочікуваному запиті, і саме це ловить зайвий виклик, якого ніхто не планував.',
    },
    code: 'afterEach(() => http.verify());\n\nit("sends the order once", () => {\n  service.submit(order).subscribe();\n\n  const request = http.expectOne("/api/orders");\n  expect(request.request.method).toBe("POST");\n  expect(request.request.body).toEqual(order);\n\n  request.flush({ id: 7 });\n});\n\nit("handles a failure", () => {\n  service.submit(order).subscribe({ error: (e) => expect(e.status).toBe(500) });\n  http.expectOne("/api/orders").flush(null, { status: 500, statusText: "Server Error" });\n});',
  },
  {
    id: 'q-marble-testing',
    category: 'testing',
    q: {
      en: 'What is marble testing, and when is it worth the syntax?',
      uk: 'Що таке marble-тестування і коли його синтаксис виправданий?',
    },
    a: {
      en: 'Writing a stream as a string where each character is a frame of virtual time, and asserting that the output diagram matches. It is worth the learning curve when timing is the thing under test: a debounce, a retry with backoff, a switchMap cancelling correctly. For a stream where you only care about the values, a plain subscribe and an array is clearer and easier to read six months later.',
      uk: 'Це запис потоку рядком, де кожен символ - кадр віртуального часу, з перевіркою, що вихідна діаграма збігається. Синтаксис виправданий, коли під тестом саме тайминг: debounce, повтор із відкладенням, коректне скасування у switchMap. Для потоку, де важливі лише значення, звичайна підписка і масив зрозуміліші й легші для читання за пів року.',
    },
    code: 'it("debounces", () => {\n  scheduler.run(({ cold, expectObservable }) => {\n    const source = cold("a-b-c-------d|");\n    const expected =    "--------c---|";\n\n    expectObservable(source.pipe(debounceTime(3, scheduler))).toBe(expected);\n  });\n});\n\n// For values rather than timing, this is clearer:\nconst received: number[] = [];\nsource$.subscribe((v) => received.push(v));\nexpect(received).toEqual([1, 2, 3]);',
  },
  {
    id: 'q-testing-signals-and-effects',
    category: 'testing',
    q: {
      en: 'How do you test signal state and effects without a component?',
      uk: 'Як тестувати сигнальний стан і ефекти без компонента?',
    },
    a: {
      en: 'A signal and a computed need no framework: set the sources, read the result, assert. An effect does, because it runs as part of change detection - create it inside TestBed.runInInjectionContext and call TestBed.tick() before asserting, or it will not have run. That difference is a good reason to keep logic in computeds and leave effects for talking to the outside world, which is also the part worth faking.',
      uk: 'Сигнал і computed не потребують фреймворка: задай джерела, прочитай результат, перевір. Ефект потребує, бо виконується як частина change detection: створюй його всередині TestBed.runInInjectionContext і викликай TestBed.tick() перед перевіркою, інакше він не спрацював. Ця різниця - добра причина тримати логіку в computed, а ефекти лишати для спілкування із зовнішнім світом, яке й варто підміняти фейком.',
    },
    code: 'it("totals the cart", () => {\n  const store = new CartStore();\n  store.add({ price: 2 });\n  store.add({ price: 3 });\n\n  expect(store.total()).toBe(5);      // no TestBed at all\n});\n\nit("persists the theme", () => {\n  TestBed.runInInjectionContext(() => effect(() => storage.set(theme())));\n  theme.set("dark");\n  TestBed.tick();                      // without this, nothing has run\n\n  expect(storage.get()).toBe("dark");\n});',
  },
  {
    id: 'q-component-harnesses',
    category: 'testing',
    q: {
      en: 'What is a component test harness, and what does it protect your tests from?',
      uk: 'Що таке component test harness і від чого він захищає твої тести?',
    },
    a: {
      en: "An API for driving a component in a test through its behaviour rather than its markup: open the menu, select the option, read the value. It protects you from the component's internal structure - a library changing a class name or nesting a wrapper breaks every test that queried the DOM, and none that used the harness. It also handles the stabilisation, so there are no scattered whenStable calls.",
      uk: "Це API для керування компонентом у тесті через його поведінку, а не розмітку: відкрий меню, вибери опцію, прочитай значення. Він захищає від внутрішньої структури компонента: бібліотека змінила ім'я класу чи додала обгортку - і ламаються всі тести, що зверталися до DOM, і жоден з тих, що використовували harness. Він також бере на себе стабілізацію, тож розкиданих викликів whenStable немає.",
    },
    code: 'const loader = TestbedHarnessEnvironment.loader(fixture);\nconst select = await loader.getHarness(MatSelectHarness);\n\nawait select.open();\nawait select.clickOptions({ text: "Ukraine" });\n\nexpect(await select.getValueText()).toBe("Ukraine");\n// No class names, so a markup change in the library does not break this.',
  },
  {
    id: 'q-testing-routing',
    category: 'testing',
    q: {
      en: 'How do you test a component that depends on the router?',
      uk: 'Як тестувати компонент, що залежить від роутера?',
    },
    a: {
      en: 'Provide the real router over an in-memory location with provideRouter and a small set of routes, so navigation actually happens and you can assert on the URL. That beats stubbing ActivatedRoute, which tests your stub. Better still, take route parameters as inputs through withComponentInputBinding - the component then needs no router at all in a test, and setInput is the whole setup.',
      uk: 'Дай справжній роутер над in-memory location через provideRouter і невеликий набір маршрутів, тож навігація справді відбувається і можна перевіряти URL. Це краще за заглушку ActivatedRoute, яка перевіряє твою ж заглушку. Ще краще - брати параметри маршруту як інпути через withComponentInputBinding: тоді компоненту в тесті роутер не потрібен взагалі, а все налаштування - це setInput.',
    },
    code: 'TestBed.configureTestingModule({\n  imports: [UserComponent],\n  providers: [provideRouter([{ path: "users/:id", component: UserComponent }])],\n});\n\nawait TestBed.inject(Router).navigate(["/users", "7"]);\nexpect(TestBed.inject(Router).url).toBe("/users/7");\n\n// Or avoid the router entirely:\nfixture.componentRef.setInput("id", "7");',
  },
  {
    id: 'q-e2e-options',
    category: 'testing',
    q: {
      en: 'What are the e2e options for an Angular project now that Protractor is gone?',
      uk: 'Які варіанти e2e є в проєкті на Angular після того, як Protractor пішов у минуле?',
    },
    a: {
      en: 'Playwright and Cypress, both wired up through ng e2e or added directly. Protractor was deprecated in v12 and removed in v16 - it depended on the WebDriver control flow and on Angular internals for waiting, both of which stopped being good ideas. Whichever you pick, keep the suite small: e2e tests are the slowest and flakiest thing you own, so they should cover the few journeys that must never break, not every branch.',
      uk: 'Playwright і Cypress - обидва підключаються через ng e2e або додаються напряму. Protractor оголосили застарілим у v12 і прибрали у v16: він залежав від control flow у WebDriver і від внутрішніх механізмів Angular для очікування, і те й те перестало бути добрими ідеями. Що б ти не обрав, тримай набір невеликим: e2e - найповільніше і найнестабільніше, що в тебе є, тож вони мають покривати кілька шляхів, які не мають ламатися ніколи, а не кожну гілку.',
    },
    code: 'ng add @playwright/test\n\n// A journey, not a branch\ntest("a user can place an order", async ({ page }) => {\n  await page.goto("/products");\n  await page.getByRole("button", { name: "Add to cart" }).first().click();\n  await page.getByRole("link", { name: "Checkout" }).click();\n\n  await expect(page.getByText("Order confirmed")).toBeVisible();\n});',
  },
  {
    id: 'q-accessibility-testing',
    category: 'testing',
    q: {
      en: 'How do you get accessibility checks into an automated test suite?',
      uk: 'Як вбудувати перевірки доступності в автоматизований набір тестів?',
    },
    a: {
      en: 'Run axe over the rendered fixture in a unit test, and over real pages in e2e. Be clear about what that buys you: automated checks catch roughly a third of WCAG issues - missing labels, contrast, invalid ARIA - and cannot tell whether focus order makes sense or whether a live region announces anything useful. Assert zero violations in CI, then test the keyboard path by hand.',
      uk: 'Запускай axe над відрендереним fixture у юніт-тесті і над справжніми сторінками в e2e. Май на увазі, що це дає: автоматичні перевірки ловлять приблизно третину проблем WCAG - відсутні мітки, контраст, невалідні ARIA - і не можуть сказати, чи має сенс порядок фокуса і чи оголошує жива область щось корисне. Вимагай нуля порушень у CI, а клавіатурний шлях перевіряй руками.',
    },
    code: 'it("has no axe violations", async () => {\n  const results = await axe(fixture.nativeElement);\n  expect(results.violations).toEqual([]);\n});\n\n// What this cannot check: whether tab order is sensible,\n// or whether a screen reader announces the error you just showed.',
  },
  {
    id: 'q-what-not-to-test',
    category: 'testing',
    q: {
      en: 'What is not worth writing a test for in an Angular application?',
      uk: 'Для чого в застосунку на Angular не варто писати тест?',
    },
    a: {
      en: 'Anything the framework or the compiler already guarantees: that an input arrives, that a binding renders, that a getter returns the field it wraps. Tests that assert on exact markup break on every design change while catching nothing. And a test that mirrors the implementation line by line only proves the code is what it is - it will keep passing after you break the behaviour. Test the behaviour a user or a caller depends on.',
      uk: "Для всього, що вже гарантують фреймворк або компілятор: що інпут прийшов, що прив'язка відрендерилася, що геттер повертає поле, яке обгортає. Тести, які перевіряють точну розмітку, ламаються на кожній зміні дизайну і не ловлять нічого. А тест, що дзеркалить реалізацію рядок за рядком, доводить лише, що код є тим, чим є, - і продовжить проходити після того, як ти зламаєш поведінку. Тестуй поведінку, від якої залежить користувач або викликач.",
    },
    code: '// Tests the framework, not your code\nit("sets the input", () => {\n  fixture.componentRef.setInput("user", user);\n  expect(fixture.componentInstance.user()).toBe(user);\n});\n\n// Tests something that can actually be wrong\nit("hides the delete button for a viewer", async () => {\n  fixture.componentRef.setInput("role", "viewer");\n  await fixture.whenStable();\n\n  expect(host.querySelector(".delete")).toBeNull();\n});',
  },
];
