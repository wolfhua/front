import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () =>
  import(/* webpackChunkName: 'forget' */ './views/Forget.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,
      // 导航守卫
      beforeEnter: (to, from, next) => {
        if (from.name === 'Login') {
          next()
        } else {
          next({ name: 'Login' })
        }
      }
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    }
  ]
})
