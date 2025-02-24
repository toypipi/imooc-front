import { isMobileTerminal } from '@/utils/flexible.js'

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
    return getters.categories.findIndex((item) => item.id === getters.currentCategory.id)
  },
  // 搜索历史
  histories: (state) => state.search.histories,
  // 搜索文本
  searchText: (state) => state.app.searchText,
  // token
  token: (state) => state.user.token,
  // 用户信息
  userInfo: (state) => state.user.userInfo,
  // 路由跳转的动画类型
  routerType: (state) => {
    // PC 端没有跳转动画
    if (!isMobileTerminal.value) return 'none'
    return state.app.routerType
  }
}
