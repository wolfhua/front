<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="../assets/img/logo-2.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/"><i class="iconfont icon-jiaoliu"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html"
            ><i class="iconfont icon-iconmingxinganli"></i>案例</a
          >
        </li>
        <li class="layui-nav-item">
          <a href="/" target="_blank"><i class="iconfont icon-ui"></i>框架</a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <a
              class="iconfont icon-touxiang layui-hide-xs"
              href="../user/login.html"
            ></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'Login' }">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'Reg' }">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href=""
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href=""
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>

        <!-- 登入后的状态 -->
        <template v-else>
          <li class="layui-nav-item" @mouseover="show()" @mouseleave="hide()">
            <a class="fly-nav-avatar" href="javascript:;">
              <cite class="layui-hide-xs">{{ userInfo.nickname }}</cite>
              <!-- <i
                class="iconfont icon-renzheng layui-hide-xs"
                title="认证信息：layui 作者"
              ></i> -->
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'"
                >VIP{{ userInfo.isVip }}</i
              >
              <img v-if="userInfo.pic" :src="userInfo.pic" />
              <img
                v-else
                src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
              />
            </a>
            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{ 'layui-show': isHover }"
            >
              <dd>
                <router-link :to="{ name: 'info' }">
                  <i class="icon-size layui-icon layui-icon-set"></i>
                  基本设置
                </router-link>
              </dd>
              <dd>
                <router-link :to="{ name: 'msg' }">
                  <i class="icon-size layui-icon layui-icon-reply-fill"></i>
                  我的消息
                </router-link>
              </dd>
              <dd>
                <router-link :to="{ name: 'home' }">
                  <i class="icon-size layui-icon layui-icon-home"></i>
                  我的主页
                </router-link>
              </dd>
              <hr style="margin: 5px 0" />
              <dd>
                <a
                  href="javascript:void(0)"
                  style="text-align: center"
                  @click="logout()"
                  >退出</a
                >
              </dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      isHover: false,
      hoverContr: {}
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    isShow () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    show () {
      clearTimeout(this.hoverContr)
      this.hoverContr = setTimeout(() => {
        this.isHover = true
      }, 100)
    },
    hide () {
      // 延迟执行，否则可能会出现滑不到子菜单的情况
      clearTimeout(this.hoverContr)
      this.hoverContr = setTimeout(() => {
        this.isHover = false
      }, 500)
    },
    logout () {
      this.$popup({
        type: 'confirm',
        msg: '确定要退出登录了吗？',
        successBtnText: '真要走了',
        cancelBtnText: '再耍哈儿'
      }, () => {
        sessionStorage.clear()
        this.$store.commit('setUserInfo', '')
        this.$store.commit('setToken', '')
        this.$store.commit('setIsLogin', false)

        // this.$router.push({ name: 'index' })
        // 处理报路由重复错误
        this.$router.push({ name: 'index' }, () => {})
        // this.$router.push('/')
      }, () => {
        console.log('还没走的')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}
.icon-size {
  font-size: 18px !important;
}
</style>
