/**
 * axios封装, 为了业务层更简洁实用, 不需要判断status 和 codeKey等重复逻辑
 * @author libaoxu
 * @date 2018-05-08
 */
import createAxiosService from './create'
import * as serviceHocs from './service-decorators'

const { getMessageDecorator, getMockDecoratorByEnv, mockDecorator, getMockDecorateByEnv, getMessageDecorate, mockDecorate } = serviceHocs

const axiosService = createAxiosService()
const getRequestsByRoot = axiosService.getRequestsByRoot
// eslint-disable-next-line no-undef
const version = __VERSION__

export {
  axiosService,
  getRequestsByRoot,
  createAxiosService,
  getMessageDecorator,
  getMockDecoratorByEnv,
  mockDecorator,
  getMessageDecorate,
  getMockDecorateByEnv,
  mockDecorate,
  serviceHocs,
  version
}

axiosService.createAxiosService = createAxiosService
axiosService.getMessageDecorator = getMessageDecorator
axiosService.getMockDecoratorByEnv = getMockDecoratorByEnv
axiosService.mockDecorator = mockDecorator
axiosService.serviceHocs = serviceHocs
axiosService.version = version

export default axiosService
