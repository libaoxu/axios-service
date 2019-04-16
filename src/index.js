/**
 * axios封装, 为了业务层更简洁实用, 不需要判断status 和 codeKey等重复逻辑
 * @author libaoxu
 * @date 2018-05-08
 */
import createAxiosService from './create'

export { default as getMockDecoratorByEnv } from './mock-decorator'

const axiosService = createAxiosService()

export {
  createAxiosService,
}

export const getRequestsByRoot = axiosService.getRequestsByRoot

export default axiosService