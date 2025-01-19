<template>
  <div class="w-full">
    <m-search v-model="inputValue">
      <template #dropdown>
        <!-- 搜索提示 -->
        <hint-vue
          :searchText="inputValue"
          v-show="inputValue"
          @itemClick="onsearchHandler"
        ></hint-vue>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'

const inputValue = ref('')

/**
 * 搜索回调
 */
const onsearchHandler = (item) => {
  inputValue.value = item
}
</script>

<style lang="scss" scoped></style>
