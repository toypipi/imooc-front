<template>
  <div>
    <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseLeave">
      <div ref="referenceTarget">
        <!-- 具名插槽：触发弹层的视图 -->
        <slot name="reference"></slot>
      </div>
      <!-- 气泡展示 -->
      <transition name="slide">
        <div
          ref="contentTarget"
          v-show="isViable"
          class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
          :style="contentStyle"
        >
          <!-- 匿名插槽：弹出层视图中展示的内容 -->
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
// 延迟关闭时间
const DELAY_TIME = 100
// 左上
const PROP_TOP_LEFT = 'top-left'
// 右上
const PROP_TOP_RIGHT = 'top-right'
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left'
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>

<script setup>
// Vue3 允许 template 中有多个根元素，但是在某些情况下可能会出现意料之外的错误
/**
 * 1. 指定所有可选位置的常量，并生成 enum
 * 2. 通过 prop 控制指定位置
 * 3. 获取元素的 DOM。创建读取元素尺寸的方法
 * 4. 生成气泡的样式对象，用来控制每个位置对应的样式
 * 5. 根据prop，计算样式对象
 */
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator: (value) => {
      const result = placementEnum.includes(value)
      if (!result) {
        throw new Error(
          `placement 属性值必须为 ${placementEnum.join('或')} 中的一个`
        )
      }
      return result
    }
  }
})

const isViable = ref(false)

/**
 * 鼠标移入触发
 */
let timeout = null
const onMouseenter = () => {
  isViable.value = true
  if (timeout) {
    clearTimeout(timeout)
  }
}

/**
 * 鼠标移出触发
 */
const onMouseLeave = () => {
  timeout = setTimeout(() => {
    isViable.value = false
    timeout = null
  }, DELAY_TIME)
}

/**
 * 计算元素的尺寸
 */
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

/**
 * 气泡样式
 */
const contentStyle = ref({
  top: '0px',
  left: '0px'
})

// 计算：期望气泡展示的时候再进行计算
watch(isViable, (val) => {
  if (!val) return
  // 等待元素渲染
  // vue 在数据改变之后，需要等待一段时间 DOM 才会变化，所以我们可以通过 nextTick 函数的参数，来监听 DOM 变化之后的回调
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value = {
          top: 0,
          left: `-${useElementSize(contentTarget.value).width}px`
        }
        break
      case PROP_TOP_RIGHT:
        contentStyle.value = {
          top: 0,
          left: `${useElementSize(referenceTarget.value).width}px`
        }
        break
      case PROP_BOTTOM_LEFT:
        contentStyle.value = {
          top: `${useElementSize(referenceTarget.value).height}px`,
          left: `-${useElementSize(contentTarget.value).width}px`
        }
        break
      case PROP_BOTTOM_RIGHT:
        contentStyle.value = {
          top: `${useElementSize(referenceTarget.value).height}px`,
          left: `${useElementSize(referenceTarget.value).width}px`
        }
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
