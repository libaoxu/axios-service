import { codes, defaults, requestDefaults } from './config'

export default class Service {
  constructor (options = {}) {
    this.$http = null
    this.requestDefaults = options.requestDefaults
    this.createdRequestStack = options.createdRequestStack
  }
  
  // 注意, service实例初始化时候, 只创建对象, 不需要走init, init函数由外部初始化时候注入axisoInstance
  init (axiosInstance, options = {}) {
    this.setHttps(axiosInstance)
    this.setDefaults(options.defaults)
    this.setRequestDefaults(options.requestDefaults)
    this._executeRequestInstance()
  }
  
  setHttps ($http) {
    this.$http = $http || this.$http
  }
  
  setDefaults (newConfig) {
    // todo deepCopy
    Object.assign(this.$http.defaults, { ...defaults, ...newConfig })
  }
  
  setRequestDefaults (newRequestOpts = {}) {
    Object.assign(this.requestDefaults, newRequestOpts)
  }

  _executeRequestInstance () {
    this.createdRequestStack.forEach(fn => fn(this.$http))
  }
}