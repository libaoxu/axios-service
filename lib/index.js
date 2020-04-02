"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createAxiosService", {
  enumerable: true,
  get: function get() {
    return _create["default"];
  }
});
exports.serviceHocs = exports["default"] = exports.version = exports.mockDecorate = exports.getMockDecorateByEnv = exports.getMessageDecorate = exports.mockDecorator = exports.getMockDecoratorByEnv = exports.getMessageDecorator = exports.getRequestsByRoot = exports.axiosService = void 0;

var _create = _interopRequireDefault(require("./create"));

var serviceHocs = _interopRequireWildcard(require("./service-decorators"));

exports.serviceHocs = serviceHocs;

/**
 * axios封装, 为了业务层更简洁实用, 不需要判断status 和 codeKey等重复逻辑
 * @author libaoxu
 * @date 2018-05-08
 */
var getMessageDecorator = serviceHocs.getMessageDecorator,
    getMockDecoratorByEnv = serviceHocs.getMockDecoratorByEnv,
    mockDecorator = serviceHocs.mockDecorator,
    getMockDecorateByEnv = serviceHocs.getMockDecorateByEnv,
    getMessageDecorate = serviceHocs.getMessageDecorate,
    mockDecorate = serviceHocs.mockDecorate;
exports.mockDecorate = mockDecorate;
exports.getMessageDecorate = getMessageDecorate;
exports.getMockDecorateByEnv = getMockDecorateByEnv;
exports.mockDecorator = mockDecorator;
exports.getMockDecoratorByEnv = getMockDecoratorByEnv;
exports.getMessageDecorator = getMessageDecorator;
var axiosService = (0, _create["default"])();
exports.axiosService = axiosService;
var getRequestsByRoot = axiosService.getRequestsByRoot;
exports.getRequestsByRoot = getRequestsByRoot;
var version = __VERSION__;
exports.version = version;
axiosService.createAxiosService = _create["default"];
axiosService.getMessageDecorator = getMessageDecorator;
axiosService.getMockDecoratorByEnv = getMockDecoratorByEnv;
axiosService.mockDecorator = mockDecorator;
axiosService.serviceHocs = serviceHocs;
axiosService.version = version;
var _default = axiosService;
exports["default"] = _default;