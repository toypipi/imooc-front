<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        v-if="$store.getters.token"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          :src="$store.getters.userInfo.avatar"
          alt=""
          class="w-3 h-3 rounded-sm"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="w-1.5 h-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
          color="#707070"
        ></m-svg-icon>
        <!-- vip -->
        <m-svg-icon
          class="w-1.5 h-1.5 ml-0.5 absolute right-[16px] bottom-0"
          name="vip"
          v-if="$store.getters.userInfo.vipLevel"
        ></m-svg-icon>
      </div>
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onTologin"
        ></m-button>
      </div>
    </template>

    <!-- 气泡 -->
    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-sm text-zinc-800 dark:text-zinc-300">{{ item.title }}</span>
      </div>
    </div>
    <div
      v-else
      class="text-zinc-800 dark:text-zinc-300 text-sm w-[150px] text-center cursor-pointer"
      @click="goToLogin"
    >
      登录体验更多功能
    </div>
  </m-popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '@/libs'

// 构建 menu 数据源
const menuArr = [
  { id: 0, title: '个人资料', icon: 'profile', path: '/profile' },
  { id: 1, title: '升级 VIP', icon: 'vip-profile', path: '/member' },
  { id: 2, title: '退出登录', icon: 'logout', path: '' }
]

const router = new useRouter()
const store = useStore()
/**
 * 登录按钮点击事件
 */
const onTologin = () => {
  // 设置路由跳转的动画类型
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}

/**
 * menu 点击事件
 */
const onItemClick = (item) => {
  if (item.id === 2) {
    confirm('确定要退出登录吗？').then(() => {
      store.dispatch('user/logout')
    })
    return
  }
  // 设置路由跳转的动画类型
  store.commit('app/changeRouterType', 'push')
  router.push(item.path)
}
</script>

<style lang="scss" scoped></style>
