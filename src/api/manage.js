import service from './service';

// 获取银行列表
export const getKycListt = (data) => service({
    url: '/kycList',
    data,
    method: 'get'
})