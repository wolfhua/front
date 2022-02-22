<template>
  <div v-show="isShow">
    <div class="popup">
      <div class="flex">{{msg}}</div>
      <div v-if="type === 'alert'">
        <div class="btnCommon success" @click="successEvent()">{{successBtnText}}</div>
      </div>
      <div v-else class="btnCommonBox">
        <div class="btnCommon cancel" @click="cancelEvent()">{{cancelBtnText}}</div>
        <div class="btnCommon success" @click="successEvent()">{{successBtnText}}</div>
      </div>
    </div>
    <div class="mask" @click="closeMask()"></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      // alert 、 confirm
      default: 'alert'
    },
    msg: {
      type: String,
      default: '我是弹窗的啦!我是弹窗的啦!'
    },
    successBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    success: {
      type: Function,
      default: () => {
        console.log('点击了success!')
      }
    },
    cancel: {
      type: Function,
      default: () => {
        console.log('点击了cancel!')
      }
    }
  },
  methods: {
    close () {
      this.isShow = false
    },
    closeMask () {
      if (this.type === 'alert') {
        this.close()
      }
    },
    cancelEvent () {
      this.cancel()
      this.close()
    },
    successEvent () {
      this.success()
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
$btn-main: #009688;
$btn-dark: darken($btn-main, 5%);
.popup{
  width: 300px;
  height: 150px;
  background: #fff;
  border-radius: 6px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -160px;
  margin-top: -80px;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  z-index: 999;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
.flex{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnCommonBox {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btnCommon {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 5px;
  &.success {
    background: $btn-main;
    color: #fff;
    &:hover {
      background: $btn-dark;
    }
  }
  &.cancel {
    background: #ededed;
    color: #333;
  }
}
// 遮罩层
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 888;
  overflow: hidden;
}
</style>
