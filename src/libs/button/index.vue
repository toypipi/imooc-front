<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- 加载状态图标 -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>
    <!-- 图标按钮内容 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="[sizeEnum[sizeKey].icon]"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <!-- 文字按钮内容 -->
    <slot v-else></slot>
  </button>
</template>

<script>
// 按钮样式映射表：定义不同类型按钮的样式类
const typeEnum = {
  // 主要按钮：深色背景
  primary:
    'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700  active:bg-zinc-800 dark:active:bg-zinc-700',
  // 主色调按钮：品牌色背景
  main: 'text-white bg-main dark:bg-zinc-900 hover:bg-main-hover dark:hover:bg-zinc-700  active:bg-main dark:active:bg-zinc-700',
  // 信息按钮：浅色背景
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700'
}

// 按钮尺寸映射表：定义不同大小按钮的尺寸类
const sizeEnum = {
  // 默认文字按钮尺寸
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  // 默认图标按钮尺寸
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  // 小型文字按钮尺寸
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  // 小型图标按钮尺寸
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
// 点击事件名称常量
const EMITS_CLICK = 'click'
</script>

<script setup>
import { computed } from 'vue'
import mSvgIcon from '../svg-icon/index.vue'

/**
 * 1. 构建 type 风格可选项和 size 大小可选项
 * 2. 通过 props 让开发者控制按钮
 * 3. 区分 icon button 和 text button
 * 4. 依据当前的视图，实现视图
 * 5. 处理点击事件
 */

// 组件属性定义
const props = defineProps({
  // icon: SVG 图标名称
  icon: String,
  // iconColor: 图标颜色
  iconColor: String,
  // iconClass: 图标的 Tailwind 类名
  iconClass: String,
  // type: 按钮风格，默认为 'main'
  type: {
    type: String,
    default: 'main',
    // 验证器：确保传入的 type 值在预定义的类型中
    validator: (val) => {
      // 1.获取所有的可选项
      const types = Object.keys(typeEnum)
      // 2.判断当前的值是否在可选项中
      const result = types.includes(val)
      if (!result) {
        throw new Error(`你的 type 必须是 ${types.join('、')} 中的一个`)
      }
      return result
    }
  },
  // size: 按钮大小，默认为 'default'
  size: {
    type: String,
    default: 'default',
    // 验证器：确保传入的 size 值在预定义的尺寸中
    validator: (val) => {
      // 1.获取所有的可选项
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      // 2.判断当前的值是否在可选项中
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`你的 size 必须是 ${keys.join('、')} 中的一个`)
      }
      return result
    }
  },
  // isActiveAnim: 是否启用点击动画
  isActiveAnim: {
    type: Boolean,
    default: false
  },
  // loading: 是否显示加载状态
  loading: {
    type: Boolean,
    default: false
  }
})

// 定义组件事件
const emits = defineEmits([EMITS_CLICK])

// 计算按钮尺寸的 key
// 如果是图标按钮，需要添加 'icon-' 前缀
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})

// 按钮点击处理函数
// 如果按钮处于加载状态，则不触发点击事件
const onBtnClick = () => {
  if (props.loading) return
  emits(EMITS_CLICK)
}
</script>

<style lang="scss" scoped></style>
