<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2
      class="text-xl text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1"
    ></h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in $store.getters.categories"
        :key="item.id"
        class="text-lg text-zinc-900 dark:text-zinc-300 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:active:bg-zinc-900"
        @click="$emit('onItemClick', index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// 推荐，所有的事件都进行一个手动的注册
defineEmits(['onItemClick'])
</script>

<style lang="scss" scoped></style>
