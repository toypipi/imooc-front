<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500"
  >
    <div class="flex items-center">
      <img
        v-lazy
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
        srcset=""
        class="h-4 cursor-pointer mr-2"
        @click="onToHome"
      />
      <headerSearchVue class="mr-1" />
      <headerThemeVue class="mr-1" />
      <headerMyVue />
    </div>
  </div>
</template>

<script setup>
import headerSearchVue from './header-search/index.vue'
import headerThemeVue from './header-theme.vue'
import headerMyVue from './header-my.vue'
import { useRouter } from 'vue-router'

// router 等于 VUE2 中的 this.$router
const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
