import HttpRequest from './axios'
import { baseUrl } from '../config'

const requestUrl = process.env.NODE_ENV === 'development' ? baseUrl.dev : baseUrl.pro
console.log(process.env.NODE_ENV)
const axios = new HttpRequest(requestUrl)

export default axios
