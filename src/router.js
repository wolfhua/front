import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ './views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */ './views/channels/Template1.vue')

Vue.use(Router)

export default new Router({
  // linkExactActiveClass: 用于精准激活的 RouterLink 的默认类 ,(点亮路由)
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
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
