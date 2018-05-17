/**
 * axios封装, 为了业务层更简洁实用, 不需要判断status 和 codeKey等重复逻辑
 * @author libaoxu
 * @date 2018-05-08
 */
import { GET, POST, PATCH, PUT, HEAD, DELETE, OPTIONS } from './request-types'
import { formatRestFulUrl } from './utils'
import { STATUS_200, defaults, requestDefaults } from './config'
import Service from './service'

export const service = new Service({
  requestDefaults,
  createdRequestStack: []
})

const getWrapperRequest = function getWrapperRequest (instance) {
  return function wrapperRequest (requestOpts) {
    const { autoLoading, msgKey, codeKey, dataKey, successCode } = {
      ...service.requestDefaults,
      ...requestOpts,
    }

    /**
     * 请求开始和请求结束的封装, 把状态的判断等重复case做处理
     * 
     * @param {any} opts 请求的config
     * @returns {Promise} 请求结果
     * todo loading
     */
    return function request (opts) {
      const requestInfo =  [`url: ${instance.baseURL}${opts.url}`, ', params:', opts.params, ', data:', opts.data]

      return instance(opts)
        .then(response => {
          const { status, data: apiRes, config } = response

          if (status === STATUS_200) {
            // 如果不存在dataKey, 则不处理data相关的值, 仅将data返回回去
            if (!dataKey) {
              return Promise.resolve(apiRes)
            }
            let data = apiRes[dataKey]
            let errMsg = apiRes[msgKey]
            let code = apiRes[codeKey]

            apiRes.__response__ = response
            
            if (code === successCode) {
              return Promise.resolve(apiRes)
            } else {
              console.error(`[service请求错误], errMsg: ${errMsg}, `, ...requestInfo)
              return Promise.reject(apiRes)
            }
          }
        }, (e) => {
          console.error(`[service请求失败]: `, ...requestInfo)
          return Promise.reject(e)
        
        })
    }
  }
}

const wrapperRequsetAdaptor = function wrapperRequsetAdaptor (baseConfigs) {
  const { root = '/' } = baseConfigs
  let _request
  let $httpResolve
  let timeout = 3000
  let $httpReady = new Promise((resolve, reject) => {
    $httpResolve = resolve
  })
  
  let tid = setTimeout(() => {
    if (!_request) {
      console.error('请注入axios实例, 如: axiosService.init(axios, config)')
    }
  }, timeout)
  
  const createInstance = function createInstance (requestOpts) {
    clearTimeout(tid)
    let instance = service.$http.create({
      baseURL: root,
      ...baseConfigs
    })
    instance.baseURL = root
    return _request = getWrapperRequest(instance)(requestOpts)
  }

  return function wrapperRequest (requestOpts) {
    if (service.$http) {
      return createInstance(requestOpts)
    } else {
      // 处理异步注入axioIntance的情况
      $httpReady.then(() => {
        createInstance(requestOpts)
      })
      service.createdRequestStack.push($httpResolve)
      return function requestDecorator (...params) {
        if (_request) {
          return _request(...params)
        } else {
          return $httpReady.then(() => _request(...params))
        }
      } 
    }
  }
}

const jsonWrapperRequest = function jsonWrapperRequest (baseConfigs) {
  return function wrapperRequest (opts) {
    
  }
}

/**
 * 根据根路径获取请求函数
 * 
 * @param {any} baseConfigs axios的基础配置, 详见https://github.com/axios/axios#creating-an-instance
 * @returns {Object} requests axios请求集合
 */
export const getRequestsByRoot = function getRequestsByRoot (baseConfigs = {}) {
  const wrapperRequest = wrapperRequsetAdaptor(baseConfigs)

  const requests = {
    /**
     * get请求的封装
     * 
     * @param {String} url 请求的url后缀
     * @param {Object} requestOpts 请求的配置项, 详见config.js中的requestDefaults
     * @returns {Function} 业务层做请求的函数
     */
    get: function axiosServiceGet (url, requestOpts) { 
      const request = wrapperRequest(requestOpts)
      /**
       * @param {Object} params 即get请求需要的数据
       * @param {Object} config 请求接口的配置项, 详见https://github.com/axios/axios#request-config
       * 注意: get请求, 第一个参数传params, 
       */
      return (params, configs) => request({ url, method: GET, params, ...configs })
    },
    post: function axiosServicePost (url, requestOpts) {
      const request = wrapperRequest(requestOpts)
      /**
       * @param {Object} data 即post请求需要的数据
       * 注意: post请求, 第一个参数传data
       */
      return (data, configs) => request({ url, method: POST, data, ...configs })
    },
    postXForm: function axiosServicePostXForm (url, requestOpts) {
      const request = wrapperRequest(requestOpts)
      return (data, configs = {}) => {
        return request({ 
          url, 
          method: POST, 
          data,
          transformRequest: [function (data, headers) {
            // if (typeof window === 'undefined') {
            //   console.error('application/x-www-form-urlencoded类型, 请在客户端请求, url:', url)
            // }
  
            return Object.keys(data)
              .reduce((formData, key) => {
                formData.append(key, data[key])
                return formData
              }, new FormData())
          }], 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...configs.headers
          },
          ...configs
        })
      }
    },
    /**
     * resFul用的get请求
     * 
     * @param {String} restFulUrl 请求的url, 且与上面的url配置有区别, 详见readme.md
     * @param {Object} requestOpts 请求配置项
     * @returns {Function} 具体请求的函数
     */
    restFulGet: function axiosServiceRestFulGet (restFulUrl, requestOpts) {
      const request = wrapperRequest(requestOpts)
      /**
       * @param {Object} urlData restFul中需要替换url的值, 拼接的过程serviceProxy会处理
       * @param {Object} params 
       * @param {Object} configs 请求配置项
       */
      return (urlData, params, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: GET, params, ...configs })
    },
    restFulPost: function axiosServicePost (restFulUrl, requestOpts) {
      const request = wrapperRequest(requestOpts)
      return (urlData, data, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: POST, data, ...configs })
    },
    delete: function axiosServiceDelete (restFulUrl, requestOpts) {
      const request = wrapperRequest(requestOpts)
      return (urlData, data, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: DELETE, data, ...configs })
    },
    put: function axiosServicePut (restFulUrl, requestOpts) {
      const request = wrapperRequest(requestOpts)
      return (urlData, data, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: PUT, data, ...configs })
    },
    patch: function axiosServicePatch (restFulUrl, requestOpts) {
      const request = wrapperRequest(requestOpts)
      return (urlData, data, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: PATCH, data, ...configs })
    },
    head: function axiosServiceHead (url, requestOpts) {
      const request = wrapperRequest(requestOpts)
      return configs => request({ url, method: HEAD, ...configs })
    },
    options: function axiosServiceOptions (url, requestOpts) {
      const request = wrapperRequest(requestOpts)
      return configs => request({ url, method: OPTIONS, ...configs })
    },
    request: function axiosServiceRequest (url, requestOpts) {
      const request = wrapperRequest(requestOpts)
      return configs => request({ url, ...configs })
    },
    // todo
    jsonp: function axiosServiceJsonp (url, requestOpts) {

    }
  }

  return requests
}

service.getRequestsByRoot = getRequestsByRoot

export default service