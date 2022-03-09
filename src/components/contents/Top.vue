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
import ListItem from './ListItem'
export default {
  name: 'top',
  data () {
    return {
      page: 0,
      limit: 20,
      lists: [
        {
          uid: {
            name: '李四',
            isVip: 3
          },
          catalog: 'ask',
          title: '俄罗斯打乌克兰,国际原油上涨',
          content: '',
          created: '2022-03-03 13:14:25',
          fav: 20,
          isEnd: 0,
          reads: 0,
          status: 0,
          answer: 56,
          isTop: 1,
          tags: [
            {
              name: '热门',
              class: 'layui-bg-blue'
            }
          ]
        }
      ]
    }
  },
  components: {
    ListItem
  }
}
</script>

<style lang="scss" scoped>
</style>
