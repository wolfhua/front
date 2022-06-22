import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'

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
const postDetail = (tid) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/content/detail?tid=' + tid, headers)
}

// 编辑帖子
const updatePost = (data) => axios.post('/content/update', { ...data })

export {
  getList,
  getTips,
  getTopWeek,
  getLinks,
  uploadImg,
  addPost,
  postDetail,
  updatePost
}
