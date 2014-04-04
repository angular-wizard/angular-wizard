angular.module('mgo-angular-wizard').directive('wzStep', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            title: '@',
            validateStep: '&'
        },
        require: '^wizard',
        templateUrl: function(element, attributes) {
          return attributes.template || "step.html";
        },
        link: function($scope, $element, $attrs, wizard) {
            // If the validateStep isn't passed, the validate function must return true
            if (_.isUndefined($attrs['validateStep']))
                $scope.validateStep = function() { return true; };
            wizard.addStep($scope);
        }
    }
});
