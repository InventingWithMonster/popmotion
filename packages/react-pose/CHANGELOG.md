# Changelog

React Pose adheres to [Semantic Versioning](http://semver.org/).

## [1.5.3] 2018-05-04

### Fixed

- TS errors with PoseElementProps

## [1.5.2] 2018-04-13

### Fixed

- Checking `ref` for `instanceof Element` before setting in case `innerRef` has been passed to a component.

## [1.5.1] 2018-04-12

### Added

- `onDragStart`/`onDragEnd` callbacks to posed components.

## [1.5.0] 2018-04-12

### Added

- `posed(Component)` via [Jess Telford](https://twitter.com/jesstelford)
- React < 16.3 compatibility

## [1.4.0] 2018-04-11

### Added

- Labels (Pose 1.3.0)

## [1.3.0] 2018-04-10

### Added

- `beforeChildren` and `afterChildren` props (Pose 1.2.0)

## [1.2.0] 2018-04-09

### Added

- Dynamic pose props (Pose 1.1.0)

## [1.1.4] 2018-04-08

### Fixed

- Fixing botched React version mismatch in global file.

## [1.1.3] 2018-04-08

### Fixed

- [#285](https://github.com/Popmotion/popmotion/issues/285) PoseGroup child `enter` poses now animate correctly.

## [1.1.2] 2018-04-03

### Deprecated

- Deprecating `onChange` in favour of `onValueChange`. `onChange` will be removed in version 2.0.0. This is because React elements already use the `onChange` prop.

## [1.1.1] 2018-04-02

### Changed

- Using React `16.3.0` final release.

## [1.1.0] 2018-04-02

### Added

- Support for conditional rendering within `PoseGroup` (@efimweb)

## [1.0.2] 2018-03-29

### Fix

- Fixing types for `posed`

## [1.0.1] 2018-03-28

### Update

- Latest version of Pose

## [1.0.0] 2018-03-28

### Update

- Converting `PoseElement` from deprecated lifecycle method to `UNSAFE_componentWillUpdate`
- Fixing `posed` typescript def

## [0.1.7] 2018-03-25

### Update

- Updating Pose

## [0.1.6] 2018-03-25

### Update

- Updating Pose

## [0.1.5] 2018-03-25

### Update

- Updating Pose

## [0.1.4] 2018-03-24

### Update

- Exporting `popmotion` when using script import.

## [0.1.2] 2018-03-21

### Update

- Pose updated to 1.0.10

## [0.1.1] 2018-03-21

### Update

- Pose updated to 1.0.9

## [0.1.0] 2018-03-21

### Update

- RC

## [0.0.1] 2018-03-07

### Update

- Initial release