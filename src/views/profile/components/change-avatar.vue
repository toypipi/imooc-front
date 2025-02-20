<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></m-svg-icon>
    <img :src="blob" ref="imageTarget" alt="" />
    <m-button class="mt-4 w-[80%] xl:1/2" @click="onConfirmClick">确定</m-button>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
</script>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
defineProps({
  blob: {
    type: String,
    required: true
  }
})

/**
 * 确认按钮点击事件
 */
const onConfirmClick = () => {}

const emits = defineEmits([EMITS_CLOSE])
/**
 * 关闭按钮点击事件
 */
const close = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped></style>
