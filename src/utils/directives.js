import { escapeHtml } from '@/utils/escapeHtml'

export default {
  // 格式化富文本
  richtext: {
    // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    bind: function (el, binding, vnode) {
      // console.log('el', el)
      // console.log('binding', binding)
      // console.log('vnode', vnode)
      el.innerHTML = escapeHtml(binding.value)
    },
    // componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    componentUpdated: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}
