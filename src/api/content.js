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
const getTopWeek = () => {
  return axios.get('/public/topWeek')
}

/**
 * 获取友情链接
 */
const getLinks = () => {
  return axios.get('/public/links')
}

// 图片上传接口
const uploadImg = (formData) => axios.post('/content/upload', formData)

// 发表帖子
const addPost = (data) => axios.post('/content/add', { ...data })

// 获取文章详情
const postDetail = (tid) => axios.get('/public/content/detail?tid=' + tid)

export {
  getList,
  getTips,
  getTopWeek,
  getLinks,
  uploadImg,
  addPost,
  postDetail
}
