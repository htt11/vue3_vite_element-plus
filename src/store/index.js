import {
  createStore
} from 'vuex'

// 创建 store 容器实例.
const store = createStore({
  state() {
    return {
      token: '',
      userName: '',
      userId: '1111',
    }
  },
  mutations: {
    getToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    getUserInfo(state, list) {
      state.userName = list.username;
      state.userId = list.userId;
      state.perList = list.perList;
    }
  },
  actions: {},
  modules: {}
})

export default store