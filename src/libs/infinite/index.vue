<template>
  <div>
    <!-- 瀑布流对应的内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据 -->
      <p v-if="ifFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否全部加载完成
  ifFinished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

// 处理 loading 状态
const loading = useVModel(props)

// 滚动的元素
const loadingTarget = ref(null)

// 监听 loadingTarget 是否进入视口
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }]) => {
    // 当加载更多的视图可见时，同时 loading 为 false，同时 数据尚未全部加载完。处理加载更多的逻辑
    if (isIntersecting && !loading.value && !props.ifFinished) {
      // 修改加载数据标记
      loading.value = true
      // 触发加载更多的行为
      emits('onLoad')
    }
  },
  { threshold: 0.1 }
)
</script>

<style lang="scss" scoped></style>
