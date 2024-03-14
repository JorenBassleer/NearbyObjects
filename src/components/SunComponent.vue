<template>
  <TresMesh
    ref="sunRef"
    :position="[0,0,0]"
  >
    <TresSphereGeometry :args="[1,32,32]" />
    <TresMeshBasicMaterial color="orange" />
  </TresMesh>
</template>
<script setup>
import { shallowRef, defineProps, defineEmits } from 'vue';
import { useRenderLoop } from '@tresjs/core';

defineProps({
  sunRotation: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:sunRotation']);

const { onLoop } = useRenderLoop();

const sunRef = shallowRef();

onLoop(({ delta }) => {
  if (sunRef.value) {
    sunRef.value.rotation.y += (delta / 100);

    emit('update:sunRotation', sunRef.value.rotation.y);
  }
});
</script>
