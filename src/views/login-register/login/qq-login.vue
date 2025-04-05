<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <m-svg-icon class="w-4 cursor-pointer" name="qq" @click="onQQLogin"></m-svg-icon>
  </div>
</template>

<script>
// QQ 登录的 URL,其中 client_id 为 QQ 互联应用的 AppID,redirect_uri 为 QQ 互联应用的回调地址，需要替换为你自己申请的
const QQ_LOGIN_URL =
  'https://graph.qq.com/oauth2.0/authorize?client_id=&response_type=token&scope=all&redirect_uri='
</script>
<script setup>
import { onMounted } from 'vue'
import brodacast from './brodacast'
import { oauthLogin } from './oauth'
import { LOGIN_TYPE_QQ } from '@/constants'

// QQ 登录挂起
// QQ 登录调试必须要将代码上传到线上，本地无法测试
onMounted(() => {
  QC.Login(
    {
      btnId: 'qqLoginBtn'
    },
    // 登录成功之后的回调，会在 登录回调页面中被执行
    // QQ 登录会存在缓存，登录成功一次之后，下次进入页面会自动重新登录
    ({ nickname, figureurl_qq_2 }, opts) => {
      // 注销登录，防止下次打开页面直接展示上一次的用户信息
      QC.Login.signOut()
      // 拿到 QQ 用户的唯一标识，通过这个标识来判断当前用户是否已经在我们的应用中完成注册了
      const accessToken = /accessToken=((.*))&expires_in/.exec(window.location.hash)[1]
      // 拼接获取到的数据对象
      const oauthObj = {
        nickname,
        figureurl_qq_2,
        accessToken
      }
      brodacast.send(oauthObj)

      // 针对于 移动端而言：同通过移动端触发 QQ 登录会显示三个页面，原页面、QQ、调起页面、回调页面。并且移动端一个页面展示整屏内容，且无法通过 window.close() 关闭，所以在移动端中，我们需要在当前页面继续进行后续操作。
      oauthLogin(LOGIN_TYPE_QQ, oauthObj)
      window.close()
    }
  )
})
/**
 * 登录按钮点击事件
 */
const onQQLogin = () => {
  openQQWindow()
}
/**
 * 处理 QQ 登录视窗
 */
const openQQWindow = () => {
  window.open(
    QQ_LOGIN_URL,
    'oauth2Login_10609',
    'width=585,height=525,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=yes,status=no'
  )
  // 等待
  brodacast.wait().then((oauthObj) => {
    brodacast.clear()
    // 执行登录操作
    oauthLogin(LOGIN_TYPE_QQ, oauthObj)
  })
}
</script>

<style lang="scss" scoped></style>
