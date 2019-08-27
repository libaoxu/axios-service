import axiosService from 'axios-service'
import { getInfo, postInfo, postXFormWithStaticHeader, getGitHubUser, getInfoWithMock, apis, postXFormDataWithStaticHeader, postXFormStringWithStaticHeader } from './apis'
import jsonp from 'jsonp'
import axios from 'axios'
import { axiosServiceCreateGetInfo } from './axios-service-create';
import { getInfoCustom, postInfoCustom, getInfoCustomComposedData, postInfoCustomComposedParamsAndData } from './apis-request-custom';

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
console.log('axiosService version: ', axiosService.version)

const returnData = res => res.data

// 普通get请求
// 这里就不需要判断服务端返回的状态码了, 因为已经配置过了
const normalGetInfo = _ => getInfo()

// 普通postInfo请求
const postInfoWithTicket = () => postInfo({ ticket: 'ticket' }, {
  // 第二个参数是 axois的相关配置项, 可以放headers, params等
  headers: {
    ticket: 'ticket',
  }
}).then(({ data }) => data)

const postXForm = _ => postXFormWithStaticHeader({ name: 'libaoxu' })
const postXFormDataDemo = _ => postXFormDataWithStaticHeader({ name: 'libaoxu' })
const postXFormStringDemo = _ => postXFormStringWithStaticHeader({ name: 'libaoxu' })

// 第一个参数是urlData, 处理restFul url中的格式的
// 第二个参数是具体的data
// 第三个参数是axios的config
// chrome升级后, 不支持Access-Control-Allow-Origin: * 的处理, github这个接口估计用不了了, 后面在server中自己写一个
const restFulDemo = _ => getGitHubUser({ user: 'libaoxu' })

const normalGetInfoMock = _ => getInfoWithMock()
const normalGetInfoMockByClass = _ => apis.getInfoWithMock()

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
    text: 'post请求在headers上添加ticket',
    fn: postInfoWithTicket,
  }, 
  {
    text: 'post请求在apis已经配置好固定的header',
    fn: postXForm
  },
  {
    text: 'header中的Content-Type是application/x-www-form-urlencoded类型的post请求, data是FormData',
    fn: postXFormDataDemo
  },
  {
    text: 'header中的Content-Type是application/x-www-form-urlencoded类型的post请求, data是string',
    fn: postXFormStringDemo
  },
  {
    text: 'restFul配置案例',
    fn: restFulDemo
  },
  {
    text: '普通get请求的mock',
    fn: normalGetInfoMock
  },
  {
    text: '用类的装饰器方案, 做普通get请求的mock',
    fn: normalGetInfoMockByClass
  },
  {
    text: '预制请求消息提示的装饰器: 类写法',
    fn: apis.getInfoWithMesageDecorator
  },
  {
    text: '预制请求消息提示的装饰器: 函数式写法',
    fn: apis.getInfoFailWithDecorators
  },
  {
    text: 'axiosService.create',
    fn: axiosServiceCreateGetInfo
  },
  {
    text: '自定义msgKey和codeKey的 get 请求 ',
    fn: () => getInfoCustom({ start: 1111 })
  }, 
  {
    text: '自定义msgKey和codeKey的 post 请求 ',
    fn: postInfoCustom
  },
  {
    text: 'compose 自定义requestOpts 和 customData 的 get 请求 ',
    fn: () => getInfoCustomComposedData({ key1: '111', key2: '222' })
  }, 
  {
    text: 'compose 自定义requestOpts 和 customParams 和 customData 的 post 请求 ',
    fn: () => postInfoCustomComposedParamsAndData({ key1: 'aaa', key2: 'bbb' }, {
      headers: {
        'ticket': 'mo tian lun'
      }
    })
  }, 
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
        resultInfoElem.innerHTML = `<pre style="color: limegreen;">${JSON.stringify(data, null, 2)}</pre>`
      }, error => {
        if (error) {
          resultInfoElem.innerHTML = `<pre style="color: red;">${JSON.stringify(error, null, 2)}</pre>`
        }
      })
    }
  })
}

renderHtml()
bindEvents()