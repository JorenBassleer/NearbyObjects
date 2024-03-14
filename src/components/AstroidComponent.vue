<template>
  <TresMesh
    ref="astroidRef"
    cast-shadow
    receive-shadow
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
  positionEarth: {
    type: Object,
    default: () => ({
      x: 0, y: 0, z: 0,
    }),
  }
});

const { onLoop } = useRenderLoop();

const astroidRef = shallowRef(null);

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
onLoop(({ delta, elapsed }) => {
  if (astroidRef.value) {
    // Get from astroid data
    const orbitRadiusX = 5;
    // Get from astroid data
    const orbitRadiusZ = 5;
    const orbitSpeed = 0.05;
    // Make a composable out of this calculation
    const angle = (props.rotationEarth + elapsed) * orbitSpeed;
    astroidRef.value.rotation.y += Math.sin(delta * orbitSpeed);
    astroidRef.value.rotation.z += Math.sin(delta * orbitSpeed);
    astroidRef.value.position.x = props.positionEarth.x + orbitRadiusX * Math.sin(angle);
    astroidRef.value.position.z = props.positionEarth.z + orbitRadiusZ * Math.cos(angle);
  }
})
</script>
