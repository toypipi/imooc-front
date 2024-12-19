<template>
  <mobile-navigation-vue v-if="isMobileTerminal" :data="categoryData" />
</template>

<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'

import { getCategory } from '@/api/category'

const categoryData = ref([])
const getCategoryData = async () => {
  const { categories } = await getCategory()
  categoryData.value = categories
  console.log(categoryData.value)
}

getCategoryData()
</script>

<style lang="scss" scoped></style>
