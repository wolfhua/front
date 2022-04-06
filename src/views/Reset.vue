<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link to="/login">登录</router-link></li>
          <li class="layui-this">
            <router-link :to="{ name: 'Forget' }"></router-link>重置密码
          </li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <validation-observer ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form>
                  <div class="layui-form-item">
                    <ValidationProvider
                      class="layui-form-item"
                      name="password"
                      tag="div"
                      rules="required|password:6,12"
                      v-slot="{ errors }"
                      vid="confirmpassword"
                    >
                      <label for="L_pass" class="layui-form-label">密码</label>
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          v-model="password"
                          name="password"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div
                        class="layui-form-mid layui-word-aux"
                        v-if="!errors[0]"
                      >
                        6到12个字符
                      </div>
                      <div class="error layui-form-mid">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <ValidationProvider
                      class="layui-form-item"
                      name="repassword"
                      tag="div"
                      rules="confirmed:confirmpassword"
                      v-slot="{ errors }"
                    >
                      <label for="L_repass" class="layui-form-label"
                        >确认密码</label
                      >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          v-model="repassword"
                          name="repassword"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="error layui-form-mid">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <validation-provider
                      name="code"
                      ref="codefield"
                      rules="required|length:4"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label"
                          >验证码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div
                          class="layui-form-mid"
                          v-html="svg"
                          @click="getCode()"
                          id="img"
                          style="padding: 0 !important; width: 150px"
                        ></div>
                      </div>
                      <div class="layui-row">
                        <div class="error layui-form-mid">{{ errors[0] }}</div>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submit)"
                    >
                      提交
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCaptch, reset } from '@/api/login'
import { getParam } from '@/utils/common'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'reset',
  components: {
    ValidationProvider,
    // ValidationObserver 整个表单校验
    ValidationObserver
  },
  data () {
    return {
      key: '',
      password: '',
      repassword: '',
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
    this.key = getParam('key')
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
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      reset({
        key: this.key,
        password: this.password,
        sid: this.$store.state.sid,
        code: this.code
      }).then((res) => {
        if (res.code === 200) {
          this.$popup({
            msg: '密码修改成功'
          }, () => {
            this.$router.push({ name: 'Login' })
          })
        } else {
          this.getCode()
          if (res.msg instanceof Object) {
            this.$refs.observer.setErrors(res.msg)
          } else {
            this.$popup({
              msg: res.msg
            })
          }
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
