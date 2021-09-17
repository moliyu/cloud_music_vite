<template>
  <div class="w-full relative" :style="style">
    <div class="absolute w-full h-full left-0 top-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";

const props = defineProps<{
  ratio?: number
}>()
const style = computed(() => {
  return { paddingTop: 100 * (props.ratio ?? 1) + '%' }
})
</script>