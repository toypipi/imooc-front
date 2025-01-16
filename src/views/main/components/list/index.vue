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
          <item-vue :data="item" :width="width" />
        </template>
      </m-waterfall>
    </m-infinite>
  </div>
</template>

<script setup>
import { getPexlesList } from '@/api/pexels'
import itemVue from './item.vue'
import { ref } from 'vue'
import axios from 'axios'
import { isMobileTerminal } from '@/utils/flexible'

/**
 * 构建数据请求
 */
const search = {
  // TODO 将这里替换为你自己申请的 API_KEY
  API_KEY: '',
  BASE_URL: 'https://api.pexels.com/v1/search'
}
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
    .get(search.BASE_URL, {
      params,
      headers: {
        Authorization: search.API_KEY
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

// 老师课程里使用的方法
// const pexelsList = ref([])
// const getPexlesData = async () => {
//   const res = await getPexlesList(query)
//   pexelsList.value = res.list
//   console.log(res)
// }

// getPexlesData()
</script>

<style lang="scss" scoped></style>
