# [English](README.en.md) [中文](README.md)

## 小慕前端 (imooc-front)

这是一个基于 Vue 3、Vite 和 Tailwind CSS 构建的前端项目，灵感来源于 Pinterest，旨在提供一个图片展示和分享的平台。图片数据直接从 Pexels 获取，并且提供后端 MOCK 接口，使您无需后端程序就可以启动项目。

## ✨ 功能特性

- **图片展示**: 瀑布流布局展示图片列表。
- **图片搜索**: 支持关键词搜索 Pexels 图片。
- **图片详情**: 查看单张图片的详细信息和相关推荐。
- **用户系统**:
  - 注册与登录 (支持 QQ、微信第三方登录)。
  - 个人中心 (信息修改、头像更换)。
- **主题切换**: 支持浅色、深色模式切换。
- **VIP 功能**: (可选) 付费会员功能。
- **响应式设计**: 适配 PC 和移动端。
- **消息提示**: 提供用户操作反馈。
- **无限滚动**: 瀑布流图片无限加载。
- **引导功能**: 新用户功能引导。

## 🛠️ 技术栈

- **框架**: Vue 3
- **构建工具**: Vite 2.8+
- **UI 库**: Tailwind CSS 3.0+
- **状态管理**: Vuex
- **路由**: Vue Router
- **HTTP 请求**: Axios

## ⚙️ 运行环境

- Node.js >= 16.13.1
- npm >= 8.1.2

## 🚀 快速开始

1.  **克隆项目**

    ```bash
    git clone https://github.com/toypipi/imooc-front.git
    cd imooc-front
    ```

2.  **重命名 `.env.example` 文件为 `.env`**

按需配置 Pexels API KEY、兔小巢反馈地址、微博 app key 和微博 uid。由于 `.env` 文件包含了个人信息，不对该文件进行版本控制。

3.  **安装依赖**

    ```bash
    npm install
    ```

    _如果遇到 `node-sass` 或 `sass-loader` 相关安装问题，请尝试使用 `cnpm` 或配置 `npm` 镜像源。_

4.  **运行开发环境**

    ```bash
    npm run dev
    ```

    项目将在 `http://localhost:xxxx` 启动 (具体端口号见终端输出)。

5.  **启动后端 MOCK 接口**

    ```bash
    node server.js
    ```

    项目将在 `http://localhost:3001` 启动。

6.  **构建生产包**
    ```bash
    npm run build
    ```
    构建后的文件位于 `dist` 目录。

## 文件资源目录 📚

```text
├─ src
│  ├─ docs // 项目文档
│  ├─ api // 接口请求
│  ├─ App.vue //项目根组件，一级路由出口
│  ├─ assets  // 静态资源
│  │  ├─ icons //svg icon 图标
│  │  ├─ images //image 图标。比如:xxx.png
│  │  └─ vue.svg //logo
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

## 📸 项目截图

![首页](./docs/images/首页.png)
![搜索](./docs/images/搜索.png)
![分类](./docs/images/分类.png)
![引导页](./docs/images/引导页.png)
![登录页](./docs/images/登录页.png)

## ❤️ 支持项目

如果觉得框架不错，或者已经在使用了，希望您可以给项目一个 ⭐ Star，这将是对我极大的鼓励与支持。

或者，也可以请我喝杯咖啡 🤭：

|                 微信                 |               支付宝                |
| :----------------------------------: | :---------------------------------: |
| ![微信](./docs/images/wechatpay.JPG) | ![支付宝](./docs/images/alipay.JPG) |

您的支持是项目持续发展的动力！

## 🤝 贡献

欢迎提交 Pull Request 或 Issue.
