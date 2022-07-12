import Home from '@/views/Home'

import users from './modules/user'
import login from './modules/login'
import content from './modules/content'

const Index = () => import(/* webpackChunkName: 'index' */ '@/views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */ '@/views/channels/Template1.vue')

const NotFound = () => import(/* webpackChunkName: 'notfound' */ '@/views/Notfound.vue')

export default {
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
    ...content,
    ...login,
    ...users,
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
}
