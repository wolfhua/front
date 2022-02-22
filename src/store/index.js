import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: ''
  },
  mutations: {
    // 更改sid的值
    setSid (state, value) {
      state.sid = value
    }
  },
  actions: {
  },
  modules: {
  }
})
