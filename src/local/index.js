import { extend, localize } from 'vee-validate'
import { required, email, length, min, max } from 'vee-validate/dist/rules'
extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('password', {
  validate (value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max']
})
extend('length', length)
const zhCN = {
  names: {
    name: '账号',
    username: '账号',
    nickname: '昵称',
    password: '密码',
    repassword: '确认密码',
    code: '验证码'
  },
  messages: {
    required: '请输入{_field_}!',
    email: '请输入正确的邮箱格式!',
    password: '密码必须是6到12位!',
    length: '验证码长度为4!'
  }
}

localize('zh-CN', zhCN)
