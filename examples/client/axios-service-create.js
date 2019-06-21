import axios from 'axios'
import axiosService from 'axios-service'

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
