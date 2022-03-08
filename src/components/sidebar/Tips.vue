<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main fly-list-static">
      <ul class="layui-clear simu-quick">
        <li class="layui-col-xs6">
          <a href="" target="_blank">simu-simu</a>
        </li>
        <li class="layui-col-xs6">
          <a href="" target="_blank">simu-simu</a>
        </li>
        <li class="layui-col-xs6">
          <a href="" target="_blank">simu-simu</a>
        </li>
        <li class="layui-col-xs6">
          <a href="" target="_blank">simu-simu</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tips'
}
</script>

<style lang="scss" scoped>
$border_color: #f2f2f2;
.fly-panel-main {
  padding: 15px;
}
.simu-quick {
  text-align: center;
  border: 1px solid $border_color;
  border-right: none;
  border-bottom: none;
  li {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border: 1px solid $border_color;
    border-left: none;
    border-top: none;
    a {
      display: block;
    }
  }
}
</style>
