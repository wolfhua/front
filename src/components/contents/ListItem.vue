<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in items" :key="'listitem' + index">
        <router-link
          :to="{ name: 'home', params: { uid: item.uid._id } }"
          class="fly-avatar"
        >
          <img v-if="item.uid.pic" :src="item.uid.pic" alt="贤心" />
          <img
            v-else
            src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg"
            alt="贤心"
          />
        </router-link>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <router-link :to="{ name: 'detail', params: { tid: item._id } }">{{
            item.title
          }}</router-link>
        </h2>
        <div class="fly-list-info">
          <router-link
            :to="{ name: 'home', params: { uid: item.uid._id } }"
            link
          >
            <cite>{{ item.uid.nickname }}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i
              class="layui-badge fly-badge-vip"
              v-if="item.uid.isVip !== '0'"
              >{{ "VIP" + item.uid.isVip }}</i
            >
          </router-link>
          <span>{{ item.created | formatDate }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"
            ><i class="iconfont icon-kiss"></i> {{ item.fav }}</span
          >
          <span
            class="layui-badge fly-badge-accept layui-hide-xs"
            v-show="item.status !== '0'"
            >已结</span
          >
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i>
            {{ item.answer }}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0">
          <span
            class="layui-badge"
            v-for="(tag, index) in item.tags"
            :key="'tag' + index"
            :class="tag.class"
            >{{ tag.name }}</span
          >
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShowMore">
      <div class="laypage-main" v-if="!isEnd">
        <a @click.prevent="more()" class="laypage-next">更多求解</a>
      </div>
      <div class="nomore gray" v-else>没有更多了</div>
    </div>
  </div>
</template>

<script>
// lodash效率更高
import _ from 'lodash'
import { baseUrl } from '@/config'
// import moment from 'dayjs'
// import 'dayjs/locale/zh-cn'
// import relativeTime from 'dayjs/plugin/relativeTime'
// moment.locale('zh-cn')
// moment.extend(relativeTime)
export default {
  name: 'listitem',
  props: {
    lists: {
      default: () => [],
      type: Array
    },
    isShowMore: {
      default: false,
      type: Boolean
    },
    isEnd: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    items () {
      _.map(this.lists, (item) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
        }
        if (item.uid.pic) {
          const BaseUrl = process.env.NODE_ENV === 'development' ? baseUrl.dev : baseUrl.pro
          item.uid.pic = BaseUrl + item.uid.pic
        }
      })
      return this.lists
    }
  },
  methods: {
    more () {
      this.$emit('nextPage')
    }
  }
  // 过滤器
  // filters: {
  //   formatDate (date) {
  //     // 7天前，显示日期
  //     if (moment(date).isBefore(moment().subtract('7', 'days'))) {
  //       return moment(date).format('YYYY-MM-DD')
  //     } else {
  //       // xx分钟（小时、天）前
  //       // moment库用法
  //       // return moment(date).from(moment())
  //       // dayjs库用法
  //       return moment(date).fromNow()
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.nomore {
  font-size: 16px;
  padding: 30px 0;
}
</style>
