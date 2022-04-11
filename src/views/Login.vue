<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li><router-link :to="{ name: 'Reg' }">注册</router-link></li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <ValidationObserver ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <ValidationProvider
                    class="layui-form-item"
                    name="username"
                    tag="div"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <label class="layui-form-label">邮箱</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        v-model="username"
                        name="username"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="error layui-form-mid">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <ValidationProvider
                    class="layui-form-item"
                    name="password"
                    tag="div"
                    rules="required|password:6,12"
                    v-slot="{ errors }"
                  >
                    <label class="layui-form-label">密码</label>
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        v-model="password"
                        name="password"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="error layui-form-mid">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <ValidationProvider
                    class="layui-form-item"
                    name="code"
                    ref="codeField"
                    tag="div"
                    rules="required|length:4"
                    v-slot="{ errors }"
                  >
                    <div class="layui-row">
                      <label class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          v-model="code"
                          name="code"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div>
                        <span
                          style="color: #c00"
                          v-html="svg"
                          @click="getCode()"
                        ></span>
                      </div>
                    </div>
                    <div class="error layui-form-mid">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submit)"
                    >
                      立即登录
                    </button>
                    <span style="padding-left: 20px">
                      <router-link :to="{ name: 'Forget' }"
                        >忘记密码？</router-link
                      >
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      href=""
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href=""
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCaptch, login } from '@/api/login.js'
import { v4 as uuidv4 } from 'uuid'
import { baseUrl } from '@/config'
export default {
  name: 'login',
  components: {
    ValidationProvider,
    // ValidationObserver 整个表单校验
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    // window.vue = this // 可以直接在浏览器调试窗口使用 window.vue.$alert...
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    // 提交设置sid到store
    this.$store.commit('setSid', sid)
    this.getCode()
  },
  methods: {
    getCode () {
      // 从store中获取sid
      const sid = this.$store.state.sid
      getCaptch({
        sid: sid
      }).then((res) => {
        // console.log(res)
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      // 通过 refs获取dom元素中的方法
      // validate()方法，如果所有的表单元素都校验成功，返回true,否则返回false
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          // 登录成功，存储用户信息
          res.data.username = this.username
          if (res.data.pic) {
            const BaseUrl = process.env.NODE_ENV === 'development' ? baseUrl.dev : baseUrl.pro
            res.data.pic = BaseUrl + res.data.pic
          }
          this.$store.commit('setUserInfo', res.data)
          this.$store.commit('setToken', res.token)
          this.$store.commit('setIsLogin', true)
          // 清空数据
          this.username = ''
          this.password = ''
          this.code = ''
          // 清空表单数据
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          // 路由跳转，跳转到首页
          this.$router.push({ name: 'index' })
        } else if (res.code === 401) {
          // 图片验证码错误
          this.$refs.codeField.setErrors([res.msg])
        } else {
          this.$popup({
            // type: 'alert',
            msg: res.msg,
            successBtnText: '好的吧'
          })
        }
      }).catch(err => {
        const res = err.response
        console.log(res)
        if (res.data.code === 500) {
          console.log(1111)
          this.$popup({
            // type: 'alert',
            msg: '非法用户登录',
            successBtnText: '所得斯勒'
          }, () => {
            console.log('我知道的啦，就是想试一试嘛。。')
          })
        } else {
          this.$alert('服务器开小差啦,请稍后再试哦!')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-weight: 600;
}
</style>
