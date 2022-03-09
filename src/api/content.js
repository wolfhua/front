import axios from '@/utils/request'
import qs from 'qs'

/**
 * 获取文章列表
 * @param {Object} options 参数
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

/**
 * 获取温馨通道
 */
const getTips = () => {
  return axios.get('/public/tips')
}

/**
 * 获取本周热议
 */
const getTop = () => {
  return axios.get('/public/topWeek')
}

/**
 * 获取友情链接
 */
const getLinks = () => {
  return axios.get('/public/links')
}

export {
  getList,
  getTips,
  getTop,
  getLinks
}