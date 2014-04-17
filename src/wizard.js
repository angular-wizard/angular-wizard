angular.module('mgo-angular-wizard').directive('wizard', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            currentStep: '=',
            onFinish: '&',
            hideIndicators: '=',
            validateAlways: '@',
            undoSteps: '@',
            editMode: '=',
            name: '@'
        },
        templateUrl: function(element, attributes) {
          return attributes.template || "wizard.html";
        },
        controller: ['$scope', '$element', 'WizardHandler', function($scope, $element, WizardHandler) {

            this.validateAlways = _.isUndefined($scope.validateAlways) ? false : $scope.$eval($scope.validateAlways);
            this.undoSteps = _.isUndefined($scope.undoSteps) ? false : $scope.$eval($scope.undoSteps);
            
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

            this.validStep = function(nextStep) {
                var validation = nextStep.validate();
                return _.isUndefined(validation) || validation;
            };

            this.doUndoSteps = function(nextStep) {
                if (!this.undoSteps)
                    return;
                var indexNextStep = _.indexOf($scope.steps , nextStep);
                var indexCurrentStep = _.indexOf($scope.steps, $scope.selectedStep);
                if (indexCurrentStep != -1 && indexNextStep != -1 && (indexNextStep < indexCurrentStep)) {
                    for (var i = indexNextStep; i <= indexCurrentStep; i++) {
                        $scope.steps[i].completed = false;
                    }
                }
            };

            this.next = function(draft) {
                if (!this.validStep($scope.selectedStep))
                    return;
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
                if ((this.validateAlways || $scope.selectedStep.completed) && !this.validStep($scope.selectedStep))
                    return;
                if (_.isNumber(step)) {
                    stepTo = $scope.steps[step];
                } else {
                    stepTo = _.find($scope.steps, {title: step});
                }
                this.doUndoSteps(stepTo);
                $scope.goTo(stepTo);
            };

            this.finish = function() {
                if (!this.validStep($scope.selectedStep))
                    return;
                if ($scope.onFinish) {
                    $scope.onFinish();
                }
            };

            this.cancel = this.previous = function() {
                if ((this.validateAlways || $scope.selectedStep.completed) && !this.validStep($scope.selectedStep))
                    return;
                var index = _.indexOf($scope.steps , $scope.selectedStep);
                if (index === 0) {
                    throw new Error("Can't go back. It's already in step 0");
                } else {
                    var stepTo = $scope.steps[index - 1];
                    this.doUndoSteps(stepTo);
                    $scope.goTo(stepTo);
                }
            };
        }]
    };
});
