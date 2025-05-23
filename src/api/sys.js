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

/**
 * 获取 OSS 上传凭证
 */

export const getSts = () => {
  return request({
    url: '/user/sts'
  })
}

/**
 * 微信登录前置数据获取
 */

export const getWXLoginData = () => {
  return request({
    url: '/sys/wxlogin/data'
  })
}

/**
 * 微信登录获取 access_token
 */

export const getWXLoginToken = (appid, secret, code) => {
  return request({
    url: '/sys/wxlogin/access_token',
    params: {
      appid,
      secret,
      code
    }
  })
}

/**
 * 微信登录获取用户信息
 */

export const getWXLoginUserInfo = (accessToken, openid) => {
  return request({
    url: '/sys/wxlogin/userinfo',
    params: {
      accessToken,
      openid
    }
  })
}

/**
 * 获取支付结果
 */

export const getPayResult = (out_trade_no) => {
  return request({
    url: '/sys/pay/result',
    params: {
      out_trade_no
    }
  })
}
