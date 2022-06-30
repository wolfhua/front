import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { baseUrl } from '@/config'

dayjs.extend(relativeTime)

const formatDate = (date) => {
  // 超过7天，显示日期
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    // 1小前，xx小时前，X天前
    return dayjs(date).locale('zh-cn').from(dayjs())
  }
}

const completeUrl = (url) => {
  if (url === '' || typeof url === 'undefined') {
    return ''
  }
  const BaseUrl = process.env.NODE_ENV === 'development' ? baseUrl.dev : baseUrl.pro
  return BaseUrl + url
}
export default {
  formatDate,
  completeUrl
}
