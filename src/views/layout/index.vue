<template>
  <div class="h-screen">
    <headerVue class="h-header" />
    <mainVue class="h-main" />
    <floatingVue />
  </div>
</template>

<script setup>
import headerVue from './components/header/index.vue'
import mainVue from './components/main.vue'
import floatingVue from './components/floating.vue'
</script>

<style lang="scss" scoped></style>
