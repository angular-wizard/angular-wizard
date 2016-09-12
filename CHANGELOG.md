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
