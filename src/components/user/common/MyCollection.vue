<template>
  <div>
    <table class="layui-table">
      <thead>
        <tr>
          <th width="70%">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-center">
              <span>收藏时间</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="'mycollect' + index">
          <td class="title">
            <router-link
              class="link"
              :to="{ name: 'detail', params: { tid: item.tid } }"
              >{{ item.title }}</router-link
            >
          </td>
          <td class="text-right">{{ item.created | formatDate }}</td>
        </tr>
      </tbody>
    </table>
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
import { getCollect } from '@/api/user'
import pagination from '@/components/modules/pagination/Index'
export default {
  name: 'my-collection',
  components: {
    'simu-page': pagination
  },
  data () {
    return {
      list: [],
      total: 0,
      current: 0,
      limit: 10
    }
  },
  mounted () {
    this.getCollectList()
  },
  methods: {
    handleCurrent (val) {
      this.current = val
      this.getCollectList()
    },
    handleLimit (val) {
      this.limit = val.limit
      this.current = val.current
      this.getCollectList()
    },
    getCollectList () {
      getCollect({
        page: this.current,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.list = res.data
          this.total = res.total
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
