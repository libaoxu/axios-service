import { getRequestsByRoot } from 'axios-service'

// 这里的url只是个demo, 需要根据实际场景修改为真实的url, 或者使用webpack的devServer做跨域代理
// 如果跨域代理, root因为为 '/', 或者不填, 因为root的默认是也是 '/'
// 注意: 这里的root是写死的demo, 实际项目可能应该根据具体环境不同, 请求不同url做不同处理
const { get, post, postXForm } = getRequestsByRoot({ root: 'http://www.demo.cn/' })
const { get: peGet, post: pePost, restFulGet: peRestFulGet } = getRequestsByRoot({ root: 'http://b.demo.cn./' })

export const getInfo = get('api/getinfo')

// 配置api可以足够灵活, 如果有需要对通用的axios的config做处理, 这里可以配置一个高阶函数
export const updateForm = params => postXForm('api/updateform')(params, {
  headers: {
    ticket: 'ticket'
  }
})

// 自定义key
export const getPeInfo = peGet('api/v2/user/login', {
  msgKey: 'msg',
  codeKey: 'status',
})

export const getHost = peRestFulGet('api/v2/tree/tagstring/cop.inke/page_size/$page_size/page_index/$page_index/hosts', {
  msgKey: 'msg',
  codeKey: 'status',
})


