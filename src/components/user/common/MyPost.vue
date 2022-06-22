<template>
  <div>
    <div class="overflow">
      <table class="layui-table">
        <thead>
          <tr>
            <th>
              <div class="layui-table-cell pl0">
                <span>帖子标题</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>状态</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>结贴</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>发表时间</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>数据</span>
              </div>
            </th>
            <th class="min-cell">
              <div class="layui-table-cell text-center">
                <span>操作</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="item in postList" :key="item._id">
            <td class="text-left">
              <router-link
                class="link"
                :to="{ name: 'detail', params: { tid: item._id } }"
              >
                {{ item.title }}
              </router-link>
            </td>
            <td>{{ item.status === "0" ? "打开" : "关闭" }}</td>
            <td :class="{ success: item.isEnd !== '0' }">
              {{ item.isEnd === "0" ? "未结" : "已结贴" }}
            </td>
            <td>{{ item.created | formatDate }}</td>
            <td>{{ item.reads }}阅/{{ item.answer }}答</td>
            <td>
              <div
                class="layui-btn layui-btn-xs"
                :class="{ 'layui-btn-disabled': item.isEnd === '1' }"
                @click="editPost(item)"
              >
                编辑
              </div>
              <div
                class="layui-btn layui-btn-xs layui-btn-danger"
                @click="deletePost(item)"
              >
                删除
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <simu-page
      align="left"
      showType="icon"
      :showEnd="true"
      :hasTotal="true"
      :hasSelect="true"
      :total="total"
      :size="limit"
      :current="current"
      @changeCurrent="handleCurrent"
      @changeLimit="handleLimit"
    ></simu-page>
  </div>
</template>

<script>
import { getPostListByUid, deletePostByUid } from '@/api/user'
import pagination from '@/components/modules/pagination/Index'
export default {
  name: 'my-post',
  components: {
    'simu-page': pagination
  },
  data () {
    return {
      postList: [],
      total: 0,
      current: 0,
      limit: 10
    }
  },
  mounted () {
    this.getPostList()
  },
  methods: {
    handleCurrent (val) {
      this.current = val
      this.getPostList()
    },
    handleLimit (val) {
      this.limit = val.limit
      this.current = val.current
      this.getPostList()
    },
    getPostList () {
      getPostListByUid({
        page: this.current,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.postList = res.data
          this.total = res.total
        } else {
          this.$msg({
            type: '',
            msg: res.msg
          })
        }
      })
    },
    deletePost (item) {
      this.$confirm('确定删除吗?', () => {
        if (item.isEnd !== '0') {
          this.$msg({
            type: 'shake',
            msg: '帖子已结贴，无法删除！'
          })
          return
        }
        deletePostByUid({
          tid: item._id
        }).then((res) => {
          if (res.code === 200) {
            this.$msg({
              type: '',
              msg: '删除成功！'
            })
            this.postList.splice(this.postList.indexOf(item), 1)
          } else {
            this.$msg({
              type: 'shake',
              msg: res.msg
            })
          }
        })
      }, () => {

      })
    },
    editPost (item) {
      if (item.isEnd === '1') {
        this.$msg({
          type: 'shake',
          msg: '已经结贴，无法编辑'
        })
      } else {
        this.$router.push({
          name: 'edit',
          params: { tid: item._id, postDetail: item }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overflow {
  overflow-x: auto;
}
.min-cell {
  min-width: 82px;
}
</style>
