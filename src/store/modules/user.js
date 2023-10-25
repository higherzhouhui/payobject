const state = {
    path: '/',
    userInfo: {
        name: '小龙人',
        phone: '13436129024',
        email: ''
    }
};

const mutations = {
    SET_PATH(state, path) {
        state.path = path
    },
    SET_USER_INFO(state, info) {
        state.userInfo = info
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