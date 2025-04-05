/**
 * 全局指令
 */
export default {
  // Vue插件安装方法
  install(app) {
    // 使用Vite的globEager方法批量导入指令模块
    // 匹配./modules目录下所有.js文件
    const directives = import.meta.globEager('./modules/*.js')
    // 遍历所有导入的指令模块
    for (const [key, value] of Object.entries(directives)) {
      // 分割文件路径获取文件名（例如：'./modules/lazy.js' -> 'lazy'）
      const arr = key.split('/')
      // 提取文件名并移除.js扩展名，作为指令名称
      const name = arr[arr.length - 1].replace('.js', '')
      app.directive(name, value.default)
    }
  }
}
