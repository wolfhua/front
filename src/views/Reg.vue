<template>
  <div class="layui-container fly-marginTop">
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title">
        <li><router-link :to="{name: 'Login'}">登入</router-link></li>
        <li class="layui-this">注册</li>
      </ul>
      <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
        <ValidationObserver ref="observer" v-slot="{ validate }">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <ValidationProvider class="layui-form-item" name="username" tag="div" rules="required|email" v-slot="{ errors }">
                  <label for="L_email" class="layui-form-label">邮箱</label>
                  <div class="layui-input-inline">
                    <input type="text" v-model="username" name="username" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux" v-if="!errors[0]">将会成为您唯一的登入名</div>
                  <div class="error layui-form-mid">{{errors[0]}}</div>
                </ValidationProvider>
                <ValidationProvider class="layui-form-item" name="nickname" tag="div" rules="required|nickname|min:4" v-slot="{ errors }">
                  <label for="L_username" class="layui-form-label">昵称</label>
                  <div class="layui-input-inline">
                    <input type="text" v-model="nickname" name="nickname" autocomplete="off" class="layui-input">
                  </div>
                  <div class="error layui-form-mid">{{errors[0]}}</div>
                </ValidationProvider>
                <ValidationProvider class="layui-form-item" name="password" tag="div" rules="required|password:6,12" v-slot="{ errors }" vid="confirmpassword">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <input type="password" v-model="password" name="password" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux" v-if="!errors[0]">6到12个字符</div>
                  <div class="error layui-form-mid">{{errors[0]}}</div>
                </ValidationProvider>
                <ValidationProvider class="layui-form-item" name="repassword" tag="div" rules="confirmed:confirmpassword" v-slot="{ errors }">
                  <label for="L_repass" class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <input type="password" v-model="repassword" name="repassword" autocomplete="off" class="layui-input">
                  </div>
                  <div class="error layui-form-mid">{{errors[0]}}</div>
                </ValidationProvider>
                <ValidationProvider class="layui-form-item" name="code" tag="div" rules="required|length:4" v-slot="{ errors }">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <input type="text" v-model="code" name="code" placeholder="请输入验证码" autocomplete="off" class="layui-input">
                    </div>
                    <div>
                      <span v-html="svg" @click="getCode()"></span>
                    </div>
                  </div>
                  <div class="error layui-form-mid">{{ errors[0] }}</div>
                </ValidationProvider>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button" @click="validate().then(submit)">立即注册</button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
                  <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                  <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
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
// import '@/local/index.js'
import { getCaptch, register } from '@/api/login.js'
export default {
  name: 'reg',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      nickname: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this.getCode()
  },
  methods: {
    getCode () {
      const sid = this.$store.state.sid
      getCaptch({ sid }).then(res => {
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
        return
      }
      register({
        username: this.username,
        nickname: this.nickname,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          // 注册成功
          // 清空数据
          this.username = ''
          this.nickname = ''
          this.password = ''
          this.repassword = ''
          this.code = ''
          // 清空表单数据
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // 跳转到登录页面
          this.$popup({
            type: 'alert',
            msg: res.msg,
            successBtnText: '好的'
          }, () => {
            this.$router.push('/login')
          })
        } else {
          // 图片验证码错误
          // res.msg格式： {username：['邮箱已经被注册'], code: ['验证码输入错误']}
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.error{
  color: red;
  font-weight: 600;
}
</style>
