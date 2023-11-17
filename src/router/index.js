import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
//2. 调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter)

//3. 创建路由的实例对象
const router = new VueRouter({
    meta: {  
        duplicateNavigationPolicy: 'ignore' // Ignore the warning for redundant navigation  
    },
    routes: [
        { path: '/', redirect: 'index' },
        { path: '/index', name: 'index', component: () => import('@/pages/root/index.vue') },
        {
            path: '/admin', name: 'admin', redirect: '/admin/dashboard', component: () => import('@/pages/admin/layout.vue'),
            children: [
                { path: 'dashboard', component: () => import('@/pages/admin/dashboard/index.vue') },
                { path: 'detail', component: () => import('@/pages/admin/dashboard/detail.vue') },
                { path: 'deposit', name: 'deposit', redirect: '/deposit/index',  component: () => import('@/pages/admin/deposit/layout.vue'),
                  children: [
                    { path: 'index', name: 'depositIndex', component: () => import('@/pages/admin/deposit/index.vue')},
                    { path: 'list', name: 'depositList', component: () => import('@/pages/admin/deposit/list.vue')},
                    ]
                },
                { path: 'withdraw', name: 'withdraw', redirect: '/withdraw/index',  component: () => import('@/pages/admin/withdraw/layout.vue'),
                    children: [
                    { path: 'index', name: 'withdrawIndex', component: () => import('@/pages/admin/withdraw/index.vue')},
                    { path: 'list', name: 'withdrawList', component: () => import('@/pages/admin/withdraw/list.vue')},
                    ]
                },
                { path: 'exchange', name: 'exchange', redirect: '/exchange/index',  component: () => import('@/pages/admin/exchange/layout.vue'),
                    children: [
                    { path: 'index', name: 'exchangeIndex', component: () => import('@/pages/admin/exchange/index.vue')},
                    { path: 'list', name: 'exchangeList', component: () => import('@/pages/admin/exchange/list.vue')},
                    ]
                },
                { path: 'record', name: 'record', redirect: '/record/exchangelist',  component: () => import('@/pages/admin/record/layout.vue'),
                    children: [
                    { path: 'exchangelist', name: 'recordIndex', component: () => import('@/pages/admin/record/exchangelist.vue')},
                    { path: 'transactionlist', name: 'recordList', component: () => import('@/pages/admin/record/transactionlist.vue')},
                    ]
                },
                { path: 'kycverification', component: () => import('@/pages/admin/kycverification/index.vue') },
                { path: 'referfriends', component: () => import('@/pages/admin/referfriends/index.vue') },
                { path: 'info', component: () => import('@/pages/admin/info/index.vue') },
                { path: 'reset', component: () => import('@/pages/admin/info/reset.vue') },
            ]
        },
        {
            path: '/manage', name: 'manage', redirect: '/manage/index', component: () => import('@/pages/admin/layout.vue'),
            children: [
                { path: 'index', component: () => import('@/pages/manage/home.vue') },
                { path: 'kyc', component: () => import('@/pages/manage/kyc/index.vue') },
                { path: 'deposit', component: () => import('@/pages/manage/deposit/index.vue') },
                { path: 'exchange', component: () => import('@/pages/manage/exchange/index.vue') },
                { path: 'withdraw', component: () => import('@/pages/manage/withdraw/index.vue') },
                { path: 'change', component: () => import('@/pages/admin/record/transactionlist.vue') },
                { path: 'bill', component: () => import('@/pages/admin/record/exchangelist.vue') },
                { path: 'blog', component: () => import('@/pages/manage/blog/index.vue') },
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
    store.commit('SET_PATH', to.fullPath)
    return next()
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
//4. 向外共享路由的实例对象

export default router
