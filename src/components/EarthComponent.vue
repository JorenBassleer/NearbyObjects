<template>
  <primitive
    ref="earthRef"
    :object="scene"
    draco
  />
</template>
<script setup>
import { shallowRef, watch } from 'vue';
// eslint-disable-next-line import/no-unresolved
import { GLTFModel, useGLTF } from '@tresjs/cientos';

const earthRef = shallowRef();

const { scene } = await useGLTF('/models/Earth.glb');

watch(earthRef, (model) => {
  console.log('model', model);
});
</script>
