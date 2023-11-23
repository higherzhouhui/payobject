import service from './service';
// 取消兑换
export const changeCancel = (data) => service({
    url: '/changeCancel',
    data,
    method: 'get'
})

// 详情
export const changeDetails = (data) => service({
  url: '/changeDetails',
  data,
  method: 'post'
})

export const changeGet = (data) => service({
  url: '/changeGet',
  data,
  method: 'get'
})

export const changePer = (data) => service({
  url: '/changePer',
  data,
  method: 'post'
})

export const changeReq = (data) => service({
  url: '/changeReq',
  data,
  method: 'post'
})