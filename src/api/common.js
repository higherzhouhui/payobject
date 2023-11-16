import service from './service';

// 获取银行列表
export const getSourceCoin = (data) => service({
    url: '/sourceCoin',
    data,
    method: 'get'
})

// 获取银行列表
export const getTargetCoin = (data) => service({
  url: '/targetCoin',
  data,
  method: 'get'
})