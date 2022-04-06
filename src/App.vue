<template>
  <div id="app">
    <simu-header></simu-header>
    <router-view></router-view>
    <simu-footer></simu-footer>
    <!-- <div class="layui-container">
      <form class="layui-form layui-form-pane" action="">
        <ValidationProvider class="layui-form-item" name="name" tag="div" rules="required|email" v-slot="{ errors }">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-inline">
            <input type="text" name="name" v-model="name" placeholder="请输入账号" autocomplete="off" class="layui-input">
          </div>
          <div class="error layui-form-mid">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider class="layui-form-item" name="password" tag="div" rules="required|password:6,12" v-slot="{ errors }">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-inline">
            <input type="password" name="password" v-model="password" placeholder="请输入密码" autocomplete="off" class="layui-input">
          </div>
          <div class="error layui-form-mid">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider class="layui-form-item" name="code" tag="div" rules="required|length:4" v-slot="{ errors }">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input type="text" name="code" v-model="code" required lay-verify="required" placeholder="请输入验证码" autocomplete="off" class="layui-input">
          </div>
          <div class="error layui-form-mid">{{ errors[0] }}</div>
          <div class="layui-form-mid svg"
          @click="getCaptcha()"
          v-html="captcha"></div>
        </ValidationProvider>
        <button type="button" class="layui-btn">点击登录</button>
        <a class="simu-link" href="http://www.layui.com">忘记密码？</a>
      </form>
    </div> -->
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    'simu-header': Header,
    'simu-footer': Footer
  }
}
</script>

<style lang="scss">
@import "assets/css/global.css";

.svg {
  position: relative;
  top: -4px;
}
.gray {
  color: #999;
}
@for $i from 0 to 5 {
  .pd#{$i} {
    padding: $i * 10 + px !important;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px !important;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px !important;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px !important;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px !important;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px !important;
  }
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.pl0 {
  padding-left: 0;
}
.pd20 {
  padding: 20px;
}
.orange {
  color: #ff7832;
}
.pull-right {
  float: right;
}
</style>
