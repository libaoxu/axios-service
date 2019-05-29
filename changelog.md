### 1.2.4
*2019-05-28*
- 在统一的response中添加多扩展一个message字段, 等价于msg字段, 受msgKey控制, 如[response keys](./src/create.js#L54)
- 在getRequestsByRoot所返回的request对象中, 添加`postXFormData`(通过FormData来转换data, 适用于上传文件, Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryxxx) 与 `postXFormString`(qs.stringify来转换data, Content-Type: application/x-www-form-urlencoded) 两个函数, 扩展了之前Requset Headers中Content-Type为的能力, 详细代码[postXFormData](./src/create.js#215) 和 [postXFormString](./src/create.js#241), 使用案例[apis配置](./examples/client/apis.js#L35)

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
