<template>
  <TresMesh
    ref="astroidRef"
    cast-shadow
    :position="[1,5,10]"
  >
    <TresTorusGeometry :args="[1, 5, 5]" />
    <TresMeshStandardMaterial 
      v-bind="pbrTexture"
      displacement-scale="0.2"
    />
  </TresMesh>
</template>
<script setup>
import { defineProps, shallowRef } from 'vue';
import { useTexture, useRenderLoop } from '@tresjs/core';

const props = defineProps({
  astroid: {
    type: Object,
    default: () => {},
  },
  rotationEarth: {
    type: Number,
    required: true,
  },
});

const { onLoop } = useRenderLoop();

const asteroidRef = shallowRef(null);

const pbrTexture = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_NormalGL.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
});

onLoop(({ delta }) => {
  if (asteroidRef.value) {
    console.log('in loop 2 ');

    asteroidRef.value.rotation.y += 1;
    console.log(asteroidRef.value.rotation.y);
  }
})
</script>
