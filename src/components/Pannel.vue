<template>
  <div class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link to="/" custom v-slot="{ navigate }">
          <li @click="navigate" @keypress.enter="navigate" role="link">
            <a href="/">首页</a>
          </li>
        </router-link>
        <router-link
          v-for="(item, index) in lists"
          :key="'pannel' + index"
          :to="item.path"
          custom
          v-slot="{ navigate }"
        >
          <li @click="navigate" @keypress.enter="navigate" role="link">
            <a href="jie/index.html">
              {{ item.name }}
              <span class="layui-badge-dot" v-if="item.isNew"></span>
            </a>
          </li>
        </router-link>
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
          <span class="fly-mid"></span>
        </li>

        <!-- 用户登入后显示 -->
        <template v-if="isLogin">
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link :to="{ name: 'my-post' }">我发表的贴</router-link>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link :to="{ name: 'my-collection' }">
              我收藏的贴
            </router-link>
          </li>
        </template>
      </ul>

      <div class="fly-column-right layui-hide-xs">
        <span class="fly-search"><i class="layui-icon"></i></span>
        <router-link :to="{ name: 'add' }">
          <a href="/" class="layui-btn">发表新帖</a>
        </router-link>
      </div>
      <div
        class="layui-hide-sm layui-show-xs-block"
        style="margin-top: -10px; padding-bottom: 10px; text-align: center"
      >
        <router-link :to="{ name: 'add' }">
          <a href="/" class="layui-btn">发表新帖</a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pannel',
  data () {
    return {
      lists: [
        {
          name: '提问',
          path: '/index/ask',
          isNew: false
        },
        {
          name: '分享',
          path: '/index/share',
          isNew: true
        },
        {
          name: '讨论',
          path: '/index/discuss',
          isNew: false
        },
        {
          name: '建议',
          path: '/index/advise',
          isNew: true
        },
        {
          name: '公告',
          path: '/index/notice',
          isNew: false
        },
        {
          name: '动态',
          path: '/index/logs',
          isNew: false
        }
      ],
      isLogin: this.$store.state.isLogin
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
