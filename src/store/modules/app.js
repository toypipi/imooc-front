import { ALL_CATEGORY_ITEM } from '@/constants'
/**
 * app 模块中的数据不会缓存
 */

export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      currentCategory: ALL_CATEGORY_ITEM
    }
  },
  mutations: {
    /**
     * 切换选中分类
     */

    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    }
  },
  actions: {}
}
