<template>
  <Suspense>
    <GLTFModel
      ref="earthRef"
      path="/models/Earth.glb"
      receive-shadow
      cast-shadow
      :scale="earthScale"
      draco
    />
  </Suspense>
</template>
<script setup>
import {
  shallowRef, watch, defineModel, defineProps, defineEmits,
} from 'vue';
import { useRenderLoop } from '@tresjs/core';
import useScale from '../../composables/scale';
import useRotation from '../../composables/rotation';
import useDistance from '../../composables/distance';
import relativeVariables from '../../utils/relativeVariables.json';

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
const { calculateRelativeScale } = useScale();
const { calculateRelativeRotation } = useRotation();
const { calculateRelativeDistance } = useDistance();

const earthRef = shallowRef();
const earthDiameterKm = 12742;
const earthScale = calculateRelativeScale(earthDiameterKm);
const distanceBetweenEarthAndSun = 150030000 + (earthDiameterKm / 2) + (relativeVariables.sunDiameterKm / 2);
const earthRotationRelativeToEarthInDays = 1;

watch(earthRef, (model) => {
  emit('update:component', model.value);
  /* eslint-disable no-param-reassign */
  onLoop(({ delta, elapsed }) => {
    if (model.value) {
      model.value.rotation.y += calculateRelativeRotation(earthRotationRelativeToEarthInDays) * delta;
      rotationEarth.value = model.value.rotation.y;

      const orbitSpeed = calculateRelativeRotation(365.25);
      const angle = (props.rotationSun + elapsed) * orbitSpeed;
      model.value.position.x = 80 + calculateRelativeDistance(distanceBetweenEarthAndSun) * Math.sin(angle);
      model.value.position.z = 80 + calculateRelativeDistance(distanceBetweenEarthAndSun) * Math.cos(angle);

      positionEarth.value.x = model.value.position.x;
      positionEarth.value.z = model.value.position.z;
      /* eslint-enable no-param-reassign */
    }
  });
});
</script>
