<template>
  <div>
    <div class="panel">
      <div class="layui-container">
        <ul>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <a href="">首页</a>
          </li>
          <li><a href="">提问</a></li>
          <li><a href="">分享</a></li>
          <li><a href="">讨论</a></li>
          <li><a href="">建议</a></li>
          <li><a href="">公告</a></li>
          <li><a href="">动态</a></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <span class="line"></span>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <a href="">我发布的贴</a>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <a href="">我收藏的贴</a>
          </li>
        </ul>
        <div class="right layui-hide-xs">
          <span class="layui-icon layui-icon-search"></span>
          <a href="" class="layui-btn">发布新帖</a>
        </div>
        <div class="new-post layui-hide-sm">
          <a href="" class="layui-btn">发布新帖</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .panel {
    height: auto !important ;
  }
  ul {
    li {
      width: 33.333%;
      text-align: center;
    }
  }
}
.panel {
  position: relative;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  ul {
    li {
      display: inline-block;
      a {
        padding: 0 20px;
      }
    }
    .line {
      display: inline-block;
      height: 15px;
      width: 1px;
      background-color: #e2e2e2;
      vertical-align: middle;
      margin: 0 20px;
    }
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    .layui-icon-search {
      margin-right: 10px;
      vertical-align: middle;
      font-size: 20px;
      &:hover {
        color: #5fb878;
        cursor: pointer;
      }
    }
  }
  .new-post {
    text-align: center;
    margin-top: 10px;
    padding-bottom: 15px;
  }
}
</style>
