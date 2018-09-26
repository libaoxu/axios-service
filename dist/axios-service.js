(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axiosService"] = factory();
	//libaoxu
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequestsByRoot = exports.service = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _requestTypes = __webpack_require__(1);

var _utils = __webpack_require__(2);

var _config = __webpack_require__(3);

var _service = __webpack_require__(4);

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service = exports.service = new _service2.default({
  requestDefaults: _config.requestDefaults,
  createdRequestStack: [],
  createdAxiosInstanceStack: []
});

var getWrapperRequestByInstance = function getWrapperRequestByInstance(instance) {
  return function getRequestWithOptions(requestOpts) {
    var _service$requestDefau = _extends({}, service.requestDefaults, requestOpts),
        msgKey = _service$requestDefau.msgKey,
        codeKey = _service$requestDefau.codeKey,
        dataKey = _service$requestDefau.dataKey,
        successCode = _service$requestDefau.successCode;

    return function request(opts) {
      var requestInfo = ['url: ' + instance.baseURL + opts.url, ', params:', opts.params, ', data:', opts.data];

      return instance(opts).then(function (response) {
        var status = response.status,
            apiRes = response.data,
            config = response.config;


        if (status === _config.STATUS_200) {
          if (!dataKey) {
            return Promise.resolve(apiRes);
          }
          var data = apiRes[dataKey];
          var msg = apiRes[msgKey];
          var code = apiRes[codeKey];

          (0, _utils.extend)(apiRes, { data: data, msg: msg, code: code });

          if (code === successCode) {
            return Promise.resolve(apiRes);
          } else {
            var _console;

            (_console = console).error.apply(_console, ['[service\u8BF7\u6C42\u9519\u8BEF], msg: ' + msg + ', code: ' + code + ' '].concat(requestInfo));
            return Promise.reject(apiRes);
          }
        }
      }, function (e) {
        var _console2;

        (_console2 = console).error.apply(_console2, ['[service\u8BF7\u6C42\u5931\u8D25]: '].concat(requestInfo));
        return Promise.reject(e);
      });
    };
  };
};

var wrapperRequsetAdaptor = function wrapperRequsetAdaptor(baseConfigs) {
  var _baseConfigs$root = baseConfigs.root,
      root = _baseConfigs$root === undefined ? '/' : _baseConfigs$root,
      isCreateInstance = baseConfigs.isCreateInstance;

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
      console.error('请注入axios实例, 如: axiosService.init(axios, config)');
    }
  }, timeout);

  var getInstance = function getInstance() {
    if (service.$http) {
      clearTimeout(tid);
      var instance = void 0;

      if (isCreateInstance) {
        instance = service.$http.create(_extends({
          baseURL: root
        }, baseConfigs));
      } else {
        instance = function instance(opts) {
          return service.$http(_extends({}, opts, { url: (0, _utils.joinRootAndPath)(root, opts.url) }));
        };
      }
      instance.baseURL = root;

      return instance;
    }
  };

  var getInstaceSync = function getInstaceSync() {
    if (!service.$http) {
      service.createdAxiosInstanceStack.push($httpResolve);
      return $httpReady.then(getInstance);
    }
  };

  var getRequest = function getRequest(axiosInstance, requestOpts) {
    var _getRequestByOpts = getWrapperRequestByInstance(axiosInstance);
    return _getRequestByOpts(requestOpts);
  };

  axiosInstance = getInstance();

  if (!axiosInstance) {
    asyncAxiosInstance = getInstaceSync();
    asyncAxiosInstance.then(function (_axiosInstance) {
      axiosInstance = _axiosInstance;
    });
  }

  var wrapperRequest = function wrapperRequest(requestOpts) {
    var _request = void 0;
    if (axiosInstance) {
      _request = getRequest(axiosInstance, requestOpts);
    } else {
      asyncAxiosInstance && asyncAxiosInstance.then(function (axiosInstance) {
        _request = getRequest(axiosInstance, requestOpts);
      });
    }

    return function requestDecorator() {
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

  return {
    getAxiosInstance: function getAxiosInstance(_) {
      return axiosInstance;
    },
    getAsyncAxiosInstance: function getAsyncAxiosInstance(_) {
      return asyncAxiosInstance;
    },
    wrapperRequest: wrapperRequest
  };
};

var jsonWrapperRequest = function jsonWrapperRequest(baseConfigs) {
  return function wrapperRequest(opts) {};
};

var getRequestsByRoot = exports.getRequestsByRoot = function getRequestsByRoot() {
  var baseConfigs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _wrapperRequsetAdapto = wrapperRequsetAdaptor(baseConfigs),
      wrapperRequest = _wrapperRequsetAdapto.wrapperRequest,
      getAxiosInstance = _wrapperRequsetAdapto.getAxiosInstance,
      getAsyncAxiosInstance = _wrapperRequsetAdapto.getAsyncAxiosInstance;

  var requests = {
    getAxiosInstance: getAxiosInstance,
    getAsyncAxiosInstance: getAsyncAxiosInstance,

    get: function axiosServiceGet(url, requestOpts, moreConfigs) {
      var request = wrapperRequest(requestOpts);

      return function (params, configs) {
        return request(_extends({ url: url, method: _requestTypes.GET, params: params }, configs, moreConfigs));
      };
    },
    post: function axiosServicePost(url, requestOpts, moreConfigs) {
      var request = wrapperRequest(requestOpts);

      return function (data, configs) {
        return request(_extends({ url: url, method: _requestTypes.POST, data: data }, configs, moreConfigs));
      };
    },
    postXForm: function axiosServicePostXForm(url, requestOpts, moreConfigs) {
      var request = wrapperRequest(requestOpts);
      return function (data) {
        var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return request(_extends({
          url: url,
          method: _requestTypes.POST,
          data: data,
          transformRequest: [function () {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var headers = arguments[1];


            return Object.keys(data).reduce(function (formData, key) {
              formData.append(key, data[key]);
              return formData;
            }, new FormData());
          }],
          headers: _extends({
            'Content-Type': 'application/x-www-form-urlencoded'
          }, configs.headers)
        }, configs, moreConfigs));
      };
    },

    restFulGet: function axiosServiceRestFulGet(restFulUrl, requestOpts, moreConfigs) {
      var request = wrapperRequest(requestOpts);

      return function (urlData, params, configs) {
        return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.GET, params: params }, configs, moreConfigs));
      };
    },
    restFulPost: function axiosServicePost(restFulUrl, requestOpts, moreConfigs) {
      var request = wrapperRequest(requestOpts);
      return function (urlData, data, configs) {
        return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.POST, data: data }, configs, moreConfigs));
      };
    },
    delete: function axiosServiceDelete(restFulUrl, requestOpts, moreConfigs) {
      var request = wrapperRequest(requestOpts);
      return function (urlData, data, configs) {
        return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.DELETE, data: data }, configs, moreConfigs));
      };
    },
    put: function axiosServicePut(restFulUrl, requestOpts, moreConfigs) {
      var request = wrapperRequest(requestOpts);
      return function (urlData, data, configs) {
        return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.PUT, data: data }, configs, moreConfigs));
      };
    },
    patch: function axiosServicePatch(restFulUrl, requestOpts) {
      for (var _len2 = arguments.length, moreConfigs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        moreConfigs[_key2 - 2] = arguments[_key2];
      }

      var request = wrapperRequest(requestOpts);
      return function (urlData, data, configs) {
        return request(_extends({ url: (0, _utils.formatRestFulUrl)(restFulUrl, urlData), method: _requestTypes.PATCH, data: data }, configs, moreConfigs));
      };
    },
    head: function axiosServiceHead(url, requestOpts) {
      for (var _len3 = arguments.length, moreConfigs = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        moreConfigs[_key3 - 2] = arguments[_key3];
      }

      var request = wrapperRequest(requestOpts);
      return function (configs) {
        return request(_extends({ url: url, method: _requestTypes.HEAD }, configs, moreConfigs));
      };
    },
    options: function axiosServiceOptions(url, requestOpts) {
      for (var _len4 = arguments.length, moreConfigs = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        moreConfigs[_key4 - 2] = arguments[_key4];
      }

      var request = wrapperRequest(requestOpts);
      return function (configs) {
        return request(_extends({ url: url, method: _requestTypes.OPTIONS }, configs, moreConfigs));
      };
    },
    request: function axiosServiceRequest(url, requestOpts) {
      for (var _len5 = arguments.length, moreConfigs = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        moreConfigs[_key5 - 2] = arguments[_key5];
      }

      var request = wrapperRequest(requestOpts);
      return function (configs) {
        return request(_extends({ url: url }, configs, moreConfigs));
      };
    },

    jsonp: function axiosServiceJsonp(url, requestOpts) {}
  };

  return requests;
};

service.getRequestsByRoot = getRequestsByRoot;

exports.default = service;

/***/ }),
/* 1 */
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
/* 2 */
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

var _toString = Object.prototype.toString;

var isArray = exports.isArray = function isArray(val) {
  return toString.call(val) === '[object Array]';
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
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
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
  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

var extend = exports.extend = function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STATUS_200 = exports.STATUS_200 = 200;

var defaults = exports.defaults = {};

var requestDefaults = exports.requestDefaults = {
  autoLoading: true,

  msgKey: 'error_msg',

  dataKey: 'data',

  codeKey: 'dm_error',

  successCode: 0
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(3);

var _utils = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
  function Service() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Service);

    this.$http = null;
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
      (0, _utils.extend)(this.$http.defaults, _extends({}, _config.defaults, newConfig));
    }
  }, {
    key: 'setRequestDefaults',
    value: function setRequestDefaults() {
      var newRequestOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _utils.extend)(this.requestDefaults, newRequestOpts);
    }
  }, {
    key: '_executeRequestInstance',
    value: function _executeRequestInstance() {
      var _this = this;

      this.createdRequestStack.forEach(function (fn) {
        return fn(_this.$http);
      });
    }
  }, {
    key: '_executeAxiosInstance',
    value: function _executeAxiosInstance() {
      var _this2 = this;

      this.createdAxiosInstanceStack.forEach(function (fn) {
        return fn(_this2.$http);
      });
    }
  }]);

  return Service;
}();

exports.default = Service;

/***/ })
/******/ ]);
});
//# sourceMappingURL=axios-service.js.map