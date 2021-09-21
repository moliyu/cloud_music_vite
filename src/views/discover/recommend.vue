<template>
  <Banner class="mt-15px" />
  <nav-title class="mt-8 mb-2" name="推荐歌单"></nav-title>
  <Song />
  <nav-title class="mt-8 mb-2" name="独家放送"></nav-title>
  <Mv />
</template>

<script setup lang="ts">
import Song from './recommend/Song.vue';
import Mv from './recommend/Mv.vue'
</script>