/**
 * 通过环境变量获取mock装饰器
 * @param {String} isDev 是否为开发环境
 * @return {Function}
 */
export default function getMockDecoratorByEnv (isDev) {
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