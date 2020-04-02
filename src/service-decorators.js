/**
 * @file mock装饰器 和 消息装饰器都是工具函数, 与axios-service没有关联, 可装饰任何返回Promise的函数, 这些装饰器更多提供的只是一个装饰的思路, 开发者可自由扩展自定义装饰器, 如异步参数依赖, 单例, loading等等
 * @author libaoxu
 */
import createDecorator from '@inkefe/create-decorator'
import { deprecateWrapper, compose } from './utils'

/**
 * 通过环境变量获取mock装饰器
 * @param {String} isDev 是否为开发环境
 * @return {Function}
 * TODO: 因做了xhr的拦截, 打出logger, 并标记好颜色和分组那种
 */
export function getMockDecoratorByEnv (isDev) {
  /**
   * mock装饰器
   * @param {Function} mockFn mock的函数逻辑
   * @return {Function}
   */
  return function mockDecorate (mockFn) {
    return createDecorator(apiFn => (...args) => {
      // 开发环境走mock, 如果需要关闭, 需要再apis种删除
      if (isDev) {
        return mockFn(...args)
      }
      return apiFn(...args)
    })
  }
}

// 名词改为动词, 表示需要创建一下才能生成 decorator
export const getMockDecorateByEnv = getMockDecoratorByEnv

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
 * 名词改为动词, 表示需要创建一下才能生成 decorator
 */
export const mockDecorate = mockDecorator

/**
 * 消息提示装饰器, 依赖于外层toast对象, 提供toast.success 和 toast.error两个函数
 * @param {Object} toast
 * @param {Function} toast.success
 * @param {Function} toast.error
 */
export const getMessageDecorator = toast => {
  /**
   * 预制的消息内容
   *
   * @param {Object} { successMsg: String|Function, errorMsg: String|Function }
   * @property {String|Function} successMsg: 成功的消息
   * @property {String|Function} errorMsg: 失败的消息
   */
  return ({ successMsg, errorMsg } = {}) => {
    // eslint-disable-next-line no-console
    const alert = typeof window !== 'undefined' ? window.alert : console.log
    const getToast = name => ((typeof toast === 'object' && typeof toast[name] === 'function') ? toast[name] : alert)
    const messageGetter = msg => ((typeof msg === 'function') ? msg : _ => msg)
    const successToast = getToast('success')
    const errorToast = getToast('error')
    const getSuccessMsg = messageGetter(successMsg)
    const getErrorMsg = messageGetter(errorMsg)

    return createDecorator(fn => (...args) => {
      return typeof fn === 'function' && fn(...args).then(res => {
        const msg = getSuccessMsg(res)
        msg && successToast(msg)
        return Promise.resolve(res)
      }, err => {
        const msg = getErrorMsg(err)
        msg && errorToast(msg)
        return Promise.reject(err)
      })
    })
  }
}

// 名词改为动词, 表示获取到的是decorate 需要创建一下才能生成 decorator
export const getMessageDecorate = getMessageDecorator

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


const requestToSetParams = (request, customParams) => (data, config = {}) => {
  return typeof request === 'function' && request(data, {
    ...config,
    params: {
      ...config.params,
      ...customParams
    },
  })
}

const requestToSetData = (request, customData) => (data, ...args) => request({ ...customData, ...data }, ...args)

const decoratorsReadmeUrl = 'https://github.com/libaoxu/axios-service#%E6%9B%B4%E5%A4%9A%E8%A3%85%E9%A5%B0%E5%99%A8'

/**
 * @name 满足提前预置自定义params, 不管get or post 都扩展到 Query String Parameters上
 * @param {Function} fn axios-service 的 getRequestsByRoot 产出的requestPathWrapper函数, 如get, post
 * @param {Object} customParams
 * @deprecated
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
export const setCustomParamsWrapper = compose(
  deprecateWrapper('setCustomParamsWrapper', decoratorsReadmeUrl),
  requestConnector
)(requestToSetParams)

/**
 * data扩展: get请求扩展到 Query String Parameters上, post请求扩展到 payload上
 *
 * @param {Function} fn  axios-service 的 getRequestsByRoot 产出的requestPathWrapper函数, 如get, post
 * @param {Object} customData 预置请求的data
 * @deprecated
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
export const setCustomDataWrapper = compose(
  deprecateWrapper('setCustomDataWrapper', decoratorsReadmeUrl),
  requestConnector
)(requestToSetData)

/**
 * 装饰器目的: 可以将固定数据注入到请求的queryString中
 * @param {Object} customParams 需要在request时注入到queryString中的数据
 * @example
 * class Apis {
 *   @setParamsDecorate({ uid, sid })
 *   getUserInfo = get('/user/info')
 * }
 */
export const setParamsDecorate = customParams => createDecorator(fn => requestToSetParams(fn, customParams))

/**
 * 装饰器目的为: 可以将固定数据注入请求的数据中, post(将数据固定到body体中), get请求(将数据固定到query string中)
 * @param {Object} customData 需要在request时注入到body体中的数据
 * @example
 * class Apis {
 *   @setDataDecorate({ uid, sid })
 *   getUserInfo = get('/user/info')
 * }
 */
export const setDataDecorate = customData => createDecorator(fn => requestToSetData(fn, customData))

/**
 * 根据环境变量获取延时装饰器, 做一个保护机制, 以防production环境也延时, 引起线上bug
 * @param {Boolean} isDev 是否为开发环境
 * web端:
 * const delayDecorate = getDelayDecorate(process.env.NODE_ENV === 'development')
 * RN端:
 * const delayDecorate = getDelayDecorate(__DEV__)
 * 小程序端:
 * const delayDecorate = getDelayDecorate(环境变量名 === dev环境变量值)
 */
export const getDelayDecorate = isDev => {
  return wait => createDecorator(fn => (...args) => {
    if (isDev) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(fn(...args))
        }, wait || 0);
      })
    }
    return fn(...args)
  })
}

/**
 * 延时装饰器, 已经根据环境变量区分, 适用于web端项目, 小程序和rn端应该使用上面`getDelayDecorate`来创建新的延时装饰器
 * class A {
 *  // 延时3s请求
 *  @delayDecorate(3000)
 *  getUserInfo = get('/user/info')
 * }
 */
export const delayDecorate = getDelayDecorate(process.env.NODE_ENV === 'development')
