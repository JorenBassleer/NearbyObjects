<template>
  <Suspense>
    <GLTFModel
      ref="astroidRef"
      path="/models/Itokawa.glb"
      cast-shadow
      receive-shadow
      :scale="!isFocused ? asteroid?.estimated_diameter?.kilometers?.estimated_diameter_min / 100 : 0.001"
      draco
    />
  </Suspense>
  <!-- Maybe make component out of this -->
  <InformationPanel
    v-if="isFocused"
    :position="[asteroidLocation.x, asteroidLocation.y, asteroidLocation.z]"
  >
    {{ asteroidLocation.x }} {{ asteroidLocation.y }} {{ asteroidLocation.z }}
    <div class="flex justify-between items-center">
      <h1 class="font-bold">
        ☄️ {{ asteroid.name }}
      </h1>
      <span
        class="font-semibold cursor-pointer p-2 hover:text-blue-500"
        @click="$emit('onUnfocus')"
      >X</span>
    </div>
    <small
      class="text-blue-500 cursor-pointer hover:text-blue-400"
      @click="showMoreInfo = !showMoreInfo"
    >
      Show more info
    </small>
    <AsteroidExtraInfo
      v-show="showMoreInfo"
      :asteroid="asteroid"
    />
  </InformationPanel>
</template>
<script setup>
import {
  defineProps, shallowRef, watch, defineEmits,
} from 'vue';
import { useRenderLoop } from '@tresjs/core';
// eslint-disable-next-line import/no-unresolved
import { GLTFModel } from '@tresjs/cientos';
import InformationPanel from './InformationPanel.vue';
import AsteroidExtraInfo from './AsteroidExtraInfo.vue';

const props = defineProps({
  asteroid: {
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

const emit = defineEmits(['update:component', 'onUnfocus']);

const { onLoop } = useRenderLoop();

const astroidRef = shallowRef(null);
const asteroidLocation = shallowRef({
  x: 0,
  y: 0,
  z: 0,
});
const showMoreInfo = shallowRef(false);

watch(astroidRef, (model) => {
  emit('update:component', model.value);
  onLoop(({ delta, elapsed }) => {
    if (model.value) {
      if (!props.isFocused) {
        // Get from asteroid data
        const orbitRadiusX = 3;
        // Get from asteroid data
        const orbitRadiusZ = 3;
        const orbitSpeed = props.asteroid.close_approach_data[0].relative_velocity.kilometers_per_second / 10;
        // Make a composable out of this calculation
        const angle = (props.rotationEarth + elapsed) * orbitSpeed;
        /* eslint-disable no-param-reassign */
        model.value.rotation.y += Math.sin(delta * orbitSpeed);
        model.value.rotation.z += Math.sin(delta * orbitSpeed);
        model.value.position.x = props.positionEarth.x + props.asteroid.close_approach_data[0].miss_distance.lunar * Math.sin(angle);
        model.value.position.z = props.positionEarth.z + props.asteroid.close_approach_data[0].miss_distance.lunar * Math.cos(angle);
      }
      asteroidLocation.value = model.value.position;
      /* eslint-enable no-param-reassign */
    }
  });
});

watch(
  () => props.isFocused,
  (v) => {
    console.log('isFocused update', asteroidLocation.value.x, asteroidLocation.value.y, asteroidLocation.value.z);
  },
);
</script>
