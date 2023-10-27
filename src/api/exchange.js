import service from './service';
// 获取收款账户
export const getDeposits = (data) => service({
    url: '/getDeposits',
    data,
    method: 'get'
})
// 获取汇率表
export const getExchanges = (data) => service({
    url: '/getExchanges',
    data,
    method: 'get'
})
// 新增汇率
export const setExchange = (data) => service({
    url: '/setExchange',
    data,
    method: 'post'
})
// 新增收款账户
export const setDeposit = (data) => service({
    url: '/setDeposit',
    data,
    method: 'post'
})
// 删除收款账户
export const delDeposit = (data) => service({
    url: '/delDeposit',
    data,
    method: 'get'
})
// 删除汇率
export const delExchange = (data) => service({
    url: '/delExchange',
    data,
    method: 'get'
})
// 添加钱包
export const setCryAcc = (data) => service({
    url: '/setCryAcc',
    data,
    method: 'post'
})
// 添加钱包
export const getCryAdd = (data) => service({
    url: '/getCryAdd',
    data,
    method: 'get'
})