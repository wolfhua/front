import { escapeHtml } from '@/utils/escapeHtml'
import store from '@/store/index'

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
  },
  // 判断是否有某个菜单权限
  hasRole: {
    // 被绑定元素插入父节点时调用
    inserted: function (el, binding) {
      const roles = store.state.userInfo.roles
      if (!roles.includes(binding.value)) {
        // 如果没在权限组内，删除节点
        el.parentNode.removeChild(el)
      }
    }
  },
  hasPermission: {
    inserted: function (el, binding, vnode) {
      const userRoles = vnode.context.$route.meta.types
      const menuRoles = binding.value
      let flag = true
      for (const v of menuRoles) {
        if (!userRoles.includes(v)) {
          flag = false
        }
      }
      if (!flag) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
