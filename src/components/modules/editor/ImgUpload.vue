<template>
  <transition name="fade">
    <div
      class="layui-layer layui-layer-page layui-layer-border edit-content"
      v-show="isShow"
      ref="wrap"
    >
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input
                type="text"
                id="fileInput"
                placeholder="粘贴图片地址或者点击上传"
                v-model="pic"
                class="layui-input"
              />
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
            </button>
            <input
              type="file"
              name="file"
              id="uploadImg"
              class="layui-upload-file"
              @change="upload"
            />
          </li>
          <li class="layui-form-item">
            <button type="button" class="layui-btn" @click="submit()">
              确认
            </button>
          </li>
        </ul>
      </div>
      <span class="layui-layer-setwin" @click.stop="close()">
        <a
          href="javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from '@/api/content'
import { baseUrl } from '@/config'
export default {
  name: 'ImgUpload',
  props: ['isShow', 'ctrl'],
  data () {
    return {
      pic: '',
      formData: ''
    }
  },
  methods: {
    handleFaceClick (item) {
      this.$emit('addEvent', item)
    },
    handleBodyClick (e) {
      e.stopPropagation()
      // 触发隐藏本组件的关闭事件
      // 判断是否点击到了飞控制icon + 本组件 以外的地方
      if (typeof this.ctrl === 'undefined') {
        return
      }
      if (!(this.ctrl.contains(e.target) || this.$refs.wrap.contains(e.target))) {
        this.$emit('closeEvent')
        this.pic = ''
        this.formData = ''
      }
    },
    close () {
      // 清空输入内容，选择的文件
      this.$emit('closeEvent')
      this.pic = ''
      this.formData = ''
    },
    upload (e) {
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片
      uploadImg(this.formData).then((res) => {
        if (res.code === 200) {
          const BaseUrl = process.env.NODE_ENV === 'development' ? baseUrl.dev : baseUrl.pro
          this.pic = BaseUrl + res.data
        }
      })
      document.getElementById('uploadImg').value = ''
    },
    submit () {
      if (this.pic === '') {
        document.getElementById('fileInput').focus()
        this.$msg({
          type: 'shake',
          msg: '请上传图片或者复制图片链接'
        })
        return
      }
      this.$emit('addEvent', this.pic)
      setTimeout(() => {
        // 恢复初始的状态
        this.pic = ''
        this.formData = ''
        this.$emit('closeEvent')
      }, 0)
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss" scoped>
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
