angular.module('mgo-angular-wizard').directive('wzStep', ['$rootScope', function($rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            wzTitle: '@',
            title: '@',
            canenter : '=',
            canexit : '=',
            orderIndex:'@'
        },
        require: '^wizard',
        templateUrl: function(element, attributes) {
          return attributes.template || "step.html";
        },
        link: function($scope, $element, $attrs, wizard) {
            $scope.title = $scope.title || $scope.wzTitle;

            //for nested wizards. Add step when tempate for wizard is ready.
            if (wizard.transcluded){
                wizard.addStep($scope);
            }
            else {
                $rootScope.$on('mgo-angular-wizard.transcluded', function($event, wzName){
                    if (wizard.name==wzName)  wizard.addStep($scope);
                });
            }
        }
    };
}]);
