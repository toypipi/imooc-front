<template>
  <transition name="down">
    <div
      v-show="isVisible"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
const SUCCESS = 'success'
const WARNING = 'warning'
const ERROR = 'error'

const typeEnum = [SUCCESS, WARNING, ERROR]
</script>
<script setup>
import { ref, onMounted } from 'vue'
import mSvgIcon from '../svg-icon/index.vue'
const props = defineProps({
  /**
   * message 的消息类型
   */
  type: {
    type: String,
    required: true,
    validator(value) {
      const result = typeEnum.includes(value)
      if (!result) {
        throw new Error(`type 必须是 ${typeEnum.join('、')} 中的一个`)
      }
      return result
    }
  },
  /**
   * 描述文本
   */
  content: {
    type: String,
    required: true
  },
  /**
   * 展示时长
   */
  duration: {
    type: Number
  },
  /**
   * 关闭的回调
   */
  destroy: {
    type: Function
  }
})

/**
 * 样式表数据
 */
const styles = {
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  },
  //警告
  warning: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  }
}

// 控制展示
const isVisible = ref(true)
/**
 * 为了保证动画展示，需要在 mounted 之后进行展示
 */
onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, props.duration)
})
</script>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
