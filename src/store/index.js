import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isHide: false
  },
  mutations: {
    // 更改sid的值
    setSid (state, value) {
      state.sid = value
    },
    // 保存登录用户token
    setToken (state, value) {
      state.token = value
      sessionStorage.setItem('token', value)
    },
    // 保存登录用户信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      sessionStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 更改登录状态
    setIsLogin (state, value) {
      state.isLogin = value
    },
    // 设置container的状态
    setHide (state, value) {
      state.isHide = value
    }
  },
  getters: {
    uid: (state) => state.userInfo ? state.userInfo._id : ''
  },
  actions: {
  },
  modules: {
  }
})
