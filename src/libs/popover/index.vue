<template>
  <div>
    <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseLeave">
      <div>
        <!-- 具名插槽：触发弹层的视图 -->
        <slot name="reference"></slot>
      </div>
    </div>
    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        v-show="isViable"
        class="absolute p-1 z-20 bg-white border rounded-md"
      >
        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
// Vue3 允许 template 中有多个根元素，但是在某些情况下可能会出现意料之外的错误
import { ref } from 'vue'

const isViable = ref(false)

/**
 * 鼠标移入触发
 */
const onMouseenter = () => {
  isViable.value = true
}

/**
 * 鼠标移出触发
 */
const onMouseLeave = () => {
  isViable.value = false
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transfrom 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
