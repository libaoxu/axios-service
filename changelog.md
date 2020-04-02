### 1.4.1
*2020-4-1*

### Changed
 * `xxxDecorator`名字改为`xxxDecorate`, 表示需要执行一次来创建真正的装饰器, 区别为: `@decorator` 和 `@decorate(xxx)`
 * `requestOpts` 替换为 `responseKeys`

### 1.4.0
*2020-03-30*
### Added
  * pkg引入[create-decorator](https://github.com/inkefe/create-decorator), 修改`service-decorators`中各种装饰器底层逻辑, 如[service-decorators.js](./src/service-decorators.js)
  * 引入最新的`setDataDecorate`、`setParamsDecorate`、`delayDecorate`等装饰器, 扩展`apis`装饰器功能, 详见[apis-request-decorators](./examples/client/apis-request-decorators.js)
  * 将`setCustomDataWrapper`和`setCustomParamsWrapper`标志为废弃的api, 避免高阶函数与装饰器想混淆, 后面统一用装饰器思想来抽象配置化逻辑

### Changed
  * 去掉README中`autoLoading`这个参数, `autoLoading`这个配置项方案早已废弃掉, 但是说明文档中有误导的嫌疑
  * `request`函数中会判断response.data中是否再有`response`字段, 如果存在, 则给*response.data*添加`__originResponse`字段, 详见: [request](./src/create.js#L55)

### Fixed
  * `example/server` 兼容不存在`req.headers.origin`等常见, 详见[server.js](./examples/server/index.js#L56)
  * `example/client` 中保留`axios.defaults.transformRequest`逻辑, 不做强硬替换, 否则会出现`Content-Type`中`application/json`失效等情况, 详见[axiosService.init](./examples/client/index.js#L20)


### 1.3.7
*2019-12-17*
### Added
  * examples 增加 transformRequest 的输出
  * 增加isMustObject工具函数 判断原型字符串[object Object]情况 [详见](./src/utils.js#L36)
### Changed
  * 重写deepMerge工具函数 增加value是数组情况下的merge [详见](./src/utils.js#L154)
  * getRequestsByRoot所返回的requests对象中, `postXFormData`, `postXFromString` data层处理改用transformRequset处理, 可保`interceptors`data数据统一，如[mergeTransfrom](./src/create.js#L211)
  * service实例setDefault 由简单merge改为deepMerge 兼容transformRequset transformResponse [详见](./src/service.js#27)

### 1.3.6
*2019-11-08*
### Added
  * axios instance请求成功后增加response undefined情况, [增加提示信息并处理返回值](./src/create.js#L44)
  * axiosService返回的responseData中增加axios所返回的response字段, [详见](./src/create.js#L55)
### Changed
  * axios instance请求成功后去掉http状态码判断, 详见[axios/core/settle.js](https://github.com/axios/axios/blob/master/lib/core/settle.js#L13)
  * codeKey 不匹配时, 修改logger.error文案, [详见](./src/create.js#L73)

### 1.3.5
*2019-10-14*
### Added
  * readme中增加关于`dataKey`为不存在的配置说明, 详见[datakey说明](./readme.md#L30)
  * example的server中增加`getInfoResponseString`接口, 不返回Json数据, 仅返回一个字符串


### 1.3.4
*2019-08-27*
### Fixed
  * 修复`setCustomParamsWrapper`对get请求的params设置, 详见: [axiosServiceGet](./src/create.js#L203)
### Added
  * 案例中增加自定义更多参数传递

### 1.3.3
*2019-08-23*
### Fixed
  * 修改`release.sh`去掉`np`命令(慢, 又不稳定), 改为手动`Draft Release`

### 1.3.2
*2019-08-23*
### Added
  * 在入口中添加`serviceHocs`, 如[serviceHocs](./src/index.js#L22)
  * `service-decorators`中添加[getErrMsg](./src/service-decorators.js#L109); 使用案例请参考[service-hocs](./examples/client/service-hocs.js), [apis](./examples/client/apis.js#L64)
  * `service-decorators`中添加[requestOptsWrapper](./src/service-decorators.js#L134), [setCustomDataWrapper](./src/service-decorators.js#L170), [setCustomParamsWrapper](./src/service-decorators.js#L197), 使用案例请参考: [api-request-custom](./examples/client/apis-request-custom.js)
### Fixed
  *
### Changed
  * version 从环境变量`__VERSION__`中自动获取, [webpack配置](./build/webpack.base.conf.js#L19)

### 1.3.1
*2019-08-04*
- 再axios-serivce中暴露mockDecorator函数, [src/index.js](./src/index.js#L20)
- 再axios-serivce中增加当前系统的version变量, [src/index.js](./src/index.js#L12)

### 1.3.0
*2019-08-04*
- dist目录构建结果修改为: `axios-serivce.development.js` 和 `axios-serivce.production.min.js`, [webpack.prod.conf](./build/webpack.prod.conf.js#L6)
- package.json中`main`字段指向index.js, index.js中根据环境区分判断指向`axios-serivce.development.js`or`axios-serivce.production.min.js`, [package.json](./package.json#L5), [index.js](./index.js)
- service-decorators中暴露了[mockDecorator](./src/service-decorators.js#L47), 这样mock时候就不用传入process.env.NODE_ENV的判断了, 因为构建时候已经构建出两个 process.env.NODE_ENV 变量的js, 并在入口index.js判断开发模式和构建会引入不同的js, 已经保证了dev和prod双模式下的区分;

### 1.2.6
*2019-07-04*
- 修改this.$https.defaults 修改axios.defaults内部地址引用问题, 导致axios内部config值设置失效, 非常严重的bug, 详见[this.setDefaults](./src/service.js#L26)


### 1.2.5
*2019-06-12*
- 修改createAxiosService中 new Service 所传参数`requestOpts`的地址引用问题, 具体如: [new Service](./src/create.js#L15);
- readme中添加[axiosService.create](./readme.md#L292)使用案例;
- 修改readme中消息装饰器`getMessageDecorator`案例中单词拼写问题, 对应[issues/5](https://github.com/libaoxu/axios-service/issues/5);


### 1.2.4
*2019-05-28*
- 在接口请求的response中多扩展一个message字段, 等价于之前的`msg`字段, 受`msgKey`控制, 如[response keys](./src/create.js#L54)
- 在getRequestsByRoot所返回的requests对象中, 添加`postXFormData`(通过FormData来转换data, 适用于上传文件, Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryxxx) 与 `postXFormString`(qs.stringify来转换data, Content-Type: application/x-www-form-urlencoded) 两个函数, 扩展了之前Requset Headers中Content-Type为的能力, 详细代码[postXFormData](./src/create.js#L215) 和 [postXFormString](./src/create.js#L241), 使用案例[apis配置](./examples/client/apis.js#L35)

### 1.2.3
*2019-04-28*
- 添加[service-decorators](./src/service-decorators.js), 包含mock装饰器和消息装饰器, 不管哪种装饰提供的都是一个装饰的思路, 开发者可自由扩展自定义装饰器, 如异步参数依赖, 单例, loading等等
- 新增消息装饰器[getMessageDecorator](./src/service-decorators.js#L43), [apis-message案例](./examples/client/apis-message.js)
- 请求接口成功或失败均添加颜色

### 1.2.0
*2019-04-16*
- 增加axiosService增加create函数, 支持创建多个axiosService对象, [axiosService.create](./src/create.js#288), [examples](./examples/client/axios-service-create.js)
- 添加requestConnect高级函数, 简化相同逻辑, [requestConnect](./src/create.js#L172)
- 优化create内部结构, 解除无必要闭包, 优化内部逻辑耦合
- requests下添加restFulDelete, 原有delete保持不变, [restFulDelete](./src/create.js#L282)
- 拆分mockDecorator, 如: [mock-decorator](./src/mock-decorator.js)

### 1.1.5
*2019-1.16*
- 修复获取apiFn的方案, 兼容普通函数和descriptor.initializer || descriptor.value获取装饰函数两种case

### 1.1.4
*2018-11.12*
- 添加getMockDecoratorByEnv, 为mockDecorator提供注入环境变量方案, 适用性更强

### 1.1.3
*2018-11.8*
- 去掉console.log
- 添加logger修改, 修改提示信息主题为: [axios-service]
- release.sh中添加git pull origin master

### 1.1.2
*2018-11.8*

- package.json的scripts中, 添加lint, 对src文件进行lint校验
- axios-service添加 mockDecorator 功能作为尝试, 在example中添加响应案例

### 1.1.1

*2018-09-26*

- 修改service.js中 对options.defaults的deepMerge改为浅拷贝, 不能改变axios.defaults这个对象的地址引用, 详见axios.defaults源码
- apis中getRequestsByRoot返回的函数, 如get|post|restfulGet等添加第三个参数moreConfigs, 便于透传给axios, 这样axios.interceptors可以拿到
- utils.js添加加joinRootAndPath函数, 在getRequestsByRoot中的参数root中可以以 **/** 结束, 在get的第一个参数path中可以 以 **/** 开头, 不写也可以, 都写也可以

### 1.1.0

*2018-07-19*

- 内部逻辑大改造, 取消每次get|post创建过多无用的axios实例, 改为getRequestsByRoot创建一个axios实例
- 取消axios.create来创建实例, 只将root作为闭包变量, 这样保证每次getRequestByRoot请求接口独立, 每次用的其实都是全局axios
- 丰富example, 增加模拟接口的服务, 浏览器端增加视图, 启动命令详见[启动示例](readme.md#启动示例)
- 删除res中的__response__变量, 避免循环引用(Converting circular structure), 而且也没啥用

### 1.0.7

*2018-05-31*

- 将response统一返回 data, msg, code这三个key

### 1.0.5

*2018-05-10*
- 将Object.assign 替换为extend, 以后这种es6的api通过uitl自己实现, 防止真实构造函数不编译情况(不能使用tranform-runtime 这样包会太大)


### 1.0.4

*2018-05-10*

- 更新service.init中接收的requestDefaults这个参数, 将successNo -> successCode, 并添加说明, 此为response.data下该接口请求成功状态码, 非浏览器中http请求返回的成功状态(200)
- src/config.js 中 将status.SUCCESS -> STATUS_200
- 整理readme

**todo**
- 支持jsonp
- 添加travis.xml

### 1.0.3

*2018-05-10*

- 更新readme

### 1.0.2

*2018-05-10*

- 修复bug: [libraryTarget: 'umd'](https://github.com/webpack/webpack/issues/6522)
- 修改接口请求失败的日志信息
- 增加sourcemap
- 修复release.sh分支切换分支失败等问题

### 1.0.1

*2018-05-08*

- 增加dist构建, 支持es6和es5
- 增加examples
- axiso-service 配置项增加dataKey为undefined情况的处理
