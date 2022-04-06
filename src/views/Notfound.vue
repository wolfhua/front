<template>
  <div class="layui-container flex">
    <img src="../assets/img/icon-404.png" alt="" />
    <p>法海不懂爱，页面加载不出来</p>
    <router-link class="layui-btn" to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'not-found'
}
</script>

<style lang="scss" scoped>
.flex {
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
  }
  p {
    padding: 15px 0 20px;
    color: #c0c4cc;
  }
}
</style>
