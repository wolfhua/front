<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div
      class="layui-tab layui-tab-brief"
      lay-filter="user"
      id="LAY_msg"
      style="margin-top: 15px"
    >
      <button class="layui-btn layui-btn-danger" @click="clearAll()">
        清空全部消息
      </button>
      <div id="LAY_minemsg" style="margin-top: 10px">
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <ul class="mine-msg">
          <li v-for="(item, index) in lists" :key="'comments' + index">
            <blockquote class="layui-elem-quote">
              <router-link
                :to="{ name: 'home', params: { uid: item.cuid._id } }"
              >
                <cite>{{ item.cuid.nickname }}</cite>
              </router-link>
              回答了您的求解
              <router-link
                :to="{ name: 'detail', params: { tid: item.tid._id } }"
              >
                <cite>{{ item.tid.title }}</cite>
              </router-link>
            </blockquote>
            <div v-richtext="item.content"></div>
            <p>
              <span>{{ item.created | formatDate }}</span>
              <a
                @click.prevent="clear(item)"
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
                >删除</a
              >
            </p>
          </li>
        </ul>
        <simu-page
          showType="icon"
          :showEnd="true"
          :hasTotal="true"
          :hasSelect="true"
          :total="total"
          :size="limit"
          :current="page"
          @changeCurrent="handleCurrent"
          @changeLimit="handleLimit"
        ></simu-page>
      </div>
    </div>
  </div>
</template>

<script>
import { getMsg, setMsg } from '@/api/user'
import pagination from '@/components/modules/pagination/Index'
export default {
  name: 'user-msg',
  components: {
    'simu-page': pagination
  },
  data () {
    return {
      page: 0,
      limit: 10,
      total: 0,
      lists: [],
      socket: {}
    }
  },
  mounted () {
    this.getMsgAll()
  },
  methods: {
    handleCurrent (val) {
      this.page = val
      this.getMsgAll()
    },
    handleLimit (val) {
      this.limit = val.limit
      this.page = val.page
      this.getMsgAll()
    },
    getMsgAll () {
      getMsg({
        page: this.page,
        limit: this.limit
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        } else {
          this.$msg({
            type: '',
            msg: res.message
          })
        }
      })
    },
    clearAll () {
      // 设置所有消息已读
      setMsg().then(res => {
        if (res.code === 200) {
          this.lists = []
          this.total = 0
          this.$store.commit('setMessage', { message: 0 })
        }
      })
    },
    clear (item) {
      // 设置特定消息为已读
      setMsg({ id: item._id }).then(res => {
        if (res.code === 200) {
          this.getMsgAll()
          this.$store.commit('setMessage', { message: this.$store.state.message.message - 1 })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
