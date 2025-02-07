<template>
  <div>
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexlesData"
    >
      <m-waterfall
        class="px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width" @click="onToPins" />
        </template>
      </m-waterfall>
    </m-infinite>
    <!-- 图片详情内容展示 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisiblePins" :id="currentPins.id"></pins-vue>
    </transition>
  </div>
</template>

<script setup>
import { getPexlesList, BASE_DATA } from '@/api/pexels'
import itemVue from './item.vue'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { isMobileTerminal } from '@/utils/flexible'
import pinsVue from '@/views/pins/components/pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'

const store = useStore()
/**
 * 构建数据请求
 */
let params = {
  query: 'nature',
  page: 1,
  per_page: 20
}

// 数据是否在加载中
const loading = ref(false)
// 数据是否加载完成
const isFinished = ref(false)
// 获取 Pexels 图片列表
// 数据源
const pexelsList = ref([])
// 加载数据的方法
const getPexlesData = () => {
  // 数据全部加载完成 return
  if (isFinished.value) return
  // 完成了第一次请求之后，后续的请求让 page 自增
  if (pexelsList.value.length) {
    params.page++
  }
  axios
    .get(BASE_DATA.BASE_URL + '/search', {
      params,
      headers: {
        Authorization: BASE_DATA.API_KEY
      }
    })
    .then((res) => {
      if (params.page === 1) {
        pexelsList.value = res.data.photos
      } else {
        pexelsList.value = [...pexelsList.value, ...res.data.photos]
      }
      // 判断数据是否全部加载完成
      // 注意：使用 pexels 接口可以一直获取图片，不存在加载完成的情况
      if (pexelsList.value.length >= res.data.total) {
        isFinished.value = true
      }
      // 修改 loading 状态
      loading.value = false
      console.log(pexelsList.value)
    })
}

// 通过此方法修改请求参数，重新发起请求
const resetQuery = (newQuery) => {
  params = {
    ...params,
    ...newQuery
  }
  // 重置状态
  isFinished.value = false
  pexelsList.value = []
}

// 监听 currentCategory 的变化
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    // 如果 currentCategory 包含 _ ，则根据 _ 分割，取第一个单词
    if (currentCategory.id.includes('_')) {
      params.query = currentCategory.id.split('_')[0]
    } else {
      params.query = currentCategory.id
    }
    resetQuery({
      page: 1
    })
  }
)

// 监听 searchText 变化
watch(
  () => store.getters.searchText,
  (searchText) => {
    resetQuery({
      query: searchText,
      page: 1
    })
  }
)
// 老师课程里使用的方法
// const pexelsList = ref([])
// const getPexlesData = async () => {
//   const res = await getPexlesList(query)
//   pexelsList.value = res.list
//   console.log(res)
// }

// getPexlesData()

// 控制 pins 展示
const isVisiblePins = ref(false)
// 当前选中的 pins 属性
const currentPins = ref({})

/**
 * 监听浏览器后退按钮的事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})
/**
 * 进入 pins
 */
const onToPins = (item) => {
  // 修改浏览器的 url
  history.pushState(null, null, `/pins/${item.id}`)
  isVisiblePins.value = true
  currentPins.value = item
}

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    onComplete: done
  })
}
</script>

<style lang="scss" scoped></style>
