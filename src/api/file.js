import service from './service';

export const upload = (data) => service({
    url: '/file/upload',
    data,
    contentType: 'multipart/form-data',
    method: 'post'
})
export const downLoad = (data) => service({
    url: '/file/downLoad',
    data,
    method: 'get'
})