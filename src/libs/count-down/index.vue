<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>

<script>
// 倒计时结束
const EMITS_FINISH = 'finish'
// 倒计时改变
const EMITS_CHANGE = 'change'
// 倒计时的时间间隔
const EMITS_INTERVAL = 1000
</script>
<script setup>
import { ref, watch, onUnmounted, computed } from 'vue'
import dayjs from './utils'

const props = defineProps({
  // 毫秒-时间戳
  time: {
    type: Number,
    required: true
  },
  // 遵循 dayjs format 标准：
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])
// 倒计时的时长
const duration = ref(0)
// 开始倒计时
let interval
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, EMITS_INTERVAL)
}
// 倒计时的执行行为
const durationFn = () => {
  duration.value -= EMITS_INTERVAL
  emits(EMITS_CHANGE)
  // 监听结束的行为
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}
// 倒计时结束
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}

// 组件销毁时，清理倒计时
onUnmounted(() => {
  close()
})

// 开始倒计时
watch(
  () => props.time,
  (val) => {
    duration.value = val
    start()
  },
  {
    immediate: true
  }
)

// 显示的时间格式
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
</script>

<style lang="scss" scoped></style>
