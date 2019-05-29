import axios from 'axios'
import axiosService from 'axios-service'

const customService = axiosService.create()
const instance = axios.create()

customService.init(instance, {
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
    successCode: 0
  }
})

// todo 全局的loading队列
instance.interceptors.request.use(function (e) {
  // 全局拦截器, 如果apis中的getRequestsByRoot使用isCreateInstance, 就不会走全局
  console.log('axiosCreate 独立实例拦截器: ', e)
  return e
})


const { getRequestsByRoot } = customService
const { get, post, postXForm } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })

export const axiosServiceCreateGetInfo = get('api/getInfo', null, {
  autoLoading: false
})
