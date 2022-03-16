import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    userInfo: {}
  },
  mutations: {
    // 更改sid的值
    setSid (state, value) {
      state.sid = value
    },
    // 保存登录用户信息
    setUserInfo (state, value) {
      state.userInfo = value
    },
    // 更改登录状态
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {
  },
  modules: {
  }
})
