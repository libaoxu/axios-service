### 1.1.0

*2018-07-19*

- 内部逻辑大改造, 取消每次get|post创建过多无用的axios实例, 改为getRequestsByRoot创建一个axios实例
- 取消axios.create来创建实例, 只将root作为闭包变量, 这样保证每次getRequestByRoot请求接口独立, 每次用的其实都是全局axios
- 丰富example, 增加模拟接口的服务, 浏览器端增加视图, 启动命令详见[readme]('./readme.md)
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
