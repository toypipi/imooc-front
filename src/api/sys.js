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

/**
 * 注册
 */

export const registerUser = (data) => {
  return request({
    url: '/sys/register',
    method: 'Post',
    data
  })
}

/**
 * 获取用户信息
 */

export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}

/**
 * 修改用户信息
 */

export const putProfile = (data) => {
  return request({
    url: '/user/profile',
    method: 'Put',
    data
  })
}
