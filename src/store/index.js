import Vue from 'vue'
import Vuex from 'vuex'
import WebSocketClient from '@/utils/webSocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isHide: false,
    socket: null,
    message: {}
  },
  mutations: {
    initWebSocket (state, config) {
      state.socket = new WebSocketClient(config)
      state.socket.init()
    },
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
    },
    setMessage (state, value) {
      state.message = value
    }
  },
  getters: {
    uid: (state) => state.userInfo ? state.userInfo._id : ''
  },
  actions: {
    message ({ commit }, msg) {
      // commit的是mutations里面的方法
      commit('setMessage', msg)
    }
  },
  modules: {
  }
})
