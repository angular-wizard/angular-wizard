<a name="1.1.1"></a>
# 1.1.1 (2017-06-07)

- Update README.md to expose $broadcasts the Wizard offers.


<a name="1.1.0"></a>
# 1.1.0 (2017-06-07)

- Update README.md to explain Edit Mode.
- Add `wz-heading-title` attribute to each step.


<a name="1.0.2"></a>
# 1.0.2 (2017-06-06)

- Update README.md to update Repository URLs


<a name="1.0.1"></a>
# 1.0.2 (2017-06-06)

- Update CDN instructions on README.md


<a name="1.0.0"></a>
# 1.0.0 (2017-06-06)

- `canExit` and `canEnter` functions may now be strings.
- `setEditMode(mode)` methoda added to wizard so a user can explicitly set the edit mode on a wizard.
- Main files in bower.json no longer reference minified files.
- Travis CI config files updated to allow CI automated testing to pass
- npm package versions updated.

## Updates

- Fix for Issue [#210](https://github.com/angular-wizard/angular-wizard/issues/210).
- Newly enabled steps are set to complete.

<a name="0.10.0"></a>
# 0.10.0 (2016-12-22)

## Updates

- Fix for Issue [#210](https://github.com/angular-wizard/angular-wizard/issues/210).
- Newly enabled steps are set to complete.

<a name="0.9.0"></a>
# 0.9.0 (2016-09-19)

## Updates

- Fix for Issue [#184](https://github.com/angular-wizard/angular-wizard/issues/184).
- Step title updates on change.

<a name="0.8.0"></a>
# 0.8.0 (2016-09-12)

## Updates

- **wizard-order:** the `wizard-order` attribute affects the order in which the steps should be in. If no order or duplicated order it will add the step to the end.

<a name="0.7.1"></a>
# 0.7.1 (2016-09-07)

## Updates

- **indicators-position:** the `indicators-position` attribute has been added to `wizard` directive to allow you to specify "top" or "bottom" for defualt step positions.
- Created $destroy event that remove steps from wizard for wizards built using `ng-repeat` for step creation
- Wrapped goTo method in $timeout to fix bug where step recently enabled weren't being seen by `getEnabledSteps`

<a name="0.6.1"></a>
# 0.6.1 (2015-12-31)

## Updates

- **wz-title:** the `title` attribute has been changed to `wz-title`.  Examples in README have been updated.
