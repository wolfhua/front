import PopupComponent from './Popup.vue'

const Popup = {}

Popup.install = (Vue) => {
  // 将弹出层绑定到全局Vue上
  const PopupConstructor = Vue.extend(PopupComponent)
  // 实例化一个instance
  const instance = new PopupConstructor()
  // 绑定实例
  instance.$mount(document.createElement('div'))
  // 动态添加
  // console.log(instance)
  document.body.appendChild(instance.$el)

  // 添加实例方法

  // alert弹窗
  Vue.prototype.$alert = (msg, success) => {
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
    instance.successBtnText = '知道了'
    if (typeof success !== 'undefined') {
      instance.success = success
    } else {
      instance.success = () => {}
    }
  }

  // confirm弹窗
  Vue.prototype.$confirm = (msg, success, cancel) => {
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    instance.sussessBtnText = '确定'
    instance.cancelBtnText = '取消'
    if (typeof success !== 'undefined') {
      instance.success = success
    } else {
      instance.success = () => {}
    }
    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    } else {
      instance.cancel = () => {}
    }
  }

  // 综合弹窗，根据传值确定类型
  Vue.prototype.$popup = (data, success, cancel) => {
    instance.type = typeof data.type !== 'undefined' ? data.type : 'alert'
    instance.msg = data.msg
    instance.isShow = true
    instance.successBtnText = typeof data.successBtnText !== 'undefined' ? data.successBtnText : '确定'
    instance.cancelBtnText = Object.prototype.hasOwnProperty.call(data, 'cancelBtnText') ? data.cancelBtnText : '取消'
    if (typeof success !== 'undefined') {
      instance.success = success
    } else {
      instance.success = () => {}
    }
    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    } else {
      instance.cancel = () => {}
    }
  }
}

export default Popup
