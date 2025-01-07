import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'

/**
 * 处理 navigationBar 中的数据 categories
 */

export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      categories: [ALL_CATEGORY_ITEM]
    }
  },
  mutations: {
    /**
     * 为 catetories 赋值
     */
    setCategories(state, newCategories) {
      state.categories = [ALL_CATEGORY_ITEM, ...newCategories]
    }
  },
  actions: {
    /**
     * 获取 categories 数据，并自动保存到 vuex 中
     */

    async useCategoryData(context) {
      const { categories } = await getCategory()
      context.commit('setCategories', categories)
    }
  }
}
