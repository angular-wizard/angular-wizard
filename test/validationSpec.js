describe( 'Validations for the step changes', function() {
	var $compile, $rootScope, scope, view, WizardHandler;

	beforeEach(module('mgo-angular-wizard'));
	beforeEach(inject(function(_$compile_, _$rootScope_, _WizardHandler_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		WizardHandler = _WizardHandler_;
		scope = $rootScope.$new();
		createView(scope);
		$rootScope.$digest();
	}));

	function createView(scope) {
		scope.finishedWizard = function() {
			/**
			 * It's Ok to do nothing
			 */
		}
		scope.referenceCurrentStep = null;
		var element = angular.element('<wizard on-finish="finishedWizard()" current-step="referenceCurrentStep" ng-init="msg = 14">'
				+ '	<wz-step title="Starting">'
				+ '		<h1>This is the first step</h1>'
				+ '		<p>Here you can use whatever you want. You can use other directives, binding, etc.</p>'
				+ '		<input type="submit" wz-next value="Continue" />'
				+ '	</wz-step>'
				+ '	<wz-step title="Continuing">'
				+ '		<h1>Continuing</h1>'
				+ '		<p>You have continued here!</p>'
				+ '		<input type="submit" wz-next value="Go on" />'
				+ '	</wz-step>'
				+ '	<wz-step title="More steps">'
				+ '		<p>Even more steps!!</p>'
				+ '		<input type="submit" wz-next value="Finish now" />'
				+ '	</wz-step>'
				+ '</wizard>');
		view = $compile(element)(scope);
	}

	it('should correctly create the wizard', function() {
		expect(WizardHandler).toBeTruthy();
		expect(view.find('section').length).toEqual(3);
		// expect the currect step to be desirable one
		expect(scope.referenceCurrentStep).toEqual('Starting');
		WizardHandler.wizard().goTo('Continuing');
		$rootScope.$digest();
		expect(scope.referenceCurrentStep).toEqual('Continuing');
	})

	//TODO: implement the rest of the unit tests
	it( 'should allow to go to the next step when the current step is valid', function() {
		expect( true ).toBeTruthy();
	});
	it( 'should allow to return to a previous step although the current step is not valid', function() {
		expect( true ).toBeTruthy();
	});
	it( 'should not allow to return to a previous step if the current step is not valid and the attribute validateOnlyToAdvance is false', function() {
		expect( true ).toBeTruthy();
	});
});