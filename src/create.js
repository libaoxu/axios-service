/**
 * axios封装, 为了业务层更简洁实用, 不需要判断status 和 codeKey等重复逻辑
 * @author libaoxu
 * @date 2018-05-08
 */
import { GET, POST, PATCH, PUT, HEAD, DELETE, OPTIONS } from './request-types'
import { formatRestFulUrl, extend, joinRootAndPath, logger, isObject } from './utils'
import { STATUS_200, defaults, requestDefaults, UN_PRODUCTION, defaultBaseConfig } from './config'
import Service from './service'
import qs from 'qs'


function createAxiosService (instance, options) {
  const service = new Service({
    requestDefaults: { ...requestDefaults },
    createdRequestStack: [],
    createdAxiosInstanceStack: [],
    instance,
    ...options
  })

  /**
   * axios实例的装饰器, 主要做响应拦截
   * @param {Axios} instance axios实例
   * @param {Object} requestOpts axiosService请求配置项, 包含状态检测等, 详见config.requestDefaults
   */
  const responseDecorator = function responseDecorator (instance, requestOpts) {
    const { msgKey, codeKey, dataKey, successCode } = {
      ...service.requestDefaults,
      ...requestOpts,
    }

    /**
     * 在请求开始和请求结束的, 把状态的判断等重复case做处理
     *
     * @param {any} config 请求的config
     * @returns {Promise} 请求结果
     * todo loading
     */
    return function request (config) {
      const requestInfo = [`url: ${instance.baseURL}${config.url}`, ', params:', config.params, ', data:', config.data]
      return instance(config)
        .then(response => {
          if (!response) {
            logger.error(`http请求失败: 失败原因请检查'axios.interceptors.request.use'中第二个函数返回值是否为'Promise.reject'`)
            return Promise.reject(new Error('http请求失败'))
          }

          // 返回的data不是object场景
          if (!isObject(response.data)) {
            return Promise.resolve(response)
          }

          const responseData = { ...response.data }
          responseData.response = response

          // 如果不存在dataKey, 则不处理data相关的值, 仅将data返回回去
          if (!dataKey) {
            return Promise.resolve(responseData)
          }

          // 进入到第一个then里的已经是200 ~ 300区间的http status了, 所以不需要再判断status字段是否200了, 详见: https://github.com/axios/axios/blob/master/lib/core/settle.js#L13
          const data = responseData[dataKey]
          const msg = responseData[msgKey]
          const code = responseData[codeKey]

          // 将更多的信息返回给客户端, 避免地址引用引起JSON.stringify报错, 采用挨个变量解构
          extend(responseData, { data, msg, code, message: msg })

          if (code === successCode) {
            return Promise.resolve(responseData)
          } else {
            logger.error(`codeKey: [${codeKey}] 不匹配: `, `msg: ${msg}, code: ${code} `, ...requestInfo, 'response: ', response)
            return Promise.reject(responseData)
          }
        }, (e) => {
          logger.error(`请求失败: `, ...requestInfo, '; error : ', e)
          return Promise.reject(e)
        })
    }
  }
  const handleAxiosInstances = function handleAxiosInstances (baseConfigs) {
    const { root, isCreateInstance } = { ...defaultBaseConfig, ...baseConfigs }
    if (root === undefined) {
      // eslint-disable-next-line no-console
      console.error('请传入正确的请求根路径, 如: / 或 https://api.github.com')
    }

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
        logger.error('请注入axios实例, 如: axiosService.init(axios, config)')
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
          instance = config => service.$http({ ...config, url: joinRootAndPath(root, config.url) })
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

    // 保证了, 同一个wrapperRequsetAdaptor, 只创建有一个axiosInstance
    axiosInstance = getInstance()

    if (!axiosInstance) {
      // 异步注入axois情况, getInstance也是一次
      asyncAxiosInstance = getInstaceSync()
      asyncAxiosInstance.then((_axiosInstance) => {
        axiosInstance = _axiosInstance
      })
    }

    return {
      getAxiosInstance: _ => axiosInstance,
      getAsyncAxiosInstance: _ => asyncAxiosInstance,
    }
  }

  const jsonWrapperRequest = function jsonWrapperRequest (baseConfigs) {
    return function getRequest (config) {

    }
  }

  /**
   * 根据根路径获取请求函数
   *
   * @param {any} baseConfigs axios的基础配置,
   * @property {String} baseConfigs.root 根路径
   * @property {Boolean} baseConfigs.isCreateInstance 是否创建新实例, 即: axios.create
   *
   * @returns {Object} requests axios请求集合
   */
  const getRequestsByRoot = function getRequestsByRoot (baseConfigs = {}) {
    // 第一步 获取通过init来注入的axios实例
    const { getAxiosInstance, getAsyncAxiosInstance } = handleAxiosInstances(baseConfigs)

    /**
     * 第二步 根据每个不同请求配置的requestOpts获取具体request请求的包装器
     * @param {Object} requestOpts 请求配置项对象
     * @property {String} opts.msgKey server端请求msg
     * @property {String} opts.dataKey server端数据的key
     * @property {String} opts.codeKey server端请求状态的key
     * @property {Number} opts.successCode server端请求成功的状态, 注意: 是服务端返回的状态码, 不是xhr在浏览器端的返回状态
     */
    const getRequest = function getRequest (requestOpts) {
      let _request
      const axiosInstance = getAxiosInstance()
      const asyncAxiosInstance = getAsyncAxiosInstance()

      if (axiosInstance) {
        _request = responseDecorator(axiosInstance, requestOpts)
      } else {
        asyncAxiosInstance && asyncAxiosInstance.then((axiosInstance) => {
          _request = responseDecorator(axiosInstance, requestOpts)
        })
      }

      return function handleRequest (...params) {
        if (_request) {
          return _request(...params)
        } else {
          return asyncAxiosInstance.then(() => _request(...params))
        }
      }
    }

    // 具体请求的装饰器, requestOpts => request, 将外层的配置参数进行预处理, 保证requestProxy只直接收axios的config
    const requestConnect = fn =>
      /**
       *
       * @param {String} url 请求的url后缀
       * @param {Object} requestOpts 请求的配置项, 详见config.js中的requestDefaults
       * @param {Object} moreConfigs 该值为自定义的, axios-service不会处理, 该config值会透传到 axios中interceptors中的第一个参数
       * @return {Function} fn执行结果
       */
      (url, requestOpts, ...args) => {
        const request = getRequest(requestOpts)
        return fn(url, request, ...args)
      }
    
    // merge tranform
    const mergeTransform = (transforms = [], fn) => {
      const defaults = options ? options.defaults : service.$http.defaults
      return transforms.concat((defaults && defaults[fn]) || [])
    }

    const requests = {
      getAxiosInstance,
      getAsyncAxiosInstance,
      /**
       * get请求的封装
       *
       * @returns {Function} 业务层做请求的函数
       */
      get: requestConnect(function axiosServiceGet (url, request, moreConfigs) {
        /**
         * @param {Object} params 即get请求需要的数据
         * @param {Object} config 请求接口的配置项, 详见https://github.com/axios/axios#request-config
         * 注意: get请求, 第一个参数传params,
         */
        return (params, configs = {}) => request({
          url,
          method: GET,
          ...configs,
          ...moreConfigs,
          // 保证params优先级最高, 加油💪
          params: {
            ...params,
            ...configs.params,
          },
        })
      }),
      post: requestConnect(function axiosServicePost (url, request, moreConfigs) {
        /**
         * @param {Object} data 即post请求需要的数据
         * 注意: post请求, 第一个参数传data
         */
        return (data, configs) => request({ url, method: POST, data, ...configs, ...moreConfigs })
      }),
      postXFormData: requestConnect(function axiosServicePostXForm (url, request, moreConfigs) {
        return (data, configs = {}) => {
          return request({
            url,
            method: POST,
            data,
            transformRequest: mergeTransform([function (data = {}, headers) {
              return Object.keys(data)
                .reduce((formData, key) => {
                  formData.append(key, data[key])
                  return formData
                }, new FormData())
            }], 'transformRequest'),
            // FormData数据不要设置headers, 即使设置Content-Type, axios在FormData类型时候也会删除掉这个key, 详见: https://github.com/axios/axios/blob/master/lib/adapters/xhr.js#L16
            // headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            //   ...configs.headers
            // },
            ...configs,
            ...moreConfigs
          })
        }
      }),
      postXFormString: requestConnect(function axiosServicePostXFormString (url, request, moreConfigs) {
        return (data, configs = {}) => {
          return request({
            url,
            method: POST,
            data,
            transformRequest: mergeTransform([function (data = {}, headers) {
              return qs.stringify(data)
            }], 'transformRequest'),
            // post请求: 浏览器会自动识别出Content-Type为: application/x-www-form-urlencoded, FormData有其他类型, 如: multipart/form-data
            // 如果是json情况, axios在defaults.transformRequest中会将headers中的Content-Type设置为'application/json', 并将data对象JSON.strigify, 这样浏览器才能识别出Request Payload, 详见: https://github.com/axios/axios/blob/master/lib/defaults.js#L50
            // 如果传入的是字符串'key1=value1&key2=value2', 浏览器会直接识别出为Form Data数据结构
            // headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            //   ...configs.headers
            // },
            ...configs,
            ...moreConfigs
          })
        }
      }),
      /**
       * resFul用的get请求
       *
       * @param {String} restFulUrl 请求的url, 且与上面的url配置有区别, 详见readme.md
       * @param {Object} requestOpts 请求配置项
       * @returns {Function} 具体请求的函数
       */
      restFulGet: requestConnect(function axiosServiceRestFulGet (restFulUrl, request, moreConfigs) {
        /**
         * @param {Object} urlData restFul中需要替换url的值, 拼接的过程serviceProxy会处理
         * @param {Object} params
         * @param {Object} configs 请求配置项
         */
        return (urlData, params, configs) =>
          request({ url: formatRestFulUrl(restFulUrl, urlData), method: GET, params, ...configs, ...moreConfigs })
      }),
      restFulPost: requestConnect(function axiosServicePost (restFulUrl, request, moreConfigs) {
        return (urlData, data, configs) =>
          request({ url: formatRestFulUrl(restFulUrl, urlData), method: POST, data, ...configs, ...moreConfigs })
      }),
      delete: requestConnect(function axiosServiceDelete (restFulUrl, request, moreConfigs) {
        return (urlData, data, configs) =>
          request({ url: formatRestFulUrl(restFulUrl, urlData), method: DELETE, data, ...configs, ...moreConfigs })
      }),
      put: requestConnect(function axiosServicePut (restFulUrl, request, moreConfigs) {
        return (urlData, data, configs) =>
          request({ url: formatRestFulUrl(restFulUrl, urlData), method: PUT, data, ...configs, ...moreConfigs })
      }),
      patch: requestConnect(function axiosServicePatch (restFulUrl, request, ...moreConfigs) {
        return (urlData, data, configs) =>
          request({ url: formatRestFulUrl(restFulUrl, urlData), method: PATCH, data, ...configs, ...moreConfigs })
      }),
      head: requestConnect(function axiosServiceHead (url, request, ...moreConfigs) {
        return configs => request({ url, method: HEAD, ...configs, ...moreConfigs })
      }),
      options: requestConnect(function axiosServiceOptions (url, request, ...moreConfigs) {
        return configs => request({ url, method: OPTIONS, ...configs, ...moreConfigs })
      }),
      request: requestConnect(function axiosServiceRequest (url, request, ...moreConfigs) {
        return configs => request({ url, ...configs, ...moreConfigs })
      }),
      // todo
      jsonp: requestConnect(function axiosServiceJsonp (url, request, ...moreConfigs) {

      })
    }

    requests.restFulDelete = requests.delete
    // 兼容老版
    requests.postXForm = requests.postXFormData

    return requests
  }

  service.getRequestsByRoot = getRequestsByRoot
  service.create = createAxiosService

  return service
}

export default createAxiosService
