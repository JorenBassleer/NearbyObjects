<template>
  <Suspense>
    <GLTFModel
      ref="astroidRef"
      path="/models/Itokawa.glb"
      cast-shadow
      receive-shadow
      :scale="0.001"
      draco
    />
  </Suspense>
  <InformationPanel
    v-if="isFocused"
    :position="[asteroidLocation.x, asteroidLocation.y + 0.15, asteroidLocation.z + 0.1]"
  >
    <div class="flex justify-between items-center">
      <h1 class="font-bold">
        ☄️ {{ asteroid.name }} <span v-if="asteroid.is_potentially_hazardous_asteroid ">⚠️</span>
      </h1>
      <span
        class="font-semibold cursor-pointer p-2 hover:text-blue-500"
        @click="$emit('onUnfocus')"
      >X</span>
    </div>
    <small
      class="underline cursor-pointer select-none p-2"
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
  defineProps, shallowRef, ref, watch, defineEmits,
} from 'vue';
import { useRenderLoop } from '@tresjs/core';
import { GLTFModel } from '@tresjs/cientos';
// import * as THREE from 'three';
import InformationPanel from '../overlay/InformationPanel.vue';
import AsteroidExtraInfo from '../overlay/AsteroidExtraInfo.vue';
import useRelativeScale from '@composables/scale';

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
  earthRadius: {
    type: Number,
    default: 0,
  },
  isFocused: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:component', 'onUnfocus']);

const { onLoop } = useRenderLoop();
const { computeRelativeDistance, scaleLogarithmic } = useRelativeScale(0.005);

const astroidRef = shallowRef(null);
const asteroidLocation = ref({
  x: 0,
  y: 0,
  z: 0,
});
const showMoreInfo = shallowRef(false);
const pauseStartTime = ref(0);
const totalPausedDuration = ref(0);

watch(astroidRef, (model) => {
  emit('update:component', model.value);

  const asteroidScale = (scaleLogarithmic(Number(props.asteroid.estimated_diameter.kilometers.estimated_diameter_max)) + scaleLogarithmic(Number(props.asteroid.estimated_diameter.kilometers.estimated_diameter_min)) / 4);
  model.value.scale.set(asteroidScale, asteroidScale, asteroidScale);
  const calculatedEarthRadius = props.earthRadius / 1.55;

  onLoop(({ elapsed }) => {
    if (props.isFocused || !model.value) return;

    const effectiveElapsed = elapsed - totalPausedDuration.value / 1000;

    const orbitSpeed = props.asteroid.close_approach_data[0].relative_velocity.kilometers_per_second / 10;
    const angle = (props.rotationEarth + effectiveElapsed) * orbitSpeed;

    const missDistance = computeRelativeDistance(Number(props.asteroid.close_approach_data[0].miss_distance.kilometers)) + calculatedEarthRadius;
    /* eslint-disable no-param-reassign */
    model.value.position.x = Number(props.positionEarth.x) + missDistance * Math.sin(angle);
    model.value.position.z = Number(props.positionEarth.z) + missDistance * Math.cos(angle);

    asteroidLocation.value = JSON.parse(JSON.stringify(model.value.position));
    /* eslint-enable no-param-reassign */
  });
});

watch(() => props.isFocused, (newVal) => {
  if (newVal) {
    pauseStartTime.value = performance.now();
  } else if (pauseStartTime.value !== 0) {
    totalPausedDuration.value += performance.now() - pauseStartTime.value;
    pauseStartTime.value = 0;
  }
});

</script>
