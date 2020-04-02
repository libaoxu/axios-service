export const deepCopy = (target, ...source) => {

}

export const formatRestFulUrl = (resfulUrl = '', urlData = {}) => Object.keys(urlData || {})
  .reduce((url, key) => url.replace(`$${key}`, urlData[key]), resfulUrl || '')

export const joinRootAndPath = (root, path) => {
  const slashStartReplace = str => str.replace(/^\//, '')
  const slashEndReplace = str => str.replace(/\/$/, '')
  return `${slashEndReplace(root)}/${slashStartReplace(path)}`
}

export const combineURLs = joinRootAndPath

export const toString = Object.prototype.toString
export const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export const isArray = function (val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is must an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, Array or otherwise false
 */
export const isMustObject = function (val) {
  return toString.call(val) === '[object Object]';
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
export function isString (val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
export function isNumber (val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
export function isUndefined (val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject (val) {
  return val !== null && typeof val === 'object';
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
export function forEach (obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /* eslint no-param-reassign:0 */
    obj = [obj]
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i++) {
      fn(obj[i], i, obj)
    }
  } else {
    // Iterate over object keys
    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        fn(obj[key], key, obj)
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
export function merge (/* obj1, obj2, obj3, ... */...args) {
  const result = {}
  function assignValue (val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val)
    } else {
      result[key] = val
    }
  }

  for (let i = 0, l = args.length; i < l; i++) {
    forEach(args[i], assignValue)
  }
  return result
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
export function deepMerge (/* obj1, obj2, obj3, ... */...args) {
  let result = {}
  function assignValue (target, source) {
    if (isMustObject(target) && isMustObject(source)) {
      Object.keys(source).forEach(sourceKey => {
        if (!target[sourceKey]) {
          target[sourceKey] = source[sourceKey]
        } else {
          target[sourceKey] = deepMerge(target[sourceKey], source[sourceKey])
        }
      })
    } else if (isArray(target) && isArray(source)) {
      target = target.concat(source)
    } else {
      target = source
    }
    return target
  }

  for (let i = 0, l = args.length; i < l; i++) {
    result = assignValue(result, args[i])
  }

  return result
}

/**
 * Mix properties into target object.
 */
export const extend = function extend (to, _from) {
  for (const key in _from) {
    if (Object.prototype.hasOwnProperty.call(_from, key)) {
      to[key] = _from[key]
    }
  }
  return to
}

export const logger = {
  log (...args) {
    /* eslint-disable no-console */
    console.log('[axios-service]', ...args)
    /* eslint-enable no-console */
  },
  warn (...args) {
    /* eslint-disable no-console */
    console.warn('[axios-service]', ...args)
    /* eslint-enable no-console */
  },
  error (...args) {
    /* eslint-disable no-console */
    console.error('[axios-service]', ...args)
    /* eslint-enable no-console */
  },
}

export const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export const deprecateWrapper = (fnName, readmeUrl = 'https://github.com/libaoxu/axios-service') => fn => (...args) => {
  logger.warn(`🚫${fnName || fn.name}已经废弃, 更多用法请参考: ${readmeUrl}`)
  return fn(...args)
}
