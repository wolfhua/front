<template>
  <div>
    <simu-pannel></simu-pannel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8 content detail">
          <div class="fly-panel detail-box">
            <h1>{{ page.title }}</h1>
            <div class="fly-detail-info">
              <!-- <span class="layui-badge">审核中</span> -->
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-if="page.catalog === 'logs'"
              >
                动态
              </span>
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'share'"
              >
                分享
              </span>
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'ask'"
              >
                提问
              </span>
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'advise'"
              >
                建议
              </span>
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'discuss'"
              >
                交流
              </span>
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'notice'"
              >
                公告
              </span>

              <span
                class="layui-badge"
                style="background-color: #999"
                v-if="parseInt(page.isEnd) === 0"
              >
                未结
              </span>
              <span
                v-else
                class="layui-badge"
                style="background-color: #5fb878"
              >
                已结
              </span>

              <span
                class="layui-badge layui-bg-black"
                v-show="page.isTop === '1'"
                >置顶</span
              >
              <span
                class="layui-badge"
                :class="tag.class"
                v-for="(tag, index) in page.tags"
                :key="index"
              >
                {{ tag.name }}
              </span>

              <!-- <div class="fly-admin-box" data-id="123">
                <span class="layui-btn layui-btn-xs jie-admin" type="del"
                  >删除</span
                >

                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="stick"
                  rank="1"
                  >置顶</span
                >
                 <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span>

                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="status"
                  rank="1"
                  >加精</span
                >
                <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
              </div> -->
              <span class="fly-list-nums">
                <a href="#comment">
                  <i class="iconfont" title="回答">&#xe60c;</i>
                  {{ page.answer }}
                </a>
                <i class="iconfont" title="人气">&#xe60b;</i> {{ page.reads }}
              </span>
            </div>
            <div class="detail-about">
              <a class="fly-avatar">
                <img :src="page.users ? page.users.pic : '/img/avatar/1.jpg'" />
              </a>
              <div class="fly-detail-user">
                <router-link
                  :to="{ name: 'home', params: { uid: page.users._id } }"
                  class="fly-link"
                >
                  <cite>{{ page.users ? page.users.nickname : "simu" }}</cite>
                  <i class="iconfont icon-renzheng"></i>
                  <i
                    class="layui-badge fly-badge-vip mr1"
                    v-if="
                      page.users && page.users.isVip !== '0'
                        ? page.users.isVip
                        : false
                    "
                  >
                    VIP{{ page.users.isVip }}
                  </i>
                </router-link>
                <span>{{ page.created | formatDate }}</span>
              </div>
              <div class="detail-hits">
                <span style="padding-right: 10px; color: #ff7200">
                  悬赏：{{ page.fav }}
                </span>
              </div>
            </div>
            <div class="layui-btn-container fly-detail-admin pt1">
              <router-link
                class="layui-btn layui-btn-sm jie-admin"
                :to="{ name: 'edit', params: { tid: tid, postDetail: page } }"
                v-show="page.isEnd === '0'"
                >编辑</router-link
              >
              <!-- <a href class="layui-btn layui-btn-sm jie-admin">编辑</a> -->
              <a
                href
                class="layui-btn layui-btn-sm jie-admin jie-admin-collect"
                :class="{ 'layui-btn-primary': page.isFav }"
                @click.prevent="setCollect()"
                >{{ page.isFav ? "取消收藏" : "收藏" }}</a
              >
            </div>
            <div class="detail-body photos" v-html="content"></div>
          </div>

          <div class="fly-panel detail-box" id="flyReply">
            <fieldset
              class="layui-elem-field layui-field-title"
              style="text-align: center"
            >
              <legend>回帖</legend>
            </fieldset>

            <ul class="jieda" id="jieda">
              <li
                class="jieda-daan"
                v-for="(item, index) in comments"
                :key="index"
              >
                <a></a>
                <div class="detail-about detail-about-reply">
                  <a class="fly-avatar" href="">
                    <img
                      v-if="item.cuid"
                      :src="item.cuid.pic | completeUrl"
                      alt=""
                    />
                    <img v-else src="/img/avatar/1.jpg" alt="" />
                  </a>
                  <div class="fly-detail-user">
                    <router-link
                      :to="{ name: 'home', params: { uid: item.cuid._id } }"
                      class="fly-link"
                    >
                      <cite>{{ item.cuid ? item.cuid.nickname : "simu" }}</cite>
                      <!-- <i
                        class="iconfont icon-renzheng"
                      ></i> -->
                      <i
                        class="layui-badge fly-badge-vip"
                        v-if="
                          item.cuid && item.cuid.isVip !== '0'
                            ? item.cuid.isVip
                            : false
                        "
                        >VIP{{ item.cuid.isVip }}</i
                      >
                    </router-link>

                    <span v-if="index === 0">(楼主)</span>
                    <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                -->
                  </div>

                  <div class="detail-hits">
                    <span>{{ item.created | formatDate }}</span>
                  </div>

                  <i
                    class="iconfont icon-caina"
                    title="最佳答案"
                    v-if="item.isBest === '1'"
                  ></i>
                </div>
                <div
                  class="detail-body jieda-body photos"
                  v-richtext="item.content"
                ></div>
                <div class="jieda-reply">
                  <span
                    class="jieda-zan"
                    :class="{ zanok: item.handed === '1' }"
                    type="zan"
                    @click="hands(item)"
                  >
                    <i class="iconfont icon-zan"></i>
                    <em>{{ item.hands }}</em>
                  </span>
                  <span type="reply" @click="reply(item)">
                    <i class="iconfont icon-svgmoban53"></i>
                    回复
                  </span>
                  <div class="jieda-admin">
                    <span
                      type="edit"
                      v-show="
                        page.isEnd === '0' && user && item.cuid._id === user._id
                      "
                      @click="editComment(item)"
                      >编辑</span
                    >
                    <!-- <span type="del">删除</span> -->
                    <span
                      class="jieda-accept"
                      type="accept"
                      v-show="
                        page.isEnd === '0' &&
                        user &&
                        page.users &&
                        page.users._id === user._id &&
                        page.users._id !== item.cuid._id
                      "
                      @click="setBest(item)"
                      >采纳</span
                    >
                  </div>
                </div>
              </li>

              <!-- 无数据时 -->
              <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
            </ul>

            <simu-page
              align="center"
              showType="icon"
              :showEnd="true"
              :hasTotal="true"
              :hasSelect="true"
              :total="total"
              :size="size"
              :current="current"
              @changeCurrent="handleCurrent"
              @changeLimit="handleLimit"
            ></simu-page>

            <div class="layui-form layui-form-pane">
              <form>
                <validation-observer ref="observer" v-slot="{ validate }">
                  <editor
                    @editorContent="commentsContent"
                    :initContent="editInfo.content"
                  ></editor>
                  <div class="layui-form-item">
                    <validation-provider
                      name="code"
                      ref="codefield"
                      rules="required|length:4"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label"
                          >验证码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class>
                          <span
                            class="svg"
                            style="color: #c00"
                            @click="getCode()"
                            v-html="svg"
                          ></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <input type="hidden" name="jid" value="123" />
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submit)"
                    >
                      提交回复
                    </button>
                  </div>
                </validation-observer>
              </form>
            </div>
          </div>
        </div>
        <div class="layui-col-md4">
          <simu-hotlist></simu-hotlist>

          <simu-ads></simu-ads>

          <simu-links></simu-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pannel from '@/components/Pannel'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import CodeMix from '@/mixin/code'
import Editor from '@/components/modules/editor/Index'
import pagination from '@/components/modules/pagination/Index'
import { postDetail } from '@/api/content'
import { commentList, addComment, updateComment, setCommentBest, setHands } from '@/api/comments'
import { addCollect } from '@/api/user'
import { escapeHtml } from '@/utils/escapeHtml'
import { scrollToElem } from '@/utils/common'
import { baseUrl } from '@/config'
export default {
  name: 'detail',
  props: ['tid'],
  mixins: [CodeMix],
  components: {
    'simu-pannel': Pannel,
    'simu-hotlist': HotList,
    'simu-ads': Ads,
    'simu-links': Links,
    Editor,
    'simu-page': pagination
  },
  data () {
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: ''
      }
    }
  },
  mounted () {
    this.getPostDetail()
    this.getCommentsList()
  },
  watch: {
    tid (newval, oldval) {
      this.getPostDetail()
      this.getCommentsList()
    }
  },
  methods: {
    handleCurrent (val) {
      this.current = val
      this.getCommentsList()
    },
    handleLimit (val) {
      this.size = val.limit
      this.current = val.current
      this.getCommentsList()
    },
    getPostDetail () {
      postDetail(this.tid).then(res => {
        if (res.code === 200) {
          const BaseUrl = process.env.NODE_ENV === 'development' ? baseUrl.dev : baseUrl.pro
          res.data.users.pic = res.data.users.pic !== '' ? BaseUrl + res.data.users.pic : ''
          this.page = res.data
        }
      })
    },
    getCommentsList () {
      commentList({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    // 评论内容
    commentsContent (val) {
      this.editInfo.content = val
    },
    // 提交评论
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      // 判断是否登录
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$msg({
          msg: '请先登录再回贴'
        })
        return
      }
      // 判断用户是否被禁言
      const user = this.user
      if (user.status !== '0') {
        this.$msg({
          msg: '老铁，你不能发言了，请联系管理员交罚款'
        })
        return
      }
      // 添加评论
      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid
      const cuid = {
        _id: user._id,
        nickname: user.nickname,
        pic: user.pic,
        isVip: user.isVip
      }
      if (typeof this.editInfo.cid !== 'undefined' && this.editInfo.cid !== '') {
        // 编辑评论
        const obj = { ...this.editInfo }
        delete obj.item
        // 判断用户是否修改了内容
        if (this.editInfo.content === this.editInfo.item.content) {
          this.$msg({
            msg: '玩呢？啥也没改啊'
          })
          return
        }
        // 更新评论
        updateComment(obj).then((res) => {
          if (res.code === 200) {
            const temp = this.editInfo.item
            temp.content = this.editInfo.content
            this.$msg({
              msg: '老铁，你的评论改好了'
            })
            this.code = ''
            this.editInfo.content = ''
            // 清空表单验证数据
            requestAnimationFrame(() => {
              this.$refs.observer && this.$refs.observer.reset()
            })
            // 方法一，只用更新特定的一条的content created， $set
            // 方法二，更新整个数组中的这一条
            // 替换列表中的数据（无刷新显示修改后的内容）【删除原有的这一条，并在该位置插入新的一条】
            this.comments.splice(this.comments.indexOf(this.editInfo.item), 1, temp)
            // 刷新验证码
            this.getCode()
          } else {
            this.$msg({
              msg: res.msg
            })
          }
        })
        return
      }
      addComment(this.editInfo).then(res => {
        if (res.code === 200) {
          this.$msg({
            msg: '老铁，你的评论ok啦'
          })
          // 清空输入框
          this.editInfo.content = ''
          this.code = ''
          // 清空表单验证数据
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          // 追加到评论列表
          const commentData = res.data
          commentData.cuid = cuid
          this.comments.push(commentData)
          // 刷新验证码
          this.getCode()
        } else {
          this.$msg({
            msg: res.msg
          })
        }
      })
    },
    // 编辑评论
    editComment (item) {
      this.editInfo.content = item.content
      // 动态滚动到输入框的位置，并且进行focus
      scrollToElem('.layui-input-block', 1000, -65)
      document.getElementById('edit').focus()
      // 确定需要去编辑的记录
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    // 采纳为最佳答案
    setBest (item) {
      this.$popup({
        type: 'confirm',
        msg: '确定采纳为最佳答案吗?',
        successBtnText: '当然',
        cancelBtnText: '不可能'
      },

      () => {
        // 发送采纳最佳答案请求
        setCommentBest({
          cid: item._id,
          tid: this.tid
        }).then((res) => {
          if (res.code === 200) {
            this.$msg({
              msg: '没毛病~~'
            })
            item.isBest = '1'
            this.page.isEnd = '1'
          }
        })
      },
      () => {}
      )
    },
    // 点赞
    hands (item) {
      // 判断是否登录
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$msg({
          type: '',
          msg: '先登录，再点赞，不要乱来'
        })
        return
      }
      setHands({ cid: item._id }).then((res) => {
        if (res.code === 200) {
          this.$msg({
            type: '',
            msg: '点赞成功~~'
          })
          item.handed = '1'
          item.hands += 1
        } else {
          this.$msg({
            msg: res.msg
          })
        }
      })
    },
    // 回复评论
    reply (item) {
      // 评论非盖楼设计
      // 插入@ + name 到 content
      // 滚动页面到输入框
      // focus 输入框
      console.log(this.editInfo.content)
      const reg = /^@[\S]+/g
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          this.editInfo.content = this.editInfo.content.replace(reg, `@${item.cuid.nickname} `)
        } else {
          if (this.editInfo.content !== '') {
            // 非空的情况
            this.editInfo.content = `@${item.cuid.nickname} ${this.editInfo.content}`
          }
        }
      } else {
        // 评论框为空
        this.editInfo.content = `@${item.cuid.nickname} `
      }

      // 动态滚动到输入框的位置，并且进行focus
      scrollToElem('.layui-input-block', 1000, -65)
      document.getElementById('edit').focus()
    },
    // 设置收藏
    setCollect () {
      // 设置收藏 & 取消收藏
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0
        }
        addCollect(collect).then((res) => {
          if (res.code === 200) {
            this.page.isFav = !this.page.isFav
            this.$msg({
              type: '',
              msg: this.page.isFav ? '收藏成功' : '取消收藏成功'
            })
          }
        })
      } else {
        this.$msg({
          type: 'shake',
          msg: '你能不能先登录，能不能？'
        })
      }
    }
  },
  computed: {
    content () {
      if (!this.page.content || this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content.trim())
    },
    user () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  background-color: #f8f8f8;
  border-top: 1px dotted #eaeaea;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
.jieda-body {
  margin: 25px 0 20px !important;
}
</style>
