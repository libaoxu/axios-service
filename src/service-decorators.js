/**
 * 不管是mock装饰器 还是 消息装饰器提供的都是一个装饰的思路, 开发者可自由扩展自定义装饰器, 如异步参数依赖, 单例, loading等等
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
