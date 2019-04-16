
import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')
// const mockDecorator = getMockDecoratorByEnv(false)

export const mockGetInfo = mockDecorator((...args) => {
  // 这样可以在production构建阶段, 剔除掉if内部的mock代码, 减少线上包体积, 下面代码构建结果如下: if(false) { var mockjs; }
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      'code': 0,
      'message': 'success',
      'data': {
        'name': '李宝旭 mock',
        'name_en': 'libaoxu by mock',
        'email': 'libaoxu520@gmail.com mock',
        'github': 'https://github.com/libaoxu mock'
      },
      'msg': 'success'
    })
  }
})