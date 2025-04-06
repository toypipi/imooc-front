<!-- 定义一个带有样式的基本容器，适用于需要展示一组元素的场景。它使用了 Flexbox 布局，支持响应式设计，并且可以在暗模式下自动调整背景颜色。通过插槽机制，父组件可以向这个容器中插入自定义内容 -->
<template>
  <div
    class="min-w[180px] bg-white dark:bg-zinc-800 rounded-full shadow flex items-center justify-between px-2 py-1"
  >
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
