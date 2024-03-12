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
import { shallowRef, defineModel } from 'vue';
import { useRenderLoop } from '@tresjs/core';

const sunRotation = defineModel({ type: Number, default: 0 });

const { onLoop } = useRenderLoop();

const sunRef = shallowRef();

onLoop(({ delta }) => {
  if (sunRef.value) {
    sunRef.value.rotation.y += delta;
    sunRotation.value = sunRef.value.rotation.y;
  }
});
</script>
