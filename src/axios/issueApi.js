import request from './index.js';

// 获取house待审核的信息
export const issueInfo = (currentPage, pageSize, houseType, houseStatus) => request({ url: 'house/aminIndex', params: { currentPage, pageSize, houseType, houseStatus }, method: 'get' });

// 上架房源信息
export const addHouse = (id, houseStatus) => request({ url: 'house/upStatus', params: { id, houseStatus }, method: 'post' });
