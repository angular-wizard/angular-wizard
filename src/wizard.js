angular.module('mgo-angular-wizard').directive('wizard', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            currentStep: '=',
            onFinish: '&',
            hideIndicators: '=',
            editMode: '=',
            name: '@'
        },
        templateUrl: 'wizard.html',
        controller: ['$scope', '$element', 'WizardHandler', function($scope, $element, WizardHandler) {
            
            WizardHandler.addWizard($scope.name || WizardHandler.defaultName, this);
            $scope.$on('$destroy', function() {
                WizardHandler.removeWizard($scope.name || WizardHandler.defaultName);
            });
            
            $scope.steps = [];
            
            $scope.$watch('currentStep', function(step) {
                if (!step) return;
                
                if ($scope.selectedStep && $scope.selectedStep.title !== $scope.currentStep) {
                    $scope.goTo(_.find($scope.steps, {title: $scope.currentStep}));
                }
                
            });
            
            $scope.$watch('[editMode, steps.length]', function() {
                var editMode = $scope.editMode;
                if (_.isUndefined(editMode) || _.isNull(editMode)) return;
                
                if (editMode) {
                    _.each($scope.steps, function(step) {
                        step.completed = true;
                    });
                }
            }, true);
            
            this.addStep = function(step) {
                $scope.steps.push(step);
                if ($scope.steps.length === 1) {
                    $scope.goTo($scope.steps[0]);
                }
            };
            
            $scope.goTo = function(step) {
                unselectAll();
                $scope.selectedStep = step;
                if (!_.isUndefined($scope.currentStep)) {
                    $scope.currentStep = step.title;    
                }
                step.selected = true;
            };
            
            function unselectAll() {
                _.each($scope.steps, function (step) {
                    step.selected = false;
                });
                $scope.selectedStep = null;
            }
            
            this.next = function(draft) {
                var index = _.indexOf($scope.steps , $scope.selectedStep);
                if (!draft) {
                    $scope.selectedStep.completed = true;
                }
                if (index === $scope.steps.length - 1) {
                    this.finish();
                } else {
                    $scope.goTo($scope.steps[index + 1]);
                }
            };
            
            this.goTo = function(step) {
                var stepTo;
                if (_.isNumber(step)) {
                    stepTo = $scope.steps[step];
                } else {
                    stepTo = _.find($scope.steps, {title: step});
                }
                $scope.goTo(stepTo);
            };
            
            this.finish = function() {
                $scope.onFinish && $scope.onFinish(); 
            };
            
            this.cancel = this.previous = function() {
                var index = _.indexOf($scope.steps , $scope.selectedStep);
                if (index === 0) {
                    throw new Error("Can't go back. It's already in step 0");
                } else {
                    $scope.goTo($scope.steps[index - 1]);
                }
            }
            
            
        }]
    }
});
