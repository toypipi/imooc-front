<template>
  <div>
    <m-waterfall
      :data="pexelsList"
      :nodeKey="id"
      :column="5"
      :picturePreReading="true"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width" />
      </template>
    </m-waterfall>
  </div>
</template>

<script setup>
import { getPexlesList } from '@/api/pexels'
import itemVue from './item.vue'
import { ref } from 'vue'
import axios from 'axios'

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

// 获取 Pexels 图片列表
const pexelsList = ref([])
const getPexlesData = () => {
  axios
    .get(search.BASE_URL, {
      params,
      headers: {
        Authorization: search.API_KEY
      }
    })
    .then((res) => {
      pexelsList.value = res.data.photos
      console.log(pexelsList.value)
    })
}
getPexlesData()

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
