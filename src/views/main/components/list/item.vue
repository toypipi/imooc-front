<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{ background: randomRGB() }"
      @click="onToPinsClick"
    >
      <!-- 图片 -->
      <img
        v-lazy
        ref="imgTarget"
        class="w-full rounded bg-transparent"
        :src="data.src.original"
        alt=""
        :style="{ height: (width / data.width) * data.height + 'px' }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5" @click="onShareClick">分享</m-button>
        <!-- 点赞 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>
        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          icon="download"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        ></m-button>
        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          icon="full"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      图片数据来自 pexels
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <!-- 由于 Pexels 接口中并未提供作者头像地址，所以这里随机找了一张图片放在这里 -->
      <img
        class="w-2 h-2 rounded-full"
        src="https://images.pexels.com/users/avatars/373869/airam-dato-on-561.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=1"
        alt=""
      />
      <span class="text-sm text-zinc-500 ml-1">{{ data.photographer }}</span>
    </div>
  </div>
</template>

<script setup>
import { randomRGB } from '@/utils/color'
import { useElementBounding, useFullscreen } from '@vueuse/core'
import { saveAs } from 'file-saver'
import { ref, computed } from 'vue'
import { weiboShare } from '@/utils/share'
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number
  }
})

const emits = defineEmits(['click'])
/**
 * 下载按钮点击事件
 */
const onDownload = () => {
  /**
   * 1. 下载的图片链接
   */
  saveAs(props.data.src.original, props.data.photographer + '.jpg')
}

/**
 * 生成全屏的方法
 */
const imgTarget = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgTarget)
/**
 * pins 跳转记录，记录图片的中心点（X | Y 位置 + 宽 | 高的一半）
 */
const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidth,
  height: imgContainerHeight
} = useElementBounding(imgTarget)

// 计算图片的中心点坐标，因为详情页的过渡动画是从 item 图片的中心点开始的
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(imgContainerX.value + imgContainerWidth.value / 2),
    translateY: parseInt(imgContainerY.value + imgContainerHeight.value / 2)
  }
})
/**
 * 进入详情点击事件
 */
const onToPinsClick = () => {
  emits('click', {
    id: props.data.id,
    location: imgContainerCenter.value
  })
}

// 分享按钮点击处理
const onShareClick = () => {
  weiboShare(props.data.src.original, `https://your.domain.address/pins/${props.data.id}`)
}
</script>

<style lang="scss" scoped></style>
