import request from '@/utils/request'

/**
 * 人类行为验证
 */

export const getCaptcha = (data) => {
  return request({
    url: '/sys/captcha',
    method: 'Post',
    data
  })
}

/**
 * 登录
 */

export const loginUser = (data) => {
  return request({
    url: '/sys/login',
    method: 'Post',
    data
  })
}
