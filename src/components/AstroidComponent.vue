<template>
  <Suspense>
    <GLTFModel
      ref="astroidRef"
      path="/models/Itokawa.glb"
      cast-shadow
      receive-shadow
      :scale="0.002"
      draco
    />
  </Suspense>
</template>
<script setup>
import { defineProps, shallowRef, watch } from 'vue';
import { useRenderLoop } from '@tresjs/core';
import { GLTFModel } from '@tresjs/cientos';

const props = defineProps({
  rotationEarth: {
    type: Number,
    required: true,
  },
  positionEarth: {
    type: Object,
    default: () => ({
      x: 0, y: 0, z: 0,
    }),
  },
});

const { onLoop } = useRenderLoop();

const astroidRef = shallowRef(null);

watch(astroidRef, (model) => {
  onLoop(({ delta, elapsed }) => {
    if (model.value) {
      // Get from astroid data
      const orbitRadiusX = 3;
      // Get from astroid data
      const orbitRadiusZ = 3;
      const orbitSpeed = 0.5;
      // Make a composable out of this calculation
      const angle = (props.rotationEarth + elapsed) * orbitSpeed;
      /* eslint-disable no-param-reassign */
      model.value.rotation.y += Math.sin(delta * orbitSpeed);
      model.value.rotation.z += Math.sin(delta * orbitSpeed);
      model.value.position.x = props.positionEarth.x + orbitRadiusX * Math.sin(angle);
      model.value.position.z = props.positionEarth.z + orbitRadiusZ * Math.cos(angle);
      /* eslint-enable no-param-reassign */
    }
  });
});
</script>
