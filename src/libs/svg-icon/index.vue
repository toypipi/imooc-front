<template>
  <!-- 
    SVG 组件容器
    aria-hidden="true" 用于提高可访问性，告诉屏幕阅读器忽略这个装饰性图标
  -->
  <svg aria-hidden="true">
    <!-- 
      use 元素用于引用 SVG sprite 中的图标
      :xlink:href 动态绑定图标 ID，实现动态图标切换
      :class 动态绑定 tailwind 类名，支持主题切换
      :fill 优先级高于fillClass，用于直接指定颜色值
    -->
    <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

/**
 * 组件属性设计说明：
 * 1. 分离color和fillClass实现两种染色方案：
 *    - color 用于直接指定色值（如#fff）
 *    - fillClass 用于tailwind颜色类（如text-white）
 * 2. name必填保证组件可靠性
 */
const props = defineProps({
  // name: SVG 图标的名称，必填项
  // 将被用来构建完整的图标 ID
  name: {
    type: String,
    required: true
  },
  // color: SVG 图标的颜色
  // 可以是任何有效的 CSS 颜色值
  color: {
    type: String
  },
  // fillClass: 用于指定 SVG 颜色的 Tailwind 类名
  // 优先级低于 color 属性
  fillClass: {
    type: String
  }
})

/**
 * 符号ID计算逻辑：
 * 1. 统一添加#icon-前缀，与svg sprite生成规则保持一致
 * 2. 使用computed实现响应式更新
 * 3. 名称格式化处理保证符号查找正确性
 */
const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>

<style lang="scss" scoped></style>
