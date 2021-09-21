<template>
  <div class="flex">
    <SideBar />
    <div class="w-content h-sideBar">
      <Header />
      <div class="max-w-screen-lg px-20px py-15px mx-auto h-contenth overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBar from './Layout/SideBar.vue'
import Header from './Layout/Header.vue'
</script>