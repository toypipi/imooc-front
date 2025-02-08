<template>
  <!-- PC 端：头部图标 -->
  <div class="hidden pt-5 h-8 xl:block">
    <img class="m-auto" :src="signlogo" alt="" />
  </div>
  <!-- 移动端：头部图标 -->
  <div class="h-[111px] xl:hidden">
    <img class="dark:hidden" :src="loginBg" alt="" />
    <img
      class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
      :src="logoSmall"
      alt=""
    />
  </div>
</template>

<script setup>
import signlogo from '@/assets/images/signlogo.png'
import loginBg from '@/assets/images/login-bg.png'
import logoSmall from '@/assets/images/logo-small@2x.png'
</script>

<style lang="scss" scoped></style>
