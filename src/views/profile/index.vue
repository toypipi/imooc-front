<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto xl:pt-1">
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2"
    >
      <!-- 移动端 navbar -->
      <m-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">个人资料</m-navbar>
      <!-- PC 端标题 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">个人资料</div>
      <div class="h-full w-full xl:w-2/3 px-1 pb-4 text-sm mt-2 xl:text-center">
        <!-- 我的头像 -->
        <span class="w-8 inline-block mb-2 font-black text-sm dark:text-zinc-300 xl:block xl:mx-auto">我的头像</span>
        <div class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-1/2 xl:translate-x-[-50%]">
          <!-- 头像 -->
          <img class="rounded-full w-full h-full xl:inline-block" :src="$store.getters.userInfo.avatar" alt="" />
          <!-- 鼠标移入 -->
          <div class="absolute top-0 rounded-full w-full h-full bg-black/40 hidden xl:group-hover:block">
            <m-svg-icon name="change-header-image" class="w-2 h-2 m-auto mt-2"></m-svg-icon>
            <div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5">点击更换头像</div>
          </div>
        </div>
        <!-- 隐藏域 -->
        <input
          v-show="false"
          ref="inputFileTarget"
          type="file"
          accept=".png,.jpg,.jpeg,.gif"
          @change="onSelectImgHandler"
        />
        <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
          支持 jpg、png、jpeg、gif 格式大小 1M 以内的图片
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
// 移动端下 navbar
const onNavbarLeftClick = () => {}

// 选中文件之后的回调
const onSelectImgHandler = () => {}
</script>

<style lang="scss" scoped></style>
