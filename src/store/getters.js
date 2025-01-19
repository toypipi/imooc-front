export default {
  // 简单访问
  categories: (state) => state.category.categories,
  // 当前主题
  themeType: (state) => state.theme.themeType,
  // category 选中项
  currentCategory: (state) => state.app.currentCategory,
  // category 选中的下标
  currentCategoryIndex: (state, getters) => {
    // 使用课程内的后台接口，用下面代码
    return getters.categories.findIndex(
      (item) => item.id === getters.currentCategory.id
    )
  },
  // 搜索历史
  histories: (state) => state.search.histories
}
