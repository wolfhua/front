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
import { getList } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      isEnd: false, // 是否最后一页
      isRepeat: false, // 是否重复点击加载
      state: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '', // 分类
      lists: []
    }
  },
  components: {
    ListItem
  },
  mounted () {
    this._getLists()
  },
  methods: {
    _getLists () {
      // 判断是否重复点击
      if (this.isRepeat) return
      // 判断是否最后一页
      if (this.isEnd) return
      this.isRepeat = true
      const options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.state
      }
      getList(options).then((res) => {
        this.isRepeat = false
        // 异常判断，接口状态返回为200，提示错误
        // 判断lists数组长度，如果为0，直接赋值
        // 如果长度不为0，追加
        if (res.code === 200) {
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        } else {
          this.$popup({
            // type: 'alert',
            msg: res.message,
            successBtnText: 'OK'
          })
        }
      }).catch((err) => {
        this.isRepeat = false
        if (err) {
          this.$popup({
            // type: 'alert',
            msg: err.message,
            successBtnText: 'OK'
          })
        }
      })
    },
    nextPage () {
      this.page++
      this._getLists()
    },
    search (val) {
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
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
