import PopComponent from './Pop.vue'

const Pop = {}

Pop.install = (Vue) => {
  // 将弹出层绑定到全局Vue上
  const PopConstructor = Vue.extend(PopComponent)
  // 实例化一个instance
  const instance = new PopConstructor()
  // 绑定实例
  instance.$mount(document.createElement('div'))
  // 动态添加
  document.body.appendChild(instance.$el)

  // 添加实例方法
  Vue.prototype.$msg = (data) => {
    if (typeof data !== 'undefined' && typeof data !== 'object') {
      console.log('请传入对象参数')
      return
    }
    instance.type = typeof data.type !== 'undefined' ? data.type : 'shake'
    instance.msg = typeof data.msg !== 'undefined' ? data.msg : '我是一个没有感情的提示器'
    if (typeof data.bgColor !== 'undefined') {
      instance.bgColor = data.bgColor
    }
    if (typeof data.duration !== 'undefined') {
      instance.duration = data.duration
    }
    instance.isShow = true
  }
}

export default Pop
