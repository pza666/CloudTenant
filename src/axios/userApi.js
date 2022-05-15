import request from './index.js';

// 用户基本信息接口
export const userInfo = (pageNum, pageSize) => request({ url: `getUserInfo?pageNum=${pageNum}&pageSize=${pageSize}` });
