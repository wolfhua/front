import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store/index'
// import axios from 'axios'
import '@/utils/veevalidate'
// import Vuelidate from 'vuelidate'
import filters from '@/utils/filter'
import directives from '@/utils/directives'

// Vue.use(Vuelidate)
import Popup from './components/modules/popup/index'
import Pop from './components/modules/pop/index'

Vue.use(Popup)
Vue.use(Pop)

// 添加全局filter（格式化时间）
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 添加全局自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

// 阻止启动生产消息
Vue.config.productionTip = false

// axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3001' : 'http://simuchen.com'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
