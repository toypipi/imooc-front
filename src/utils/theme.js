import { THEME_LIGHT, THEME_DARK } from '@/constants'
import { watch } from 'vue'
import store from '../store'

console.log(store.state.themeType)
/**
 * 初始化主题
 */
export default () => {
  // 1.当主题发生改变时，或者当今日系统时，可以进行 html class 的配置
  watch(
    () => store.getters.themeType,
    (val) => {
      // html 的 class
      let themeClassName = ''
      switch (val) {
        case THEME_LIGHT:
          themeClassName = 'light'
          break
        case THEME_DARK:
          themeClassName = 'dark'
          break
      }
      console.log(store.state.themeType)
      document.querySelector('html').className = themeClassName
    }
  ),
    {
      // 初始执行一次
      immediate: true
    }
}
