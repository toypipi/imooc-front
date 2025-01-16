import lazy from './modules/lazy'

/**
 * 全局指令
 */
export default {
  install(app) {
    // 全局指令
    app.directive('lazy', lazy)
  }
}
