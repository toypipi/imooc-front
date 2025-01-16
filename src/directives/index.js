import lazy from './modules/lazy'

/**
 * 全局指令
 */
export default {
  install(app) {
    // 全局指令
    const directives = import.meta.globEager('./modules/*.js')
    for (const [key, value] of Object.entries(directives)) {
      const arr = key.split('/')
      // 指令的名称根据 ./modules/*.js 中的文件名来决定
      const name = arr[arr.length - 1].replace('.js', '')
      app.directive(name, value.default)
    }
  }
}
