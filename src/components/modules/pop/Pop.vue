<template>
  <div class="tips animation" :class="type" v-show="isShow" ref="tips">
    <span class="content" :style="{ 'background-color': bgColor }">{{
      msg
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'pop',
  props: {
    type: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  watch: {
    isShow (newval, oldval) {
      if (newval !== oldval && newval === true) {
        setTimeout(() => {
          const width = this.$refs.tips.clientWidth
          const height = this.$refs.tips.clientHeight
          this.$refs.tips.style.marginLeft = -width / 2 + 'px'
          this.$refs.tips.style.marginTop = -height / 2 + 'px'
        }, 0)
        // 3秒后关闭信息提示窗
        setTimeout(() => {
          this.isShow = false
          this.type = ''
          this.msg = ''
        }, this.duration)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}

@keyframes shake1 {
  0%,
  100% {
    transform: translateY(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateY(-10px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateY(10px);
  }
}
.tips {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2000;
}
.animation {
  animation-fill-mode: both;
  animation-duration: 0.6s;
}
.content {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
  color: #fff;
  border-radius: 5px;
}
.shake {
  animation-name: shake;
}
.shake1 {
  animation-name: shake1;
}
</style>
