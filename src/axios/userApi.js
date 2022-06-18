import request from './nodeApi.js';

// 用户基本信息接口
export const userInfo = (pageNum, pageSize) => request({ url: `getUserInfo?pageNum=${pageNum}&pageSize=${pageSize}` });

export const searchUser = (username, pageNum, pageSize) => request({ url: `searchUserInfo?username=${username}&pageNum=${pageNum}&pageSize=${pageSize}` });

export const deleteUser = phone => request({ method: 'delete', url: `deleteUser?phone=${phone}` });

export const editUser = (phone, nickname) => request({ method: 'put', url: `editUser?phone=${phone}&nickname=${nickname}` });
