<!-- 瀑布流组件实现 - 以等宽不等高的方式展示内容，类似于瀑布流布局 -->
<template>
  <!-- 容器元素 - 高度会动态计算并设置 -->
  <div class="relative" ref="containerTarget" :style="{ height: containerHeight + 'px' }">
    <!-- 当列宽计算完成且数据存在时渲染内容 -->
    <template v-if="columnWidth && data.length">
      <!-- 设置每项宽度为计算好的列宽 -->
      <!-- 动态设置每项的垂直位置 -->
      <!-- 动态设置每项的水平位置 -->
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          top: item._style?.top + 'px',
          left: item._style?.left + 'px'
        }"
      >
        <!-- 通过插槽传递数据内容，允许自定义渲染 -->
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else>加载中……</div>
  </div>
</template>

<script>
export default {
  name: 'waterfall'
}
</script>

<script setup>
import { onMounted, ref, computed, nextTick, watch, onUnmounted } from 'vue'
import {
  getImgElements, // 获取元素中的所有图片元素
  getAllImg, // 获取所有图片的src
  onCompleteImgs, // 等待图片加载完成的Promise
  getMinHeightColumn, // 获取高度最小的列索引
  getMinHeight, // 获取最小高度值
  getMaxHeight // 获取最大高度值
} from './utils'

const props = defineProps({
  // 数据源 - 要展示的项目数组
  data: {
    type: Array,
    required: true
  },
  // 唯一标识 - 用于v-for的key
  nodeKey: {
    type: String
  },
  // 布局列数 - 瀑布流的列数
  column: {
    default: 2,
    type: Number
  },
  // 列间距 - 各列之间的水平间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  // 行间距 - 各项之间的垂直间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 是否需要进行图片预加载 - 决定是否等待图片加载完成后再计算布局
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 容器的总高度 - 根据内容动态计算
const containerHeight = ref(0)
// 记录每列高度的对象 - key: 列索引, value: 该列当前高度
const columnHeightObj = ref({})
// 初始化列高度记录 - 将所有列高度初始化为0
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

// 容器实例
const containerTarget = ref(null)
// 容器的实际内容宽度（不包含 padding、margin、border）
const containerWidth = ref(0)
// 容器的左边距 - 用于计算item的left值时加上容器的padding-left
const containerLeft = ref(0)
// 计算容器相关尺寸
const useContainerWidth = () => {
  // 获取容器的内边距
  const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value, null)
  // 保存容器的左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 计算容器的实际可用宽度 = 总宽度 - 左右内边距
  containerWidth.value =
    containerTarget.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

// 每列的宽度 = （容器的宽度 - 所有的列间距）/列数
const columnWidth = ref(0)
// 所有列间距的合计
const columnSpacingTotal = computed(() => {
  return props.columnSpacing * (props.column - 1)
})
// 计算单列宽度
const useColumnWidth = () => {
  // 计算容器宽度
  useContainerWidth()
  // 列宽 = (容器宽度 - 所有列间距) / 列数
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}
// 组件挂载时初始化列宽
onMounted(() => {
  // 计算列宽
  useColumnWidth()
})

// 保存每个项目的高度
let itemHeights = []

// 当需要预加载图片时使用此方法(图片需要预加载，图片高度未知)，使用 pexels 接口需要图片预加载
const waitImgComplete = () => {
  itemHeights = []
  // 获取所有瀑布流项目元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 从这些元素中提取所有img标签
  const imgElements = getImgElements(itemElements)
  // 获取所有图片的src
  const allImgs = getAllImg(imgElements)
  // 等待所有图片加载完成
  onCompleteImgs(allImgs).then(() => {
    // 图片全部加载完成后，记录每个元素的高度
    itemElements.forEach((item) => {
      itemHeights.push(item.offsetHeight)
    })
    // 计算并设置每个项目的位置
    useItemLocation()
  })
}

// 当不需要预加载图片时使用此方法（图片尺寸已知或无图片）
const useItemHeight = () => {
  itemHeights = []
  // 获取所有项目元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 直接计算高度，无需等待图片加载
  itemElements.forEach((item) => {
    itemHeights.push(item.offsetHeight)
  })
  // 计算定位
  useItemLocation()
}

// 核心方法：计算每个项目的位置并设置样式
const useItemLocation = () => {
  // 遍历所有数据
  props.data.forEach((item, index) => {
    // 跳过已经计算过位置的项目
    if (item._style) return
    // 为项目创建样式对象
    item._style = {}
    // 计算水平位置 - 放在当前高度最小的列
    item._style.left = getItemLeft()
    // 计算垂直位置 - 放在当前列的底部
    item._style.top = getItemTop()
    // 更新放置项目的列高度
    increasingHeight(index)
  })

  // 更新容器高度为所有列中的最大高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

// 组件销毁的时候，清除所有的 _style，避免内存泄漏
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})

// 计算项目的左侧位置
const getItemLeft = () => {
  // 找出当前高度最小的列
  const column = getMinHeightColumn(columnHeightObj.value)
  // 计算left值 = 列索引 * (列宽 + 列间距) + 容器左内边距
  return column * (columnWidth.value + props.columnSpacing) + containerLeft.value
}

// 计算项目的顶部位置
const getItemTop = () => {
  // 返回当前所有列中的最小高度
  return getMinHeight(columnHeightObj.value)
}

// 指定列高度自增
const increasingHeight = (index) => {
  // 拿到最小高度的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 该列高度增加项目高度+行间距
  columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing
}

// 监听数据变化，更新布局
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      // 第一次获取数据时，构建高度记录容器
      const resetColumnHeight = newVal.every((item) => !item._style)
      if (resetColumnHeight) {
        // 初始化列高度记录
        useColumnHeightObj()
      }
      // 根据配置选择适当的布局计算方法
      if (props.picturePreReading) {
        waitImgComplete()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)

// 监听列数变化，重新计算列宽和布局
watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      // 图片预加载模式下，先重置列宽
      columnWidth.value = 0
      // 数据改变之后，视图改变之后的回调
      reset()
    } else {
      reset()
    }
  }
)

// 重置瀑布流布局
const reset = () => {
  // 延迟执行，确保DOM已更新
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth()
    // 重置所有的定位数据
    props.data.forEach((item) => {
      item._style = null
    })
  }, 200)
}
</script>

<style lang="scss" scoped></style>
