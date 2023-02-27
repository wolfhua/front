import store from '@/store/index'
import { wsconfig } from '@/config'
class webSocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      url: wsconfig.url,
      port: wsconfig.port,
      protocol: 'ws',
      timeInterval: 10 * 1000
    }
    const finalConfig = { ...defaultConfig, ...config }
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.socket = {}
    this.timer = null
    this.timeInterval = finalConfig.timeInterval
  }

  init () {
    this.socket = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    // onopen、onmessage、onclose、onerror后面接的都是函数，注意this指向问题
    // 错误
    // this.socket.onopen = this.onOpen
    // this.socket.onmessage = this.onMessage
    // this.socket.onclose = this.onClose
    // this.socket.onerror = this.onError

    // 正确
    // const _this = this
    // this.socket.onopen = function () {
    //   _this.onOpen()
    // }
    // this.socket.onmessage = function (msg) {
    //   _this.onMessage(msg)
    // }
    // this.socket.onclose = function () {
    //   _this.onClose()
    // }
    // this.socket.onerror = function () {
    //   _this.onError()
    // }

    this.socket.onopen = () => this.onOpen()
    this.socket.onmessage = (msg) => this.onMessage(msg)
    this.socket.onclose = () => this.onClose()
    this.socket.onerror = () => this.onError()
  }

  send (msg) {
    this.socket.send(msg)
  }

  onOpen () {
    // console.log('open:' + this.socket.readyState)
    console.log(this)
    // 发起鉴权请求
    this.send(JSON.stringify({
      event: 'auth',
      message: 'Bearer ' + store.state.token
    }))
    this.checkServer()
  }

  onMessage (event) {
    if (this.isShow) {
      // 用户未进入聊天室，不接收消息
      return
    }
    const data = JSON.parse(event.data)
    switch (data.event) {
      case 'auth':
        break
      case 'noauth':
        // 鉴权失败，重新登录。。。
        break
      case 'heartbeat':
        this.checkServer()
        this.send(JSON.stringify({
          event: 'heartbeat',
          message: 'pong'
        }))
        break
      default:
        // 正常消息
        // dispatch的是actions里面的方法
        store.dispatch(data.event, data)
        break
    }
  }

  onClose () {
    console.log('已经断开了websocket')
    this.socket.close()
  }

  onError () {
    console.log('websocket连接失败')
    setTimeout(() => {
      this.init()
    }, 1000)
  }

  checkServer () {
    clearTimeout(this.timer)
    // 间隔服务器主动检测时间（1000）+ 连接延时时间（1000）后执行
    // 如果服务器每隔1000ms正常发起了心跳检测，进入到此方法后，上一次未执行的异步检测会被clear掉
    // 如果服务器挂了，1000ms后没收到下一次检测，再隔1000ms后，上一次的异步方法执行，断线重连
    this.timer = setTimeout(() => {
      this.onClose()
      this.onError()
    }, this.timeInterval + 1000)
  }
}

export default webSocketClient
