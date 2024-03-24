<template>
  <Suspense>
    <GLTFModel
      ref="astroidRef"
      path="/models/Itokawa.glb"
      cast-shadow
      receive-shadow
      :scale="astroid?.estimated_diameter?.kilometers?.estimated_diameter_min / 100"
      draco
      @click="$emit('click')"
    />
  </Suspense>
</template>
<script setup>
import {
  defineProps, shallowRef, watch, defineEmits,
} from 'vue';
import { useRenderLoop } from '@tresjs/core';
// eslint-disable-next-line import/no-unresolved
import { GLTFModel } from '@tresjs/cientos';

const props = defineProps({
  astroid: {
    type: Object,
    required: true,
  },
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

defineEmits(['click']);

const { onLoop } = useRenderLoop();

const astroidRef = shallowRef(null);

watch(astroidRef, (model) => {
  onLoop(({ delta, elapsed }) => {
    if (model.value) {
      // Get from astroid data
      const orbitRadiusX = 3;
      // Get from astroid data
      const orbitRadiusZ = 3;
      const orbitSpeed = 0.09;
      // Make a composable out of this calculation
      const angle = (props.rotationEarth + elapsed) * orbitSpeed;
      /* eslint-disable no-param-reassign */
      model.value.rotation.y += Math.sin(delta * orbitSpeed);
      model.value.rotation.z += Math.sin(delta * orbitSpeed);
      model.value.position.x = props.positionEarth.x + 0.004 + props.astroid.close_approach_data[0].miss_distance.lunar * Math.sin(angle);
      model.value.position.z = props.positionEarth.z + props.astroid.close_approach_data[0].miss_distance.lunar * Math.cos(angle);
      /* eslint-enable no-param-reassign */
    }
  });
});
</script>
