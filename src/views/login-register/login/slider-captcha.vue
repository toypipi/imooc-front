<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-2xl"
  >
    <!-- 头 -->
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <m-svg-icon
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onReset"
      ></m-svg-icon>
      <m-svg-icon
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onClose"
      ></m-svg-icon>
    </div>
    <!-- captcha -->
    <div id="captcha"></div>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>

<script setup>
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import { onMounted } from 'vue'
import { getCaptcha } from '@/api/sys'

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])
/**
 * 使用人类行为验证：
 * 1.创建 captcha 实例
 */
let captcha = null
onMounted(() => {
  captcha = sliderCaptcha({
    // 渲染位置
    id: 'captcha',
    // 用户拼图成功之后的回调
    async onSuccess(arr) {
      const res = await getCaptcha({ behavior: arr })
      if (res) {
        // 人类行为通过
        emits(EMITS_SUCCESS)
      }
    },
    // 用户拼图失败之后的回调
    onFail() {
      console.log('验证失败')
    },
    // 默认的验证方法
    verify() {
      return true
    }
  })
})
/**
 * 重置
 */
const onReset = () => {
  captcha.reset()
}
/**
 * 关闭
 */
const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped></style>
