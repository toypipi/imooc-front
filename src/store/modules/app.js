import { ALL_CATEGORY_ITEM } from '@/constants'
/**
 * app 模块中的数据不会缓存
 */

export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      // 当前选中的分类
      currentCategory: ALL_CATEGORY_ITEM,
      // 搜索的文本
      searchText: '',
      // 路由跳转的动画类型
      routerType: 'none'
    }
  },
  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    /**
     * 修改 searchText
     */
    changeSearchText(state, newText) {
      state.searchText = newText
    },
    changeRouterType(state, type) {
      state.routerType = type
    }
  },
  actions: {}
}
