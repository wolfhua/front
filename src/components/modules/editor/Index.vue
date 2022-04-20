<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
          <span
            @click="
              () => {
                this.faceStatus = !this.faceStatus;
              }
            "
            ref="face"
          >
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span
            @click="
              () => {
                this.imgUploadStatus = !this.imgUploadStatus;
              }
            "
            ref="img"
          >
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
        ></textarea>
      </div>
    </div>
    <face
      :isShow="faceStatus"
      :ctrl="this.$refs.face"
      @closeEvent="
        () => {
          this.faceStatus = false;
        }
      "
    ></face>
    <img-upload
      :isShow="imgUploadStatus"
      :ctrl="this.$refs.img"
      @closeEvent="
        () => {
          this.imgUploadStatus = false;
        }
      "
    ></img-upload>
  </div>
</template>

<script>
import Face from './Face'
import ImgUpload from './ImgUpload'
export default {
  name: 'editor',
  components: {
    Face,
    ImgUpload
  },
  data () {
    return {
      faceStatus: false,
      imgUploadStatus: false,
      content: ''
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

.fade-leave-active {
  animation: bounceOut 0.3s;
}
.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

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
}
</style>
