import request from '@/utils/request'

/**
 * 获取图片数据列表
 */

export const getPexlesList = (data) => {
  return request({
    url: '/pexels/list',
    params: data
  })
}

/**
 * 获取搜索提示
 */

export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: {
      q
    }
  })
}

/**
 * 获取推荐主题
 */

export const getThemes = () => {
  return request({
    url: '/pexels/themes'
  })
}

/**
 * 获取指定图片数据
 */

export const getPexelsFromId = (id) => {
  return request({
    url: `/pexels/${id}`
  })
}

// 以下为获取 pexel 官网图片数据接口
export const BASE_DATA = {
  API_KEY: import.meta.env.VITE_PEXELS_API_KEY,
  BASE_URL: 'https://api.pexels.com/v1'
}
