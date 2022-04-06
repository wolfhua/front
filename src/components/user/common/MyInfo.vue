<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver ref="observer" v-slot="{ validate }">
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
            name="username"
            autocomplete="off"
            class="layui-input"
            v-model="username"
          />
        </div>
        <!-- <div class="layui-form-mid layui-word-aux">
          如果您在邮箱已激活的情况下，变更了邮箱，需<a
            href="activate.html"
            style="font-size: 12px; color: #4f99cf"
            >重新验证邮箱</a
          >。
        </div> -->
        <div class="error layui-form-mid">{{ errors[0] }}</div>
      </ValidationProvider>

      <ValidationProvider
        class="layui-form-item"
        name="nickname"
        tag="div"
        rules="required"
        v-slot="{ errors }"
      >
        <label class="layui-form-label">昵称</label>
        <div class="layui-input-inline">
          <input
            type="text"
            name="nickname"
            autocomplete="off"
            class="layui-input"
            v-model="nickname"
          />
        </div>
        <div class="error layui-form-mid">{{ errors[0] }}</div>
      </ValidationProvider>
      <div class="layui-form-item">
        <label class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input
            type="text"
            autocomplete="off"
            class="layui-input"
            v-model="location"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">性别</label>
        <div class="layui-input-inline gray ml1 mt1">
          <label for="gender1">
            <input
              id="gender1"
              type="radio"
              name="sex"
              value="0"
              title="男"
              v-model="gender"
            />
            <i
              class="layui-icon layui-icon-circle"
              :class="{ 'layui-icon-radio': gender === '0' }"
            ></i
            >男
          </label>
          <label for="gender2" class="ml1">
            <input
              id="gender2"
              type="radio"
              name="sex"
              value="1"
              title="女"
              v-model="gender"
            />
            <i
              class="layui-icon layui-icon-circle"
              :class="{ 'layui-icon-radio': gender === '1' }"
            ></i
            >女
          </label>
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label for="L_sign" class="layui-form-label">签名</label>
        <div class="layui-input-block">
          <textarea
            placeholder="随便写些什么刷下存在感"
            autocomplete="off"
            class="layui-textarea"
            style="height: 80px"
            v-model="regmark"
          ></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <button class="layui-btn" @click="validate().then(submit)">
          确认修改
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { updateUserInfo } from '@/api/user'
export default {
  name: 'my-info',
  components: {
    ValidationProvider,
    // ValidationObserver 整个表单校验
    ValidationObserver
  },
  data () {
    return {
      username: '',
      nickname: '',
      gender: '',
      location: '',
      regmark: ''
    }
  },
  mounted () {
    const { username, nickname, gender, location, regmark } = this.$store.state.userInfo
    console.log(gender)
    this.username = username || ''
    this.nickname = nickname || ''
    this.gender = gender || ''
    this.location = location || ''
    this.regmark = regmark || ''
  },
  methods: {
    async submit () {
      // validate()方法，如果所有的表单元素都校验成功，返回true,否则返回false
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      updateUserInfo({
        username: this.username,
        nickname: this.nickname,
        gender: this.gender,
        location: this.location,
        regmark: this.regmark
      }).then((res) => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', {
            ...this.$store.state.userInfo,
            ...{
              username: this.username,
              nickname: this.nickname,
              gender: this.gender,
              location: this.location,
              regmark: this.regmark
            }
          })
          this.$popup({
            msg: res.msg
          })
        } else {
          this.$popup({
            msg: res.msg
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
.layui-icon-radio {
  color: #5fb878;
}
</style>
