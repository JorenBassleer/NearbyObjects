<template>
  <Suspense>
    <GLTFModel
      ref="earthRef"
      path="/models/Earth.glb"
      receive-shadow
      :position="[0,0,0]"
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
  shallowRef, watch, defineModel, defineEmits,
} from 'vue';
import { useRenderLoop } from '@tresjs/core';
import { GLTFModel } from '@tresjs/cientos';

const rotationEarth = defineModel('rotationEarth', {
  type: Number,
  default: 0,
});

const emit = defineEmits(['update:component']);

const { onLoop } = useRenderLoop();

const earthRef = shallowRef();

watch(earthRef, (model) => {
  emit('update:component', model.value);
  onLoop(({ delta }) => {
    if (model.value) {
      /* eslint-disable no-param-reassign */
      model.value.rotation.y += (delta * 0.2);
      rotationEarth.value = model.value.rotation.y;
      /* eslint-enable no-param-reassign */
    }
  });
});
</script>
