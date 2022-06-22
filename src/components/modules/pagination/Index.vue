<template>
  <div
    class="d-flex"
    :class="{
      'flex-center': align === 'center',
      'flex-start': align === 'left',
      'flex-end': align === 'right',
    }"
    v-show="totalPages > 0"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <a
        href="javascript:;"
        @click.prevent="home()"
        class="layui-laypage-prev"
        :class="{ 'layui-disabled': current === 0 }"
        v-show="showEnd"
      >
        <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>
      <a
        href="javascript:;"
        :class="{ 'layui-disabled': current === 0 }"
        @click.prevent="prev()"
      >
        <i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>
      <!-- current + 2 < pages.length 显示 ... -->
      <!-- current - 2 > 1 显示 ... -->
      <!-- 此处current去的是数组下标，从0开始算的 -->
      <a
        v-if="pages.length > 5 && current + 1 - 2 > 1"
        href="javascript:;"
        class="layui-disabled"
      >
        ...
      </a>
      <template v-for="(item, index) in pages">
        <a
          href="javascript:;"
          v-if="item >= current + 1 - 2 && item <= current + 1 + 2"
          :key="index"
          :class="[
            current === index ? theme : '',
            current === index ? 'active' : '',
          ]"
          @click.prevent="changeIndex(index)"
          >{{ item }}</a
        >
      </template>
      <a
        v-if="pages.length > 5 && current + 1 + 2 < pages.length"
        href="javascript:;"
        class="layui-disabled"
      >
        ...
      </a>
      <a
        href="javascript:;"
        :class="{
          'layui-disabled': totalPages === 0 || current === pages.length - 1,
        }"
        @click.prevent="next()"
      >
        <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>
      <a
        href="javascript:;"
        class="layui-laypage-next"
        :class="{
          'layui-disabled': totalPages === 0 || current === pages.length - 1,
        }"
        v-show="showEnd"
        @click.prevent="end()"
      >
        <i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total" v-if="hasTotal">
      到第
      <input type="text" class="simu-input" @keyup.enter="jumpTo" />页 共
      {{ totalPages }}
      页
    </div>
    <div v-if="hasSelect">
      <div
        class="layui-unselect layui-form-select"
        :class="{ 'layui-form-selected': isSelect }"
        @click="changeFav()"
      >
        <div class="layui-select-title">
          <input
            type="text"
            placeholder="请选择"
            readonly
            v-model="options[optIndex]"
            class="layui-input layui-unselect"
          />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd
            v-for="(item, index) in options"
            :key="'catalog' + index"
            @click="chooseFav(item, index)"
            :class="{ 'layui-this': index === optIndex }"
          >
            {{ item }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'pagination',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'icon'
    },
    showEnd: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      isSelect: false,
      optIndex: 0,
      options: [10, 20, 30, 50, 100],
      pages: [],
      limit: 10
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.limit)
    }
  },
  watch: {
    // 监听total变化，total是异步返回的，初始值是0，当异步数据请求成功后，重新计算分页数据
    total (newval, oldval) {
      this.initPages()
    }
  },
  mounted () {
    // 初始化分页的长度
    this.limit = this.size
    this.initPages()
    // 设置select的内容

    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
    // 矫正current
    // this.reviseCurrent()
  },
  methods: {
    initPages () {
      const len = Math.ceil(this.total / this.limit)
      this.pages = _.range(1, len + 1)
    },
    reviseCurrent () {
      if (this.current < 0) this.current = 0
      if (this.current > this.pages.length - 1) this.current = this.pages.length - 1
    },
    changeFav () {
      this.isSelect = !this.isSelect
    },
    chooseFav (item, index) {
      if (this.optIndex !== index) {
        // 调整完每页显示数量后，重新计算当前页码
        // this.$emit('changeCurrent', Math.floor(this.limit * this.current / this.options[index]))
        // 传递出当前limit数量
        this.$emit('changeLimit', { limit: this.options[index], current: Math.floor(this.limit * this.current / this.options[index]) })
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      this.initPages()
    },
    home () {
      this.$emit('changeCurrent', 0)
    },
    end () {
      if (this.pages.length === 0) {
        return
      }
      this.$emit('changeCurrent', this.pages.length - 1)
    },
    prev () {
      const cur = this.current - 1
      if (cur < 0) {
        return
      }
      this.$emit('changeCurrent', cur)
    },
    next () {
      const cur = this.current + 1
      if (cur > this.pages.length - 1) {
        return
      }
      this.$emit('changeCurrent', cur)
    },
    changeIndex (val) {
      if (this.current !== val) {
        this.$emit('changeCurrent', val)
      }
    },
    jumpTo (event) {
      const value = event.target.value
      if (value > this.pages.length || value <= 0) {
        this.$msg({
          msg: '页码有误'
        })
        return
      }
      if (value - 1 !== this.current) {
        this.$emit('changeCurrent', value - 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    margin-left: -1px !important;
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
  .layui-bg-green {
    border-color: #009688;
  }
}
.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -2px;
  .simu-input {
    padding: 0 5px;
    width: 30px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #eee;
  }
}
.layui-input {
  height: 30px;
  line-height: 30px;
}
.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
