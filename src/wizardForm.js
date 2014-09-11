angular.module('mgo-angular-wizard').directive('wzForm', function () {
    return {
        restrict: 'A',
        require: ['^wzStep', '^form'],
        link: function ($scope, $element, $attris, controllers) {
            var step = controllers && controllers.length > 0 ? controllers[0] : undefined;
            var form = controllers && controllers.length > 1 ? controllers[1] : undefined;
            if (step && form) step.addForm(form);
        }
    };
});