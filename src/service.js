import { defaults } from './config'

export default class Service {
  constructor (options = {}) {
    this.$http = options.instance || null
    this.requestDefaults = options.requestDefaults || {}
    this.createdRequestStack = options.createdRequestStack || []
    this.createdAxiosInstanceStack = options.createdAxiosInstanceStack || []
  }

  // 注意, service实例初始化时候, 只创建对象, 不需要走init, init函数由外部初始化时候注入axisoInstance
  init (axiosInstance, options = {}) {
    this.setHttps(axiosInstance)
    this.setDefaults(options.defaults)
    this.setRequestDefaults(options.requestDefaults)
    this._executeRequestInstance()
    this._executeAxiosInstance()
  }

  setHttps ($http) {
    this.$http = $http || this.$http
  }

  setDefaults (newConfig) {
    this.$http.defaults = { ...defaults, ...newConfig }
  }

  setRequestDefaults (newRequestOpts = {}) {
    this.requestDefaults = { ...newRequestOpts }
  }

  _executeRequestInstance () {
    this.createdRequestStack.forEach(fn => fn && fn(this.$http))
  }

  _executeAxiosInstance () {
    this.createdAxiosInstanceStack.forEach(fn => fn && fn(this.$http))
  }
}
