# axios-service

[![npm version](https://img.shields.io/npm/v/axios-service.svg)](https://www.npmjs.com/package/axios-service)
[![build status](https://api.travis-ci.org/libaoxu/axios-service.svg)](https://travis-ci.org/libaoxu/axios-service)

### 安装
```sh
npm install axios-service -D
```

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

[getRequestsByRoot参数介绍](./src/create.js#L136)

[get参数介绍](./src/create.js#L189)

[restFulGet参数介绍](./src/create.js#L235)

[getMockDecoratorByEnv参数介绍](./src/service-decorators.js#L5)

[getMessageDecorator参数介绍](./src/service-decorators.js#L5)

[service-decorators装饰规范](./src/service-decorators.js)

[更多apis用法及使用示例](./examples/client/apis.js)

### apis配置示例
> 注意: 下面的root参数应该从配置项中根据环境来获取, 这里仅仅是演示

```js

import { service, getRequestsByRoot } from 'axios-service'

// root: 请求跟路劲, 这里默认都是全局, 不走axios.create
const { get, post, postXForm, postXFormData, postXFormString } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })

// isCreateInstance 表示axios.create创建新的实例
const { get: peGet, post: post, restFulGet: peRestFulGet } = getRequestsByRoot({ root: 'https://api.github.com/', isCreateInstance: true })

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
export const postPeInfo = (params, data) => post('api/v2/user/login', null, {
  params,
  data
})()
 
export const postXFormData = (params, data) => postXFormData('api/v2/user/login', null, {
  params,
  data
})()
 
 
export const postXFormString = (params, data) => postXFormString('api/v2/user/login', null, {
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
  // 第一个then是成功的回调, 是通过successCode和codeKey一起判断, 
  .then(({ data, code, msg }) => {
    // 这里的 data, code, msg这三个字段, 就是配置时候传入的dataKey, codeKey, msgKey
    console.log(code, msg, data)
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


### 接口mock
> axios-service与axios-mock-adapter并没有冲突, 只是

1. axios-mock-adapter一旦使用, 全局所有用axios请求的接口都要进行mock, 如果大型项目, 每个接口都需要维护mock工作量成本过大, **本库提供的方案可以针对需要mock的接口单独做简单mock**, 可灵活处理
2. 本库提供一个保险机制, 在getMockDecoratorByEnv传入一个Boolean值, 如果是`真`走mock, 如果是`假`则走针接口, 可以保证在生产环境不会被mock干扰

> 本库提供两个方案, 一个是函数包裹, 一个是类的装饰器方案. 如果用类的方案,需要添加class的decorators解析器[babel-plugin-transform-decorators](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy#readme)

使用案例: 
```js
import { getMockDecoratorByEnv } from 'axios-service'

// 传入的值为: 是否为开发环境. 该变量是做一层保障, 在[生产模式]会走直接口, [开发环境]走mock数据, 以防忘记关闭mock而打包上线, 导致线上请求mock数据的情况
// web项目
const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')
// react-native项目
const mockDecorator = getMockDecoratorByEnv(__DEV__)


// 注意: 从1.3.1起, 直接暴露了mockDecorator函数, 不需要通过getMockDecoratorByEnv来创建
import { mockDecorator } from 'axios-service'


// mock相关逻辑
const mockGetInfo = mockDecorator((...args) => {
  // 这样可以在production构建阶段, 剔除掉if内部的mock代码, 减少线上包体积, 下面代码构建结果如下: if(false) { var mockjs; }
  if (process.env.NODE_ENV === 'development') {
    const mockjs = require('mockjs')
    return Promise.resolve({
      'code': 0,
      'message': 'success',
      'data': {
        'name': '李宝旭 mock',
        'name_en': 'libaoxu by mock',
        'email': 'libaoxu520@gmail.com',
        'github': 'https://github.com/libaoxu'
      },
      'msg': 'success'
    })
  }
})

// 包裹函数的写法
export const getInfoWithMock = mockGetInfo(get('api/getInfo', null, {
  autoLoading: false
}))


// 类装饰器的写法
class Apis {
  @mockGetInfo
  getInfoWithMock = get('api/getInfo', null, {
    autoLoading: false
  })
}

export default new Apis()

```

### 消息装饰器
> 消息装饰器是一个工具函数, 与axios-service没有关联, 可装饰任何返回Promise的函数, 该装饰器更多提供的只是一个装饰的思路, 开发者可自由扩展自定义装饰器, 如异步参数依赖, 单例, loading等等
```js
import { getMessageDecorator } from 'axios-service'
// 本库并不强依赖redux, 其他具有compose功能的库都可以用, 如: ramda
import { compose } from 'redux'
// const { compose } = require('ramda')

const { get, post, , postXFormData, postXFormString } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })

/**
 * 实际项目中应该替换 success 和 erorr 对应的ui函数
 */ 
const messageDecorator = getMessageDecorator({ success: alert, error: alert })

/**
 * 单个装饰器
 */
class Apis {
  @messageDecorator({ successMsg: '获取用户信息请求成功', errorMsg: '获取用户信息请求失败' })
  getInfo = get('api/getInfo')
}

/**
 * 多个装饰器
 */
class Apis {
  @messageDecorator({ successMsg: '获取用户信息请求成功', errorMsg: (error) => (error && error.msg) || '请求失败' })
  @mockSuccess
  getInfo = get('api/getInfo')

  /**
   * 函数式写法
   */ 
  getInfoFunc = compose(
    messageDecorator({ successMsg: '请求成功', errorMsg: (error) => (error && error.msg) || '请求失败' })
    mockSuccess
  )(get('api/getInfo'))
}

``` 

未使用消息装饰器接口的写法
```js
// 如果api.getInfo被多次调用, 每次调用都需要写toast相关逻辑
api.getInfo().then(() => {
  toast.success('请求成功')
}, () => {
  toast.error('请求失败)  
})
```

使用消息装饰器的用法
```js
// 该接口使用多次之后, 不需要每次都进行消息提示
api.getInfo()
```

### 创建新实例
> 配合axios.create使用, 创建新的axiosService实例, 更多案例详情, 请查看使用案例[axios-service-create](./examples/client/axios-service-create.js)
```js
const instance = axios.create()
const customService = axiosService.create(instance, {
  defaults: {
    withCredentials: true
  },
  requestDefaults: {
    autoLoading: true,
    // server端请求msg
    msgKey: 'message',
    // server端数据的key
    dataKey: 'data',
    // server端请求状态的key
    codeKey: 'code',
    // server端请求成功的状态
    successCode: 1
  }
})

instance.interceptors.request.use(function (e) {
  console.log('axiosCreate 独立实例拦截器: ', e)
  return e
})


const { getRequestsByRoot } = customService
const { get, post, postXForm } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })

export const axiosServiceCreateGetInfo = get('api/getCode1Info', null, {
  autoLoading: false
})

```


### 更多实际演示请查看代码
[examples](./examples/client/index.js)

### 启动命令示例
```
// api实际演示案例
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
