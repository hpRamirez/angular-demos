(function(){

  var testeApp = angular.module('testeApp', ['ui.bootstrap', 'ngRoute']);

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
      .otherwise({redirectTo: '/'});
  }

  testeApp.config(config);

    /*
    Controller que pega os dados do banco de dados no formato
    JSON.
  */
  testeApp.controller('VeiculoCtrl', function($http, $scope){

    /*
      Esta função pega os dados dos veiculos pelo ajax,
      e chama a função setVeiculos() assim que chegarem,
      passando a data retornada para ela através do
      parâmetro data:
    */
    $http.get('http://localhost:8082/veiculos')
      .success(function(data){
        console.log('deu');
        $scope.veiculos = data.data;
      });
  });

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

  testeApp.controller('ValoresCtrl', ['$scope', function(scope){
    scope.valores = [
      {data: 'data1', label:'label1'},
      {data: 'data2', label:'label2'},
      {data: 'data3', label:'label3'}];
  }]);

  testeApp.controller('GraphCtrl', ['$scope', function(scope){
    scope.criar = function(){
      new Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'myfirstchart',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: [
          { year: '2008', value: 20 },
          { year: '2009', value: 10 },
          { year: '2010', value: 5 },
          { year: '2011', value: 5 },
          { year: '2012', value: 20 }
        ],
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
    }
  }]);

  //#########################################################
  //  Modal using UI Bootstrap:
  //#########################################################
  testeApp.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'templates/myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

  });

  // Please note that $modalInstance represents a modal
  // window (instance) dependency.
  // It is not the same as the $modal service used above.
  testeApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

  //#########################################################
  //  Modal as directive:
  //#########################################################
  testeApp.controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.name = 'Anna Zekendorf';
    $scope.number = '+58-424-5066159';
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
  });


  testeApp.directive('modal', function () {
    return {
      templateUrl: 'templates/modal-directive.html',
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

})();
