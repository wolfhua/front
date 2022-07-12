const Add = () => import(/* webpackChunkname: 'add' */ '@/components/contents/Add.vue')
const Detail = () => import(/* webpackChunkname: 'detail' */ '@/components/contents/Detail.vue')
const Edit = () => import(/* webpackChunkname: 'edit' */ '@/components/contents/Edit.vue')

export default [
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
  }
]
