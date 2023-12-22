import axios from 'axios';
import axiosRetry from 'axios-retry';
const whiteRetry = new Set(['ECONNABORTED', 'ERR_NETWORK', undefined, 0]);
let execOnce = false
// import { Local } from "@/utils/index";
import { Message } from 'element-ui';
import router from '@/router/index.js'
import store from '@/store'

const isNoBodyMethod = (method) => ['get', 'delete'].includes(method.toLowerCase());

// 创建 axios 请求实例
const serviceAxios = axios.create({
    baseURL: "/api", // 接口请求地址
    timeout: 50 * 1000, // 请求超时设置
    withCredentials: false, // 跨域请求是否需要携带 cookie
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // 'Accept-Language': Local('lang')
    },
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true;
    }
});
axiosRetry(serviceAxios, {
    retries: 0, // 重复请求次数
    shouldResetTimeout: true, //  重置超时时间
    retryDelay: (retryCount) => {
        return retryCount * 3 * 1000; // 重复请求延迟
    },
    retryCondition: (err) => {
        // true为打开自动发送请求，false为关闭自动发送请求s
        // const { code, message } = err;
        // return whiteRetry.has(code) || message.includes('timeout');
    }
});

// 请求拦截器
serviceAxios.interceptors.request.use(
    (config) => {
        if (typeof config.data === 'string') config.data = JSON.parse(config.data);
        else config.data = config.data || {};
        let params = { ...config.data };

        // let userInfo = Local('userInfo') || {}
        // config.data.userId = params.userId = userInfo.id
        config.headers = Object.assign(config.headers, {
            'Content-Type':
                config.contentType ||
                'application/json;charset=utf-8',
            os: config.data.os,
        });
        if (isNoBodyMethod(config.method)) {
            config.params = params;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// 响应拦截器
// serviceAxios.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     (err) => {
//         return Promise.reject(err);
//     }
// );

// 统一发起请求的函数
async function request(options) {

    try {
        const response = await serviceAxios.request(options);
        const { status, data = { code: 500 } } = response;

        // 处理 HTTP 状态码
        if (status < 200 || status >= 500) {
            return Promise.reject(data.msg);
        } else if (data.code == 401) {
            if (!execOnce) {
                Message({
                    type: 'error',
                    message: data.msg
                })
            }
            execOnce = true
            store.commit("SET_Logout", {})
            router.push("/index")
            return
        } else if (data.code != 200 && data.code != 0) {
            if (data.data) {
                let str = ''
                try {
                    data.data.forEach((item,index) => {
                        str += item.errMsg
                        if (index !== data.data.length - 1) {
                            str += ','
                        }
                    })
                } catch {
                    console.error(data.data)
                }
                Message({
                    type: 'error',
                    message: str || data.data
                })
            } else {
                Message({
                    type: 'error',
                    message: data.msg
                })
            }
            return Promise.reject(data.msg);
        }
        execOnce = false
        // let json = response.data;
        return Promise.resolve(data);
    } catch (_) {
        // if (error.code === 'ERR_NETWORK') Toast.show(i18n.t('wangluoyichang'));
        // else if (error.code === 'ECONNABORTED') Toast.show(i18n.t('lianjiechaoshi'));
        // else Toast.show(i18n.t('qingqiushibai'));
        // return Promise.reject(error.config.data);
    }
}

export default request;
