<template>
  <div class="panel main pd20">
    <div class="msg">Hi, Admin,您已经是我们的正式会员！</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="panel border">
          <div class="title">我的会员信息</div>
          <div class="content">
            <p>积分经验值：<span class="highlight">60</span></p>
            <p>您当前为：<span class="highlight">非VIP</span></p>
          </div>
        </div>
      </div>
      <div class="layui-col-md6">
        <sign class="border"></sign>
      </div>
      <div class="layui-col-md12" style="margin-top: -20px">
        <div class="panel border">
          <div class="title">快捷方式</div>
          <div class="content" style="height: auto">
            <ul class="layui-row layui-col-space10">
              <li
                class="layui-col-sm3 layui-col-xs4"
                v-for="(item, index) in quick_lists"
                :key="'quick-list' + index"
              >
                <router-link :to="{ name: item.route }">
                  <div class="layui-icon shortcut" :class="item.icon"></div>
                  <span>{{ item.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from '@/components/sidebar/Sign.vue'
export default {
  name: 'user-center',
  components: {
    Sign
  },
  data () {
    return {
      quick_lists: [
        {
          name: '修改信息',
          route: 'info',
          icon: 'layui-icon-set'
        },
        {
          name: '修改头像',
          route: 'pic',
          icon: 'layui-icon-face-smile'
        },
        {
          name: '修改密码',
          route: 'passwd',
          icon: 'layui-icon-password'
        },
        {
          name: '账号绑定',
          route: 'account',
          icon: 'layui-icon-app'
        },
        {
          name: '发表新贴',
          route: '',
          icon: 'layui-icon-add-circle'
        },
        {
          name: '查看分享',
          route: '',
          icon: 'layui-icon-share'
        },
        {
          name: '我的帖子',
          route: 'my-post',
          icon: 'layui-icon-username'
        },
        {
          name: '我的收藏',
          route: 'my-collection',
          icon: 'layui-icon-rate-solid'
        },
        {
          name: '其他资料',
          route: '',
          icon: 'layui-icon-template-1'
        },
        {
          name: '关注公众号',
          route: '',
          icon: 'layui-icon-login-wechat'
        },
        {
          name: '文档',
          route: '',
          icon: 'layui-icon-read'
        },
        {
          name: '后台管理',
          route: '',
          icon: 'layui-icon-user'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .panel {
    &.main {
      margin: 0 !important;
    }
  }
}
.panel {
  color: #333;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba($color: #000000, $alpha: 0.05);
  transition: all 0.2s;
  &.main {
    margin: 0 0 10px 215px;
  }
}
.highlight {
  color: #ff5722;
}
.msg {
  background-color: #f8f8f8;
  color: #666;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.border {
  border: 1px solid #e6e6e6;
}
.pd20 {
  padding: 20px;
}
.title {
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  font-size: 14px;
  border-bottom: 1px dotted #e9e9e9;
}
.content {
  padding: 18px 15px;
  height: 50px;
  line-height: 26px;
  font-size: 14px;
  color: #666;
}

li {
  text-align: center;
  // padding: 5px;
}
.shortcut {
  background-color: #2f9688;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  font-size: 30px;
}
</style>
