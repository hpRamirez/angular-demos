(function(){
    var testeApp = angular.module('testeApp');
    
    testeApp.directive('testShared', function(){
    return{

      restrict: 'E',

      templateUrl: 'templates/test-template.html',

      link: function(scope, element, attrs){
        scope.$watch('veiculos', function(nuevo, viejo){
          console.log('data fetched.');
        });
      }
    }
  });

  testeApp.directive('testIsolated', function(){
    return{

      restrict: 'E',

      templateUrl: 'templates/test-isolated-template.html',

      scope: {
        val: '='
      },

      link: function(scope, element, attrs){
        scope.$watch('val', function(novo, velho){
          console.log(novo + ' ' + velho);
        });
      }
    }
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
