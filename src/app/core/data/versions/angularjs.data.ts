import { VersionEntry } from '../../models/content.model';

export const ANGULARJS: VersionEntry = {
  id: 'angularjs',
  label: 'AngularJS',
  year: 2010,
  title: {
    en: 'Two-way binding, and a scope that watched everything',
    uk: "Двостороннє зв'язування і scope, який стежив за всім",
  },
  points: [
    {
      id: 'angularjs-two-way-binding',
      head: { en: 'Two-way data binding', uk: "Двостороннє зв'язування даних" },
      body: {
        en: 'ng-model tied an input and a scope property together in both directions. It made forms trivial and made large apps hard: with no declared direction of flow, working out which of a dozen watchers had written a value meant reading all of them.',
        uk: "ng-model зв'язував інпут і властивість scope в обидва боки. Форми стали тривіальними, а великі застосунки - складними: напрямок потоку даних ніде не оголошувався, тож щоб зрозуміти, який із десятка watcher-ів записав значення, доводилося читати їх усі.",
      },
      code: '<input ng-model="user.name">\n<p>Hello {{ user.name }}</p>\n\n// no wiring between them: the input and the scope property are one value\n$scope.user = { name: "Ada" };',
    },
    {
      id: 'angularjs-digest-loop',
      head: { en: 'The digest loop', uk: 'Цикл digest' },
      body: {
        en: 'Change detection was dirty checking: $digest re-ran every watcher and repeated until two passes agreed, giving up after ten with an "infinite $digest loop" error. Anything that changed a scope outside Angular was invisible until someone called $apply.',
        uk: 'Change detection працював через dirty checking: $digest перезапускав кожен watcher і повторював, доки два проходи не збігалися, здаючись після десяти з помилкою "infinite $digest loop". Усе, що змінювало scope поза Angular, лишалося невидимим, доки хтось не викликав $apply.',
      },
      code: '$scope.$watch("user.name", (next, prev) => redraw(next));\n\n// changed outside Angular, so nothing redrew until the loop was told to run\nsetTimeout(() => {\n  $scope.$apply(() => {\n    $scope.user.name = "Grace";\n  });\n});',
    },
    {
      id: 'angularjs-scope-hierarchy',
      head: { en: 'Scopes inherited, and leaked', uk: 'Scope успадковувалися - і протікали' },
      body: {
        en: 'Child scopes prototypally inherited from their parent, so reading a value worked and writing one silently created a shadow copy on the child. The "always use a dot in ng-model" rule exists entirely because of this.',
        uk: 'Дочірні scope прототипно успадковували батьківський, тож читання значення працювало, а запис тихо створював тіньову копію на дочірньому. Правило "завжди став крапку в ng-model" існує виключно через це.',
      },
      code: '<div ng-if="editing">\n  <input ng-model="name">        <!-- writes to the CHILD scope. Lost. -->\n  <input ng-model="user.name">   <!-- writes through the object. Works. -->\n</div>',
    },
    {
      id: 'angularjs-events',
      head: { en: '$emit, $broadcast and $on', uk: '$emit, $broadcast і $on' },
      body: {
        en: 'Components talked to each other by firing events up ($emit) or down ($broadcast) the scope tree. It worked, and it made data flow untraceable: any scope could listen, so nothing declared who was talking to whom.',
        uk: 'Компоненти спілкувалися між собою, кидаючи події вгору ($emit) або вниз ($broadcast) деревом scope. Це працювало і робило потік даних невідстежуваним: слухати міг будь-який scope, тож ніде не було оголошено, хто з ким говорить.',
      },
      code: '$rootScope.$broadcast("user:changed", user);   // down to everyone\n$scope.$emit("row:selected", row);              // up to the ancestors\n\n$scope.$on("user:changed", (event, user) => { ... });',
    },
    {
      id: 'angularjs-directives',
      head: { en: 'Directives extended HTML', uk: 'Директиви розширювали HTML' },
      body: {
        en: 'The directive definition object - restrict, scope, link, compile, transclude - was how you added your own elements and attributes to the template language. The most powerful part of the framework, and the steepest: most of the confusion in an AngularJS codebase lived in isolate scope bindings.',
        uk: "Directive definition object - restrict, scope, link, compile, transclude - був способом додати власні елементи й атрибути до мови шаблонів. Найпотужніша частина фреймворку і найскладніша: більшість плутанини в кодовій базі AngularJS жила саме в прив'язках ізольованого scope.",
      },
      code: 'angular.module("app").directive("userCard", () => ({\n  restrict: "E",\n  scope: { user: "=", onPick: "&" },   // "=" two-way, "&" an expression to call\n  template: "<h3>{{ user.name }}</h3>",\n  link(scope, element, attrs) { /* DOM work goes here */ },\n}));',
    },
    {
      id: 'angularjs-di-by-name',
      head: { en: 'Injection by parameter name', uk: "Ін'єкція за іменем параметра" },
      body: {
        en: 'The injector read the argument names off a function to decide what to hand it, so a minifier that renamed them broke the app in production and nowhere else. The array form, and later ngAnnotate, existed only to survive that.',
        uk: 'Інжектор читав імена аргументів функції, щоб вирішити, що в неї передати, тож мініфікатор, який їх перейменовував, ламав застосунок у продакшені і більше ніде. Форма з масивом, а згодом ngAnnotate, існували лише щоб це пережити.',
      },
      code: '// breaks after minification: $http is renamed to "a"\nfunction Ctrl($http) {}\n\n// survives it: the names are data, not identifiers\nCtrl.$inject = ["$http"];\nangular.module("app").controller("Ctrl", ["$http", Ctrl]);',
    },
    {
      id: 'angularjs-service-factory-provider',
      head: { en: 'service, factory, provider, value', uk: 'service, factory, provider, value' },
      body: {
        en: 'Four ways to register the same thing, differing only in how the injector built it - a classic interview question with no interesting answer. Angular replaced all four with one @Injectable class.',
        uk: 'Чотири способи зареєструвати одне й те саме, що відрізнялися лише тим, як інжектор його створював, - класичне питання співбесіди без цікавої відповіді. Angular замінив усі чотири одним класом @Injectable.',
      },
      code: '.value("apiUrl", "/api")                          // the value itself\n.factory("api", ($http) => ({ get: ... }))        // what the function returns\n.service("Api", function ($http) { this.get = ... })  // new-ed by the injector\n.provider("api", function () { this.$get = ... }); // configurable at config time',
    },
    {
      id: 'angularjs-ng-repeat-track-by',
      head: { en: 'ng-repeat and track by', uk: 'ng-repeat і track by' },
      body: {
        en: 'Without track by, ng-repeat identified rows by value and rebuilt the DOM whenever the array was replaced - and threw on duplicates. The identity problem it exposed is the same one @for solves today with a mandatory track.',
        uk: "Без track by ng-repeat ідентифікував рядки за значенням і перебудовував DOM щоразу, коли масив замінювали, - а на дублікатах кидав помилку. Та сама проблема ідентичності сьогодні розв'язується обов'язковим track у @for.",
      },
      code: '<li ng-repeat="user in users track by user.id">{{ user.name }}</li>\n\n<!-- today, and no longer optional: -->\n@for (user of users(); track user.id) { <li>{{ user.name }}</li> }',
    },
  ],
};
