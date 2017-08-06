(function(){

  var testeApp = angular.module('testeApp');

  /*
    Controller que pega os dados do banco de dados no formato
    JSON.
  */
  testeApp.controller('VeiculoCtrl', ['VeiculoService', '$routeParams', '$scope',
    function(VeiculoService, routeParams, scope){
      /*
        Fazemos uso do VeiculoService para pegar todos os veiculos no
        "banco de dados":
      */

      scope.ctrlVal = 'hola';

      scope.getData = function(){
        scope.veiculos = VeiculoService.query();
      };

  }]);

  testeApp.controller('Ctrl', ['$scope', function(scope){
    scope.texto = 'Mundo';
  }]);

  testeApp.controller('PanelTabelaCtrl', ['$scope', function(scope){
    $('#tabela').DataTable({
      "dom": 'Rrt<"row-fluid"<"#id1"<"#a.col-md-4"i><"col-md-4"l><"#b.col-md-4"p>>>'
    });
  }]);

  testeApp.controller('MenuCtrl', ['$scope', function(scope){
    scope.texto = 'Aqui iria algo relacionado con el menu :)';
  }]);

  testeApp.controller('ValoresCtrl', ['ListaService', '$scope', function(ListaService, scope){
    scope.valores = ListaService.query();
  }]);

  testeApp.controller('GraphCtrl', ['GraphService', '$scope', function(GraphService, scope){
    scope.criar = function(){
      var promise = GraphService.query().$promise.then(function(result){
        new Morris.Line({
          // ID of the element in which to draw the chart.
          element: 'myfirstchart',
          // Chart data records -- each entry in this array corresponds to a point on
          // the chart.
          data: result,
          // The name of the data record attribute that contains x-values.
          xkey: 'year',
          // A list of names of data record attributes that contain y-values.
          ykeys: ['value'],
          // Labels for the ykeys -- will be displayed when you hover over the
          // chart.
          labels: ['Value'],
          //Enable resizing (I guess):
          resize: true
        });  
      });
    }
  }]);

  testeApp.controller('MainCtrl', ['PhoneNumberService', '$scope', function (PhoneNumberService, scope) {
    scope.showModal = false;
    //$scope.name = 'Camila Dias';
    //$scope.number = '+55 31 9208-6705';
    scope.phones = PhoneNumberService.query();
    scope.toggleModal = function(){
        scope.showModal = !scope.showModal;
    };
  }]);

  //#########################################################
  //  Modal using UI Bootstrap:
  //#########################################################
  testeApp.controller('ModalDemoCtrl', ['ItemService', '$scope', '$modal', '$log', function (ItemService, scope, modal, log) {

    scope.items = ItemService.query();

    scope.animationsEnabled = true;

    scope.open = function (size) {

      var modalInstance = modal.open({
        animation: scope.animationsEnabled,
        templateUrl: 'templates/myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        scope.selected = selectedItem;
      }, function () {
        log.info('Modal dismissed at: ' + new Date());
      });
    };

    scope.toggleAnimation = function () {
      scope.animationsEnabled = !scope.animationsEnabled;
    };

  }]);


  // Please note that $modalInstance represents a modal
  // window (instance) dependency.
  // It is not the same as the $modal service used above.
  testeApp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function (scope, modalInstance, items) {

    scope.items = items;
    scope.selected = {
      item: scope.items[0]
    };

    scope.ok = function () {
      modalInstance.close(scope.selected.item);
    };

    scope.cancel = function () {
      modalInstance.dismiss('cancel');
    };
  }]);

})();
