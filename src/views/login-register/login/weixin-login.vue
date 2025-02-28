<template>
  <div @click="onWeiXinLogin">
    <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
    <div id="login_container"></div>
  </div>
</template>

<script setup>
import { getWXLoginData, getWXLoginToken, getWXLoginUserInfo } from '@/api/sys'
import brodacast from './brodacast'
import { oauthLogin } from './oauth'
import { LOGIN_TYPE_WX } from '@/constants'

// 微信登录成功之后，数据解析
if (window.location.search) {
  const code = /code((.*))&state/.exec(window.location.search)[1]
  if (code) {
    brodacast.send({ code })
  }
  // 窗口关闭
  window.close()
}
// 触发微信登录
const onWeiXinLogin = async () => {
  // 1.获取微信登录前置数据
  const { appId, appSecret, redirectUri, scope, state } = await getWXLoginData()
  // 2.open url
  const url = `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
  window.open(
    url,
    '',
    'width=585,height=525,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=yes,status=no'
  )
  // 3.等待扫码成功
  brodacast.wait().then(async ({ code }) => {
    console.log('等待扫码成功')
    // 关闭通知
    brodacast.clear()
    // 获取 accessToken
    const { access_token, openid } = await getWXLoginToken(code, appId, appSecret)
    // 获取用户信息
    const { nickname, headimgurl } = await getWXLoginUserInfo(access_token, openid)
    // 登录
    oauthLogin(LOGIN_TYPE_WX, { nickname, headimgurl, openid })
  })
}
</script>

<style lang="scss" scoped></style>
