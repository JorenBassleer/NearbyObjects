<template>
  <Html
    :position="position"
    transform
  >
    <div class="bg-white text-xs p-1 rounded text-gray-700">
      <slot />
    </div>
  </Html>
</template>
<script setup>
import { defineProps } from 'vue';
// eslint-disable-next-line import/no-unresolved
import { Html } from '@tresjs/cientos';

defineProps({
  position: {
    type: Object,
    default: () => ({
      x: 0,
      y: 0,
      z: 0,
    }),
  },
});
</script>
