const Login = () => import(/* webpackChunkName: 'login' */ '@/views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '@/views/Forget.vue')
const Confirm = () => import(/* webpackChunkname: 'confirm' */ '@/views/Confirm.vue')
const Reset = () => import(/* webpackChunkname: 'reset' */ '@/views/Reset.vue')

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/confirm',
    name: 'confrim',
    component: Confirm
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset
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
