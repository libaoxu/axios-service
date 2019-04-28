/**
 * axios封装, 为了业务层更简洁实用, 不需要判断status 和 codeKey等重复逻辑
 * @author libaoxu
 * @date 2018-05-08
 */
import createAxiosService from './create'
import { getMessageDecorator, getMockDecoratorByEnv } from './service-decorators'

const axiosService = createAxiosService()
const getRequestsByRoot = axiosService.getRequestsByRoot

export {
  axiosService,
  getRequestsByRoot,
  createAxiosService,
  getMessageDecorator,
  getMockDecoratorByEnv,
}

export default axiosService