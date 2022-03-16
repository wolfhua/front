<template>
  <dl class="fly-panel fly-list-one" v-if="lists.length > 0">
    <dt class="fly-panel-title">本周热议</dt>
    <dd v-for="(item, index) in lists" :key="'hotlist' + index">
      <a href="jie/detail.html">{{ item.title }}</a>
      <span><i class="iconfont icon-pinglun1"></i> {{ item.answer }}</span>
    </dd>

    <!-- 无数据时 -->
    <!--
        <div class="fly-none">没有相关数据</div>
        -->
  </dl>
</template>

<script>
import { getTopWeek } from '@/api/content'
export default {
  name: 'links',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTopWeek().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
