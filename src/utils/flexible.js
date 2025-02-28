import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

/**
 *
 * @returns 判断当前是否为移动设备，判断依据屏幕宽度是否小于一个指定宽度（1280）
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

// export const isMobileTerminal = computed(() => {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   )
// })

/**
 * 动态指定 rem 基准值，最大为 40px
 * 根据用户的屏幕宽度，进行一些计算，把计算出来的值赋给 html 的跟标签作为 fontsize 大小
 */
export const useREM = () => {
  // 定义做大的 fontsize
  const MAX_FONT_SIZE = 40
  // 监听 html 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    // 拿到 html 标签
    const html = document.querySelector('html')
    // 计算 fontsize，根据屏幕宽度/10
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 把计算出来的 fontsize 赋给 html 的根标签
    html.style.fontSize = fontSize + 'px'
  })
}
