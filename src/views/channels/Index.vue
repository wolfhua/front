<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <simu-top></simu-top>
        <simu-list></simu-list>
      </div>
      <div class="layui-col-md4">
        <simu-tips></simu-tips>
        <simu-sign></simu-sign>
        <simu-hotlist></simu-hotlist>
        <simu-ads></simu-ads>
        <simu-links></simu-links>
      </div>
    </div>
  </div>
</template>

<script>
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Top from '@/components/contents/Top'
import List from '@/components/contents/List'
export default {
  name: 'index',
  components: {
    'simu-tips': Tips,
    'simu-sign': Sign,
    'simu-hotlist': HotList,
    'simu-ads': Ads,
    'simu-links': Links,
    'simu-list': List,
    'simu-top': Top
  }
}
</script>

<style lang="scss" scoped>
</style>
