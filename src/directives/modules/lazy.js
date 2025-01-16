import { useIntersectionObserver } from '@vueuse/core'

export default {
  // 图片懒加载：在用户无法看到图片时，不加载图片， 当图片进入可视区域时，再加载图片
  mounted(el) {
    // 1.拿到当前 img 的 src
    const imgSrc = el.src
    // 2.把 src 变为空
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 3.当图片进入可视区域时，再加载图片
        el.src = imgSrc
        // 4.停止监听
        stop()
      }
    })
  }
}
