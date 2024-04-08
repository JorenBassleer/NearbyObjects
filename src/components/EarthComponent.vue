<template>
  <Suspense>
    <GLTFModel
      ref="earthRef"
      path="/models/Earth.glb"
      receive-shadow
      cast-shadow
      :scale="0.005"
      draco
    />
  </Suspense>
</template>
<script setup>
import {
  shallowRef, watch, defineModel, defineProps, defineEmits,
} from 'vue';
import { useRenderLoop } from '@tresjs/core';
import { GLTFModel } from '@tresjs/cientos';

const rotationEarth = defineModel('rotationEarth', {
  type: Number,
  default: 0,
});

const positionEarth = defineModel('positionEarth', {
  type: Object,
  default: () => ({
    x: 0,
    y: 0,
    z: 0,
  }),
});

const props = defineProps({
  rotationSun: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['update:component']);

const { onLoop } = useRenderLoop();

const earthRef = shallowRef();

watch(earthRef, (model) => {
  emit('update:component', model.value);
  onLoop(({ delta, elapsed }) => {
    /* eslint-disable no-param-reassign */
    model.value.rotation.y += (delta - 0.01);
    rotationEarth.value = model.value.rotation.y;

    // Get from astroid data
    const orbitRadiusX = 10;
    // Get from astroid data
    const orbitRadiusZ = 15;
    const orbitSpeed = 0.007;
    const angle = (props.rotationSun + elapsed) * orbitSpeed;
    model.value.position.x = orbitRadiusX * Math.sin(angle);
    model.value.position.z = orbitRadiusZ * Math.cos(angle);
    positionEarth.value.x = model.value.position.x;
    positionEarth.value.z = model.value.position.z;
    /* eslint-enable no-param-reassign */
  });
});
</script>
