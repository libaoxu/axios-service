import { getRequestsByRoot, serviceHocs, version } from 'axios-service'
import { compose } from 'redux'
import { mockGetInfo, mockSuccess, mockFail } from './apis-mock'
import { messageDecorator, requestFailErrMsg } from './service-hocs';

// 本库并不强依赖redux, 其他具有compose功能的库都可以用, 如: ramda
// const { compose } = require('ramda')

// 这里的url只是个demo, 需要根据实际场景修改为真实的url, 或者使用webpack的devServer做跨域代理
// 如果跨域代理, root因为为 '/', 或者不填, 因为root的默认是也是 '/'
// 注意: 这里的root是写死的demo, 实际项目可能应该根据具体环境不同, 请求不同url做不同处理
const { get, post, postXForm, postXFormData, postXFormString } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })
const { get: gitHubGet, restFulGet: gitHubRestFulGet } = getRequestsByRoot({ root: 'https://api.github.com', isCreateInstance: true })

// dataKey为null时, 会直接将http请求中的data字段返回
export const getInfoNoDataKey = get('api/getInfoResponseString', { dataKey: null })

export const getInfo = get('api/getInfo', null, {
  autoLoading: false
})

export const postInfo = post('api/postInfo')

// 配置api可以足够灵活, 如果有需要对通用的axios的config做处理, 这里可以配置一个高阶函数
export const postXFormWithStaticHeader = params => postXForm('api/postInfo')(params, {
  headers: {
    ticket: 'ticket'
  }
})

export const postXFormDataWithStaticHeader = params => postXFormData('api/postInfo')(params, {
  headers: {
    ticket: 'ticket'
  }
})

export const postXFormStringWithStaticHeader = params => postXFormString('api/postInfo')(params, {
  headers: {
    ticket: 'ticket'
  }
})

// restFulDemo
export const getGitHubUser = gitHubRestFulGet('users/$user', {
  dataKey: null
})


export const getInfoWithMock = mockGetInfo(get('api/getInfo', null, {}))

class Apis {
  @mockGetInfo
  getInfoWithMock = get('api/getInfo', null, {})

  /**
   * mockSuccess 和 mockFail之间可自由切换
   */
  @messageDecorator({ successMsg: '获取信息成功', errorMsg: (error) => (error && error.message) || '获取信息失败' })
  @mockSuccess
  // @mockFail
  getInfoWithMesageDecorator = get('api/getInfo')

  /**
   * 函数式写法mockFail
   */
  getInfoFailWithDecorators = compose(
    messageDecorator({ successMsg: '获取信息成功', errorMsg: requestFailErrMsg }),
    mockFail
  )(get('api/getInfo'))
}

export const apis = new Apis()

