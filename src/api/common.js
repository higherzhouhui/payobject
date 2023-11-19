import service from './service';

export const getSourceCoin = (data) => service({
    url: '/sourceCoin',
    data,
    method: 'get'
})

export const getTargetCoin = (data) => service({
  url: '/targetCoin',
  data,
  method: 'get'
})

export const getCalculateRate = (data) => service({
  url: '/calculateRate',
  data,
  method: 'post'
})

export const homeBlogList = (data) => service({
  url: '/cmdList',
  data,
  method: 'post'
})

export const cmsPageReq = (data) => service({
  url: '/cmsPage',
  data,
  method: 'post'
})
export const cmsRecommend = (data) => service({
  url: '/cmsRecommend',
  data,
  method: 'post'
})

export const cmsSaveReq = (data) => service({
  url: '/cmsSave',
  data,
  method: 'post'
})

export const cmsDeleteReq = (data) => service({
  url: '/cmsDelete',
  data,
  method: 'get'
})

export const cmsGetReq = (data) => service({
  url: '/cmsGet',
  data,
  method: 'get'
})