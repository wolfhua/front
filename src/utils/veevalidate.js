import { extend, localize } from 'vee-validate'
import { required, email, length, min, max, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('confirmed', confirmed)
extend('password', {
  validate (value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max']
})
extend('length', length)
extend('nickname', {
  validate (value) {
    return !(/^\d+/).test(value)
  }
})

localize('zh-CN', {
  names: {
    name: '账号',
    username: '邮箱',
    nickname: '昵称',
    password: '密码',
    repassword: '密码',
    code: '验证码'
  },
  messages: {
    ...zh.messages,
    required: '请输入{_field_}!',
    // email: '请输入正确的邮箱格式!',
    password: '密码必须是6到12位!',
    // length: '验证码长度为4!'
    nickname: '昵称不能以数字开头'
  },
  fields: {
    username: {
      email: '请输入正确的{_field_}',
      required: '{_field_}不能为空哦！'
    },
    repassword: {
      confirmed: (field, { target }) => {
        return `两次输入的${field}不一致！`
      }
    }
  }
})
