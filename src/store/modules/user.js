import { Local } from "@/utils/index"
const state = {
    path: '/',
    userInfo: {
    }
};

const mutations = {
    SET_PATH(state, path) {
        state.path = path
    },
    SET_USER_INFO(state, info) {
        state.userInfo = info
        Local('userInfo', info)
    }
}
const getters = {
    path() {
        return state.path
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations
  };