<template>
  <mobile-navigation-vue v-if="isMobileTerminal" :data="categoryData" />
</template>

<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'

const categoryData = ref([])
const getCategoryData = async () => {
  const { categories } = await getCategory()
  categoryData.value = categories
  categoryData.value.unshift(ALL_CATEGORY_ITEM)
}

getCategoryData()
</script>

<style lang="scss" scoped></style>
