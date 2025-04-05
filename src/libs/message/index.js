import { h, render } from 'vue'
import messageComponent from './index.vue'

export const message = (type, content, duration = 2000) => {
  const destroy = () => {
    // 动画结束时的回调
    render(null, document.body)
  }

  // 生成 message 组件的 vNode
  const vNode = h(messageComponent, {
    type,
    content,
    duration,
    destroy
  })

  render(vNode, document.body) // 根据 vNode 渲染 dom
}
