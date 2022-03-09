<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main fly-list-static">
      <ul class="layui-clear simu-quick">
        <li
          class="layui-col-xs6"
          v-for="(item, index) in lists"
          :key="'tips' + index"
        >
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTips } from '@/api/content'
export default {
  name: 'tips',
  data () {
    return {
      lists: [
        {
          link: 'https://jenkins.simuchen.com',
          title: 'jenkins'
        },
        {
          link: 'https://showdoc.simuchen.com/',
          title: 'showdoc'
        }
      ]
    }
  },
  mounted () {
    getTips().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
$border_color: #f2f2f2;
.fly-panel-main {
  padding: 15px;
}
.simu-quick {
  text-align: center;
  border: 1px solid $border_color;
  border-right: none;
  border-bottom: none;
  li {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border: 1px solid $border_color;
    border-left: none;
    border-top: none;
    a {
      display: block;
    }
  }
}
</style>
