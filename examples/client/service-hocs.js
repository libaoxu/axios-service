import { getMessageDecorate, serviceHocs } from 'axios-service';

/**
 * 实际项目中应该替换 success 和 erorr 对应的ui函数
 */
export const messageDecorate = getMessageDecorate({ success: alert, error: alert })

/**
 * 预置请求信息: '请求失败, 请重试!'
 */
export const requestFailErrMsg = serviceHocs.getErrorMsg('请求失败, 请重试!')
