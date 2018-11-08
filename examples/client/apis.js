import axios from 'axios'
import axiosService, { getRequestsByRoot } from 'axios-service'
import { mockGetInfo } from './apis-mock'

// 这里的url只是个demo, 需要根据实际场景修改为真实的url, 或者使用webpack的devServer做跨域代理
// 如果跨域代理, root因为为 '/', 或者不填, 因为root的默认是也是 '/'
// 注意: 这里的root是写死的demo, 实际项目可能应该根据具体环境不同, 请求不同url做不同处理
const { get, post, postXForm } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })
const { get: gitHubGet, restFulGet: gitHubRestFulGet } = getRequestsByRoot({ root: 'https://api.github.com', isCreateInstance: true })

export const getInfo = get('api/getInfo', null, {
  autoLoading: false
})

export const getInfoCustom = get('/api/getInfoCustom', {
  msgKey: 'error_msg',
  codeKey: 'dm_error',
  successCode: 0
})

export const postInfo = post('api/postInfo')

// 配置api可以足够灵活, 如果有需要对通用的axios的config做处理, 这里可以配置一个高阶函数
export const postXFormWithStaticHeader = params => postXForm('api/postInfo')(params, {
  headers: {
    ticket: 'ticket'
  }
})

// restFulDemo
export const getGitHubUser = gitHubRestFulGet('users/$user', {
  dataKey: null
})


export const getInfoWithMock = mockGetInfo(get('api/getInfo', null, {
  autoLoading: false
}))

