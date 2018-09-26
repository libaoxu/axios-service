/**
 * axios封装, 为了业务层更简洁实用, 不需要判断status 和 codeKey等重复逻辑
 * @author libaoxu
 * @date 2018-05-08
 */
import { GET, POST, PATCH, PUT, HEAD, DELETE, OPTIONS } from './request-types'
import { formatRestFulUrl, extend, joinRootAndPath } from './utils'
import { STATUS_200, defaults, requestDefaults } from './config'
import Service from './service'

export const service = new Service({
  requestDefaults,
  createdRequestStack: [],
  createdAxiosInstanceStack: []
})

const getWrapperRequestByInstance = function getWrapperRequestByInstance (instance) {
  return function getRequestWithOptions (requestOpts) {
    const { msgKey, codeKey, dataKey, successCode } = {
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
            let msg = apiRes[msgKey]
            let code = apiRes[codeKey]

            extend(apiRes, { data, msg, code })
            
            if (code === successCode) {
              return Promise.resolve(apiRes)
            } else {
              console.error(`[service请求错误], msg: ${msg}, code: ${code} `, ...requestInfo)
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
  const { root = '/', isCreateInstance } = baseConfigs
  let axiosInstance
  let asyncAxiosInstance
  let _request
  let $httpResolve
  let timeout = 3000
  let $httpReady = new Promise((resolve, reject) => {
    $httpResolve = resolve
  })
  
  let tid = setTimeout(() => {
    if (!axiosInstance) {
      console.error('请注入axios实例, 如: axiosService.init(axios, config)')
    }
  }, timeout)
  
  const getInstance = function getInstance () {
    if (service.$http) {
      clearTimeout(tid)
      let instance

      if (isCreateInstance) {
        instance = service.$http.create({
          baseURL: root,
          ...baseConfigs
        })
      } else {
        instance = opts => service.$http({ ...opts, url: joinRootAndPath(root, opts.url )})
      }
      instance.baseURL = root

      return instance
    }
  }

  const getInstaceSync = function getInstaceSync () {
    // 处理异步注入axioIntance的情况
    if (!service.$http) {
      service.createdAxiosInstanceStack.push($httpResolve)
      return $httpReady.then(getInstance)
    }
  }

  const getRequest = (axiosInstance, requestOpts) => {
    const _getRequestByOpts = getWrapperRequestByInstance(axiosInstance)
    return _getRequestByOpts(requestOpts)
  }
  
  // 保证了, 同一个wrapperRequsetAdaptor, 只创建有一个axiosInstance
  axiosInstance = getInstance()

  if (!axiosInstance) {
    // 异步注入axois情况, getInstance也是一次
    asyncAxiosInstance = getInstaceSync()
    asyncAxiosInstance.then((_axiosInstance) => {
      axiosInstance = _axiosInstance
    })
  }

  const wrapperRequest = function wrapperRequest (requestOpts) {
    let _request
    if (axiosInstance) {
      _request = getRequest(axiosInstance, requestOpts)
    } else {
      asyncAxiosInstance && asyncAxiosInstance.then((axiosInstance) => {
        _request = getRequest(axiosInstance, requestOpts)
      })
    }

    return function requestDecorator (...params) {
      if (_request) {
        return _request(...params)
      } else {
        return asyncAxiosInstance.then(() => _request(...params))
      }
    }
  }

  return {
    getAxiosInstance: _ => axiosInstance,
    getAsyncAxiosInstance: _ => asyncAxiosInstance,
    wrapperRequest
  }
}

const jsonWrapperRequest = function jsonWrapperRequest (baseConfigs) {
  return function wrapperRequest (opts) {
    
  }
}

/**
 * 根据根路径获取请求函数
 * 
 * @param {any} baseConfigs axios的基础配置, 
 * @property {String} baseConfigs.root 根路劲
 * @property {Boolean} baseConfigs.isCreateInstance 是否创建新实例, 即: axios.create
 * 
 * @returns {Object} requests axios请求集合
 */
export const getRequestsByRoot = function getRequestsByRoot (baseConfigs = {}) {
  const { wrapperRequest, getAxiosInstance, getAsyncAxiosInstance } = wrapperRequsetAdaptor(baseConfigs)

  const requests = {
    getAxiosInstance,
    getAsyncAxiosInstance,
    /**
     * get请求的封装
     * 
     * @param {String} url 请求的url后缀
     * @param {Object} requestOpts 请求的配置项, 详见config.js中的requestDefaults
     * @param {Object} moreConfigs 该值为自定义的, axios-service不会处理, 该config值会透传到 axios中interceptors中的第一个参数
     * @returns {Function} 业务层做请求的函数
     */
    get: function axiosServiceGet (url, requestOpts, moreConfigs) {
      const request = wrapperRequest(requestOpts)
      /**
       * @param {Object} params 即get请求需要的数据
       * @param {Object} config 请求接口的配置项, 详见https://github.com/axios/axios#request-config
       * 注意: get请求, 第一个参数传params, 
       */
      return (params, configs) => request({ url, method: GET, params, ...configs, ...moreConfigs })
    },
    post: function axiosServicePost (url, requestOpts, moreConfigs) {
      const request = wrapperRequest(requestOpts)
      /**
       * @param {Object} data 即post请求需要的数据
       * 注意: post请求, 第一个参数传data
       */
      return (data, configs) => request({ url, method: POST, data, ...configs, ...moreConfigs })
    },
    postXForm: function axiosServicePostXForm (url, requestOpts, moreConfigs) {
      const request = wrapperRequest(requestOpts)
      return (data, configs = {}) => {
        return request({ 
          url, 
          method: POST, 
          data,
          transformRequest: [function (data = {}, headers) {
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
          ...configs,
          ...moreConfigs
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
    restFulGet: function axiosServiceRestFulGet (restFulUrl, requestOpts, moreConfigs) {
      const request = wrapperRequest(requestOpts)
      /**
       * @param {Object} urlData restFul中需要替换url的值, 拼接的过程serviceProxy会处理
       * @param {Object} params 
       * @param {Object} configs 请求配置项
       */
      return (urlData, params, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: GET, params, ...configs, ...moreConfigs})
    },
    restFulPost: function axiosServicePost (restFulUrl, requestOpts, moreConfigs) {
      const request = wrapperRequest(requestOpts)
      return (urlData, data, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: POST, data, ...configs, ...moreConfigs })
    },
    delete: function axiosServiceDelete (restFulUrl, requestOpts, moreConfigs) {
      const request = wrapperRequest(requestOpts)
      return (urlData, data, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: DELETE, data, ...configs, ...moreConfigs })
    },
    put: function axiosServicePut (restFulUrl, requestOpts, moreConfigs) {
      const request = wrapperRequest(requestOpts)
      return (urlData, data, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: PUT, data, ...configs, ...moreConfigs })
    },
    patch: function axiosServicePatch (restFulUrl, requestOpts, ...moreConfigs) {
      const request = wrapperRequest(requestOpts)
      return (urlData, data, configs) => 
        request({ url: formatRestFulUrl(restFulUrl, urlData), method: PATCH, data, ...configs, ...moreConfigs })
    },
    head: function axiosServiceHead (url, requestOpts, ...moreConfigs) {
      const request = wrapperRequest(requestOpts)
      return configs => request({ url, method: HEAD, ...configs, ...moreConfigs })
    },
    options: function axiosServiceOptions (url, requestOpts, ...moreConfigs) {
      const request = wrapperRequest(requestOpts)
      return configs => request({ url, method: OPTIONS, ...configs, ...moreConfigs })
    },
    request: function axiosServiceRequest (url, requestOpts, ...moreConfigs) {
      const request = wrapperRequest(requestOpts)
      return configs => request({ url, ...configs, ...moreConfigs })
    },
    // todo
    jsonp: function axiosServiceJsonp (url, requestOpts, ...moreConfigs) {

    }
  }

  return requests
}

service.getRequestsByRoot = getRequestsByRoot

export default service