<template>
  <div class="w-full">
    <m-search v-model="inputValue" @search="onsearchHandler">
      <template #dropdown>
        <!-- 搜索提示 -->
        <hint-vue
          :searchText="inputValue"
          v-show="inputValue"
          @itemClick="onsearchHandler"
        ></hint-vue>
        <!-- 最近搜索 -->
        <history-vue
          @itemClick="onsearchHandler"
          v-show="!inputValue"
        ></history-vue>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'
import historyVue from './history.vue'
import { useStore } from 'vuex'

const store = useStore()
const inputValue = ref('')

/**
 * 搜索回调
 */
const onsearchHandler = (item) => {
  inputValue.value = item
  if (item) {
    store.commit('search/addHistory', item)
  }
}
</script>

<style lang="scss" scoped></style>
