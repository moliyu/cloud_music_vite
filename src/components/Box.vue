<template>
  <div class="w-full relative" :style="style">
    <div class="absolute w-full h-full left-0 top-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  ratio?: number
}>()
const style = {
  paddingTop: 100 * (props.ratio ?? 1) + '%'
}
</script>