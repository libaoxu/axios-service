/**
 * mock装饰器 和 消息装饰器都是工具函数, 与axios-service没有关联, 可装饰任何返回Promise的函数, 这些装饰器更多提供的只是一个装饰的思路, 开发者可自由扩展自定义装饰器, 如异步参数依赖, 单例, loading等等
 */

/**
 * 通过环境变量获取mock装饰器
 * @param {String} isDev 是否为开发环境
 * @return {Function}
 */
export function getMockDecoratorByEnv (isDev) {
  /**
   * mock装饰器
   * @param {Function} mockFn mock的函数逻辑
   * @return {Function}
   */
  return function mockDecorator (mockFn) {
    /**
     * 接口装饰器
     * @param {Class|Function} 所装饰类的实例对象 | 所装饰器的函数
     * @param {String|Undefined} property 属性的key名|Undefined
     * @param {Object|Undefined} descriptor es6装饰器对象|Undefined
     * @return {Object|Function} es6的装饰器对象|直接可执行函数
     */
    return function apiDecorator (target, property, descriptor) {
      let apiFn
      const applyApiWithEnv = (...args) => {
        // 开发环境走mock, 如果需要关闭, 需要再apis种删除
        if (isDev) {
          return mockFn(...args)
        } else {
          return apiFn(...args)
        }
      }
      if (!descriptor && typeof target === 'function') {
        apiFn = target
        return applyApiWithEnv
      } else {
        const initialFunc = descriptor.initializer || descriptor.value
        apiFn = initialFunc() || (() => {})
        descriptor.initializer = descriptor.value = _ => applyApiWithEnv
        return descriptor
      }
    }
  }
}

/**
 * mock装饰器
 * 
 * 注: 因为最新版axios-service 会构建出两个 process.env.NODE_ENV 变量的js, 并在入口index.js判断, 开发模式和构建会引入不同的js, 这样能保证dev模式和prod模式的区分
 * 
 * @param {Function} mockFn mock的函数逻辑
 * @return {Function}
 */
export const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

/**
 * 消息提示装饰器, 依赖于外层toast对象, 提供toast.success 和 toast.error两个函数
 * @param {Object} toast 
 * @param {Function} toast.success
 * @param {Function} toast.error
 */
export const getMessageDecorator = toast => 
  /**
   * 预制的消息内容
   *
   * @param {Object} { successMsg: String|Function, errorMsg: String|Function }
   * @property {String|Function} successMsg: 成功的消息
   * @property {String|Function} errorMsg: 失败的消息
   */
  ({ successMsg, errorMsg } = {}) => (target, name, descriptor) => {
    const noop = () => {}
    // eslint-disable-next-line no-console
    const alert = typeof window !== 'undefined' ? window.alert : console.log
    const getToast = name => (typeof toast === 'object' && typeof toast[name] === 'function') ? toast[name] : alert
    const messageGetter = msg => (typeof msg === 'function') ? msg : _ => msg
    const successToast = getToast('success')
    const errorToast = getToast('error')
    const getSuccessMsg = messageGetter(successMsg)
    const getErrorMsg = messageGetter(errorMsg)
    let origin

    const wrapper = (...args) => {
      return origin(...args).then((res) => {
        const msg = getSuccessMsg(res)
        msg && successToast(msg)
        return Promise.resolve(res)
      }, (err) => {
        const msg = getErrorMsg(err)
        msg && errorToast(msg)
        return Promise.reject(err)
      })
    }

    if (!descriptor && typeof target === 'function') {
      origin = target
      return wrapper
    } else {
      const initializer = descriptor.value || descriptor.initializer;
      origin = initializer() || noop
      descriptor.value = descriptor.initializer = _ => wrapper
    }

    return descriptor
  }



/**
 * errorMsg 消息高阶函数, 针对绝大多数 error
 * @param {String} msg 预置消息
 *
 * @example
 * class Api {
 *  @messageDecorator({ errorMsg: getErrorMsg('请求失败请重试') })
 *  requestAAA = get('api/requestAAA')
 * }
 *
 * or
 * 
 * // 声明好公共变量, 将 '请求失败请重试' 信息curry化起来, 方便多次复用
 * const requestFailErrMsg = getErrorMsg('请求失败请重试')
 * 
 * class Api {
 *  @messageDecorator({ errorMsg: requestFailErrMsg})
 *  requestAAA = get('api/requestAAA')
 * 
 *  @messageDecorator({ errorMsg: requestFailErrMsg})
 *  requestBBB = get('api/requestBBB')
 * }
 */
export const getErrorMsg = (msg = '') => error => error && (error.msg || msg)

/**
 * 
 * @param {Function} requestPathWrapper axios-service 的 getRequestsByRoot 产出的requestPathWrapper函数, 如get, post
 * @param {Object} opts 请求配置项对象
 * @property {String} opts.msgKey server端请求msg
 * @property {String} opts.dataKey server端数据的key
 * @property {String} opts.codeKey server端请求状态的key
 * @property {Number} opts.successCode server端请求成功的状态, 注意: 是服务端返回的状态码, 不是xhr在浏览器端的返回状态
 * 
 * @example
 * const requestOpts = { msgKey: 'Msg', dataKey: 'Code', codeKey: 'Code', successCode: 200 }
 * const get = requestOptsWrapper(baseGet, requestOpts)
 * const post = requestOptsWrapper(basePost, requestOpts)
 *
 * class Apis {
 *  getA = get('/api/getA')
 *  getB = get('/api/getB')
 *  postA = post('/api/postA')
 *  postB = post('/api/postB')
 * }
 */
export const requestOptsWrapper = (requestPathWrapper, opts) => (path, ...args) => requestPathWrapper(path, opts, ...args)

/**
 * 将 requestPathWrapper 转换为 request函数,并将其他参数preArgs, 一起透传到装饰函数
 * @param {Function} fn 装饰函数
 * 
 * @example
 * const customRequest = requestConnector((request, customArgs) => (data, ...args) => request(...))
 * const customGet = customRequest(get)
 */
const requestConnector = fn => (requestPathWrapper, ...preArgs) => (path, ...args) => {
  const request = requestPathWrapper(path, ...args)
  return fn(request, ...preArgs)
}

/**
 * @name 满足提前预置自定义params, 不管get or post 都扩展到 Query String Parameters上
 * @param {Function} fn axios-service 的 getRequestsByRoot 产出的requestPathWrapper函数, 如get, post
 * @param {Object} customParams 
 *
 * @example
 * const customParams = { uid: 123, sid: 'abc' }
 * const postWithAtom = setCustomParamsWrapper(post, customParams)
 * const getWithAtom = setCustomParamsWrapper(get, customParams)
 *
 *
 * class Apis {
 *  getA = getWithAtom('/api/getA')
 *  postB = postWithAtom('/api/postB')
 * }
 */
export const setCustomParamsWrapper = requestConnector(
  (request, customParams) => (data, config = {}) => request(data, {
    ...config,
    params: {
      ...config.params,
      ...customParams
    },
  })
)


/**
 * data扩展: get请求扩展到 Query String Parameters上, post请求扩展到 payload上
 *
 * @param {Function} fn  axios-service 的 getRequestsByRoot 产出的requestPathWrapper函数, 如get, post
 * @param {Object} customData 预置请求的data
 * 
 * @example
 * const customData = { uid: 123, sid: 'abc' }
 * const postWithCustomData = setCustomDataWrapper(post, customData)
 * const getWithCustomData = setCustomDataWrapper(get, customData)
 *
 *
 * class Apis {
 *  getA = getWithCustomData('/api/getA')
 *  postB = postWithCustomData('/api/postB')
 * }
 */
export const setCustomDataWrapper = requestConnector(
  (request, customData) => (data, ...args) => request({ ...customData, ...data }, ...args)
) 
