<template>
  <Suspense>
    <GLTFModel
      ref="astroidRef"
      path="/models/Itokawa.glb"
      cast-shadow
      receive-shadow
      :scale="!isFocused ? astroid?.estimated_diameter?.kilometers?.estimated_diameter_min / 100 : 0.001"
      draco
      @click="$emit('click')"
    />
  </Suspense>
  <Html
    v-if="isFocused"
    transform
    :position="[astroidLocation.x, astroidLocation.y , astroidLocation.z]"
  >
    <h1 class="bg-white text-xs p-1 rounded">
      Astroid {{ astroid.name }}
      I'm a Box 📦
    </h1>
  </Html>
</template>
<script setup>
import {
  defineProps, shallowRef, watch, defineEmits,
} from 'vue';
import { useRenderLoop } from '@tresjs/core';
// eslint-disable-next-line import/no-unresolved
import { GLTFModel, Html } from '@tresjs/cientos';

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
  isFocused: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click', 'update:component']);

const { onLoop } = useRenderLoop();

const astroidRef = shallowRef(null);
const astroidLocation = shallowRef({
  x: 0,
  y: 0,
  z: 0,
});

watch(astroidRef, (model) => {
  emit('update:component', model.value);
  onLoop(({ delta, elapsed }) => {
    if (model.value && !props.isFocused) {
      // Get from astroid data
      const orbitRadiusX = 3;
      // Get from astroid data
      const orbitRadiusZ = 3;
      const orbitSpeed = props.astroid.close_approach_data[0].relative_velocity.kilometers_per_second / 10;
      // Make a composable out of this calculation
      const angle = (props.rotationEarth + elapsed) * orbitSpeed;
      /* eslint-disable no-param-reassign */
      model.value.rotation.y += Math.sin(delta * orbitSpeed);
      model.value.rotation.z += Math.sin(delta * orbitSpeed);
      model.value.position.x = props.positionEarth.x + 0.004 + props.astroid.close_approach_data[0].miss_distance.astronomical * Math.sin(angle);
      model.value.position.z = props.positionEarth.z + props.astroid.close_approach_data[0].miss_distance.astronomical * Math.cos(angle);
      astroidLocation.value = model.value.position;
      /* eslint-enable no-param-reassign */
    }
  });
});
</script>
