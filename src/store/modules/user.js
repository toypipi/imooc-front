// user 模块
import md5 from 'md5'
import { loginUser } from '@/api/sys'

export default {
  namespaced: true,
  state: () => {
    return {
      // 登录的 token
      token: ''
    }
  },
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
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
    }
  }
}
