import { serviceHocs, getRequestsByRoot, getMockDecoratorByEnv } from 'axios-service'
import { messageDecorate, requestFailErrMsg } from './service-hocs'
import { mockGetInfo } from './apis-mock'

const { requestOptsWrapper, setDataDecorate, setParamsDecorate, delayDecorate } = serviceHocs
const { get: baseGet, post: basePost } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })

const prodMockDecorate = getMockDecoratorByEnv(false)

const responseKeys = {
  msgKey: 'error_msg',
  codeKey: 'dm_error',
  successCode: 0
}

const customData = { name: 'libx', birth: '1996' }

const customParams = { uid: 123, sid: 456 }

const get = requestOptsWrapper(baseGet, responseKeys)

const post = requestOptsWrapper(basePost, responseKeys)

class Apis {
  getInfoCustom = get('/api/getInfoCustom')

  postInfoCustom = post('/api/postInfoCustom')

  // 将customParams 固定到请求的query string中
  @setParamsDecorate(customParams)
  getInfoWithParamsDecorator = get('/api/getInfoCustom')

  // 将customData 固定到请求的body体中
  @setDataDecorate(customData)
  getInfoWithDataDecorator = post('/api/getInfoCustom')

  @setParamsDecorate(customParams)
  @setDataDecorate(customData)
  getInfoWithParamsAndDataDecorator = post('/api/getInfoCustom')

  @messageDecorate({ successMsg: '混合装饰器请求成功', errorMsg: requestFailErrMsg })
  @prodMockDecorate(() => {})
  @delayDecorate(3000)
  @mockGetInfo
  @setParamsDecorate(customParams)
  @setDataDecorate(customData)
  getInfoWithMoreDecorators = post('/api/getInfoCustom')
}

export default new Apis()
