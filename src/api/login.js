import service from './service';

export const reg = (data) => service({
    url: '/reg',
    data,
    method: 'post'
})
export const forgotPwd = (data) => service({
    url: '/forgotPwd',
    data,
    method: 'post'
})
export const sendCheckCode = (data) => service({
    url: '/sendCheckCode',
    data,
    method: 'post'
})
export const countries = (data) => service({
    url: '/countries',
    data,
    method: 'get'
})
export const getCoinList = (data) => service({
    url: '/allCoin',
    data,
    method: 'get'
})
export const cryptocurrencies = (data) => service({
    url: '/cryptocurrencies',
    data,
    method: 'get'
})
export const login = (data) => service({
    url: '/login',
    data,
    method: 'post'
})
export const logout = (data) => service({
    url: '/logout',
    data,
    method: 'get'
})
export const resetPwd = (data) => service({
    url: '/resetPwd',
    data,
    method: 'post'
})

export const setPayPwdReq = (data) => service({
    url: '/setPayPwd',
    data,
    method: 'post'
})

export const resetEmailReq = (data) => service({
    url: '/resetEmail',
    data,
    method: 'post'
})