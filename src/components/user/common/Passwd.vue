<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <form>
      <ValidationObserver ref="observer" v-slot="{ validate }">
        <ValidationProvider
          class="layui-form-item"
          name="oldpassword"
          tag="div"
          rules="required|password:6,12"
          v-slot="{ errors }"
        >
          <label for="L_repass" class="layui-form-label">原密码</label>
          <div class="layui-input-inline">
            <input
              type="password"
              v-model="oldpassword"
              name="oldpassword"
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
          vid="confirmpassword"
        >
          <label for="L_pass" class="layui-form-label">新密码</label>
          <div class="layui-input-inline">
            <input type="password" class="layui-input" v-model="password" />
          </div>
          <div class="layui-form-mid layui-word-aux" v-if="!errors[0]">
            6到16个字符
          </div>
          <div class="error layui-form-mid">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="layui-form-item"
          name="repassword"
          tag="div"
          rules="confirmed:confirmpassword"
          v-slot="{ errors }"
        >
          <label for="L_repass" class="layui-form-label">确认密码</label>
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
        <div class="layui-form-item">
          <button
            class="layui-btn"
            type="button"
            @click="validate().then(submit)"
          >
            确认修改
          </button>
        </div>
      </ValidationObserver>
    </form>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { changePassword } from '@/api/user'
export default {
  name: 'password',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      oldpassword: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    async submit () {
      // 通过 refs获取dom元素中的方法
      // validate()方法，如果所有的表单元素都校验成功，返回true,否则返回false
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.oldpassword === this.password) {
        this.$popup({
          msg: '新密码不能和原密码一样！'
        })
        this.password = ''
        this.repassword = ''
        return
      }
      changePassword({
        oldpwd: this.oldpassword,
        newpwd: this.password
      }).then((res) => {
        this.$popup({
          msg: res.msg
        })
        if (res.code === 200) {
          this.oldpassword = ''
          this.password = ''
          this.repassword = ''
          // 清空表单验证数据
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
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
