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
          accept="image/gif, image/jpeg, image/jpg, image/png"
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
import { baseUrl } from '@/config'
import { updateUserInfo } from '@/api/user'
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
        if (res.code === 200) {
          const BaseUrl = process.env.NODE_ENV === 'development' ? baseUrl.dev : baseUrl.pro
          this.pic = BaseUrl + res.data
          updateUserInfo({ pic: res.data }).then((res) => {
            if (res.code === 200) {
              const user = this.$store.state.userInfo
              user.pic = this.pic
              this.$store.commit('setUserInfo', user)
              this.$msg({
                // type: 'shake',
                msg: res.msg,
                duration: 2000
              })
            }
          })
        }
        document.getElementById('pic').value = ''
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
