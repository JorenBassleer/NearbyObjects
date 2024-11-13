<template>
  <Html
    :position="position"
    sprite
  >
    <div class="bg-transparent text-xs p-1 rounded text-white w-64 information-panel select-none border">
      <slot />
    </div>
  </Html>
</template>
<script setup>
import { defineProps } from 'vue';
import { Html } from '@tresjs/cientos';

defineProps({
  position: {
    type: Array,
    default: () => ([
      0,
      0,
      0,
    ]),
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
