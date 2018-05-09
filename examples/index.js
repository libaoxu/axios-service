import axios from 'axios'
import axiosService from 'axios-service'
import { getInfo, getPeInfo, updateForm, getHost } from './apis'
console.log(axiosService)
axiosService.init(axios, {
  defaults: {
    withCredentials: true
  },
  requestDefaults: {
    autoLoading: true,
    // server端请求msg
    msgKey: 'msg',
    // server端数据的key
    dataKey: 'data',
    // server端请求状态的key
    codeKey: 'code',
    // 浏览器请求成功的状态
    successNo: 200
  }
})

// 普通get请求
getInfo({ ticket: 'ticket' }, {
  // 第二个参数是 axois的相关配置项, 可以放headers, params等
  headers: {
    ticket: 'ticket',
  }
})
  .then(({ data }) => {
    console.log('getInfo: ', data)
  })

// 普通get请求, 根路径不同
getPeInfo({ ticket: 'ticket' })
  .then(({ data }) => {
    console.log('getPeInfo: ', data)
  })

// post请求, 还需要动态变化url的情况
updateForm({ username: 'username', pwd: '123' }, {
  params: {
    ticket: 'ticket'
  }
})
  .then(({ data }) => {
    console.log('updateForm: ', data)
  })

// 第一个参数是urlData, 处理restFul url中的格式的
// 第二个参数是具体的data
// 第三个参数是axios的config
getHost({
  page_size: 20,
  page_index: 1
})
  .then(({ data }) => {
    console.log('getHost: ', data)
  })