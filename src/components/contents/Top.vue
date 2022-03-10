<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter" v-show="lists.length > 0">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #ff5722"
        >去签到</a
      >
    </div>
    <list-item :lists="lists" :isShowMore="false"></list-item>
  </div>
</template>

<script>
import listmix from '@/mixin/list'
import ListItem from './ListItem'
export default {
  name: 'top',
  mixins: [listmix],
  data () {
    return {
      isTop: 1,
      limit: 5
    }
  },
  components: {
    ListItem
  }
}
</script>

<style lang="scss" scoped>
</style>
