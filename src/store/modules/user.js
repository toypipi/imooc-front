// user 模块
import md5 from 'md5'
import { loginUser, registerUser, getProfile } from '@/api/sys'
import { message } from '@/libs'

export default {
  namespaced: true,
  state: () => {
    return {
      // 登录的 token
      token: '',
      // 用户信息
      userInfo: {}
    }
  },
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      state.token = newToken
    },
    /**
     * 保存用户信息
     */
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    /**
     * 注册
     */
    async register(context, payload) {
      // 加密密码
      const { password } = payload
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    },
    /**
     * 登录
     */
    async login(context, payload) {
      // 加密密码
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      // 保存 token
      context.commit('setToken', data.token)
      // 获取用户信息
      context.dispatch('profile')
    },
    /**
     * 获取用户信息
     */
    async profile(context) {
      const data = await getProfile()
      // 保存用户信息
      context.commit('setUserInfo', data)
      // 提示
      message(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? '尊贵的 VIP-' + data.vipLevel + '用户' + data.nickname
            : data.nickname
        }`,
        6000
      )
    },
    /**
     * 退出登录
     */
    logout(context) {
      // 清空 token
      context.commit('setToken', '')
      // 清空用户信息
      context.commit('setUserInfo', {})
      // 刷新页面
      location.reload()
    }
  }
}
