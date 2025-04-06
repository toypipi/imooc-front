// 这个插件的主要用途是简化组件的注册过程。在大型项目中，可能会有很多文件夹，每个文件夹中都有一个 index.vue 组件。通过这个插件，可以自动地找到并注册这些组件，而不需要手动一个个地注册
import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index.js'
export { message } from './message/index.js'

export default {
  // install 方法，这个方法是 Vue 插件的标准写法，用于安装插件。
  install(app) {
    // 1.获取当前路径下所有文件夹中的 index.vue
    const components = import.meta.glob('./*/index.vue')
    // 2.遍历获取到的组件模块并注册
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]
      // 3.利用 app.component 进行注册
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
