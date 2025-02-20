<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></m-svg-icon>
    <img :src="blob" ref="imageTarget" alt="" />
    <m-button class="mt-4 w-[80%] xl:1/2" @click="onConfirmClick" :loading="loading">确定</m-button>
  </div>
</template>

<script>
// PC 端配置对象
const pcOptions = {
  aspectRatio: 1
}

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布,裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比:1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}
const EMITS_CLOSE = 'close'
</script>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { onMounted, ref } from 'vue'
import { getOSSClient } from '@/utils/sts'
import { useStore } from 'vuex'
import { message } from '@/libs'
import { putProfile } from '@/api/sys'

const store = useStore()

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const loading = ref(false)

/**
 * 确认按钮点击事件
 */
const onConfirmClick = () => {
  loading.value = true
  // 拿到裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 地址
    putObjectToOSS(blob)
  })
}

/**
 * 进行 OSS 上传
 */
let ossClient
const putObjectToOSS = async (file) => {
  try {
    if (!ossClient) {
      ossClient = await getOSSClient()
    }
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${fileTypeArr[fileTypeArr.length - 1]}`
    // put 方法包含两个参数:
    // 1.存放的路径(包含名称)
    // 2.上传的文件
    const res = await ossClient.put(`images/${fileName}`, file)
    onChangeProfile(res.url)
  } catch (e) {
    message('error', e)
    loading.value = false
  }
}

/**
 * 上传新头像到服务器
 */
const onChangeProfile = async (avatar) => {
  // 更新本地数据
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })
  // 更新服务器数据
  await putProfile(store.getters.userInfo)
  message('success', '头像修改成功')
  // loading
  loading.value = false
  close()
}
const emits = defineEmits([EMITS_CLOSE])
/**
 * 关闭按钮点击事件
 */
const close = () => {
  emits(EMITS_CLOSE)
}

/**
 * 处理图片裁剪
 */

const imageTarget = ref(null)
let cropper
onMounted(() => {
  cropper = new Cropper(imageTarget.value, isMobileTerminal.value ? mobileOptions : pcOptions)
})
</script>

<style lang="scss" scoped></style>
