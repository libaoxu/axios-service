# axios-service

[![npm version](https://img.shields.io/npm/v/axios-service.svg)](https://www.npmjs.com/package/axios-service)
[![build status](https://api.travis-ci.org/libaoxu/axios-service.svg)](https://travis-ci.org/libaoxu/axios-service)

### 全局配置
> 注意: 全局设置为全局通用的配置, 需要再入口处设置, 下面配置项也可以针对某个请求单独设置

```js
import axios from 'axios'
import axiosService from 'axios-service'

axiosService.init(axios, {
  // 基础设置
  defaults: {
    withCredentials: true
  },
  // 请求配置项设置
  requestDefaults: {
    // 目前还没实现, 预计在下个版本中处理
    autoLoading: true,
    // response.data下面的配置
    // server端请求msg(
    msgKey: 'msg',
    // server端数据的key
    dataKey: 'data',
    // server端请求状态的key
    codeKey: 'code',
    // server端请求成功的状态, 注意: 此为response.data下该接口请求成功状态码, 非浏览器中http请求返回的成功状态(200)
    successCode: 0
  }
})
```

### 参数介绍

[getRequestsByRoot参数介绍](https://github.com/libaoxu/axios-service/blob/master/src/index.js#L166)

[get参数介绍](https://github.com/libaoxu/axios-service/blob/master/src/index.js#L179)

[restFulGet参数介绍](https://github.com/libaoxu/axios-service/blob/master/src/index.js#L229)

### apis配置
> 注意: 上面的root参数应该从配置项中根据环境来获取, 这里仅仅是演示

```js

import { service, getRequestsByRoot } from 'axios-service'

// root: 请求跟路劲, 这里默认都是全局, 不走axios.create
const { get, post, postXForm } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })

// isCreateInstance 表示axios.create创建新的实例
const { get: peGet, post: pePost, restFulGet: peRestFulGet } = getRequestsByRoot({ root: 'https://api.github.com/', isCreateInstance: true })

export const getInfo = get('api/aladdin/login/info')

// 自定义key
export const getPeInfo = peGet('api/v2/user/login', {
  msgKey: 'msg',
  codeKey: 'status',
})

// 自定义config,
export const getPeInfo = peGet('api/v2/user/login', {
  msgKey: 'msg',
  codeKey: 'status',
}, {
  // 该值为自定义的, axios-service不会处理, 该config值会透传到 axios中interceptors中的第一个参数
  autoLoading: false
})

// 扩展函数参数
// 如: post请求, url上带query string
export const postPeInfo = (params, data) => pePost('api/v2/user/login', null, {
  params,
  data,
  // 该值为自定义的, axios-service不会处理, 该config值会透传到 axios中interceptors中的第一个参数
  autoLoading: false
})()
 

// 扩展函数Promise, 适合异步获取请求参数
const peUserLoginPost = pePost('api/v2/user/login')
const atomPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ uid: 123, sid: 123 })
  })
})
const asyncAddUidToApi = fn => params => atomPromise.then(({ uid, sid }) => fn({ ...params, uid, sid }))
export const asyncPostPeInfo = asyncAddUidToApi(peUserLoginPost)
```

具体使用
> 新版的servce在api中配置完即可直接使用, 不需要再次S.extend之类的, 也不需要从Service中获取具体的请求函数

```js
import { getInfo } from './apis'

// 第一个参数就是请求的参数, 第二个参数是额外的配置
getInfo({
  name: '12312',
}, {
  headers: {
    ticket: 'ticket',
  }
})
  .then(({ data }) => {
    // 这里的data就是成功的data, 不需要再判断
    console.log(data)
  }, (e) => {
    console.log(e)
  })

```



### restFul配置

```js
import { getRequestsByRoot } from 'axios-service'

const { get: peGet, post: pePost, restFulGet: peRestFulGet } = getRequestsByRoot({ root: 'http://api.demo.cn/' })

// 注意: url中需要再次配置的, 用$开始, 如$page_size, 即表示这个位置需要传入 page_size这个参数的值
export const getHost = peRestFulGet('api/v2/tree/tagstring/cop.inke/page_size/$page_size/page_index/$page_index/hosts', {
  msgKey: 'msg',
  codeKey: 'status',
})
```

```js
import { getInfo, getPeInfo, getHost } from './apis'

// 第一个参数是urlData, 即restFul中需要替换url的值, 拼接的过程serviceProxy会处理
// 第二个参数是具体的data
getHost({
  page_size: 10,
  page_index: 1
}, {
  name: 'test'
})
  .then(({ data }) => {
    console.log(data)
  }, (e) => {
    console.log(e)
  })

```

### 启动示例
```
// demo页
npm run example

// 模拟api接口的node服务
npm run apiserver
```

### 项目构建
```
npm run build
```

### 项目发布
```
npm run pub
```


#### 项目规范

1. **readme**： 组件所涉及配置、方法和基础使用一定要详细和正确, 让开发人员复制过来就能用
2. **example**： 一定要有示例, 其他开发人员才能更容易看懂
3. **src**： 具体逻辑放到src(source)下面
4. **build**： 是构建和发布相关
5. **dist**： 是构建之后的目录, 支持dev和prod双模式
6. **package.json** 
- scripts: 抽象不同功能， 一定要自动化
- main: 指定node_modules中依赖的入口文件

7. **eslint**: 业务代码要有规范, 通用项目更要有代码规范, 
8. **changelog**: 每次项目迭代所做的修改一定做好记录
9. test： 通用的组件肯定是业务无关的, 最好要有单元测试
10. travis：持续集成
