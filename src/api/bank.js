import service from './service';

// 获取银行列表
export const getBankList = (data) => service({
    url: '/bankList',
    data,
    method: 'post'
})

export const getBankListPage = (data) => service({
    url: '/bankPage',
    data,
    method: 'post'
})

export const perBank = (data) => service({
    url: '/perBank',
    data,
    method: 'post'
})
export const subBank = (data) => service({
    url: '/subBank',
    data,
    method: 'post'
})
export const bankDel = (data) => service({
    url: '/bankDel',
    data,
    method: 'get'
})
export const getBank = (data) => service({
    url: '/getBank',
    data,
    method: 'get'
})
export const kycList = (data) => service({
    url: '/kycPage',
    data,
    method: 'post'
})
export const perKyc = (data) => service({
    url: '/perKyc',
    data,
    method: 'post'
})
export const userBalanceList = (data) => service({
    url: '/userBalanceList',
    data,
    method: 'get'
})