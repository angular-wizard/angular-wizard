angular.module('mgo-angular-wizard').directive('wzStep', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            wzTitle: '@',
            canenter : '=',
            canexit : '=',
            disabled: '@?wzDisabled',
            description: '@',
            wzData: '=',
            wzOrder: '@?'
        },
        require: '^wizard',
        templateUrl: function(element, attributes) {
          return attributes.template || "step.html";
        },
        link: function ($scope, $element, $attrs, wizard) {
            $attrs.$observe('wzTitle', function (value) {
                $scope.title = $scope.wzTitle;
            });
            $scope.title = $scope.wzTitle;
            wizard.addStep($scope);
            $scope.$on('$destroy', function(){
                wizard.removeStep($scope);
            });
        }
    };
});
