import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { useREM } from './utils/flexible'
import mLibs from './libs'
import mDirectives from './directives'
import useTheme from './utils/theme'
import './styles/index.scss'
// 注册 svg-icons
import 'virtual:svg-icons-register'
import './permission'

useREM()
useTheme()
createApp(App).use(router).use(store).use(mLibs).use(mDirectives).mount('#app')
