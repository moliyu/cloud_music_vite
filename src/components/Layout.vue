<template>
  <div class="flex">
    <SideBar />
    <div class="w-content h-sideBar">
      <Header />
      <div class="h-contenth overflow-y-auto">
        <div class="max-w-screen-2xl px-20px py-15px mx-auto">
          <router-view />
        </div>
      </div>
    </div>
  </div>
  <Player />
</template>
<script setup lang="ts">
import SideBar from './Layout/SideBar.vue'
import Header from './Layout/Header.vue'
</script>