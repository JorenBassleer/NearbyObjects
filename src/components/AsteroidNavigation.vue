<template>
  <Html
    left
    wrapper-class="list"
  >
    <section class="bg-white text-gray-600 w-72 rounded-lg">
      <h2 class="text-xl border-b px-4 py-2">
        Asteroids
      </h2>
      <section class="max-h-60 overflow-y-scroll overflow-x-hidden">
        <div
          v-for="asteroid in asteroids"
          :key="asteroid._id"
          class="cursor-pointer px-4 transition-all duration-300"
          :class="isFocused ? 'text-white bg-blue-500 hover:bg-blue-100 hover:text-blue-500' : 'hover:text-white hover:bg-blue-500'"
          @click="$emit('onFocus', asteroid)"
        >
          {{ asteroid.name }}
        </div>
      </section>
    </section>
  </Html>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
// eslint-disable-next-line import/no-unresolved
import { Html } from '@tresjs/cientos';

defineProps({
  asteroids: {
    type: Array,
    required: true,
  },
  isFocused: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['onFocus']);

</script>
<style>
/* Workaround for now */
.list {
  display: block !important;
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50vw, -50vh) !important;
}
</style>
