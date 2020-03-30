import { serviceHocs, getRequestsByRoot, getMockDecoratorByEnv } from 'axios-service'
import { messageDecorator, requestFailErrMsg } from './service-hocs'
import { mockGetInfo } from './apis-mock'

const { requestOptsWrapper, setDataDecorator, setParamsDecorator, delayDecorator } = serviceHocs
const { get: baseGet, post: basePost } = getRequestsByRoot({ root: 'http://127.0.0.1:3801/' })

const prodMockDecorator = getMockDecoratorByEnv(false)

const requestOpts = {
  msgKey: 'error_msg',
  codeKey: 'dm_error',
  successCode: 0
}

const customData = { name: 'libx', birth: '1996' }

const customParams = { uid: 123, sid: 456 }

const get = requestOptsWrapper(baseGet, requestOpts)

const post = requestOptsWrapper(basePost, requestOpts)

class Apis {
  getInfoCustom = get('/api/getInfoCustom')

  postInfoCustom = post('/api/postInfoCustom')

  // 将customParams 固定到请求的query string中
  @setParamsDecorator(customParams)
  getInfoWithParamsDecorator = get('/api/getInfoCustom')

  // 将customData 固定到请求的body体中
  @setDataDecorator(customData)
  getInfoWithDataDecorator = post('/api/getInfoCustom')

  @setParamsDecorator(customParams)
  @setDataDecorator(customData)
  getInfoWithParamsAndDataDecorator = post('/api/getInfoCustom')

  @messageDecorator({ successMsg: '混合装饰器请求成功', errorMsg: requestFailErrMsg })
  @prodMockDecorator(() => {})
  @delayDecorator(3000)
  @mockGetInfo
  @setParamsDecorator(customParams)
  @setDataDecorator(customData)
  getInfoWithMoreDecorators = post('/api/getInfoCustom')
}

export default new Apis()
