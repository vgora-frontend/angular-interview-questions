import { Question } from '../../models/content.model';

// Reactive and template-driven forms, validation and custom controls.
export const FORMS_QUESTIONS: Question[] = [
  {
    id: 'q-reactive-vs-template-driven',
    category: 'forms',
    q: {
      en: 'What is the difference between reactive and template-driven forms?',
      uk: 'Яка різниця між реактивними і шаблонними формами?',
    },
    a: {
      en: 'Where the model lives. In a reactive form you build it in the class, so it is explicit, typed, synchronously available and testable without rendering. In a template-driven form the directives build it from the markup, asynchronously, so the class does not see the model until after the first render. Reactive is the default choice for anything beyond a login box: validation logic in the class is testable, validation logic spread across attributes is not.',
      uk: 'У тому, де живе модель. У реактивній формі ти будуєш її в класі: вона явна, типізована, доступна синхронно і тестується без рендерингу. У шаблонній формі модель будують директиви з розмітки, асинхронно, тож клас не бачить її до першого рендерингу. Реактивні - типовий вибір для всього, складнішого за форму входу: логіка валідації в класі тестується, а розмазана по атрибутах - ні.',
    },
    code: '// Reactive: the model is code\nprotected readonly form = inject(FormBuilder).nonNullable.group({\n  email: ["", [Validators.required, Validators.email]],\n});\n\n<!-- Template-driven: the model is markup, built after the first render -->\n<input name="email" [(ngModel)]="email" required email />',
  },
  {
    id: 'q-reactive-forms-basics',
    category: 'forms',
    q: {
      en: 'How do you build a reactive form, and where does its source of truth live?',
      uk: 'Як побудувати реактивну форму і де живе її джерело істини?',
    },
    a: {
      en: 'You construct a FormGroup of FormControls in the class and connect it to the markup with formGroup and formControlName. The controls are the source of truth: the DOM reflects them, never the other way round. That is why setValue updates the input, why the form works before the template exists, and why a test can drive the whole thing without a single rendered element.',
      uk: 'Ти конструюєш FormGroup з FormControl у класі й підключаєш його до розмітки через formGroup і formControlName. Джерелом істини є саме контроли: DOM відображає їх, а не навпаки. Саме тому setValue оновлює поле, саме тому форма працює ще до появи шаблону, і саме тому тест може керувати всім цим без жодного відрендереного елемента.',
    },
    code: '@Component({ selector: "app-login", templateUrl: "./login.html", imports: [ReactiveFormsModule] })\nexport class LoginComponent {\n  protected readonly form = new FormGroup({\n    email: new FormControl("", { nonNullable: true, validators: [Validators.required] }),\n    password: new FormControl("", { nonNullable: true }),\n  });\n}\n\n<form [formGroup]="form" (ngSubmit)="submit()">\n  <input formControlName="email" />\n  <input formControlName="password" type="password" />\n</form>',
  },
  {
    id: 'q-template-driven-basics',
    category: 'forms',
    q: {
      en: 'How does a template-driven form work, and why is its model built asynchronously?',
      uk: 'Як працює шаблонна форма і чому її модель будується асинхронно?',
    },
    a: {
      en: 'NgForm attaches to the form element and NgModel creates a FormControl for each input, registering it with the group. The model is therefore assembled while the template renders, and NgModel defers registration by a microtask to avoid changing a value during the same check - which is why reading form.value in ngOnInit gives you an empty object. It suits small forms with no dynamic structure; beyond that the lack of a typed, testable model shows.',
      uk: "NgForm чіпляється до елемента form, а NgModel створює FormControl для кожного поля і реєструє його в групі. Тому модель збирається під час рендерингу шаблону, а NgModel відкладає реєстрацію на мікрозадачу, щоб не змінювати значення в тій самій перевірці, - саме тому читання form.value в ngOnInit дає порожній об'єкт. Це пасує невеликим формам без динамічної структури; далі брак типізованої і тестованої моделі дається взнаки.",
    },
    code: '<form #form="ngForm" (ngSubmit)="submit(form.value)">\n  <input name="email" [(ngModel)]="email" required />\n  <button [disabled]="form.invalid">Send</button>\n</form>\n\n// Empty here - the controls have not registered yet\nngOnInit(): void {\n  console.log(this.form.value);   // {}\n}',
  },
  {
    id: 'q-form-control-group-array',
    category: 'forms',
    q: {
      en: 'What are FormControl, FormGroup, FormRecord and FormArray, and when do you pick each?',
      uk: 'Що таке FormControl, FormGroup, FormRecord і FormArray і коли обирати кожен з них?',
    },
    a: {
      en: 'FormControl is one value. FormGroup is a fixed set of named controls, and its type describes exactly those keys. FormRecord is a group whose keys are dynamic but whose controls all share one type - a set of checkboxes built from data. FormArray is an ordered, growing list addressed by index. Pick by whether the shape is known: known keys mean a group, unknown keys of one type mean a record, an ordered list means an array.',
      uk: 'FormControl - це одне значення. FormGroup - фіксований набір іменованих контролів, і його тип описує саме ці ключі. FormRecord - група з динамічними ключами, але контролами одного типу: наприклад набір чекбоксів, побудований з даних. FormArray - упорядкований список, що росте, з доступом за індексом. Обирай за тим, чи відома форма: відомі ключі - група, невідомі ключі одного типу - запис, упорядкований список - масив.',
    },
    code: 'new FormControl("");                                   // one value\n\nnew FormGroup({ email: emailControl, name: nameControl }); // known keys\n\nnew FormRecord<FormControl<boolean>>({});               // keys from data\n\nnew FormArray([new FormControl("")]);                   // ordered, growing\n\n// FormArray is the one you push to:\nthis.form.controls.phones.push(new FormControl(""));',
  },
  {
    id: 'q-form-builder',
    category: 'forms',
    q: {
      en: 'What is FormBuilder for, and what does its nonNullable variant change?',
      uk: 'Для чого потрібен FormBuilder і що змінює його nonNullable-варіант?',
    },
    a: {
      en: 'It builds the same controls with less ceremony - a nested form as object literals instead of a wall of new. The nonNullable variant creates controls that cannot hold null, so reset() returns them to their initial value rather than to null. That one setting removes the most common source of null checks in form code, and it is the form you want almost every time.',
      uk: "Він будує ті самі контроли з меншою церемонією: вкладена форма записується літералами об'єктів замість стіни з new. Варіант nonNullable створює контроли, які не можуть містити null, тож reset() повертає їх до початкового значення, а не до null. Одне це налаштування прибирає найпоширеніше джерело перевірок на null у коді форм - і саме його хочеться майже завжди.",
    },
    code: 'private readonly fb = inject(FormBuilder);\n\nprotected readonly form = this.fb.nonNullable.group({\n  email: ["", [Validators.required, Validators.email]],\n  address: this.fb.nonNullable.group({\n    city: [""],\n    zip: [""],\n  }),\n});\n\nthis.form.reset();   // back to "" - not to null',
  },
  {
    id: 'q-typed-forms',
    category: 'forms',
    q: {
      en: 'What do typed reactive forms give you, and where does the type come from?',
      uk: 'Що дають типізовані реактивні форми і звідки береться тип?',
    },
    a: {
      en: 'form.value, getRawValue, setValue and the controls object are all typed, so a renamed field or a wrong value type fails at compile time instead of producing undefined at runtime. The type is inferred from the initial structure - you do not declare it - which means the structure has to be known when the group is created. That is also the reason a dynamic group needs FormRecord or an explicit generic.',
      uk: "form.value, getRawValue, setValue і об'єкт controls типізовані, тож перейменоване поле чи неправильний тип значення падають під час компіляції, а не дають undefined під час виконання. Тип виводиться з початкової структури - оголошувати його не треба, - а отже структура має бути відома в момент створення групи. Саме тому динамічній групі потрібен FormRecord або явний дженерик.",
    },
    code: 'const form = this.fb.nonNullable.group({ email: [""], age: [0] });\n\nform.value.email;        // string | undefined\nform.controls.age;       // FormControl<number>\n\nform.setValue({ email: "a@b.c", age: "42" });\n// error: string is not assignable to number\n\nform.get("emial");       // typed as AbstractControl | null - still stringly typed',
  },
  {
    id: 'q-nullable-form-controls',
    category: 'forms',
    q: {
      en: 'Why is a FormControl value nullable by default, and how do you avoid that?',
      uk: 'Чому значення FormControl за замовчуванням може бути null і як цього уникнути?',
    },
    a: {
      en: 'Because reset() has always set a control back to null unless told otherwise, so the type has to admit it. Pass nonNullable: true, or build through fb.nonNullable, and reset() restores the initial value instead - the type then excludes null and the null checks disappear. It is opt-in rather than the default for backwards compatibility, not because it is the better behaviour.',
      uk: 'Бо reset() завжди повертав контрол до null, якщо не сказано інакше, тож тип мусить це допускати. Передай nonNullable: true або будуй через fb.nonNullable - і reset() відновлюватиме початкове значення, а тип виключить null, і перевірки на нього зникнуть. Це опція, а не типова поведінка, суто через зворотну сумісність, а не тому, що так краще.',
    },
    code: 'const a = new FormControl("start");\na.reset();\na.value;   // null - and the type is string | null\n\nconst b = new FormControl("start", { nonNullable: true });\nb.reset();\nb.value;   // "start" - and the type is string',
  },
  {
    id: 'q-setvalue-vs-patchvalue',
    category: 'forms',
    q: {
      en: 'What is the difference between setValue and patchValue?',
      uk: 'Яка різниця між setValue і patchValue?',
    },
    a: {
      en: 'setValue demands the complete structure and throws if a key is missing or unexpected; patchValue updates what it recognises and silently ignores the rest. Use setValue when you have a whole object, precisely because the throw catches a mismatch between form and API. Use patchValue for partial updates - and be aware that a typo in a key is then a silent no-op rather than an error.',
      uk: "setValue вимагає повної структури і кидає помилку, якщо ключа бракує або він зайвий; patchValue оновлює те, що впізнав, і мовчки ігнорує решту. Бери setValue, коли маєш цілий об'єкт, - саме тому, що виняток ловить розбіжність між формою і API. Бери patchValue для часткових оновлень і памʼятай, що друкарська помилка в ключі тоді буде тихим неспрацюванням, а не помилкою.",
    },
    code: 'form.setValue({ email: "a@b.c", name: "Ada" });   // must be complete\nform.setValue({ email: "a@b.c" });                // throws: missing "name"\n\nform.patchValue({ email: "a@b.c" });              // fine\nform.patchValue({ emial: "a@b.c" });              // silently does nothing',
  },
  {
    id: 'q-form-state-flags',
    category: 'forms',
    q: {
      en: 'What do touched, dirty, pristine and untouched mean, and which do you use to show an error?',
      uk: 'Що означають touched, dirty, pristine і untouched і який з них використовувати для показу помилки?',
    },
    a: {
      en: 'Touched means the control has been blurred; dirty means its value has been changed by the user. Pristine and untouched are their opposites. Show an error when the control is invalid and touched, so a user is not told off for a field they have not reached yet - and additionally after a submit attempt, since an untouched required field is exactly what a submit needs to complain about.',
      uk: "touched означає, що з контрола йшов фокус; dirty - що користувач змінив його значення. pristine і untouched - їхні протилежності. Показуй помилку, коли контрол invalid і touched, щоб користувача не сварили за поле, до якого він ще не дійшов, - і додатково після спроби надіслати форму, бо саме про недоторкане обов'язкове поле сабміт і має поскаржитися.",
    },
    code: '@if (email.invalid && (email.touched || submitted())) {\n  <p class="error" id="email-error">Enter a valid email address.</p>\n}\n\n// Marking everything after a failed submit is the usual companion:\nprotected submit(): void {\n  this.form.markAllAsTouched();\n  if (this.form.invalid) return;\n}',
  },
  {
    id: 'q-ngmodel-css-classes',
    category: 'forms',
    q: {
      en: 'Which state CSS classes does Angular put on a form control?',
      uk: 'Які CSS-класи стану Angular додає до елемента керування формою?',
    },
    a: {
      en: 'ng-valid and ng-invalid, ng-touched and ng-untouched, ng-dirty and ng-pristine, plus ng-pending while an async validator is running. They are added to the element automatically, which makes it tempting to style ng-invalid directly - do not, or a required field is red before it has been touched. Combine the classes so the styling matches the rule you would apply in the template.',
      uk: "ng-valid і ng-invalid, ng-touched і ng-untouched, ng-dirty і ng-pristine, а також ng-pending, доки виконується асинхронний валідатор. Вони додаються до елемента автоматично, і це спокушає стилізувати ng-invalid напряму - не варто, бо тоді обов'язкове поле червоніє ще до першого дотику. Поєднуй класи так, щоб стилі відповідали тому самому правилу, яке ти написав би в шаблоні.",
    },
    code: '/* Wrong: red before the user has done anything */\ninput.ng-invalid { border-color: red; }\n\n/* Right: the same rule the template uses */\ninput.ng-invalid.ng-touched { border-color: red; }\n\ninput.ng-pending { opacity: 0.7; }   /* async validation in flight */',
  },
  {
    id: 'q-form-reset',
    category: 'forms',
    q: {
      en: 'What does reset() actually reset, and how do you reset to specific values?',
      uk: 'Що насправді скидає reset() і як скинути до конкретних значень?',
    },
    a: {
      en: 'It clears the value and, just as importantly, the interaction state: the form becomes pristine and untouched again, so error messages keyed on touched disappear. Pass an object to reset to specific values instead of empty ones. Note that setting values by hand does not restore the pristine state, which is why a form that was cleared field by field still shows its errors.',
      uk: "Він очищає значення і, що не менш важливо, стан взаємодії: форма знову стає pristine і untouched, тож повідомлення про помилки, зав'язані на touched, зникають. Передай об'єкт, щоб скинути до конкретних значень, а не до порожніх. Врахуй, що присвоєння значень вручну не відновлює стан pristine, - саме тому форма, очищена поле за полем, усе ще показує свої помилки.",
    },
    code: 'this.form.reset();                          // empty (or initial, if nonNullable)\nthis.form.reset({ role: "viewer" });        // reset to specific values\n\n// Clears the value but keeps the form dirty and touched - errors stay visible\nthis.form.setValue({ email: "", name: "" });',
  },
  {
    id: 'q-validator-types',
    category: 'forms',
    q: {
      en: 'What is the difference between a synchronous and an asynchronous validator?',
      uk: 'Яка різниця між синхронним і асинхронним валідатором?',
    },
    a: {
      en: 'A sync validator returns errors or null immediately; an async validator returns an Observable or Promise of the same and is used for checks needing a server, such as whether a username is taken. Async validators run only after every sync validator passes, which avoids pointless requests for an obviously empty field, and the control sits in the PENDING state meanwhile - so a submit button bound to invalid alone will be enabled at the wrong moment.',
      uk: "Синхронний валідатор одразу повертає помилки або null; асинхронний повертає Observable чи Promise того самого і потрібен для перевірок із сервером, наприклад чи зайняте ім'я користувача. Асинхронні виконуються лише після того, як пройшли всі синхронні, - це уникає безглуздих запитів для очевидно порожнього поля, - а контрол тим часом перебуває у стані PENDING, тож кнопка, прив'язана лише до invalid, увімкнеться не в той момент.",
    },
    code: 'new FormControl("", {\n  validators: [Validators.required],              // must pass first\n  asyncValidators: [uniqueEmailValidator()],      // only then this runs\n});\n\n<!-- PENDING is neither valid nor invalid - handle it explicitly -->\n<button [disabled]="form.invalid || form.pending">Save</button>',
  },
  {
    id: 'q-builtin-validators',
    category: 'forms',
    q: {
      en: 'Which built-in validators ship with Angular, and what are their limits?',
      uk: 'Які вбудовані валідатори постачає Angular і які в них обмеження?',
    },
    a: {
      en: 'required, requiredTrue, min, max, minLength, maxLength, pattern, email and nullValidator. The limits matter: minLength does nothing to a number, email accepts addresses a mail server would reject, and pattern anchors the expression at both ends, so a fragment you expected to match anywhere will not. None of them replaces server-side validation - they are a user-experience feature, not a security boundary.',
      uk: "required, requiredTrue, min, max, minLength, maxLength, pattern, email і nullValidator. Обмеження важливі: minLength нічого не робить із числом, email пропускає адреси, які поштовий сервер відхилить, а pattern прив'язує вираз до обох кінців рядка, тож фрагмент, який ти очікував знайти будь-де, не збігатиметься. Жоден з них не замінює валідацію на сервері - це зручність для користувача, а не межа безпеки.",
    },
    code: 'new FormControl("", [\n  Validators.required,\n  Validators.minLength(8),          // ignored on a number value\n  Validators.pattern(/[A-Z]/),      // anchored: matches only a single capital\n]);\n\n// What you probably meant:\nValidators.pattern(/.*[A-Z].*/);',
  },
  {
    id: 'q-custom-validator',
    category: 'forms',
    q: {
      en: 'How do you write a custom validator, and what shape must it return?',
      uk: 'Як написати власний валідатор і яку структуру він має повертати?',
    },
    a: {
      en: 'A function taking the control and returning null when valid, or an object whose keys are error names, when not. The keys are the API: the template looks them up with hasError, so name them for the rule rather than the field. Put useful detail in the value - the required length, the allowed range - so the message can be written once and stay accurate.',
      uk: "Це функція, що приймає контрол і повертає null, коли все гаразд, або об'єкт, ключі якого є іменами помилок, коли ні. Ключі і є API: шаблон шукає їх через hasError, тож називай їх за правилом, а не за полем. Клади в значення корисні деталі - потрібну довжину, дозволений діапазон, - щоб повідомлення можна було написати один раз і воно лишалося точним.",
    },
    code: 'export function minWords(min: number): ValidatorFn {\n  return (control: AbstractControl): ValidationErrors | null => {\n    const words = String(control.value ?? "").trim().split(/\\s+/).filter(Boolean);\n    return words.length >= min ? null : { minWords: { required: min, actual: words.length } };\n  };\n}\n\n@if (bio.hasError("minWords"); as error) {\n  <p>At least {{ bio.getError("minWords").required }} words, please.</p>\n}',
  },
  {
    id: 'q-cross-field-validator',
    category: 'forms',
    q: {
      en: 'How do you validate two fields against each other, such as password confirmation?',
      uk: 'Як валідувати два поля одне проти одного, наприклад підтвердження пароля?',
    },
    a: {
      en: 'Put the validator on the group that contains both, since a control validator only sees its own value. The error then lands on the group, not on either field, which is the part people miss - the template has to read it from the group, or you set it on the confirm control by hand so it shows in the right place.',
      uk: 'Постав валідатор на групу, яка містить обидва поля, бо валідатор контрола бачить лише власне значення. Помилка тоді потрапляє на групу, а не на якесь із полів, - і саме це зазвичай упускають: шаблон має читати її з групи, або ж ти сам ставиш її на контрол підтвердження, щоб вона показалася в правильному місці.',
    },
    code: 'export const passwordsMatch: ValidatorFn = (group) => {\n  const password = group.get("password")?.value;\n  const confirm = group.get("confirm")?.value;\n  return password === confirm ? null : { passwordsMatch: true };\n};\n\nthis.fb.nonNullable.group(\n  { password: [""], confirm: [""] },\n  { validators: passwordsMatch },   // on the group, not on a control\n);\n\n@if (form.hasError("passwordsMatch") && form.get("confirm")?.touched) { ... }',
  },
  {
    id: 'q-async-validator-performance',
    category: 'forms',
    q: {
      en: 'How do you keep an async validator from hammering the server on every keystroke?',
      uk: 'Як не дати асинхронному валідатору бити по серверу на кожне натискання клавіші?',
    },
    a: {
      en: 'Two ways, and you usually want both. Set updateOn: "blur" so validation runs when the user leaves the field rather than as they type. Inside the validator, debounce and switchMap so an in-flight request is cancelled when a newer value arrives - without switchMap, a slow earlier response can land after a fast later one and mark a valid value invalid.',
      uk: 'Двома способами, і зазвичай потрібні обидва. Постав updateOn: "blur", щоб валідація виконувалася при виході з поля, а не під час набору. Усередині валідатора став debounce і switchMap, щоб запит у польоті скасовувався, коли надходить новіше значення: без switchMap повільна рання відповідь може прийти після швидкої пізнішої і позначити правильне значення як помилкове.',
    },
    code: 'export function uniqueEmail(users: UserService): AsyncValidatorFn {\n  return (control) =>\n    timer(300).pipe(\n      switchMap(() => users.isEmailTaken(control.value)),   // cancels the previous\n      map((taken) => (taken ? { emailTaken: true } : null)),\n      first(),                                              // async validators must complete\n    );\n}\n\nnew FormControl("", { asyncValidators: [uniqueEmail(users)], updateOn: "blur" });',
  },
  {
    id: 'q-update-on-strategy',
    category: 'forms',
    q: {
      en: 'What does the updateOn option do, and when would you set it to blur or submit?',
      uk: 'Що робить опція updateOn і коли варто ставити її в blur або submit?',
    },
    a: {
      en: 'It decides when a control updates its value and runs validation: on every change by default, on blur, or only on submit. Blur suits expensive validation and fields where per-keystroke errors are hostile - an email is invalid for most of the time you spend typing it. Submit suits a form that should say nothing until the user is finished. Note that with anything but change, valueChanges stops emitting as the user types.',
      uk: 'Вона визначає, коли контрол оновлює значення і запускає валідацію: за замовчуванням на кожну зміну, на blur або лише на сабміт. Blur пасує дорогій валідації та полям, де помилки на кожен символ ворожі: адреса пошти є невалідною більшу частину часу, поки ти її набираєш. Submit пасує формі, яка має мовчати, доки користувач не завершив. Врахуй, що з будь-яким варіантом, крім change, valueChanges перестає емітити під час набору.',
    },
    code: 'new FormControl("", { updateOn: "blur" });\n\n// For the whole form at once:\nthis.fb.group({ email: [""], name: [""] }, { updateOn: "submit" });\n\n// Consequence: with updateOn other than "change",\n// valueChanges no longer fires per keystroke.',
  },
  {
    id: 'q-valuechanges-statuschanges',
    category: 'forms',
    q: {
      en: 'What do valueChanges and statusChanges emit, and what has to be cleaned up?',
      uk: 'Що емітять valueChanges і statusChanges і що потрібно за ними прибирати?',
    },
    a: {
      en: 'valueChanges emits the new value on every update; statusChanges emits VALID, INVALID, PENDING or DISABLED. Neither ever completes, so a subscription to them lives until you end it - use takeUntilDestroyed or the async pipe. They also emit when you update the form in code, which is how an innocent-looking patchValue inside a valueChanges handler becomes an infinite loop.',
      uk: 'valueChanges емітить нове значення на кожне оновлення; statusChanges емітить VALID, INVALID, PENDING або DISABLED. Жоден з них ніколи не завершується, тож підписка живе, доки ти сам її не припиниш, - бери takeUntilDestroyed або async pipe. Вони також емітять, коли ти оновлюєш форму з коду, - саме так невинний patchValue усередині обробника valueChanges стає нескінченним циклом.',
    },
    code: 'this.form.controls.country.valueChanges\n  .pipe(takeUntilDestroyed())\n  .subscribe((country) => this.loadRegions(country));\n\n// Infinite loop: the patch emits, the handler patches, and so on\nthis.form.valueChanges.subscribe(() => this.form.patchValue({ total: this.total() }));\n\n// Break it with emitEvent: false\nthis.form.patchValue({ total: this.total() }, { emitEvent: false });',
  },
  {
    id: 'q-emitevent-option',
    category: 'forms',
    q: {
      en: 'What does emitEvent: false do, and which bug does it usually prevent?',
      uk: 'Що робить emitEvent: false і який баг він зазвичай запобігає?',
    },
    a: {
      en: 'It applies the change without emitting on valueChanges or statusChanges. The bug it prevents is the feedback loop: code that reacts to a change and writes back to the form re-triggers itself forever. Use it for a programmatic update the rest of the app should not treat as user input, and not as a blanket habit - a silenced update is also invisible to anything legitimately listening.',
      uk: "Він застосовує зміну, не емітячи у valueChanges чи statusChanges. Баг, який він запобігає, - це цикл зворотного зв'язку: код, що реагує на зміну і пише назад у форму, нескінченно перезапускає сам себе. Використовуй його для програмного оновлення, яке решта застосунку не має вважати введенням користувача, а не як звичку на все підряд: приглушене оновлення невидиме й для тих, хто слухає його законно.",
    },
    code: 'this.form.controls.total.setValue(next, { emitEvent: false });\nthis.form.controls.email.disable({ emitEvent: false });\n\n// Also available on:  enable, reset, patchValue, setValue,\n// addControl, removeControl, updateValueAndValidity',
  },
  {
    id: 'q-disabled-control-pitfall',
    category: 'forms',
    q: {
      en: 'Why does binding the disabled attribute on a reactive control warn, and what is the correct way?',
      uk: "Чому прив'язка атрибута disabled на реактивному контролі викликає попередження і як робити правильно?",
    },
    a: {
      en: "Because disabled is control state, not markup state - the control owns it, and a template binding sets it behind the control's back, so the two disagree. Angular warns because the value you bound may be silently overwritten the next time the form updates. Call disable() and enable() on the control instead, which keeps validation and value in step with it.",
      uk: "Бо disabled - це стан контрола, а не розмітки: ним володіє контрол, а прив'язка в шаблоні задає його в обхід контрола, тож обидва розходяться. Angular попереджає, бо прив'язане значення може бути тихо перезаписане при наступному оновленні форми. Викликай disable() і enable() на контролі - тоді валідація і значення лишаються з ним узгодженими.",
    },
    code: '<!-- Warning: it looks like you want to disable a reactive form control -->\n<input formControlName="email" [disabled]="isLocked()" />\n\n// The control owns the state\neffect(() => {\n  const control = this.form.controls.email;\n  this.isLocked() ? control.disable() : control.enable();\n});',
  },
  {
    id: 'q-disabled-value-excluded',
    category: 'forms',
    q: {
      en: 'Why is a disabled control missing from form.value, and how do you get it back?',
      uk: 'Чому вимкнений контрол відсутній у form.value і як його повернути?',
    },
    a: {
      en: 'Because a disabled control is excluded from validation and from the aggregated value by design - the assumption being that if the user cannot edit it, the server should not receive it. Use getRawValue() when you do need it. This is a classic production bug: a field disabled for display reasons quietly stops being submitted, and the API starts receiving an object missing a key.',
      uk: "Бо вимкнений контрол за задумом виключено з валідації та з агрегованого значення: припускається, що коли користувач не може його редагувати, серверу воно не потрібне. Коли ж воно таки потрібне, бери getRawValue(). Це класичний продакшен-баг: поле, вимкнене з міркувань подання, тихо перестає надсилатися, і API починає отримувати об'єкт без одного ключа.",
    },
    code: 'form.controls.role.disable();\n\nform.value;        // { email: "a@b.c" }        - role is gone\nform.getRawValue(); // { email: "a@b.c", role: "admin" }\n\n// The same applies to validity: a disabled invalid control does not\n// make the form invalid.',
  },
  {
    id: 'q-control-value-accessor',
    category: 'forms',
    q: {
      en: 'What is ControlValueAccessor, and what does implementing it let you do?',
      uk: 'Що таке ControlValueAccessor і що дає його реалізація?',
    },
    a: {
      en: 'It is the bridge between a form control and a component, so your own component can be used with formControlName exactly like an input. You implement four methods: writeValue to receive a value, registerOnChange and registerOnTouched to report back, and setDisabledState. Register it as an NG_VALUE_ACCESSOR multi provider - forgetting that is why a custom control silently never receives anything.',
      uk: 'Це міст між контролом форми і компонентом, завдяки якому твій власний компонент можна використовувати з formControlName точно як input. Ти реалізуєш чотири методи: writeValue для отримання значення, registerOnChange і registerOnTouched для повідомлення назад, і setDisabledState. Зареєструй його як multi-провайдер NG_VALUE_ACCESSOR - забути про це і є причиною того, що власний контрол тихо нічого не отримує.',
    },
    code: '@Component({\n  selector: "app-rating",\n  templateUrl: "./rating.html",\n  providers: [\n    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RatingComponent), multi: true },\n  ],\n})\nexport class RatingComponent implements ControlValueAccessor {\n  protected readonly value = signal(0);\n  private onChange: (value: number) => void = () => {};\n\n  writeValue(value: number): void { this.value.set(value ?? 0); }\n  registerOnChange(fn: (value: number) => void): void { this.onChange = fn; }\n  registerOnTouched(fn: () => void): void {}\n  setDisabledState(isDisabled: boolean): void {}\n}\n\n<app-rating formControlName="score" />',
  },
  {
    id: 'q-dynamic-forms',
    category: 'forms',
    q: {
      en: 'How do you build a form whose fields are described by data rather than markup?',
      uk: 'Як побудувати форму, поля якої описані даними, а не розміткою?',
    },
    a: {
      en: 'Describe each field as an object, build the controls from that description in a loop, and render with a @switch on the field kind. The gain is that a new field is a data change rather than a code change - which is the whole point when the schema comes from a backend. The cost is that types get weaker, since the shape is unknown at compile time, so validate the description itself as it arrives.',
      uk: "Опиши кожне поле об'єктом, побудуй контроли з цього опису в циклі й рендери через @switch за видом поля. Виграш у тому, що нове поле стає зміною даних, а не коду, - і в цьому вся суть, коли схема приходить з бекенду. Ціна - слабші типи, бо структура невідома на етапі компіляції, тож валідуй сам опис у момент отримання.",
    },
    code: 'interface Field {\n  key: string;\n  kind: "text" | "number" | "select";\n  required?: boolean;\n  options?: string[];\n}\n\nprotected readonly form = computed(() =>\n  new FormRecord(\n    Object.fromEntries(\n      this.fields().map((field) => [\n        field.key,\n        new FormControl("", field.required ? [Validators.required] : []),\n      ]),\n    ),\n  ),\n);',
  },
  {
    id: 'q-form-accessibility',
    category: 'forms',
    q: {
      en: 'How do you make form errors accessible to a screen reader?',
      uk: 'Як зробити помилки форми доступними для екранного читача?',
    },
    a: {
      en: 'Four things, and all four are required. Every input needs a real label associated with it. An invalid input needs aria-invalid. The error message needs an id, referenced from the input with aria-describedby, so it is announced when the field is focused. And the message container needs a live region, or a message that appears after focus has moved is never announced at all. Colour alone is never sufficient.',
      uk: "Чотири речі, і потрібні всі чотири. Кожне поле має справжню мітку, пов'язану з ним. Невалідне поле має aria-invalid. Повідомлення про помилку має id, на який поле посилається через aria-describedby, щоб воно оголошувалося при фокусі. І контейнер повідомлення має бути живою областю, інакше повідомлення, що з'явилося після переходу фокуса, не оголоситься взагалі. Самого лише кольору ніколи не досить.",
    },
    code: '<label for="email">Email</label>\n<input\n  id="email"\n  formControlName="email"\n  [attr.aria-invalid]="email.invalid && email.touched"\n  [attr.aria-describedby]="email.invalid && email.touched ? \'email-error\' : null"\n/>\n\n<p id="email-error" role="alert" class="error">\n  @if (email.hasError("email")) { Enter a valid email address. }\n</p>',
  },
  {
    id: 'q-forms-with-signals',
    category: 'forms',
    q: {
      en: 'How do reactive forms fit together with signals today?',
      uk: 'Як реактивні форми поєднуються з сигналами на сьогодні?',
    },
    a: {
      en: 'The form model is still observable-based, so the bridge is toSignal over valueChanges and statusChanges - remember to seed it with the current value, since valueChanges only emits on the next change. From there, derived state is a computed like any other. A signal-based forms API is in development and experimental; treat reactive forms as the production answer and this bridge as the way to use them from signal-based code.',
      uk: 'Модель форми досі побудована на observable-ах, тож містком є toSignal над valueChanges і statusChanges - не забудь задати початкове значення, бо valueChanges емітить лише при наступній зміні. Далі похідний стан - це звичайний computed. API форм на сигналах розробляється і є експериментальним; вважай реактивні форми відповіддю для продакшену, а цей місток - способом користуватися ними з коду на сигналах.',
    },
    code: 'private readonly form = this.fb.nonNullable.group({ email: [""], name: [""] });\n\n// Seed it: valueChanges does not replay the current value\nprotected readonly value = toSignal(this.form.valueChanges, {\n  initialValue: this.form.getRawValue(),\n});\n\nprotected readonly canSubmit = computed(() => this.value().email.length > 0);',
  },
];
