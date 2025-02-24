<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    ref="containerTarget"
  >
    <navigation-vue></navigation-vue>
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
    <!-- 移动端下的 tabbar -->
    <m-trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <m-trigger-menu-item icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200">
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="$store.getters.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
      >
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ $store.getters.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<script>
export default {
  name: 'home' // 给组件添加 name 选项，用于 keep-alive 的 include 数组元素匹配进行缓存
}
</script>
<script setup>
import { ref, onActivated } from 'vue'
import { useScroll } from '@vueuse/core'
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

/**
 * VIP click
 */
const onVipClick = () => {
  // 设置路由跳转的动画类型
  store.commit('app/changeRouterType', 'push')
  router.push('/member')
}

/**
 * My click
 */
const onMyClick = () => {
  // 设置路由跳转的动画类型
  store.commit('app/changeRouterType', 'push')
  if (store.getters.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}

// 记录滚动位置
const containerTarget = ref(null)
const { y: containerTargetScrollY } = useScroll(containerTarget)
// keep-alive 缓存的组件再次可见时，会触发 onActivated 钩子
onActivated(() => {
  if (!containerTarget.value) return
  containerTarget.value.scrollTop = containerTargetScrollY.value
})
</script>

<style lang="scss" scoped></style>
