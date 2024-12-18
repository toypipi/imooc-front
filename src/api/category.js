import request from '@/utils/request'

// 获取分类列表
export function getCategory() {
  return request({
    url: '/category'
  })
}
