import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duration from 'dayjs/plugin/duration'

// 处理中文国际化
dayjs.locale('zh')
// 插件
dayjs.extend(duration)

export default dayjs
