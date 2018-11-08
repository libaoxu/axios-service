import axiosService from 'axios-service'
import { getInfo, getInfoCustom, postInfo, postXFormWithStaticHeader, getGitHubUser, getInfoWithMock } from './apis'
import jsonp from 'jsonp'
import axios from 'axios'

// todo 全局的loading队列
axios.interceptors.request.use(function (e) {
  // 全局拦截器, 如果apis中的getRequestsByRoot使用isCreateInstance, 就不会走全局
  console.log('全局拦截器: ', e)
  return e
})

// axios.defaults.withCredentials = true
// console.log(axiosService)
axiosService.init(axios, {
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

console.log('axios.defaults: ', axios.defaults)

const returnData = res => res.data

// 普通get请求
// 这里就不需要判断服务端返回的状态码了, 因为已经配置过了
const normalGetInfo = _ => getInfo()

const getInfoWithCustomResKeys = () => getInfoCustom()

// 普通postInfo请求
const postInfoWithTicket = () => postInfo({ ticket: 'ticket' }, {
  // 第二个参数是 axois的相关配置项, 可以放headers, params等
  headers: {
    ticket: 'ticket',
  }
}).then(({ data }) => data)

const postXForm = _ => postXFormWithStaticHeader({ name: 'libaoxu' })

// 第一个参数是urlData, 处理restFul url中的格式的
// 第二个参数是具体的data
// 第三个参数是axios的config
// chrome升级后, 不支持Access-Control-Allow-Origin: * 的处理, github这个接口估计用不了了, 后面在server中自己写一个
const restFulDemo = _ => getGitHubUser({ user: 'libaoxu' })

const normalGetInfoMock = _ => getInfoWithMock()


function jsonpDemo () {
  jsonp('https://suggest.taobao.com/sug', {
    param: 'q=love&callback',
    // prefix: 'cb',
    // name: 'callback'
  }, (err, res) => {
    err && console.log(res)
  })
}

const requestChains = [
  {
    text: '普通get请求',
    fn: normalGetInfo
  }, 
  {
    text: '自定义msgKey和codeKey的请求',
    fn: getInfoWithCustomResKeys
  }, 
  {
    text: 'post请求在headers上添加ticket',
    fn: postInfoWithTicket,
  }, 
  {
    text: 'post请求在apis已经配置好固定的header',
    fn: postXForm
  }, 
  {
    text: 'restFul配置案例',
    fn: restFulDemo
  },
  {
    text: '普通get请求的mock',
    fn: normalGetInfoMock
  }
]

const rootEl = document.getElementById('root')
const renderHtml = function () {
  const lists = requestChains.map(({ text, fn }, index) => `<div style="margin: 10px;">
    <button class="btn" data-index="${index}">${text}</button>
  </div>`).join('')

  rootEl.innerHTML = `
    <div id="butons">${lists}</div> 
    <br/>
    获取数据详情: <br/>
    <div id="resultInfo"></div>
  `
}

const bindEvents = function () {
  var resultInfoElem = rootEl.querySelector('#resultInfo')

  rootEl.addEventListener('click', function (e) {
    const target = e.target
    if (target.className.indexOf('btn') > -1) {
      resultInfoElem.innerHTML = 'waiting...'

      const chainIndex = target.dataset['index']
      const requestInfo = requestChains[chainIndex]

      requestInfo.fn().then(data => {
        console.log(requestInfo.text, data)
        resultInfoElem.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`
      })
    }
  })
}

renderHtml()
bindEvents()