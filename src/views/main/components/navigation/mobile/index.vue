<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-l-zinc"
        @click="onShowPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <!-- items -->
      <li
        v-for="(item, index) in $store.getters.categories"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :ref="setItemRef"
        :class="{
          'text-zinc-100': $store.getters.currentCategoryIndex === index
        }"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isVisible">
      <menu-vue @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { onBeforeUpdate, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'

const store = useStore()
// 滑块
const sliderStyle = ref({
  width: '52px',
  transform: 'translateX(0px)'
})

// 获取所有的 item 元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

// 数据改变之后，DOM 改变之前触发
onBeforeUpdate(() => {
  itemRefs = []
})

// 获取 ul 元素
const ulTarget = ref(null)

// 通过 vueuse -> useScroll 获取响应式的 scroll 滚动距离
const { x: ulScrollLeft } = useScroll(ulTarget)

// watch 监听 getters 的时候，我们需要传递一个函数
watch(
  () => store.getters.currentCategoryIndex,
  (val) => {
    const { left, width } = itemRefs[val].getBoundingClientRect()
    sliderStyle.value = {
      width: `${width}px`,
      // 滑块的位置 = ul 横向滚动的位置 + 当前元素的 left - ul 的 padding
      transform: `translateX(${ulScrollLeft.value + left - 10}px)`
    }
  }
)

// item 点击事件
const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
  isVisible.value = false
}

// 是否显示 popup
const isVisible = ref(false)
const onShowPopup = () => {
  isVisible.value = !isVisible.value
}
</script>
