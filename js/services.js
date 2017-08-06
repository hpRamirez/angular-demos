(function(){
  'use strict';

  var services = angular.module('services', ['ngResource']);

  services.factory('VeiculoService',
    ['$resource',
    function(resource){
      return resource('https://product-test-server.herokuapp.com/veiculos/:id');
    }]);

  services.factory('ListaService',
    ['$resource',
    function(resource){
      return resource('https://product-test-server.herokuapp.com/lista/:id');
    }]);

  services.factory('GraphService',
    ['$resource',
    function(resource){
      return resource('https://product-test-server.herokuapp.com/graph_data/:id');
    }]);

  services.factory('PhoneNumberService',
    ['$resource',
    function(resource){
      return resource('https://product-test-server.herokuapp.com/phones/:id');
    }]);

  services.factory('ItemService',
    ['$resource',
    function(resource){
      return resource('https://product-test-server.herokuapp.com/items/:id');
    }]);

})();
