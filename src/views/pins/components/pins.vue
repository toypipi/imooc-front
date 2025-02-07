<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto xl:p-2"
  >
    <!-- 移动端下的 navbar -->
    <m-navbar v-if="isMobileTerminal" sticky>
      <span>图片数据来自 Pexels</span>
      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>
    <!-- pc 端 -->
    <m-svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute top-2 right-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>
    <!-- 内容区 -->
    <!-- pexelData 有值的时候再显示，避免刷新闪动 -->
    <div
      v-if="pexelData.alt"
      class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex"
    >
      <img
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="pexelData.src?.original"
        alt=""
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-tb-lg xl:p-3"
      >
        <!-- PC 端:收藏 分享 -->
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <!-- 分享 -->
          <m-svg-icon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover-zinc-800 duration-300 rounded"
          ></m-svg-icon>
          <!-- 收藏 -->
          <m-button
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-button>
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          {{ pexelData.alt }}
        </p>
        <!-- 作者 Pexels 接口不包含作者头像链接,此处用图片链接代替 -->
        <div class="flex items-center mt-1 px-1">
          <img
            v-lazy
            class="h-3 w-3 rounded-full"
            :src="pexelData.src?.tiny"
            alt=""
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexelData.photographer
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BASE_DATA } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const pexelData = ref({})
/**
 * 根据图片 id 获取图片数据
 * https://www.pexels.com/api/documentation/#photos-search
 */
const getPexelsData = async () => {
  const res = await fetch(BASE_DATA.BASE_URL + `/photos/${props.id}`, {
    headers: {
      Authorization: BASE_DATA.API_KEY
    }
  })
  pexelData.value = await res.json()
}

getPexelsData()

const router = useRouter()
/**
 * 关闭
 */
const onPop = () => {
  router.back()
}
</script>

<style lang="scss" scoped></style>
