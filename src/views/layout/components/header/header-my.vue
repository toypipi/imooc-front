<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
      >
        <!-- 头像 -->
        <img
          src="https://img2.baidu.com/it/u=2181408742,1474736403&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800"
          alt=""
          class="w-3 h-3 rounded-sm"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="w-1.5 h-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900"
          color="#707070"
        ></m-svg-icon>
        <!-- vip -->
        <m-svg-icon
          class="w-1.5 h-1.5 ml-0.5 absolute right-[16px] bottom-0"
          name="vip"
          fillClass="fill-zinc-900"
          color="#707070"
        ></m-svg-icon>
      </div>
    </template>

    <!-- 气泡 -->
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in menuArr"
        :key="item.id"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
        <span class="text-sm text-zinc-800">{{ item.title }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
// 构建 menu 数据源
const menuArr = [
  { id: 0, title: '个人资料', icon: 'profile', path: '/profile' },
  { id: 1, title: '升级 VIP', icon: 'vip-profile', path: '/member' },
  { id: 2, title: '退出登录', icon: 'logout', path: '' }
]
</script>

<style lang="scss" scoped></style>
