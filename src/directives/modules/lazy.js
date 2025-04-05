import { useIntersectionObserver } from '@vueuse/core'

export default {
  // 图片懒加载：在用户无法看到图片时，不加载图片， 当图片进入可视区域时，再加载图片
  mounted(el) {
    // 1. 保存原始图片地址
    const imgSrc = el.src
    // 2. 清空图片src属性，阻止浏览器自动加载
    el.src = ''
    // 3. 使用VueUse的Intersection Observer API
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 当元素进入视口时
        // 4. 恢复图片地址，触发加载
        el.src = imgSrc
        // 5. 停止观察，避免重复触发
        stop()
      }
    })
  }
}
