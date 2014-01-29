function wizardButtonDirective(action) {
    angular.module('mgo-angular-wizard')
        .directive(action, function($parse) {
            return {
                restrict: 'A',
                replace: false,
                require: '^wizard',
                link: function($scope, $element, $attrs, wizard) {
                    
                    $element.on("click", function(e) {
                        e.preventDefault();
                        $scope.$apply(function() {
                            var fn = $parse($attrs[action]);
                            fn && fn();
                            wizard[action]();
                        });
                    });
                }
            }
            });
}

wizardButtonDirective('next');
wizardButtonDirective('previous');
wizardButtonDirective('finish');
wizardButtonDirective('cancel');

