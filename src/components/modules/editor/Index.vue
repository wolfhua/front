<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
          <span @click="choose(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="choose(1)">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="choose(2)">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote" @click="choose(3)">”</span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="addHr()">hr</span>
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          id="edit"
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          v-model="content"
          @focus="focusEvent"
          @blur="blurEvent"
        ></textarea>
      </div>
    </div>
    <div ref="modals">
      <face
        :isShow="current === 0"
        @closeEvent="closeModal()"
        @addEvent="addFace"
      ></face>
      <img-upload
        :isShow="current === 1"
        @closeEvent="closeModal()"
        @addEvent="addPic"
      ></img-upload>
      <link-add
        :isShow="current === 2"
        @closeEvent="closeModal()"
        @addEvent="addLink"
      ></link-add>
      <quote
        :isShow="current === 3"
        @closeEvent="closeModal()"
        @addEvent="addQuote"
      ></quote>
      <code-input
        :isShow="current === 4"
        :width="codeWidth"
        :height="codeHeight"
        @closeEvent="closeModal()"
        @addEvent="addCode"
      ></code-input>
      <preview
        :isShow="current === 6"
        :content="content"
        @closeEvent="closeModal()"
      ></preview>
    </div>
  </div>
</template>

<script>
import Face from './Face'
import ImgUpload from './ImgUpload'
import LinkAdd from './LinkAdd'
import Quote from './Quote'
import CodeInput from './Code'
import Preview from './Preview'

export default {
  name: 'editor',
  props: ['initContent'],
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    CodeInput,
    Quote,
    Preview
  },
  data () {
    return {
      current: '',
      codeWidth: 400,
      codeHeight: 200,
      content: '',
      // pos 光标位置
      pos: ''
    }
  },
  watch: {
    initContent (newval, oldval) {
      this.content = newval
    }
  },
  updated () {
    // 将编辑器的内容传递给父组件
    this.$emit('editorContent', this.content)
  },
  methods: {
    handleBodyClick (e) {
      e.stopPropagation()
      // 触发隐藏本组件的关闭事件
      // 判断是否点击到了飞控制icon + 本组件 以外的地方
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modals.contains(e.target))) {
        this.closeModal()
      }
    },
    closeModal () {
      this.current = ''
    },
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    },
    // 计算光标当前位置
    getPos () {
      let cursorPos = 0
      const elem = document.getElementById('edit')
      if (document.selection) {
        // IE
        const selectRange = document.selection.createRange()
        selectRange.moveStart('character', -elem.value.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
    },
    // 添加表情
    addFace (item) {
      // console.log(item)
      const insertContent = ` face${item}`
      this.insert(insertContent)
      // 插入内容后计算光标位置
      this.pos += insertContent.length
    },
    // 添加图片链接
    addPic (item) {
      const insertContent = ` img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加链接
    addLink (item) {
      const insertContent = ` a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加代码
    addCode (item) {
      const insertContent = ` \n[pre]\n${item}\n[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加引用
    addQuote (item) {
      const insertContent = ` \n[quote]\n${item}\n[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addHr () {
      this.insert('\n[hr]')
      this.pos += 5
    },
    // 添加hr
    choose (index) {
      if (this.current === index) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    // 内容插入
    insert (val) {
      if (typeof val === 'undefined') {
        return
      }
      // 将内容分割
      const tmp = this.content.split('')
      // 在光标位置后插入
      tmp.splice(this.pos, 0, val)
      // 重新拼接成字符串
      this.content = tmp.join('')
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
    // 动态计算代码编辑框的宽高，视窗大小改变时跟随变化
    this.codeWidth = this.$refs.textEdit.offsetWidth - 62
    this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 62
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss">
.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgb(0 0 0 / 20%);
}
</style>
