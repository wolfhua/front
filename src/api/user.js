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

export {
  userSign,
  updateUserInfo,
  updateUsername
}
