import store from '@/store'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import routers from './routers'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router(routers)

// 全局导航守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    if (dayjs().isBefore(dayjs(payload.exp * 1000))) {
      store.commit('setUserInfo', userInfo)
      store.commit('setToken', token)
      store.commit('setIsLogin', true)
      if (!store.state.socket) {
        // 初始化websocket
        store.commit('initWebSocket', {})
      }
    } else {
      sessionStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
  // if (to.meta.requiresAuth) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    if (store.state.isLogin) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
