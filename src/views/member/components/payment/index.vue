<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment-vue v-if="!isMobileTerminal" :payData="payData" />
    <!-- 移动端支付 -->
    <mobile-payment-vue :payData="payData" v-else />
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import pcPaymentVue from './pc-payment/index.vue'
import mobilePaymentVue from './mobile-payment/index.vue'

defineProps({
  payData: Object
})
</script>
