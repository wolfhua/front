<template>
  <div class="modal" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="layui-layer layui-layer-page info" :class="{ active: isShow }">
      <div class="layui-layer-title">
        签到活跃榜 - TOP20
        <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li :class="{ 'layui-this': current === 0 }" @click="choice(0)">
              最新签到
            </li>
            <li :class="{ 'layui-this': current === 1 }" @click="choice(1)">
              今日最快
            </li>
            <li :class="{ 'layui-this': current === 2 }" @click="choice(2)">
              总签到榜
            </li>
          </ul>
          <div class="layui-tab-content fly-signin-list">
            <ul class="layui-tab-item layui-show">
              <li v-for="(item, index) in lists" :key="'sign' + index">
                <img src="/img/avatar/default.png" alt="" />
                <cite class="fly-link">{{ item.name }}</cite>
                <span class="fly-grey" v-if="current !== 2">
                  签到于{{ item.created }}
                </span>
                <span class="fly-grey" v-else>
                  已经连续签到
                  <i class="orange">{{ item.count }}</i
                  >天
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign-list',
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      current: 0,
      lists: []
    }
  },
  methods: {
    close () {
      this.$emit('closeModal')
    },
    choice (val) {
      this.current = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
