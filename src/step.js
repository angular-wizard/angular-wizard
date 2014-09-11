angular.module('mgo-angular-wizard').directive('wzStep', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            displayTitle: '@',
            wzTitle: '@',
            title: '@'
        },
        require: '^wizard',
        templateUrl: function(element, attributes) {
          return attributes.template || "step.html";
        },
        link: function($scope, $element, $attrs, wizard) {
            $scope.title = $scope.title || $scope.wzTitle;
            $scope.displayTitle = $scope.displayTitle || $scope.title;
            wizard.addStep($scope);
        },
        controller: ["$scope", "$element", function ($scope, $element) {
            $scope.Forms = [];
            this.addForm = function (form) {
                $scope.Forms.push(form);
            };
        }]
    };
});
