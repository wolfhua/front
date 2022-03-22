<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a
        :class="{ 'layui-this': state === '' && tag == '' }"
        @click.prevent="search()"
        >综合</a
      >
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': state == '0' }" @click.prevent="search(0)"
        >未结</a
      >
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': state == '1' }" @click.prevent="search(1)"
        >已结</a
      >
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': tag == '精华' }" @click.prevent="search(2)"
        >精华</a
      >
      <span class="fly-filter-right layui-hide-xs">
        <a
          :class="{ 'layui-this': sort == 'created' }"
          @click.prevent="search(3)"
          >按最新</a
        >
        <span class="fly-mid"></span>
        <a
          :class="{ 'layui-this': sort == 'answer' }"
          @click.prevent="search(4)"
          >按热议</a
        >
      </span>
    </div>
    <list-item
      :lists="lists"
      :isShowMore="true"
      @nextPage="nextPage()"
      :isEnd="isEnd"
    ></list-item>
  </div>
</template>

<script>
import listmix from '@/mixin/list'
import ListItem from './ListItem'
export default {
  name: 'list',
  mixins: [listmix],
  data () {
    return {

    }
  },
  components: {
    ListItem
  },
  watch: {
    // wacth,监听到变化才会执行
    current (newval, oldval) {
      // console.log('current:' + oldval + ',' + newval)
      this.init()
    },
    $route (newval, oldval) {
      const catalog = newval.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  mounted () {
    // console.log(this.$route.params.catalog)
    const catalog = this.$route.params.catalog
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getLists()
  },
  methods: {
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      switch (val) {
        // 未结帖
        case 0:
          this.state = 0
          this.tag = ''
          break
        // 已结帖
        case 1:
          this.state = 1
          this.tag = ''
          break
        // 查询标签精华
        case 2:
          this.state = ''
          this.tag = '精华'
          break
        // 按时间查询
        case 3:
          this.sort = 'created'
          break
        // 按评论数查询
        case 4:
          this.sort = 'answer'
          break
        default:
          this.state = ''
          this.tag = ''
          this.current = ''
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
