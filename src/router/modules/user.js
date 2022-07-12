const Center = () => import(/* webpackChunkName: 'center' */ '@/views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '@/components/user/Center.vue')
const Settings = () => import(/* webpackChunkName: 'user-settings' */ '@/components/user/Settings.vue')
const Posts = () => import(/* webpackChunkName: 'user-post' */ '@/components/user/Posts.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */ '@/components/user/Msg.vue')
const Others = () => import(/* webpackChunkName: 'user-other' */ '@/components/user/Others.vue')
const MyInfo = () => import(/* webpackChunkName: 'my-info' */ '@/components/user/common/MyInfo.vue')
const PicUpload = () => import(/* webpackChunkName: 'upload-pic' */ '@/components/user/common/PicUpload.vue')
const Passwd = () => import(/* webpackChunkName: 'password' */ '@/components/user/common/Passwd.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */ '@/components/user/common/Accounts.vue')
const MyPost = () => import(/* webpackChunkName: 'my-post' */ '@/components/user/common/MyPost.vue')
const User = () => import(/* webpackChunkName: 'center' */ '@/views/User.vue')
const MyCollection = () => import(/* webpackChunkName: 'my-collection' */ '@/components/user/common/MyCollection.vue')

export default [
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
  }
]
