(function(){

  var testeApp = angular.module('testeApp', ['ui.bootstrap', 'services', 'ngRoute']);

  var config = function ($routeProvider) {
    $routeProvider
      .when('/componentes', {
        templateUrl: 'templates/componentes.html'
      })
      .when('/css-testing', {
        templateUrl: 'templates/css-testing.html'
      })
      .when('/panel-tabela', {
        templateUrl: 'templates/panel-tabela.html',
        controller: 'PanelTabelaCtrl'
      })
      .when('/veiculos', {
        templateUrl: 'templates/veiculos.html'
      })
      .when('/directives-shared-scope', {
        templateUrl: 'templates/directives-template.html',
        controller: 'VeiculoCtrl'
      })
      .otherwise({redirectTo: '/'});
  }

  testeApp.config(config);
})();
