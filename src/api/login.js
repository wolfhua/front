// import axios from 'axios'
import axios from '@/utils/request'

/**
 * 获取验证码
 * @param {*} option sid唯一标识
 */
const getCaptch = (option) => {
  return axios.get('/public/getCaptcha', {
    params: {
      ...option
    }
  })
}

/**
 * 忘记密码
 * @param {*} option 用户参数 用户名称，验证码
 */
const forget = (option) => {
  // let result = ''
  // try {
  //   result = await axios.post('/forget', {
  //     ...option
  //   })
  //   if (result.status === 200) {
  //     return result.data
  //   }
  // } catch (e) {
  //   console.log(e)
  // }
  // return result
  return axios.post('/login/forget', {
    ...option
  })
}

/**
 * 登录
 * @param {*} loginInfo 登录参数，账号、密码、验证码、唯一sid
 */
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

/**
 * 注册接口
 * @param {*} regInfo 注册参数，账号、密码、验证码、唯一sid
 */
const register = (regInfo) => {
  return axios.post('/login/register', {
    ...regInfo
  })
}

/**
 * 重置密码接口
 * @param {*} info 重置密码信息
 */
const reset = (info) => axios.post('/login/reset', { ...info })

export {
  getCaptch,
  forget,
  login,
  register,
  reset
}
