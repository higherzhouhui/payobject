import Vue from 'vue'
import Vuex from 'vuex'
import { Local } from '@/utils/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    path: '/',
    userInfo: Local('userInfo') || {},
  },
  mutations: {
    SET_PATH(state, path) {
      state.path = path
    },
    SET_USERINFO: (state, userInfo) => {
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
