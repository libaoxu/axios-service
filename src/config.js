
export const STATUS_200 = 200

export const defaults = {
  // withCredentials: true
}

export const defaultBaseConfig = {
  root: '/',
  isCreateInstance: false
}

export const requestDefaults = {
  // server端请求msg
  msgKey: 'error_msg',
  // server端数据的key, 注意: 如果这个dataKey不存在, 会将http请求返回的data字段直接返回
  dataKey: 'data',
  // server端请求状态的key
  codeKey: 'dm_error',
  // server端请求成功的状态, 注意: 是服务端返回的状态码, 不是xhr在浏览器端的返回状态
  successCode: 0
}
