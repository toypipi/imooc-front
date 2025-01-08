import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
import { getCategory } from '@/api/category'

/**
 * 处理 navigationBar 中的数据 categories
 */

export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      // 1. 让 categories 具备一个初始化数据
      // 2. 从服务端获取数据，替换初始化数据
      // 3. 为了防止初始化数据太老，我们每次把获取到的新数据，都作为下一次的初始化数据
      categories: CATEGORY_NOMAR_DATA
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
