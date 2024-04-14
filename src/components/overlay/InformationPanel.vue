<template>
  <Html
    ref="htmlWrapper"
    sprite
  >
    <div class="bg-white text-xs p-1 rounded text-gray-700 w-64 information-panel">
      <slot />
    </div>
  </Html>
</template>
<script setup>
import {
  watch, shallowRef, defineModel,
} from 'vue';
import { Html } from '@tresjs/cientos';

const component = defineModel('component', {
  type: Object,
  required: true,
});

const htmlWrapper = shallowRef();

watch(htmlWrapper, (model) => {
  if (model.value) {
    component.value = model.value;
  }
});
</script>
<style scoped>
.information-panel {
  -webkit-box-shadow:0px 0px 56px 17px rgba(255,255,255,0.10);
  -moz-box-shadow: 0px 0px 56px 17px rgba(255,255,255,0.10);
  box-shadow: 0px 0px 56px 17px rgba(255,255,255,0.10);
}
</style>
