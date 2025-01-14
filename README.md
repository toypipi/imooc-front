# DAY 1 项目雏形搭建

《小慕前端》，对应的版本信息如下:
vite 版本:2.8.0
node 版本:16.13.1
npm 版本:8.1.2

使用 nvm 安装 node v16.13.1 版本。

```bash
nvm install 16.13.1
```

安装 vite。

```bash
npm install -g vite@2.8.6
```

创建一个项目。

```bash
npm init vite@latest
```

安装依赖。

```bash
npm install
```

启动项目。

```bash
npm run dev
```

# DAY 2 tailwindcss

安装 tailwindcss

```bash
npm install -D tailwindcss@3.0.23 postcss@8.4.8 autoprefixer@10.4.2
```

配置 tailwindcss

```bash
npx tailwindcss init -p
```

在 `tailwind.config.js` 中配置 `content`。

```js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

安装 sass

```bash
npm install -D sass@1.45.0
```

在 `src/styles/index.scss` 中引入 tailwindcss。

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

在 `src/main.js` 中引入 `index.scss`。

```js
import './styles/index.scss'
```

tailwindcss 初体验。修改 `src/App.vue` 中的内容。

```vue
<template>
  <div class="bg-slate-800 rounded-xl p-8 md:flex md:p-0">
    <img
      class="w-24 h-24 rounded-full mx-auto md:w-48 md:h-auto md:rounded-none"
      src="https://picsum.photos/200/300"
      alt=""
    />
    <div class="pt-6 text-center space-y-4 md:p-8 md:text-left">
      <p class="text-g font-medium text-zinc-100">
        "这是使用 tailwindcss 来实现的一个基础的卡片区域，在实现该
        卡片区域的过程中，我们从来没有离开过HTML区域"
      </p>
      <div class="font-medium">LGD_Sunday</div>
      <div calss="text-slate-500">中前台前端解决方案</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
```

# DAY 3 搭建基础项目结构

vscode 插件安装：

- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Volar

安装 vuex 和 vue-router。

```bash

npm i --save vuex@4.0.2 vue-router@4.0.14
```

搭建基础项目结构。生成项目源码结构方法如下：在扩展商店中搜索 “project-tree”，点击 “安装”，按下快捷键 “Ctrl+Shift+P”, 在弹框中输入 Project Tree，命令执行成功后，右下角会弹出提示框 “Your README.md has been modified”，打开项目根目录下的 README.md 文件，可以看到利用 Project Tree 插件生成的项目源码结构。

```
   ├─ src
   │  ├─ api // 接口请求
   │  ├─ App.vue //项目根组件，一级路由出口
   │  ├─ assets  // 静态资源
   │  │  ├─ icons //svg icon 图标
   │  │  ├─ images //image 图标。比如:xxx.png
   │  │  └─ vue.svg //logo
   │  ├─ components //通用的业务组件。比如:一个组件在多个页面中使用到
   │  ├─ constants //常量
   │  ├─ libs //通用组件，可用于构建中台物料库或通用组件库
   │  ├─ main.js //入口文件
   │  ├─ permission.js /页面权限控制中心
   │  ├─ router //路由
   │  │  ├─ index.js  // 路由处理中心
   │  │  └─ modules //路由模块
   │  │     ├─ mobile-routes.js //移动端路由
   │  │     └─ pc-routes.js // PC 端路由
   │  ├─ store  //全局状态
   │  │  ├─ getters.js //全局状态访问处理
   │  │  ├─ index.js  //全局状态中心
   │  │  └─ modules  //状态子模块
   │  ├─ style.css
   │  ├─ styles // 全局样式
   │  │  ├─ index.css
   │  │  ├─ index.min.css
   │  │  └─ index.scss  // 全局通用的样式处理
   │  ├─ utils  //工具模块
   │  ├─ vendor  //外部供应资源。比如:人类行为认证
   │  └─ views  //页面组件。与components 的区别在于:此处组件对应路由表，**以页面的形式展示**
   │     └─ layout  //用于 PC 端，分割一级路由和二级路由
   │        ├─ components //该页面组件下的业务组件
   │        └─ index.vue  // layout 组件
   ├─ tailwind.config.js //wailwind css 配置文件，与 src 平级
   └─ vite.config.js //vite 配置文件，与src 平级
```

# DAY 5 Vite

安装 VueUse 库。VueUse 是一个为 Vue.js 提供的实用函数集合，它可以帮助你更轻松地使用 Vue.js 的功能。VueUse 提供了大量的实用函数，包括状态管理、事件处理、动画、表单处理等，可以帮助你更快速地构建 Vue.js 应用程序。

```bash
npm i @vueuse/core@8.1.2
```

通过 @ 表示 src 路径。在 vite.config.js 中配置别名：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 软链接
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
})
```

提供了一个简单的后台程序，用于处理接口返回数据，使用 Node.js 编写。文件位于项目的根目录下，文件名 `server.js`.在项目根目录下使用 `node server.js` 启动该程序。

# DAY 6 构件自己的组件库

vite 处理 svg 矢量图，安装 `vite-plugin-svg-icons` 插件:

```bash
npm i --save-dev vite-plugin-svg-icons@2.0.1
```

## 处理滑块切换逻辑

当 slider 进行切换时，它的当前位置就是通过 translateX 进行指定，也就是说我们只需要计算出当前点击的 item 位置与宽度即可。
那么想要达到这个目的，我们就需要具备以下内容:

1.选中的 item 下标: currentCategoryIndex 。  
2.所有 item 元素: itemRefs。  
3.ul 的横向滚动偏离位置: ulScrollLeft 。  
4.最后在 currentcategoryIndex 发生改变时，获取 item 下标元素的 left 和 width，计算 sliderStyle 即可。

# DAY 10 瀑布流 + 长列表 + 懒加载处理方案

因为课程中获取图片数据接口返回的数据太多，不方便模拟。修改为使用 Pexels 提供的接口获取图片数据。

可以在这里申请一个免费的 [API Key](https://www.pexels.com/api/)，官方[详细文档](https://www.pexels.com/api/documentation/)。

将 `src\views\main\components\list\index.vue` 中的 API Key 替换为你自己申请的。

程序代码可以参考这个仓库[pexles_clone](https://github.com/Ekefrancisokechukwu/pexles_clone/blob/main/src/utils/useFetch.jsx)。

## 构建瀑布流的过程

整个的一个瀑布流组件的构建我们需要分成几部分:

1. 通过 props 传递关键数据(部分)
   1. data:数据源
   2. nodeKey:唯一标识
   3. column:渲染的列数
   4. picturePreReading:是否需要图片预渲染
2. 瀑布流渲染机制:通过 absolute 配合 relative 完成布局，布局逻辑为:每个 item 应该横向排列、第二行的 item 顺序连接到当前最短的列中
3. 通过 作用域插槽 将每个 item 中涉及到的关键数据，传递到 item 视图中
