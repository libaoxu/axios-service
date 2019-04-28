import { getMessageDecorator } from 'axios-service';

/**
 * 实际项目中应该替换 success 和 erorr 对应的ui函数
 */ 
export const messageDecorator = getMessageDecorator({ success: alert, error: alert })