<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto xl:pt-1">
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2"
    >
      <!-- 移动端 navbar -->
      <m-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">
        个人资料
      </m-navbar>
      <!-- PC 端标题 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>
      <div class="h-full w-full xl:w-2/3 px-1 pb-4 text-sm mt-2 xl:text-center">
        <!-- 头像部分 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="w-8 inline-block mb-2 font-black text-sm dark:text-zinc-300 xl:block xl:mx-auto"
          >
            我的头像
          </span>
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-1/2 xl:translate-x-[-50%]"
            @click="onAvatarClick"
          >
            <!-- 头像 -->
            <img
              class="rounded-full w-full h-full xl:inline-block"
              :src="$store.getters.userInfo.avatar"
              alt=""
            />
            <!-- 鼠标移入 -->
            <div
              class="absolute top-0 rounded-full w-full h-full bg-black/40 hidden xl:group-hover:block"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></m-svg-icon>
              <div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5">
                点击更换头像
              </div>
            </div>
          </div>
          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png,.jpg,.jpeg,.gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg、png、jpeg、gif 格式大小 1M 以内的图片
          </p>
        </div>
        <!-- 信息输入 -->
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">用户名</span>
          <m-input
            class="w-full"
            max="20"
            :modelValue="$store.getters.userInfo.nickname"
            @update:modelValue="changeStoreUserInfo('nickname', $event)"
          ></m-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">职位</span>
          <m-input class="w-full" v-model="userInfo.title"></m-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">公司</span>
          <m-input class="w-full" v-model="userInfo.company"></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
            个人主页
          </span>
          <m-input class="w-full" v-model="userInfo.homePage"></m-input>
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
            个人介绍
          </span>
          <m-input
            class="w-full"
            v-model="userInfo.introduction"
            type="textarea"
            max="100"
          ></m-input>
        </div>

        <!-- 保存修改 -->
        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading"
          @click="onChangeProfile"
        >
          保存修改
        </m-button>

        <!-- 移动端：退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </m-button>
      </div>
    </div>
    <!-- PC 端 -->
    <m-dialog v-if="!isMobileTerminal" title="裁剪头像" v-model="isDialogVisible">
      <change-avatar-vue
        :blob="currentBlog"
        @close="isDialogVisible = false"
      ></change-avatar-vue>
    </m-dialog>
    <!-- 移动端 -->
    <m-popup v-else :class="{ 'h-screen': isDialogVisible }" v-model="isDialogVisible">
      <change-avatar-vue
        :blob="currentBlog"
        @close="isDialogVisible = false"
      ></change-avatar-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { confirm, message } from '@/libs'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { putProfile } from '@/api/sys'
import changeAvatarVue from './components/change-avatar.vue'

const store = useStore()
const router = useRouter()

// 移动端下 navbar
const onNavbarLeftClick = () => {
  // 设置路由跳转的动画类型
  store.commit('app/changeRouterType', 'back')
  router.back()
}
// 移动端退出登录
const onLogoutClick = () => {
  confirm('确定要退出登录吗？').then(() => {
    store.dispatch('user/logout')
  })
}

// 控制 dialog 的展示
const isDialogVisible = ref(false)
// 选中的图片
const currentBlog = ref('')
// 选择头像
const inputFileTarget = ref(null)
const onAvatarClick = () => {
  inputFileTarget.value.click()
}
// 选中文件之后的回调
const onSelectImgHandler = () => {
  // 获取选中的文件
  const imgFile = inputFileTarget.value.files[0]
  // 生成 blob 对象
  const blob = URL.createObjectURL(imgFile)
  // 获取到 blob 类文件对象
  currentBlog.value = blob
  // 展示 dialog
  isDialogVisible.value = true
}

/**
 * 当两次选择同一个文件的时候, change 回调不会再次被触发
 * 想要解决这个问题,就只需要在每次选择的图片不在被使用之后,清空掉 inputFilTarget 的值
 */
watch(isDialogVisible, (val) => {
  if (!val) {
    inputFileTarget.value.value = null
  }
})

/**
 * 修改用户信息
 */
const changeStoreUserInfo = (key, value) => {
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    [key]: value
  })
}

/**
 * 数据本地的双向同步
 */
const userInfo = ref(store.getters.userInfo)

/**
 * 修改个人信息
 */
const loading = ref(false)
const onChangeProfile = async () => {
  loading.value = true
  await putProfile(userInfo.value)
  message('success', '用户信息修改成功')
  // 同步 vuex
  store.commit('user/setUserInfo', userInfo.value)
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
