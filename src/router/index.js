import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: "foeget" */ '../views/Forget.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/forget',
    name: 'Forget',
    component: Forget
  }
]

const router = new VueRouter({
  routes
})

export default router
