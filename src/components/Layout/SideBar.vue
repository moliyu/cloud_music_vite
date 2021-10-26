<template>
  <div class="w-200px h-sideBar bg-sideBar">
    <div class="h-50px flex items-center">
      <div class="flex-auto"></div>
      <LeftOutlined class="p-10px hover:bg-gray hover:text-primary cursor-pointer rounded-full" @click="go(-1)" />
      <RightOutlined class="p-10px ml-5px mr-10px hover:bg-gray hover:text-primary cursor-pointer rounded-full" @click="go(1)" />
    </div>
    <div class="flex px-20px items-center hover:text-primary cursor-pointer" @click="userInfo">
      <a-avatar :src="''"></a-avatar>
      <div class="px-10px">未登录</div>
    </div>
  </div>
  <a-modal
    title="扫描二维码登录"
    v-model:visible="qr.show"
    :footer="null"
  >
    <img :src="qr.img" alt="" class="m-auto">
  </a-modal>
</template>

<script setup lang="ts">
import { generateQr } from '@/api/login';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
const router = useRouter()
const go = (val: number) => {
  return router.go(val)
}
const qr = reactive({
  show: false,
  img: ''
})
const getQrUrl = async() => {
  const res = await generateQr()
  qr.show = true
  qr.img = res.data.qrimg
}
const userInfo = () => {
  getQrUrl()
}
</script>

<style lang>

</style>