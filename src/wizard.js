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
        templateUrl: function(element, attributes) {
          return attributes.template || "wizard.html";
        },
        controller: ['$scope', '$element', 'WizardHandler', function($scope, $element, WizardHandler) {

            WizardHandler.addWizard($scope.name || WizardHandler.defaultName, this);
            $scope.$on('$destroy', function() {
                WizardHandler.removeWizard($scope.name || WizardHandler.defaultName);
            });

            $scope.steps = [];

            $scope.$watch('currentStep', function(step) {
                if (!step) return;
                var stepTitle = $scope.selectedStep.title || $scope.selectedStep.wzTitle;
                if ($scope.selectedStep && stepTitle !== $scope.currentStep) {
                    $scope.goTo(_.findWhere($scope.steps, {title: $scope.currentStep}));
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
                    $scope.currentStep = step.title || step.wzTitle;
                }
                step.selected = true;
                $scope.$emit('wizard:stepChanged', {step: step, index: _.indexOf($scope.getEnabledSteps() , step)});
            };
            
            $scope.currentStepNumber = function() {
                return _.indexOf($scope.steps , $scope.selectedStep) + 1;
            };

            $scope.getEnabledSteps = function() {
                return _.filter($scope.steps, function(step){
                    return step.disabled !== 'true';
                });
            };

            function unselectAll() {
                _.each($scope.steps, function (step) {
                    step.selected = false;
                });
                $scope.selectedStep = null;
            }

            this.next = function(draft) {
                var enabledSteps = $scope.getEnabledSteps();
                var index = _.indexOf(enabledSteps , $scope.selectedStep);
                if (!draft) {
                    $scope.selectedStep.completed = true;
                }
                if (index === enabledSteps.length - 1) {
                    this.finish();
                } else {
                    $scope.goTo(enabledSteps[index + 1]);
                }
            };

            this.goTo = function(step) {
                var enabledSteps = $scope.getEnabledSteps();
                var stepTo;
                if (_.isNumber(step)) {
                    stepTo = enabledSteps[step];
                } else {
                    stepTo = _.findWhere(enabledSteps, {title: step});
                }
                $scope.goTo(stepTo);
            };

            this.finish = function() {
                if ($scope.onFinish) {
                    $scope.onFinish();
                }
            };

            this.cancel = this.previous = function() {
                var enabledSteps = $scope.getEnabledSteps();
                var index = _.indexOf(enabledSteps , $scope.selectedStep);
                if (index === 0) {
                    throw new Error("Can't go back. It's already in step 0");
                } else {
                    $scope.goTo(enabledSteps[index - 1]);
                }
            };
        }]
    };
});
