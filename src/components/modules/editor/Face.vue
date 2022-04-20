<template>
  <transition name="fade">
    <div
      class="layui-layer layui-layer-tips layui-edit-face edit-content"
      v-show="isShow"
    >
      <div class="layui-layer-conent">
        <ul class="layui-clear">
          <li
            v-for="(value, key) in lists"
            :key="'face' + key"
            @click="handleFaceClick(key)"
          >
            <img :src="value" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from '@/assets/js/face'
export default {
  name: 'Face',
  props: ['isShow', 'ctrl'],
  data () {
    return {
      lists: faces
    }
  },
  methods: {
    handleFaceClick (item) {
      this.$emit('addEvent', item)
      this.$emit('closeEvent')
    },
    handleBodyClick (e) {
      e.stopPropagation()
      // 触发隐藏本组件的关闭事件
      // 判断是否点击到了飞控制icon以外的地方
      if (typeof this.ctrl === 'undefined') {
        return
      }
      console.log(this.ctrl)
      console.log(e.target)
      if (!this.ctrl.contains(e.target)) {
        this.$emit('closeEvent')
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss" scoped>
</style>
