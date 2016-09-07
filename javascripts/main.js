angular.module('wizard-sample', ['mgo-angular-wizard'])
    .controller('WizardCtrl', function($scope, $q, $timeout, WizardHandler) {

        $scope.canExit = true;
        $scope.stepActive = true;

        $scope.finished = function() {
            alert("Wizard finished :)");
        };
        $scope.logStep = function() {
            console.log("Step continued");
        };
        $scope.goBack = function() {
            WizardHandler.wizard('topWizard').goTo(1);
        };
        $scope.exitWithAPromise = function() {
            var d = $q.defer();
            $timeout(function() {
                d.resolve(true);
            }, 1000);
            return d.promise;
        };
        $scope.exitToggle = function() {
            $scope.canExit = !$scope.canExit;
        };
        $scope.stepToggle = function() {
            $scope.stepActive = !$scope.stepActive;
        }
        $scope.exitValidation = function() {
            return $scope.canExit;
        };

        /* Logix for ngRepeat Wizard */
        $scope.wizardSteps = [{
            title: 'Step 1',
            content: 'This is content for step 1'
        }, {
            title: 'Step 2',
            content: 'This is content for step 2'
        }];

        $scope.stepToAdd = {
            title: '',
            content: ''
        };

        $scope.addStep = function() {
            $scope.wizardSteps.push(angular.copy($scope.stepToAdd));
            console.log('pushed: ', $scope.wizardSteps, $scope.stepToAdd);
            $scope.stepToAdd.title = '';
            $scope.stepToAdd.content = '';
        };

        $scope.removeStep = function(index) {
            $scope.wizardSteps.splice(index, 1);
        };
    });