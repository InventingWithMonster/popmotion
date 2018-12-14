import { CustomTemplate, State, ResolvedState } from '../styler/types';
import getValueType from './value-types';
import prefixer from './prefixer';
import {
  sortTransformProps,
  isTransformProp,
  isTransformOriginProp
} from './transform-props';
import { SCROLL_LEFT, SCROLL_TOP } from './scroll-keys';

const blacklist = new Set([SCROLL_LEFT, SCROLL_TOP, 'transform']);

const aliasMap: { [key: string]: string } = {
  x: 'translateX',
  y: 'translateY',
  z: 'translateZ'
};

const isCustomTemplate = (v: any): v is CustomTemplate =>
  typeof v === 'function';

/**
 * Build style property
 *
 * This function converts a Stylefire-formatted CSS style
 * object, eg:
 *
 * { x: 100, width: 100 }
 *
 * Into an object with default value types applied and default
 * transform order set:
 *
 * { transform: 'translateX(100px) translateZ(0)`, width: '100px' }
 */

const buildStyleProperty = (
  state: State,
  enableHardwareAcceleration: boolean = true,
  styles: ResolvedState = {},
  transform: State = {},
  transformOrigin: State = {},
  transformKeys: string[] = []
) => {
  let transformIsDefault = true;
  let hasTransform = false;
  let hasTransformOrigin = false;

  for (const key in state) {
    const value = state[key];
    const valueType = getValueType(key);
    const valueAsType =
      typeof value === 'number' && valueType
        ? valueType.transform(value)
        : value;

    if (isTransformProp(key)) {
      hasTransform = true;
      transform[key] = valueAsType;
      transformKeys.push(key);

      if (transformIsDefault) {
        if (
          (valueType.default && value !== valueType.default) ||
          (!valueType.default && value !== 0)
        ) {
          transformIsDefault = false;
        }
      }
    } else if (isTransformOriginProp(key)) {
      transformOrigin[key] = valueAsType;
      hasTransformOrigin = true;
    } else if (!blacklist.has(key) || !isCustomTemplate(valueAsType)) {
      styles[prefixer(key, true)] = valueAsType;
    }
  }

  // Only process and set transform prop if values aren't defaults
  if (!transformIsDefault) {
    let transformString = '';

    // TODO: This whole idea of meta values could be far more generic for instance filter
    if (isCustomTemplate(state.transform)) {
      transformString = state.transform(transform);
    } else {
      let transformHasZ = false;
      transformKeys.sort(sortTransformProps);

      const numTransformKeys = transformKeys.length;

      for (let i = 0; i < numTransformKeys; i++) {
        const key = transformKeys[i];
        transformString += `${aliasMap[key] || key}(${transform[key]}) `;
        transformHasZ = key === 'z' ? true : transformHasZ;
      }

      if (!transformHasZ && enableHardwareAcceleration) {
        transformString += 'translateZ(0)';
      }
    }

    styles.transform = transformString;
  } else if (hasTransform) {
    styles.transform = 'none';
  }

  if (hasTransformOrigin) {
    styles.transformOrigin = `${transformOrigin.originX ||
      0} ${transformOrigin.originY || 0} ${transformOrigin.originZ || 0}`;
  }

  return styles;
};

const createStyleBuilder = (enableHardwareAcceleration: boolean = true) => {
  /**
   * Because we expect this function to run multiple times a frame
   * we create and hold these data structures as mutative states.
   */
  const styles: ResolvedState = {};
  const transform: State = {};
  const transformOrigin: State = {};
  const transformKeys: string[] = [];

  return (state: State) => {
    transformKeys.length = 0;
    buildStyleProperty(
      state,
      enableHardwareAcceleration,
      styles,
      transform,
      transformOrigin,
      transformKeys
    );

    return styles;
  };
};

export { buildStyleProperty, createStyleBuilder };
