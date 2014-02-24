angular.module('mgo-angular-wizard').directive('wzStep', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            title: '@'
        },
        require: '^wizard',
        templateUrl: 'step.html',
        link: function($scope, $element, $attrs, wizard) {
            wizard.addStep($scope);
        }
    }
});
