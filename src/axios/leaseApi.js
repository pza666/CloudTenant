import request from './index.js';

// 获取house信息
export const houseInfo = (currentPage, pageSize, houseType, houseStatus) => request({ url: 'house/aminIndex', params: { currentPage, pageSize, houseType, houseStatus }, method: 'get' });
// export const houseInfo = (currentPage, sizePage, houseType, houseStatus) => request({ url: `house/aminIndex?currentPage=${currentPage}&sizePage=${sizePage}&houseType=${houseType}&houseStatus=${houseStatus}`, method: 'get' });

// 删除下架房源
export const removeHouse = id => request({ url: `house/AdminDelete?id=${id}`, method: 'post' });
