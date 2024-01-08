import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import i18n from '@/lang/i18n'
import { close, start } from '@/utils/nprogress';

// 解决路由重复的报错
let originPush =VueRouter.prototype.push;
let originReplace =VueRouter.prototype.replace;
VueRouter.prototype.push=function(location,resolve,reject){
  if(resolve&&reject){
    originPush.call(this,location,resolve,reject)    
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.replace=function(location,resolve,reject){
  if(resolve&&reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}


//2. 调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter)

//3. 创建路由的实例对象
const router = new VueRouter({
    mode: 'hash',
    meta: {  
        duplicateNavigationPolicy: 'ignore' // Ignore the warning for redundant navigation  
    },
    routes: [
        { path: '/', redirect: 'index' },
        { path: '/index', name: 'index', component: () => import('@/pages/root/index.vue') },
        { path: '/privacy', name: 'privacy', component: () => import('@/pages/office/privacy.vue') },
        { path: '/service', name: 'service', component: () => import('@/pages/office/service.vue') },
        { path: '/blog', name: 'blog', component: () => import('@/pages/blog/list.vue') },
        { path: '/blog/detail', name: 'blog/detail', component: () => import('@/pages/blog/detail.vue') },
        {
            path: '/admin', name: 'admin', redirect: '/admin/dashboard', component: () => import('@/pages/admin/layout.vue'),
            children: [
                { path: 'dashboard', component: () => import('@/pages/admin/dashboard/index.vue'), meta: {title: i18n.t('kztai')} },
                { path: 'detail', component: () => import('@/pages/admin/dashboard/detail.vue'), meta: {title: i18n.t('wdqb')} },
                { path: 'deposit', name: 'deposit', redirect: '/deposit/index',  component: () => import('@/pages/admin/deposit/layout.vue'),
                  children: [
                    { path: 'index', name: 'depositIndex', component: () => import('@/pages/admin/deposit/index.vue'), meta: {title: i18n.t('chongzhi')}},
                    { path: 'list', name: 'depositList', component: () => import('@/pages/admin/deposit/list.vue'), meta: {title: i18n.t('hh')}},
                    ]
                },
                { path: 'withdraw', name: 'withdraw', redirect: '/withdraw/index',  component: () => import('@/pages/admin/withdraw/layout.vue'),
                    children: [
                    { path: 'index', name: 'withdrawIndex', component: () => import('@/pages/admin/withdraw/index.vue'), meta: {title: i18n.t('tx')}},
                    { path: 'list', name: 'withdrawList', component: () => import('@/pages/admin/withdraw/list.vue'), meta: {title: i18n.t('txzhgl')}},
                    ]
                },
                { path: 'convert', name: 'convert', redirect: '/convert/index',  component: () => import('@/pages/admin/convert/layout.vue'),
                    children: [
                    { path: 'index', name: 'convertIndex', component: () => import('@/pages/admin/convert/index.vue'), meta: {title: i18n.t('duihuan')}},
                    { path: 'list', name: 'convertList', component: () => import('@/pages/admin/convert/list.vue'), meta: {title: i18n.t('duihuanls')}},
                    ]
                },
                { path: 'exchange', name: 'exchange', redirect: '/exchange/index',  component: () => import('@/pages/admin/exchange/layout.vue'),
                    children: [
                    { path: 'index', name: 'exchangeIndex', component: () => import('@/pages/admin/exchange/index.vue'), meta: {title: i18n.t('hh')}},
                    { path: 'list', name: 'exchangeList', component: () => import('@/pages/admin/exchange/list.vue'), meta: {title: i18n.t('yhkgl')}},
                    ]
                },
                { path: 'address', name: 'address', redirect: '/address/index',  component: () => import('@/pages/admin/address/layout.vue'),
                    children: [
                    { path: 'index', name: 'addressIndex', component: () => import('@/pages/admin/address/index.vue'), meta: {title: i18n.t('hh')}},
                    { path: 'list', name: 'addressList', component: () => import('@/pages/admin/address/list.vue'), meta: {title: i18n.t('addressMange')}},
                    ]
                },
                { path: 'record', name: 'record', redirect: '/record/exchangelist',  component: () => import('@/pages/admin/record/layout.vue'),
                    children: [
                    { path: 'exchangelist', name: 'recordIndex', component: () => import('@/pages/admin/record/exchangelist.vue'), meta: {title: i18n.t('jyjl')}},
                    ]
                },
                { path: 'kycverification', component: () => import('@/pages/admin/kycverification/index.vue'), meta: {title: i18n.t('kycyz')} },
                { path: 'referfriends', component: () => import('@/pages/admin/referfriends/index.vue'), meta: {title: i18n.t('tjgpy')} },
                { path: 'info', component: () => import('@/pages/admin/info/index.vue'), meta: {title: i18n.t('grzl')} },
                { path: 'reset', component: () => import('@/pages/admin/info/reset.vue'), meta: {title: i18n.t('resetPwd')} },
                { path: 'paypass', component: () => import('@/pages/admin/info/paypass.vue'), meta: {title: i18n.t('paypass')} },
                { path: 'safe', component: () => import('@/pages/admin/info/safe.vue'), meta: {title: i18n.t('safe')} },
                { path: 'email', component: () => import('@/pages/admin/info/email.vue'), meta: {title: i18n.t('xgybdyx')} },
            ]
        },
        {
            path: '/manage', name: 'manage', redirect: '/manage/index', component: () => import('@/pages/admin/layout.vue'),
            children: [
                { path: 'index', component: () => import('@/pages/manage/home.vue'), meta: {title: i18n.t('kztai')} },
                { path: 'kyc', component: () => import('@/pages/manage/kyc/index.vue'), meta: {title: i18n.t('shgl')} },
                { path: 'deposit', component: () => import('@/pages/admin/deposit/list.vue'), meta: {title: i18n.t('rjlist')} },
                { path: 'exchange', component: () => import('@/pages/manage/exchange/index.vue'), meta: {title: i18n.t('skzhhl')} },
                { path: 'convert', component: () => import('@/pages/admin/convert/list.vue'), meta: {title: i18n.t('duihuanls')} },
                { path: 'withdraw', component: () => import('@/pages/admin/withdraw/list.vue'), meta: {title: i18n.t('cjlist')} },
                { path: 'bill', component: () => import('@/pages/admin/record/exchangelist.vue'), meta: {title: i18n.t('jymx')} },
                { path: 'blog', component: () => import('@/pages/manage/blog/index.vue'), meta: {title: i18n.t('newslist')} },
                { path: 'safe', component: () => import('@/pages/admin/info/safe.vue'), meta: {title: i18n.t('safe')} },
            ]
        },
        {
            path: '/user', name: 'userIndex', component: () => import('@/pages/user/index.vue'),
            children: [
                { path: 'login', component: () => import('@/pages/user/login/index.vue') },
                { path: 'register', component: () => import('@/pages/user/register/index.vue') },
                { path: 'forget', component: () => import('@/pages/user/forget/index.vue') }
            ]
        },
    ]
}
)

router.beforeEach((to, from, next) => {
    start();
    store.commit('SET_PATH', to)
    next()
    // if (token) {
    //     next()
    // } else {
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         next()
    //     } else {
    //         next({
    //             path: '/pages/login/login'
    //         })
    //     }
    // }
})

router.afterEach(() => {
	// 关闭进度条
	close();
});
//4. 向外共享路由的实例对象

export default router
