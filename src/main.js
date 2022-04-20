import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// import axios from 'axios'
import '@/utils/veevalidate'
// import Vuelidate from 'vuelidate'

// Vue.use(Vuelidate)
import Popup from './components/modules/popup/index'
import Pop from './components/modules/pop/index'

Vue.use(Popup)
Vue.use(Pop)

// 阻止启动生产消息
Vue.config.productionTip = false

// axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3001' : 'http://simuchen.com'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
