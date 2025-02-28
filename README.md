# 项目地址

[GitHub](https://github.com/toypipi/imooc-front)

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

将 `.env.example` 中的 `VITE_PEXELS_API_KEY` 替换为你自己申请的,并修改文件名为`.env`。

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

## 整个瀑布流的构建过程:

1. 瀑布流的核心就是:通过 relative 和 absolute 定位的方式，来控制每个 item 的位置
2. 影响瀑布流高度的主要元素，通常都是 img 标签
3. 有些服务端会返回 关键 img 的高度，有些不会，所以我们需要分别处理:
   1. 当服务端 不返回 高度时:我们需要等待 img 加载完成之后，再来计算高度，然后通过得到的高度计算定位。否则则会出现高度计算不准确导致定位计算不准确的问题。
   2. 当服务端 返回 高度时:开发者则必须利用此高度为 item 进行高度设定。一旦 item 具备指定高度，那么我们就不需要等待 img 加载的过程，这样效率更高，并且可以业务的逻辑会变得更加简单。
4. 当进行响应式切换时，同样需要区分对应场景:
   1. 当服务端 不返回 高度时:我们需要 重新执行整个渲染流程，虽然会耗费一些性能，但是这样可以最大可能的避免出现逻辑错误。让组件拥有更强的普适性。 2.当服务端 返回 高度时:我们同样需要重新计算 列宽 和 定位，但是因为 item 具备明确的高度，所以我们可以直接拿到具体的高度，而无需重复整个渲染流程，从而可以实现更多的交互逻辑。比如:位移动画、将来的图片懒加载占位..

# DAY 14 登录

## 登录请求参数

请求路径:/sys/login
请求方法:post
请求参数：

<!-- 3*8表格 -->

| **参数名**  | **参数说明**                    | **备注**                  |
| ----------- | ------------------------------- | ------------------------- |
| username    | 用户名                          |                           |
| password    | 密码（MD5 加密）                |                           |
| loginType   | 登录类型                        | username、QQ、WX          |
| accessToken | accessToken                     | QQ 登录时必须要传递的数据 |
| openid      | Openid                          | 微信登录时必传            |
| nickname    | 微信获取到的用户信息 nickname   | 微信登录时必传            |
| headimgurl  | 微信获取到的用户信息 headimgurl | 微信登录时必传            |

# DAY 15

由于我没有阿里云服务器，所以没有测试用户头像上传功能,但是这部分功能已经实现,如果有需要并且有阿里云服务器的话,需要自行测试这部分功能。

# DAY 18

## QQ 登录流程

1. 点击第三方登录按钮:执行 window.open 方法，打开一个第三方指定的 URL 窗口，该地址会指向第三方登录的 URL，并且由第三方提供一个对应的二维码
2. 弹出一个小窗口，展示对应二维码:此处展示的二维码，即为上一步中第三方提供的二维码
3. 手机打开对应的 APP 进行扫码之后，会跳转到 同意页面，同时浏览器端也会显示扫码成功:在第三方中会一直对该页面进行 轮询，配合第三方 APP 来判断是否扫码成功
4. 手机端操作同意登录之后，会出现两种情况:在 APP 中同意之后，第三方会进行对应的跳转，跳转地址为你指定的地址，在该地址中可以获取到 第三方的用户信息，该信息即为第三方登录时要获取到的关键数据。
5. 至此，第三方操作完成。接下来需要进行本平台的登录判定，

- 该注册指的是 第三方用户 是否在本平台中进行了注册。
- 因为在之前的所有操作中，我们拿到的是第三方的用户信息
- 该信息可以帮助我们直接显示对用的用户名（nickname）和头像，但是因为不包含关键信息(手机号、用户名（username）、密码)所以我们无法使用该信息帮助用户直接登录
- 所以我们需要判断当前用户是否在咱们自己的平台中完成了注册
  - 当前用户已注册: 1.直接登录
  - 当前用户未注册: 1.执行注册功能

总结一下，想要完成第三方登录功能，总共分为两大步骤：

1. 对接第三方平台，获取第三方平台的用户信息
2. 利用该用户信息，完成本应用的注册

## 微信登录流程

1. 通过 微信登录前置数据获取 接口，获取登录数据(比如 APP ID)
2. 根据获取到的数据，拼接得到 open url 地址
3. 打开该地址，展示微信登录二维码
4. 移动端微信扫码确定登录
5. 从当前窗口中解析 window.location.search 得到用户的 code 数据
6. 根据 appId、appSecret、code 通过接口获取用户的 access_token
7. 根据 acces token 获取用户信息
8. 通过用户信息触发 oauthLogin 方法

## 第三放开发平台

1. [QQ 互联](https://connect.qq.com/)

测试移动端登录，可以先使用草料二维码将登录页面生成二维码，然后使用手机 QQ 扫码登录。

2. [微信开放平台](https://open.weixin.qq.com/)

移动端微信不能通过普通的 H5 调起微信 APP 触发登录。

# [兔小巢](https://txc.qq.com/)用户反馈平台
