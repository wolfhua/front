<template>
  <div class="layui-container flex">
    <div class="layui-row font pd3">确定更新账号为：{{ username }}吗？</div>
    <div class="layui-row">
      <button
        type="button"
        class="layui-btn"
        :class="{ 'layui-btn-disabled': isSend }"
        @click="submit()"
      >
        确认更新
      </button>
      <router-link class="layui-btn layui-btn-primary" to="/"
        >返回首页</router-link
      >
    </div>
  </div>
</template>

<script>
import { updateUsername } from '@/api/user'
const obj = {}
export default {
  name: 'confirm',
  data () {
    return {
      isSend: false,
      username: ''
    }
  },
  mounted () {
    // 获取地址栏的参数
    const params = window.location.href.replace(/.*\?/, '')
    params.split('&').forEach((v) => {
      v = v.split('=')
      obj[v[0]] = decodeURIComponent(v[1])
    })
    this.username = obj.username
    console.log(obj)
  },
  methods: {
    async submit () {
      if (this.isSend) return
      updateUsername(obj).then((res) => {
        if (res.code === 200) {
          this.isSend = true
          this.$popup({
            msg: res.msg
          }, () => {
            this.$router.push({ name: 'index' })
          })
        } else {
          console.log(1111)
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
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font {
  font-size: 16px;
  color: #333;
}
</style>
