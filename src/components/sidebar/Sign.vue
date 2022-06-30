<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinHelp"
        @click="show()"
        >说明</a
      >
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinTop"
        @click="showTop()"
        >活跃榜<span class="layui-badge-dot"></span
      ></a>
      <span class="fly-signin-days" v-show="isSign || isLogin"
        >已连续签到<cite>{{ count }}</cite
        >天</span
      >
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button
          class="layui-btn layui-btn-danger"
          id="LAY_signin"
          @click="userFavs()"
        >
          今日签到
        </button>
        <span
          >可获得<cite>{{ favs }}</cite
          >飞吻</span
        >
      </template>

      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">{{ msg }}</button>
        <span
          >获得了<cite>{{ favs }}</cite
          >飞吻</span
        >
      </template>
    </div>
    <sign-info :isShow="isShow" @closeModal="close()"></sign-info>
    <sign-list :isShow="showList" @closeModal="close()"></sign-list>
  </div>
</template>

<script>
import SignInfo from './SignInfo.vue'
import SignList from './SignList.vue'
import { userSign } from '@/api/user'
import moment from 'dayjs'
export default {
  name: 'sign',
  data () {
    return {
      isShow: false,
      showList: false,
      isSign: false,
      current: 0,
      msg: '',
      ctrl: ''
    }
  },
  components: {
    SignInfo,
    SignList
  },
  mounted () {
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const nowDate = moment().format('YYYY-MM-DD')
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    const diff = moment(nowDate).diff(moment(lastDate), 'day')
    if (diff > 0 && isSign) {
      // 如果大于一天并且isSign的值还为true,改变isSign的值，将其变成可签到
      this.isSign = false
    } else {
      this.isSign = isSign
      if (diff === 0 && isSign) {
        this.nextSign()
      } else {
        this.msg = '今日已签到'
      }
    }
  },
  watch: {
    userInfo (newval, oldval) {
      if (newval.isSign === true) {
        this.nextSign()
        this.isSign = true
      } else {
        this.isSign = false
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    favs () {
      const count = parseInt(this.count)
      let fav = 0
      if (count < 5) {
        fav = 5
      } else if (count >= 5 && count < 15) {
        fav = 10
      } else if (count >= 15 && count < 30) {
        fav = 15
      } else if (count >= 30 && count < 100) {
        fav = 20
      } else if (count >= 100 && count < 365) {
        fav = 30
      } else {
        fav = 50
      }
      return fav
    },
    count () {
      if (this.$store.state.userInfo !== {}) {
        if (typeof this.$store.state.userInfo.count !== 'undefined') {
          return this.$store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  },
  methods: {
    nextSign () {
      clearInterval(this.ctrl)
      // 获取下一次签到日期
      const newDate = moment().add(1, 'day').format('YYYY-MM-DD')
      // 现在距离下次签到日期还有多少秒
      let seconds = moment(newDate + ' 00:00:00').diff(moment(), 'second')
      console.log(seconds)
      let hour = Math.floor(seconds / 3600)
      let min = Math.floor(seconds % 3600 / 60)
      let second = seconds % 60
      this.msg = `${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second} 后可签到`
      if (seconds < 3600) {
        this.ctrl = setInterval(() => {
          seconds = moment(newDate + ' 00:00:00').diff(moment(), 'second')
          // 测试用
          // seconds = moment(newDate).diff(moment(), 'second')
          hour = Math.floor(seconds / 3600)
          min = Math.floor(seconds % 3600 / 60)
          second = seconds % 60
          this.msg = `${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second} 后可签到`
          if (seconds <= 0) {
            clearInterval(this.ctrl)
            this.isSign = false
            const user = this.$store.state.userInfo
            user.isSign = false
            this.$store.commit('setUserInfo', user)
          }
        }, 1000)
      } else {
        this.msg = '今日已签到'
      }
    },
    show () {
      this.isShow = true
    },
    showTop () {
      this.showList = true
    },
    close () {
      this.isShow = false
      this.showList = false
    },
    userFavs () {
      if (!this.isLogin) {
        this.$msg({
          type: 'shake',
          msg: '请先登录哟',
          // bgColor: 'rgba(112,55,30,.5)',
          duration: 2000
        })
        return
      }
      userSign().then((res) => {
        const user = this.$store.state.userInfo
        if (res.code === 200) {
          user.count = res.count
          user.favs = res.favs
          this.$msg({
            type: 'shake',
            msg: '签到成功',
            // bgColor: 'rgba(112,55,30,.5)',
            duration: 2000
          })
        } else {
          this.$msg({
            type: 'shake',
            msg: '今日已签到',
            // bgColor: 'rgba(112,55,30,.5)',
            duration: 2000
          })
        }
        this.isSign = true
        user.lastSign = res.lastSign
        user.isSign = true
        this.$store.commit('setUserInfo', user)
      })
      this.nextSign()
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  70% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20000;
}
.layui-layer {
  width: 300px;
  height: 472px;
  background-color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 20001;
  margin-left: -150px;
  margin-top: -236px;

  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layer-title {
    height: 42px;
    line-height: 42px;
    color: #333;
    background-color: #f8f8f8;
    padding: 0 20px;
  }
  .layui-layer-content {
    padding: 20px;
  }
}
.tips {
  font-size: 13px;
  line-height: 12px;
}
</style>
