
import { mockDecorator } from 'axios-service'

export const mockGetInfo = mockDecorator((...args) => {
  return Promise.resolve({
    'code': 0,
    'message': 'success',
    'data': {
      'name': '李宝旭 mock',
      'name_en': 'libaoxu by mock',
      'email': 'libaoxu520@gmail.com',
      'github': 'https://github.com/libaoxu'
    },
    'msg': 'success'
  })
})