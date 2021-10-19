<template>
  <div class="relative h-2px w-full bg-gray cursor-pointer"
    ref="container"
    @mouseenter="enter"
    @mouseleave="leave"
    @mousedown="down"
    >
    <div
      class="w-16px h-16px flex justify-center items-center absolute -top-7px"
      :style="{left: state.left}">
      <div class="h-8px w-8px rounded-full" :style="{background: state.background}"></div>
    </div>
    <div class="h-full bg-primary" :style="{width: modelValue + '%'}"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, reactive } from 'vue'
const emits = defineEmits<{
  (e: 'update:modelValue', data: number): void,
  (e: 'change', data: number): void,
  (e: 'done'): void,
  (e: 'update:isMove', data: boolean): void
}>()
const props = defineProps({
  delay: {
    type: Boolean
  },
  modelValue: {
    type: Number,
    default: 0
  },
  isMove: {
    type: Boolean,
    default: false
  }
})
const container = ref<HTMLElement>()
const state = reactive({
  left: '-8px',
  background: 'transparent',
  offsetLeft: 0,
  totalWidth: 0,
  isMove: false
})

watchEffect(() => {
  if (container.value) {
    state.left = container.value.clientWidth * props.modelValue /100 - 8 + 'px'
  }
})

const enter = () => {
  state.background = '#D23931'
}

const move = (e: MouseEvent) => {
  state.isMove = true
  emits('update:isMove', state.isMove)
  let percent = props.modelValue
  const w = e.x - state.offsetLeft
  if (w < state.totalWidth && w > 0) {
    percent = w/state.totalWidth * 100
  } else if (w <= 0) {
    percent = 0
  } else {
    percent = 100
  }
  if (!props.delay) {
    emits('update:modelValue', percent)
  }
  emits('change', percent)
}

const down = (e: MouseEvent) => {
  const { left, width } = container.value!.getBoundingClientRect()
  state.offsetLeft = left
  state.totalWidth = width
  let percent = props.modelValue
  const w = e.x - state.offsetLeft
  if (w < state.totalWidth && w > 0) {
    percent = w/state.totalWidth * 100
  } else if (w <= 0) {
    percent = 0
  } else {
    percent = 100
  }
  emits('update:modelValue', percent)
  emits('change', percent)
  document.body.addEventListener('mousemove', move)
  document.body.addEventListener('mouseup', up)
}
const up = () => {
  if (state.isMove) {
    state.isMove = false
    emits('update:isMove', state.isMove)
  }
  emits('update:modelValue', props.modelValue)
  emits('done')
  document.body.removeEventListener('mousemove', move)
  document.body.removeEventListener('mouseup', up)
}
const leave = () => {
  if (!state.isMove) state.background = 'transparent'
}

</script>