<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="pic" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
        </label>
        <input
          id="pic"
          type="file"
          name="file"
          accept="image/jpg, image/png, image/gif"
          @change="upload"
        />
        <img :src="pic" />
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/content'
// import { updateUserInfo } from '@/api/user'
export default {
  name: 'pic-upload',
  data () {
    return {
      pic: this.$store.state.userInfo && this.$store.state.userInfo.pic ? this.$store.state.userInfo.pic : '/avatar.jpg',
      formData: ''
    }
  },
  methods: {
    upload (e) {
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片 ->uploadImg
      uploadImg(this.formData).then((res) => {
        // 更新用户基本资料 -> updateUserInfo
        console.log(res)
        // updateUserInfo({ pic: this.pic }).then((res) => {
        //   if (res.code === 200) {
        //     const user = this.$store.state.userInfo
        //     user.pic = this.pic
        //     this.$store.commit('setUserInfo', user)
        //     this.$msg('图片上传成功')
        //   }
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#pic {
  display: none;
}
</style>
