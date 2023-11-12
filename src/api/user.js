import service from './service';
// 企业认证
export const SubKyc = (data) => service({
    url: '/subKyc',
    data,
    method: 'post'
})
// 获取实名认证
export const getAccountKyc = (data) => service({
    url: '/accountKyc',
    data,
    method: 'get'
})
// 获取实名认证
export const getUserInfo = (data) => service({
    url: '/getCur',
    data,
    method: 'get'
})