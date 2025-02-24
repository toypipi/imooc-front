<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <!-- 一级路由出口 -->
    <!-- <router-view /> -->
    <!-- 依靠 routerType 告诉 transition-touter-view 应该使用什么动画来进行页面跳转 -->
    <m-transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    ></m-transition-router-view>
  </div>
</template>

<style lang="scss" scoped></style>
