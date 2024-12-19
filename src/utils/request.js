import axios from 'axios'

const service = axios.create({
  // 根据项目的状态，自动切换请求的服务地址
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000 // request timeout
})

/**
 * 响应拦截器：
 * 服务端返回数据之后，前端 .then 方法之前拦截
 */

service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  }
  // TODO:业务请求错误
  return Promise.reject(new Error(message))
})

export default service
