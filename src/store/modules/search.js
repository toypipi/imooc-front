/**
 * 搜索
 */

export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      histories: []
    }
  },
  mutations: {
    /**
     * 新增
     * 1. 新增的历史记录位于头部
     * 2. 不可出现重复的记录
     */
    addHistory(state, newHistory) {
      const isFindIndex = state.histories.findIndex(
        (item) => item === newHistory
      )
      // 剔除旧数据
      if (isFindIndex !== -1) {
        state.histories.splice(isFindIndex, 1)
      }
      // 新增的历史记录位于头部
      state.histories.unshift(newHistory)
    },

    /**
     * 单个删除
     */

    deleteHistory(state, index) {
      state.histories.splice(index, 1)
    },
    /**
     * 全部删除
     */
    deleteAllHistory(state) {
      state.histories = []
    }
  },
  actions: {}
}
