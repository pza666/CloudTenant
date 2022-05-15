import request from './index.js';

// 用户基本信息接口
export const userInfo = (pageNum, pageSize) => request({ url: `getUserInfo?pageNum=${pageNum}&pageSize=${pageSize}` });

export const searchUser = username => request({ url: `searchUserInfo?username=${username}` });

export const deleteUser = phone => request({ method: 'delete', url: `deleteUser?phone=${phone}` });

export const editUser = (phone, nickname) => request({ method: 'put', url: `editUser?phone=${phone}&nickname=${nickname}` });
