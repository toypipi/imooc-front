<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>

<script setup>
import { ref, watch } from 'vue'
import { getHint } from '@/api/pexels.js'

const emits = defineEmits([EMITS_ITEM_CLICK])
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

/**
 * 处理搜索提示数据获取
 */
const hintData = ref([])
const getHintData = async () => {
  if (!props.searchText) return
  const { result } = await getHint(props.searchText)
  hintData.value = result
}

/**
 * watch 可以监听一个 ref 响应式数据，或者一个 包含 getter 的函数
 */
watch(() => props.searchText, getHintData, {
  immediate: true
})

/**
 * item 点击事件处理
 */
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
</script>

<style lang="scss" scoped></style>
