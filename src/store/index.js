import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category
  },
  plugins: [
    createPersistedState({
      // 指定保存到 localStorage 中的 Vue.config.keyCodes = {
      key: 'imooc-front',
      // 需要保存的模块
      paths: ['category']
    })
  ]
})

export default store
