import axios from '@/utils/request'
import qs from 'qs'

// 用户签到
// headers.Authorization放到axios中判断是否加入
// const userSign = () => {
//   const headers = {
//     Authorization: 'Bearer ' + store.state.token,
//     'Content-Type': 'application/json'
//   }
//   return axios.get('/user/fav', {
//     headers
//   })
// }

// 用户签到
const userSign = () => axios.get('/user/fav')

// 修改用户基本信息
const updateUserInfo = (data) => axios.post('user/basic', data)

// 修改用户名（确认邮箱）
const updateUsername = (data) => axios.get('/public/reset-email?' + qs.stringify(data))

// 修改密码
const changePassword = (data) => axios.post('/user/change-password', data)

// 设置收藏 & 取消收藏
const addCollect = (data) => axios.get('/user/setCollect?' + qs.stringify(data))

// 获取收藏列表
const getCollect = (data) => axios.get('/user/collect?' + qs.stringify(data))

// 获取用户发帖列表
const getPostListByUid = (data) => axios.get('/user/post?' + qs.stringify(data))

// 删除指定文章
const deletePostByUid = (data) => axios.get('/user/deletePost?' + qs.stringify(data))

// 获取用户的基本信息
const getInfo = (data) => axios.get('/public/info?' + qs.stringify(data))

// 获取用户最近评论列表
const getCommentList = (data) => axios.get('/public/latestComment?' + qs.stringify(data))

// 获取用户最近发表的文章列表
const getPostPublic = (data) => axios.get('/public/latestPost?' + qs.stringify(data))

export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePassword,
  addCollect,
  getCollect,
  getPostListByUid,
  deletePostByUid,
  getInfo,
  getCommentList,
  getPostPublic
}
