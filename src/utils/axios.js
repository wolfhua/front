// 封装axios的请求，返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  // 获取axios配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000,
      // withCredentials: 跨域请求时，是否带上凭证（一般是cookie）true为携带
      withCredentials: false
    }
    return config
  }

  // 设定拦截器
  interceptors (instance) {
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      // console.log('config:' + JSON.stringify(config, null, 2))
      return config
    }, (err) => {
      // Do something with request error
      errorHandle(err)
      return Promise.reject(err)
    })

    // 响应请求的拦截器
    instance.interceptors.response.use((res) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log('res is:' + JSON.stringify(res, null, 2))
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      errorHandle(err)
      return Promise.reject(err)
    })
  }

  // 创建实例
  request (options) {
    const instance = axios.create()
    // 将用户侧传递的参数整合到默认参数
    const newOptions = Object.assign(this.getInsideConfig, options)
    this.interceptors(instance)
    // instance(newOptions) == instance.requeat(newOptions)
    return instance(newOptions)
  }

  // get请求
  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }

  // post请求
  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
