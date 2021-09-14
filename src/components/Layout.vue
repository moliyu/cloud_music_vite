<template>
  <div class="flex">
    <SideBar />
    <div class="w-content h-sideBar overflow-y-auto">
      <Header />
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBar from './Layout/SideBar.vue'
import Header from './Layout/Header.vue'
</script>