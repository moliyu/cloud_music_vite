<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

defineProps<{ msg: string }>()
type DState = {
  count: number
  double: number
}
const state: DState = reactive({
  count: 0,
  double: computed(() => state.count * 2)
})

const add = () => {
  state.count++
}

</script>

<template>
  <h1 class="text">{{ msg }}</h1>
  <h2>{{state.count}}</h2>
  <h2>{{state.double}}</h2>
  <button @click="add">+</button>

</template>

<style scoped>
</style>
