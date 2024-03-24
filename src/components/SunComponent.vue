<template>
  <Suspense>
    <GLTFModel
      ref="sunRef"
      path="/models/Sun.glb"
      :scale="0.005"
      draco
    />
  </Suspense>
  <TresPointLight
    :args="['#fee21f', 500, 100]"
    :position="[0,0,0]"
    cast-shadow
  />
</template>
<script setup>
import {
  shallowRef, watch, defineModel,
} from 'vue';
import { useRenderLoop, useTresContext, useRaycaster } from '@tresjs/core';
import { GLTFModel } from '@tresjs/cientos';

const sunRotation = defineModel('sunRotation', {
  type: Number,
  default: 0,
});

const sunRef = shallowRef();
const { onLoop } = useRenderLoop();
const { raycaster } = useTresContext();

watch(sunRef, (model) => {
  console.log('raycaster', raycaster.value);
  onLoop(({ delta }) => {
    if (model.value) {
      // eslint-disable-next-line no-param-reassign
      model.value.rotation.y += (delta / 100);
      sunRotation.value = model.value.rotation.y;
    }
  });
});
</script>
