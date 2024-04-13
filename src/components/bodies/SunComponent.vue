<template>
  <Suspense>
    <GLTFModel
      ref="sunRef"
      path="/models/Sun.glb"
      :scale="sunScale"
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
import { useRenderLoop } from '@tresjs/core';
import useSize from '../../composables/size';
import { GLTFModel } from '@tresjs/cientos';

const sunRotation = defineModel('sunRotation', {
  type: Number,
  default: 0,
});

const sunRef = shallowRef();
const { onLoop } = useRenderLoop();
const { calculateRelativeSize } = useSize();

const sunScale = calculateRelativeSize(1391000);

watch(sunRef, (model) => {
  onLoop(({ delta }) => {
    if (model.value) {
      console.log('delta', delta);
      /* eslint-disable no-param-reassign */
      model.value.rotation.y += (delta / 100);
      sunRotation.value = model.value.rotation.y;
      /* eslint-enable no-param-reassign */
    }
  });
});
</script>
