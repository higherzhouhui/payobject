import service from './service';

// 获取银行列表
export const getKycListt = (data) => service({
    url: '/kycList',
    data,
    method: 'get'
})


// 余额变更明细
export const getBillDetails = (data) => service({
    url: '/billDetails',
    data,
    method: 'post'
})

// 兑换详情
export const getchangeDetails = (data) => service({
    url: '/changeDetails',
    data,
    method: 'post'
})
