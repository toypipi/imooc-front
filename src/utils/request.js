import axios from 'axios'

const service = axios.create({
  // 根据项目的状态，自动切换请求的服务地址
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000 // request timeout
})

export default service
