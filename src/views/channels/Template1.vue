<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <simu-list></simu-list>
      </div>
      <div class="layui-col-md4">
        <simu-hotlist></simu-hotlist>
        <simu-ads></simu-ads>
        <simu-links></simu-links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'
export default {
  name: 'template1',
  components: {
    'simu-hotlist': HotList,
    'simu-ads': Ads,
    'simu-links': Links,
    'simu-list': List
  }
}
</script>

<style lang="scss" scoped>
</style>
