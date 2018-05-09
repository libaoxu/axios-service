### 全局配置
> 注意: 全局设置为全局通用的配置, 需要再入口处设置, 下面配置项也可以针对某个请求单独设置

```js
import axiosService from 'axios-service'

// 基础设置
axiosService.setDefaults({
  withCredentials: true
})

// 请求配置项设置
axiosService.setRequestDefaults({
  errMsgKey: 'msg',
  codeKey: 'status',
})

```

### apis配置
> 注意: 上面的root参数应该从配置项中根据环境来获取, 这里仅仅是演示

```js
import { service, getRequestsByRoot } from 'axios-service'
const { get, post, postXForm } = getRequestsByRoot({ root: 'https://www.demo.cn/' })

const { get: peGet, post: pePost, restFulGet: peRestFulGet } = getRequestsByRoot({ root: 'http://api.demo.cn/' })


export const getInfo = get('api/aladdin/login/info')

// 自定义key
export const getPeInfo = peGet('api/v2/user/login', {
  msgKey: 'msg',
  codeKey: 'status',
})
```

具体使用
> 新版的servce再api中配置完即可直接使用, 不需要再次S.extend之类的, 也不需要从Service中获取具体的请求函数

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
  .then(({ data, __response__: response }) => {
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
  .then(({ data, __response__: response }) => {
    console.log(data)
  }, (e) => {
    console.log(e)
  })

```


