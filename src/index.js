/**
 * axios封装, 为了业务层更简洁实用, 不需要判断status 和 codeKey等重复逻辑
 * @author libaoxu
 * @date 2018-05-08
 */
import createAxiosService from './create'
import { getMessageDecorator, getMockDecoratorByEnv, mockDecorator } from './service-decorators'

const axiosService = createAxiosService()
const getRequestsByRoot = axiosService.getRequestsByRoot
// 目前手动维护, 后面考虑如何扩展吧
const version = '1.3.1'

export {
  axiosService,
  getRequestsByRoot,
  createAxiosService,
  getMessageDecorator,
  getMockDecoratorByEnv,
  mockDecorator,
  version
}

axiosService.version = version

export default axiosService