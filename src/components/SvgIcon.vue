<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SvgIcon',
});
</script>

<script lang="ts" setup>
import { defineComponent, computed } from 'vue';

const props = defineProps({
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
  });

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scope>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
