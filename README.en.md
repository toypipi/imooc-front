# [English](README.en.md) [中文](README.md)

## imooc-front

This is a front-end project built with Vue 3, Vite, and Tailwind CSS, inspired by Pinterest, aiming to provide a platform for image display and sharing. The image data is directly fetched from Pexels, and it includes a backend mock API, allowing you to start the project without a backend program.

## ✨ Features

- **Image Display**: Waterfall layout for displaying image lists.
- **Image Search**: Supports keyword search for Pexels images.
- **Image Details**: View detailed information and related recommendations for a single image.
- **User System**:
  - Registration and Login (Supports QQ, WeChat third-party login).
  - Personal Center (Profile editing, avatar changing).
- **Theme Switching**: Supports light and dark mode switching.
- **VIP Features**: (Optional) Paid membership features.
- **Responsive Design**: Adapts to PC and mobile devices.
- **Message Notifications**: Provides user action feedback.
- **Infinite Scrolling**: Infinite loading for waterfall image lists.
- **Guide Feature**: Feature guidance for new users.

## 🛠️ Tech Stack

- **Framework**: Vue 3
- **Build Tool**: Vite 2.8+
- **UI Library**: Tailwind CSS 3.0+
- **State Management**: Vuex
- **Routing**: Vue Router
- **HTTP Client**: Axios

## ⚙️ Environment

- Node.js >= 16.13.1
- npm >= 8.1.2

## 🚀 Getting Started

1.  **Clone the project**

    ```bash
    git clone https://github.com/toypipi/imooc-front.git
    cd imooc-front
    ```

2.  **Rename the `.env.example` file to `.env`**

Configure the Pexels API KEY, Tuxiaochao feedback address, Weibo app key, and Weibo uid as needed.Since the `.env` file contains personal information, it is not under version control.

3.  **Install dependencies**

    ```bash
    npm install
    ```

    _If you encounter installation issues related to `node-sass` or `sass-loader`, try using `cnpm` or configuring an `npm` mirror._

4.  **Run development server**

    ```bash
    npm run dev
    ```

    The project will start at `http://localhost:xxxx` (check terminal output for the specific port).

5.  **Start the backend mock API**

    ```bash
    node server.js
    ```

    The server will start at `http://localhost:3001` 。

6.  **Build for production**
    ```bash
    npm run build
    ```
    The built files will be in the `dist` directory.

## File Resource Directory 📚

```text
├─ src
│  ├─ docs // Project Documentation
│  ├─ api // API requests
│  ├─ App.vue // Project root component, first-level route outlet
│  ├─ assets  // Static resources
│  │  ├─ icons // SVG icon files
│  │  ├─ images // Image files. e.g., xxx.png
│  │  └─ vue.svg // Logo
│  ├─ constants // Constants
│  ├─ libs // Common components, can be used for building a middle-platform component library or general component library
│  ├─ main.js // Entry file
│  ├─ permission.js // Page permission control center
│  ├─ router // Routing
│  │  ├─ index.js  // Routing processing center
│  │  └─ modules // Route modules
│  │     ├─ mobile-routes.js // Mobile routes
│  │     └─ pc-routes.js // PC routes
│  ├─ store  // Global state
│  │  ├─ getters.js // Global state access processing
│  │  ├─ index.js  // Global state center
│  │  └─ modules  // State sub-modules
│  ├─ style.css
│  ├─ styles // Global styles
│  │  ├─ index.css
│  │  ├─ index.min.css
│  │  └─ index.scss  // Global common style processing
│  ├─ utils  // Utility modules
│  ├─ vendor  // External vendor resources. e.g., Human verification
│  └─ views  // Page components. Difference from components: components here correspond to the routing table, **displayed as pages**
│     └─ layout  // Used for PC, separates first-level and second-level routes
│        ├─ components // Business components under this page component
│        └─ index.vue  // layout component
├─ tailwind.config.js // Tailwind CSS configuration file, sibling to src
└─ vite.config.js // Vite configuration file, sibling to src

## 📸 Screenshots

![Home Page](./docs/images/首页.png)
![Search](./docs/images/搜索.png)
![Categories](./docs/images/分类.png)
![Guide Page](./docs/images/引导页.png)
![Login Page](./docs/images/登录页.png)

## ❤️ Support the Project (Donation)

If you think the framework is great or are already using it, I hope you can give the project a ⭐ Star. It would be a huge encouragement and support for me.

Alternatively, you can also buy me a coffee 🤭:

|                WeChat                |               Alipay                |
| :----------------------------------: | :---------------------------------: |
| ![WeChat](./docs/images/wechatpay.JPG) | ![Alipay](./docs/images/alipay.JPG) |

Your support motivates the continuous development of the project!

## 🤝 Contributing

Pull Requests and Issues are welcome.
```
