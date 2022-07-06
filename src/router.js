import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import store from '@/store'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'

const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ './views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */ './views/channels/Template1.vue')
const Center = () => import(/* webpackChunkName: 'center' */ './views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ './components/user/Center.vue')
const Settings = () => import(/* webpackChunkName: 'user-settings' */ './components/user/Settings.vue')
const Posts = () => import(/* webpackChunkName: 'user-post' */ './components/user/Posts.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */ './components/user/Msg.vue')
const Others = () => import(/* webpackChunkName: 'user-other' */ './components/user/Others.vue')
const User = () => import(/* webpackChunkName: 'center' */ './views/User.vue')
const MyInfo = () => import(/* webpackChunkName: 'my-info' */ './components/user/common/MyInfo.vue')
const Passwd = () => import(/* webpackChunkName: 'password' */ './components/user/common/Passwd.vue')
const PicUpload = () => import(/* webpackChunkName: 'upload-pic' */ './components/user/common/PicUpload.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */ './components/user/common/Accounts.vue')
const MyPost = () => import(/* webpackChunkName: 'my-post' */ './components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'my-collection' */ './components/user/common/MyCollection.vue')
const NotFound = () => import(/* webpackChunkName: 'notfound' */ './views/Notfound.vue')
const Confirm = () => import(/* webpackChunkname: 'confirm' */ './views/Confirm.vue')
const Reset = () => import(/* webpackChunkname: 'reset' */ './views/Reset.vue')
const Add = () => import(/* webpackChunkname: 'add' */ './components/contents/Add.vue')
const Detail = () => import(/* webpackChunkname: 'detail' */ './components/contents/Detail.vue')
const Edit = () => import(/* webpackChunkname: 'edit' */ './components/contents/Edit.vue')

Vue.use(Router)

const router = new Router({
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
      path: '/add',
      name: 'add',
      meta: { requiresAuth: true },
      component: Add
    },
    {
      path: '/edit/:tid',
      props: true,
      name: 'edit',
      meta: { requiresAuth: true },
      component: Edit,
      beforeEnter: (to, from, next) => {
        // 路由守卫，判断能否进入编辑页面
        // console.log('to', to)
        // console.log('from', from)
        if (['detail', 'my-post'].indexOf(from.name) !== -1 && to.params.postDetail && to.params.postDetail.isEnd === '0') {
          next()
        } else {
          // 用户在edit页面刷新的情况
          const editPostData = localStorage.getItem('editPostData')
          // console.log('editPostData', editPostData)
          if (editPostData && editPostData !== '') {
            const editObj = JSON.parse(editPostData)
            if (editObj.isEnd === '0' && editObj._id === to.params.tid) {
              next()
            } else {
              next('/')
            }
          } else {
            next('/')
          }
        }
      }
    },
    {
      path: '/detail/:tid',
      props: true, // 路由传参
      name: 'detail',
      component: Detail
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
    },
    {
      path: '/user/:uid',
      name: 'home',
      props: true,
      component: User
    },
    {
      path: '/center',
      // name: 'center',
      component: Center,
      meta: { requiresAuth: true },
      linkActiveClass: 'layui-this',
      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          // name: 'set',
          component: Settings,
          children: [
            {
              path: '',
              name: 'info',
              component: MyInfo
            },
            {
              path: 'pic',
              name: 'pic',
              component: PicUpload
            },
            {
              path: 'passwd',
              name: 'passwd',
              component: Passwd
            },
            {
              path: 'account',
              name: 'account',
              component: Accounts
            }
          ]
        },
        {
          path: 'posts',
          // name: 'posts',
          component: Posts,
          children: [
            {
              path: '',
              name: 'my-post',
              component: MyPost
            },
            {
              path: 'mycollection',
              name: 'my-collection',
              component: MyCollection
            }
          ]
        },
        {
          path: 'msg',
          name: 'msg',
          component: Msg
        },
        {
          path: 'others',
          name: 'others',
          component: Others
        }
      ]
    },
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
})

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
