<template>
  <div class="relative h-screen bg-white dark:zinc-800 text-center xl:bg-zinc-200">
    <!-- 头部图片 -->
    <header-vue></header-vue>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block"
      >
        账号注册
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onRegHandler">
        <!-- 用户名 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xlz;default:bg-zinc-900"
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="confirmForm.username"
        />
        <vee-error-message
          name="username"
          class="text-sm text-red-600 block mt-0.5 text-left"
        />
        <!-- 密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xlz;default:bg-zinc-900"
          type="password"
          name="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="confirmForm.password"
        />
        <vee-error-message
          name="password"
          class="text-sm text-red-600 block mt-0.5 text-left"
        />
        <!-- 确认密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xlz;default:bg-zinc-900"
          type="password"
          name="confirmPassword"
          placeholder="确认密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="confirmForm.confirmPassword"
        />
        <vee-error-message
          name="confirmPassword"
          class="text-sm text-red-600 block mt-0.5 text-left"
        />
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block pb-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            @click="onToLogin"
          >
            去登录
          </a>
        </div>
        <!-- 注册协议 -->
        <div class="text-center">
          <a
            class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300"
            href="https://m.imooc.com/newfaq?id=89"
            target="_blank"
          >
            注册即同意《慕课网注册协议》
          </a>
        </div>

        <!-- 登录按钮 -->
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:text-zinc-800"
          :isActiveAnim="false"
          :loading="loading"
        >
          立即注册
        </m-button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import HeaderVue from '../components/header.vue'
import { ref } from 'vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'

import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../validate.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { LOGIN_TYPE_USER } from '@/constants'

const loading = ref(false)
/**
 * 出入规则
 */
defineRule('validateConfirmPassword', validateConfirmPassword)

const store = useStore()
const router = useRouter()
const confirmForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

// 去注册
const onRegHandler = async () => {
  loading.value = true
  try {
    const payload = {
      username: confirmForm.value.username,
      password: confirmForm.value.password
    }
    await store.dispatch('user/register', confirmForm.value).then(() => {
      loading.value = false
    })
    // 注册完成，触发登录
    await store.dispatch('user/login', {
      ...payload,
      loginType: LOGIN_TYPE_USER
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}

// 去登录
const onToLogin = async () => {
  // 设置路由跳转的动画类型
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
</script>

<style lang="scss" scoped></style>
