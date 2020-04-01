(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axiosService"] = factory();
	//libaoxu@inke.cn
	else
		root["axiosService"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@inkefe/create-decorator/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@inkefe/create-decorator/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./lib/create-decorator.development.js */ "./node_modules/@inkefe/create-decorator/lib/create-decorator.development.js");
}


/***/ }),

/***/ "./node_modules/@inkefe/create-decorator/lib/create-decorator.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@inkefe/create-decorator/lib/create-decorator.development.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: version, createDecorator, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDecorator", function() { return createDecorator; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");

/**
 * 创建装饰器, 所创建的装饰器支持普通函数、类prototype下面的函数、类prototype下面的箭头函数、类的静态函数的装饰, 而且能固定this;
 * 等于在`core-decorators`下的autoBind和decorate双装饰的功能基础上, 增加了静态函数, 箭头函数, 普通函数的装饰, 代码量更精简下, 满足更多场景
 * @param {Function} hocWrapper 基础函数的高阶函数
 * @author libx@inke.cn
 * @example
 * 1. 创建装饰器
 * const xxxDecorator = createDecorator(fn => (...args) => xxx, ...firstArgs)
 * // 与第三方高阶函数结合
 * const xxxDecorator = createDecorator(lodash.throlled, 300)
 * 2. 使用装饰器
 * 2.1 普通函数
 * const fnProxy = xxxDecorator(fn)
 * const fnProxyComposed = compose(xxxDecorator2, xxxDecorator1)(fn)
 *
 * 2.2 类
 * class A {
 *  @xxxDecorator
 *  static fn() {}
 *
 *  @createDecorator(lodash.throttled, 300)
 *  @xxxDecorator
 *  fn() {}
 *
 *  @xxxDecorator
 *  fnArrow = () => {}
 * }
 */

var createDecorator = function createDecorator(hocWrapper) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (typeof hocWrapper !== 'function') throw Error('[create-decorator]: createDecorator请传入一个高阶函数');
  return function handleDescriptor(target, key, descriptor) {
    if (!descriptor && typeof target === 'function') {
      // 返回执行具体业务逻辑的函数
      return hocWrapper(target);
    }

    if (descriptor && !Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isObject"])(descriptor)) {
      throw Error('[create-decorator]: 装饰器使用错误, descriptor不是描述对象, 请检查@decorator是否为正确装饰器结构: function (target, name, descriptor) { ... }', 'descriptor: ', descriptor);
    }

    var configurable = descriptor.configurable,
        enumerable = descriptor.enumerable,
        writable = descriptor.writable;
    var originalGet = descriptor.get;
    var originalSet = descriptor.set;
    var originalValue = descriptor.value;
    var originInitializer = descriptor.initializer;
    var isGetter = !!originalGet;

    var defaultSetter = function defaultSetter(newValue) {
      return originalValue = newValue;
    };

    var wrappedFn;
    var desc = {
      configurable: configurable,
      enumerable: enumerable
    }; // 当非箭头函数 或 静态箭头函数时候, 不能有即有initializer 和 value(get、set)属性
    // 构建报错如(Invalid property descriptor Cannot both specify accesssors and a value or writable attirbute)
    // 所以这里将initializer 与 get set区分开

    if (typeof originInitializer === 'function') {
      desc.initializer = function initializer() {
        if (!wrappedFn) {
          // 这边在编译时候, 将this传入作用域curry起来, 等于间接固定了this
          // 这个realMethod是类中的具体执行业务逻辑的函数
          var realMethod = originInitializer.call(this).bind(this); // 这个是通过高阶函数装饰之后的代理函数, 调用者调用的就是这个函数

          wrappedFn = hocWrapper.call.apply(hocWrapper, [this, realMethod].concat(args));
        }

        return function realMethodCall() {
          var _wrappedFn;

          for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            nextArgs[_key2] = arguments[_key2];
          }

          return (_wrappedFn = wrappedFn).call.apply(_wrappedFn, [this].concat(nextArgs));
        };
      };
    } else {
      desc.get = function get() {
        if (wrappedFn) return wrappedFn;
        var realMethod;

        if (isGetter) {
          realMethod = originalGet.call(this).bind(this);
        } else if (typeof originalValue === 'function') {
          realMethod = originalValue.bind(this);
        } else {
          throw Error('[create-decorator]: descriptor\'s `value` or `get` property is not a function', descriptor);
        }

        wrappedFn = hocWrapper.call.apply(hocWrapper, [this, realMethod].concat(args));
        return wrappedFn;
      };

      desc.set = isGetter ? originalSet : defaultSetter;
    }

    return desc;
  };
}; // eslint-disable-next-line no-undef


var version = "0.1.0";
createDecorator.version = version;

/* harmony default export */ __webpack_exports__["default"] = (createDecorator);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
var isObject = function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
};

/***/ })

/******/ });
});
//# sourceMappingURL=create-decorator.development.js.map

/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STATUS_200 = exports.STATUS_200 = 200;

var defaults = exports.defaults = {};

var defaultBaseConfig = exports.defaultBaseConfig = {
  root: '/',
  isCreateInstance: false
};

var requestDefaults = exports.requestDefaults = {
  msgKey: 'error_msg',

  dataKey: 'data',

  codeKey: 'dm_error',

  successCode: 0
};

/***/ }),

/***/ "./src/create.js":
/*!***********************!*\
  !*** ./src/create.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _requestTypes = __webpack_require__(/*! ./request-types */ "./src/request-types.js");

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _config = __webpack_require__(/*! ./config */ "./src/config.js");

var _service = __webpack_require__(/*! ./service */ "./src/service.js");

var _service2 = _interopRequireDefault(_service);

var _qs = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAxiosService(instance, options) {
  var service = new _service2.default(_extends({
    requestDefaults: _extends({}, _config.requestDefaults),
    createdRequestStack: [],
    createdAxiosInstanceStack: [],
    instance: instance
  }, options));

  var getRequestProxy = function getRequestProxy(instance, requestOpts) {
    var _service$requestDefau = _extends({}, service.requestDefaults, requestOpts),
        msgKey = _service$requestDefau.msgKey,
        codeKey = _service$requestDefau.codeKey,
        dataKey = _service$requestDefau.dataKey,
        successCode = _service$requestDefau.successCode;

    return function request(config) {
      var requestInfo = ['url: ' + instance.baseURL + config.url, ', params:', config.params, ', data:', config.data];
      return instance(config).then(function (response) {
        if (!response) {
          _utils.logger.error('http\u8BF7\u6C42\u5931\u8D25: \u5931\u8D25\u539F\u56E0\u8BF7\u68C0\u67E5\'axios.interceptors.request.use\'\u4E2D\u7B2C\u4E8C\u4E2A\u51FD\u6570\u8FD4\u56DE\u503C\u662F\u5426\u4E3A\'Promise.reject\'');
          return Promise.reject(new Error('http请求失败'));
        }

        if (!(0, _utils.isObject)(response.data)) {
          return Promise.resolve(response);
        }

        var responseData = _extends({}, response.data);
        if ('response' in responseData) {
          responseData.__originResponse = response;
        } else {
          responseData.response = response;
        }

        if (!dataKey) {
          return Promise.resolve(responseData);
        }

        var data = responseData[dataKey];
        var msg = responseData[msgKey];
        var code = responseData[codeKey];

        (0, _utils.extend)(responseData, { data: data, msg: msg, code: code, message: msg });

        if (code === successCode) {
          return Promise.resolve(responseData);
        } else {
          _utils.logger.error.apply(_utils.logger, ['codeKey: [' + codeKey + '] \u4E0D\u5339\u914D: ', 'msg: ' + msg + ', code: ' + code + ' '].concat(requestInfo, ['response: ', response]));
          return Promise.reject(responseData);
        }
      }, function (e) {
        _utils.logger.error.apply(_utils.logger, ['\u8BF7\u6C42\u5931\u8D25: '].concat(requestInfo, ['; error : ', e]));
        return Promise.reject(e);
      });
    };
  };
  var handleAxiosInstances = function handleAxiosInstances(baseConfigs) {
    var _defaultBaseConfig$ba = _extends({}, _config.defaultBaseConfig, baseConfigs),
        root = _defaultBaseConfig$ba.root,
        isCreateInstance = _defaultBaseConfig$ba.isCreateInstance;

    if (root === undefined) {
      _utils.logger.error('请传入正确的请求根路径, 如: / 或 https://api.github.com');
    }

    var axiosInstance = void 0;
    var asyncAxiosInstance = void 0;
    var _request = void 0;
    var $httpResolve = void 0;
    var timeout = 3000;
    var $httpReady = new Promise(function (resolve, reject) {
      $httpResolve = resolve;
    });

    var tid = setTimeout(function () {
      if (!axiosInstance) {
        _utils.logger.error('请注入axios实例, 如: axiosService.init(axios, config)');
      }
    }, timeout);

    var getInstance = function getInstance() {
      if (service.$http) {
        clearTimeout(tid);
        var _instance = void 0;

        if (isCreateInstance) {
          _instance = service.$http.create(_extends({
            baseURL: root
          }, baseConfigs));
        } else {
          _instance = function _instance(config) {
            return service.$http(_extends({}, config, { url: (0, _utils.joinRootAndPath)(root, config.url) }));
          };
        }
        _instance.baseURL = root;

        return _instance;
      }
    };

    var getInstaceSync = function getInstaceSync() {
      if (!service.$http) {
        service.createdAxiosInstanceStack.push($httpResolve);
        return $httpReady.then(getInstance);
      }
    };

    axiosInstance = getInstance();

    if (!axiosInstance) {
      asyncAxiosInstance = getInstaceSync();
      asyncAxiosInstance.then(function (_axiosInstance) {
        axiosInstance = _axiosInstance;
      });
    }

    return {
      getAxiosInstance: function getAxiosInstance(_) {
        return axiosInstance;
      },
      getAsyncAxiosInstance: function getAsyncAxiosInstance(_) {
        return asyncAxiosInstance;
      }
    };
  };

  var jsonWrapperRequest = function jsonWrapperRequest(baseConfigs) {
    return function getRequest(config) {};
  };

  var getRequestsByRoot = function getRequestsByRoot() {
    var baseConfigs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _handleAxiosInstances = handleAxiosInstances(baseConfigs),
        getAxiosInstance = _handleAxiosInstances.getAxiosInstance,
        getAsyncAxiosInstance = _handleAxiosInstances.getAsyncAxiosInstance;

    var getRequest = function getRequest(requestOpts) {
      var _request = void 0;
      var axiosInstance = getAxiosInstance();
      var asyncAxiosInstance = getAsyncAxiosInstance();

      if (axiosInstance) {
        _request = getRequestProxy(axiosInstance, requestOpts);
      } else {
        asyncAxiosInstance && asyncAxiosInstance.then(function (axiosInstance) {
          _request = getRequestProxy(axiosInstance, requestOpts);
        });
      }

      return function handleRequest() {
        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        if (_request) {
          return _request.apply(undefined, params);
        } else {
          return asyncAxiosInstance.then(function () {
            return _request.apply(undefined, params);
          });
        }
      };
    };

    var requestConnect = function requestConnect(fn) {
      return function (url, requestOpts) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        var request = getRequest(requestOpts);
        return fn.apply(undefined, [url, request].concat(args));
      };
    };

    var mergeTransform = function mergeTransform() {
      var transforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var fn = arguments[1];

      var defaults = options ? options.defaults : service.$http.defaults;
      return transforms.concat(defaults && defaults[fn] || []);
    };

    var requests = {
      getAxiosInstance: getAxiosInstance,
      getAsyncAxiosInstance: getAsyncAxiosInstance,

      get: requestConnect(function axiosServiceGet(url, request, moreConfigs) {
        return function (params) {
          var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return request(_extends({
            url: url,
            method: _requestTypes.GET
          }, configs, moreConfigs, {
            params: _extends({}, params, configs.params)
          }));
        };
      }),
      post: requestConnect(function axiosServicePost(url, request, moreConfigs) {
        return function (data, configs) {
          return request(_extends({ url: url, method: _requestTypes.POST, data: data }, configs, moreConfigs));
        };
      }),
      postXFormData: requestConnect(function axiosServicePostXForm(url, request, moreConfigs) {
        return function (data) {
          var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          return request(_extends({
            url: url,
            method: _requestTypes.POST,
            data: data,
            transformRequest: mergeTransform([function () {
              var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var headers = arguments[1];

              return Object.keys(data).reduce(function (formData, key) {
                formData.append(key, data[key]);
                return formData;
              }, new FormData());
            }], 'transformRequest')
          }, configs, moreConfigs));
        };
      }),
      postXFormString: requestConnect(function axiosServicePostXFormString(url, request, moreConfigs) {
        return function (data) {
          var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          return request(_extends({
            url: url,
            method: _requestTypes.POST,
            data: data,
            transformRequest: mergeTransform([function () {
              var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var headers = arguments[1];

              return _qs2.default.stringify(data);
            }], 'transformRequest')
          }, configs, moreConfigs));
        };
      }),

      restFulGet: requestConnect(function axiosServiceRestFulGet(restFulUrl, request, moreConfigs) {
        return function (urlData, params, configs) {
          return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.GET, params: params }, configs, moreConfigs));
        };
      }),
      restFulPost: requestConnect(function axiosServicePost(restFulUrl, request, moreConfigs) {
        return function (urlData, data, configs) {
          return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.POST, data: data }, configs, moreConfigs));
        };
      }),
      delete: requestConnect(function axiosServiceDelete(restFulUrl, request, moreConfigs) {
        return function (urlData, data, configs) {
          return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.DELETE, data: data }, configs, moreConfigs));
        };
      }),
      put: requestConnect(function axiosServicePut(restFulUrl, request, moreConfigs) {
        return function (urlData, data, configs) {
          return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.PUT, data: data }, configs, moreConfigs));
        };
      }),
      patch: requestConnect(function axiosServicePatch(restFulUrl, request) {
        for (var _len3 = arguments.length, moreConfigs = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          moreConfigs[_key3 - 2] = arguments[_key3];
        }

        return function (urlData, data, configs) {
          return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.PATCH, data: data }, configs, moreConfigs));
        };
      }),
      head: requestConnect(function axiosServiceHead(url, request) {
        for (var _len4 = arguments.length, moreConfigs = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
          moreConfigs[_key4 - 2] = arguments[_key4];
        }

        return function (configs) {
          return request(_extends({ url: url, method: _requestTypes.HEAD }, configs, moreConfigs));
        };
      }),
      options: requestConnect(function axiosServiceOptions(url, request) {
        for (var _len5 = arguments.length, moreConfigs = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
          moreConfigs[_key5 - 2] = arguments[_key5];
        }

        return function (configs) {
          return request(_extends({ url: url, method: _requestTypes.OPTIONS }, configs, moreConfigs));
        };
      }),
      request: requestConnect(function axiosServiceRequest(url, request) {
        for (var _len6 = arguments.length, moreConfigs = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
          moreConfigs[_key6 - 2] = arguments[_key6];
        }

        return function (configs) {
          return request(_extends({ url: url }, configs, moreConfigs));
        };
      }),

      jsonp: requestConnect(function axiosServiceJsonp(url, request) {})
    };

    requests.restFulDelete = requests.delete;

    requests.postXForm = requests.postXFormData;

    return requests;
  };

  service.getRequestsByRoot = getRequestsByRoot;
  service.create = createAxiosService;

  return service;
}

exports.default = createAxiosService;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.serviceHocs = exports.mockDecorator = exports.getMockDecoratorByEnv = exports.getMessageDecorator = exports.createAxiosService = exports.getRequestsByRoot = exports.axiosService = undefined;

var _create = __webpack_require__(/*! ./create */ "./src/create.js");

var _create2 = _interopRequireDefault(_create);

var _serviceDecorators = __webpack_require__(/*! ./service-decorators */ "./src/service-decorators.js");

var serviceHocs = _interopRequireWildcard(_serviceDecorators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMessageDecorator = serviceHocs.getMessageDecorator,
    getMockDecoratorByEnv = serviceHocs.getMockDecoratorByEnv,
    mockDecorator = serviceHocs.mockDecorator;


var axiosService = (0, _create2.default)();
var getRequestsByRoot = axiosService.getRequestsByRoot;
var version = "1.4.0";

exports.axiosService = axiosService;
exports.getRequestsByRoot = getRequestsByRoot;
exports.createAxiosService = _create2.default;
exports.getMessageDecorator = getMessageDecorator;
exports.getMockDecoratorByEnv = getMockDecoratorByEnv;
exports.mockDecorator = mockDecorator;
exports.serviceHocs = serviceHocs;
exports.version = version;


axiosService.createAxiosService = _create2.default;
axiosService.getMessageDecorator = getMessageDecorator;
axiosService.getMockDecoratorByEnv = getMockDecoratorByEnv;
axiosService.mockDecorator = mockDecorator;
axiosService.serviceHocs = serviceHocs;
axiosService.version = version;

exports.default = axiosService;

/***/ }),

/***/ "./src/request-types.js":
/*!******************************!*\
  !*** ./src/request-types.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GET = exports.GET = 'get';
var POST = exports.POST = 'post';
var DELETE = exports.DELETE = 'delete';
var OPTIONS = exports.OPTIONS = 'options';
var PUT = exports.PUT = 'put';
var PATCH = exports.PATCH = 'patch';
var HEAD = exports.HEAD = 'head';

/***/ }),

/***/ "./src/service-decorators.js":
/*!***********************************!*\
  !*** ./src/service-decorators.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayDecorate = exports.getDelayDecorate = exports.setDataDecorate = exports.setParamsDecorate = exports.setCustomDataWrapper = exports.setCustomParamsWrapper = exports.requestOptsWrapper = exports.getErrorMsg = exports.getMessageDecorator = exports.mockDecorator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getMockDecoratorByEnv = getMockDecoratorByEnv;

var _createDecorator = __webpack_require__(/*! @inkefe/create-decorator */ "./node_modules/@inkefe/create-decorator/index.js");

var _createDecorator2 = _interopRequireDefault(_createDecorator);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMockDecoratorByEnv(isDev) {
  return function mockDecorator(mockFn) {
    return (0, _createDecorator2.default)(function (apiFn) {
      return function () {
        if (isDev) {
          return mockFn.apply(undefined, arguments);
        } else {
          return apiFn.apply(undefined, arguments);
        }
      };
    });
  };
}

var mockDecorator = exports.mockDecorator = getMockDecoratorByEnv("development" === 'development');

var getMessageDecorator = exports.getMessageDecorator = function getMessageDecorator(toast) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        successMsg = _ref.successMsg,
        errorMsg = _ref.errorMsg;

    var alert = typeof window !== 'undefined' ? window.alert : console.log;
    var getToast = function getToast(name) {
      return (typeof toast === 'undefined' ? 'undefined' : _typeof(toast)) === 'object' && typeof toast[name] === 'function' ? toast[name] : alert;
    };
    var messageGetter = function messageGetter(msg) {
      return typeof msg === 'function' ? msg : function (_) {
        return msg;
      };
    };
    var successToast = getToast('success');
    var errorToast = getToast('error');
    var getSuccessMsg = messageGetter(successMsg);
    var getErrorMsg = messageGetter(errorMsg);

    return (0, _createDecorator2.default)(function (fn) {
      return function () {
        return typeof fn === 'function' && fn.apply(undefined, arguments).then(function (res) {
          var msg = getSuccessMsg(res);
          msg && successToast(msg);
          return Promise.resolve(res);
        }, function (err) {
          var msg = getErrorMsg(err);
          msg && errorToast(msg);
          return Promise.reject(err);
        });
      };
    });
  };
};

var getErrorMsg = exports.getErrorMsg = function getErrorMsg() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function (error) {
    return error && (error.msg || msg);
  };
};

var requestOptsWrapper = exports.requestOptsWrapper = function requestOptsWrapper(requestPathWrapper, opts) {
  return function (path) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return requestPathWrapper.apply(undefined, [path, opts].concat(args));
  };
};

var requestConnector = function requestConnector(fn) {
  return function (requestPathWrapper) {
    for (var _len2 = arguments.length, preArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      preArgs[_key2 - 1] = arguments[_key2];
    }

    return function (path) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var request = requestPathWrapper.apply(undefined, [path].concat(args));
      return fn.apply(undefined, [request].concat(preArgs));
    };
  };
};

var requestToSetParams = function requestToSetParams(request, customParams) {
  return function (data) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return typeof request === 'function' && request(data, _extends({}, config, {
      params: _extends({}, config.params, customParams)
    }));
  };
};

var requestToSetData = function requestToSetData(request, customData) {
  return function (data) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return request.apply(undefined, [_extends({}, customData, data)].concat(args));
  };
};

var decoratorsReadmeUrl = 'https://github.com/libaoxu/axios-service#%E6%9B%B4%E5%A4%9A%E8%A3%85%E9%A5%B0%E5%99%A8';

var setCustomParamsWrapper = exports.setCustomParamsWrapper = (0, _utils.compose)((0, _utils.deprecatedHoc)('setCustomParamsWrapper', decoratorsReadmeUrl), requestConnector)(requestToSetParams);

var setCustomDataWrapper = exports.setCustomDataWrapper = (0, _utils.compose)((0, _utils.deprecatedHoc)('setCustomDataWrapper', decoratorsReadmeUrl), requestConnector)(requestToSetData);

var setParamsDecorate = exports.setParamsDecorate = function setParamsDecorate(customParams) {
  return (0, _createDecorator2.default)(function (fn) {
    return requestToSetParams(fn, customParams);
  });
};

var setDataDecorate = exports.setDataDecorate = function setDataDecorate(customData) {
  return (0, _createDecorator2.default)(function (fn) {
    return requestToSetData(fn, customData);
  });
};

var getDelayDecorate = exports.getDelayDecorate = function getDelayDecorate(isDev) {
  return function (wait) {
    return (0, _createDecorator2.default)(function (fn) {
      return function () {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        if (isDev) {
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve(fn.apply(undefined, args));
            }, wait || 0);
          });
        } else {
          return fn.apply(undefined, args);
        }
      };
    });
  };
};

var delayDecorate = exports.delayDecorate = getDelayDecorate("development" === 'development');

/***/ }),

/***/ "./src/service.js":
/*!************************!*\
  !*** ./src/service.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(/*! ./config */ "./src/config.js");

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
  function Service() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Service);

    this.$http = options.instance || null;
    this.requestDefaults = options.requestDefaults || {};
    this.createdRequestStack = options.createdRequestStack || [];
    this.createdAxiosInstanceStack = options.createdAxiosInstanceStack || [];
  }

  _createClass(Service, [{
    key: 'init',
    value: function init(axiosInstance) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.setHttps(axiosInstance);
      this.setDefaults(options.defaults);
      this.setRequestDefaults(options.requestDefaults);
      this._executeRequestInstance();
      this._executeAxiosInstance();
    }
  }, {
    key: 'setHttps',
    value: function setHttps($http) {
      this.$http = $http || this.$http;
    }
  }, {
    key: 'setDefaults',
    value: function setDefaults(newConfig) {
      (0, _utils.extend)(this.$http.defaults, (0, _utils.deepMerge)(this.$http.defaults, _config.defaults, newConfig));
    }
  }, {
    key: 'setRequestDefaults',
    value: function setRequestDefaults() {
      var newRequestOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.requestDefaults = _extends({}, newRequestOpts);
    }
  }, {
    key: '_executeRequestInstance',
    value: function _executeRequestInstance() {
      var _this = this;

      this.createdRequestStack.forEach(function (fn) {
        return fn && fn(_this.$http);
      });
    }
  }, {
    key: '_executeAxiosInstance',
    value: function _executeAxiosInstance() {
      var _this2 = this;

      this.createdAxiosInstanceStack.forEach(function (fn) {
        return fn && fn(_this2.$http);
      });
    }
  }]);

  return Service;
}();

exports.default = Service;

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isString = isString;
exports.isNumber = isNumber;
exports.isUndefined = isUndefined;
exports.isObject = isObject;
exports.forEach = forEach;
exports.merge = merge;
exports.deepMerge = deepMerge;
var deepCopy = exports.deepCopy = function deepCopy(target) {};

var formatRestFulUrl = exports.formatRestFulUrl = function formatRestFulUrl() {
  var resfulUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var urlData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(urlData || {}).reduce(function (url, key) {
    return url.replace('$' + key, urlData[key]);
  }, resfulUrl || '');
};

var joinRootAndPath = exports.joinRootAndPath = function joinRootAndPath(root, path) {
  var slashStartReplace = function slashStartReplace(str) {
    return str.replace(/^\//, '');
  };
  var slashEndReplace = function slashEndReplace(str) {
    return str.replace(/\/$/, '');
  };
  return slashEndReplace(root) + '/' + slashStartReplace(path);
};

var combineURLs = exports.combineURLs = joinRootAndPath;

var toString = exports.toString = Object.prototype.toString;
var hasOwnProperty = exports.hasOwnProperty = Object.prototype.hasOwnProperty;

var isArray = exports.isArray = function isArray(val) {
  return toString.call(val) === '[object Array]';
};

var isMustObject = exports.isMustObject = function isMustObject(val) {
  return toString.call(val) === '[object Object]';
};

function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

function isObject(val) {
  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
}

function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn(obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        fn(obj[key], key, obj);
      }
    }
  }
}

function merge() {
  var result = {};
  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

function deepMerge() {
  var result = {};
  function assignValue(target, source) {
    if (isMustObject(target) && isMustObject(source)) {
      Object.keys(source).forEach(function (sourceKey) {
        if (!target[sourceKey]) {
          target[sourceKey] = source[sourceKey];
        } else {
          target[sourceKey] = deepMerge(target[sourceKey], source[sourceKey]);
        }
      });
    } else if (isArray(target) && isArray(source)) {
      target = target.concat(source);
    } else {
      target = source;
    }
    return target;
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    result = assignValue(result, arguments[i]);
  }

  return result;
}

var extend = exports.extend = function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

var logger = exports.logger = {
  log: function log() {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, ['[axios-service]'].concat(args));
  },
  warn: function warn() {
    var _console2;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    (_console2 = console).warn.apply(_console2, ['[axios-service]'].concat(args));
  },
  error: function error() {
    var _console3;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    (_console3 = console).error.apply(_console3, ['[axios-service]'].concat(args));
  }
};

var compose = exports.compose = function compose() {
  for (var _len4 = arguments.length, funcs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    funcs[_key4] = arguments[_key4];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
};

var deprecatedHoc = exports.deprecatedHoc = function deprecatedHoc(fnName) {
  var readmeUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://github.com/libaoxu/axios-service';
  return function (fn) {
    return function () {
      logger.warn('\uD83D\uDEAB' + (fnName || fn.name) + '\u5DF2\u7ECF\u5E9F\u5F03, \u66F4\u591A\u7528\u6CD5\u8BF7\u53C2\u8003: ' + readmeUrl);
      return fn.apply(undefined, arguments);
    };
  };
};

/***/ })

/******/ });
});
//# sourceMappingURL=axios-service.development.js.map
