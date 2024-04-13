<template>
  <Html
    :position="position"
    sprite
  >
    <div class="bg-white text-xs p-1 rounded text-gray-700 w-64 information-panel">
      <slot />
    </div>
  </Html>
</template>
<script setup>
import { defineProps } from 'vue';
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
<style scoped>
.information-panel {
  -webkit-box-shadow:0px 0px 56px 17px rgba(255,255,255,0.10);
  -moz-box-shadow: 0px 0px 56px 17px rgba(255,255,255,0.10);
  box-shadow: 0px 0px 56px 17px rgba(255,255,255,0.10);
}
</style>
