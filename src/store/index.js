import Vue from 'vue'
import Vuex from 'vuex'
import { Local } from '@/utils/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    path: '/',
    userInfo: Local('userInfo') || {},
    title: '',
  },
  mutations: {
    SET_PATH(state, toObj) {
      state.path = toObj.fullPath
      if (toObj.meta && toObj.meta.title) {
        state.title = toObj.meta.title
      } else {
        state.title = ''
      }
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      Local('userInfo', userInfo)
    },
    SET_Logout: (state, userInfo) => {
      state.userInfo = userInfo
      Local('userInfo', userInfo)
    },
  },
  actions: {
    //手机号登录
    PhoneLogin({ state }, userInfo) {
      return new Promise((resolve, reject) => {
       
      })
    },
    // 登出
    Logout({ commit }) {
        return new Promise((resolve) => {
      })
    },
  },
  getters: {
    getUserInfo: () => Local('userInfo'),
  },
  setters: {  
    setUserInfo: (newValue) => {  
      this.state.userInfo = newValue;  
    }  
  }  
})
