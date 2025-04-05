<!--用于在页面中显示一个模态框（Modal）。模态框通常用于显示重要信息或提供用户交互，如表单、警告框等。  -->
<template>
  <div>
    <!-- Teleport 是Vue 3中的一个内置组件，用于将子组件渲染到DOM中的另一个位置。这里，它将模态框的内容渲染到<body>标签内，以确保模态框始终在页面的最上层。 -->
    <Teleport to="body">
      <!-- 蒙版，用于遮罩页面其他内容，使用户只能与模态框交互 -->
      <transition name="fade">
        <!-- 点击蒙版时，模态框和蒙版都会隐藏 -->
        <div
          v-if="isVisible"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isVisible = false"
        ></div>
      </transition>

      <!-- 内容 -->
      <transition name="popup-down-up">
        <!-- 将父组件传递的所有属性绑定到模态框上 -->
        <div
          v-if="isVisible"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  // 控制模态框的显示与隐藏
  modelValue: {
    type: Boolean,
    required: true
  }
})
// 当模态框的显示状态发生变化时，触发该事件通知父组件
defineEmits(['update:modelValue'])
// 使用useVModel创建一个响应式数据，与modelValue双向绑定，当 isVisible 值发生变化时，会自动触发 emit 修改 modelValue
const isVisible = useVModel(props)
// 用于锁定页面的滚动
const isLocked = useScrollLock(document.body)
// 监听模态框的显示状态，当模态框显示时，锁定页面滚动，当模态框隐藏时，解锁页面滚动
watch(
  isVisible,
  (value) => {
    isLocked.value = value
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
// fade 动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
// 准备进入，离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
